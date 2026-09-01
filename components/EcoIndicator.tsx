import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, spacing, radius } from '../lib/theme';
import DynamicText from './DynamicText';

interface EcoIndicatorProps {
  label: string;
  value: string;
  icon?: string;
  compact?: boolean;
}

export default function EcoIndicator({ label, value, icon = 'leaf', compact = false }: EcoIndicatorProps) {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  if (compact) {
    return (
      <View style={styles.compact}>
        <Animated.View style={spinStyle}>
          <Ionicons name={icon as any} size={14} color={colors.eco} />
        </Animated.View>
        <DynamicText variant="caption" color={colors.eco}>
          {value}
        </DynamicText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Animated.View style={spinStyle}>
          <Ionicons name={icon as any} size={24} color={colors.eco} />
        </Animated.View>
      </View>
      <View>
        <DynamicText variant="h4" color={colors.text}>{value}</DynamicText>
        <DynamicText variant="caption" color={colors.textSecondary}>{label}</DynamicText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ecoSoft,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.eco + '20',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.eco + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.ecoSoft,
    borderRadius: radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
