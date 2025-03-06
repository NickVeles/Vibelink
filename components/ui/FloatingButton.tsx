import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
interface FloatingButtonProps {
  onPress: () => void;
  color1: string;
  color2: string;
  content: React.ReactNode;
  disabled?: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  color1,
  color2,
  content,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { opacity: disabled ? 0.5 : 1 }]}
      onPress={onPress}
      disabled={disabled}
    >
      <LinearGradient
        colors={[color1, color2]}
        start={[0, 1]}
        end={[1, 0]}
        style={{ borderRadius: 30 }}
      >
        {content}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30, // Changed to 30 to match the width and height
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 16,
    right: 16,
  },
});

export default FloatingButton;
