import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Coffee, MapPin, Leaf } from 'lucide-react-native';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.overline}>OUR STORY</Text>
          <Text style={styles.heading}>A small roastery,{'\n'}a big love for coffee.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.paragraph}>
            We're a small specialty coffee roastery based in Kuwait, roasting in
            small batches so every cup tastes the way it should — fresh, honest,
            and full of character. From sourcing single-origin beans to dialing
            in each roast by hand, we obsess over the details so you don't have to.
          </Text>
          <Text style={styles.paragraph}>
            Whether you're picking up your morning flat white or brewing at home,
            thank you for being part of our story.
          </Text>
        </View>

        <View style={styles.valuesRow}>
          <View style={styles.valueItem}>
            <View style={styles.valueIcon}>
              <Coffee size={20} color={Colors.white} strokeWidth={1.5} />
            </View>
            <Text style={styles.valueTitle}>Small batch</Text>
            <Text style={styles.valueText}>Roasted fresh, every week</Text>
          </View>
          <View style={styles.valueItem}>
            <View style={styles.valueIcon}>
              <Leaf size={20} color={Colors.white} strokeWidth={1.5} />
            </View>
            <Text style={styles.valueTitle}>Specialty</Text>
            <Text style={styles.valueText}>Ethically sourced beans</Text>
          </View>
          <View style={styles.valueItem}>
            <View style={styles.valueIcon}>
              <MapPin size={20} color={Colors.white} strokeWidth={1.5} />
            </View>
            <Text style={styles.valueTitle}>Made in Kuwait</Text>
            <Text style={styles.valueText}>Proudly local</Text>
          </View>
        </View>

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
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  paragraph: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    lineHeight: 24,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  valuesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  valueItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  valueIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  valueTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    marginBottom: 2,
    textAlign: 'center',
  },
  valueText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.textTertiary,
    textAlign: 'center',
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
