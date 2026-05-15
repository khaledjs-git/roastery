import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronRight,
  Gift,
  HelpCircle,
  LogOut,
  Plus,
  Settings,
} from 'lucide-react-native';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';
import { useRewardsStore, STAMPS_PER_FREE_DRINK } from '@/stores/rewardsStore';

const USER = {
  name: 'Khaled Alshaya',
  status: 'No Status',
  balance: 0.0,
  stamps: 0,
  STAMPS_PER_FREE_DRINK: 5,
  freeDrinks: 0,
};

const RECENT_ORDERS = [
  {
    id: 'R428193',
    items: '1× Iced Latte (Medium), 1× Almond Crunch',
    total: 2.75,
    date: 'Yesterday · 4:32 PM',
  },
  {
    id: 'R372845',
    items: '2× Flat White (Medium)',
    total: 3.0,
    date: 'May 13 · 9:14 AM',
  },
  {
    id: 'R201764',
    items: '1× V60 Pour Over, 1× Pain au Chocolat',
    total: 3.25,
    date: 'May 11 · 11:48 AM',
  },
];

export default function ProfileScreen() {
  const stamps = useRewardsStore((s) => s.stamps);
  const freeDrinks = useRewardsStore((s) => s.freeDrinks);
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* USER HEADER */}
        <View style={styles.userBlock}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {USER.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </Text>
          </View>
          <Text style={styles.userName}>{USER.name}</Text>
          <Text style={styles.userStatus}>{USER.status}</Text>
        </View>

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
            {Array.from({ length: STAMPS_PER_FREE_DRINK }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.stampCircle,
                  i < stamps && styles.stampFilled,
                ]}
              >
                {i < stamps && (
                  <Text style={styles.stampCheck}>✓</Text>
                )}
              </View>
            ))}
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

        {RECENT_ORDERS.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderRow}
            activeOpacity={0.7}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.orderNumber}>Order #{order.id}</Text>
              <Text style={styles.orderItems} numberOfLines={1}>
                {order.items}
              </Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            <View style={styles.orderRight}>
              <Text style={styles.orderTotal}>{order.total.toFixed(3)} KD</Text>
              <ChevronRight size={18} color={Colors.textTertiary} strokeWidth={1.5} />
            </View>
          </TouchableOpacity>
        ))}

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

        <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
          <LogOut size={18} color={Colors.error} strokeWidth={1.5} />
          <Text style={[styles.menuText, { color: Colors.error }]}>Sign out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Roastery · v0.1.0</Text>
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
