<template>
  <div class="page__content">
    <design-virus/>
    <form class="form form--center form--slim"
          @submit.prevent="login()">
      <inputs-input label="Email"
                    :value="email"
                    @input="(newValue) => { email = newValue }"/>
      <inputs-input label="Password"
                    type="password"
                    :value="password"
                    @input="(newValue) => { password = newValue }"/>
      <button class="button form__submit" type="submit">LOGIN</button>
      <router-link class="link form__link" :to="{ name: PAGES.REGISTER }">register</router-link>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PAGES } from '../router/pages';
import ACTIONS from '../store/types-actions';
import MUTATIONS from '../store/types-mutations';
import ROUTER_QUERIES from '../router/queries';
// Components
import DesignVirus from '../components/design/virus.vue';
import InputsInput from '../components/inputs/input.vue';

@Component({
  components: {
    DesignVirus,
    InputsInput,
  },
})
export default class ViewLogin extends Vue {
  PAGES = PAGES;

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
      .then(() => { this.$router.push({ name: PAGES.CIRCLE }); })
      .catch((error) => { this.errorMessage = error.error.message; })
      .finally(() => { this.$store.commit(MUTATIONS.GLOBAL_MASTER_LOADING_END); });
  }

  mounted() {
    const emailFromURL = this.$route.query[ROUTER_QUERIES.FILL_USER];
    if (emailFromURL && typeof emailFromURL !== 'object') this.email = emailFromURL;
  }
}
</script>
