export interface Brief {
  problem: string;
  userResearch?: string;
  constraints?: string;
  audience?: string;
}

export interface CritiqueScores {
  clarity: number;
  measurability: number;
  risk_coverage: number;
  alternatives: number;
  stakeholders: number;
}

export interface CritiqueFeedback {
  clarity: string;
  measurability: string;
  risk_coverage: string;
  alternatives: string;
  stakeholders: string;
}

export interface Critique {
  scores: CritiqueScores;
  feedback: CritiqueFeedback;
  overall_comment: string;
}

export type AppPhase =
  | 'idle'
  | 'generating'
  | 'critiquing'
  | 'ready'
  | 'refining'
  | 'error';
