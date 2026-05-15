import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';
import {
  CATEGORIES,
  Product,
  ProductCategory,
  getProductsByCategory,
} from '@/data/catalog';
import { useCartStore } from '@/stores/cartStore';
import { CartBar } from '@/components/CartBar';

export default function MenuScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('drinks');

  const items = useCartStore((s) => s.items);
  // Map productId → total quantity across all sizes
  const quantityByProduct = useMemo(() => {
    const map: Record<string, number> = {};
    items.forEach((it) => {
      map[it.id] = (map[it.id] || 0) + it.quantity;
    });
    return map;
  }, [items]);

  const sections = useMemo(
    () => getProductsByCategory(activeCategory),
    [activeCategory]
  );

  // Flatten sections into a single list with headers for FlatList
  const data = useMemo(() => {
    const out: ({ type: 'header'; title: string } | { type: 'item'; product: Product })[] = [];
    sections.forEach((s) => {
      out.push({ type: 'header', title: s.section });
      s.products.forEach((p) => out.push({ type: 'item', product: p }));
    });
    return out;
  }, [sections]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Menu</Text>
      </View>

      {/* Category tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}
        style={styles.tabsScroll}
      >
        {CATEGORIES.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setActiveCategory(cat.id)}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {cat.label}
              </Text>
              {active && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.tabDivider} />

      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item.type === 'header' ? `h-${item.title}-${index}` : `p-${item.product.id}`
        }
        renderItem={({ item }) => {
          if (item.type === 'header') {
            return <Text style={styles.sectionHeader}>{item.title}</Text>;
          }
          const p = item.product;
          const qty = quantityByProduct[p.id] || 0;
          return (
            <TouchableOpacity
              style={styles.row}
              onPress={() => router.push(`/product/${p.id}`)}
              activeOpacity={0.7}
            >
              <View style={styles.imageWrap}>
                <Image source={{ uri: p.image }} style={styles.rowImage} />
                {qty > 0 && (
                  <View style={styles.qtyBadge}>
                    <Text style={styles.qtyBadgeText}>{qty}</Text>
                  </View>
                )}
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowName}>{p.name}</Text>
                {p.description ? (
                  <Text style={styles.rowDescription} numberOfLines={1}>
                    {p.description}
                  </Text>
                ) : null}
              </View>
              <Text style={styles.rowPrice}>{p.basePrice.toFixed(3)} KD</Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: Spacing['3xl'] + 60 }, // room for floating cart bar
        ]}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />

      <CartBar bottomInset={0} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['3xl'],
    color: Colors.textPrimary,
    letterSpacing: -0.4,
  },

  // Category tabs
  tabsScroll: { flexGrow: 0 },
  tabsRow: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
    paddingBottom: 0,
  },
  tabButton: {
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  tabText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.textTertiary,
  },
  tabTextActive: {
    color: Colors.textPrimary,
    fontFamily: Fonts.semiBold,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '100%',
    backgroundColor: Colors.textPrimary,
  },
  tabDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },

  // List
  list: {},
  sectionHeader: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  imageWrap: {
    position: 'relative',
  },
  rowImage: {
    width: 56,
    height: 56,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surface,
  },
  qtyBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.accent,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  qtyBadgeText: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    color: Colors.white,
    lineHeight: 13,
  },
  rowContent: { flex: 1 },
  rowName: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  rowDescription: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  rowPrice: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
});
