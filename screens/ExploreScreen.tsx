import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Animated, Dimensions } from 'react-native';
import { useTheme } from '../lib/theme';
import { trends, TrendItem } from '../lib/data';
import { TrendCard } from '../components/TrendCard';
import { AnimatedTypography } from '../components/AnimatedTypography';
import { Ionicons } from '@expo/vector-icons';
import { MicroButton } from '../components/MicroButton';

const { width } = Dimensions.get('window');

export const ExploreScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { isDark } = useTheme();
  const selectedCat = route?.params?.category || 'all';
  const [activeCategory, setActiveCategory] = React.useState(selectedCat);
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, [activeCategory]);

  const categories = [
    { key: 'all', label: 'All', icon: 'grid' },
    { key: 'eco', label: 'Eco', icon: 'leaf' },
    { key: 'dark', label: 'Dark', icon: 'moon' },
    { key: 'minimal', label: 'Minimal', icon: 'remove-circle' },
    { key: 'micro', label: 'Motion', icon: 'flash' },
    { key: '3d', label: '3D', icon: 'cube' },
    { key: 'typo', label: 'Type', icon: 'text' },
    { key: 'immersive', label: 'Immersive', icon: 'eyedrop' },
  ];

  const filtered =
    activeCategory === 'all'
      ? trends
      : trends.filter(t => t.category === activeCategory);

  const renderItem = ({ item, index }: { item: TrendItem; index: number }) => (
    <TrendCard
      trend={item}
      index={index}
      isLarge
      onPress={() => navigation.navigate('TrendDetail', { id: item.id })}
    />
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0D0D0F' : '#F5F5F0' },
      ]}
    >
      <View style={styles.header}>
        <AnimatedTypography variant="title">Explore</AnimatedTypography>
        <Text style={[styles.headerSubtitle, { color: isDark ? '#6A6A65' : '#8A8A8A' }]}>
          {filtered.length} UI design trends for 2026
        </Text>
      </View>

      {/* Category Filter */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
        keyExtractor={item => item.key}
        renderItem={({ item }) => {
          const isActive = activeCategory === item.key;
          return (
            <Pressable
              onPress={() => {
                setActiveCategory(item.key);
                fadeIn.setValue(0);
              }}
              style={{ marginRight: 8 }}
            >
              <View
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: isActive
                      ? isDark
                        ? '#7BB661'
                        : '#2D5A27'
                      : isDark
                      ? '#161618'
                      : '#FFFFFF',
                    shadowColor: isActive ? '#000' : 'transparent',
                    shadowOffset: { width: 0, height: isActive ? 4 : 0 },
                    shadowRadius: isActive ? 12 : 0,
                    shadowOpacity: isActive ? 0.2 : 0,
                    elevation: isActive ? 4 : 0,
                  },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={14}
                  color={isActive ? '#FFFFFF' : isDark ? '#B0B0A8' : '#4A4A4A'}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.filterText,
                    {
                      color: isActive ? '#FFFFFF' : isDark ? '#B0B0A8' : '#4A4A4A',
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </View>
            </Pressable>
          );
        }}
        style={{ maxHeight: 60, marginBottom: 16 }}
      />

      {/* Results */}
      <Animated.View style={{ flex: 1, opacity: fadeIn }}>
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons
                name="search-outline"
                size={48}
                color={isDark ? '#6A6A65' : '#8A8A8A'}
              />
              <Text
                style={[
                  styles.emptyText,
                  { color: isDark ? '#6A6A65' : '#8A8A8A' },
                ]}
              >
                No trends found in this category
              </Text>
            </View>
          }
        />
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
  filterList: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 16,
  },
});
