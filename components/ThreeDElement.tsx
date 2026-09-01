import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useTheme } from '../lib/theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ThreeDElementProps {
  children: React.ReactNode;
  color: string;
  depth?: number;
  size?: number;
  rotation?: boolean;
}

export const ThreeDElement: React.FC<ThreeDElementProps> = ({
  children,
  color,
  depth = 3,
  size = 140,
  rotation = true,
}) => {
  const { isDark } = useTheme();
  const rotateX = useRef(new Animated.Value(0)).current;
  const rotateY = useRef(new Animated.Value(0)).current;
  const translateZ = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (rotation) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateY, { toValue: 1, duration: 4000, useNativeDriver: true }),
          Animated.timing(rotateY, { toValue: 0, duration: 4000, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [rotation]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(translateZ, { toValue: 30, duration: 200, useNativeDriver: true }),
      Animated.timing(translateZ, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const layers = Array.from({ length: depth }, (_, i) => i);

  return (
    <Pressable onPress={handlePress} style={{ alignItems: 'center' }}>
      <View style={[styles.container, { width: size, height: size }]}>
        {layers.map((i) => {
          const offset = (depth - 1 - i) * 4;
          const animStyle = {
            transform: [
              { perspective: 800 },
              { rotateY: rotateY.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '8deg'] }) },
              { rotateX: rotateX.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '3deg'] }) },
              { translateZ: translateZ },
              { scale },
            ],
          };
          return (
            <Animated.View
              key={i}
              style={[
                styles.layer,
                {
                  width: size - offset * 2,
                  height: size - offset * 2,
                  borderRadius: size / 4,
                  backgroundColor: color,
                  opacity: 0.15 + (i / depth) * 0.6,
                  transform: [
                    { translateY: offset },
                    { translateX: offset },
                  ],
                },
                i === depth - 1 && animStyle,
              ]}
            >
              {i === depth - 1 && (
                <LinearGradient
                  colors={[color, isDark ? '#1E1E22' : '#FFFFFF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.gradient, { borderRadius: size / 4 }]}
                >
                  {children}
                </LinearGradient>
              )}
            </Animated.View>
          );
        })}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});

export const FloatingCard: React.FC<{
  children: React.ReactNode;
  style?: any;
  delay?: number;
}> = ({ children, style, delay = 0 }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const rotateZ = useRef(new Animated.Value(0)).current;
  const shadow = useRef(new Animated.Value(0.1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateY, { toValue: -12, duration: 2500, useNativeDriver: true }),
          Animated.timing(rotateZ, { toValue: 1, duration: 2500, useNativeDriver: true }),
          Animated.timing(shadow, { toValue: 0.25, duration: 2500, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(translateY, { toValue: 0, duration: 2500, useNativeDriver: true }),
          Animated.timing(rotateZ, { toValue: 0, duration: 2500, useNativeDriver: true }),
          Animated.timing(shadow, { toValue: 0.1, duration: 2500, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, [delay]);

  const animatedStyle = {
    transform: [
      { translateY },
      { rotateZ: rotateZ.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '1.5deg'] }) },
    ],
    shadowOpacity: shadow,
  };

  return (
    <Animated.View style={[styles.floatingCard, animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

const floatingStyles = StyleSheet.create({
  floatingCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 12,
  },
});

styles.floatingCard = floatingStyles.floatingCard;
