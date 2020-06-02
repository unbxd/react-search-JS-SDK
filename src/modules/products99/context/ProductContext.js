import { createContext } from 'react';

const ProductContext = createContext();

const ProductContextProvider = ProductContext.Provider;
const ProductContextConsumer = ProductContext.Consumer;

export { ProductContextProvider, ProductContextConsumer }
export default ProductContext;
