import { Colors, Fonts, FontSizes, Spacing } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.brand}>ROASTERY</Text>
        <Text style={styles.headline}>Welcome.</Text>
        <Text style={styles.subhead}>
          Carefully sourced. Slowly brewed. Just for you.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  brand: {
    fontFamily: Fonts.bodyMedium,
    fontSize: FontSizes.sm,
    letterSpacing: 4,
    color: Colors.accent,
    marginBottom: Spacing.lg,
  },
  headline: {
    fontFamily: Fonts.displayRegular,
    fontSize: FontSizes["5xl"],
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  subhead: {
    fontFamily: Fonts.bodyLight,
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
});
