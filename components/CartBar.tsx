import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingBag } from 'lucide-react-native';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';
import { useCartStore } from '@/stores/cartStore';

/**
 * Floating "View cart" bar.
 *
 * Renders at the bottom of any screen that imports it.
 * Hidden when the cart is empty.
 * Position: absolute, anchored to bottom of safe area.
 */
export function CartBar({ bottomInset = 0 }: { bottomInset?: number }) {
  const router = useRouter();
  const totalItems = useCartStore((s) => s.totalItems());
  const totalPrice = useCartStore((s) => s.totalPrice());

  if (totalItems === 0) return null;

  return (
    <View style={[styles.wrap, { paddingBottom: bottomInset + Spacing.md }]}>
      <TouchableOpacity
        style={styles.bar}
        onPress={() => router.push('/(tabs)/cart')}
        activeOpacity={0.9}
      >
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{totalItems}</Text>
        </View>
        <View style={styles.middle}>
          <ShoppingBag size={16} color={Colors.white} strokeWidth={1.5} />
          <Text style={styles.label}>View cart</Text>
        </View>
        <Text style={styles.price}>{totalPrice.toFixed(3)} KD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    backgroundColor: Colors.accent,
    borderRadius: Radius.full,
    // soft shadow for floating feel
    shadowColor: Colors.black,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  countBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.sm,
    color: Colors.white,
  },
  middle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    letterSpacing: 0.5,
    color: Colors.white,
  },
  price: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    color: Colors.white,
    minWidth: 80,
    textAlign: 'right',
  },
});
