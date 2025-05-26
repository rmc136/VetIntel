import { StyleSheet } from 'react-native';

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
    gap: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
    borderRadius: 8,
  },
  resultContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  resultText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
}); 