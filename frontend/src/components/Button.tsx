import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../styles/theme';
import { styles } from '../styles/components/button';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ onPress, title, variant = 'primary' }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: variant === 'primary' ? colors.primary : colors.secondary },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}; 