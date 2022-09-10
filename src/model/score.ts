export class Score {
  private highScore = 0;
  private totalScores: Array<number> = [];

  public saveScore(score: number): void {
    if (score > this.highScore) {
      this.highScore = score;
    }
    this.totalScores.push(score);
  }
}