import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Switch, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, radius, typography, shadows } from '../lib/theme';
import DynamicText from '../components/DynamicText';

const { width } = Dimensions.get('window');

export default function PlaygroundScreen() {
  const [ecoMode, setEcoMode] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [glassOpacity, setGlassOpacity] = useState(0.72);

  // Micro-animation demo
  const buttonScale = useSharedValue(1);
  const buttonRotate = useSharedValue(0);
  const successCheck = useSharedValue(0);

  // 3D card demo
  const cardRotateX = useSharedValue(0);
  const cardRotateY = useSharedValue(0);

  // Pulse demo
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(1);

  const handleButtonPress = () => {
    buttonScale.value = withSequence(
      withSpring(0.9, { stiffness: 500 }),
      withSpring(1.1, { stiffness: 400 }),
      withSpring(1, { stiffness: 300 })
    );
    buttonRotate.value = withSequence(
      withTiming(-5, { duration: 100 }),
      withTiming(5, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );
    successCheck.value = withSpring(1, { stiffness: 300, damping: 15 });
    setTimeout(() => {
      successCheck.value = withSpring(0, { stiffness: 300, damping: 15 });
    }, 2000);
  };

  const buttonAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: buttonScale.value },
      { rotate: `${buttonRotate.value}deg` },
    ],
  }));

  const checkAnimStyle = useAnimatedStyle(() => ({
    opacity: successCheck.value,
    transform: [{ scale: interpolate(successCheck.value, [0, 1], [0.5, 1], Extrapolate.CLAMP) }],
  }));

  // 3D card
  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateX: `${cardRotateX.value}deg` },
      { rotateY: `${cardRotateY.value}deg` },
    ],
  }));

  const handleCardPressIn = () => {
    cardRotateX.value = withSpring(-8, { stiffness: 200 });
    cardRotateY.value = withSpring(8, { stiffness: 200 });
  };

  const handleCardPressOut = () => {
    cardRotateX.value = withSpring(0, { stiffness: 200 });
    cardRotateY.value = withSpring(0, { stiffness: 200 });
  };

  // Pulse animation
  React.useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(1.5, { duration: 1500, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
    pulseOpacity.value = withRepeat(
      withTiming(0, { duration: 1500, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
  }, []);

  const pulseAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <DynamicText variant="h2">Interactive</DynamicText>
          <DynamicText variant="h2" color={colors.accent}>Playground</DynamicText>
          <DynamicText variant="bodySmall" color={colors.textMuted} style={{ marginTop: spacing.sm }}>
            Experience 2026 UI trends in real-time
          </DynamicText>
        </View>

        {/* Micro-Animation Demo */}
        <View style={styles.demoCard}>
          <View style={styles.demoHeader}>
            <Ionicons name="pulse" size={18} color={colors.accent} />
            <DynamicText variant="h4" style={{ marginLeft: 8 }}>
              Micro-Animations
            </DynamicText>
          </View>
          <DynamicText variant="bodySmall" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>
            Press the button to see spring physics, rotation, and state change animations.
          </DynamicText>
          <View style={styles.demoCenter}>
            <Pressable onPress={handleButtonPress}>
              <Animated.View style={[styles.microButton, buttonAnimStyle]}>
                <LinearGradient
                  colors={[colors.accent, colors.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.microButtonGradient}
                >
                  <DynamicText variant="body" style={{ color: '#fff' }}>
                    Tap Me
                  </DynamicText>
                </LinearGradient>
              </Animated.View>
            </Pressable>
            <Animated.View style={[styles.successOverlay, checkAnimStyle]}>
              <View style={styles.successCircle}>
                <Ionicons name="checkmark" size={32} color={colors.eco} />
              </View>
            </Animated.View>
          </View>
        </View>

        {/* 3D Card Demo */}
        <View style={styles.demoCard}>
          <View style={styles.demoHeader}>
            <Ionicons name="cube" size={18} color={colors.info} />
            <DynamicText variant="h4" style={{ marginLeft: 8 }}>
              3D Spatial Design
            </DynamicText>
          </View>
          <DynamicText variant="bodySmall" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>
            Press and hold to experience perspective transforms and spatial depth.
          </DynamicText>
          <View style={styles.demoCenter}>
            <Pressable
              onPressIn={handleCardPressIn}
              onPressOut={handleCardPressOut}
            >
              <Animated.View style={[styles.card3D, cardAnimStyle]}>
                <LinearGradient
                  colors={[colors.surfaceElevated, colors.background]}
                  style={styles.card3DInner}
                >
                  <View style={styles.card3DLayer} />
                  <View style={[styles.card3DLayer, styles.card3DLayer2]} />
                  <View style={[styles.card3DLayer, styles.card3DLayer3]} />
                  <DynamicText variant="h3" style={{ textAlign: 'center' }}>
                    3D Depth
                  </DynamicText>
                  <DynamicText variant="bodySmall" color={colors.textMuted} style={{ textAlign: 'center', marginTop: 4 }}>
                    Perspective: 1000px
                  </DynamicText>
                </LinearGradient>
              </Animated.View>
            </Pressable>
          </View>
        </View>

        {/* Dynamic Typography Demo */}
        <View style={styles.demoCard}>
          <View style={styles.demoHeader}>
            <Ionicons name="text" size={18} color={colors.error} />
            <DynamicText variant="h4" style={{ marginLeft: 8 }}>
              Dynamic Typography
            </DynamicText>
          </View>
          <DynamicText variant="bodySmall" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>
            Adjust the scale to see fluid, responsive type that adapts to context.
          </DynamicText>

          <View style={styles.sliderRow}>
            <Pressable
              onPress={() => setFontScale(Math.max(0.7, fontScale - 0.1))}
              style={styles.sliderBtn}
            >
              <Ionicons name="remove" size={20} color={colors.text} />
            </Pressable>
            <DynamicText variant="body" style={{ width: 60, textAlign: 'center' }}>
              {Math.round(fontScale * 100)}%
            </DynamicText>
            <Pressable
              onPress={() => setFontScale(Math.min(1.5, fontScale + 0.1))}
              style={styles.sliderBtn}
            >
              <Ionicons name="add" size={20} color={colors.text} />
            </Pressable>
          </View>

          <View style={[styles.typePreview, { transform: [{ scale: fontScale }] }]}>
            <DynamicText variant="h3" style={{ textAlign: 'center' }}>
              Fluid Scale
            </DynamicText>
            <DynamicText variant="bodySmall" color={colors.textMuted} style={{ textAlign: 'center', marginTop: 4 }}>
              Adapts to user preference
            </DynamicText>
          </View>
        </View>

        {/* Glassmorphism Demo */}
        <View style={styles.demoCard}>
          <View style={styles.demoHeader}>
            <Ionicons name="water" size={18} color={colors.info} />
            <DynamicText variant="h4" style={{ marginLeft: 8 }}>
              Glassmorphism
            </DynamicText>
          </View>
          <DynamicText variant="bodySmall" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>
            Adjust opacity to see the translucent layered effect.
          </DynamicText>

          <View style={styles.glassBackground}>
            <LinearGradient
              colors={[colors.accent, colors.gradientEnd, colors.eco]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <Animated.View
              style={[
                styles.glassPanel,
                { backgroundColor: `rgba(255, 255, 255, ${glassOpacity})` },
              ]}
            >
              <DynamicText variant="h4" style={{ color: '#0A0A0F' }}>
                Glass Panel
              </DynamicText>
              <DynamicText variant="bodySmall" style={{ color: '#333', marginTop: 4 }}>
                Opacity: {Math.round(glassOpacity * 100)}%
              </DynamicText>
            </Animated.View>
          </View>

          <View style={styles.sliderRow}>
            <Pressable
              onPress={() => setGlassOpacity(Math.max(0.1, glassOpacity - 0.1))}
              style={styles.sliderBtn}
            >
              <Ionicons name="sunny-outline" size={20} color={colors.text} />
            </Pressable>
            <DynamicText variant="body" style={{ width: 60, textAlign: 'center' }}>
              {Math.round(glassOpacity * 100)}%
            </DynamicText>
            <Pressable
              onPress={() => setGlassOpacity(Math.min(0.95, glassOpacity + 0.1))}
              style={styles.sliderBtn}
            >
              <Ionicons name="sunny" size={20} color={colors.text} />
            </Pressable>
          </View>
        </View>

        {/* Eco-Design Toggle */}
        <View style={styles.demoCard}>
          <View style={styles.demoHeader}>
            <Ionicons name="leaf" size={18} color={colors.eco} />
            <DynamicText variant="h4" style={{ marginLeft: 8 }}>
              Eco-Design Mode
            </DynamicText>
          </View>
          <DynamicText variant="bodySmall" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>
            Toggle eco-mode to see reduced-motion and energy-saving indicators.
          </DynamicText>

          <View style={styles.ecoRow}>
            <View style={styles.ecoInfo}>
              <DynamicText variant="body" color={colors.text}>
                Eco Mode
              </DynamicText>
              <DynamicText variant="bodySmall" color={colors.textMuted}>
                Reduce animations & save energy
              </DynamicText>
            </View>
            <Switch
              value={ecoMode}
              onValueChange={setEcoMode}
              trackColor={{ false: colors.border, true: colors.eco + '80' }}
              thumbColor={ecoMode ? colors.eco : colors.textMuted}
            />
          </View>

          {ecoMode && (
            <View style={styles.ecoActive}>
              <Ionicons name="checkmark-circle" size={20} color={colors.eco} />
              <DynamicText variant="bodySmall" color={colors.eco} style={{ marginLeft: 8 }}>
                Animations reduced. Battery life extended by ~15%.
              </DynamicText>
            </View>
          )}
        </View>

        {/* Pulse Animation Demo */}
        <View style={styles.demoCard}>
          <View style={styles.demoHeader}>
            <Ionicons name="radio-button-on" size={18} color={colors.warning} />
            <DynamicText variant="h4" style={{ marginLeft: 8 }}>
              Ambient Pulse
            </DynamicText>
          </View>
          <View style={styles.demoCenter}>
            <View style={styles.pulseContainer}>
              <Animated.View style={[styles.pulseRing, pulseAnimStyle]} />
              <View style={styles.pulseCore}>
                <Ionicons name="wifi" size={24} color={colors.warning} />
              </View>
            </View>
            <DynamicText variant="bodySmall" color={colors.textMuted} style={{ marginTop: spacing.md }}>
              Continuous ambient feedback
            </DynamicText>
          </View>
        </View>
      </ScrollView>
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
  demoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  demoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  demoCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  microButton: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  microButtonGradient: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  successOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCircle: {
    width: 60,
    height: 60,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.eco,
  },
  card3D: {
    width: width * 0.6,
    height: 160,
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  card3DInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card3DLayer: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.accent + '30',
    borderWidth: 1,
    borderColor: colors.accent + '50',
  },
  card3DLayer2: {
    width: 50,
    height: 50,
    backgroundColor: colors.accent + '20',
  },
  card3DLayer3: {
    width: 60,
    height: 60,
    backgroundColor: colors.accent + '10',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  sliderBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  typePreview: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  glassBackground: {
    height: 140,
    borderRadius: radius.lg,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  glassPanel: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    minWidth: 180,
    alignItems: 'center',
  },
  ecoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ecoInfo: {
    flex: 1,
  },
  ecoActive: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    backgroundColor: colors.ecoSoft,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  pulseContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.warning + '30',
  },
  pulseCore: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.warning + '20',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.warning,
  },
});
