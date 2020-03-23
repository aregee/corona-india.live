<template>
  <div :class="$style.dashboard">
    <vue-grid>
      <vue-breadcrumb :items="[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]" />
            <vue-grid-row>
        <vue-grid-item fill>
          <vue-headline level="5">2019 Novel Coronavirus Visual Dashboard</vue-headline>
           Operated by the Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE)
          <br />
          <br />
          <iframe style="height:100vh" src="https://www.arcgis.com/apps/opsdashboard/index.html#/85320e2ea5424dfaaa75ae62e5c06e61" frameborder="0" width="100%" height="800px"></iframe>
        </vue-grid-item>
        </vue-grid-row>
        <!-- <home-section> 

          <br />
        </home-section> -->
    </vue-grid>
  </div>
</template>

<script lang="ts">
import VueGrid from '@components/VueGrid/VueGrid.vue';
import VueGridItem from '@components/VueGridItem/VueGridItem.vue';
import VueButton from '@components/VueButton/VueButton.vue';
import VueGridRow from '@components/VueGridRow/VueGridRow.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import HomeSection from '@/app/home/components/HomeSection/HomeSection.vue';
import { HttpService } from '@shared/services/HttpService/HttpService';
import VueBreadcrumb from '@components/VueBreadcrumb/VueBreadcrumb.vue';

export default {
  metaInfo: {
    title: 'Dashboard',
  },
  components: {
    VueBreadcrumb,
    VueGrid,
    VueGridItem,
    VueButton,
    VueGridRow,
    HomeSection,
    VueHeadline,
  },
  data(): any {
    return { pending: false };
  },
  methods: {
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
