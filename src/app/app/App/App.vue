<template>
  <div id="app" :class="$style.app">
    <vue-notification-stack />

    <vue-navigation-progress :is-navigating="isNavigating" />

    <vue-nav-bar style="background: #ececee">
      <nav slot="right">
        <span>Covid-19</span>
        <img src="logo.png" alt="" width="30px" style="vertical-align:middle">
        <!-- <ul>
        <li><vue-button as="router-link" color="default" target="/world-stats" ghost>World</vue-button></li>
        <li>
        <vue-button as="router-link" color="default" target="/india-stats" ghost>Anchor</vue-button>
        <ul class="dropdown">
          <vue-button as="router-link" color="default" target="/example/dashboard" ghost>Overview</vue-button>
        </ul>
      </li>
      </ul> -->
      </nav>
    </vue-nav-bar>

    <router-view :class="$style.content" />

    <vue-footer />

    <vue-cookie-consent
      current-version="1.0.0"
      :cookie-consent-version="cookieConsentVersion"
      :set-cookie-consent-version="setCookieConsentVersion"
    >
      This is a cookie consent component which shows the cookie consent every time you change the version of the
      consent.
    </vue-cookie-consent>

    <vue-sidebar>
      <vue-sidebar-group title="Languages">
        <vue-sidebar-group-item>
          <vue-select name="lang" id="lang" :options="languages" @input="localeSwitch" :value="getLocale" />
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group title="World">
        <vue-sidebar-group-item to="/world/Dashboard">
          <vue-icon-globe />
          World Dashboard
        </vue-sidebar-group-item>

        <vue-sidebar-group-item :to="{ name: 'worldstats' }">
          <vue-icon-barchart />
          Statistics
        </vue-sidebar-group-item>

        <vue-sidebar-group-item>
          <vue-icon-headlines />
          Recent News
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group title="India">
        <vue-sidebar-group-item to="/india/dashboard">
          <vue-icon-globe />
          India Dashboard
        </vue-sidebar-group-item>

        <vue-sidebar-group-item :to="{ name: 'indiastats' ,  params: {state: 'Maharashtra'} }">
          <vue-icon-barchart />
          Statistics
        </vue-sidebar-group-item>

        <vue-sidebar-group-item>
          <vue-icon-headlines />
          Recent News
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group title="Community">
        <vue-sidebar-group-item>
          <a href="https://github.com/aregee" target="_blank" rel="noopener">
            <vue-icon-github />
            Github
          </a>
        </vue-sidebar-group-item>

        <vue-sidebar-group-item>
          <a href="https://twitter.com/iamaregee" target="_blank" rel="noopener">
            <vue-icon-twitter-square />
            Twitter
          </a>
        </vue-sidebar-group-item>
      </vue-sidebar-group>
    </vue-sidebar>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import { loadLocaleAsync } from '@shared/plugins/i18n/i18n';
import '@shared/designSystem/global.scss';
import VueNavBar from '@components/VueNavBar/VueNavBar.vue';
import VueGrid from '@components/VueGrid/VueGrid.vue';
import VueGridItem from '@components/VueGridItem/VueGridItem.vue';
import VueFooter from '@components/VueFooter/VueFooter.vue';
import VueNotificationStack from '@components/VueNotificationStack/VueNotificationStack.vue';
import VueCookieConsent from '@components/VueCookieConsent/VueCookieConsent.vue';
import VueNavigationProgress from '@components/VueNavigationProgress/VueNavigationProgress.vue';
import VueSidebar from '@components/VueSidebar/VueSidebar.vue';
import VueSidebarGroup from '@components/VueSidebar/VueSidebarGroup/VueSidebarGroup.vue';
import VueSidebarGroupItem from '@components/VueSidebar/VueSidebarGroupItem/VueSidebarGroupItem.vue';
import VueIconGlobe from '@components/icons/VueIconGlobe/VueIconGlobe.vue';
import VueIconBarchart from '@components/icons/VueIconBarchart/VueIconBarchart.vue';
import VueIconHeadlines from '@components/icons/VueIconHeadlines/VueIconHeadlines.vue';
import VueIconGithub from '@components/icons/VueIconGithub/VueIconGithub.vue';
import VueIconTwitterSquare from '@components/icons/VueIconTwitterSquare/VueIconTwitterSquare.vue';
import VueSelect from '@components/VueSelect/VueSelect.vue';
import VueIconPuzzlePiece from '@components/icons/VueIconPuzzlePiece/VueIconPuzzlePiece.vue';
import VueButton from '@components/VueButton/VueButton.vue';
import VueDropdownMenu from '@components/VueDropdownMenu/VueDropdownMenu.vue';
import VueModal from '@components/VueModal/VueModal.vue';
import LoginForm from '@shared/modules/auth/LoginForm/LoginForm.vue';
import { addNotification } from '@components/VueNotificationStack/utils';

