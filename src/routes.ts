import NotFound from './views/NotFound.vue';

export const routes = [
  {
    path: '/',
    meta: { title: 'Main' },
    component: () => import('./views/Main.vue'),
  },
  { path: '/:path(.*)', component: NotFound },
];
