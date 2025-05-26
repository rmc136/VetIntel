import React from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { AnimatedButton } from '../components/AnimatedButton';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { styles } from '../styles/screens/welcomeScreen';

type RootDrawerParamList = {
  Welcome: undefined;
  Diagnosis: undefined;
};

type NavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Welcome'>;

export const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <View style={styles.content}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <AnimatedButton 
          title="Start Now" 
          onPress={() => navigation.navigate('Diagnosis')}
        />
      </View>
    </View>
  );
}; 