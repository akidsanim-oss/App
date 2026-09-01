import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import { useTheme } from '../lib/theme';
import { TrendItem } from '../lib/data';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

interface TrendCardProps {
  trend: TrendItem;
  onPress: () => void;
  index: number;
  isLarge?: boolean;
}

export const TrendCard: React.FC<TrendCardProps> = ({ trend, onPress, index, isLarge = false }) => {
  const { isDark } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const rotateX = useRef(new Animated.Value(0)).current;
  const rotateY = useRef(new Animated.Value(0)).current;
  const shadow = useRef(new Animated.Value(0.3)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, friction: 8 }),
      Animated.timing(shadow, { toValue: 0.6, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }),
      Animated.timing(shadow, { toValue: 0.3, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const animatedStyle = {
    transform: [
      { scale },
      { perspective: 1000 },
      { rotateX: rotateX.interpolate({ inputRange: [-1, 1], outputRange: ['-5deg', '5deg'] }) },
      { rotateY: rotateY.interpolate({ inputRange: [-1, 1], outputRange: ['-5deg', '5deg'] }) },
    ],
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.card,
          isLarge ? styles.largeCard : styles.smallCard,
          animatedStyle,
          {
            backgroundColor: isDark ? '#161618' : '#FFFFFF',
            shadowOpacity: shadow,
            marginLeft: index === 0 ? 24 : 0,
          },
        ]}
      >
        <LinearGradient
          colors={trend.gradient as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, isLarge ? styles.largeGradient : styles.smallGradient]}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name={trend.icon as any}
              size={isLarge ? 32 : 24}
              color="#FFFFFF"
              style={styles.icon}
            />
          </View>
          {trend.featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}
        </LinearGradient>

        <View style={styles.content}>
          <Text style={[styles.title, { color: isDark ? '#F0F0EB' : '#1A1A1A' }]}>
            {trend.title}
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#B0B0A8' : '#4A4A4A' }]}>
            {trend.subtitle}
          </Text>
          {isLarge && (
            <Text
              style={[styles.description, { color: isDark ? '#6A6A65' : '#8A8A8A' }]}
              numberOfLines={2}
            >
              {trend.description}
            </Text>
          )}
          <View style={styles.tags}>
            {trend.tags.slice(0, isLarge ? 3 : 2).map((tag, i) => (
              <View
                key={i}
                style={[styles.tag, { backgroundColor: isDark ? '#2A2A2E' : '#F0F0EB' }]}
              >
                <Text style={[styles.tagText, { color: isDark ? '#B0B0A8' : '#4A4A4A' }]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 8,
  },
  largeCard: {
    width: CARD_WIDTH,
    marginRight: 16,
    marginBottom: 16,
  },
  smallCard: {
    width: 200,
    marginRight: 12,
    marginBottom: 12,
  },
  gradient: {
    padding: 20,
    position: 'relative',
  },
  largeGradient: {
    padding: 28,
  },
  smallGradient: {
    padding: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  icon: {
    opacity: 0.95,
  },
  featuredBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
