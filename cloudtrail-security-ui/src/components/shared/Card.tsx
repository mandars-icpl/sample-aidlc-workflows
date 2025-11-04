import { Card as MuiCard } from '@mui/material';
import { CardProps } from '../../types/component.types';

export const Card = ({ children, className = '', elevation = 2 }: CardProps) => {
  return (
    <MuiCard elevation={elevation} className={className} sx={{ p: 2 }}>
      {children}
    </MuiCard>
  );
};
