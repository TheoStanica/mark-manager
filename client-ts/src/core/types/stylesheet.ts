import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export interface StyleSheet {
  [key: string]: SxProps<Theme>;
}
