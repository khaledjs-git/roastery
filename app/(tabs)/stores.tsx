import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, MapPin, Navigation, Phone } from 'lucide-react-native';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';

const STORE = {
  name: 'Roastery — Salmiya',
  address: 'Block 7, Salem Al Mubarak Street, Salmiya, Kuwait',
  hours: '7:00 AM – 11:00 PM',
  phone: '+965 9000 0000',
  distance: '1.2 km',
  image:
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200',
  mapsUrl:
    'https://maps.apple.com/?q=Salem+Al+Mubarak+Street+Salmiya+Kuwait',
};

export default function StoresScreen() {
  const openMaps = () => Linking.openURL(STORE.mapsUrl);
  const callStore = () => Linking.openURL(`tel:${STORE.phone.replace(/\s/g, '')}`);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Our store</Text>
          <Text style={styles.subtitle}>
            One location. Crafted with intent.
          </Text>
        </View>

        <View style={styles.pickupPillWrap}>
          <View style={styles.pickupPill}>
            <Text style={styles.pickupText}>PICKUP</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={{ uri: STORE.image }} style={styles.storeImage} />

          <View style={styles.cardBody}>
            <View style={styles.titleRow}>
              <Text style={styles.storeName}>{STORE.name}</Text>
              <View style={styles.distanceWrap}>
                <MapPin size={14} color={Colors.textSecondary} strokeWidth={1.5} />
                <Text style={styles.distanceText}>{STORE.distance}</Text>
              </View>
            </View>

            <Text style={styles.address}>{STORE.address}</Text>

            <View style={styles.detailRow}>
              <Clock size={16} color={Colors.textSecondary} strokeWidth={1.5} />
              <Text style={styles.detailText}>{STORE.hours}</Text>
            </View>

            <View style={styles.detailRow}>
              <Phone size={16} color={Colors.textSecondary} strokeWidth={1.5} />
              <Text style={styles.detailText}>{STORE.phone}</Text>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={openMaps}
                activeOpacity={0.85}
              >
                <Navigation size={16} color={Colors.white} strokeWidth={2} />
                <Text style={styles.actionButtonText}>DIRECTIONS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButtonOutline}
                onPress={callStore}
                activeOpacity={0.85}
              >
                <Phone size={16} color={Colors.textPrimary} strokeWidth={2} />
                <Text style={styles.actionButtonOutlineText}>CALL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.footnote}>
          More locations coming soon.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing['2xl'] },
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
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  pickupPillWrap: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  pickupPill: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: 10,
    backgroundColor: Colors.accent,
    borderRadius: Radius.full,
  },
  pickupText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.white,
  },
  card: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  storeImage: {
    width: '100%',
    height: 220,
    backgroundColor: Colors.surfaceElevated,
  },
  cardBody: { padding: Spacing.lg },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  storeName: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
    flex: 1,
    marginRight: Spacing.md,
    letterSpacing: -0.2,
  },
  distanceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  address: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  detailText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: 14,
    backgroundColor: Colors.accent,
    borderRadius: Radius.full,
  },
  actionButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.white,
  },
  actionButtonOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: 14,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
  actionButtonOutlineText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textPrimary,
  },
  footnote: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
