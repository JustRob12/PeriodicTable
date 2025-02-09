import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Element, ColorPair } from '../types';
import { ElementDescription } from '../data/elementDescriptions';

interface Props {
  element: Element;
  colorPair: ColorPair;
  frontAnimatedStyle: any;
  backAnimatedStyle: any;
  onInfoPress: (element: Element) => void;
  isFlipped: boolean;
}

export const Card: React.FC<Props> = ({
  element,
  colorPair,
  frontAnimatedStyle,
  backAnimatedStyle,
  onInfoPress,
  isFlipped,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Animated.View 
        style={[
          styles.card, 
          { backgroundColor: colorPair[0] },
          styles.cardFront, 
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
          styles.cardBack,
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
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 280,
    height: 400,
    marginVertical: 20,
  },
  card: {
    position: 'absolute',
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
    pointerEvents: 'none',
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
    padding: 20,
  },
  backName: {
    fontSize: 40,
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
