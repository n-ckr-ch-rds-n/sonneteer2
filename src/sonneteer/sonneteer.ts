import type {Poem} from "./poem";
import type {RhymeSet} from "./rhyme.set";
import type {RhymeGenerator} from "../rhyme-generator/rhyme.generator";
import type {RandomWordGenerator} from "../random-word-generator/random.word.generator";

export class Sonneteer {

    constructor(private rhymeGenerator: RhymeGenerator,
                private randomWordGenerator: RandomWordGenerator) {}

    composePoem(rhymeScheme: string, lineLength: number): Poem {
        console.log("SCHEME", rhymeScheme);
        const title = this.generateTitle();
        const body = this.toBody(rhymeScheme, lineLength);
        return {title, body};
    }

    toBody(rhymeScheme: string, lineLength: number): string[] {
        const rhymeSet = this.toRhymeSet(rhymeScheme);
        console.log(rhymeSet);
        return rhymeScheme.split("").reduce((acc, curr) => {
            const rhymeSelector = Math.floor(Math.random() * rhymeScheme[curr].length);
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

    toRhymeSet(rhymeScheme: string): RhymeSet {
        const rhymeSchemeSet = [...new Set(rhymeScheme.split(""))];
        return rhymeSchemeSet.reduce((acc, curr) => {
            const rhymeWord = this.randomWordGenerator();
            return {...acc, [curr]: this.toRhymes(rhymeWord)}
        }, {});
    }

    toRhymes(rhymeWord: string): string[] {
        return [rhymeWord, ...this.rhymeGenerator(rhymeWord).map(r => r.word)];
    }

}
