import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import Board from './Board';
import Game from './Game';

const windowHeight = Dimensions.get('window').height;

const Home = () => {
  const [screen, setScreen] = useState<'board' | 'game' | null>(null);

  const handleClickButtons = (screen: 'board' | 'game' | null) => {
    setScreen(screen);
  };

  if (!screen) {
    return (
      <View style={styles.mainView}>
        <Text style={styles.logo}>Matching Game</Text>
        <View style={styles.buttonsView}>
          <TouchableOpacity onPress={() => handleClickButtons('board')} style={styles.boardButton}>Board</TouchableOpacity>
          <TouchableOpacity onPress={() => handleClickButtons('game')} style={styles.newGameButton}>New Game</TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (screen === 'game') ? <Game /> : <Board />;
  }

};

export default Home;

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    height: windowHeight,
  },
  logo: {
    color: '#FFF',
    fontFamily: 'Helvetica',
    fontSize: 50
  },
  buttonsView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  newGameButton: {
    backgroundColor: '#e50914',
    color: '#FFF',
    fontSize: 24,
    padding: 8,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    borderRadius: 2
  },
  boardButton: {
    backgroundColor: '#333',
    color: '#FFF',
    fontSize: 24,
    padding: 8,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    borderRadius: 2,
    borderColor: '#fff',
    borderWidth: 1
  }
});
