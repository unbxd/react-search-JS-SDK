import { createContext } from 'react';

const SpellCheck = createContext();

const SpellCheckContextProvider = SpellCheck.Provider;
const SpellCheckContextConsumer = SpellCheck.Consumer;

export { SpellCheckContextProvider, SpellCheckContextConsumer }
export default SpellCheck;
