import { createContext } from 'react';

const AppContext = createContext();

const AppContextProvider = AppContext.Provider;
const AppContextConsumer = AppContext.Consumer;

export { AppContextProvider, AppContextConsumer };
export default AppContext;
