import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Animated } from 'react-native';
import { useTheme } from '../lib/theme';
import { trends, TrendItem } from '../lib/data';
import { AnimatedTypography } from '../components/AnimatedTypography';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MicroButton } from '../components/MicroButton';

const FAVORITES_KEY = '@ui_trends_favorites';

export const FavoritesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { isDark } = useTheme();
  const [favorites, setFavorites] = useState<string[]>([]);
  const fadeIn = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadFavorites();
    Animated.timing(fadeIn, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to load favorites', e);
    }
  };

  const toggleFavorite = async (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const favoriteTrends = trends.filter(t => favorites.includes(t.id));

  const renderItem = ({ item, index }: { item: TrendItem; index: number }) => (
    <Pressable
      onPress={() => navigation.navigate('TrendDetail', { id: item.id })}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: isDark ? '#161618' : '#FFFFFF',
            marginTop: index > 0 ? 12 : 0,
          },
        ]}
      >
        <View
          style={[
            styles.cardIcon,
            { backgroundColor: item.color + '15' },
          ]}
        >
          <Ionicons name={item.icon as any} size={22} color={item.color} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={[styles.cardTitle, { color: isDark ? '#F0F0EB' : '#1A1A1A' }]}>
            {item.title}
          </Text>
          <Text
            style={[
              styles.cardSubtitle,
              { color: isDark ? '#6A6A65' : '#8A8A8A' },
            ]}
          >
            {item.subtitle}
          </Text>
        </View>
        <Pressable
          onPress={() => toggleFavorite(item.id)}
          style={styles.favoriteBtn}
        >
          <Ionicons
            name="heart"
            size={22}
            color="#FF6B6B"
          />
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0D0D0F' : '#F5F5F0' },
      ]}
    >
      <View style={styles.header}>
        <AnimatedTypography variant="title">Favorites</AnimatedTypography>
        <Text style={[styles.headerSubtitle, { color: isDark ? '#6A6A65' : '#8A8A8A' }]}>
          {favoriteTrends.length} saved trends
        </Text>
      </View>

      <Animated.View style={{ flex: 1, opacity: fadeIn }}>
        {favoriteTrends.length > 0 ? (
          <FlatList
            data={favoriteTrends}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.empty}>
            <Ionicons
              name="heart-outline"
              size={64}
              color={isDark ? '#6A6A65' : '#8A8A8A'}
            />
            <Text style={[styles.emptyTitle, { color: isDark ? '#F0F0EB' : '#1A1A1A' }]}>
              No favorites yet
            </Text>
            <Text style={[styles.emptyDesc, { color: isDark ? '#6A6A65' : '#8A8A8A' }]}>
              Explore trends and tap the heart icon to save them here
            </Text>
            <View style={{ marginTop: 24, width: 200 }}>
              <MicroButton
                title="Explore Trends"
                icon="compass"
                onPress={() => navigation.navigate('Explore')}
                variant="primary"
                fullWidth
              />
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  card: {
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
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  cardSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  favoriteBtn: {
    padding: 8,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
  },
  emptyDesc: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
