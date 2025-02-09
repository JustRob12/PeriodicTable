import { Animated } from 'react-native';
import { Audio } from 'expo-av';

export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: string;
  // Add other properties your elements have
}

export interface FloatingElement {
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  element: Element;
  scale: number;
  speed: number;
}

export interface Sounds {
  splash: Audio.Sound;
  flip1: Audio.Sound;
  flip2: Audio.Sound;
  science: Audio.Sound;
  click: Audio.Sound;
}

export interface ColorPair extends Array<string> {
  0: string;
  1: string;
}
