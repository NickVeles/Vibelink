import DataContext from '@/components/DataContext';
import Header from '@/components/Header';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { BackIcon } from '@/components/ui/Icon';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const dataContext = useContext(DataContext);
  const settings = dataContext?.settings;

  const handleLeave = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftButton={<BackIcon width={32} height={32} />}
        onLeftPress={handleLeave}
      />

      {/* Content */}
      <ParallaxScrollView>
        {dataContext && (
          <>
            <View></View>
          </>
        )}
        {!dataContext && (<Text style={styles.loadingText}>Loading vibe...</Text>)}
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 20,
    userSelect: 'none',
  },
});
