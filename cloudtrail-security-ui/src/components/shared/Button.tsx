import { Button as MuiButton } from '@mui/material';
import { ButtonProps } from '../../types/component.types';

export const Button = ({
  children,
  onClick,
  variant = 'contained',
  color = 'primary',
  disabled = false,
  fullWidth = false,
  className = '',
}: ButtonProps) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      className={className}
    >
      {children}
    </MuiButton>
  );
};
