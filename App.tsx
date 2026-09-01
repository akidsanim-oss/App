import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { ThemeContext, colors } from './lib/theme';

import { HomeScreen } from './screens/HomeScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { GalleryScreen } from './screens/GalleryScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { TrendDetailScreen } from './screens/TrendDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0D0D0F',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#7BB661',
        tabBarInactiveTintColor: '#6A6A65',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.3,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: string;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Explore':
              iconName = focused ? 'compass' : 'compass-outline';
              break;
            case 'Gallery':
              iconName = focused ? 'cube' : 'cube-outline';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse';
          }
          return <Ionicons name={iconName as any} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const isDark = theme === 'dark';

  // Preload icon fonts for web - required for icons to display correctly
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: isDark ? '#0D0D0F' : '#F5F5F0' }}>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                contentStyle: {
                  backgroundColor: isDark ? '#0D0D0F' : '#F5F5F0',
                },
              }}
            >
              <Stack.Screen name="MainTabs" component={HomeTabs} />
              <Stack.Screen
                name="TrendDetail"
                component={TrendDetailScreen}
                options={{ animation: 'slide_from_bottom' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}
