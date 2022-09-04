import { useEffect } from 'react';
import { Text } from 'react-native';

const Game = () => {

  useEffect(() => {
    console.log('board screen');
  }, []);

  return (
    <Text>{'game'}</Text>
  );
};

export default Game;