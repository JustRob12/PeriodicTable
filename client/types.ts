import { Animated } from 'react-native';
import { Audio } from 'expo-av';

export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: string;
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
  splash: Audio.Sound | null;
  flip1: Audio.Sound | null;
  flip2: Audio.Sound | null;
  science: Audio.Sound | null;
}

export interface ColorPair extends Array<string> {
  0: string;
  1: string;
}
