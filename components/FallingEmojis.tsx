import React, { useRef } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface FallingEmojisProps {
  duration: number;
  emojis: string[];
}

const { width, height } = Dimensions.get('window');

const gaussianRandom = (
  mean: number,
  stdDev: number,
  min: number,
  max: number
): number => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return Math.max(min, Math.min(num * stdDev + mean, max));
};

const FallingEmojis = ({ duration, emojis }: FallingEmojisProps) => {
  const rainDrops = useRef<JSX.Element[]>([]); // Explicitly type the ref

  const generateRain = () => {
    const numDrops = 30;

    for (let i = 0; i < numDrops; i++) {
      const randomX = gaussianRandom(width / 2, width / 3, 0, width - 100);
      const randomDelay = Math.random() * 0.8 * duration;

      const finalDuration = duration - randomDelay;
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      const randomStartDiff = 42 + Math.random() * 75;

      const finalDistance = (height * 0.4 * finalDuration) / duration;

      rainDrops.current.push(
        <Animatable.Text
          key={i}
          animation={{
            0: {
              translateY: height - finalDistance * 0.0 - randomStartDiff,
              scaleX: 0,
              scaleY: 0,
            },
            0.1: {
              translateY: height - finalDistance * 0.1 - randomStartDiff,
              scaleX: 1,
              scaleY: 1,
            },
            0.9: {
              translateY: height - finalDistance * 0.9 - randomStartDiff,
              scaleX: 1,
              scaleY: 1,
            },
            1: {
              translateY: height - finalDistance * 1.0 - randomStartDiff,
              scaleX: 0,
              scaleY: 0,
            },
          }}
          easing="ease"
          duration={finalDuration}
          delay={randomDelay}
          iterationCount={1}
          style={[styles.rainDrop, { left: randomX }]}
        >
          {randomEmoji}
        </Animatable.Text>
      );
    }
  };

  if (rainDrops.current.length === 0) {
    generateRain();
  }

  return <View style={styles.container}>{rainDrops.current}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflow: 'hidden',
  },
  rainDrop: {
    position: 'absolute',
    fontSize: 42,
    color: 'white',
  },
});

export default FallingEmojis;
