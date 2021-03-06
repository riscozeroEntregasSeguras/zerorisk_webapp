<template>
  <div id="app" class="page" :class="routeClass">
    <misc-loading v-if="masterLoading"/>
    <view-offline v-if="!isOnline"/>
    <template v-else>
      <modals-container />
      <misc-navigation/>
      <router-view />
      <design-invitations v-if="$route.name !== PAGES.INVITATIONS && invitations.length > 0"
                          :invitations="invitations"/>
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
import DesignInvitations from './components/design/invitations.vue';

@Component({
  components: {
    MiscLoading,
    MiscNavigation,
    ViewOffline,
    DesignInvitations,
  },
})
export default class App extends Vue {
  PAGES = PAGES;

  /**
   * Routes can define a global class injected on the root app
   * element.
   */
  get routeClass(): undefined | string {
    if (!this.$route.meta) return '';
    return this.$route.meta.routeClass || '';
  }

  get masterLoading(): boolean {
    return this.$store.state.masterLoading;
  }

  get isOnline(): boolean {
    return this.$store.state.online;
  }

  get invitations(): number {
    return this.$store.state.invitations.pending.length;
  }

  logout() {
    this.$store.dispatch(ACTIONS.USER_LOGOUT).then(() => {
      this.$router.push({ name: PAGES.LOGIN });
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
