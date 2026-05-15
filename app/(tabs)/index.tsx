import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronDown, Search, Bell } from 'lucide-react-native';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';
import { useRewardsStore, STAMPS_PER_FREE_DRINK } from '@/stores/rewardsStore';
import { CartBar } from '@/components/CartBar';

const FEATURED = [
  {
    id: '1',
    name: 'Iced Latte',
    price: '1.500 KD',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600',
  },
  {
    id: '2',
    name: 'Flat White',
    price: '1.250 KD',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600',
  },
  {
    id: '3',
    name: 'Cortado',
    price: '1.250 KD',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600',
  },
  {
    id: '4',
    name: 'V60 Pour Over',
    price: '2.000 KD',
    image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=600',
  },
];

export default function HomeScreen() {
  const stamps = useRewardsStore((s) => s.stamps);
  const freeDrinks = useRewardsStore((s) => s.freeDrinks);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logo}>ROASTERY</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={20} color={Colors.textPrimary} strokeWidth={1.5} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationButton}>
              <Text style={styles.locationText}>Salmiya</Text>
              <ChevronDown size={14} color={Colors.textPrimary} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
        </View>

        {/* REWARDS STRIP */}
        <TouchableOpacity
          style={styles.rewardsStrip}
          onPress={() => router.push('/(tabs)/profile')}
          activeOpacity={0.7}
        >
          <View style={styles.rewardsLeft}>
            <Text style={styles.rewardsLabel}>YOUR REWARDS</Text>
            <Text style={styles.rewardsValue}>{freeDrinks > 0 ? `${freeDrinks} free drink${freeDrinks !== 1 ? 's' : ''} ready` : `${stamps} of ${STAMPS_PER_FREE_DRINK} stamps`}</Text>
          </View>
          <View style={styles.stampsRow}>
            {Array.from({ length: STAMPS_PER_FREE_DRINK }).map((_, i) => (
              <View
                key={i}
                style={[styles.stamp, i < stamps && styles.stampFilled]}
              />
            ))}
          </View>
        </TouchableOpacity>

        {/* SEARCH BAR */}
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.7}>
          <Search size={18} color={Colors.textTertiary} strokeWidth={1.5} />
          <Text style={styles.searchText}>Search drinks, beans, merch</Text>
        </TouchableOpacity>

        {/* HERO CARD */}
        <TouchableOpacity
          style={styles.heroCard}
          onPress={() => router.push('/product/4')}
          activeOpacity={0.9}
        >
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900',
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroLabel}>THIS WEEK'S PICK</Text>
            <Text style={styles.heroTitle}>Ethiopia{'\n'}Yirgacheffe</Text>
            <View style={styles.heroButton}>
              <Text style={styles.heroButtonText}>ORDER</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* FEATURED PRODUCTS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/menu')}>
            <Text style={styles.sectionLink}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsRow}
        >
          {FEATURED.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => router.push(`/product/${product.id}`)}
              activeOpacity={0.85}
            >
              <Image source={resolveImage(product.image)} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
      <CartBar bottomInset={0} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing['2xl'] },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  logo: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    letterSpacing: 4,
    color: Colors.accent,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: Spacing.xs,
  },
  locationText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },

  // Rewards strip
  rewardsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.accent,
  },
  rewardsLeft: { gap: 2 },
  rewardsLabel: {
    fontFamily: Fonts.medium,
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.white,
    opacity: 0.7,
  },
  rewardsValue: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.white,
  },
  stampsRow: { flexDirection: 'row', gap: 6 },
  stamp: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.white,
    opacity: 0.5,
  },
  stampFilled: {
    backgroundColor: Colors.white,
    opacity: 1,
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
  },
  searchText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textTertiary,
  },

  // Hero
  heroCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.black,
    height: 420,
  },
  heroImage: { ...StyleSheet.absoluteFillObject, opacity: 0.72 },
  heroOverlay: { flex: 1, justifyContent: 'flex-end', padding: Spacing.lg },
  heroLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.white,
    marginBottom: Spacing.sm,
    opacity: 0.9,
  },
  heroTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['4xl'],
    color: Colors.white,
    lineHeight: 42,
    marginBottom: Spacing.lg,
    letterSpacing: -0.5,
  },
  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    borderRadius: Radius.full,
  },
  heroButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textPrimary,
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['2xl'],
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  sectionLink: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },

  // Products
  productsRow: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    paddingBottom: Spacing.md,
  },
  productCard: { width: 160 },
  productImage: {
    width: 160,
    height: 160,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.surface,
  },
  productName: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  productPrice: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
});
import { resolveImage } from '@/data/catalog';
