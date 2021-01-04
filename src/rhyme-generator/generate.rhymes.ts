import rhymes from "rhymes";
import type {RhymeGenerator} from "./rhyme.generator";

export const generateRhymes: RhymeGenerator = (word) => rhymes(word);
