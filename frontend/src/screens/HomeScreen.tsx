import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedButton } from '../components/AnimatedButton';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { styles } from '../styles/screens/homeScreen';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <View style={[styles.content, { zIndex: 1 }]}>
        <Text style={styles.title}>Welcome to VetIntel</Text>
        <Text style={styles.subtitle}>Your AI-powered veterinary assistant</Text>
        <AnimatedButton 
          title="Start Diagnosis" 
          onPress={() => navigation.navigate('DiagnosisStack', { screen: 'GeneralDiagnosis' })}

        />
      </View>
    </View>
  );
}; 