export interface CompanyProfile {
  industry: string;
  size: string;
  revenue: string;
  geography: string;
  ownership: string;
}

export interface EnvironmentalResponses {
  ghgTracking: number;
  energyManagement: number;
  wasteReduction: number;
  waterUsage: number;
  climateStrategy: number;
}

export interface SocialResponses {
  laborPractices: number;
  healthSafety: number;
  diversityInclusion: number;
  supplyChain: number;
  communityEngagement: number;
}

export interface GovernanceResponses {
  boardStructure: number;
  complianceFramework: number;
  riskManagement: number;
  transparency: number;
  ethicsCode: number;
}

export interface MaturityResponses {
  hasESGReport: number;
  hasCertifications: string[];
  hasESGTeam: number;
  stakeholderEngagement: number;
}

export interface AssessmentData {
  companyProfile: CompanyProfile;
  environmental: EnvironmentalResponses;
  social: SocialResponses;
  governance: GovernanceResponses;
  maturity: MaturityResponses;
}

export interface AssessmentScores {
  overall: number;
  environmental: number;
  social: number;
  governance: number;
  maturityLevel: 'Foundation' | 'Developing' | 'Established' | 'Advanced' | 'Leading';
}

export interface Risk {
  category: 'Environmental' | 'Social' | 'Governance';
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  recommendation: string;
  isRegulatory: boolean;
}

export interface AssessmentResult {
  scores: AssessmentScores;
  risks: Risk[];
  opportunities: string[];
  nextSteps: string[];
}
