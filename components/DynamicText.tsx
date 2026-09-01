import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { typography, colors } from '../lib/theme';

interface DynamicTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'label';
  color?: string;
  interactive?: boolean;
  style?: any;
  onPress?: () => void;
}

const variantMap = {
  h1: typography.h1,
  h2: typography.h2,
  h3: typography.h3,
  h4: typography.h4,
  body: typography.body,
  bodySmall: typography.bodySmall,
  caption: typography.caption,
  label: typography.label,
};

export default function DynamicText({
  children,
  variant = 'body',
  color = colors.text,
  interactive = false,
  style,
  onPress,
}: DynamicTextProps) {
  const scale = useSharedValue(1);
  const letterSpacing = useSharedValue(variantMap[variant].letterSpacing);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      letterSpacing: letterSpacing.value,
    };
  });

  const handlePressIn = () => {
    if (interactive) {
      scale.value = withSpring(1.05, { stiffness: 300, damping: 15 });
      letterSpacing.value = withSpring(variantMap[variant].letterSpacing + 1, { stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    if (interactive) {
      scale.value = withSpring(1, { stiffness: 300, damping: 15 });
      letterSpacing.value = withSpring(variantMap[variant].letterSpacing, { stiffness: 300 });
    }
  };

  const baseStyle = [variantMap[variant], { color }, style];

  if (interactive) {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.Text style={[baseStyle, animatedStyle]}>{children}</Animated.Text>
      </Pressable>
    );
  }

  return <Text style={baseStyle}>{children}</Text>;
}

const styles = StyleSheet.create({
  // Base styles applied inline
});
