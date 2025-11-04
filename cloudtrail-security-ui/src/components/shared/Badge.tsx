import { Chip } from '@mui/material';
import { BadgeProps } from '../../types/component.types';
import { getSeverityColor } from '@utils/colors';

export const Badge = ({ severity, label }: BadgeProps) => {
  const color = getSeverityColor(severity);
  return <Chip label={label} size="small" sx={{ bgcolor: color, color: '#fff' }} />;
};
