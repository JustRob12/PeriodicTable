import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Element, ColorPair } from '../types';

interface Props {
  element: Element;
  colorPair: ColorPair;
  frontAnimatedStyle: any;
  backAnimatedStyle: any;
  onInfoPress: (element: Element) => void;
  isFlipped: boolean;
  onBackPress: () => void;
  onFlip: () => void;
  onNext: () => void;
}

export const Card: React.FC<Props> = ({
  element,
  colorPair,
  frontAnimatedStyle,
  backAnimatedStyle,
  onInfoPress,
  isFlipped,
  onBackPress,
  onFlip,
  onNext,
}) => {
  return (
    <View style={styles.pageContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#2563eb" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Periodic Table Flash Cards</Text>

      <View style={styles.cardContainer}>
        <Animated.View 
          style={[
            styles.card, 
            { backgroundColor: colorPair[0] },
            frontAnimatedStyle,
            !isFlipped && styles.cardFrontActive,
          ]}
        >
          <Text style={styles.symbol}>{element.symbol}</Text>
          <Text style={styles.atomicNumber}>{element.atomicNumber}</Text>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.card,
            { backgroundColor: colorPair[1] },
            backAnimatedStyle,
            isFlipped && styles.cardBackActive,
          ]}
        >
          <View style={styles.cardContent}>
            <Text style={styles.backName}>{element.name}</Text>
            <Text style={styles.backAtomicNumber}>{element.atomicNumber}</Text>
            
            {isFlipped && (
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => onInfoPress(element)}
              >
                <Text style={styles.infoButtonText}>More Info</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colorPair[0] }]} 
          onPress={onFlip}
        >
          <Text style={styles.buttonText}>Flip Card</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colorPair[0] }]} 
          onPress={onNext}
        >
          <Text style={styles.buttonText}>Next Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: '#f0f9ff',
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'center',
    marginTop: 100,
  },
  cardContainer: {
    width: '100%',
    height: 400,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  card: {
    position: 'absolute',
    padding: 20,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardFront: {},
  cardBack: {},
  cardFrontActive: {
    pointerEvents: 'auto',
  },
  cardBackActive: {
    pointerEvents: 'auto',
  },
  symbol: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  atomicNumber: {
    fontSize: 24,
    color: '#ffffff',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  cardContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  backName: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  backAtomicNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
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
  infoButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  infoButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'BebasNeue-Regular',
    textAlign: 'center',
  },
});
