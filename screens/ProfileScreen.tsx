import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Switch } from 'react-native';
import { useTheme } from '../lib/theme';
import { AnimatedTypography } from '../components/AnimatedTypography';
import { EcoBadge } from '../components/EcoBadge';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../components/GlassCard';

export const ProfileScreen: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [ecoMode, setEcoMode] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const scale = React.useRef(new Animated.Value(1)).current;

  const stats = [
    { label: 'Trends Viewed', value: '42', icon: 'eye', color: '#6366F1' },
    { label: 'Time Saved', value: '3.2h', icon: 'time', color: '#06B6D4' },
    { label: 'Eco Score', value: 'A+', icon: 'leaf', color: '#7BB661' },
  ];

  const settings = [
    { key: 'dark', label: 'Dark Mode', icon: 'moon', value: isDark, onToggle: toggleTheme },
    { key: 'eco', label: 'Eco Mode', icon: 'leaf', value: ecoMode, onToggle: () => setEcoMode(!ecoMode) },
    { key: 'anim', label: 'Animations', icon: 'flash', value: animations, onToggle: () => setAnimations(!animations) },
    { key: 'data', label: 'Data Saver', icon: 'wifi', value: dataSaver, onToggle: () => setDataSaver(!dataSaver) },
    { key: 'contrast', label: 'High Contrast', icon: 'contrast', value: highContrast, onToggle: () => setHighContrast(!highContrast) },
  ];

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0D0D0F' : '#F5F5F0' },
      ]}
    >
      <View style={styles.header}>
        <AnimatedTypography variant="title">Profile</AnimatedTypography>
        <Text style={[styles.headerSubtitle, { color: isDark ? '#6A6A65' : '#8A8A8A' }]}>
          Your preferences & settings
        </Text>
      </View>

      {/* Profile Card */}
      <Animated.View
        style={[
          styles.profileCard,
          {
            backgroundColor: isDark ? '#161618' : '#FFFFFF',
            transform: [{ scale }],
          },
        ]}
      >
        <View
          style={[
            styles.avatar,
            { backgroundColor: isDark ? '#2A3A25' : '#E8EDE6' },
          ]}
        >
          <Ionicons
            name="person"
            size={32}
            color={isDark ? '#7BB661' : '#2D5A27'}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: isDark ? '#F0F0EB' : '#1A1A1A' }]}>
            UI Designer
          </Text>
          <Text
            style={[
              styles.profileRole,
              { color: isDark ? '#6A6A65' : '#8A8A8A' },
            ]}
          >
            2026 Trend Explorer
          </Text>
        </View>
        <EcoBadge size="sm" />
      </Animated.View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {stats.map((stat, i) => (
          <GlassCard key={i} style={styles.statCard} intensity={0.05}>
            <View
              style={[
                styles.statIcon,
                { backgroundColor: stat.color + '15' },
              ]}
            >
              <Ionicons name={stat.icon as any} size={18} color={stat.color} />
            </View>
            <Text
              style={[
                styles.statValue,
                { color: isDark ? '#F0F0EB' : '#1A1A1A' },
              ]}
            >
              {stat.value}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDark ? '#6A6A65' : '#8A8A8A' },
              ]}
            >
              {stat.label}
            </Text>
          </GlassCard>
        ))}
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <AnimatedTypography variant="subtitle">Settings</AnimatedTypography>
        <View style={styles.settingsList}>
          {settings.map((setting, i) => (
            <View
              key={setting.key}
              style={[
                styles.settingRow,
                {
                  backgroundColor: isDark ? '#161618' : '#FFFFFF',
                  marginTop: i > 0 ? 8 : 0,
                },
              ]}
            >
              <View style={styles.settingLeft}>
                <View
                  style={[
                    styles.settingIcon,
                    {
                      backgroundColor: isDark ? '#2A2A2E' : '#F0F0EB',
                    },
                  ]}
                >
                  <Ionicons
                    name={setting.icon as any}
                    size={18}
                    color={isDark ? '#7BB661' : '#2D5A27'}
                  />
                </View>
                <Text
                  style={[
                    styles.settingLabel,
                    { color: isDark ? '#F0F0EB' : '#1A1A1A' },
                  ]}
                >
                  {setting.label}
                </Text>
              </View>
              <Switch
                value={setting.value}
                onValueChange={setting.onToggle}
                trackColor={{ false: '#767577', true: '#7BB661' + '80' }}
                thumbColor={setting.value ? '#7BB661' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            </View>
          ))}
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <AnimatedTypography variant="subtitle">About</AnimatedTypography>
        <View
          style={[
            styles.aboutCard,
            { backgroundColor: isDark ? '#161618' : '#FFFFFF' },
          ]}
        >
          <Text style={[styles.aboutText, { color: isDark ? '#B0B0A8' : '#4A4A4A' }]}>
            UI Design Trends 2026 is a showcase app demonstrating the latest innovations in interface design. 
            Built with eco-design principles, dark mode optimization, and immersive 3D interactions.
          </Text>
          <View style={styles.aboutMeta}>
            <Text style={[styles.aboutMetaText, { color: isDark ? '#6A6A65' : '#8A8A8A' }]}>
              Version 1.0.0
            </Text>
            <Text style={[styles.aboutMetaText, { color: isDark ? '#6A6A65' : '#8A8A8A' }]}>
              Built with React Native & Expo
            </Text>
          </View>
        </View>
      </View>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 0.06,
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
  },
  profileRole: {
    fontSize: 13,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    borderRadius: 20,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  settingsList: {
    marginTop: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.03,
    elevation: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  aboutCard: {
    padding: 20,
    borderRadius: 20,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.04,
    elevation: 2,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
  },
  aboutMeta: {
    marginTop: 16,
    gap: 4,
  },
  aboutMetaText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
