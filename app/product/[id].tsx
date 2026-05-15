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
import { ArrowLeft } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';
import { useCartStore } from '@/stores/cartStore';

const CATALOG: Record<
  string,
  { id: string; name: string; description: string; basePrice: number; image: string }
> = {
  '1': {
    id: '1',
    name: 'Iced Latte',
    description:
      'A smooth blend of double-shot espresso poured over cold milk and ice. Refreshing, balanced, and perfect for warm Kuwait afternoons.',
    basePrice: 1.5,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=900',
  },
  '2': {
    id: '2',
    name: 'Flat White',
    description:
      'Velvety microfoam over a double ristretto. Less foam, more coffee — for the purist.',
    basePrice: 1.25,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=900',
  },
  '3': {
    id: '3',
    name: 'Cortado',
    description:
      'Equal parts espresso and warm milk. Bold, balanced, Spanish-style.',
    basePrice: 1.25,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900',
  },
  '4': {
    id: '4',
    name: 'V60 Pour Over',
    description:
      'Hand-poured filter coffee using a Hario V60. Bright, clean, and crafted for the moment.',
    basePrice: 2.0,
    image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=900',
  },
};

const SIZES = [
  { label: 'Small', priceModifier: 0 },
  { label: 'Medium', priceModifier: 0.25 },
  { label: 'Large', priceModifier: 0.5 },
];

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const [selectedSize, setSelectedSize] = useState('Medium');

  const product = CATALOG[id];

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.notFound}>Product not found.</Text>
      </SafeAreaView>
    );
  }

  const sizeData = SIZES.find((s) => s.label === selectedSize)!;
  const finalPrice = product.basePrice + sizeData.priceModifier;

  const handleAdd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addItem({
      id: product.id,
      name: product.name,
      price: finalPrice,
      size: selectedSize,
      image: product.image,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.textPrimary} strokeWidth={1.5} />
        </TouchableOpacity>

        <View style={styles.imageWrap}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>

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
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAdd}
          activeOpacity={0.85}
        >
          <Text style={styles.addButtonText}>
            Add to cart · {finalPrice.toFixed(3)} KD
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
    backgroundColor: Colors.surface,
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
