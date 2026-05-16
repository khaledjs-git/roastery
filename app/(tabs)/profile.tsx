import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronRight, Gift, HelpCircle, LogOut, Plus, Settings, LogIn, Coffee } from 'lucide-react-native';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';
import { useRewardsStore, STAMPS_PER_FREE_DRINK } from '@/stores/rewardsStore';
import { useOrdersStore, relativeTime, orderSummary, reorderInto } from '@/stores/ordersStore';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';

const USER = {
  name: 'Khaled Alshaya',
  status: 'No Status',
  balance: 0.0,
  stamps: 0,
  STAMPS_PER_FREE_DRINK: 5,
  freeDrinks: 0,
};

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const orders = useOrdersStore((s) => s.orders);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const stamps = useRewardsStore((s) => s.stamps);
  const freeDrinks = useRewardsStore((s) => s.freeDrinks);
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* USER HEADER — auth-aware */}
        {user ? (
          <View style={styles.userBlock}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(user.name || 'F').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.userName}>{user.name || 'FLAT Customer'}</Text>
            <Text style={styles.userStatus}>{user.phone}</Text>
          </View>
        ) : (
          <View style={styles.welcomeBlock}>
            <Text style={styles.welcomeOverline}>WELCOME</Text>
            <Text style={styles.welcomeHeading}>Hi there—</Text>
            <Text style={styles.welcomeTagline}>
              Sign in to save your rewards, track orders, and reorder faster.
            </Text>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => router.push('/auth/phone')}
              activeOpacity={0.85}
            >
              <Text style={styles.signInButtonText}>SIGN IN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.guestLink}
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <Text style={styles.guestLinkText}>Continue browsing as a guest</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* BALANCE CARD */}
        <View style={styles.balanceCard}>
          <View>
            <Text style={styles.balanceLabel}>Balance</Text>
            <Text style={styles.balanceValue}>{USER.balance.toFixed(3)} KD</Text>
          </View>
          <TouchableOpacity style={styles.topUpButton} activeOpacity={0.85}>
            <Plus size={16} color={Colors.white} strokeWidth={2} />
            <Text style={styles.topUpText}>TOP UP</Text>
          </TouchableOpacity>
        </View>

        {/* REWARDS SECTION */}
        <Text style={styles.sectionTitle}>Rewards</Text>

        <View style={styles.rewardsCard}>
          <View style={styles.rewardsHeader}>
            <View style={styles.rewardsIconWrap}>
              <Gift size={20} color={Colors.white} strokeWidth={1.5} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rewardsTitle}>
                {stamps} of {STAMPS_PER_FREE_DRINK} stamps
              </Text>
              <Text style={styles.rewardsSubtitle}>
                {STAMPS_PER_FREE_DRINK - stamps} more for a free drink
              </Text>
            </View>
          </View>
          <View style={styles.stampsTrack}>
            {Array.from({ length: STAMPS_PER_FREE_DRINK }).map((_, i) => {
              const earned = i < stamps;
              return (
                <View
                  key={i}
                  style={[
                    styles.stampCircle,
                    earned && styles.stampFilled,
                  ]}
                >
                  <Coffee
                    size={16}
                    color={earned ? Colors.white : Colors.textTertiary}
                    strokeWidth={1.8}
                  />
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.freeDrinksCard}>
          <View>
            <Text style={styles.freeDrinksLabel}>FREE DRINKS</Text>
            <Text style={styles.freeDrinksValue}>{freeDrinks}</Text>
          </View>
          <Text style={styles.freeDrinksHint}>
            {freeDrinks > 0
              ? 'Redeem at checkout'
              : 'Complete a stamp card to earn one'}
          </Text>
        </View>

        {/* RECENT ORDERS */}
        <Text style={styles.sectionTitle}>Recent orders</Text>

        {orders.length === 0 ? (
          <View style={styles.emptyOrders}>
            <Text style={styles.emptyOrdersText}>No orders yet.</Text>
            <Text style={styles.emptyOrdersSub}>Place your first order to see it here.</Text>
          </View>
        ) : (
          orders.slice(0, 5).map((order) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderRow}
              activeOpacity={0.7}
              onPress={() => {
                reorderInto(order, addItem);
                router.push('/(tabs)/cart');
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.orderNumber}>Order {order.orderNumber}</Text>
                <Text style={styles.orderItems} numberOfLines={1}>
                  {orderSummary(order)}
                </Text>
                <Text style={styles.orderDate}>{relativeTime(order.createdAt)}</Text>
              </View>
              <View style={styles.orderRight}>
                <Text style={styles.orderTotal}>{order.total.toFixed(3)} KD</Text>
                <ChevronRight size={18} color={Colors.textTertiary} strokeWidth={1.5} />
              </View>
            </TouchableOpacity>
          ))
        )}

        {/* SETTINGS */}
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
          <Settings size={18} color={Colors.textPrimary} strokeWidth={1.5} />
          <Text style={styles.menuText}>Settings</Text>
          <ChevronRight size={18} color={Colors.textTertiary} strokeWidth={1.5} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
          <HelpCircle size={18} color={Colors.textPrimary} strokeWidth={1.5} />
          <Text style={styles.menuText}>Help & support</Text>
          <ChevronRight size={18} color={Colors.textTertiary} strokeWidth={1.5} />
        </TouchableOpacity>

        {user && (
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={signOut}
          >
            <LogOut size={18} color={Colors.error} strokeWidth={1.5} />
            <Text style={[styles.menuText, { color: Colors.error }]}>Sign out</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.versionText}>FLAT · v0.1.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing['2xl'] },

  // User block
  userBlock: {
    alignItems: 'center',
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.xl,
    color: Colors.white,
    letterSpacing: 1,
  },
  userName: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['2xl'],
    color: Colors.textPrimary,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  userStatus: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textTertiary,
  },

  // Balance card
  welcomeBlock: {
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  welcomeOverline: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  welcomeHeading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['3xl'],
    color: Colors.textPrimary,
    letterSpacing: -0.4,
    marginBottom: Spacing.sm,
  },
  welcomeTagline: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.xl,
    maxWidth: 320,
  },
  guestLink: {
    marginTop: Spacing.md,
    paddingVertical: 8,
  },
  guestLinkText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
  signInButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: 16,
    borderRadius: Radius.full,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  signInButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.white,
  },
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xl,
  },
  balanceLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  balanceValue: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['2xl'],
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  topUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    backgroundColor: Colors.accent,
    borderRadius: Radius.full,
  },
  topUpText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.white,
  },

  // Section titles
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    letterSpacing: -0.2,
  },

  // Rewards card
  rewardsCard: {
    marginHorizontal: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  rewardsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  rewardsIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardsTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  rewardsSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  stampsTrack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  stampCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampFilled: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  stampCheck: {
    color: Colors.white,
    fontSize: 16,
  },

  // Free drinks card
  freeDrinksCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  freeDrinksLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  freeDrinksValue: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['2xl'],
    color: Colors.textPrimary,
  },
  freeDrinksHint: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textTertiary,
    flex: 1,
    textAlign: 'right',
    marginLeft: Spacing.md,
  },

  // Orders
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  orderNumber: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  orderItems: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  orderDate: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.textTertiary,
  },
  orderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  emptyOrders: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  emptyOrdersText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  emptyOrdersSub: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textTertiary,
  },
  orderTotal: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },

  // Menu rows
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuText: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
  },

  // Version
  versionText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
});
