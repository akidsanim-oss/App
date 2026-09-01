import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Switch, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, radius, typography, shadows } from '../lib/theme';
import { getEcoStats, EcoStats } from '../lib/storage';
import DynamicText from '../components/DynamicText';
import EcoIndicator from '../components/EcoIndicator';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const [ecoStats, setEcoStats] = useState<EcoStats>({ darkModeHours: 0, trendsLearned: 0, carbonSaved: 0, lastUpdated: '' });
  const [notifications, setNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  useEffect(() => {
    getEcoStats().then(setEcoStats);
  }, []);

  const menuItems = [
    { icon: 'heart', label: 'Saved Trends', color: colors.error, onPress: () => navigation.navigate('Favorites') },
    { icon: 'color-palette', label: 'Design Resources', color: colors.accent, onPress: () => {} },
    { icon: 'download', label: 'Offline Content', color: colors.info, onPress: () => {} },
    { icon: 'share-social', label: 'Share App', color: colors.eco, onPress: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <LinearGradient
          colors={[colors.gradientStart + '30', colors.gradientEnd + '10']}
          style={styles.headerCard}
        >
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={colors.text} />
          </View>
          <DynamicText variant="h2" style={{ marginTop: spacing.md }}>
            Designer
          </DynamicText>
          <DynamicText variant="bodySmall" color={colors.textMuted}>
            UI Trends Explorer
          </DynamicText>

          <View style={styles.miniStats}>
            <View style={styles.miniStat}>
              <DynamicText variant="h4">{ecoStats.trendsLearned}</DynamicText>
              <DynamicText variant="caption" color={colors.textMuted}>Learned</DynamicText>
            </View>
            <View style={styles.divider} />
            <View style={styles.miniStat}>
              <DynamicText variant="h4">{ecoStats.darkModeHours}</DynamicText>
              <DynamicText variant="caption" color={colors.textMuted}>Dark Hrs</DynamicText>
            </View>
            <View style={styles.divider} />
            <View style={styles.miniStat}>
              <DynamicText variant="h4">{ecoStats.carbonSaved}g</DynamicText>
              <DynamicText variant="caption" color={colors.textMuted}>CO₂ Saved</DynamicText>
            </View>
          </View>
        </LinearGradient>

        {/* Eco Impact Section */}
        <View style={styles.section}>
          <DynamicText variant="h3" style={{ marginBottom: spacing.md }}>
            Your Eco Impact
          </DynamicText>
          <EcoIndicator label="Total Carbon Saved" value={`${ecoStats.carbonSaved}g CO₂`} icon="leaf" />
          <View style={[styles.ecoCard, { marginTop: spacing.md }]}>
            <View style={styles.ecoRow}>
              <Ionicons name="moon" size={20} color={colors.accent} />
              <DynamicText variant="body" color={colors.text} style={{ flex: 1, marginLeft: spacing.md }}>
                Dark Mode Active
              </DynamicText>
              <DynamicText variant="bodySmall" color={colors.eco}>
                Saving 47% energy
              </DynamicText>
            </View>
            <View style={styles.ecoDivider} />
            <View style={styles.ecoRow}>
              <Ionicons name="images" size={20} color={colors.warning} />
              <DynamicText variant="body" color={colors.text} style={{ flex: 1, marginLeft: spacing.md }}>
                Optimized Assets
              </DynamicText>
              <DynamicText variant="bodySmall" color={colors.eco}>
                60% less data
              </DynamicText>
            </View>
            <View style={styles.ecoDivider} />
            <View style={styles.ecoRow}>
              <Ionicons name="text" size={20} color={colors.info} />
              <DynamicText variant="body" color={colors.text} style={{ flex: 1, marginLeft: spacing.md }}>
                System Fonts
              </DynamicText>
              <DynamicText variant="bodySmall" color={colors.eco}>
                0 downloads
              </DynamicText>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <DynamicText variant="h3" style={{ marginBottom: spacing.md }}>
            Preferences
          </DynamicText>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.accent + '15' }]}>
                <Ionicons name="notifications" size={18} color={colors.accent} />
              </View>
              <DynamicText variant="body">Daily Trend Notifications</DynamicText>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.accent + '80' }}
              thumbColor={notifications ? colors.accent : colors.textMuted}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.warning + '15' }]}>
                <Ionicons name="contract" size={18} color={colors.warning} />
              </View>
              <DynamicText variant="body">Compact Mode</DynamicText>
            </View>
            <Switch
              value={compactMode}
              onValueChange={setCompactMode}
              trackColor={{ false: colors.border, true: colors.warning + '80' }}
              thumbColor={compactMode ? colors.warning : colors.textMuted}
            />
          </View>
        </View>

        {/* Menu */}
        <View style={styles.section}>
          <DynamicText variant="h3" style={{ marginBottom: spacing.md }}>
            Menu
          </DynamicText>
          {menuItems.map((item, i) => (
            <Pressable key={i} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuLeft}>
                <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                  <Ionicons name={item.icon as any} size={18} color={item.color} />
                </View>
                <DynamicText variant="body">{item.label}</DynamicText>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons name="code-slash" size={14} color={colors.textMuted} />
          <DynamicText variant="caption" color={colors.textMuted} style={{ marginLeft: 6 }}>
            UI Trends 2026 v1.0.0
          </DynamicText>
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
  headerCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.accent + '40',
  },
  miniStats: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    gap: spacing.lg,
  },
  miniStat: {
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
  },
  section: {
    marginTop: spacing.lg,
  },
  ecoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ecoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ecoDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
});
