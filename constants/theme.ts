import { colors } from './colors';
import { sizes } from './sizes';

export const theme = {
  colors,
  sizes,
  
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 20,
      xxxl: 24,
      display: 32,
    },
    lineHeight: {
      xs: 14,
      sm: 18,
      md: 22,
      lg: 24,
      xl: 28,
      xxl: 32,
      xxxl: 36,
      display: 48,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    round: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    md: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  
  // Design system rules
  buttonVariants: {
    primary: {
      backgroundColor: colors.primary,
      textColor: colors.white,
    },
    secondary: {
      backgroundColor: colors.secondary,
      textColor: colors.white,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.primary,
      borderWidth: 1,
      textColor: colors.primary,
    },
  },
  
  inputStyles: {
    default: {
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: colors.white,
    },
    focused: {
      borderColor: colors.primary,
    },
    error: {
      borderColor: colors.error,
    },
  },
};

export default theme;
