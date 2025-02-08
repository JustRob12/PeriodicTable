import React from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { SPLASH_TITLE_LINES } from '../data/constants';
import { FloatingElements } from './FloatingElements';

interface Props {
  showSplash: boolean;
  fadeAnim: Animated.Value;
  titleAnimations: Animated.Value[][];
}

export const SplashScreen: React.FC<Props> = ({ showSplash, fadeAnim, titleAnimations }) => {
  const renderAnimatedTitle = () => {
    return (
      <View style={styles.titleContainer}>
        {SPLASH_TITLE_LINES.map((line, lineIndex) => (
          <View key={lineIndex} style={styles.titleLine}>
            {line.split('').map((letter, letterIndex) => (
              <Animated.Text
                key={letterIndex}
                style={[
                  styles.splashTitleLetter,
                  {
                    opacity: titleAnimations[lineIndex][letterIndex],
                    transform: [
                      {
                        translateY: titleAnimations[lineIndex][letterIndex].interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                      {
                        scale: titleAnimations[lineIndex][letterIndex].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.5, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {letter}
              </Animated.Text>
            ))}
          </View>
        ))}
      </View>
    );
  };

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
        <View style={styles.titleWrapper}>
          {renderAnimatedTitle()}
          <View style={styles.titleUnderlineContainer}>
            <Animated.View 
              style={[
                styles.titleUnderline, 
                { 
                  transform: [
                    {
                      scaleX: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    }
                  ],
                }
              ]} 
            />
          </View>
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
  },
  splashContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    zIndex: 1000,
    paddingVertical: 40,
  },
  titleWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  titleUnderlineContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  titleUnderline: {
    width: '100%',
    height: 4,
    backgroundColor: '#2563eb',
    borderRadius: 2,
  },
  splashTitleLetter: {
    fontSize: 46,
    fontFamily: 'System',
    fontWeight: '800',
    color: '#2563eb',
    marginHorizontal: 2,
    textShadowColor: 'rgba(37, 99, 235, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  bottomContent: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
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
