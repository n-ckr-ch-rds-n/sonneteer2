import type {Poem} from "./poem";
import type {RhymeSet} from "./rhyme.set";
import type {RhymeGenerator} from "../rhyme-generator/rhyme.generator";
import type {RandomWordGenerator} from "../random-word-generator/random.word.generator";
import type {SyllableCounter} from "../syllable-counter/syllable.counter";

export class Sonneteer {

    maxTitleLength = 5;

    constructor(private rhymeGenerator: RhymeGenerator,
                private randomWordGenerator: RandomWordGenerator,
                private syllableCounter: SyllableCounter) {}

    composePoem(rhymeScheme: string, lineLength: number): Poem {
        const title = this.generateTitle(this.maxTitleLength);
        const body = this.toBody(rhymeScheme, lineLength);
        return {title, body};
    }

    toBody(rhymeScheme: string, lineLength: number): string[] {
        const rhymeSchemeArray = rhymeScheme.split("");
        const rhymeSet = this.toRhymeSet(rhymeSchemeArray);
        return rhymeSchemeArray.reduce((acc, curr) => {
            const rhymeSelector = Math.floor(Math.random() * rhymeSet[curr].length);
            const lineEnd = rhymeSet[curr][rhymeSelector];
            return [
                ...acc,
                this.toLine(lineEnd, lineLength)
            ]
        }, [])
    }

    toLine(lineEnd: string, lineLength: number): string {
        let syllableCount: number;
        let line = [lineEnd];
        do {
            syllableCount = this.syllableCounter(line);
            if (syllableCount < lineLength) {
                line.unshift(this.randomWordGenerator());
            } else if (syllableCount > lineLength) {
                line.shift();
            }
        } while(syllableCount !== lineLength);
        line[0] = line[0].charAt(0).toUpperCase() + line[0].substr(1);
        return line.join(" ");
    }

    generateTitle(maxTitleLength: number): string {
        const titleLength = Math.floor(Math.random() * maxTitleLength) + 1;
        return new Array(titleLength)
            .fill(0)
            .map(() => this.randomWordGenerator().toUpperCase())
            .join(" ");
    }

    toRhymeSet(rhymeSchemeArray: string[]): RhymeSet {
        const rhymeSchemeSet = [...new Set(rhymeSchemeArray)];
        return rhymeSchemeSet.reduce((acc, curr) => {
            const rhymeWord = this.randomWordGenerator();
            return {...acc, [curr]: this.toRhymes(rhymeWord)}
        }, {});
    }

    toRhymes(rhymeWord: string): string[] {
        return [rhymeWord, ...this.rhymeGenerator(rhymeWord).map(r => r.word)];
    }

}
