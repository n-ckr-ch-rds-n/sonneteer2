import type {Poem} from "./poem";
import type {RhymeSet} from "./rhyme.set";
import type {RhymeGenerator} from "../rhyme-generator/rhyme.generator";
import type {RandomWordGenerator} from "../random-word-generator/random.word.generator";

export class Sonneteer {

    constructor(private rhymeGenerator: RhymeGenerator,
                private randomWordGenerator: RandomWordGenerator) {}

    composePoem(rhymeScheme: string, lineLength: number): Poem {
        const title = this.generateTitle();
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
        return `Foo bar ${lineEnd}`;
    }

    generateTitle(): string {
        return "foobar";
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
