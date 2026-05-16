import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Check, CreditCard, Store } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';
import { useCartStore } from '@/stores/cartStore';

type PaymentMethod = 'apple_pay' | 'knet' | 'card' | 'pickup';

export default function PaymentScreen() {
  const router = useRouter();
  const { pickupTime } = useLocalSearchParams<{ pickupTime: string }>();
  const totalPrice = useCartStore((s) => s.totalPrice);

  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [processing, setProcessing] = useState(false);

  const total = totalPrice();

  const placeOrder = (paymentMethod: PaymentMethod) => {
    if (processing) return;
    setProcessing(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const orderNumber = `FLT-${Math.floor(1000 + Math.random() * 9000)}`;

    // Brief delay so haptic registers + user sees confirmation feedback
    setTimeout(() => {
      router.replace({
        pathname: '/order-confirmation',
        params: {
          orderNumber,
          pickupTime: pickupTime || 'ASAP',
          pickupLocation: 'Salmiya',
        },
      });
    }, 400);
  };

  const handleApplePay = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    placeOrder('apple_pay');
  };

  const handleOther = (m: PaymentMethod) => {
    Haptics.selectionAsync();
    setMethod(m);
  };

  const handleConfirm = () => {
    if (!method) return;
    placeOrder(method);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.content}>
        {/* Total summary */}
        <View style={styles.totalBlock}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalValue}>{total.toFixed(3)} KD</Text>
          <Text style={styles.totalSub}>Pickup from Salmiya · {pickupTime}</Text>
        </View>

        {/* Apple Pay — primary big button */}
        <TouchableOpacity
          style={styles.applePayButton}
          onPress={handleApplePay}
          activeOpacity={0.85}
          disabled={processing}
        >
          <View style={styles.applePayContent}>
            <Text style={styles.applePayLabel}>Pay with</Text>
            <Text style={styles.applePayBrand}> Pay</Text>
          </View>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Other payment methods */}
        <Text style={styles.sectionLabel}>OTHER PAYMENT METHODS</Text>

        <PaymentOption
          icon={<CreditCard size={20} color={Colors.textPrimary} strokeWidth={1.5} />}
          label="KNET"
          sub="Kuwait debit card"
          selected={method === 'knet'}
          onPress={() => handleOther('knet')}
        />

        <PaymentOption
          icon={<CreditCard size={20} color={Colors.textPrimary} strokeWidth={1.5} />}
          label="Credit or debit card"
          sub="Visa, Mastercard"
          selected={method === 'card'}
          onPress={() => handleOther('card')}
        />

        <PaymentOption
          icon={<Store size={20} color={Colors.textPrimary} strokeWidth={1.5} />}
          label="Pay at pickup"
          sub="Cash or card at the counter"
          selected={method === 'pickup'}
          onPress={() => handleOther('pickup')}
        />

        <Text style={styles.demoNote}>
          Demo mode — no real payment will be charged.
        </Text>
      </View>

      {/* Confirm button (only when non-Apple-Pay method picked) */}
      {method && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.85}
            disabled={processing}
          >
            <Text style={styles.confirmButtonText}>
              {processing
                ? 'PROCESSING...'
                : `PLACE ORDER · ${total.toFixed(3)} KD`}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

// Sub-component for a payment row
function PaymentOption({
  icon,
  label,
  sub,
  selected,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.optionRow, selected && styles.optionRowSelected]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.optionIcon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.optionLabel}>{label}</Text>
        <Text style={styles.optionSub}>{sub}</Text>
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <Check size={14} color={Colors.white} strokeWidth={2.5} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  totalBlock: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  totalLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  totalValue: {
    fontFamily: Fonts.bold,
    fontSize: 44,
    color: Colors.textPrimary,
    letterSpacing: -0.8,
    marginBottom: Spacing.xs,
  },
  totalSub: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  applePayButton: {
    backgroundColor: '#000000',
    paddingVertical: 18,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  applePayContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applePayLabel: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.lg,
    color: Colors.white,
  },
  applePayBrand: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: Colors.white,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.xs,
    letterSpacing: 1.5,
    color: Colors.textTertiary,
  },
  sectionLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  optionRowSelected: {
    borderColor: Colors.accent,
    borderWidth: 2,
    backgroundColor: Colors.surface,
  },
  optionIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  optionSub: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  demoNote: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.textTertiary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
  bottomBar: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  confirmButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 18,
    borderRadius: Radius.full,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    letterSpacing: 2,
    color: Colors.white,
  },
});
