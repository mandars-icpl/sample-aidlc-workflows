import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  elevation?: number;
}

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export interface BadgeProps {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  label: string;
}

export interface ChipProps {
  label: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
  variant?: 'filled' | 'outlined';
  onDelete?: () => void;
}

export interface LoadingSpinnerProps {
  size?: number;
  message?: string;
}
