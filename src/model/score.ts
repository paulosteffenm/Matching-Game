export class Score {
  private highScore = 0;
  private totalGames = 0;
  private totalScores: Array<number> = [];

  public get getHighScore(): number {
    return this.highScore;
  }

  public get getTotalGames(): number {
    return this.totalGames;
  }

  public get getTotalScores(): Array<number> {
    return this.totalScores;
  }

  public saveScore(score: number): void {
    if (score > this.highScore) {
      this.highScore = score;
    }
    this.totalScores.push(score);
  }

  public newGame(): void {
    this.totalGames++;
  }

}