import { ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/Layout/RootLayout';
import Home from './pages/Home';
import Members from './pages/Members';
import Topics from './pages/Topics';
import Pins from './pages/Pins';

interface RouteElement {
  path: string;
  element: ReactNode;
  children?: RouteElement[];
}

const routes: RouteElement[] = [
  {
    path: '/admin',
    element: <RootLayout />,
    children: [
      {
        path: '/admin',
        element: <Home />
      },
      {
        path: '/admin/members',
        element: <Members />
      },
      {
        path: '/admin/topics',
        element: <Topics />
      },
      {
        path: '/admin/pins',
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
