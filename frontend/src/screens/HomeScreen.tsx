import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { AnimatedButton } from '../components/AnimatedButton';
import { styles } from '../styles/screens/homeScreen';

interface HomeScreenProps {
  onDiagnosis: () => void;
}

export const HomeScreen = ({ onDiagnosis }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <View style={[styles.content, { zIndex: 1 }]}>
        <Text style={styles.title}>Welcome to VetIntel</Text>
        <Text style={styles.subtitle}>Your AI-powered veterinary assistant</Text>

        <AnimatedButton 
          title="Start Diagnosis" 
          onPress={onDiagnosis}
        />
      </View>
    </View>
  );
}; 