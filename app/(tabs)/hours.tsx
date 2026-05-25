import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock } from 'lucide-react-native';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';

type HoursRow = { label: string; days: string; time: string };

const HOURS: HoursRow[] = [
  { label: 'Weekdays', days: 'Sunday – Thursday', time: '7:00 AM – 10:00 PM' },
  { label: 'Weekends', days: 'Friday – Saturday', time: '8:00 AM – 12:00 AM' },
];

export default function HoursScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.overline}>WHEN WE'RE OPEN</Text>
          <Text style={styles.heading}>Our hours.</Text>
        </View>

        <View style={styles.card}>
          {HOURS.map((row, idx) => (
            <View
              key={row.label}
              style={[
                styles.row,
                idx < HOURS.length - 1 && styles.rowDivider,
              ]}
            >
              <View style={styles.rowIcon}>
                <Clock size={20} color={Colors.white} strokeWidth={1.5} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>{row.label}</Text>
                <Text style={styles.rowDays}>{row.days}</Text>
                <Text style={styles.rowTime}>{row.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.note}>
          Hours may vary on public holidays. We'll always post updates in the app.
        </Text>

        <Text style={styles.footer}>FLAT · Kuwait</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: {
    paddingBottom: Spacing['2xl'],
    paddingHorizontal: Spacing.lg,
  },
  header: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  overline: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['3xl'],
    color: Colors.textPrimary,
    letterSpacing: -0.4,
    lineHeight: 38,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  rowDays: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textTertiary,
    marginBottom: 2,
  },
  rowTime: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
  },
  note: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    lineHeight: 20,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  footer: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
});
