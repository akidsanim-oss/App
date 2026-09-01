import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { colors, radius, typography, spacing } from '../lib/theme';
import { Trend } from '../lib/trends';
import { isFavorite, toggleFavorite } from '../lib/storage';
import DynamicText from './DynamicText';

interface TrendCardProps {
  trend: Trend;
  onPress: () => void;
  featured?: boolean;
}

export default function TrendCard({ trend, onPress, featured = false }: TrendCardProps) {
  const [fav, setFav] = useState(false);
  const scale = useSharedValue(1);

  useEffect(() => {
    isFavorite(trend.id).then(setFav);
  }, [trend.id]);

  const handleToggleFav = async () => {
    const result = await toggleFavorite(trend.id);
    setFav(result);
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { stiffness: 400, damping: 20 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { stiffness: 400, damping: 20 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.card,
          featured && styles.featured,
          animatedStyle,
          { borderLeftColor: trend.color, borderLeftWidth: 3 },
        ]}
      >
        <View style={styles.header}>
          <View style={[styles.iconWrap, { backgroundColor: trend.color + '20' }]}>
            <Ionicons name={trend.icon as any} size={20} color={trend.color} />
          </View>
          <View style={styles.favBtn}>
            <Pressable onPress={handleToggleFav} hitSlop={12}>
              <Ionicons
                name={fav ? 'heart' : 'heart-outline'}
                size={22}
                color={fav ? colors.error : colors.textMuted}
              />
            </Pressable>
          </View>
        </View>

        <DynamicText variant={featured ? 'h3' : 'h4'} style={styles.title}>
          {trend.title}
        </DynamicText>
        <DynamicText variant="bodySmall" color={colors.textSecondary} style={styles.subtitle}>
          {trend.subtitle}
        </DynamicText>

        <View style={styles.footer}>
          <View style={[styles.badge, { backgroundColor: trend.color + '15' }]}>
            <DynamicText variant="caption" style={[styles.badgeText, { color: trend.color }]}>
              {trend.category}
            </DynamicText>
          </View>
          <View style={[styles.diffBadge, {
            backgroundColor: trend.difficulty === 'Beginner' ? colors.ecoSoft :
              trend.difficulty === 'Intermediate' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)'
          }]}>
            <DynamicText variant="caption" style={{
              color: trend.difficulty === 'Beginner' ? colors.eco :
                trend.difficulty === 'Intermediate' ? colors.warning : colors.error
            }}>
              {trend.difficulty}
            </DynamicText>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  featured: {
    backgroundColor: colors.surfaceElevated,
    padding: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtn: {
    padding: spacing.sm,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  badgeText: {
    fontSize: 11,
  },
  diffBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
});
