import React, { useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '../lib/theme';

const { width } = Dimensions.get('window');

interface ParallaxScrollProps {
  children: React.ReactNode;
  headerHeight?: number;
  headerContent?: React.ReactNode;
  backgroundColor?: string;
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  headerHeight = 280,
  headerContent,
  backgroundColor,
}) => {
  const { isDark } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerScale = scrollY.interpolate({
    inputRange: [-100, 0, headerHeight],
    outputRange: [1.2, 1, 0.8],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight * 0.6, headerHeight],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight * 0.4],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || (isDark ? '#0D0D0F' : '#F5F5F0') }]}>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            transform: [{ scale: headerScale }, { translateY: headerTranslateY }],
            opacity: headerOpacity,
          },
        ]}
      >
        {headerContent}
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: headerHeight - 60 }} />
        <View
          style={[
            styles.content,
            {
              backgroundColor: isDark ? '#0D0D0F' : '#F5F5F0',
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
            },
          ]}
        >
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  content: {
    minHeight: Dimensions.get('window').height - 100,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});
