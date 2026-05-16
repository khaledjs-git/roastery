import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Fonts, FontSizes, Radius, Spacing } from '@/constants/theme';

type Props = {
  visible: boolean;
  onSubmit: (name: string) => void;
  onSkip: () => void;
};

export function NamePromptModal({ visible, onSubmit, onSkip }: Props) {
  const [name, setName] = useState('');

  const isValid = name.trim().length >= 1;

  const handleSubmit = () => {
    if (!isValid) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onSubmit(name.trim());
    setName('');
  };

  const handleSkip = () => {
    Haptics.selectionAsync();
    onSkip();
    setName('');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleSkip}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.backdrop}
      >
        <View style={styles.sheet}>
          {/* Drag handle */}
          <View style={styles.handle} />

          {/* Overline */}
          <Text style={styles.overline}>WELCOME TO FLAT.</Text>

          {/* Big headline */}
          <Text style={styles.headline}>What's your name?</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            We'd love to know what to call you when your order is ready.
          </Text>

          {/* Input */}
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor={Colors.textTertiary}
            value={name}
            onChangeText={setName}
            autoFocus
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
            maxLength={32}
          />

          {/* Primary CTA */}
          <TouchableOpacity
            style={[styles.continueButton, !isValid && styles.continueButtonDisabled]}
            onPress={handleSubmit}
            disabled={!isValid}
            activeOpacity={0.85}
          >
            <Text style={styles.continueButtonText}>CONTINUE</Text>
          </TouchableOpacity>

          {/* Skip */}
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>I'd rather not say</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing['2xl'],
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  overline: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  headline: {
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
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 16,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
  },
  continueButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 18,
    borderRadius: Radius.full,
    alignItems: 'center',
    marginBottom: Spacing.md,
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
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
});
