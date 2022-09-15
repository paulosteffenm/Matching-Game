import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Score } from '../../model/score';
import { AntDesign } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
interface IBoardProps {
  handleBackButton: () => void
  score: Score
}

const Board = ({ handleBackButton, score }: IBoardProps) => {

  return (
    <>
      <View style={styles.backButton}>
        <AntDesign onClick={() => handleBackButton()} name="arrowleft" size={24} color="white" />
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
            <FlatList
              data={score.getTotalScores}
              renderItem={(score) => {
                return (
                  <View key={score.index} style={styles.scoreView}>
                    <Text style={styles.scoreText}>{`#${score.index}: `}</Text>
                    <Text style={styles.valueText}>{score.item}</Text>
                  </View>
                );
              }}
              contentContainerStyle={{
                height: 500
              }}
            />
          }
        </View>
      </View>
    </>
  );
};

export default Board;

const styles = StyleSheet.create({
  backButton: {
    position:'absolute',
    zIndex:999,
    backgroundColor: '#333',
  },
  mainView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    minHeight: windowHeight,
    maxHeight: windowHeight
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
    alignItems: 'center',
  },
  noGamesFound: {
    color: '#e50914',
    fontFamily: 'Helvetica',
    fontSize: 15
  },
});