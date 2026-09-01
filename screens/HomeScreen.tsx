import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, radius, typography, shadows } from '../lib/theme';
import { trends, dailyTips, Trend } from '../lib/trends';
import { getEcoStats, EcoStats } from '../lib/storage';
import DynamicText from '../components/DynamicText';
import TrendCard from '../components/TrendCard';
import EcoIndicator from '../components/EcoIndicator';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [refreshing, setRefreshing] = useState(false);
  const [ecoStats, setEcoStats] = useState<EcoStats>({ darkModeHours: 0, trendsLearned: 0, carbonSaved: 0, lastUpdated: '' });
  const [dailyTipIndex] = useState(() => Math.floor(Math.random() * dailyTips.length));
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [0, 100], [1, 0.9], Extrapolate.CLAMP);
    const opacity = interpolate(scrollY.value, [0, 100], [1, 0.8], Extrapolate.CLAMP);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const tipScale = useSharedValue(1);
  const tipAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: tipScale.value }],
  }));

  const loadStats = useCallback(async () => {
    const stats = await getEcoStats();
    setEcoStats(stats);
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  }, [loadStats]);

  const featuredTrends = trends.slice(0, 3);
  const recentTrends = trends.slice(3, 6);

  const renderFeaturedItem = ({ item }: { item: Trend }) => (
    <View style={{ width: width * 0.8, marginRight: spacing.md }}>
      <TrendCard
        trend={item}
        onPress={() => navigation.navigate('TrendDetail', { trendId: item.id })}
        featured
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.text} />}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Animated Header */}
        <Animated.View style={[styles.header, headerStyle]}>
          <LinearGradient
            colors={[colors.gradientStart + '30', colors.gradientEnd + '10']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerTop}>
              <View>
                <DynamicText variant="caption" color={colors.textMuted}>TRENDS 2026</DynamicText>
                <DynamicText variant="h1" interactive onPress={() => {}}>
                  UI Design
                </DynamicText>
                <DynamicText variant="h1" color={colors.accent} interactive onPress={() => {}}>
                  Forecast
                </DynamicText>
              </View>
              <View style={styles.headerIcon}>
                <Ionicons name="sparkles" size={32} color={colors.accent} />
              </View>
            </View>

            <View style={styles.statsRow}>
              <EcoIndicator label="Trends Learned" value={String(ecoStats.trendsLearned)} icon="book" />
              <EcoIndicator label="Carbon Saved" value={`${ecoStats.carbonSaved}g`} icon="leaf" />
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Daily Tip */}
        <Pressable
          onPressIn={() => { tipScale.value = withSpring(0.98, { stiffness: 300 }); }}
          onPressOut={() => { tipScale.value = withSpring(1, { stiffness: 300 }); }}
        >
          <Animated.View style={[styles.tipCard, tipAnimStyle]}>
            <View style={styles.tipHeader}>
              <Ionicons name="bulb" size={18} color={colors.warning} />
              <DynamicText variant="caption" color={colors.warning} style={{ marginLeft: 6 }}>
                DAILY TIP
              </DynamicText>
            </View>
            <DynamicText variant="body" color={colors.text}>
              {dailyTips[dailyTipIndex]}
            </DynamicText>
          </Animated.View>
        </Pressable>

        {/* Featured Section */}
        <View style={styles.sectionHeader}>
          <DynamicText variant="h3">Featured Trends</DynamicText>
          <Pressable onPress={() => navigation.navigate('Trends' as never)}>
            <DynamicText variant="bodySmall" color={colors.accent}>See All</DynamicText>
          </Pressable>
        </View>

        <FlatList
          data={featuredTrends}
          renderItem={renderFeaturedItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          snapToInterval={width * 0.8 + spacing.md}
          decelerationRate="fast"
        />

        {/* Recent Section */}
        <View style={styles.sectionHeader}>
          <DynamicText variant="h3">Recent Additions</DynamicText>
        </View>

        {recentTrends.map((trend) => (
          <TrendCard
            key={trend.id}
            trend={trend}
            onPress={() => navigation.navigate('TrendDetail', { trendId: trend.id })}
          />
        ))}

        {/* Eco Footer */}
        <View style={styles.ecoFooter}>
          <Ionicons name="earth" size={20} color={colors.eco} />
          <DynamicText variant="bodySmall" color={colors.textMuted} style={{ marginLeft: 8, flex: 1 }}>
            Dark mode is active. You're saving energy with every scroll.
          </DynamicText>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  headerGradient: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadows.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  tipCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  horizontalList: {
    paddingRight: spacing.md,
  },
  ecoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ecoSoft,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.eco + '15',
  },
});
