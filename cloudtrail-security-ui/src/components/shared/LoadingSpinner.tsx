import { Box, CircularProgress, Typography } from '@mui/material';
import { LoadingSpinnerProps } from '../../types/component.types';

export const LoadingSpinner = ({ size = 40, message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4}>
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary" mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
};
