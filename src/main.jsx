import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createHashRouter, RouterProvider } from 'react-router';
import ProductPage from './pages/ProductPage/ProductPage.jsx'; 
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import EditPage from './pages/EditPage/EditPage.jsx';

let router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: ProductPage,
      },
      {
        path: "/signin",
        Component: SignInPage,
      },
      {
        path: "/edit",
        Component: EditPage,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
