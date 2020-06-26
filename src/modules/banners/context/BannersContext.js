import { createContext } from 'react';

const Banners = createContext();

const BannersContextProvider = Banners.Provider;
const BannersContextConsumer = Banners.Consumer;

export { BannersContextProvider, BannersContextConsumer }
export default Banners;