export default {
  name: 'App',
  components: {
    LoginForm,
    VueModal,
    VueButton,
    VueIconPuzzlePiece,
    VueSelect,
    VueIconTwitterSquare,
    VueIconGithub,
    VueIconGlobe,
    VueIconHeadlines,
    VueIconBarchart,
    VueSidebarGroupItem,
    VueSidebarGroup,
    VueSidebar,
    VueNavigationProgress,
    VueCookieConsent,
    VueNavBar,
    VueGrid,
    VueGridItem,
    VueFooter,
    VueNotificationStack,
    VueDropdownMenu,
  },
  data(): any {
    return {
      isNavigating: false,
      languages: [
        { label: 'English', value: 'en' },
        { label: 'Deutsch', value: 'de' },
        { label: 'Português', value: 'pt' },
        { label: '中文', value: 'zh-cn' },
      ],
      showLoginModal: false,
      isLoginPending: false,
    };
  },
  computed: {
    ...mapGetters('app', ['cookieConsentVersion', 'getLocale']),
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('app', ['changeLocale', 'setCookieConsentVersion']),
    ...mapActions('auth', ['createToken', 'revokeToken']),
    localeSwitch(locale: string) {
      loadLocaleAsync(locale).catch((error: Error) => console.log(error)); // tslint:disable-line

      this.changeLocale(locale);
    },
    initProgressBar() {
      this.$router.beforeEach((to: any, from: any, next: any) => {
        this.isNavigating = true;
        next();
      });
      this.$router.afterEach(() => {
        this.isNavigating = false;
      });
    },
    async onLoginSubmit(formData: any) {
      this.isLoginPending = true;

      try {
        await this.createToken(formData);

        this.$router.push({ name: 'dashboard' });
      } catch (e) {
        addNotification({ title: 'Error during login', text: 'Please try again!' });
      }

      this.isLoginPending = false;
      this.showLoginModal = false;
    },
    async onLogout() {
      this.isLoginPending = true;

      await this.revokeToken();

      this.$router.push('/');

      this.isLoginPending = false;
      this.showLoginModal = false;
    },
  },
  created() {
    this.initProgressBar();
  },
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';
@import '~@/app/shared/designSystem/reset';
@import '~@/app/shared/designSystem/typo';

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.logo {
  position: relative;
  top: $space-4;
  width: $space-24;
  height: $space-24;
}
nav {
  ul {
  background: $brand-primary;
  list-style: none;
  // margin: 0;
  // color: #fff;
  // padding-left: 0;
}

li {
    // color: black;
    // background: $brand-primary;
    display: block;
    float: left;
    // padding: 1rem;
    position: relative;
    text-decoration: none;
    transition-duration: 0.5s;
}
  
li a {
  color: black;
}

li:hover {
  background: $brand-primary;
  cursor: pointer;
}

ul li ul {
  background: $brand-primary;
  visibility: hidden;
  // color: black;
  opacity: 0;
  // min-width: 5rem;
  position: absolute;
  transition: all 0.5s ease;
  // margin-top: 1rem;
  // left: 0;
  display: none;
}

ul li:hover > ul,
ul li ul:hover {
  visibility: visible;
  opacity: 1;
  display: block;
}

ul li ul li {
  clear: both;
  width: 100%;
}
}
</style>
