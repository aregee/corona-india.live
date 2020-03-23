import { RouteConfig } from 'vue-router/types/router';

export const DashboardRoutes: RouteConfig[] = [
  {
    path: '/example/dashboard',
    name: 'dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ './Dashboard/Dashboard.vue').then((m: any) => m.default),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/india/stats/:state',
    name: 'indiastats',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ './Dashboard/IndiaStats.vue').then((m: any) => m.default),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/india/dashboard',
    name: 'indiadashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ './Dashboard/IndiaDash.vue').then((m: any) => m.default),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/world/dashboard',
    name: 'worlddashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ './Dashboard/Dashboard.vue').then((m: any) => m.default),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/summary/stats/:country',
    name: 'countrystats',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ './Dashboard/CountryStats.vue').then((m: any) => m.default),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/world/stats',
    name: 'worldstats',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ './Dashboard/WorldStats.vue').then((m: any) => m.default),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/world/news',
    name: 'worldnews',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ './Dashboard/Dashboard.vue').then((m: any) => m.default),
    meta: {
      requiresAuth: false,
    },
  },
];
