import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.large,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: spacing.large,
    borderRadius: borderRadius.medium,
    borderWidth: 2,
    borderColor: colors.border,
  },
  resultContainer: {
    backgroundColor: colors.border,
    padding: spacing.large,
    borderRadius: borderRadius.medium,
    marginTop: spacing.large,
    width: '100%',
    alignItems: 'center',
  },
  resultText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
}); 