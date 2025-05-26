import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const AnimatedBackground: React.FC = () => {
  const colorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnimation, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnimation, {
          toValue: 2,
          duration: 5000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnimation, {
          toValue: 3,
          duration: 5000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnimation, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = colorAnimation.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [
      'rgba(0, 0, 0, 0.9)',     // Deep black
      'rgba(32, 32, 32, 0.9)',  // Dark grey
      'rgba(64, 64, 64, 0.9)',  // Medium grey
      'rgba(96, 96, 96, 0.9)',  // Light grey
    ],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'rgba(32, 32, 32, 0.8)']}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
}); 