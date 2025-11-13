import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AssessmentForm } from './components/AssessmentForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { calculateScores, identifyRisks, generateOpportunities, generateNextSteps } from './lib/scoring';
import { supabase } from './lib/supabase';
import type { AssessmentData, AssessmentResult } from './types/assessment';

type AppState = 'landing' | 'assessment' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | undefined>(undefined);
  const [assessmentData, setAssessmentData] = useState<AssessmentData | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartAssessment = () => {
    setAppState('assessment');
  };

  const handleAssessmentComplete = async (data: AssessmentData) => {
    setIsSubmitting(true);
    setAssessmentData(data);

    try {
      const scores = calculateScores(data);
      const risks = identifyRisks(data, scores);
      const opportunities = generateOpportunities(data, scores);
      const nextSteps = generateNextSteps(scores, risks);

      const result: AssessmentResult = {
        scores,
        risks,
        opportunities,
        nextSteps,
      };

      const { data: assessmentRecord, error: assessmentError } = await supabase
        .from('assessments')
        .insert({
          company_industry: data.companyProfile.industry,
          company_size: data.companyProfile.size,
          company_revenue: data.companyProfile.revenue,
          company_geography: data.companyProfile.geography,
          company_ownership: data.companyProfile.ownership,
          environmental_responses: data.environmental,
          social_responses: data.social,
          governance_responses: data.governance,
          maturity_responses: data.maturity,
          session_id: generateSessionId(),
        })
        .select()
        .maybeSingle();

      if (assessmentError) {
        console.error('Error saving assessment:', assessmentError);
      }

      if (assessmentRecord) {
        setAssessmentId(assessmentRecord.id);

        await supabase.from('assessment_scores').insert({
          assessment_id: assessmentRecord.id,
          overall_score: scores.overall,
          environmental_score: scores.environmental,
          social_score: scores.social,
          governance_score: scores.governance,
          maturity_level: scores.maturityLevel,
        });

        const riskInserts = risks.map((risk) => ({
          assessment_id: assessmentRecord.id,
          risk_category: risk.category,
          risk_type: risk.type,
          severity: risk.severity,
          description: risk.description,
          recommendation: risk.recommendation,
          is_regulatory: risk.isRegulatory,
        }));

        if (riskInserts.length > 0) {
          await supabase.from('identified_risks').insert(riskInserts);
        }
      }

      setAssessmentResult(result);
      setAppState('results');
    } catch (error) {
      console.error('Error processing assessment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setAppState('landing');
    setAssessmentResult(null);
  };

  const handleCancelAssessment = () => {
    setAppState('landing');
  };

  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-orange mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your ESG Profile</h2>
          <p className="text-gray-600">Calculating scores and identifying risks...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {appState === 'landing' && <LandingPage onStartAssessment={handleStartAssessment} />}
      {appState === 'assessment' && (
        <AssessmentForm onComplete={handleAssessmentComplete} onCancel={handleCancelAssessment} />
      )}
      {appState === 'results' && assessmentResult && (
        <ResultsDashboard
          result={assessmentResult}
          onRestart={handleRestart}
          assessmentId={assessmentId}
          assessmentData={assessmentData}
        />
      )}
    </>
  );
}

export default App;
