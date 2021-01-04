import type {RandomWordGenerator} from "./random.word.generator";
import randomWords from "random-words";

export const generateRandomWord: RandomWordGenerator = () => randomWords();
