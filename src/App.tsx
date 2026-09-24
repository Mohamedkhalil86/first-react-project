import { createBrowserRouter, RouterProvider } from 'react-router';

import Home from './pages/الرئيسية/Home';

import Blogs from './pages/المدونة/Blogs';
import Who from './pages/من نحن/Who';
import Layout from './Componant/layout/Layout';

import ArticleDetails from './Componant/Ditals/Ditals';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "blogs", element: <Blogs /> },
      { path: "who", element: <Who /> },
      { path: "blogs/:slug", element: <ArticleDetails /> },
      { path: "Privacy", element: <Privacy /> },
      { path: "Terms", element: <Terms /> }
      
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}