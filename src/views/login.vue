<template>
  <div class="page__content">
    <div class="card">
        <form class="form"
              @submit.prevent="login()">
          <h2 class="form__title">Entrar</h2>
          <div class="form__group">
            <label class="form__group-label">Email</label>
            <input class="input"
                   type="email"
                   v-model="email"/>
          </div>
          <div class="form__group">
            <label class="form__group-label">Password</label>
            <input class="input"
                   type="password"
                   v-model="password"/>
          </div>
          <div v-if="errorMessage"
               class="notice notice--error">
            <p>{{errorMessage}}</p>
          </div>
          <button type="submit"
                  class="button button--fullwitdh">Entrar</button>
        </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PAGES } from '../router/pages';
import ACTIONS from '../store/types-actions';
import MUTATIONS from '../store/types-mutations';
// Components
import SelectorState from '../components/selector/state.vue';
import SelectorLocation from '../components/selector/location.vue';
import ROUTER_QUERIES from '../router/queries';

@Component({
  components: { SelectorState, SelectorLocation },
})
export default class ViewLogin extends Vue {
  email: string = 'test_1@gmail.com';

  password: string = '12345678';

  errorMessage: string = '';

  login(): void {
    const inputs = {
      email: this.email,
      password: this.password,
    };
    this.$store.commit(MUTATIONS.GLOBAL_MASTER_LOADING_START);
    this.$store
      .dispatch(ACTIONS.USER_REQUEST_TOKEN, inputs)
      .then(() => { this.$router.push({ name: PAGES.HOME }); })
      .catch((error) => { this.errorMessage = error.error.message; })
      .finally(() => { this.$store.commit(MUTATIONS.GLOBAL_MASTER_LOADING_END); });
  }

  mounted() {
    const emailFromURL = this.$route.query[ROUTER_QUERIES.FILL_USER];
    if (emailFromURL && typeof emailFromURL !== 'object') this.email = emailFromURL;
  }
}
</script>
