import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Score } from '../../model/score';

const windowHeight = Dimensions.get('window').height;
const MARGIN_SVG = 10;
const HEIGHT_SVG = 50;
interface IBoardProps {
  handleBackButton: () => void
  score: Score
}

const Board = ({ handleBackButton, score }: IBoardProps) => {

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
      <View style={styles.mainView}>
        <Text style={styles.boardText}>Board</Text>
        <View style={styles.scoreView}>
          <Text style={styles.scoreText}>High Score: </Text>
          <Text style={styles.valueText}>{score.getHighScore}</Text>
        </View>
        <View style={styles.scoreView}>
          <Text style={styles.scoreText}>Total Games: </Text>
          <Text style={styles.valueText}>{score.getTotalGames}</Text>
        </View>
        <View style={styles.totalGames}>
          <Text style={styles.scoreText}>Total Scores</Text>
          {(score.getTotalScores.length === 0)
            ?
            <Text style={styles.noGamesFound}>No games found</Text>
            :
            score.getTotalScores.map((score, index) => {
              return (
                <View key={index} style={styles.scoreView}>
                  <Text style={styles.scoreText}>{`#${index + 1}: `}</Text>
                  <Text style={styles.valueText}>{score}</Text>
                </View>
              );
            })
          }
        </View>
      </View>
    </>
  );
};

export default Board;

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
    justifyContent: 'flex-start',
    backgroundColor: '#333',
    minHeight: windowHeight - MARGIN_SVG - HEIGHT_SVG,
  },
  boardText: {
    color: '#FFF',
    fontFamily: 'Helvetica',
    fontSize: 50,
    marginBottom: 50
  },
  scoreView: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20
  },
  scoreText: {
    color: '#FFF',
    fontFamily: 'Helvetica',
    fontSize: 25
  },
  valueText: {
    color: '#e50914',
    fontFamily: 'Helvetica',
    fontSize: 25
  },
  totalGames: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  noGamesFound: {
    color: '#e50914',
    fontFamily: 'Helvetica',
    fontSize: 15
  },
});