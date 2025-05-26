import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme';

export const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: -Dimensions.get('window').height * 0.6,
    left: -Dimensions.get('window').width * 0.3,
    width: Dimensions.get('window').width * 1.6,
    height: Dimensions.get('window').height * 1.6,
    backgroundColor: colors.backgroundLight,
    borderRadius: Dimensions.get('window').height * 0.8,
  },
}); 