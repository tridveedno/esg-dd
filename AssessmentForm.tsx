import React, { useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { Button } from './Button';
import { FormField, RadioGroup, RatingScale, Select } from './FormField';
import { Card } from './Card';
import type { AssessmentData } from '../types/assessment';
import {
  INDUSTRY_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  REVENUE_OPTIONS,
  GEOGRAPHY_OPTIONS,
  OWNERSHIP_OPTIONS,
  YES_NO_OPTIONS,
  CERTIFICATION_OPTIONS,
  ESG_TEAM_OPTIONS,
} from '../constants/questions';

interface AssessmentFormProps {
  onComplete: (data: AssessmentData) => void;
  onCancel: () => void;
}

const STEPS = ['Profile', 'Environmental', 'Social', 'Governance', 'Maturity'];

export function AssessmentForm({ onComplete, onCancel }: AssessmentFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AssessmentData>({
    companyProfile: {
      industry: '',
      size: '',
      revenue: '',
      geography: '',
      ownership: '',
    },
    environmental: {
      ghgTracking: 0,
      energyManagement: 0,
      wasteReduction: 0,
      waterUsage: 0,
      climateStrategy: 0,
    },
    social: {
      laborPractices: 0,
      healthSafety: 0,
      diversityInclusion: 0,
      supplyChain: 0,
      communityEngagement: 0,
    },
    governance: {
      boardStructure: 0,
      complianceFramework: 0,
      riskManagement: 0,
      transparency: 0,
      ethicsCode: 0,
    },
    maturity: {
      hasESGReport: 0,
      hasCertifications: [],
      hasESGTeam: 0,
      stakeholderEngagement: 0,
    },
  });

  const updateProfile = (field: keyof AssessmentData['companyProfile'], value: string) => {
    setFormData({
      ...formData,
      companyProfile: { ...formData.companyProfile, [field]: value },
    });
  };

  const updateEnvironmental = (field: keyof AssessmentData['environmental'], value: number) => {
    setFormData({
      ...formData,
      environmental: { ...formData.environmental, [field]: value },
    });
  };

  const updateSocial = (field: keyof AssessmentData['social'], value: number) => {
    setFormData({
      ...formData,
      social: { ...formData.social, [field]: value },
    });
  };

  const updateGovernance = (field: keyof AssessmentData['governance'], value: number) => {
    setFormData({
      ...formData,
      governance: { ...formData.governance, [field]: value },
    });
  };

  const updateMaturity = (field: keyof AssessmentData['maturity'], value: string | string[] | number) => {
    setFormData({
      ...formData,
      maturity: { ...formData.maturity, [field]: value },
    });
  };

  const toggleCertification = (cert: string) => {
    const current = formData.maturity.hasCertifications;
    if (cert === 'None') {
      updateMaturity('hasCertifications', ['None']);
    } else {
      const filtered = current.filter((c) => c !== 'None');
      if (current.includes(cert)) {
        updateMaturity('hasCertifications', filtered.filter((c) => c !== cert));
      } else {
        updateMaturity('hasCertifications', [...filtered, cert]);
      }
    }
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return Object.values(formData.companyProfile).every((v) => v !== '');
    }
    if (currentStep === 1) {
      return Object.values(formData.environmental).every((v) => v > 0);
    }
    if (currentStep === 2) {
      return Object.values(formData.social).every((v) => v > 0);
    }
    if (currentStep === 3) {
      return Object.values(formData.governance).every((v) => v > 0);
    }
    if (currentStep === 4) {
      return formData.maturity.hasESGReport > 0 &&
             formData.maturity.hasESGTeam > 0 &&
             formData.maturity.stakeholderEngagement > 0;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <img src="/Logo_GGC_wit.pngsmall.png" alt="Good Growth Collective" className="h-16 w-auto" />
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            Cancel
          </button>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />

        <Card variant="elevated" className="mb-8">
          {currentStep === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Profile</h2>
              <p className="text-gray-600 mb-6">Help us understand your company context</p>

              <FormField label="Industry Sector" required>
                <Select
                  options={INDUSTRY_OPTIONS}
                  value={formData.companyProfile.industry}
                  onChange={(e) => updateProfile('industry', e.target.value)}
                />
              </FormField>

              <FormField label="Company Size" required>
                <RadioGroup
                  options={COMPANY_SIZE_OPTIONS}
                  name="size"
                  value={formData.companyProfile.size}
                  onChange={(v) => updateProfile('size', v)}
                />
              </FormField>

              <FormField label="Annual Revenue" required>
                <Select
                  options={REVENUE_OPTIONS}
                  value={formData.companyProfile.revenue}
                  onChange={(e) => updateProfile('revenue', e.target.value)}
                />
              </FormField>

              <FormField label="Geographic Scope" required>
                <Select
                  options={GEOGRAPHY_OPTIONS}
                  value={formData.companyProfile.geography}
                  onChange={(e) => updateProfile('geography', e.target.value)}
                />
              </FormField>

              <FormField label="Ownership Structure" required>
                <Select
                  options={OWNERSHIP_OPTIONS}
                  value={formData.companyProfile.ownership}
                  onChange={(e) => updateProfile('ownership', e.target.value)}
                />
              </FormField>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Environmental Performance</h2>
              <p className="text-gray-600 mb-6">Assess your environmental management practices</p>

              <FormField
                label="Greenhouse Gas Emissions Tracking"
                required
                tooltip="Do you measure and track Scope 1, 2, and 3 emissions according to GHG Protocol standards?"
              >
                <RatingScale
                  name="ghgTracking"
                  value={formData.environmental.ghgTracking}
                  onChange={(v) => updateEnvironmental('ghgTracking', v)}
                  labels={{ min: 'No tracking', max: 'Comprehensive tracking & reporting' }}
                />
              </FormField>

              <FormField
                label="Energy Management"
                required
                tooltip="How mature are your energy efficiency programs and renewable energy initiatives?"
              >
                <RatingScale
                  name="energyManagement"
                  value={formData.environmental.energyManagement}
                  onChange={(v) => updateEnvironmental('energyManagement', v)}
                  labels={{ min: 'No program', max: 'Advanced efficiency & renewables' }}
                />
              </FormField>

              <FormField
                label="Waste Reduction & Circular Economy"
                required
                tooltip="Do you have programs to minimize waste and implement circular economy principles?"
              >
                <RatingScale
                  name="wasteReduction"
                  value={formData.environmental.wasteReduction}
                  onChange={(v) => updateEnvironmental('wasteReduction', v)}
                  labels={{ min: 'Minimal efforts', max: 'Circular economy integrated' }}
                />
              </FormField>

              <FormField
                label="Water Management"
                required
                tooltip="How do you manage water usage, especially in water-stressed regions?"
              >
                <RatingScale
                  name="waterUsage"
                  value={formData.environmental.waterUsage}
                  onChange={(v) => updateEnvironmental('waterUsage', v)}
                  labels={{ min: 'No monitoring', max: 'Comprehensive water stewardship' }}
                />
              </FormField>

              <FormField
                label="Climate Transition Strategy"
                required
                tooltip="Do you have science-based targets and a roadmap for transitioning to net-zero?"
              >
                <RatingScale
                  name="climateStrategy"
                  value={formData.environmental.climateStrategy}
                  onChange={(v) => updateEnvironmental('climateStrategy', v)}
                  labels={{ min: 'No strategy', max: 'Science-based net-zero commitment' }}
                />
              </FormField>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Social Practices</h2>
              <p className="text-gray-600 mb-6">Evaluate your social and human capital management</p>

              <FormField
                label="Labor Practices & Employee Rights"
                required
                tooltip="Do you ensure fair wages, working conditions, and respect for worker rights?"
              >
                <RatingScale
                  name="laborPractices"
                  value={formData.social.laborPractices}
                  onChange={(v) => updateSocial('laborPractices', v)}
                  labels={{ min: 'Basic compliance only', max: 'Leading practices & certifications' }}
                />
              </FormField>

              <FormField
                label="Health & Safety"
                required
                tooltip="How comprehensive are your occupational health and safety programs?"
              >
                <RatingScale
                  name="healthSafety"
                  value={formData.social.healthSafety}
                  onChange={(v) => updateSocial('healthSafety', v)}
                  labels={{ min: 'Minimal programs', max: 'Zero-harm culture with ISO 45001' }}
                />
              </FormField>

              <FormField
                label="Diversity, Equity & Inclusion"
                required
                tooltip="Do you have measurable DEI goals, diverse representation, and inclusive culture programs?"
              >
                <RatingScale
                  name="diversityInclusion"
                  value={formData.social.diversityInclusion}
                  onChange={(v) => updateSocial('diversityInclusion', v)}
                  labels={{ min: 'Limited initiatives', max: 'Comprehensive DEI strategy' }}
                />
              </FormField>

              <FormField
                label="Supply Chain Ethics & Human Rights"
                required
                tooltip="Do you conduct human rights due diligence and monitor suppliers for ethical practices?"
              >
                <RatingScale
                  name="supplyChain"
                  value={formData.social.supplyChain}
                  onChange={(v) => updateSocial('supplyChain', v)}
                  labels={{ min: 'No oversight', max: 'Full due diligence & audits' }}
                />
              </FormField>

              <FormField
                label="Community Engagement & Impact"
                required
                tooltip="How do you engage with and contribute to local communities where you operate?"
              >
                <RatingScale
                  name="communityEngagement"
                  value={formData.social.communityEngagement}
                  onChange={(v) => updateSocial('communityEngagement', v)}
                  labels={{ min: 'No engagement', max: 'Strategic community partnerships' }}
                />
              </FormField>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Governance Structure</h2>
              <p className="text-gray-600 mb-6">Review your corporate governance and compliance</p>

              <FormField
                label="Board Structure & ESG Oversight"
                required
                tooltip="Does your board have ESG expertise and formal oversight responsibilities?"
              >
                <RatingScale
                  name="boardStructure"
                  value={formData.governance.boardStructure}
                  onChange={(v) => updateGovernance('boardStructure', v)}
                  labels={{ min: 'No ESG oversight', max: 'Dedicated ESG committee' }}
                />
              </FormField>

              <FormField
                label="Compliance Management Framework"
                required
                tooltip="How robust are your systems for managing legal, regulatory, and ethical compliance?"
              >
                <RatingScale
                  name="complianceFramework"
                  value={formData.governance.complianceFramework}
                  onChange={(v) => updateGovernance('complianceFramework', v)}
                  labels={{ min: 'Reactive approach', max: 'Integrated compliance system' }}
                />
              </FormField>

              <FormField
                label="Risk Management & Integration"
                required
                tooltip="Are ESG risks integrated into your enterprise risk management framework?"
              >
                <RatingScale
                  name="riskManagement"
                  value={formData.governance.riskManagement}
                  onChange={(v) => updateGovernance('riskManagement', v)}
                  labels={{ min: 'ESG risks not tracked', max: 'Full ERM integration' }}
                />
              </FormField>

              <FormField
                label="Transparency & Reporting"
                required
                tooltip="Do you publish sustainability reports following recognized standards (GRI, SASB, etc.)?"
              >
                <RatingScale
                  name="transparency"
                  value={formData.governance.transparency}
                  onChange={(v) => updateGovernance('transparency', v)}
                  labels={{ min: 'Limited disclosure', max: 'Comprehensive assured reporting' }}
                />
              </FormField>

              <FormField
                label="Ethics & Anti-Corruption"
                required
                tooltip="Do you have code of conduct, whistleblower protections, and anti-corruption policies?"
              >
                <RatingScale
                  name="ethicsCode"
                  value={formData.governance.ethicsCode}
                  onChange={(v) => updateGovernance('ethicsCode', v)}
                  labels={{ min: 'Basic policies only', max: 'Comprehensive ethics program' }}
                />
              </FormField>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Current ESG Maturity</h2>
              <p className="text-gray-600 mb-6">Tell us about your existing ESG infrastructure</p>

              <FormField
                label="ESG or Sustainability Reporting Maturity"
                required
                tooltip="How mature is your sustainability reporting process?"
              >
                <RatingScale
                  name="hasESGReport"
                  value={formData.maturity.hasESGReport}
                  onChange={(v) => updateMaturity('hasESGReport', v)}
                  labels={{ min: 'No reporting', max: 'Comprehensive annual reports' }}
                />
              </FormField>

              <FormField label="Which certifications or ratings do you have?" tooltip="Select all that apply">
                <div className="space-y-2">
                  {CERTIFICATION_OPTIONS.map((cert) => (
                    <label
                      key={cert}
                      className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
                      style={{
                        borderColor: formData.maturity.hasCertifications.includes(cert) ? '#8B104E' : '#E5E7EB',
                        backgroundColor: formData.maturity.hasCertifications.includes(cert)
                          ? 'rgba(139, 16, 78, 0.05)'
                          : 'white',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.maturity.hasCertifications.includes(cert)}
                        onChange={() => toggleCertification(cert)}
                        className="mr-3 accent-brand-purple"
                      />
                      <span className="text-sm font-medium text-gray-700">{cert}</span>
                    </label>
                  ))}
                </div>
              </FormField>

              <FormField
                label="ESG Team Structure & Resources"
                required
                tooltip="How organized and resourced is your ESG team?"
              >
                <RatingScale
                  name="hasESGTeam"
                  value={formData.maturity.hasESGTeam}
                  onChange={(v) => updateMaturity('hasESGTeam', v)}
                  labels={{ min: 'No dedicated resources', max: 'Dedicated ESG team' }}
                />
              </FormField>

              <FormField
                label="Stakeholder Engagement Maturity"
                required
                tooltip="How systematically do you engage with investors, employees, customers, and communities on ESG topics?"
              >
                <RatingScale
                  name="stakeholderEngagement"
                  value={formData.maturity.stakeholderEngagement}
                  onChange={(v) => updateMaturity('stakeholderEngagement', v)}
                  labels={{ min: 'Ad-hoc only', max: 'Systematic engagement program' }}
                />
              </FormField>
            </div>
          )}
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
            ← Back
          </Button>
          <Button onClick={handleNext} disabled={!canProceed()}>
            {currentStep === STEPS.length - 1 ? 'View Results →' : 'Next →'}
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Your responses are used only to generate your ESG assessment results
        </p>
      </div>
    </div>
  );
}
