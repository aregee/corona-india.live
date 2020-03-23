<template>
  <div>
    <stage :disable-particles="disableParticles" />
    <home-section>
      <vue-card slot="right">
        <vue-card-header title="India Satistics" />
        <Query :query="inQuery()" v-slot="{ data, fetching }">
          <vue-card-body>
            <vue-donut-chart
              v-if="data"
              stroke="4"
              :title="data.country.name + ' Summary'"
              :data="Object.keys(data.country.mostRecent).map(m => ({key: m, value: data.country.mostRecent[m]})).reduce((all, item) => {
                all.push({label: item.key, value: item.value });
              return all;
            }, [])"
              unit="patients"
            />
            <vue-loader v-if="fetching" color="primary" large />
          </vue-card-body>
          <vue-card-footer v-if="data">
            <vue-button as="router-link" color="primary" target="/india/dashboard" ghost>View More</vue-button>
            <vue-button color="primary" ghost>news</vue-button>
          </vue-card-footer>
        </Query>
      </vue-card>
      <vue-card slot="left">
        <vue-card-header title="World Satistics" />
        <Query
          query="{ summary{
              confirmed,
              deaths,
              recovered } }"
          v-slot="{ data, fetching}"
        >
          <vue-card-body>
            <vue-donut-chart
              v-if="data"
              stroke="4"
              title="World Summary"
              :data="Object.keys(data.summary).map(m => ({key: m, value: data.summary[m]})).reduce((all, item) => {
                    all.push({label: item.key, value: item.value });
                    return all;
                    }, [])"
              unit="patients"
            />
            <vue-loader v-if="fetching" color="primary" large />
          </vue-card-body>
          <vue-card-footer v-if="data">
            <vue-button as="router-link" color="primary" target="/world/stats" ghost>View More</vue-button>
            <vue-button as="router-link" color="primary" target="/world/dashboard" ghost>Dashboard</vue-button>
            <vue-button color="primary" ghost>news</vue-button>
          </vue-card-footer>
        </Query>
      </vue-card>
    </home-section>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import Stage from '../components/Stage/Stage.vue';
import HomeSection from '@/app/home/components/HomeSection/HomeSection.vue';
import { IState } from '@/app/state';
import VueGrid from '@components/VueGrid/VueGrid.vue';
import VueGridRow from '@components/VueGridRow/VueGridRow.vue';
import VueGridItem from '@components/VueGridItem/VueGridItem.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import VueTabGroup from '@components/VueTabGroup/VueTabGroup.vue';
import VueDonutChart from '@components/VueDonutChart/VueDonutChart.vue';
import VueCard from '@components/VueCard/VueCard.vue';
import VueCardHeader from '@components/VueCard/VueCardHeader/VueCardHeader.vue';
import VueCardFooter from '@components/VueCard/VueCardFooter/VueCardFooter.vue';
import VueCardBody from '@components/VueCard/VueCardBody/VueCardBody.vue';
import VueButton from '@components/VueButton/VueButton.vue';
import VueAccordion from '@components/VueAccordion/VueAccordion.vue';
import VueAccordionItem from '@components/VueAccordion/VueAccordionItem/VueAccordionItem.vue';
import VueTabItem from '@components/VueTabGroup/VueTabItem/VueTabItem.vue';
import VueLoader from '@components/VueLoader/VueLoader.vue';
import { Query } from 'vue-gql';

export default {
  metaInfo: {
    title: 'vuesion - flexible, scalable, opinionated, fast',
    meta: [
      {
        name: 'description',
        content:
          'vuesion - The most complete boilerplate for production-ready PWAs. With focus on performance, development speed, and best practices',
      },
      {
        name: 'robots',
        content: 'INDEX,FOLLOW',
      },
      {
        name: 'keywords',
        content: 'vue.js, vuex, vuex-persist, seo, server-side-rendering, isomorphic, progressive-web-app',
      },

      { name: 'og:url', content: 'https://vuesion.herokuapp.com/' },
      { name: 'og:site_name', content: 'vuesion' },
      { name: 'og:type', content: 'website' },
      { name: 'og:locale', content: 'en' },
      {
        name: 'og:title',
        content:
          'vuesion - The most complete boilerplate for production-ready PWAs. With focus on performance, development speed, and best practices',
      },
      {
        name: 'og:description',
        content:
          'vuesion - The most complete boilerplate for production-ready PWAs. With focus on performance, development speed, and best practices',
      },
      { name: 'og:image:url', content: 'https://vuesion.herokuapp.com/logo.png' },

      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@vuesion1' },
      { name: 'twitter:creator', content: '@vuesion1' },
      {
        name: 'twitter:title',
        content:
          'vuesion - The most complete boilerplate for production-ready PWAs. With focus on performance, development speed, and best practices',
      },
      { name: 'twitter:url', content: 'https://vuesion.herokuapp.com/' },
      { name: 'twitter:image', content: 'https://vuesion.herokuapp.com/logo.png' },
      {
        name: 'twitter:description',
        content:
          'vuesion - The most complete boilerplate for production-ready PWAs. With focus on performance, development speed, and best practices',
      },
    ],
  },
  components: {
    VueHeadline,
    HomeSection,
    VueTabGroup,
    VueTabItem,
    VueDonutChart,
    VueCard,
    VueCardBody,
    VueCardFooter,
    VueCardHeader,
    VueGrid,
    VueGridItem,
    VueGridRow,
    VueAccordion,
    VueAccordionItem,
    VueButton,
    VueLoader,
    Query,
    Stage,
  },
  methods: {
    inQuery() {
      return "{country(name: \"India\") { name, mostRecent { confirmed, deaths, recovered}}}";
    },
  },
  computed: {
    ...mapState({
      disableParticles: (state: IState) =>
        (state.app.config && state.app.config.features && state.app.config.features.disableParticles) || false,
    }),
  },
};
</script>
