import { DifficultyEnum } from '../enums/difficulty.enum';
import { Data } from '../model/data';

export class GameController {

  public data: Data;

  constructor(private readonly difficulty: DifficultyEnum) {
    this.data = new Data(difficulty);
  }

  public shuffle(): void {
    const copyData = [...this.data.cards];
    let currentIndex = copyData.length;
    let randomIndex;

    while (currentIndex !== 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [copyData[currentIndex], copyData[randomIndex]] = [
        copyData[randomIndex], copyData[currentIndex]];
    }

    this.data.cards = [...copyData];
  }
}