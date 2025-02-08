import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, Easing } from 'react-native';
import { Element, FloatingElement } from '../types';
import { elements } from '../data/elements';
import { FLOATING_ELEMENTS_CONFIG } from '../data/constants';

interface Props {
  showSplash: boolean;
}

const getDistributedPosition = (index: number, total: number) => {
  const gridSize = Math.ceil(Math.sqrt(total));
  const cellSize = 100 / gridSize;
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  return {
    x: (col * cellSize) + (Math.random() * cellSize * 0.6),
    y: (row * cellSize) + (Math.random() * cellSize * 0.6)
  };
};

export const FloatingElements: React.FC<Props> = ({ showSplash }) => {
  const [floatingElements] = useState(() => {
    const total = FLOATING_ELEMENTS_CONFIG.TOTAL_ELEMENTS;
    return Array.from({ length: total }, (_, index) => {
      const pos = getDistributedPosition(index, total);
      return {
        x: new Animated.Value(pos.x),
        y: new Animated.Value(pos.y),
        opacity: new Animated.Value(0),
        element: elements[Math.floor(Math.random() * elements.length)],
        scale: FLOATING_ELEMENTS_CONFIG.MIN_SCALE + Math.random() * 
               (FLOATING_ELEMENTS_CONFIG.MAX_SCALE - FLOATING_ELEMENTS_CONFIG.MIN_SCALE),
        speed: FLOATING_ELEMENTS_CONFIG.MIN_SPEED + Math.random() * 
               (FLOATING_ELEMENTS_CONFIG.MAX_SPEED - FLOATING_ELEMENTS_CONFIG.MIN_SPEED),
      };
    });
  });

  useEffect(() => {
    if (!showSplash) return;

    const createFloatingAnimation = (element: FloatingElement) => {
      const createRandomMovement = () => {
        const direction = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 50;
        const targetX = Math.cos(direction) * distance;
        const targetY = Math.sin(direction) * distance;

        return Animated.parallel([
          Animated.sequence([
            Animated.timing(element.x, {
              toValue: targetX,
              duration: FLOATING_ELEMENTS_CONFIG.ANIMATION_DURATION,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.sin),
            }),
            Animated.timing(element.x, {
              toValue: -targetX,
              duration: FLOATING_ELEMENTS_CONFIG.ANIMATION_DURATION,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.sin),
            }),
          ]),
          Animated.sequence([
            Animated.timing(element.y, {
              toValue: targetY,
              duration: FLOATING_ELEMENTS_CONFIG.VERTICAL_DURATION,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.sin),
            }),
            Animated.timing(element.y, {
              toValue: -targetY,
              duration: FLOATING_ELEMENTS_CONFIG.VERTICAL_DURATION,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.sin),
            }),
          ]),
        ]);
      };

      return Animated.parallel([
        Animated.sequence([
          Animated.timing(element.opacity, {
            toValue: 0.4,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(element.opacity, {
            toValue: 0,
            duration: 1000,
            delay: 2500,
            useNativeDriver: true,
          }),
        ]),
        Animated.loop(createRandomMovement()),
      ]);
    };

    floatingElements.forEach(element => {
      createFloatingAnimation(element).start();
    });
  }, [showSplash]);

  return (
    <>
      {floatingElements.map((floatingEl, index) => (
        <Animated.View
          key={index}
          style={[
            styles.floatingElement,
            {
              opacity: floatingEl.opacity,
              transform: [
                {
                  translateX: floatingEl.x.interpolate({
                    inputRange: [-30, 30],
                    outputRange: [-90, 90],
                  }),
                },
                {
                  translateY: floatingEl.y.interpolate({
                    inputRange: [-30, 30],
                    outputRange: [-160, 160],
                  }),
                },
                { scale: floatingEl.scale },
              ],
            },
          ]}
        >
          <Text style={styles.floatingSymbol}>{floatingEl.element.symbol}</Text>
        </Animated.View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  floatingElement: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.2)',
  },
  floatingSymbol: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(37, 99, 235, 0.6)',
  },
});
