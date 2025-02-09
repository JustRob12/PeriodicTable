import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';

export const useFonts = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadFonts = useCallback(async () => {
    try {
      await Font.loadAsync({
        'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'),
        'Orbitron-Bold': require('../assets/fonts/Orbitron-Bold.ttf'),
      });
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts:', error);
      setIsLoaded(false);
    }
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  return isLoaded;
};
