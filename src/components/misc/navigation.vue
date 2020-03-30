<template>
  <div class="navigation"
       :class="{
         'navigation--open': isOpen
       }">
    <div class="navigation__menu" @click="isOpen = true">
      <img src="../../assets/images/menu.png"/>
    </div>
    <div class="navitation__panel">
      <div class="navitation__panel-close"  @click="isOpen = false">
        <img src="../../assets/images/menu.png"/>
      </div>
      <template v-if="user">
        <router-link class="navigation__link" :to="{ name: PAGES.CIRCLE }">
          O Meu circulo</router-link>
        <router-link class="navigation__link" :to="{ name: PAGES.EDIT }">Editar Estado</router-link>
        <router-link class="navigation__link" :to="{ name: PAGES.ABOUT }">Sobre</router-link>
        <div @click="logout()" class="navigation__link">Sair</div>
      </template>
      <template v-else>
      <router-link class="navigation__link" :to="{ name: PAGES.ABOUT }">Sobre</router-link>
        <router-link class="navigation__link" :to="{ name: PAGES.LOGIN }">Login</router-link>
        <router-link class="navigation__link" :to="{ name: PAGES.REGISTER }">Registrar</router-link>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { PAGES } from '../../router/pages';
import ACTIONS from '../../store/types-actions';

@Component({ components: {} })
export default class MiscNavigation extends Vue {
    PAGES = PAGES;

    isOpen: boolean = false;

    get user() {
      return this.$store.state.user.user;
    }

    get pendingInvitations(): number {
      if (!this.user) return 0;
      return this.$store.state.invitations.pending.length;
    }

    logout() {
      this.$store
        .dispatch(ACTIONS.USER_LOGOUT)
        .finally(() => { this.$router.push({ name: PAGES.LOGIN }); });
    }

    @Watch('$route')
    onRouteChange() {
      this.isOpen = false;
    }
}
</script>
