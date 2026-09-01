import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  ScrollView,
  Pressable,
} from 'react-native';
import { useTheme } from '../lib/theme';
import { trends, TrendItem } from '../lib/data';
import { TrendCard } from '../components/TrendCard';
import { AnimatedTypography, MorphingText } from '../components/AnimatedTypography';
import { EcoBadge } from '../components/EcoBadge';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { isDark } = useTheme();
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const featured = trends.filter(t => t.featured);
  const categories = [
    { name: 'All', icon: 'grid', count: trends.length },
    { name: 'Eco', icon: 'leaf', count: trends.filter(t => t.category === 'eco').length },
    { name: 'Dark', icon: 'moon', count: trends.filter(t => t.category === 'dark').length },
    { name: 'Minimal', icon: 'remove-circle', count: trends.filter(t => t.category === 'minimal').length },
    { name: '3D', icon: 'cube', count: trends.filter(t => t.category === '3d').length },
    { name: 'Motion', icon: 'flash', count: trends.filter(t => t.category === 'micro').length },
  ];

  const renderFeaturedItem = ({ item, index }: { item: TrendItem; index: number }) => (
    <TrendCard
      trend={item}
      index={index}
      isLarge
      onPress={() => navigation.navigate('TrendDetail', { id: item.id })}
    />
  );

  const renderQuickStat = (label: string, value: string, icon: string, color: string) => {
    const scale = useRef(new Animated.Value(1)).current;

    return (
      <Pressable
        key={label}
        onPressIn={() => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
      >
        <Animated.View
          style={[
            styles.statCard,
            {
              backgroundColor: isDark ? '#161618' : '#FFFFFF',
              transform: [{ scale }],
            },
          ]}
        >
          <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
            <Ionicons name={icon as any} size={20} color={color} />
          </View>
          <Text style={[styles.statValue, { color: isDark ? '#F0F0EB' : '#1A1A1A' }]}>
            {value}
          </Text>
          <Text style={[styles.statLabel, { color: isDark ? '#6A6A65' : '#8A8A8A' }]}>
            {label}
          </Text>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#0D0D0F' : '#F5F5F0',
          opacity: fadeIn,
          transform: [{ translateY }],
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <AnimatedTypography variant="caption" animated={false}>
                UI DESIGN TRENDS
              </AnimatedTypography>
              <AnimatedTypography variant="hero" style={{ marginTop: 4 }}>
                2026
              </AnimatedTypography>
            </View>
            <EcoBadge size="md" />
          </View>
          <MorphingText
            text="Discover the future of interface design"
            style={{ marginTop: 12, maxWidth: width - 80 }}
          />
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          {renderQuickStat('Trends', '7', 'trending-up', '#7BB661')}
          {renderQuickStat('Adoption', '82%', 'stats-chart', '#6366F1')}
          {renderQuickStat('Impact', 'High', 'pulse', '#FF6B35')}
          {renderQuickStat('Innovation', 'A+', 'sparkles', '#F59E0B')}
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <AnimatedTypography variant="subtitle">Categories</AnimatedTypography>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
            style={{ marginTop: 16 }}
          >
            {categories.map((cat, i) => {
              const scale = useRef(new Animated.Value(1)).current;
              return (
                <Pressable
                  key={cat.name}
                  onPressIn={() =>
                    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true }).start()
                  }
                  onPressOut={() =>
                    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()
                  }
                  onPress={() => navigation.navigate('Explore', { category: cat.name.toLowerCase() })}
                >
                  <Animated.View
                    style={[
                      styles.categoryCard,
                      {
                        backgroundColor: isDark ? '#161618' : '#FFFFFF',
                        transform: [{ scale }],
                      },
                    ]}
                  >
                    <Ionicons
                      name={cat.icon as any}
                      size={22}
                      color={isDark ? '#7BB661' : '#2D5A27'}
                    />
                    <Text
                      style={[
                        styles.categoryName,
                        { color: isDark ? '#F0F0EB' : '#1A1A1A' },
                      ]}
                    >
                      {cat.name}
                    </Text>
                    <Text
                      style={[
                        styles.categoryCount,
                        { color: isDark ? '#6A6A65' : '#8A8A8A' },
                      ]}
                    >
                      {cat.count} trends
                    </Text>
                  </Animated.View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Featured Trends */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AnimatedTypography variant="subtitle">Featured Trends</AnimatedTypography>
            <Pressable onPress={() => navigation.navigate('Explore')}>
              <Text style={[styles.seeAll, { color: isDark ? '#7BB661' : '#2D5A27' }]}>
                See all
              </Text>
            </Pressable>
          </View>
          <FlatList
            data={featured}
            renderItem={renderFeaturedItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24, paddingTop: 16 }}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: true,
            })}
            scrollEventThrottle={16}
          />
        </View>

        {/* Trending Now */}
        <View style={styles.section}>
          <AnimatedTypography variant="subtitle">Trending Now</AnimatedTypography>
          <View style={styles.trendingList}>
            {trends.slice(0, 4).map((trend, i) => {
              const progress = useRef(new Animated.Value(0)).current;
              useEffect(() => {
                Animated.timing(progress, {
                  toValue: parseInt(trend.stats[0].value) / 100,
                  duration: 1500,
                  delay: i * 200,
                  useNativeDriver: false,
                }).start();
              }, []);

              return (
                <Pressable
                  key={trend.id}
                  onPress={() => navigation.navigate('TrendDetail', { id: trend.id })}
                  style={{ marginTop: i > 0 ? 12 : 0 }}
                >
                  <View
                    style={[
                      styles.trendingItem,
                      { backgroundColor: isDark ? '#161618' : '#FFFFFF' },
                    ]}
                  >
                    <View
                      style={[
                        styles.trendingIcon,
                        { backgroundColor: trend.color + '15' },
                      ]}
                    >
                      <Ionicons
                        name={trend.icon as any}
                        size={18}
                        color={trend.color}
                      />
                    </View>
                    <View style={styles.trendingInfo}>
                      <Text
                        style={[
                          styles.trendingTitle,
                          { color: isDark ? '#F0F0EB' : '#1A1A1A' },
                        ]}
                      >
                        {trend.title}
                      </Text>
                      <Text
                        style={[
                          styles.trendingSubtitle,
                          { color: isDark ? '#6A6A65' : '#8A8A8A' },
                        ]}
                      >
                        {trend.subtitle}
                      </Text>
                    </View>
                    <View style={styles.trendingStat}>
                      <Text
                        style={[
                          styles.trendingStatValue,
                          { color: trend.color },
                        ]}
                      >
                        {trend.stats[0].value}
                      </Text>
                      <View style={styles.progressBar}>
                        <Animated.View
                          style={[
                            styles.progressFill,
                            {
                              backgroundColor: trend.color,
                              width: progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%'],
                              }),
                            },
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 10,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 0.06,
    elevation: 3,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '700',
  },
  categoriesScroll: {
    paddingRight: 24,
    gap: 10,
  },
  categoryCard: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 0.06,
    elevation: 3,
    marginRight: 10,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
  },
  categoryCount: {
    fontSize: 11,
    marginTop: 2,
  },
  trendingList: {
    marginTop: 16,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.04,
    elevation: 2,
  },
  trendingIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingInfo: {
    flex: 1,
    marginLeft: 14,
  },
  trendingTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  trendingSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  trendingStat: {
    alignItems: 'flex-end',
    minWidth: 60,
  },
  trendingStatValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  progressBar: {
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0D8',
    marginTop: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
