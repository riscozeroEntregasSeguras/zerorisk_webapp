<template>
  <div class="navigation">
    <div class="navigation__container">
      <div class="navigation__container-left">
          <router-link :to="{ name: PAGES.HOME }"
                        class="navigation__item">Sobre</router-link>
          <router-link :to="{ name: PAGES.HOME }"
                        class="navigation__item">Apoiar</router-link>
      </div>
      <h2 class="text__title navigation__container-title">Eu estou bem</h2>
      <div class="navigation__container-right">
        <template v-if="user">
          <router-link :to="{ name: PAGES.HOME }"
                        class="navigation__item">My Circle</router-link>
          <div class="navigation__item"
                @click="logout()">Logout</div>
        </template>
        <template v-else>
          <router-link :to="{ name: PAGES.HOME }"
                        class="navigation__item">Login</router-link>
          <router-link :to="{ name: PAGES.HOME }"
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

    logout() {
      this.$store.dispatch(ACTIONS.USER_LOGOUT);
    }
}
</script>
