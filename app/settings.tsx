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
  const [isShowSensitiveSettings, setIsShowSensitiveSettings] = useState(false);
  const [apiKey, setApiKey] = useState(
    settings?.customConnection?.apiKey ?? ''
  );
  const [authDomain, setAuthDomain] = useState(
    settings?.customConnection?.authDomain ?? ''
  );
  const [projectId, setProjectId] = useState(
    settings?.customConnection?.projectId ?? ''
  );
  const [storageBucket, setStorageBucket] = useState(
    settings?.customConnection?.storageBucket ?? ''
  );
  const [messagingSenderId, setMessagingSenderId] = useState(
    settings?.customConnection?.messagingSenderId ?? ''
  );
  const [appId, setAppId] = useState(settings?.customConnection?.appId ?? '');

  const [isConnecting, setIsConnecting] = useState(false);

  const handleLeave = () => {
    router.back();
  };

  const switchCustomConnection = () => {
    if (!settings) return;

    if (settings.isCustomConnection) {
      setIsShowSensitiveSettings(false);
    }

    dataContext?.updateSettings({
      ...settings,
      isCustomConnection: !settings.isCustomConnection,
    });
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

  const setConnection = (isReset?: boolean): FirebaseConnection => {
    const connection: FirebaseConnection = {
      apiKey: apiKey,
      authDomain: authDomain,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId,
    };

    dataContext?.updateSettings({
      ...settings!,
      customConnection: isReset ? undefined : connection,
    });

    return connection;
  };

  const handleConnect = async () => {
    if (!settings) return;
    const connection = setConnection();

    if (
      !connection ||
      Object.values(connection).some((value) => value === '')
    ) {
      Alert.alert('Error', 'Please, fill all connection fields');
      console.error('Please, fill all connection fields');
      return;
    }


    //TODO: WHY FIREBASE CONNECTED?
    try {
      setIsConnecting(true);
      initializeApp(connection);
      Alert.alert('Success', 'Firebase connected!');
      console.log('Firebase connected!');
    } catch (error: any) {
      Alert.alert('Error', 'Failed to connect to Firebase');
      console.error('Failed to connect to Firebase');
    } finally {
      setIsConnecting(false);
    }
  };

  const resetConnection = () => {
    if (!settings) return;
    setApiKey('');
    setAuthDomain('');
    setProjectId('');
    setStorageBucket('');
    setMessagingSenderId('');
    setAppId('');
    setConnection(true);
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

            {/* isCustomConnection? */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Use custom connection</Text>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.input, { flexDirection: 'row' }]}
                onPress={switchCustomConnection}
              >
                <LinearGradient
                  colors={
                    !settings?.isCustomConnection
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
                  <Text
                    style={[
                      styles.inputText,
                      {
                        color: !settings?.isCustomConnection
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
                    settings?.isCustomConnection
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
                  <Text
                    style={[
                      styles.inputText,
                      {
                        color: settings?.isCustomConnection
                          ? '#f9f9f9'
                          : '#121212',
                      },
                    ]}
                  >
                    On
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* isShowSensitiveSettings? */}
            {settings.isCustomConnection && isShowSensitiveSettings && (
              <>
                {/* API KEY */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>API key</Text>
                  <TextInput
                    value={apiKey}
                    onChangeText={setApiKey}
                    placeholder="e.g. AIzaSyDk...your_api_key..._dF9"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    style={[styles.input, { padding: 8 }]}
                  />
                </View>
                {/* AUTH DOMAIN */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Authentification domain</Text>
                  <TextInput
                    value={authDomain}
                    onChangeText={setAuthDomain}
                    placeholder="e.g. your-project-id.firebaseapp.com"
                    placeholderTextColor="#999"
                    style={[styles.input, { padding: 8 }]}
                  />
                </View>
                {/* PROJECT ID */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Project ID</Text>
                  <TextInput
                    value={projectId}
                    onChangeText={setProjectId}
                    placeholder="e.g. your-project-id"
                    placeholderTextColor="#999"
                    style={[styles.input, { padding: 8 }]}
                  />
                </View>
                {/* STORAGE BUCKET */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Storage bucket</Text>
                  <TextInput
                    value={storageBucket}
                    onChangeText={setStorageBucket}
                    placeholder="e.g. your-project-id.appspot.com"
                    placeholderTextColor="#999"
                    style={[styles.input, { padding: 8 }]}
                  />
                </View>
                {/* MESSAGING SENDER ID */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Cloud messaging ID</Text>
                  <TextInput
                    value={messagingSenderId}
                    onChangeText={setMessagingSenderId}
                    placeholder="e.g. 123456789012"
                    placeholderTextColor="#999"
                    style={[styles.input, { padding: 8 }]}
                  />
                </View>
                {/* APP ID */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>App ID</Text>
                  <TextInput
                    value={appId}
                    onChangeText={setAppId}
                    placeholder="e.g. 1:123...789:web:1234a...gh90ij"
                    placeholderTextColor="#999"
                    style={[styles.input, { padding: 8 }]}
                  />
                </View>
                <View
                  style={[
                    styles.inputContainer,
                    { flexDirection: 'row', gap: 20 },
                  ]}
                >
                  <TouchableOpacity
                    style={[styles.input, styles.inputButton]}
                    onPress={handleConnect}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <Animatable.View
                        animation="fadeIn"
                        duration={500}
                        key="connecting"
                        style={[
                          styles.inputButton,
                          {
                            width: '100%',
                            backgroundColor: '#55c937',
                            borderRadius: 3.5,
                          },
                        ]}
                      >
                        <ActivityIndicator size={32} color="#f9f9f9" />
                      </Animatable.View>
                    ) : (
                      <Text
                        style={[
                          styles.inputText,
                          { flex: 1, color: '#121212' },
                        ]}
                      >
                        Set & Connect
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.input,
                      styles.inputButton,
                      { width: 45, backgroundColor: '#b0485b' },
                    ]}
                    onPress={resetConnection}
                    disabled={isConnecting}
                  >
                    <Text style={[styles.inputText, { padding: 8, flex: 1 }]}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            {settings.isCustomConnection && !isShowSensitiveSettings && (
              <Text
                style={[styles.inputContainer, styles.sensitive]}
                onPress={() => setIsShowSensitiveSettings(true)}
              >
                Show sensitive settings
              </Text>
            )}
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
