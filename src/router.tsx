import { ComponentType } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/Layout/RootLayout';

interface RouteElement {
  path: string;
  component: ComponentType;
  children?: RouteElement[];
}

const routes: RouteElement[] = [
  {
    path: '/',
    component: RootLayout,
    children: [
      {
        path: '/',
        component: () => <div>Home</div>
      },
      {
        path: '/member',
        component: () => <div>Member</div>
      },
      {
        path: '/topic',
        component: () => <div>Topic</div>
      },
      {
        path: '/pin',
        component: () => <div>Pin</div>
      }
    ]
  }
];

const router = createBrowserRouter(
  routes.map((route) => {
    const childrenRoutes = route.children?.map((childRoute) => ({
      path: childRoute.path,
      element: <childRoute.component />
    }));

    return {
      path: route.path,
      element: <route.component />,
      children: childrenRoutes
    };
  })
);

export default router;
