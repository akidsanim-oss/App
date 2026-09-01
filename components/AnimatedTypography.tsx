import React, { useRef } from 'react';
import { Text, StyleSheet, Animated, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../lib/theme';

interface AnimatedTypographyProps {
  children: string;
  variant?: 'hero' | 'title' | 'subtitle' | 'body' | 'caption' | 'stat';
  style?: ViewStyle;
  animated?: boolean;
}

export const AnimatedTypography: React.FC<AnimatedTypographyProps> = ({
  children,
  variant = 'body',
  style,
  animated = true,
}) => {
  const { isDark } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const weightAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!animated) return;
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1.05, useNativeDriver: true, friction: 8 }),
      Animated.timing(weightAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 0.8, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    if (!animated) return;
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 6 }),
      Animated.timing(weightAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const variants = {
    hero: { fontSize: 42, fontWeight: '800' as const, letterSpacing: -1.5, lineHeight: 48 },
    title: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.8, lineHeight: 34 },
    subtitle: { fontSize: 18, fontWeight: '600' as const, letterSpacing: -0.3, lineHeight: 24 },
    body: { fontSize: 15, fontWeight: '400' as const, letterSpacing: 0, lineHeight: 22 },
    caption: { fontSize: 12, fontWeight: '500' as const, letterSpacing: 0.5, lineHeight: 16, textTransform: 'uppercase' as const },
    stat: { fontSize: 36, fontWeight: '700' as const, letterSpacing: -1, lineHeight: 42 },
  };

  const v = variants[variant];

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.Text
        style={[
          {
            fontSize: v.fontSize,
            fontWeight: v.fontWeight,
            letterSpacing: v.letterSpacing,
            lineHeight: v.lineHeight,
            color: isDark ? '#F0F0EB' : '#1A1A1A',
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
          style,
        ]}
      >
        {children}
      </Animated.Text>
    </Pressable>
  );
};

export const MorphingText: React.FC<{ text: string; style?: any }> = ({ text, style }) => {
  const { isDark } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.02, duration: 2000, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.Text
      style={[
        {
          fontSize: 16,
          fontWeight: '500',
          color: isDark ? '#B0B0A8' : '#4A4A4A',
          transform: [{ scale }, { translateY }],
        },
        style,
      ]}
    >
      {text}
    </Animated.Text>
  );
};
