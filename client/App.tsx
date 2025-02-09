import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Easing } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ElementModal from './components/ElementModal';
import { elementDescriptions, ElementDescription } from './data/elementDescriptions';
import { elements } from './data/elements';
import { colorPairs } from './data/colorPairs';
import { SPLASH_TITLE_LINES } from './data/constants';
import { useSound } from './hooks/useSound';
import { useFonts } from './hooks/useFonts';
import { SplashScreen } from './components/SplashScreen';
import { Card } from './components/Card';
import { Settings } from './components/Settings';

export default function App() {
  const isLoaded = useFonts();
  const [showSplash, setShowSplash] = useState(true);
  const [currentElement, setCurrentElement] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [titleAnimations] = useState(() => 
    SPLASH_TITLE_LINES.map(line => 
      line.split('').map(() => new Animated.Value(0))
    )
  );
  const [currentColorPair, setCurrentColorPair] = useState(colorPairs[0]);
  const { sounds, volume, handleVolumeChange } = useSound();
  const [selectedElement, setSelectedElement] = useState<ElementDescription | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!sounds?.splash) return;
    
    // Animate the splash screen
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      // Animate each line's letters sequentially
      ...titleAnimations.flatMap((line, lineIndex) =>
        line.map((anim, letterIndex) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            delay: (lineIndex * line.length + letterIndex) * 100,
            useNativeDriver: true,
          })
        )
      ),
    ]).start();

    // Hide splash screen after 10 seconds total
    const timer = setTimeout(() => {
      // Start fade out at 8 seconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => setShowSplash(false));
    }, 8000);

    return () => clearTimeout(timer);
  }, [sounds?.splash]);

  const flipCard = async () => {
    try {
      // Play flip sound
      if (sounds?.flip2) {
        await sounds.flip2.setPositionAsync(0);
        await sounds.flip2.playAsync();
      }
    } catch (error) {
      console.log('Error playing flip sound:', error);
    }

    setIsFlipped(!isFlipped);
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const nextCard = async () => {
    try {
      // Play next card sound
      if (sounds?.flip1) {
        await sounds.flip1.setPositionAsync(0);
        await sounds.flip1.playAsync();
      }
    } catch (error) {
      console.log('Error playing next sound:', error);
    }

    setIsFlipped(false);
    flipAnim.setValue(0);
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * elements.length);
    } while (newIndex === currentElement);
    setCurrentElement(newIndex);
    
    const newColorIndex = Math.floor(Math.random() * colorPairs.length);
    setCurrentColorPair(colorPairs[newColorIndex]);
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {showSplash ? (
        <SplashScreen
          showSplash={showSplash}
          fadeAnim={fadeAnim}
          titleAnimations={titleAnimations}
          onSplashComplete={() => setShowSplash(false)}
        />
      ) : (
        <>
          <Settings volume={volume} onVolumeChange={handleVolumeChange} />
          <Text style={styles.title}>Periodic Table Flash Cards</Text>
          <Card
            element={elements[currentElement]}
            colorPair={currentColorPair}
            frontAnimatedStyle={frontAnimatedStyle}
            backAnimatedStyle={backAnimatedStyle}
            onInfoPress={(element) => {
              setSelectedElement(elementDescriptions[element.symbol]);
              setModalVisible(true);
            }}
            isFlipped={isFlipped}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: currentColorPair[0] }]} 
              onPress={flipCard}
            >
              <Text style={styles.buttonText}>Flip Card</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: currentColorPair[0] }]} 
              onPress={nextCard}
            >
              <Text style={styles.buttonText}>Next Card</Text>
            </TouchableOpacity>
          </View>
          <ElementModal
            isVisible={modalVisible}
            element={selectedElement}
            onClose={() => setModalVisible(false)}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
