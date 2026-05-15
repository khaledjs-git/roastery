import { useEffect, useRef } from 'react';
import { Tabs } from 'expo-router';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Home, Coffee, MapPin, User, ShoppingBag } from 'lucide-react-native';
import { Colors, Fonts, FontSizes } from '@/constants/theme';
import { useCartStore } from '@/stores/cartStore';

function CartIconWithBadge({ color, size }: { color: string; size: number }) {
  const count = useCartStore((s) => s.totalItems());
  const pulseCounter = useCartStore((s) => s.pulseCounter);

  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (pulseCounter === 0) return;
    // Spring bounce: quick scale up, settle back to 1
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.35,
        useNativeDriver: true,
        friction: 4,
        tension: 200,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 180,
      }),
    ]).start();
  }, [pulseCounter, scale]);

  return (
    <Animated.View style={[styles.iconWrap, { transform: [{ scale }] }]}>
      <ShoppingBag color={color} size={size} strokeWidth={1.5} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 9 ? '9+' : count}</Text>
        </View>
      )}
    </Animated.View>
  );
}

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
          fontFamily: Fonts.medium,
          fontSize: 10,
          letterSpacing: 1.5,
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
        name="cart"
        options={{
          title: 'ORDER',
          tabBarIcon: ({ color, size }) => <CartIconWithBadge color={color} size={size} />,
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

const styles = StyleSheet.create({
  iconWrap: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.accent,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  badgeText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: 11,
    lineHeight: 13,
  },
});
