export interface RandomSource {
    nextInt(max: number): number
}    

export class RandomSource implements RandomSource {
  public nextInt(max: number): number {
        return Math.floor(Math.random() * max);
    }
}    