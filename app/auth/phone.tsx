import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';

export default function PhoneAuthScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  const isValid = phone.replace(/\s/g, '').length >= 8;

  const handleContinue = () => {
    if (!isValid) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: '/auth/verify',
      params: { phone: `+965${phone.replace(/\s/g, '')}` },
    });
  };

  const handleSkip = () => {
    Haptics.selectionAsync();
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Skip in corner */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.7}>
        <X size={20} color={Colors.textSecondary} strokeWidth={1.5} />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoBlock}>
            <Text style={styles.logo}>
              FLAT<Text style={styles.logoDot}>.</Text>
            </Text>
            <Text style={styles.tagline}>
              A coffee experience, in the palm of your hand.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formBlock}>
            <Text style={styles.fieldLabel}>PHONE NUMBER</Text>
            <View style={styles.phoneRow}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+965</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="5000 0000"
                placeholderTextColor={Colors.textTertiary}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={11}
                autoFocus
              />
            </View>

            <Text style={styles.helper}>
              We'll send you a verification code. No password required.
            </Text>

            <TouchableOpacity
              style={[styles.continueButton, !isValid && styles.continueButtonDisabled]}
              onPress={handleContinue}
              activeOpacity={0.85}
              disabled={!isValid}
            >
              <Text style={styles.continueButtonText}>CONTINUE</Text>
            </TouchableOpacity>

            <Text style={styles.legal}>
              By continuing, you agree to FLAT's Terms of Service and Privacy Policy.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: Spacing.lg,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: Spacing.xl,
  },
  logoBlock: {
    alignItems: 'flex-start',
    marginTop: Spacing.xl,
  },
  logo: {
    fontFamily: Fonts.bold,
    fontSize: 64,
    color: Colors.textPrimary,
    letterSpacing: -1,
    marginBottom: Spacing.lg,
  },
  logoDot: {
    color: '#C9A176',
  },
  tagline: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
    lineHeight: 24,
    maxWidth: 280,
  },
  formBlock: {
    marginBottom: Spacing.lg,
  },
  fieldLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  phoneRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  countryCode: {
    paddingHorizontal: Spacing.lg,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  countryCodeText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
  },
  phoneInput: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
  },
  helper: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textTertiary,
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 18,
    borderRadius: Radius.full,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  continueButtonDisabled: {
    opacity: 0.4,
  },
  continueButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    letterSpacing: 2,
    color: Colors.white,
  },
  legal: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: 16,
  },
});
