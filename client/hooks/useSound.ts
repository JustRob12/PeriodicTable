import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Sounds } from '../types';

export const useSound = () => {
  const [sounds, setSounds] = useState<Sounds | null>(null);
  const [volume, setVolume] = useState(0.7); // Default volume

  useEffect(() => {
    async function loadSounds() {
      try {
        const splashSound = new Audio.Sound();
        const flip1Sound = new Audio.Sound();
        const flip2Sound = new Audio.Sound();
        const scienceSound = new Audio.Sound();
        const clickSound = new Audio.Sound();

        await splashSound.loadAsync(require('../assets/music/splash.m4a'));
        await flip1Sound.loadAsync(require('../assets/music/flip1.m4a'));
        await flip2Sound.loadAsync(require('../assets/music/flip2.m4a'));
        await scienceSound.loadAsync(require('../assets/music/science.m4a'));
        await clickSound.loadAsync(require('../assets/music/click.m4a'));

        // Set science music to loop
        await scienceSound.setIsLoopingAsync(true);

        // Set initial volume for all sounds
        await splashSound.setVolumeAsync(volume);
        await flip1Sound.setVolumeAsync(volume);
        await flip2Sound.setVolumeAsync(volume);
        await scienceSound.setVolumeAsync(volume);
        await clickSound.setVolumeAsync(volume);

        setSounds({
          splash: splashSound,
          flip1: flip1Sound,
          flip2: flip2Sound,
          science: scienceSound,
          click: clickSound,
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

    return () => {
      if (sounds) {
        Object.values(sounds).forEach(sound => {
          sound.unloadAsync();
        });
      }
    };
  }, []);

  useEffect(() => {
    if (sounds) {
      // Update volume for all sounds when volume changes
      Object.values(sounds).forEach(async (sound) => {
        await sound.setVolumeAsync(volume);
      });
    }
  }, [volume, sounds]);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  return { sounds, volume, handleVolumeChange };
};
