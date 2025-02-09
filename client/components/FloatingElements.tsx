import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { FLOATING_ELEMENTS_CONFIG } from '../data/constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Props {
  showSplash: boolean;
}

export const FloatingElements: React.FC<Props> = ({ showSplash }) => {
  const elements = useRef(Array.from({ length: FLOATING_ELEMENTS_CONFIG.TOTAL_ELEMENTS }, () => ({
    x: new Animated.Value(Math.random() * SCREEN_WIDTH),
    y: new Animated.Value(Math.random() * SCREEN_HEIGHT),
    scale: FLOATING_ELEMENTS_CONFIG.MIN_SCALE + Math.random() * (FLOATING_ELEMENTS_CONFIG.MAX_SCALE - FLOATING_ELEMENTS_CONFIG.MIN_SCALE),
    speed: FLOATING_ELEMENTS_CONFIG.MIN_SPEED + Math.random() * (FLOATING_ELEMENTS_CONFIG.MAX_SPEED - FLOATING_ELEMENTS_CONFIG.MIN_SPEED),
  }))).current;

  useEffect(() => {
    if (showSplash) {
      elements.forEach(element => {
        const animate = () => {
          const horizontalAnimation = Animated.sequence([
            Animated.timing(element.x, {
              toValue: Math.random() * SCREEN_WIDTH,
              duration: FLOATING_ELEMENTS_CONFIG.ANIMATION_DURATION * element.speed,
              useNativeDriver: true,
            }),
          ]);

          const verticalAnimation = Animated.sequence([
            Animated.timing(element.y, {
              toValue: Math.random() * SCREEN_HEIGHT,
              duration: FLOATING_ELEMENTS_CONFIG.VERTICAL_DURATION * element.speed,
              useNativeDriver: true,
            }),
          ]);

          Animated.parallel([horizontalAnimation, verticalAnimation]).start(animate);
        };

        animate();
      });
    }
  }, [showSplash]);

  if (!showSplash) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {elements.map((element, index) => (
        <Animated.View
          key={index}
          style={[
            styles.element,
            {
              transform: [
                { translateX: element.x },
                { translateY: element.y },
                { scale: element.scale },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  element: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
});
