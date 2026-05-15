import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, CreditCard, MapPin } from 'lucide-react-native';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';
import { useCartStore } from '@/stores/cartStore';

const PICKUP_TIMES = ['ASAP (15 min)', 'In 30 min', 'In 1 hour'];

export default function CheckoutScreen() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);

  const [selectedTime, setSelectedTime] = useState('ASAP (15 min)');
  const [notes, setNotes] = useState('');

  const subtotal = totalPrice();
  const total = subtotal;

  const handlePlaceOrder = () => {
    const orderNumber = `R${Math.floor(100000 + Math.random() * 900000)}`;
    router.replace({
      pathname: '/order-confirmation',
      params: { orderNumber, pickupTime: selectedTime },
    });
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={22} color={Colors.textPrimary} strokeWidth={1.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MapPin size={16} color={Colors.accent} strokeWidth={1.5} />
              <Text style={styles.sectionTitle}>Pickup location</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Roastery — Salmiya</Text>
              <Text style={styles.cardSubtitle}>
                Block 7, Salem Al Mubarak Street
              </Text>
              <Text style={styles.cardMeta}>Open · 7:00 AM – 11:00 PM</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Clock size={16} color={Colors.accent} strokeWidth={1.5} />
              <Text style={styles.sectionTitle}>Pickup time</Text>
            </View>
            <View style={styles.pillsRow}>
              {PICKUP_TIMES.map((time) => {
                const active = selectedTime === time;
                return (
                  <TouchableOpacity
                    key={time}
                    style={[styles.pill, active && styles.pillActive]}
                    onPress={() => setSelectedTime(time)}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.pillText, active && styles.pillTextActive]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitleStandalone}>Order notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add a note for the barista (optional)"
              placeholderTextColor={Colors.textTertiary}
              value={notes}
              onChangeText={setNotes}
              multiline
              maxLength={200}
            />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <CreditCard size={16} color={Colors.accent} strokeWidth={1.5} />
              <Text style={styles.sectionTitle}>Payment</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Pay at pickup</Text>
              <Text style={styles.cardSubtitle}>
                Card or cash accepted in store
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitleStandalone}>Order summary</Text>
            <View style={styles.summaryCard}>
              {items.map((item) => (
                <View key={`${item.id}-${item.size}`} style={styles.summaryItem}>
                  <Text style={styles.summaryItemName}>
                    {item.quantity}× {item.name}
                    <Text style={styles.summaryItemSize}>  ({item.size})</Text>
                  </Text>
                  <Text style={styles.summaryItemPrice}>
                    {(item.price * item.quantity).toFixed(3)} KD
                  </Text>
                </View>
              ))}
              <View style={styles.summaryDivider} />
              <View style={styles.summaryTotalRow}>
                <Text style={styles.summaryTotalLabel}>Total</Text>
                <Text style={styles.summaryTotalValue}>{total.toFixed(3)} KD</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}
            activeOpacity={0.85}
          >
            <Text style={styles.placeOrderText}>
              PLACE ORDER · {total.toFixed(3)} KD
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
  },
  linkText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.accent,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
  },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xl },
  section: { marginBottom: Spacing.xl },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
  },
  sectionTitleStandalone: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  card: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  cardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  cardMeta: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.textTertiary,
  },
  pillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  pill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillActive: { borderColor: Colors.accent, backgroundColor: Colors.accent },
  pillText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  pillTextActive: { color: Colors.white },
  notesInput: {
    minHeight: 88,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
  },
  summaryCard: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  summaryItemName: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    flex: 1,
  },
  summaryItemSize: { color: Colors.textTertiary },
  summaryItemPrice: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  summaryTotalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryTotalLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
  },
  summaryTotalValue: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  bottomBar: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  placeOrderButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: Radius.full,
    alignItems: 'center',
  },
  placeOrderText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    letterSpacing: 2,
    color: Colors.white,
  },
});
