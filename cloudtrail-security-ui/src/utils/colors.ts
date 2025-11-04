import { colors } from '@theme/colors';

export const getSeverityColor = (severity: string): string => {
  const severityMap: Record<string, string> = {
    CRITICAL: colors.severity.critical,
    HIGH: colors.severity.high,
    MEDIUM: colors.severity.medium,
    LOW: colors.severity.low,
    INFO: colors.severity.info,
  };
  return severityMap[severity] || colors.severity.info;
};

export const getRiskColor = (riskScore: number): string => {
  if (riskScore >= 80) return colors.severity.critical;
  if (riskScore >= 60) return colors.severity.high;
  if (riskScore >= 40) return colors.severity.medium;
  return colors.severity.low;
};
