import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { CartProvider } from './stores/CartContext';
import { WishlistProvider } from './stores/WishlistContext';

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
