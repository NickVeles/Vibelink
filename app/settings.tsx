import DataContext from '@/components/DataContext';
import Header from '@/components/Header';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { BackIcon } from '@/components/ui/Icon';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const dataContext = useContext(DataContext);
  const settings = dataContext?.settings;

  const [isShowCustomConnection, setIsShowCustomConnection] = useState(true);

  const handleLeave = () => {
    router.back();
  };

  const switchCustomConnection = () => {
    if (!settings) return;

    dataContext.updateSettings({
      ...settings,
      isCustomConnection: !settings.isCustomConnection,
    })
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftButton={<BackIcon width={32} height={32} />}
        onLeftPress={handleLeave}
      />

      {/* Content */}
      <ParallaxScrollView>
        {settings && (
          <>
            {/* isCustomConnection? */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ask me before sending this vibe</Text>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.input, { flexDirection: 'row' }]}
                onPress={switchCustomConnection}
              >
                <LinearGradient
                  colors={
                    !settings?.customConnection
                      ? ['#b0485b', '#ff6f61']
                      : ['#f9f9f9', '#f9f9f9']
                  }
                  start={[1, 0]}
                  end={[0, 0.75]}
                  style={styles.inputButton}
                >
                  <Text
                    style={[
                      styles.inputText,
                      {
                        color: !settings?.customConnection
                          ? '#f9f9f9'
                          : '#121212',
                      },
                    ]}
                  >
                    Off
                  </Text>
                </LinearGradient>
                <LinearGradient
                  colors={
                    settings?.customConnection
                      ? ['#b0485b', '#ff6f61']
                      : ['#f9f9f9', '#f9f9f9']
                  }
                  start={[0, 0.75]}
                  end={[1, 0]}
                  style={[
                    styles.inputButton,
                    {
                      borderRadius: 0,
                      borderTopRightRadius: 3.5,
                      borderBottomRightRadius: 3.5,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.inputText,
                      {
                        color: settings?.customConnection
                          ? '#f9f9f9'
                          : '#121212',
                      },
                    ]}
                  >
                    On
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={[styles.errorLabel]} />
            </View>
          </>
        )}
        {!settings && (
          <Text style={styles.loadingText}>Loading vibe...</Text>
        )}
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
  inputContainer: {
    paddingTop: 8,
  },
  input: {
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 1,
    height: 45,
  },
  inputButton: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderTopLeftRadius: 3.5,
    borderBottomLeftRadius: 3.5,
  },
  inputText: {
    flex: 1,
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: '#f2f2f2',
    userSelect: 'none',
  },
  label: {
    fontSize: 18,
    color: '#424242',
    paddingBottom: 2,
    userSelect: 'none',
  },
  errorLabel: {
    minHeight: 22,
    fontSize: 16,
    color: '#b0485b',
    userSelect: 'none',
  },
});
