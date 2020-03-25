<template>
  <div class="navigation">
    <div class="navigation__container">
      <div class="navigation__container-left">
          <router-link :to="{ name: PAGES.HOME }"
                        class="navigation__item">Sobre</router-link>
          <router-link :to="{ name: PAGES.HOME }"
                        class="navigation__item">Apoiar</router-link>
          <p v-if="user">{{user.email}}</p>
      </div>
      <h2 class="text__title navigation__container-title">Eu estou bem</h2>
      <div class="navigation__container-right">
        <template v-if="user">
          <router-link :to="{ name: PAGES.INVITATIONS }"
                       class="badge">{{pendingInvitations}}</router-link>
          <router-link :to="{ name: PAGES.CIRCLE }"
                        class="navigation__item">O Meu Círculo</router-link>
          <div class="navigation__item"
                @click="logout()">Logout</div>
        </template>
        <template v-else>
          <router-link :to="{ name: PAGES.LOGIN }"
                        class="navigation__item">Login</router-link>
          <router-link :to="{ name: PAGES.REGISTER }"
                        class="navigation__item">Registar</router-link>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PAGES } from '../../router/pages';
import ACTIONS from '../../store/types-actions';

@Component({ components: {} })
export default class MiscNavigation extends Vue {
    PAGES = PAGES;

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
        .finally(() => { this.$router.push({ name: PAGES.HOME }); });
    }
}
</script>
