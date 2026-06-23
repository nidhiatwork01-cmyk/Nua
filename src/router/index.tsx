import { createBrowserRouter } from 'react-router-dom';
import ProductListing from '../pages/ProductListing';
import ProductDetails from '../pages/ProductDetails';
import OurStory from '../pages/OurStory';
import Wishlist from '../pages/Wishlist';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductListing />
  },
  {
    path: '/shop',
    element: <ProductListing />
  },
  {
    path: '/product/:id',
    element: <ProductDetails />
  },
  {
    path: '/our-story',
    element: <OurStory />
  },
  {
    path: '/wishlist',
    element: <Wishlist />
  },
  {
    path: '*',
    element: <ProductListing /> // Fallback
  }
]);
