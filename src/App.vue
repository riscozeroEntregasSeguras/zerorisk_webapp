<template>
  <div id="app" class="page" :class="routeClass">
    <modals-container/>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PAGES from './router/pages';
// Components
import ACTIONS from './store/types-actions';

@Component({})
export default class App extends Vue {
  /**
   * Routes can define a global class injected on the root app
   * element.
   */
  get routeClass(): undefined | string {
    if (!this.$route.meta) return undefined;
    return this.$route.meta.routeClass;
  }

  logout() {
    this.$store.dispatch(ACTIONS.USER_LOGOUT).then(() => {
      this.$router.push({ name: PAGES.HOME });
    });
  }

  mounted() {
    // @ts-ignore
    window.logout = this.logout;
  }
}
</script>
<style lang="scss" src="./styles/load.scss"></style>
