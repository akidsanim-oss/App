import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Pressable,
  Dimensions,
} from 'react-native';
import { useTheme } from '../lib/theme';
import { getTrendById, TrendItem } from '../lib/data';
import { AnimatedTypography, MorphingText } from '../components/AnimatedTypography';
import { StatPill } from '../components/EcoBadge';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const FAVORITES_KEY = '@ui_trends_favorites';

export const TrendDetailScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { isDark } = useTheme();
  const { id } = route.params;
  const trend = getTrendById(id);
  const fadeIn = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;
  const [isFavorite, setIsFavorite] = useState(false);
  const [heartScale, setHeartScale] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const favorites = JSON.parse(stored);
        setIsFavorite(favorites.includes(id));
      }
    } catch (e) {}
  };

  const toggleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const favorites = stored ? JSON.parse(stored) : [];
      const newFavorites = favorites.includes(id)
        ? favorites.filter((f: string) => f !== id)
        : [...favorites, id];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
      Animated.sequence([
        Animated.timing(heartScale, { toValue: 1.3, duration: 150, useNativeDriver: true }),
        Animated.timing(heartScale, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    } catch (e) {}
  };

  if (!trend) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Trend not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0D0D0F' : '#F5F5F0' }]}>
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeIn,
          transform: [{ translateY }],
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header Gradient */}
          <LinearGradient
            colors={trend.gradient as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerTop}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.backBtn}
              >
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </Pressable>
              <Pressable onPress={toggleFavorite}>
                <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                  <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={26}
                    color={isFavorite ? '#FF6B6B' : '#FFFFFF'}
                  />
                </Animated.View>
              </Pressable>
            </View>

            <View style={styles.headerContent}>
              <View style={styles.headerIcon}>
                <Ionicons name={trend.icon as any} size={36} color="#FFFFFF" />
              </View>
              <Text style={styles.headerTitle}>{trend.title}</Text>
              <Text style={styles.headerSubtitle}>{trend.subtitle}</Text>
            </View>
          </LinearGradient>

          {/* Content */}
          <View style={styles.content}>
            {/* Stats */}
            <View style={styles.statsRow}>
              {trend.stats.map((stat, i) => (
                <StatPill key={i} label={stat.label} value={stat.value} color={trend.color} />
              ))}
            </View>

            {/* Description */}
            <View style={styles.section}>
              <AnimatedTypography variant="subtitle">About</AnimatedTypography>
              <Text
                style={[
                  styles.description,
                  { color: isDark ? '#B0B0A8' : '#4A4A4A' },
                ]}
              >
                {trend.description}
              </Text>
            </View>

            {/* Tags */}
            <View style={styles.section}>
              <AnimatedTypography variant="subtitle">Tags</AnimatedTypography>
              <View style={styles.tagsRow}>
                {trend.tags.map((tag, i) => (
                  <View
                    key={i}
                    style={[
                      styles.tag,
                      {
                        backgroundColor: isDark ? '#2A2A2E' : '#F0F0EB',
                        borderColor: trend.color + '30',
                        borderWidth: 1,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        { color: isDark ? '#B0B0A8' : '#4A4A4A' },
                      ]}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Design Tips */}
            <View style={styles.section}>
              <AnimatedTypography variant="subtitle">Design Tips</AnimatedTypography>
              <View style={styles.tipsList}>
                {trend.tips.map((tip, i) => {
                  const tipScale = useRef(new Animated.Value(1)).current;
                  return (
                    <Pressable
                      key={i}
                      onPressIn={() =>
                        Animated.spring(tipScale, {
                          toValue: 0.97,
                          useNativeDriver: true,
                          friction: 8,
                        }).start()
                      }
                      onPressOut={() =>
                        Animated.spring(tipScale, {
                          toValue: 1,
                          useNativeDriver: true,
                          friction: 6,
                        }).start()
                      }
                    >
                      <Animated.View
                        style={[
                          styles.tipCard,
                          {
                            backgroundColor: isDark ? '#161618' : '#FFFFFF',
                            transform: [{ scale: tipScale }],
                            marginTop: i > 0 ? 10 : 0,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.tipNumber,
                            { backgroundColor: trend.color + '15' },
                          ]}
                        >
                          <Text style={[styles.tipNumberText, { color: trend.color }]}>
                            {i + 1}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.tipText,
                            { color: isDark ? '#F0F0EB' : '#1A1A1A' },
                          ]}
                        >
                          {tip}
                        </Text>
                      </Animated.View>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Action Button */}
            <View style={styles.actionArea}>
              <Pressable
                onPress={() => navigation.navigate('Gallery')}
                style={[
                  styles.actionBtn,
                  { backgroundColor: trend.color },
                ]}
              >
                <Ionicons name="cube" size={20} color="#FFFFFF" />
                <Text style={styles.actionBtnText}>Explore in 3D Gallery</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerGradient: {
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 24,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },
  section: {
    marginTop: 24,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    marginTop: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tipsList: {
    marginTop: 12,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.04,
    elevation: 2,
  },
  tipNumber: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  tipNumberText: {
    fontSize: 14,
    fontWeight: '800',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  actionArea: {
    marginTop: 32,
    marginBottom: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 18,
    gap: 10,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
