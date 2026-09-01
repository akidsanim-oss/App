import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import { useTheme } from '../lib/theme';
import { AnimatedTypography } from '../components/AnimatedTypography';
import { ThreeDElement, FloatingCard } from '../components/ThreeDElement';
import { GlassCard } from '../components/GlassCard';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export const GalleryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { isDark } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  }, []);

  const parallaxBg = scrollY.interpolate({
    inputRange: [0, 500],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const depthCards = [
    {
      title: 'Spatial Depth',
      color: '#6366F1',
      icon: 'layers',
      desc: 'Multi-layered UI with z-axis depth perception',
    },
    {
      title: 'Parallax Motion',
      color: '#FF6B35',
      icon: 'move',
      desc: 'Elements move at different speeds creating depth',
    },
    {
      title: 'Glass Layers',
      color: '#06B6D4',
      icon: 'document',
      desc: 'Frosted glass effects with depth stacking',
    },
  ];

  const floatingItems = [
    { icon: 'cube', color: '#6366F1', label: '3D Cards' },
    { icon: 'eye', color: '#FF6B35', label: 'Depth' },
    { icon: 'resize', color: '#06B6D4', label: 'Scale' },
    { icon: 'git-compare', color: '#F59E0B', label: 'Morph' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0D0D0F' : '#F5F5F0' }]}>
      <Animated.View style={[styles.parallaxBg, { transform: [{ translateY: parallaxBg }] }]}>
        <LinearGradient
          colors={isDark ? ['#0D0D0F', '#1A1A2E', '#0D0D0F'] : ['#F5F5F0', '#E8E4DC', '#F5F5F0']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        style={{ flex: 1, opacity: fadeIn }}
      >
        <View style={styles.header}>
          <AnimatedTypography variant="title">3D Gallery</AnimatedTypography>
          <Text style={[styles.headerSubtitle, { color: isDark ? '#6A6A65' : '#8A8A8A' }]}>
            Interactive depth & spatial interfaces
          </Text>
        </View>

        {/* 3D Elements Showcase */}
        <View style={styles.section}>
          <AnimatedTypography variant="subtitle">3D Perspective</AnimatedTypography>
          <View style={styles.threeDRow}>
            <ThreeDElement color="#6366F1" size={120} depth={4} rotation>
              <Ionicons name="cube" size={40} color="#FFFFFF" />
            </ThreeDElement>
            <ThreeDElement color="#7BB661" size={120} depth={4} rotation>
              <Ionicons name="leaf" size={40} color="#FFFFFF" />
            </ThreeDElement>
            <ThreeDElement color="#FF6B35" size={120} depth={4} rotation>
              <Ionicons name="flash" size={40} color="#FFFFFF" />
            </ThreeDElement>
          </View>
        </View>

        {/* Floating Cards */}
        <View style={styles.section}>
          <AnimatedTypography variant="subtitle">Floating Elements</AnimatedTypography>
          <View style={styles.floatingGrid}>
            {floatingItems.map((item, i) => (
              <FloatingCard key={i} delay={i * 300}>
                <View
                  style={[
                    styles.floatingItem,
                    {
                      backgroundColor: isDark ? '#161618' : '#FFFFFF',
                      borderLeftColor: item.color,
                    },
                  ]}
                >
                  <View style={[styles.floatingIcon, { backgroundColor: item.color + '15' }]}>
                    <Ionicons name={item.icon as any} size={22} color={item.color} />
                  </View>
                  <Text
                    style={[
                      styles.floatingLabel,
                      { color: isDark ? '#F0F0EB' : '#1A1A1A' },
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              </FloatingCard>
            ))}
          </View>
        </View>

        {/* Glassmorphism Cards */}
        <View style={styles.section}>
          <AnimatedTypography variant="subtitle">Glassmorphism</AnimatedTypography>
          <View style={styles.glassContainer}>
            <LinearGradient
              colors={['#6366F1', '#06B6D4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.glassBg}
            />
            {depthCards.map((card, i) => (
              <GlassCard
                key={i}
                style={[
                  styles.glassCard,
                  { marginTop: i > 0 ? -20 : 0, zIndex: depthCards.length - i },
                ]}
                intensity={0.15 - i * 0.03}
              >
                <View style={styles.glassContent}>
                  <View
                    style={[
                      styles.glassIcon,
                      { backgroundColor: card.color + '15' },
                    ]}
                  >
                    <Ionicons name={card.icon as any} size={20} color={card.color} />
                  </View>
                  <View style={styles.glassText}>
                    <Text
                      style={[
                        styles.glassTitle,
                        { color: isDark ? '#F0F0EB' : '#1A1A1A' },
                      ]}
                    >
                      {card.title}
                    </Text>
                    <Text
                      style={[
                        styles.glassDesc,
                        { color: isDark ? '#6A6A65' : '#8A8A8A' },
                      ]}
                    >
                      {card.desc}
                    </Text>
                  </View>
                </View>
              </GlassCard>
            ))}
          </View>
        </View>

        {/* Depth Layers Demo */}
        <View style={styles.section}>
          <AnimatedTypography variant="subtitle">Layered Depth</AnimatedTypography>
          <View style={styles.depthContainer}>
            {[0, 1, 2, 3].map((i) => {
              const offset = (i + 1) * 8;
              return (
                <View
                  key={i}
                  style={[
                    styles.depthLayer,
                    {
                      backgroundColor: isDark
                        ? `rgba(123, 182, 97, ${0.1 + i * 0.15})`
                        : `rgba(45, 90, 39, ${0.05 + i * 0.12})`,
                      transform: [
                        { translateX: offset },
                        { translateY: offset },
                      ],
                      zIndex: 4 - i,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.depthText,
                      { color: isDark ? '#7BB661' : '#2D5A27' },
                    ]}
                  >
                    Layer {i + 1}
                  </Text>
                </View>
              );
            })}
            <View
              style={[
                styles.depthLayer,
                styles.depthTop,
                {
                  backgroundColor: isDark ? '#7BB661' : '#2D5A27',
                },
              ]}
            >
              <Text style={styles.depthTopText}>Top Layer</Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parallaxBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height + 200,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 60,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 24,
  },
  threeDRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    alignItems: 'center',
  },
  floatingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
  },
  floatingItem: {
    width: (width - 72) / 2,
    padding: 16,
    borderRadius: 20,
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 0.06,
    elevation: 3,
  },
  floatingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  floatingLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  glassContainer: {
    marginTop: 20,
    position: 'relative',
    padding: 20,
    borderRadius: 28,
    overflow: 'hidden',
    minHeight: 280,
  },
  glassBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 28,
  },
  glassCard: {
    padding: 18,
    borderRadius: 20,
  },
  glassContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  glassIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  glassText: {
    flex: 1,
  },
  glassTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  glassDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  depthContainer: {
    marginTop: 24,
    height: 160,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  depthLayer: {
    position: 'absolute',
    width: 200,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  depthTop: {
    zIndex: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    shadowOpacity: 0.3,
    elevation: 12,
  },
  depthText: {
    fontSize: 14,
    fontWeight: '700',
  },
  depthTopText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
