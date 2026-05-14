import { Tabs } from 'expo-router';
import { Home, Coffee, MapPin, User } from 'lucide-react-native';
import { Colors, Fonts, FontSizes } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 88,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: Fonts.bodyMedium,
          fontSize: FontSizes.xs,
          letterSpacing: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} strokeWidth={1.5} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'MENU',
          tabBarIcon: ({ color, size }) => <Coffee color={color} size={size} strokeWidth={1.5} />,
        }}
      />
      <Tabs.Screen
        name="stores"
        options={{
          title: 'STORES',
          tabBarIcon: ({ color, size }) => <MapPin color={color} size={size} strokeWidth={1.5} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} strokeWidth={1.5} />,
        }}
      />
    </Tabs>
  );
}
