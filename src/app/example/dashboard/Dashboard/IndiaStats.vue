<template>
  <div :class="$style.dashboard">
    <vue-grid>
      <vue-breadcrumb
        :items="[{ label: 'Home', href: '/' }, { label: 'India' , href: '/india/dashboard'}, { label: 'Statistics'}]"
      />
      <vue-grid-row>
        <vue-grid-item fill>
          <vue-headline level="4">{{$route.params.state}} - Breakdown</vue-headline>
          <br />
          <Query v-if="false" :query="inQuery()" v-slot="{ data, execute , fetching}">
            <vue-autocomplete
              v-if="false"
              v-model="model"
              name="states"
              id="stateahead"
              :options="mapAuto(data.states)"
              :max-options="3"
              placeholder="Type something (e.g. Uttar P)"
              @request="onRequest($event);execute($event)"
              @change="change"
            />

            <!-- <vue-data-table
              v-if="data"
              :maxRows="10"
              :header="mapHeader(data.states)"
              :data="mapRows(data.states)"
              placeholder="Search"
              @click="execute"
            />-->
            <!-- </vue-data-table> -->
          </Query>
          <home-section>
            <vue-card slot="left">
              <vue-card-header title="India Satistics" />
              <Query :query="inQuery($route.params)" v-slot="{ data, fetching }">
                <vue-card-body>
                  <vue-donut-chart
                    v-if="data"
                    stroke="4"
                    :title="data.state.name + ' Summary'"
                    :data="Object.keys(data.state.mostRecent).map(m => ({key: m, value: data.state.mostRecent[m]})).reduce((all, item) => {
                all.push({label: item.key, value: item.value });
              return all;
            }, [])"
                    unit="confirmed"
                  />
                  <vue-loader v-if="fetching" color="primary" large />
                </vue-card-body>
                <vue-card-footer v-if="false">
                  <vue-button as="router-link" color="primary" target="/india/stats" ghost>View More</vue-button>
                  <vue-button
                    as="router-link"
                    color="primary"
                    target="/india/dashboard"
                    ghost
                  >Dashboard</vue-button>
                  <!-- <vue-button @click="execute()" color="primary" ghost>load</vue-button> -->
                  <vue-button color="primary" ghost>news</vue-button>
                </vue-card-footer>
              </Query>
            </vue-card>
            <vue-accordion multiple slot="right">
              <Query :query="inQuery($route.params)" v-slot="{ data, fetching }">
                <vue-grid>
                  <vue-grid-row>
                    <vue-grid-item fill name="foo">
                      <vue-accordion-item
                        title="Refered Links"
                        :initOpen="true"
                        style="max-width:inherit"
                      >
                        <ul v-if="data" class="list-widget">
                          <li v-for="item in data.referedlink" :key="item.message">
                            <a :href="item.link" target="_blank">{{item.source}}</a>
                          </li>
                        </ul>
                        <vue-loader v-if="fetching" color="primary" large></vue-loader>
                      </vue-accordion-item>
                      <vue-accordion-item title="Helpline Numbers">
                        <ul v-if="data" class="list-widget">
                          <li v-for="item in data.helpline" :key="item.number">
                            <a :href="'tel:'+ item.number" target="_blank">{{item.number}}</a>
                          </li>
                        </ul>
                        <vue-loader v-if="fetching" color="primary" large></vue-loader>
                      </vue-accordion-item>
                      <vue-accordion-item title="Testing Labs">
                        <ul v-if="data" class="list-widget">
                          <li v-for="item in data.labs" :key="item.site">
                            <span>{{item.site}}</span>
                          </li>
                        </ul>
                        <vue-loader v-if="fetching" color="primary" large></vue-loader>
                      </vue-accordion-item>
                    </vue-grid-item>
                  </vue-grid-row>
                </vue-grid>
              </Query>
            </vue-accordion>
          </home-section>
        </vue-grid-item>
      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script lang="ts">
