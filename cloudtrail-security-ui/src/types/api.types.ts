export interface GeoLocation {
  city: string;
  region: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  timezone: string;
  org: string;
}

export interface Authentication {
  timestamp: string;
  source_ip: string;
  source_ip_geo: GeoLocation;
  risk_score: number;
}

export interface HighRiskUser {
  user_id: string;
  avg_risk: number;
  recent_authentications: Authentication[];
}

export interface AlertDetails {
  event: string;
  reasoning: string;
}

export interface Alert {
  timestamp: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  user_id: string;
  type: string;
  risk_score: number;
  details: AlertDetails;
  source_ip_geo: GeoLocation;
}

export interface AttackTimelineEvent {
  phase: string;
  event: string;
  timestamp: string;
  risk_score: number;
}

export interface Attacker {
  user_id: string;
  attack_detected: boolean;
  attack_type: string;
  overall_risk_score: number;
  total_malicious_events: number;
  kill_chain_phases: Record<string, number>;
  attack_timeline: AttackTimelineEvent[];
  suspicious_indicators: string[];
}

export interface KillChainCoverage {
  phases_observed: string[];
  total_phases: number;
  severity: string;
}

export interface KillChainAnalysis {
  attackers: Attacker[];
  total_attacks: number;
  kill_chain_coverage: KillChainCoverage;
}

export interface ReportSummary {
  total_behaviors: number;
  total_authentications: number;
  total_privilege_requests: number;
  anomalies_detected: number;
  suspicious_authentications: number;
  denied_privileges: number;
}

export interface JobReport {
  summary: ReportSummary;
  high_risk_users: HighRiskUser[];
  recent_alerts: Alert[];
  kill_chain_analysis: KillChainAnalysis;
}

export interface Job {
  job_id: string;
  status: 'processing' | 'completed' | 'failed';
  events_processed: number;
  alerts_generated: number;
  error: string | null;
  report: JobReport | null;
}

export interface FetchCloudTrailRequest {
  hours: number;
  max_events: number;
}

export interface FetchCloudTrailResponse {
  job_id: string;
  status: string;
  message: string;
}
