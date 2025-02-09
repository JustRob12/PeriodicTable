import React, { useState, useEffect, useRef } from 'react';
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
import MenuScreen from './components/MenuScreen';
import FlashCardsTable from './components/FlashCardsTable';
import CreditsModal from './components/CreditsModal';
import { Element } from './types';
import LoadingSpinner from './components/LoadingSpinner';

export default function App() {
  const fontsLoaded = useFonts();
  const [splashComplete, setSplashComplete] = useState(false);
  const [currentElement, setCurrentElement] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [titleAnimations] = useState(() => 
    SPLASH_TITLE_LINES.map(line => 
      line.split('').map(() => new Animated.Value(0))
    )
  );
  const [currentColorPair, setCurrentColorPair] = useState(colorPairs[0]);
  const { sounds, volume, handleVolumeChange } = useSound();
  const [selectedElement, setSelectedElement] = useState<ElementDescription | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'menu' | 'game' | 'table'>('splash');
  const [showSettings, setShowSettings] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // 2 seconds fade in
      useNativeDriver: true,
    }).start(() => {
      // Hold for 2 seconds
      setTimeout(() => {
        // Fade out animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000, // 2 seconds fade out
          useNativeDriver: true,
        }).start(() => {
          setSplashComplete(true);
          setCurrentScreen('menu');
        });
      }, 2000); // 2 seconds hold
    });
  }, []);

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

  // Handle menu button presses
  const handleStartPress = () => {
    setCurrentScreen('game');
  };

  const handleFlashCardsPress = async () => {
    try {
      // Show loading immediately
      setIsLoading(true);

      // Play sound without waiting
      if (sounds?.click) {
        sounds.click.setPositionAsync(0);
        sounds.click.playAsync();
      }

      // Short delay for loading animation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCurrentScreen('table');
    } catch (error) {
      console.log('Error handling flash cards press:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle element selection in table view
  const handleElementPress = async (element: Element) => {
    try {
      // Show loading immediately
      setIsLoading(true);
      setCurrentElement(elements.findIndex(e => e.symbol === element.symbol));

      // Play sound without waiting
      if (sounds?.click) {
        sounds.click.setPositionAsync(0);
        sounds.click.playAsync();
      }

      // Short delay for loading animation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setModalVisible(true);
    } catch (error) {
      console.log('Error handling element press:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert flat array to 2D array with 3 columns
  const elementColumns = elements.reduce<Element[][]>((acc, element, index) => {
    const columnIndex = Math.floor(index % 3);
    if (!acc[columnIndex]) acc[columnIndex] = [];
    acc[columnIndex].push(element);
    return acc;
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {currentScreen === 'splash' && (
        <SplashScreen
          showSplash={!splashComplete}
          fadeAnim={fadeAnim}
          onSplashComplete={() => setCurrentScreen('menu')}
        />
      )}
      
      {currentScreen === 'menu' && (
        <MenuScreen
          onStartPress={handleStartPress}
          onFlashCardsPress={handleFlashCardsPress}
          onCreditsPress={() => setShowCredits(true)}
          onSettingsPress={() => setShowSettings(true)}
          sounds={sounds}
        />
      )}
      
      {currentScreen === 'game' && (
        <Card
          element={elements[currentElement]}
          colorPair={currentColorPair}
          frontAnimatedStyle={frontAnimatedStyle}
          backAnimatedStyle={backAnimatedStyle}
          onInfoPress={handleElementPress}
          isFlipped={isFlipped}
          onBackPress={() => setCurrentScreen('menu')}
          onFlip={flipCard}
          onNext={nextCard}
        />
      )}
      
      {currentScreen === 'table' && (
        <FlashCardsTable
          elements={elementColumns}
          onElementPress={handleElementPress}
          onBackPress={() => setCurrentScreen('menu')}
        />
      )}
      
      <ElementModal
        isVisible={modalVisible}
        element={elementDescriptions[elements[currentElement].symbol]}
        onClose={() => setModalVisible(false)}
      />
      
      <Settings 
        isVisible={showSettings}
        onClose={() => setShowSettings(false)}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />
      
      <CreditsModal 
        isVisible={showCredits}
        onClose={() => setShowCredits(false)}
      />

      {isLoading && <LoadingSpinner />}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
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
  fullScreen: {
    flex: 1,
    position: 'relative',
  },
});
