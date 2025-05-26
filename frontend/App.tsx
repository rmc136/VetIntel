import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { DiagnosisScreen } from './src/screens/DiagnosisScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');

  return (
    <View style={styles.container}>
      {currentScreen === 'welcome' && <WelcomeScreen onStart={() => setCurrentScreen('home')} />}
      {currentScreen === 'home' && <HomeScreen onDiagnosis={() => setCurrentScreen('diagnosis')} />}
      {currentScreen === 'diagnosis' && <DiagnosisScreen onBack={() => setCurrentScreen('home')} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
