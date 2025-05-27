import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, Animated, View, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/components/animatedButton';

interface AnimatedButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export const AnimatedButton = ({ onPress, title, disabled = false }: AnimatedButtonProps) => {
  const colorAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Color gradient animation
    const animateGradient = () => {
      Animated.loop(
        Animated.timing(colorAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        })
      ).start();
    };

    // Pulse animation
    const animatePulse = () => {
      Animated.sequence([
        // Quick expansion
        Animated.timing(scaleAnimation, {
          toValue: 1.08,
          duration: 200,
          easing: Easing.cubic,
          useNativeDriver: true,
        }),
        // Return to normal
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 200,
          easing: Easing.cubic,
          useNativeDriver: true,
        }),
        // Pause before next animation
        Animated.delay(2000),
      ]).start(() => animatePulse());
    };

    if (!disabled) {
      animateGradient();
      animatePulse();
    }
  }, [colorAnimation, scaleAnimation, disabled]);

  const onPressIn = () => {
    if (!disabled) {
      Animated.spring(scaleAnimation, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    }
  };

  const onPressOut = () => {
    if (!disabled) {
      Animated.spring(scaleAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const translateX = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View 
      style={[
        styles.buttonContainer, 
        { transform: [{ scale: scaleAnimation }] },
        disabled && styles.buttonDisabled
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={1}
        disabled={disabled}
      >
        <LinearGradient
          colors={[
            '#0033FF', // Deep royal blue
            '#0099FF', // Bright sky blue
            '#00CCFF', // Cyan
            '#00FFE5', // Turquoise
            '#00FF99', // Mint green
            '#0033FF', // Back to deep royal blue
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 0 }}
          style={[styles.gradient, disabled && styles.gradientDisabled]}
        >
          <Animated.View
            style={[
              styles.gradientOverlay,
              {
                transform: [{ translateX }],
              },
            ]}
          />
          <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}; 