<template>
  <div :class="$style.dashboard">
    <vue-grid>
      <vue-breadcrumb :items="[{ label: 'Home', href: '/' }, { label: 'India' }]" />
      <vue-grid-row>
        <vue-grid-item fill>
          <vue-headline level="4">India - State Wise Data</vue-headline>
          <br/>
          <Query :query="inQuery()" v-slot="{ data, execute }">
            <vue-data-table
              v-if="data"
              :maxRows="10"
              :header="mapHeader(data.states)"
              :data="mapRows(data.states)"
              placeholder="Search"
              @click="execute"
            >
            <template v-slot:name="{ cell }">
              <vue-button as="router-link" :target="'/india/stats/' + cell.value" ghost>{{cell.value}}</vue-button>
            </template>
            </vue-data-table>
          </Query>
          <br />
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
import HomeSection from '@/app/home/components/HomeSection/HomeSection.vue';
import { HttpService } from '@shared/services/HttpService/HttpService';
import VueBreadcrumb from '@components/VueBreadcrumb/VueBreadcrumb.vue';
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
    Query,
  },
  data(): any {
    return {
      pending: false,
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
      return Object.keys({ name: rows[0].name, ...rows[0].mostRecent}).reduce((all:any, item:any) => {
            if(!all[item]) {
              if (['name', 'confirmed'].includes(item)) {
                all[item] = { title: item, slot: item };
              } else {
                all[item] = { title: item, slot: item , visible: false};
              }
            }
          return all;
      }, {});
    },
    mapRows(rows: any) {
      return rows.map((row: any) => ({ name: row.name, ...row.mostRecent }));
    },
    inQuery() {
      return `{states(country: "India", names: []){ name, mostRecent { confirmed, deaths, recovered, growthRate}}}`;
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
</style>
