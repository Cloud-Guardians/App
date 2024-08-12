import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import Fonts from '../constants/fonts';

interface CustomProgressBarProps {
  colorName: string;
  onColorChange: (colorName: string, color: string) => void;
  emoji: string;
  emotionLabel: string;
}

const CustomProgressBar = ({
  colorName,
  onColorChange,
  emoji,
  emotionLabel,
}: CustomProgressBarProps) => {
  const [sliderValue, setSliderValue] = useState<number>(0);

  const calculateColor = (value: number) => {
    const intensity = value / 100;
    let newColor = '';

    switch (colorName) {
      case 'green':
        newColor = `rgba(${255 * (1 - intensity)}, 255, ${
          255 * (1 - intensity)
        }, 1)`;
        break;
      case 'blue':
        newColor = `rgba(${255 * (1 - intensity)}, ${
          255 * (1 - intensity)
        }, 255, 1)`;
        break;
      case 'red':
        newColor = `rgba(255, ${255 * (1 - intensity)}, ${
          255 * (1 - intensity)
        }, 1)`;
        break;
      case 'orange':
        newColor = `rgba(255, ${255 - 90 * intensity}, ${
          255 * (1 - intensity)
        }, 1)`;
        break;
      case 'black':
        const grayValue = 255 * (1 - intensity);
        newColor = `rgba(${grayValue}, ${grayValue}, ${grayValue}, 1)`;
        break;
      default:
        newColor = 'rgba(255, 255, 255, 1)';
    }

    return newColor;
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    const newColor = calculateColor(value);
    onColorChange(colorName, newColor);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.emotionLabel}>{emotionLabel}</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>{sliderValue}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={sliderValue}
          onValueChange={handleSliderChange}
          step={10}
          minimumTrackTintColor={calculateColor(sliderValue)}
          maximumTrackTintColor={'#e0e0e0'}
          thumbTintColor={'grey'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
  },
  emotionLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
    fontFamily: Fonts.MapoFont,
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  slider: {
    flex: 1,
    height: 40,
  },
});

export default CustomProgressBar;
