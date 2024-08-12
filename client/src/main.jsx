import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import AddRecipe from './pages/AddRecipe.jsx';
import FindIngredient from './pages/FindIngredients.jsx';
import NewRecipe from './pages/NewRecipe.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/profiles/:userId',
        element: <Profile />

      }, {
        path: '/AddRecipe',
        element: <AddRecipe />
      }, {
        path: '/FindIngredients',
        element: <FindIngredient />
      }, {
        path: '/NewRecipe',
        element: <NewRecipe />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
