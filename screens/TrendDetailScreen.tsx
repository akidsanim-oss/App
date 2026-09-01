import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
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
import { trends, Trend } from '../lib/trends';
import { isFavorite, toggleFavorite, updateEcoStats } from '../lib/storage';
import DynamicText from '../components/DynamicText';
import EcoIndicator from '../components/EcoIndicator';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function TrendDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { trendId } = route.params;
  const trend = trends.find((t) => t.id === trendId) as Trend;

  const [fav, setFav] = useState(false);
  const scrollY = useSharedValue(0);

  useEffect(() => {
    isFavorite(trendId).then(setFav);
    updateEcoStats({ trendsLearned: 1 });
  }, [trendId]);

  const handleToggleFav = async () => {
    const result = await toggleFavorite(trendId);
    setFav(result);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const heroStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-100, 0], [1.2, 1], Extrapolate.CLAMP);
    const opacity = interpolate(scrollY.value, [0, 200], [1, 0.3], Extrapolate.CLAMP);
    return { transform: [{ scale }], opacity };
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [150, 200], [0, 1], Extrapolate.CLAMP);
    return { opacity };
  });

  const sectionScale = useSharedValue(1);
  const sectionAnim = useAnimatedStyle(() => ({
    transform: [{ scale: sectionScale.value }],
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Floating Header */}
      <Animated.View style={[styles.floatingHeader, headerStyle]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <DynamicText variant="h4" style={{ flex: 1, textAlign: 'center', marginRight: 40 }}>
          {trend.title}
        </DynamicText>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Hero */}
        <Animated.View style={[styles.hero, heroStyle]}>
          <LinearGradient
            colors={[trend.color + '40', trend.color + '10']}
            style={styles.heroGradient}
          >
            <View style={styles.heroTop}>
              <Pressable onPress={() => navigation.goBack()} style={styles.backBtnHero}>
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </Pressable>
              <Pressable onPress={handleToggleFav} style={styles.favBtnHero}>
                <Ionicons
                  name={fav ? 'heart' : 'heart-outline'}
                  size={24}
                  color={fav ? colors.error : colors.text}
                />
              </Pressable>
            </View>

            <View style={[styles.heroIcon, { backgroundColor: trend.color + '25' }]}>
              <Ionicons name={trend.icon as any} size={48} color={trend.color} />
            </View>

            <DynamicText variant="h1" style={{ marginTop: spacing.lg, marginBottom: spacing.xs }}>
              {trend.title}
            </DynamicText>
            <DynamicText variant="body" color={colors.textSecondary}>
              {trend.subtitle}
            </DynamicText>

            <View style={styles.heroBadges}>
              <View style={[styles.badge, { backgroundColor: trend.color + '15' }]}>
                <DynamicText variant="caption" style={{ color: trend.color }}>
                  {trend.category}
                </DynamicText>
              </View>
              <View style={[styles.badge, {
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
          </LinearGradient>
        </Animated.View>

        {/* Description */}
        <Pressable
          onPressIn={() => { sectionScale.value = withSpring(0.99, { stiffness: 300 }); }}
          onPressOut={() => { sectionScale.value = withSpring(1, { stiffness: 300 }); }}
        >
          <Animated.View style={[styles.section, sectionAnim]}>
            <DynamicText variant="body" color={colors.textSecondary} style={styles.description}>
              {trend.description}
            </DynamicText>
          </Animated.View>
        </Pressable>

        {/* Eco Impact */}
        <View style={styles.section}>
          <EcoIndicator label="Environmental Impact" value={trend.ecoImpact} icon="leaf" />
        </View>

        {/* Details */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="list" size={18} color={colors.accent} />
            <DynamicText variant="h4" style={{ marginLeft: 8 }}>
              Key Details
            </DynamicText>
          </View>
          {trend.details.map((detail, i) => (
            <View key={i} style={styles.detailRow}>
              <View style={[styles.bullet, { backgroundColor: trend.color }]} />
              <DynamicText variant="body" color={colors.textSecondary} style={{ flex: 1 }}>
                {detail}
              </DynamicText>
            </View>
          ))}
        </View>

        {/* Best Practices */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="checkmark-circle" size={18} color={colors.eco} />
            <DynamicText variant="h4" style={{ marginLeft: 8 }}>
              Best Practices
            </DynamicText>
          </View>
          {trend.bestPractices.map((practice, i) => (
            <View key={i} style={styles.practiceCard}>
              <View style={styles.practiceNumber}>
                <DynamicText variant="caption" color={colors.background}>{i + 1}</DynamicText>
              </View>
              <DynamicText variant="bodySmall" color={colors.textSecondary} style={{ flex: 1 }}>
                {practice}
              </DynamicText>
            </View>
          ))}
        </View>

        {/* Related Trends */}
        <View style={styles.section}>
          <DynamicText variant="h4" style={{ marginBottom: spacing.md }}>
            Related Trends
          </DynamicText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {trends
              .filter((t) => t.id !== trend.id && t.category === trend.category)
              .map((related) => (
                <Pressable
                  key={related.id}
                  onPress={() => navigation.navigate('TrendDetail', { trendId: related.id })}
                >
                  <View style={[styles.relatedCard, { borderLeftColor: related.color }]}>
                    <Ionicons name={related.icon as any} size={20} color={related.color} />
                    <DynamicText variant="bodySmall" style={{ marginTop: 4 }}>
                      {related.title}
                    </DynamicText>
                  </View>
                </Pressable>
              ))}
          </ScrollView>
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
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: colors.background + 'E6',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  hero: {
    margin: spacing.md,
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  heroGradient: {
    padding: spacing.xl,
    borderRadius: radius.xl,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  backBtnHero: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.background + '80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtnHero: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.background + '80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBadges: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  section: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  description: {
    lineHeight: 26,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    marginTop: 8,
  },
  practiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  practiceNumber: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: colors.eco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  relatedCard: {
    width: 140,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginRight: spacing.md,
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
