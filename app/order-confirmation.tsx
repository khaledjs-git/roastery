import { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Check, Gift } from 'lucide-react-native';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';
import { useCartStore } from '@/stores/cartStore';
import { useRewardsStore, STAMPS_PER_FREE_DRINK } from '@/stores/rewardsStore';
import { getProduct } from '@/data/catalog';

export default function OrderConfirmationScreen() {
  const router = useRouter();
  const { orderNumber, pickupTime } = useLocalSearchParams<{
    orderNumber: string;
    pickupTime: string;
  }>();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const addStampsFromOrder = useRewardsStore((s) => s.addStampsFromOrder);
  const stampsAfter = useRewardsStore((s) => s.stamps);
  const freeDrinksAfter = useRewardsStore((s) => s.freeDrinks);

  // Snapshot what we earned on this order (computed once on mount, before clearing cart)
  const earnedInfo = useRef<{ drinksCount: number; earnedFree: boolean } | null>(null);

  useEffect(() => {
    if (earnedInfo.current !== null) return; // only run once
    // Count drink items in the order
    const drinksCount = items.reduce((sum, item) => {
      const p = getProduct(item.id);
      return p?.category === 'drinks' ? sum + item.quantity : sum;
    }, 0);

    // Compute whether this order will push the user across a free-drink threshold
    const prevStamps = stampsAfter; // before adding
    const willEarn = Math.floor((prevStamps + drinksCount) / STAMPS_PER_FREE_DRINK) >
      Math.floor(prevStamps / STAMPS_PER_FREE_DRINK);

    earnedInfo.current = { drinksCount, earnedFree: willEarn };

    if (drinksCount > 0) {
      addStampsFromOrder(drinksCount);
    }
    clearCart();
  }, [items, addStampsFromOrder, clearCart, stampsAfter]);

  const drinksCount = earnedInfo.current?.drinksCount ?? 0;
  const earnedFree = earnedInfo.current?.earnedFree ?? false;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Check size={44} color={Colors.white} strokeWidth={2.2} />
        </View>

        <Text style={styles.title}>Order placed</Text>
        <Text style={styles.subtitle}>
          Thank you. We've started preparing your order.
        </Text>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order number</Text>
            <Text style={styles.detailValue}>{orderNumber}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pickup time</Text>
            <Text style={styles.detailValue}>{pickupTime}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pickup at</Text>
            <Text style={styles.detailValue}>Roastery Salmiya</Text>
          </View>
        </View>

        {drinksCount > 0 && (
          <View style={styles.rewardsCard}>
            <View style={styles.rewardsHeader}>
              <Gift size={18} color={Colors.accent} strokeWidth={1.5} />
              <Text style={styles.rewardsLabel}>REWARDS UPDATE</Text>
            </View>
            {earnedFree ? (
              <Text style={styles.rewardsBig}>
                You earned a free drink ✨
              </Text>
            ) : (
              <Text style={styles.rewardsBig}>
                +{drinksCount} stamp{drinksCount !== 1 ? 's' : ''}
              </Text>
            )}
            <Text style={styles.rewardsHint}>
              {freeDrinksAfter > 0
                ? `${freeDrinksAfter} free drink${freeDrinksAfter !== 1 ? 's' : ''} ready · ${stampsAfter} of ${STAMPS_PER_FREE_DRINK} stamps`
                : `${stampsAfter} of ${STAMPS_PER_FREE_DRINK} stamps · ${STAMPS_PER_FREE_DRINK - stampsAfter} more to a free drink`}
            </Text>
          </View>
        )}

        <Text style={styles.note}>
          You'll receive a notification when your order is ready for pickup.
        </Text>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.85}
        >
          <Text style={styles.homeButtonText}>BACK TO HOME</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['2xl'],
    alignItems: 'center',
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['3xl'],
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  detailsCard: {
    width: '100%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  detailLabel: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  divider: { height: 1, backgroundColor: Colors.border },
  rewardsCard: {
    width: '100%',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.accent,
    backgroundColor: Colors.surface,
    marginBottom: Spacing.md,
  },
  rewardsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 6,
  },
  rewardsLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.accent,
  },
  rewardsBig: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  rewardsHint: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  note: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.md,
  },
  bottomBar: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  homeButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: Radius.full,
    alignItems: 'center',
  },
  homeButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    letterSpacing: 2,
    color: Colors.white,
  },
});
