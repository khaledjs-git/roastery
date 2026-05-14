import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, FontSizes } from '@/constants/theme';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontFamily: Fonts.displayRegular, fontSize: FontSizes['4xl'], color: Colors.textPrimary },
});
