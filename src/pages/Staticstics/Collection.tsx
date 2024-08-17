import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import Soil from '../../../assets/images/soil.svg';
import {staticsticsProps} from '../../types/staticstics.type';
import Images from '../../constants/images';

const characters = Array.from({length: 25}, (_, index) =>
  index < 10 ? 'Soil' : '?',
);

const Collection = ({navigation}: staticsticsProps) => {
  return (
    <ImageBackground
      style={{flex: 1}}
      resizeMode={'cover'}
      source={Images.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}>
          <Icon name="arrow-left" size={24} color={colors.darkBrown} />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Collection</Text>
          <View style={styles.grid}>
            {characters.map((character, index) => (
              <View key={index} style={styles.characterBox}>
                {character === 'Soil' ? (
                  <Soil width={50} height={50} />
                ) : (
                  <Text style={styles.questionMark}>?</Text>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goBackButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  scrollContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.MapoFont,
    color: colors.darkBrown,
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  characterBox: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  questionMark: {
    fontSize: 36,
    fontFamily: Fonts.MapoFont,
    color: colors.darkBrown,
  },
});

export default Collection;
