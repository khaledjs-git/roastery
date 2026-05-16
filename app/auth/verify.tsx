import { useEffect, useRef, useState } from 'react';
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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';
import { useAuthStore } from '@/stores/authStore';

const CODE_LENGTH = 4;

export default function VerifyScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const signIn = useAuthStore((s) => s.signIn);

  const [code, setCode] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const inputRef = useRef<TextInput>(null);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  // Auto-submit when 4 digits entered
  useEffect(() => {
    if (code.length === CODE_LENGTH) {
      handleVerify();
    }
  }, [code]);

  const handleVerify = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Mock auth — accept any 4-digit code
    signIn({ phone: phone || '+965XXXXXXXX' });
    // Brief delay so haptic registers, then go home
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 200);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    Haptics.selectionAsync();
    setResendTimer(30);
    setCode('');
    inputRef.current?.focus();
  };

  // Build a display string for the 4 boxes
  const boxes = Array.from({ length: CODE_LENGTH }, (_, i) => code[i] || '');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={1.5} />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.headerBlock}>
            <Text style={styles.label}>VERIFICATION</Text>
            <Text style={styles.title}>Enter the code</Text>
            <Text style={styles.subtitle}>
              We sent a 4-digit code to{'\n'}
              <Text style={styles.phoneText}>{phone}</Text>
            </Text>
          </View>

          {/* Code boxes (visual) */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            style={styles.codeRow}
          >
            {boxes.map((char, i) => (
              <View
                key={i}
                style={[
                  styles.codeBox,
                  char ? styles.codeBoxFilled : null,
                  i === code.length ? styles.codeBoxActive : null,
                ]}
              >
                <Text style={styles.codeChar}>{char}</Text>
              </View>
            ))}
          </TouchableOpacity>

          {/* Hidden actual input that drives the boxes */}
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            keyboardType="number-pad"
            maxLength={CODE_LENGTH}
            value={code}
            onChangeText={(t) => setCode(t.replace(/[^0-9]/g, ''))}
            autoFocus
            textContentType="oneTimeCode"
          />

          {/* Demo hint */}
          <Text style={styles.demoHint}>
            Demo mode — enter any 4 digits
          </Text>

          {/* Resend */}
          <View style={styles.resendBlock}>
            <Text style={styles.resendLabel}>Didn't get a code?</Text>
            <TouchableOpacity
              onPress={handleResend}
              disabled={resendTimer > 0}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.resendButton,
                  resendTimer > 0 && styles.resendButtonDisabled,
                ]}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend code'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  backButton: {
    position: 'absolute',
    top: 60,
    left: Spacing.lg,
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
    paddingTop: 120,
  },
  headerBlock: {
    marginBottom: Spacing['2xl'],
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['3xl'],
    color: Colors.textPrimary,
    letterSpacing: -0.4,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  phoneText: {
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  codeRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  codeBox: {
    flex: 1,
    height: 64,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  codeBoxFilled: {
    borderColor: Colors.accent,
    backgroundColor: Colors.background,
  },
  codeBoxActive: {
    borderColor: Colors.accent,
    borderWidth: 2,
  },
  codeChar: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['2xl'],
    color: Colors.textPrimary,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  demoHint: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.textTertiary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: Spacing['2xl'],
  },
  resendBlock: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  resendLabel: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  resendButton: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    color: Colors.accent,
    letterSpacing: 0.5,
  },
  resendButtonDisabled: {
    color: Colors.textTertiary,
  },
});
