import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInUp,
  Layout,
} from 'react-native-reanimated';
import { colors, spacing, radius } from '../lib/theme';
import { trends, Trend } from '../lib/trends';
import { getFavorites, toggleFavorite } from '../lib/storage';
import DynamicText from '../components/DynamicText';
import TrendCard from '../components/TrendCard';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function FavoritesScreen() {
  const navigation = useNavigation<any>();
  const [favorites, setFavorites] = useState<Trend[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavorites = useCallback(async () => {
    const favIds = await getFavorites();
    const favTrends = trends.filter((t) => favIds.includes(t.id));
    setFavorites(favTrends);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  }, [loadFavorites]);

  const handleRemove = async (id: string) => {
    await toggleFavorite(id);
    loadFavorites();
  };

  const renderTrend = ({ item, index }: { item: Trend; index: number }) => (
    <Animated.View entering={FadeInUp.delay(index * 60)} layout={Layout.springify()}>
      <View style={styles.cardWrap}>
        <TrendCard
          trend={item}
          onPress={() => navigation.navigate('TrendDetail', { trendId: item.id })}
        />
        <Pressable style={styles.removeBtn} onPress={() => handleRemove(item.id)}>
          <Ionicons name="trash-outline" size={18} color={colors.error} />
        </Pressable>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <DynamicText variant="h2">Saved Trends</DynamicText>
        <DynamicText variant="bodySmall" color={colors.textMuted}>
          {favorites.length} saved
        </DynamicText>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderTrend}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={56} color={colors.textMuted} />
            <DynamicText variant="h4" color={colors.textMuted} style={{ marginTop: spacing.lg }}>
              No saved trends
            </DynamicText>
            <DynamicText variant="bodySmall" color={colors.textMuted} style={{ marginTop: spacing.sm, textAlign: 'center' }}>
              Tap the heart icon on any trend to save it here for quick access.
            </DynamicText>
            <Pressable
              style={styles.browseBtn}
              onPress={() => navigation.navigate('Trends')}
            >
              <DynamicText variant="body" color={colors.accent}>
                Browse Trends
              </DynamicText>
              <Ionicons name="arrow-forward" size={18} color={colors.accent} style={{ marginLeft: 4 }} />
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  cardWrap: {
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 8,
    backgroundColor: colors.background + 'CC',
    borderRadius: radius.full,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl * 2,
  },
  browseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
