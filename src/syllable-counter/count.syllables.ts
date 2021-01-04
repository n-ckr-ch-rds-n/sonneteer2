import type {SyllableCounter} from "./syllable.counter";
import syllable from "syllable";

export const countSyllables: SyllableCounter = (line) => syllable(line);
