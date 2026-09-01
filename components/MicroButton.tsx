import React, { useRef } from 'react';
import { Pressable, Animated, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../lib/theme';
import { Ionicons } from '@expo/vector-icons';

interface MicroButtonProps {
  title: string;
  icon?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'eco';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const MicroButton: React.FC<MicroButtonProps> = ({
  title,
  icon,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}) => {
  const { isDark } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const ripple = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, friction: 6 }),
      Animated.timing(ripple, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }),
      Animated.timing(ripple, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const sizes = {
    sm: { paddingVertical: 8, paddingHorizontal: 14, fontSize: 13 },
    md: { paddingVertical: 12, paddingHorizontal: 20, fontSize: 15 },
    lg: { paddingVertical: 16, paddingHorizontal: 28, fontSize: 16 },
  };

  const s = sizes[size];

  const variants = {
    primary: {
      backgroundColor: isDark ? '#7BB661' : '#2D5A27',
      color: '#FFFFFF',
    },
    secondary: {
      backgroundColor: isDark ? '#1E1E22' : '#F0F0EB',
      color: isDark ? '#F0F0EB' : '#1A1A1A',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: isDark ? '#7BB661' : '#2D5A27',
    },
    eco: {
      backgroundColor: isDark ? '#2A3A25' : '#E8EDE6',
      color: isDark ? '#7BB661' : '#2D5A27',
    },
  };

  const v = variants[variant];

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: v.backgroundColor,
            paddingVertical: s.paddingVertical,
            paddingHorizontal: s.paddingHorizontal,
            transform: [{ scale }],
            width: fullWidth ? '100%' : 'auto',
          },
        ]}
      >
        <Animated.View
          style={[
            styles.ripple,
            {
              opacity: ripple.interpolate({ inputRange: [0, 1], outputRange: [0, 0.3] }),
              transform: [{ scale: ripple.interpolate({ inputRange: [0, 1], outputRange: [0.5, 2] }) }],
            },
          ]}
        />
        <View style={styles.content}>
          {icon && (
            <Ionicons
              name={icon as any}
              size={s.fontSize + 2}
              color={v.color}
              style={styles.icon}
            />
          )}
          <Text style={[styles.text, { color: v.color, fontSize: s.fontSize }]}>
            {title}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 0.15,
    elevation: 4,
  },
  ripple: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
