import React from 'react';
import { CheckCircle, TrendingUp, Shield, FileCheck, Users } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

interface LandingPageProps {
  onStartAssessment: () => void;
}

export function LandingPage({ onStartAssessment }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-16">
          <div className="mb-8 flex justify-center">
            <img
              src="/Logo_GGC_wit.pngsmall.png"
              alt="Good Growth Collective"
              className="h-24 w-auto"
            />
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="bg-brand-gradient p-1 rounded-2xl w-full md:w-auto mb-8">
              <div className="bg-white px-8 py-12 rounded-xl">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  ESG Due Diligence Self-Assessment
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Identify hidden risks, ensure regulatory compliance, and unlock value in your investment decisions with our comprehensive ESG maturity analysis
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center w-full md:w-auto">
              <Button onClick={onStartAssessment} size="lg" className="shadow-2xl">
                Start Free Assessment →
              </Button>
              <p className="text-sm text-gray-500 mt-3">15-minute assessment • Immediate results • No email required</p>
            </div>
          </div>
        </header>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why ESG Due Diligence Matters Now
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="elevated">
              <div className="text-brand-redorange mb-4">
                <Shield size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reveal Hidden Risks</h3>
              <p className="text-gray-600">
                Uncover material ESG risks that traditional financial due diligence misses. Environmental liabilities, social controversies, and governance gaps can destroy deal value.
              </p>
            </Card>

            <Card variant="elevated">
              <div className="text-brand-orange mb-4">
                <TrendingUp size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Future-Proof Investments</h3>
              <p className="text-gray-600">
                CSRD, SFDR, and EUDR regulations are here. Companies unprepared face compliance costs, penalties, and valuation impacts. Identify gaps before they become liabilities.
              </p>
            </Card>

            <Card variant="elevated">
              <div className="text-brand-purple mb-4">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Deal with Confidence</h3>
              <p className="text-gray-600">
                Make informed investment decisions backed by comprehensive ESG analysis. Strong ESG performance correlates with superior financial returns and lower risk.
              </p>
            </Card>
          </div>
        </section>

        <section className="mb-20 bg-brand-gradient-soft rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Understanding Double Materiality
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-brand-purple mb-3">Impact Materiality</h3>
                <p className="text-gray-700">
                  How the company's operations affect the environment, people, and society. This includes carbon emissions, labor practices, and community impact.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-brand-orange mb-3">Financial Materiality</h3>
                <p className="text-gray-700">
                  How ESG factors affect the company's financial performance, risks, and opportunities. Climate risks, regulatory changes, and social controversies impact valuation.
                </p>
              </div>
            </div>
            <p className="text-center text-gray-700 mt-6 font-medium">
              Our assessment evaluates both dimensions to provide comprehensive ESG risk intelligence.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-purple text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Answer Targeted Questions</h3>
                <p className="text-gray-600">
                  Complete our comprehensive assessment covering Environmental, Social, and Governance dimensions. Questions are designed to reveal material risks and opportunities.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Receive Instant Analysis</h3>
                <p className="text-gray-600">
                  Our algorithm applies double materiality principles to calculate ESG maturity scores, identify critical risks, and flag regulatory compliance gaps.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-redorange text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Get Actionable Recommendations</h3>
                <p className="text-gray-600">
                  View detailed breakdown of scores, prioritized risks by severity, opportunities for value creation, and concrete next steps to address identified gaps.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <Card variant="gradient" className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Built for Investment Professionals
            </h2>
            <div className="flex flex-wrap justify-center gap-8 text-gray-700">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-brand-purple" />
                <span className="font-medium">Private Equity Firms</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-brand-orange" />
                <span className="font-medium">Venture Capital Funds</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck size={20} className="text-brand-redorange" />
                <span className="font-medium">M&A Advisors</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-brand-purple" />
                <span className="font-medium">Institutional Investors</span>
              </div>
            </div>
          </Card>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Discover Your ESG Risk Profile?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get comprehensive insights into ESG maturity, regulatory compliance gaps, and material risks in minutes.
          </p>
          <Button onClick={onStartAssessment} size="lg" className="shadow-2xl">
            Begin Assessment Now →
          </Button>
        </section>

        <footer className="text-center pt-12 border-t border-gray-200">
          <p className="text-gray-600 mb-2">
            Powered by <span className="font-bold text-brand-purple">Good Growth Collective</span>
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Sustainability as a Service • ESG Strategy • CSRD Compliance
          </p>
          <p className="text-sm text-gray-500">
            Need expert guidance? <button className="text-brand-orange hover:text-brand-redorange font-semibold underline">Contact us for consultation</button>
          </p>
        </footer>
      </div>
    </div>
  );
}
