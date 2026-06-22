import { createBrowserRouter } from 'react-router-dom';
import ProductListing from '../pages/ProductListing';
import ProductDetails from '../pages/ProductDetails';
import Journal from '../pages/Journal';
import OurStory from '../pages/OurStory';

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
    path: '/journal',
    element: <Journal />
  },
  {
    path: '/our-story',
    element: <OurStory />
  },
  {
    path: '*',
    element: <ProductListing /> // Fallback
  }
]);
