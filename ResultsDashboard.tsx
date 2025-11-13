import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, CheckCircle, ArrowRight, Mail } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { supabase } from '../lib/supabase';
import type { AssessmentResult, AssessmentData } from '../types/assessment';

interface ResultsDashboardProps {
  result: AssessmentResult;
  onRestart: () => void;
  assessmentId?: string;
  assessmentData?: AssessmentData;
}

export function ResultsDashboard({ result, onRestart, assessmentId, assessmentData }: ResultsDashboardProps) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    email: '',
    fullName: '',
    companyName: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { scores, risks, opportunities, nextSteps } = result;

  const handleContactSubmit = async () => {
    if (!contactData.email || !contactData.fullName) {
      alert('Please provide at least your name and email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('voluntary_contacts').insert({
        assessment_id: assessmentId,
        email: contactData.email,
        full_name: contactData.fullName,
        company_name: contactData.companyName || null,
        phone: contactData.phone || null,
        message: contactData.message || null,
        wants_consultation: true,
      });

      if (error) {
        console.error('Error submitting contact:', error);
        alert('There was an error submitting your request. Please try again.');
      } else {
        try {
          const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
          const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

          await fetch(`${supabaseUrl}/functions/v1/submit-assessment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${anonKey}`,
            },
            body: JSON.stringify({
              contact: contactData,
              scores,
              responses: assessmentData,
              risks,
              opportunities,
              nextSteps,
            }),
          });
        } catch (sheetError) {
          console.warn('Could not sync to Google Sheet:', sheetError);
        }
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error('Error submitting contact:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMaturityColor = () => {
    if (scores.overall >= 80) return 'text-green-600';
    if (scores.overall >= 65) return 'text-blue-600';
    if (scores.overall >= 50) return 'text-yellow-600';
    if (scores.overall >= 35) return 'text-orange-600';
    return 'text-red-600';
  };

  const getMaturityBgColor = () => {
    if (scores.overall >= 80) return 'bg-green-100';
    if (scores.overall >= 65) return 'bg-blue-100';
    if (scores.overall >= 50) return 'bg-yellow-100';
    if (scores.overall >= 35) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-risk-critical text-white';
      case 'High':
        return 'bg-risk-high text-white';
      case 'Medium':
        return 'bg-risk-medium text-white';
      default:
        return 'bg-risk-low text-white';
    }
  };

  const ScoreCircle = ({ score, label, color }: { score: number; label: string; color: string }) => (
    <div className="flex flex-col items-center">
      <div className={`relative w-32 h-32 rounded-full ${color} bg-opacity-10 flex items-center justify-center mb-3`}>
        <div className={`text-4xl font-bold ${color}`}>{score}</div>
      </div>
      <div className="text-sm font-semibold text-gray-700">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <img src="/Logo_GGC_wit.pngsmall.png" alt="Good Growth Collective" className="h-16 w-auto" />
          <Button variant="outline" onClick={onRestart} size="sm">
            New Assessment
          </Button>
        </div>

        <div className="text-center mb-12">
          <div className={`inline-block px-6 py-3 rounded-full ${getMaturityBgColor()} ${getMaturityColor()} font-bold text-lg mb-4`}>
            {scores.maturityLevel} ESG Maturity
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your ESG Assessment Results</h1>
          <p className="text-xl text-gray-600">
            Comprehensive analysis of your ESG performance and risk profile
          </p>
        </div>

        <Card variant="gradient" className="mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl font-bold bg-brand-gradient bg-clip-text text-transparent mb-2">
              {scores.overall}
            </div>
            <div className="text-xl text-gray-700 font-semibold">Overall ESG Score</div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 justify-items-center">
            <ScoreCircle score={scores.environmental} label="Environmental" color="text-esg-environmental" />
            <ScoreCircle score={scores.social} label="Social" color="text-esg-social" />
            <ScoreCircle score={scores.governance} label="Governance" color="text-esg-governance" />
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card variant="elevated">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-brand-redorange" size={32} />
              <h2 className="text-2xl font-bold text-gray-900">Identified Risks</h2>
            </div>

            {risks.length === 0 ? (
              <p className="text-gray-600">No critical risks identified. Strong ESG performance!</p>
            ) : (
              <div className="space-y-4">
                {risks.map((risk, index) => (
                  <div key={index} className="border-l-4 pl-4" style={{ borderColor: risk.severity === 'Critical' ? '#FD6400' : risk.severity === 'High' ? '#FF9900' : '#F59E0B' }}>
                    <div className="flex items-start gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(risk.severity)}`}>
                        {risk.severity}
                      </span>
                      {risk.isRegulatory && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-purple text-white">
                          REGULATORY
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{risk.type}</h3>
                    <p className="text-sm text-gray-700 mb-2">{risk.description}</p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <strong>Recommendation:</strong> {risk.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card variant="elevated">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-brand-orange" size={32} />
              <h2 className="text-2xl font-bold text-gray-900">Opportunities</h2>
            </div>

            <div className="space-y-4">
              {opportunities.map((opportunity, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">{opportunity}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card variant="elevated" className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <ArrowRight className="text-brand-purple" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">Recommended Next Steps</h2>
          </div>

          <div className="space-y-3">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-800 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="gradient" className="mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help Addressing These Gaps?
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              Good Growth Collective specializes in ESG strategy, CSRD compliance, and sustainability transformation.
              Our Sustainability as a Service model provides expert guidance tailored to your maturity level and industry.
            </p>

            {!showContactForm ? (
              <Button size="lg" onClick={() => setShowContactForm(true)}>
                <Mail className="mr-2" size={20} />
                Schedule a Consultation
              </Button>
            ) : submitSuccess ? (
              <div className="max-w-md mx-auto bg-white p-6 rounded-xl">
                <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-700">
                  We've received your consultation request and will be in touch within 24 hours to discuss your ESG journey.
                </p>
              </div>
            ) : (
              <div className="max-w-md mx-auto bg-white p-6 rounded-xl">
                <input
                  type="email"
                  placeholder="Your email address *"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-3 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple focus:ring-opacity-20"
                  required
                />
                <input
                  type="text"
                  placeholder="Full name *"
                  value={contactData.fullName}
                  onChange={(e) => setContactData({ ...contactData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-3 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple focus:ring-opacity-20"
                  required
                />
                <input
                  type="text"
                  placeholder="Company name"
                  value={contactData.companyName}
                  onChange={(e) => setContactData({ ...contactData, companyName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-3 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple focus:ring-opacity-20"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-3 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple focus:ring-opacity-20"
                />
                <textarea
                  placeholder="Tell us about your priorities..."
                  rows={3}
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple focus:ring-opacity-20"
                />
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleContactSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Consultation Request'}
                </Button>
                <p className="text-xs text-gray-500 mt-2">* Required fields</p>
              </div>
            )}
          </div>
        </Card>

        <div className="text-center text-gray-600 space-y-2">
          <p className="font-semibold">Understanding Your Maturity Level:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span><strong>Foundation (0-34):</strong> Early stage ESG</span>
            <span><strong>Developing (35-49):</strong> Building capabilities</span>
            <span><strong>Established (50-64):</strong> Systematic approach</span>
            <span><strong>Advanced (65-79):</strong> Integrated strategy</span>
            <span><strong>Leading (80+):</strong> Industry benchmark</span>
          </div>
        </div>

        <footer className="text-center pt-12 mt-12 border-t border-gray-200">
          <p className="text-gray-600 mb-2">
            Powered by <span className="font-bold text-brand-purple">Good Growth Collective</span>
          </p>
          <p className="text-sm text-gray-500">
            Expert ESG Advisory • CSRD Compliance • Sustainability Transformation
          </p>
        </footer>
      </div>
    </div>
  );
}
