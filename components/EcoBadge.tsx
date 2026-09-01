import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../lib/theme';
import { Ionicons } from '@expo/vector-icons';

export const EcoBadge: React.FC<{ size?: 'sm' | 'md' | 'lg'; animated?: boolean }> = ({
  size = 'md',
  animated = true,
}) => {
  const { isDark } = useTheme();
  const pulse = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.15, duration: 800, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotate, { toValue: 1, duration: 2000, useNativeDriver: true }),
          Animated.timing(rotate, { toValue: 0, duration: 2000, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [animated]);

  const sizes = {
    sm: { padding: 4, fontSize: 10, iconSize: 12, paddingHorizontal: 8 },
    md: { padding: 6, fontSize: 12, iconSize: 14, paddingHorizontal: 12 },
    lg: { padding: 8, fontSize: 14, iconSize: 16, paddingHorizontal: 16 },
  };

  const s = sizes[size];

  return (
    <Animated.View
      style={[
        styles.badge,
        {
          backgroundColor: isDark ? '#2A3A25' : '#E8EDE6',
          padding: s.padding,
          paddingHorizontal: s.paddingHorizontal,
          transform: [{ scale: pulse }],
        },
      ]}
    >
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotate.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '10deg'],
              }),
            },
          ],
        }}
      >
        <Ionicons
          name="leaf"
          size={s.iconSize}
          color={isDark ? '#7BB661' : '#2D5A27'}
        />
      </Animated.View>
      <Text
        style={[
          styles.text,
          {
            color: isDark ? '#7BB661' : '#2D5A27',
            fontSize: s.fontSize,
          },
        ]}
      >
        Eco-Optimized
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export const StatPill: React.FC<{
  label: string;
  value: string;
  color?: string;
}> = ({ label, value, color }) => {
  const { isDark } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const animate = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.1, duration: 150, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    const timer = setTimeout(animate, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        styles.pill,
        {
          backgroundColor: isDark ? '#1E1E22' : '#F5F5F0',
          transform: [{ scale }],
        },
      ]}
    >
      <Text style={[styles.pillValue, { color: color || (isDark ? '#7BB661' : '#2D5A27') }]}>
        {value}
      </Text>
      <Text style={[styles.pillLabel, { color: isDark ? '#6A6A65' : '#8A8A8A' }]}>
        {label}
      </Text>
    </Animated.View>
  );
};

const pillStyles = StyleSheet.create({
  pill: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 80,
  },
  pillValue: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  pillLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

styles.pill = pillStyles.pill;
styles.pillValue = pillStyles.pillValue;
styles.pillLabel = pillStyles.pillLabel;
