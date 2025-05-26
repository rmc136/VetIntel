import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../theme';

export const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing.xlarge,
    paddingVertical: spacing.medium,
    borderRadius: borderRadius.large,
    ...shadows.button,
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
}); 