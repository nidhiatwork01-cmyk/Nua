import { createBrowserRouter } from 'react-router-dom';
import ProductListing from '../pages/ProductListing';
import ProductDetails from '../pages/ProductDetails';
import InfoPage from '../pages/InfoPage';

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
    element: <InfoPage title="Journal" description="Read our latest notes on holistic wellness, skincare science, and ingredient sourcing." />
  },
  {
    path: '/our-story',
    element: <InfoPage title="Our Story" description="Rooted in nature, driven by intention. Learn about our commitment to clean skincare rituals." />
  },
  {
    path: '*',
    element: <ProductListing /> // Fallback
  }
]);
