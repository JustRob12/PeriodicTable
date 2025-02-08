import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Sounds } from '../types';

export const useSound = () => {
  const [sounds, setSounds] = useState<Sounds>({
    splash: null,
    flip1: null,
    flip2: null,
    science: null
  });

  useEffect(() => {
    async function loadSounds() {
      try {
        const splashSound = new Audio.Sound();
        const flip1Sound = new Audio.Sound();
        const flip2Sound = new Audio.Sound();
        const scienceSound = new Audio.Sound();

        await splashSound.loadAsync(require('../assets/music/splash.m4a'));
        await flip1Sound.loadAsync(require('../assets/music/flip1.m4a'));
        await flip2Sound.loadAsync(require('../assets/music/flip2.m4a'));
        await scienceSound.loadAsync(require('../assets/music/science.m4a'));

        // Set science music to loop
        await scienceSound.setIsLoopingAsync(true);

        setSounds({
          splash: splashSound,
          flip1: flip1Sound,
          flip2: flip2Sound,
          science: scienceSound
        });

        // Play splash sound immediately
        await splashSound.playAsync();

        // Listen for splash sound completion to start science music
        splashSound.setOnPlaybackStatusUpdate(async (status) => {
          if (!status.isLoaded) return;
          if (status.isLoaded && status.didJustFinish) {
            await scienceSound.playAsync();
          }
        });
      } catch (error) {
        console.log('Error loading sounds:', error);
      }
    }

    loadSounds();

    // Cleanup sounds when component unmounts
    return () => {
      async function unloadSounds() {
        if (sounds.splash) await sounds.splash.unloadAsync();
        if (sounds.flip1) await sounds.flip1.unloadAsync();
        if (sounds.flip2) await sounds.flip2.unloadAsync();
        if (sounds.science) await sounds.science.unloadAsync();
      }
      unloadSounds();
    };
  }, []);

  return sounds;
};
