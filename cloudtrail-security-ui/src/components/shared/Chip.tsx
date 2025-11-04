import { Chip as MuiChip } from '@mui/material';
import { ChipProps } from '../../types/component.types';

export const Chip = ({
  label,
  color = 'default',
  variant = 'filled',
  onDelete,
}: ChipProps) => {
  return <MuiChip label={label} color={color} variant={variant} onDelete={onDelete} />;
};
