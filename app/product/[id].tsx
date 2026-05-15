import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Minus, Plus } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';
import { useCartStore } from '@/stores/cartStore';
import { getProduct, SIZES } from '@/data/catalog';

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const [selectedSize, setSelectedSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState(false);

  const product = getProduct(id);

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.notFound}>Product not found.</Text>
      </SafeAreaView>
    );
  }

  const sizeData = product.hasSizes
    ? SIZES.find((s) => s.label === selectedSize)!
    : { label: 'One Size', priceModifier: 0 };

  const unitPrice = product.basePrice + sizeData.priceModifier;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    if (busy) return;
    setBusy(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: unitPrice,
        size: sizeData.label,
        image: product.image,
      });
    }
    // Auto-navigate back. The persistent cart bar IS the confirmation.
    setTimeout(() => {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/(tabs)');
      }
    }, 300);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.textPrimary} strokeWidth={1.5} />
        </TouchableOpacity>

        <View style={styles.imageWrap}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>

          {product.hasSizes && (
            <>
              <Text style={styles.sectionLabel}>SIZE</Text>
              <View style={styles.sizesRow}>
                {SIZES.map((s) => {
                  const active = selectedSize === s.label;
                  return (
                    <TouchableOpacity
                      key={s.label}
                      onPress={() => setSelectedSize(s.label)}
                      style={[styles.sizePill, active && styles.sizePillActive]}
                      activeOpacity={0.85}
                    >
                      <Text style={[styles.sizeText, active && styles.sizeTextActive]}>
                        {s.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}

          <Text style={styles.sectionLabel}>QUANTITY</Text>
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              activeOpacity={0.7}
            >
              <Minus size={18} color={Colors.textPrimary} strokeWidth={1.5} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => setQuantity(quantity + 1)}
              activeOpacity={0.7}
            >
              <Plus size={18} color={Colors.textPrimary} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAdd}
          activeOpacity={0.85}
          disabled={busy}
        >
          <Text style={styles.addButtonText}>
            Add to cart · {totalPrice.toFixed(3)} KD
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  notFound: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing['2xl'],
  },
  backButton: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.lg,
    zIndex: 10,
    backgroundColor: Colors.white,
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrap: {
    width: '100%',
    height: 420,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '100%' },
  content: { padding: Spacing.lg },
  name: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['3xl'],
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    letterSpacing: -0.4,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  sizesRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.xl },
  sizePill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sizePillActive: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accent,
  },
  sizeText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  sizeTextActive: { color: Colors.white },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  qtyButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
  },
  bottomBar: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  addButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: Radius.full,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    letterSpacing: 1,
    color: Colors.white,
  },
});
