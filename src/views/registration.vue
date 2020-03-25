<template>
  <div class="page__content">
    <div class="card">
        <form class="form"
              @submit.prevent="register()">
          <h2 class="form__title">Registar na plataforma</h2>
          <div class="form__group">
            <label class="form__group-label">Email</label>
            <input class="input"
                   type="email"
                   v-model="email"/>
          </div>
          <div class="form__group">
            <label class="form__group-label">Nome - Família</label>
            <input class="input"
                   type="text"
                   v-model="name"/>
          </div>
          <div class="form__group">
            <label class="form__group-label">Alcunha - Amigos</label>
            <input class="input"
                   type="text"
                   v-model="nickname"/>
          </div>
          <div class="form__group">
            <label class="form__group-label">Password</label>
            <input class="input"
                   type="password"
                   v-model="password"/>
          </div>
          <div class="form__group">
            <label class="form__group-label">Confirmar Password</label>
            <input class="input"
                   type="password"
                   v-model="passwordConfirm"/>
          </div>
          <div v-if="errorMessage"
               class="notice notice--error">
            <p>{{errorMessage}}</p>
          </div>
          <button type="submit"
                  class="button button--fullwitdh">Registar</button>
        </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PAGES } from '../router/pages';
import ROUTER_QUERIES from '../router/queries';
import ACTIONS from '../store/types-actions';
import MUTATIONS from '../store/types-mutations';
// Components
import SelectorState from '../components/selector/state.vue';
import SelectorLocation from '../components/selector/location.vue';

@Component({
  components: { SelectorState, SelectorLocation },
})
export default class ViewRegister extends Vue {
  email: string = 'test_1@gmail.com';

  name: string = 'Nome Familia';

  nickname: string = 'Pipo';

  password: string = '12345678';

  passwordConfirm: string = '12345678';

  errorMessage: string = '';

  register(): void {
    this.errorMessage = '';
    const inputs = {
      email: this.email,
      name: this.name,
      nickname: this.nickname,
      password: this.password,
    };

    if (this.password !== this.passwordConfirm) {
      this.errorMessage = 'As password não coincidem';
      return;
    }

    console.log({ inputs });
    this.$store.commit(MUTATIONS.GLOBAL_MASTER_LOADING_START);
    this.$store
      .dispatch(ACTIONS.USER_REGISTER, inputs)
      .then(() => {
        this.$router.push({
          name: PAGES.LOGIN,
          query: { [ROUTER_QUERIES.FILL_USER]: this.email },
        });
      })
      .catch((error) => {
        this.errorMessage = error.error.message;
      })
      .finally(() => { this.$store.commit(MUTATIONS.GLOBAL_MASTER_LOADING_END); });
  }
}
</script>
