import { useEffect } from 'react';
import { Text } from 'react-native';

const Board = () => {

  useEffect(() => {
    console.log('board screen');
  }, []);

  return (
    <Text>{'board'}</Text>
  );
};

export default Board;