import React from 'react';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const getSounds = () => {
    const sound1 = new Sound(require('../assets/audio/sound1.mp3'), Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });
      const sound2 = new Sound(require('../assets/audio/sound2.mp3'), error => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });
      const sound3 = new Sound(require('../assets/audio/sound3.mp3'), error => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });
      const sound4 = new Sound(require('../assets/audio/sound4.mp3'), error => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });
      return [sound1,sound2,sound3,sound4]
};

export default getSounds;