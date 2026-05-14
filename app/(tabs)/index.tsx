import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, Search } from 'lucide-react-native';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';

const CATEGORIES = ['Espresso', 'Filter', 'Cold', 'Pastries', 'Beans'];

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
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>ROASTERY</Text>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationText}>Kuwait City</Text>
            <ChevronDown size={16} color={Colors.textPrimary} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        <View style={styles.greetingSection}>
          <Text style={styles.greetingSmall}>Good morning,</Text>
          <Text style={styles.greetingLarge}>Khaled.</Text>
        </View>

        <TouchableOpacity style={styles.searchBar}>
          <Search size={18} color={Colors.textTertiary} strokeWidth={1.5} />
          <Text style={styles.searchText}>Search drinks, beans...</Text>
        </TouchableOpacity>

        <View style={styles.heroCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroLabel}>THIS WEEK'S PICK</Text>
            <Text style={styles.heroTitle}>Ethiopia{'\n'}Yirgacheffe</Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>ORDER</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity key={category} style={styles.categoryPill}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsRow}
        >
          {FEATURED.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing['2xl'] },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  logo: {
    fontFamily: Fonts.bodyBold,
    fontSize: FontSizes.base,
    letterSpacing: 4,
    color: Colors.accent,
  },
  locationButton: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  locationText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  greetingSection: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg },
  greetingSmall: {
    fontFamily: Fonts.bodyLight,
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  greetingLarge: {
    fontFamily: Fonts.displayRegular,
    fontSize: FontSizes['4xl'],
    color: Colors.textPrimary,
    lineHeight: 44,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchText: {
    fontFamily: Fonts.bodyRegular,
    fontSize: FontSizes.sm,
    color: Colors.textTertiary,
  },
  heroCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.black,
    height: 380,
  },
  heroImage: { ...StyleSheet.absoluteFillObject, opacity: 0.7 },
  heroOverlay: { flex: 1, justifyContent: 'flex-end', padding: Spacing.lg },
  heroLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: FontSizes.xs,
    letterSpacing: 3,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  heroTitle: {
    fontFamily: Fonts.displayRegular,
    fontSize: FontSizes['4xl'],
    color: Colors.white,
    lineHeight: 42,
    marginBottom: Spacing.lg,
  },
  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.full,
  },
  heroButtonText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: FontSizes.xs,
    letterSpacing: 2,
    color: Colors.textPrimary,
  },
  sectionHeader: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
  sectionTitle: {
    fontFamily: Fonts.displayRegular,
    fontSize: FontSizes['2xl'],
    color: Colors.textPrimary,
  },
  categoriesRow: { paddingHorizontal: Spacing.lg, gap: Spacing.sm, marginBottom: Spacing.xl },
  categoryPill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  categoryText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  productsRow: { paddingHorizontal: Spacing.lg, gap: Spacing.md, paddingBottom: Spacing.md },
  productCard: { width: 160 },
  productImage: {
    width: 160,
    height: 160,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.surface,
  },
  productName: {
    fontFamily: Fonts.bodyMedium,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  productPrice: {
    fontFamily: Fonts.bodyRegular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
});
