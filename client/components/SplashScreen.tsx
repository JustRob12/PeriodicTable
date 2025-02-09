import React from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { FloatingElements } from './FloatingElements';

interface Props {
  showSplash: boolean;
  fadeAnim: Animated.Value;
  onSplashComplete: () => void;
}

export const SplashScreen: React.FC<Props> = ({ showSplash, fadeAnim, onSplashComplete }) => {
  if (!showSplash) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.splashContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <FloatingElements showSplash={showSplash} />
        <View style={styles.mainContent}>
          <Animated.Text 
            style={[
              styles.title,
              {
                opacity: fadeAnim,
                transform: [{
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  })
                }]
              }
            ]}
          >
            ELECARD
          </Animated.Text>
          <Animated.Text 
            style={[
              styles.subtitle,
              {
                opacity: fadeAnim,
                transform: [{
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  })
                }]
              }
            ]}
          >
            Master the Elements, One Card at a Time!
          </Animated.Text>
        </View>
        <View style={styles.bottomContent}>
          <Text style={styles.developer}>Developed by MeDevRob</Text>
          <Image
            source={{ uri: 'https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/react-512.png' }}
            style={styles.logo}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    zIndex: 1000,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 72,
    fontFamily: 'BebasNeue-Regular',
    fontWeight: '800',
    color: '#2563eb',
    textAlign: 'center',
    textShadowColor: 'rgba(37, 99, 235, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 24,
    color: '#64748b',
    marginTop: 16,
    textAlign: 'center',
    maxWidth: '80%',
    fontWeight: '500',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  developer: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  logo: {
    width: 30,
    height: 30,
  },
});

export default SplashScreen;
