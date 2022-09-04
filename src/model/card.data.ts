import { DifficultyEnum } from '../enums/difficulty.enum';

export class Data {

  private readonly easy: Array<string> = ['🎈', '💄', '🧨', '⚽', '🎉', '🎃'];
  private readonly normal: Array<string> = ['🎄', '🎱', '🧧', '🎀'];
  private readonly hard: Array<string> = ['🎁', '🏓', '🎠', '🎡', '💎'];

  public data: Array<string> = [];

  constructor(private readonly difficulty: DifficultyEnum) {

    const selectedValues = {
      1: [...this.easy],
      2: [...this.easy, ...this.normal],
      3: [...this.easy, ...this.normal, ...this.hard]
    }[difficulty];

    this.data = [...selectedValues];
  }
}