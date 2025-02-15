import React, { useState } from 'react';
import { Platform, StyleSheet, View, StatusBar, ActivityIndicator, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

// Read the WEB_APP_URL from environment variables
const WEB_APP_URL = Constants.expoConfig?.extra?.webAppUrl || 'http://localhost:3000';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleReload = () => {
    setError(null);
    setLoading(true);
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        // Web-specific iframe implementation
        <>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error loading content: {error}</Text>
              <Button title="Retry" onPress={handleReload} />
            </View>
          ) : (
            <iframe 
              src={WEB_APP_URL}
              style={styles.webview}
              title="Next.js User Table"
              onLoad={() => {
                setLoading(false);
                setError(null);
              }}
              onError={() => {
                setError('Failed to load content');
                setLoading(false);
              }}
            />
          )}
        </>
      ) : (
        // Mobile WebView implementation
        <>
          <StatusBar barStyle="dark-content" />
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error loading content: {error}</Text>
              <Button title="Retry" onPress={handleReload} />
            </View>
          ) : (
            <WebView
              source={{ uri: WEB_APP_URL }}
              style={styles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              allowsInlineMediaPlayback={true}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => {
                setLoading(false);
                setError(null);
              }}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                setError(nativeEvent.description || 'Failed to load content');
                setLoading(false);
              }}
              renderLoading={() => (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}
            />
          )}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'web' ? 0 : StatusBar.currentHeight,
  },
  webview: {
    flex: 1,
    width: '100%',
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  loadingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    zIndex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});