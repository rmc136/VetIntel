import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
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