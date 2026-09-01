import React, { useRef } from 'react';
import { View, StyleSheet, Animated, Pressable } from 'react-native';
import { useTheme } from '../lib/theme';

export const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
  intensity?: number;
}> = ({ children, style, onPress, intensity = 0.08 }) => {
  const { isDark } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, friction: 8 }),
      Animated.timing(opacity, { toValue: 0.85, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }),
      Animated.timing(opacity, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      onPress={onPress}
      onPressIn={onPress ? handlePressIn : undefined}
      onPressOut={onPress ? handlePressOut : undefined}
    >
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: isDark
              ? `rgba(30, 30, 34, ${intensity + 0.5})`
              : `rgba(255, 255, 255, ${intensity + 0.7})`,
            borderColor: isDark
              ? `rgba(255, 255, 255, ${intensity})`
              : `rgba(0, 0, 0, ${intensity * 0.5})`,
            transform: [{ scale }],
            opacity,
          },
          style,
        ]}
      >
        {children}
      </Animated.View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderTopWidth: 1.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 32,
    shadowOpacity: 0.12,
    elevation: 8,
    backdropFilter: 'blur(20px)',
  },
});
