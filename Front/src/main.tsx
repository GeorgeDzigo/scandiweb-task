import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import CartProvider from './context/CartContext';
 
const apiURL = import.meta.env.VITE_API_URL  || 'http://localhost:8000';
console.log("API URL:", apiURL);
const client = new ApolloClient({
  uri: `${apiURL}/graphql`,
  cache: new InMemoryCache(),
});

// Render your application with CartProvider wrapping it
ReactDOM.render(
  <ApolloProvider client={client}>
    <CartProvider>
      <App />
    </CartProvider>
  </ApolloProvider>,
  document.getElementById('root')
);