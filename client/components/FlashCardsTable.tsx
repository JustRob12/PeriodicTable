import React, { memo, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Element } from '../types';

const CARD_COLOR = '#00BBF9'; // Bright Blue

interface Props {
  elements: Element[][];
  onElementPress: (element: Element) => void;
  onBackPress: () => void;
}

const FlashCardsTable: React.FC<Props> = ({ elements, onElementPress, onBackPress }) => {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 60) / 3;

  const cardElements = useMemo(() => {
    return elements.map((column, columnIndex) => (
      <View key={columnIndex} style={styles.column}>
        {column.map((element) => (
          <TouchableOpacity
            key={element.symbol}
            style={[styles.card, { 
              width: cardWidth - 10,
              height: cardWidth - 10,
              backgroundColor: CARD_COLOR,
            }]}
            onPress={() => onElementPress(element)}
          >
            <Text style={styles.atomicNumber}>{element.atomicNumber}</Text>
            <Text style={styles.symbol}>{element.symbol}</Text>
            <Text style={styles.name}>{element.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  }, [elements]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#2563eb" />
      </TouchableOpacity>
      <Text style={styles.title}>Flash Cards</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.gridContainer}>
          {cardElements}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontFamily: 'BebasNeue-Regular',
    color: '#2563eb',
    textAlign: 'center',
    marginTop: 60, // Adjust margin to position below the back button
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  column: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 10,
    justifyContent: 'center',
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
  symbol: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  atomicNumber: {
    fontSize: 12,
    color: '#ffffff',
    position: 'absolute',
    top: 8,
    left: 8,
    fontWeight: '500',
  },
  name: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
  },
});

export default memo(FlashCardsTable); 