import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ICard } from '../../interfaces/card.interface';

interface ICardProps {
  card: ICard
  handleClickCard: (id: number)=> void
}

const CardComponent = ({ card, handleClickCard}: ICardProps) => {

  return (
    <TouchableOpacity style={styles.cardButton} onPress={() =>handleClickCard(card.id)}>
      {card.visible ?
        <Text>
          {card.value}
        </Text>
        :
        <Text>❓</Text>
      }

    </TouchableOpacity>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  cardButton: {
    margin: 10,
    padding: 20,
    color: '#F0F0F0',
    backgroundColor: '#305080',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }
});