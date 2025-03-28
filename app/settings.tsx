import DataContext from '@/components/DataContext';
import Header from '@/components/Header';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { BackIcon, EmojiIcon, TrashIcon } from '@/components/ui/Icon';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { initializeApp } from 'firebase/app';
import { Settings } from '@/models/Settings';
import { FirebaseConnection } from '@/models/FirebaseConnection';

export default function SettingsScreen() {
  const router = useRouter();
  const dataContext = useContext(DataContext);
  const settings = dataContext?.settings;

  const [isConnecting, setIsConnecting] = useState(false);

  const handleLeave = () => {
    router.back();
  };

  const switchLeftEmojiVisible = () => {
    if (!settings) return;

    dataContext?.updateSettings({
      ...settings,
      isLeftEmojiVisible: !settings.isLeftEmojiVisible,
    });
  };

  const switchRightEmojiVisible = () => {
    if (!settings) return;

    dataContext?.updateSettings({
      ...settings,
      isRightEmojiVisible: !settings.isRightEmojiVisible,
    });
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
            {/* Vibe button layout */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Vibe button layout</Text>
              <View style={[styles.input, { flexDirection: 'row' }]}>
                {/* LEFT */}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={switchLeftEmojiVisible}
                  style={{ flex: 3 }}
                >
                  <LinearGradient
                    colors={
                      settings?.isLeftEmojiVisible
                        ? ['#b0485b', '#ff6f61']
                        : ['#f9f9f9', '#f9f9f9']
                    }
                    start={[1, 0]}
                    end={[0, 0.75]}
                    style={[
                      styles.inputButton,
                      {
                        borderTopLeftRadius: 3.5,
                        borderBottomLeftRadius: 3.5,
                      },
                    ]}
                  >
                    <EmojiIcon
                      height={36}
                      width={36}
                      stroke={
                        settings?.isLeftEmojiVisible ? '#f9f9f9' : '#121212'
                      }
                    />
                  </LinearGradient>
                </TouchableOpacity>
                {/* MIDDLE */}
                <View
                  style={[
                    styles.inputButton,
                    {
                      flex: 4,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  <Text style={[styles.inputText, { color: '#999' }]}>
                    Happy
                  </Text>
                </View>
                {/* RIGHT */}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={switchRightEmojiVisible}
                  style={{ flex: 3 }}
                >
                  <LinearGradient
                    colors={
                      settings?.isRightEmojiVisible
                        ? ['#b0485b', '#ff6f61']
                        : ['#f9f9f9', '#f9f9f9']
                    }
                    start={[0, 0.75]}
                    end={[1, 0]}
                    style={[
                      styles.inputButton,
                      {
                        borderTopRightRadius: 3.5,
                        borderBottomRightRadius: 3.5,
                      },
                    ]}
                  >
                    <EmojiIcon
                      height={36}
                      width={36}
                      stroke={
                        settings?.isRightEmojiVisible ? '#f9f9f9' : '#121212'
                      }
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        {!settings && <Text style={styles.loadingText}>Loading vibe...</Text>}
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
    alignItems: 'center',
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
  sensitive: {
    fontSize: 16,
    color: '#0091f7',
    userSelect: 'none',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});
