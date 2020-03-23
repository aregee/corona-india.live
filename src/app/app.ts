import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VeeValidate from 'vee-validate';
import 'cross-fetch/polyfill';
import { Store } from 'vuex';
import { sync } from 'vuex-router-sync';
import { VueRouter } from 'vue-router/types/router';
import App from './app/App/App.vue';
import { store } from './store';
import { router } from './router';
import { IState } from './state';
import { i18n } from '@shared/plugins/i18n/i18n';
import { HttpService } from '@shared/services/HttpService/HttpService';
import './shared/directives';

import { createClient, withProvider } from 'vue-gql';
// curl 'https://covid19-graphql.now.sh/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://covid19-graphql.now.sh' --data-binary '{"query":"# Write your query or mutation here\nquery {\n  # time series data\n  results (countries: [], date: { lt: \"3/10/2020\" }) {\n    country {\n      name\n    }\n    date\n    confirmed\n    deaths\n    recovered\n    growthRate\n  }\n\n  # by country\n  country(name: \"India\") {\n    name\n    mostRecent {\n      date(format: \"yyyy-MM-dd\")\n      confirmed\n    }\n  }\n}"}' --compressed
const location = 'https://covid-tracker-news-graphql.aregee.now.sh/'; // (window as any).location;
const client = createClient({
  url: `${location}`, // Your endpoint
});

Vue.use(VeeValidate, { inject: false, delay: 1 });

export interface IApp {
  app: Vue;
  router: VueRouter;
  store: Store<IState>;
  i18n: VueI18n;
}

export const createApp = (): IApp => {
  sync(store, router);

  HttpService.store = store;
  const AppWithClient = withProvider(App, client);

  const app: Vue = new Vue({
    router,
    store,
    i18n,
    render: (h) => h(AppWithClient),
  });

  return { app, router, store, i18n };
};
