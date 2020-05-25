import { createContext } from 'react';

const AppContext = createContext({ getSearchResults: () => { } });

const AppContextProvider = AppContext.Provider;
const AppContextConsumer = AppContext.Consumer;

export { AppContextProvider, AppContextConsumer }
export default AppContext;
