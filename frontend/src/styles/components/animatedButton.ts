import { StyleSheet, Platform } from 'react-native';
import { spacing, borderRadius } from '../theme';

export const styles = StyleSheet.create({
  buttonContainer: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
    borderRadius: borderRadius.large,
    alignSelf: 'center',
  },
  touchable: {
    minWidth: 200,
    borderRadius: borderRadius.large,
    overflow: 'hidden',
  },
  gradient: {
    paddingHorizontal: spacing.xlarge,
    paddingVertical: spacing.medium,
    borderRadius: borderRadius.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    right: 0,
    bottom: 0,
    width: '200%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
}); 