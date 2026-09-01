import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  FadeInUp,
  Layout,
} from 'react-native-reanimated';
import { colors, spacing, radius, typography } from '../lib/theme';
import { trends, categories, Trend } from '../lib/trends';
import DynamicText from '../components/DynamicText';
import TrendCard from '../components/TrendCard';
import { useNavigation } from '@react-navigation/native';

export default function TrendsScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  const filtered = trends.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const renderCategory = ({ item }: { item: string }) => {
    const isActive = activeCategory === item;
    return (
      <Pressable onPress={() => setActiveCategory(item)}>
        <Animated.View
          entering={FadeIn}
          layout={Layout.springify()}
          style={[
            styles.categoryPill,
            isActive && styles.categoryPillActive,
          ]}
        >
          <DynamicText
            variant="caption"
            style={isActive ? { color: colors.background } : { color: colors.textSecondary }}
          >
            {item}
          </DynamicText>
        </Animated.View>
      </Pressable>
    );
  };

  const renderTrend = ({ item, index }: { item: Trend; index: number }) => (
    <Animated.View entering={FadeInUp.delay(index * 80)} layout={Layout.springify()}>
      <TrendCard
        trend={item}
        onPress={() => navigation.navigate('TrendDetail', { trendId: item.id })}
      />
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <DynamicText variant="h2">Explore Trends</DynamicText>
          <DynamicText variant="bodySmall" color={colors.textMuted}>
            {filtered.length} trend{filtered.length !== 1 ? 's' : ''} found
          </DynamicText>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={18} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search trends, techniques, styles..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </Pressable>
          )}
        </View>

        {/* Categories */}
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          style={{ maxHeight: 44 }}
        />

        {/* Trend List */}
        <FlatList
          data={filtered}
          renderItem={renderTrend}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="search-outline" size={48} color={colors.textMuted} />
              <DynamicText variant="h4" color={colors.textMuted} style={{ marginTop: spacing.md }}>
                No trends found
              </DynamicText>
              <DynamicText variant="bodySmall" color={colors.textMuted}>
                Try a different search or category
              </DynamicText>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: colors.text,
    fontSize: 16,
  },
  clearBtn: {
    padding: 4,
  },
  categoryList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  categoryPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryPillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl,
  },
});
