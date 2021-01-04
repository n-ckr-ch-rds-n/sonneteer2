import type {Poem} from "./poem";

export class Sonneteer {

    composePoem(rhymeScheme: string, lineLength: number): Poem {
        const title = this.generateTitle();
        const body = this.generateBody();
        return {title, body};
    }

    generateBody(): string[] {
        return ["baz"];
    }

    generateTitle(): string {
        return "foobar";
    }
}
