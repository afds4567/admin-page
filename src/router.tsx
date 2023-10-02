import { ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './components/Layout/RootLayout';
import Home from './pages/Home';
import Members from './pages/Member/Members';
import Pins from './pages/Pin/Pins';
import Topics from './pages/Topic/Topics';

interface RouteElement {
  path: string;
  element: ReactNode;
  children?: RouteElement[];
}

const routes: RouteElement[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/members',
        element: <Members />
      },
      {
        path: '/topics',
        element: <Topics />
      },
      {
        path: '/pins',
        element: <Pins />
      }
    ]
  }
];

const router = createBrowserRouter(
  routes.map((route) => {
    const childrenRoutes = route.children?.map((childRoute) => {
      return { path: childRoute.path, element: childRoute.element };
    });

    return { path: route.path, element: route.element, children: childrenRoutes };
  })
);

export default router;
