import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react-native';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';
import { useCartStore, CartItem } from '@/stores/cartStore';
import { resolveImage } from '@/data/catalog';

// Build a human-readable customization summary for a cart line.
function describeItem(item: CartItem): string {
  const parts: string[] = [];

  if (item.size && item.size !== 'One Size') parts.push(item.size);
  if (item.apparelSize) parts.push(`Size ${item.apparelSize}`);
  if (item.strengthBase && item.strengthBase !== 'Regular')
    parts.push(item.strengthBase);
  if (item.extraShots && item.extraShots > 0)
    parts.push(`${item.extraShots} extra shot${item.extraShots > 1 ? 's' : ''}`);
  if (item.milk && item.milk !== 'Regular') parts.push(`${item.milk} milk`);
  if (item.flavors && item.flavors.length > 0)
    parts.push(item.flavors.join(', '));

  return parts.join(' · ');
}

export default function CartScreen() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const increaseByKey = useCartStore((s) => s.increaseByKey);
  const decreaseByKey = useCartStore((s) => s.decreaseByKey);
  const removeItemByKey = useCartStore((s) => s.removeItemByKey);
  const keyFor = useCartStore((s) => s.keyFor);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const totalItems = useCartStore((s) => s.totalItems());

  const subtotal = totalPrice();
  const total = subtotal;

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Your order</Text>
        </View>
        <View style={styles.emptyState}>
          <ShoppingBag size={48} color={Colors.textTertiary} strokeWidth={1} />
          <Text style={styles.emptyTitle}>Nothing here yet</Text>
          <Text style={styles.emptySubtitle}>
            Add a coffee from our menu to get started.
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => router.push('/(tabs)/menu')}
            activeOpacity={0.85}
          >
            <Text style={styles.browseButtonText}>BROWSE MENU</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }: { item: CartItem }) => {
    const key = keyFor(item);
    const summary = describeItem(item);
    return (
      <View style={styles.cartItem}>
        <Image source={resolveImage(item.image)} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          {summary ? <Text style={styles.itemSize}>{summary}</Text> : null}
          {item.notes ? (
            <Text style={styles.itemNotes}>“{item.notes}”</Text>
          ) : null}
          <Text style={styles.itemPrice}>
            {(item.price * item.quantity).toFixed(3)} KD
          </Text>
        </View>
        <View style={styles.itemControls}>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItemByKey(key)}
          >
            <Trash2 size={16} color={Colors.textTertiary} strokeWidth={1.5} />
          </TouchableOpacity>
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => decreaseByKey(key)}
            >
              <Minus size={14} color={Colors.textPrimary} strokeWidth={1.5} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => increaseByKey(key)}
            >
              <Plus size={14} color={Colors.textPrimary} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Your order ({totalItems})</Text>
        <Text style={styles.subtitle}>Order preparation time 6–9 mins</Text>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => keyFor(item)}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{subtotal.toFixed(3)} KD</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{total.toFixed(3)} KD</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push('/checkout')}
          activeOpacity={0.85}
        >
          <Text style={styles.checkoutButtonText}>PROCEED TO CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['3xl'],
    color: Colors.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes['2xl'],
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  browseButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.xl,
    paddingVertical: 14,
    borderRadius: Radius.full,
  },
  browseButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.white,
  },
  list: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  cartItem: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
  },
  itemDetails: { flex: 1, paddingTop: 2 },
  itemName: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  itemSize: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 3,
    lineHeight: 18,
  },
  itemNotes: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textTertiary,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  itemPrice: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
  },
  itemControls: { alignItems: 'flex-end', gap: Spacing.sm },
  removeButton: { padding: Spacing.xs },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  qtyButton: { padding: Spacing.xs },
  qtyText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    minWidth: 16,
    textAlign: 'center',
  },
  summary: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  totalRow: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  totalLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
  },
  totalValue: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['2xl'],
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  checkoutButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: Radius.full,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    letterSpacing: 2,
    color: Colors.white,
  },
});
