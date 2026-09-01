import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { colors, radius, shadows } from '../lib/theme';

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
  depth?: number;
}

export default function AnimatedCard({ children, onPress, style, depth = 1 }: AnimatedCardProps) {
  const scale = useSharedValue(1);
  const elevation = useSharedValue(depth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { perspective: 1000 },
      ],
      shadowOpacity: interpolate(elevation.value, [0, 1, 2], [0.2, 0.3, 0.4]),
      shadowRadius: interpolate(elevation.value, [0, 1, 2], [4, 8, 16]),
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { stiffness: 400, damping: 20 });
    elevation.value = withSpring(0, { stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { stiffness: 400, damping: 20 });
    elevation.value = withSpring(depth, { stiffness: 300 });
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.card, shadows.md, animatedStyle, style]}>
          {children}
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <Animated.View style={[styles.card, shadows.sm, animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
});
