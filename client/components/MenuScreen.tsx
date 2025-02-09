import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FloatingElements } from './FloatingElements';
import { Sounds } from '../types';

interface Props {
  onStartPress: () => void;
  onFlashCardsPress: () => void;
  onCreditsPress: () => void;
  onSettingsPress: () => void;
  sounds?: Sounds | null;
}

const MenuScreen: React.FC<Props> = ({ onStartPress, onFlashCardsPress, onCreditsPress, onSettingsPress, sounds }) => {
  const playClickSound = async () => {
    try {
      if (sounds?.click) {
        await sounds.click.setPositionAsync(0);
        await sounds.click.playAsync();
      }
    } catch (error) {
      console.log('Error playing click sound:', error);
    }
  };

  const handleButtonPress = async (action: () => void) => {
    await playClickSound();
    action();
  };

  return (
    <View style={styles.container}>
      <FloatingElements showSplash={true} />
      <View style={styles.content}>
        <Text style={styles.title}>ELECARD</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleButtonPress(onStartPress)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleButtonPress(onFlashCardsPress)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Flash Cards</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleButtonPress(onSettingsPress)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleButtonPress(onCreditsPress)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Credits</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1, // Ensure content stays above floating elements
  },
  title: {
    fontSize: 68,
    fontFamily: 'BebasNeue-Regular',
    fontWeight: '800',
    color: '#2563eb',
    marginBottom: 50,
    textAlign: 'center',
    textShadowColor: 'rgba(37, 99, 235, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  buttonContainer: {
    gap: 20,
    width: '100%',
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'BebasNeue-Regular',
    textAlign: 'center',
  },
});

export default MenuScreen; 