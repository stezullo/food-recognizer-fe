export class RecognitionResult {
    private description: string;
    private score: number;

    constructor(description: string, scoreUnformatted: number) {
        this.description = description;
        this.score = this.formatScore(scoreUnformatted);
    }

    private formatScore(scoreUnformatted: number): number {
        return Math.round(scoreUnformatted * 100);
    }

    getDescription(): string {
        return this.description;
    }

    _getScore(): number {
        return this.score;
    }

    getScore(): string {
        return this.score.toString() + "%";
    }
}
