import { Text } from 'react-native';
import { Score } from '../../model/score';

interface IBoardProps {
  score: Score
}

const Board = ({ score }: IBoardProps) => {

  return (
    <Text>{'board'}</Text>
  );
};

export default Board;