import VueGrid from '@components/VueGrid/VueGrid.vue';
import VueGridItem from '@components/VueGridItem/VueGridItem.vue';
import VueButton from '@components/VueButton/VueButton.vue';
import VueGridRow from '@components/VueGridRow/VueGridRow.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import VueDataTable from '@components/VueDataTable/VueDataTable.vue';
import VueAutocomplete from '@components/VueAutocomplete/VueAutocomplete.vue';
import HomeSection from '@/app/home/components/HomeSection/HomeSection.vue';
import { HttpService } from '@shared/services/HttpService/HttpService';
import VueBreadcrumb from '@components/VueBreadcrumb/VueBreadcrumb.vue';
import VueDonutChart from '@components/VueDonutChart/VueDonutChart.vue';
import VueCard from '@components/VueCard/VueCard.vue';
import VueCardHeader from '@components/VueCard/VueCardHeader/VueCardHeader.vue';
import VueCardFooter from '@components/VueCard/VueCardFooter/VueCardFooter.vue';
import VueCardBody from '@components/VueCard/VueCardBody/VueCardBody.vue';
import VueAccordion from '@components/VueAccordion/VueAccordion.vue';
import VueAccordionItem from '@components/VueAccordion/VueAccordionItem/VueAccordionItem.vue';
import VueLoader from '@components/VueLoader/VueLoader.vue';
import { Query } from 'vue-gql';

export default {
  metaInfo: {
    title: 'IndiaStats',
  },
  components: {
    VueBreadcrumb,
    VueGrid,
    VueGridItem,
    VueButton,
    VueGridRow,
    HomeSection,
    VueHeadline,
    VueDataTable,
    VueAutocomplete,
    VueCard,
    VueCardBody,
    VueCardFooter,
    VueCardHeader,
    VueAccordion,
    VueAccordionItem,
    VueDonutChart,
    VueLoader,
    Query,
  },
  data(): any {
    return {
      pending: false,
      model: { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
      header: {
        name: { title: 'name', slot: 'name' },
        confirmed: { title: 'confirmed', slot: 'confirmed' },
        deaths: { title: 'deaths', slot: 'deaths' },
        recovered: { title: 'recovered', slot: 'recovered' },
      },
    };
  },
  methods: {
    mapHeader(rows: any) {
      return Object.keys({ name: rows[0].name, ...rows[0].mostRecent }).reduce((all: any, item: any) => {
        if (!all[item]) {
          all[item] = { title: item, slot: item };
        }
        return all;
      }, {});
    },
    mapRows(rows: any) {
      return rows.map((row: any) => ({ name: row.name, ...row.mostRecent }));
    },
    mapAuto(rows: any) {
      return rows.map((row: any) => ({ label: row.name, value: row.name }));
    },
    onRequest(query: string) {
      console.log(query);
    },
    request(ev: any) {
      console.log(ev);
    },
    change(ev: any) {
      console.log(ev);
      this.model = ev;
    },
    inQuery(params: any) {
      return `{
  states(country: "India", names: []) {
    name
  }

  state(country: "India", name: "${params.state}") {
    name
    mostRecent {
      confirmed
      deaths
      recovered
    }
  }

  referedlink(country: "India", state: "${params.state}") {
    link
    source
  }

  helpline(country: "India", state: "${params.state}") {
    number
  }
  labs(country: "India", state: "${params.state}") {
    site
  }
}`;
    },

    onClick() {
      const requests = [];

      this.pending = true;

      for (let i = 0; i < 1; i++) {
        requests.push(HttpService.get('/protected'));
      }

      Promise.all(requests)
        .then(() => {
          this.pending = false;
        })
        .catch((e) => {
          console.log(e); // tslint:disable-line
          this.pending = false;
        });
    },
  },
  computed: {},
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.dashboard {
  margin-top: $nav-bar-height;
  min-height: 500px;
}
.list-widget {
  width: 375px;
  min-height: 380px;
}
</style>
