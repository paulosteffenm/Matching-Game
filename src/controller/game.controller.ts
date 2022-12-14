import { DifficultyEnum } from '../enums/difficulty.enum';
import { ICard } from '../interfaces/card.interface';
import { Data } from '../model/data';

export class GameController {

  public data: Data;
  private firstClickedCard: ICard | null = null;
  private secondClickedCard: ICard | null = null;
  private lastMatchingCards = true;
  private currentPoints: number;

  constructor(
    private readonly difficulty: DifficultyEnum,
    private readonly initialPoints: number
  ) {
    this.data = new Data(difficulty);
    this.currentPoints = initialPoints;
    this.shuffle();
  }

  public get points(): number {
    return this.currentPoints;
  }

  public get wonTheGame(): boolean {
    return this.data.cards.every((card) => card.visible);
  }

  private clearNonMatchingCards(): void {
    this.lastMatchingCards = true;
    this.firstClickedCard = null;
    this.secondClickedCard = null;
  }

  private checkLastCardsMatch(firstCard: ICard, secondCard: ICard): void {
    this.lastMatchingCards = (firstCard.value === secondCard.value);
    if (!this.lastMatchingCards) {
      this.secondClickedCard = secondCard;
      this.currentPoints -= 5;
    } else {
      this.firstClickedCard = null;
      this.secondClickedCard = null;

      this.currentPoints += 20;
    }
  }

  private shuffle(): void {
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

  public onClickCard(id: number): Array<ICard> {
    const copyCards = [...this.data.cards];
    const cardFound = copyCards.find((card) => card.id === id)!;

    //if card is already clicked
    if (cardFound.visible) {
      return copyCards;
    }

    if (!this.lastMatchingCards) {
      const firstNonMatchingCard = copyCards.find((card) => card.id === this.firstClickedCard?.id)!;
      const secondNonMatchingCard = copyCards.find((card) => card.id === this.secondClickedCard?.id)!;

      firstNonMatchingCard.visible = false;
      secondNonMatchingCard.visible = false;

      this.clearNonMatchingCards();
    }

    if (this.firstClickedCard === null) {
      this.firstClickedCard = cardFound;
      cardFound.visible = true;
      return copyCards;
    } else {

      const previousCard = copyCards.find((card) => card.id === this.firstClickedCard?.id)!;

      cardFound.visible = true;

      this.checkLastCardsMatch(previousCard, cardFound);

      return copyCards;
    }

  }
}