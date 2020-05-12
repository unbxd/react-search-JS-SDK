import { createContext } from 'react';

const { Provider: AppContextProvider, Consumer: AppContextConsumer } = createContext();

export { AppContextProvider, AppContextConsumer };