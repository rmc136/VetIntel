import React from 'react';
import { View, Image } from 'react-native';
import { AnimatedButton } from '../components/AnimatedButton';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { styles } from '../styles/screens/welcomeScreen';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <View style={[styles.content, { zIndex: 1 }]}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <AnimatedButton 
          title="Start Now" 
          onPress={onStart}
        />
      </View>
    </View>
  );
}; 