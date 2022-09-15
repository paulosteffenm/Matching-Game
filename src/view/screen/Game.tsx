import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { GameController } from '../../controller/game.controller';
import { DifficultyEnum } from '../../enums/difficulty.enum';
import { ICard } from '../../interfaces/card.interface';
import { Score } from '../../model/score';
import { AntDesign } from '@expo/vector-icons'; 
import CardComponent from '../components/Card.Component';

const windowHeight = Dimensions.get('window').height;

interface IGameProps {
  handleBackButton: () => void
  score: Score
}

let gameController: GameController | null = null;

const Game = ({ handleBackButton, score }: IGameProps) => {

  const [cards, setCards] = useState<Array<ICard>>([]);
  const [points, setPoints] = useState<number>(30);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [buttonMsg, setButtonMsg] = useState<string>('');

  const handleSetDifficulty = (difficulty: DifficultyEnum) => {
    gameController = new GameController(difficulty, points);
    score.newGame();
    setCards(gameController.data.cards);
  };

  const handleClickCard = (id: number) => {
    const newCards = gameController!.onClickCard(id);
    setCards(newCards);

    const newPoints = gameController!.points;
    setPoints(newPoints);

    const wonTheGame = gameController?.wonTheGame;
    (newPoints === 0 || wonTheGame) ? setIsOver(true) : setIsOver(false);
    (wonTheGame) ? setButtonMsg('You Won') : setButtonMsg('You Lose');
    if (wonTheGame) {
      score.saveScore(newPoints);
    }
  };

  return (
    <>
      <View style={styles.backButton}>
        <AntDesign onClick={() => handleBackButton()} name="arrowleft" size={24} color="white"/>
      </View>
      {(cards.length === 0) ?
        <View style={styles.mainView}>
          <Text style={styles.logo}>Select difficulty</Text>
          <View style={styles.buttonsView}>
            <TouchableOpacity onPress={() => handleSetDifficulty(DifficultyEnum.Easy)}>
              <Text style={styles.easyButton}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSetDifficulty(DifficultyEnum.Normal)}>
              <Text style={styles.normalButton}>Normal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSetDifficulty(DifficultyEnum.Hard)}>
              <Text style={styles.hardButton}>Hard</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={styles.boardView}>
          <View style={styles.pointsView}>
            <Text style={styles.textPoints}>Points: </Text>
            <Text style={styles.currentPoints}>{points}</Text>
          </View>
          {(isOver)
            ? <TouchableOpacity
              onPress={() => handleBackButton()}
              style={(gameController?.wonTheGame) ? [styles.wonButton] : [styles.loseButton]}
            >
              <View>
                <Text style={styles.buttonMsg}>
                  {buttonMsg}
                </Text>
              </View>
            </TouchableOpacity>
            : <View style={styles.boardCards}>
              {cards.map((card, index) => <CardComponent handleClickCard={handleClickCard} key={index} card={card} />)}
            </View>}

        </View>
      }
    </>
  );
};

export default Game;

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: '#333',
  },
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  easyButton: {
    backgroundColor: '#19E352',
    color: '#FFF',
    fontSize: 24,
    padding: 8,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    borderRadius: 2,
    minWidth: 150,
    textAlign: 'center',
    marginBottom: 10
  },
  normalButton: {
    backgroundColor: '#1CA4FD',
    color: '#FFF',
    fontSize: 24,
    padding: 8,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    borderRadius: 2,
    minWidth: 150,
    textAlign: 'center',
    marginBottom: 10
  },
  hardButton: {
    backgroundColor: '#E50914',
    color: '#FFF',
    fontSize: 24,
    padding: 8,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    borderRadius: 2,
    minWidth: 150,
    textAlign: 'center'
  },
  boardView: {
    backgroundColor: '#333',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: windowHeight,
  },
  boardCards: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  pointsView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textPoints: {
    color: '#FFF',
    fontFamily: 'Helvetica',
    fontSize: 50
  },
  currentPoints: {
    color: '#e50914',
    fontFamily: 'Helvetica',
    fontSize: 50
  },
  wonButton: {
    backgroundColor: '#19E352',
    color: '#FFF',
    fontSize: 24,
    padding: 8,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    borderRadius: 2,
    width: 150,
    textAlign: 'center'
  },
  loseButton: {
    backgroundColor: '#E50914',
    color: '#FFF',
    fontSize: 24,
    padding: 8,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    borderRadius: 2,
    width: 150,
    textAlign: 'center'
  },
  buttonMsg: {
    color: '#FFF',
    fontWeight: '700',
    fontFamily: 'Helvetica',
    textAlign: 'center',
    fontSize: 24,
  }
});