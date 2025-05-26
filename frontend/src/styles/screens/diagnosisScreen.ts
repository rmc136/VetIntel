import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
    borderRadius: 10,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  resultText: {
    textAlign: 'center',
  },
}); 