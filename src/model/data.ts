import { DifficultyEnum } from '../enums/difficulty.enum';
import { ICard } from '../interfaces/card.interface';

export class Data {

  private readonly easy: Array<string> = ['๐', '๐', '๐งจ', 'โฝ', '๐', '๐'];
  private readonly normal: Array<string> = ['๐', '๐ฑ', '๐งง', '๐'];
  private readonly hard: Array<string> = ['๐', '๐', '๐ ', '๐ก', '๐'];

  public cards: Array<ICard> = [];

  constructor(private readonly difficulty: DifficultyEnum) {

    const selectedValues = {
      1: [...this.easy],
      2: [...this.easy, ...this.normal],
      3: [...this.easy, ...this.normal, ...this.hard]
    }[difficulty];

    const availableCards = [...selectedValues, ...selectedValues];

    this.cards = [...availableCards.map((value, index) => {
      return {
        id: index,
        value: value,
        visible: false
      } as ICard;
    })];
  }
}