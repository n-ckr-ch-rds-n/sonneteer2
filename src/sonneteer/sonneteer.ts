import type {Poem} from "./poem";
import rhymes from "rhymes";
import type {RhymeSet} from "./rhyme.set";

export class Sonneteer {

    composePoem(rhymeScheme: string, lineLength: number): Poem {
        const title = this.generateTitle();
        const body = this.toBody(rhymeScheme);
        return {title, body};
    }

    toBody(rhymeScheme: string): string[] {
        const rhymeSet = this.toRhymeSet(rhymeScheme);
        console.log(rhymeSet);
        return ["baz"];
    }

    generateTitle(): string {
        return "foobar";
    }

    toRhymeSet(rhymeScheme: string): RhymeSet {
        return rhymeScheme.split("").reduce((acc, curr) => {
            const rhymeWord = "foobar";
            return {...acc, [curr]: this.toRhymes(rhymeWord)}
        }, {});
    }

    toRhymes(rhymeWord: string): string[] {
        return [...rhymes(rhymeWord).map(r => r.word), rhymeWord];
    }

}
