import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { GameController } from '../../controller/game.controller';
import { DifficultyEnum } from '../../enums/difficulty.enum';
import { ICard } from '../../interfaces/card.interface';
import { Score } from '../../model/score';
import CardComponent from '../components/Card.Component';

const windowHeight = Dimensions.get('window').height;
const MARGIN_SVG = 10;
const HEIGHT_SVG = 50;

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
        <svg onClick={() => handleBackButton()} version="1.1" style={styles.svgStyle} fill="#FFF" width={HEIGHT_SVG} id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 219.151 219.151" >
          <g>
            <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575
		C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575
		c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"/>
            <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008
		c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825
		c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628
		c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"/>
          </g>
        </svg>

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
              {buttonMsg}
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
  svgStyle: {
    marginTop: MARGIN_SVG,
    marginLeft: 10,
  },
  mainView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    height: windowHeight - MARGIN_SVG - HEIGHT_SVG,
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
    gap: 10
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
    textAlign: 'center'
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
    textAlign: 'center'
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
    height: windowHeight - MARGIN_SVG - HEIGHT_SVG,
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
  }
});