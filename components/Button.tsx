import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyles = () => {
    const baseStyle: ViewStyle[] = [styles.button];
    
    // Button type
    if (type === 'primary') baseStyle.push(styles.primary);
    if (type === 'secondary') baseStyle.push(styles.secondary);
    if (type === 'outline') baseStyle.push(styles.outline);
    
    // Button size
    if (size === 'small') baseStyle.push(styles.small);
    if (size === 'medium') baseStyle.push(styles.medium);
    if (size === 'large') baseStyle.push(styles.large);
    
    // Disabled state
    if (disabled) baseStyle.push(styles.disabled);
    
    return baseStyle;
  };
  
  const getTextStyles = () => {
    const baseStyle: TextStyle[] = [styles.text];
    
    if (type === 'outline') baseStyle.push(styles.outlineText);
    if (disabled) baseStyle.push(styles.disabledText);
    
    return baseStyle;
  };
  
  return (
    <TouchableOpacity 
      style={[...getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={type === 'outline' ? '#E91E63' : 'white'} />
      ) : (
        <Text style={[...getTextStyles(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    color: 'white',
  },
  // Button types
  primary: {
    backgroundColor: '#E91E63',
  },
  secondary: {
    backgroundColor: '#9C27B0',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E91E63',
  },
  outlineText: {
    color: '#E91E63',
  },
  // Button sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  // Disabled state
  disabled: {
    backgroundColor: '#CCCCCC',
    borderColor: '#CCCCCC',
  },
  disabledText: {
    color: '#888888',
  },
});

export default Button;
