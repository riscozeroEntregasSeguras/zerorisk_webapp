<template>
  <div id="app" class="page" :class="pageClass">
    <misc-loading v-if="masterLoading"/>
    <view-offline v-if="!isOnline"/>
    <template v-else>
      <modals-container />
      <misc-navigation />
      <router-view />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PAGES } from './router/pages';
import ACTIONS from './store/types-actions';
import MUTATIONS from './store/types-mutations';
import { USER_STATUS } from './store/interfaces/user';
// Components
import MiscLoading from './components/misc/loading.vue';
import MiscNavigation from './components/misc/navigation.vue';
import ViewOffline from './views/offline.vue';

@Component({
  components: {
    MiscLoading,
    MiscNavigation,
    ViewOffline,
  },
})
export default class App extends Vue {
  /**
   * Routes can define a global class injected on the root app
   * element.
   */
  get routeClass(): undefined | string {
    if (!this.$route.meta) return '';
    return this.$route.meta.routeClass || '';
  }

  get userStatus(): '' | USER_STATUS {
    if (!this.$store.state.user.validSession) return '';
    if (this.$route.name !== PAGES.HOME) return '';
    return this.$store.state.user.user.status;
  }

  get pageClass(): string {
    return `${this.routeClass} page--${this.userStatus}`;
  }

  get masterLoading(): boolean {
    return this.$store.state.masterLoading;
  }

  get isOnline(): boolean {
    return this.$store.state.online;
  }

  logout() {
    this.$store.dispatch(ACTIONS.USER_LOGOUT).then(() => {
      this.$router.push({ name: PAGES.HOME });
    });
  }

  mounted() {
    this.$store.dispatch(ACTIONS.APP_STATUS);
    // @ts-ignore
    window.logout = this.logout;
    // @ts-ignore
    window.forceOffline = () => {
      this.$store.commit(MUTATIONS.GLOBAL_SET_API_OFFLINE);
    };
  }
}
</script>
<style lang="scss" src="./styles/load.scss"></style>
