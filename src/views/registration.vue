<template>
  <div class="page__content">
    <div class="page__content">
      <design-virus :isSmall="true"/>
      <form class="form form--center form--slim"
            @submit.prevent="register()">
        <inputs-input label="Email"
                      :value="email"
                      @input="(newValue) => { email = newValue }"/>
        <inputs-input label="Nome - Família"
                      :value="name"
                      @input="(newValue) => { name = newValue }"/>
        <inputs-input label="Alcunha - Amigos"
                      :value="nickname"
                      @input="(newValue) => { nickname = newValue }"/>
        <inputs-input label="Password"
                      type="password"
                      :value="password"
                      @input="(newValue) => { password = newValue }"/>
        <inputs-input label="Confirmar Password"
                      type="password"
                      :value="passwordConfirm"
                      @input="(newValue) => { passwordConfirm = newValue }"/>
        <button class="button form__submit" type="submit">Registrar</button>
        <router-link class="link form__link" :to="{ name: PAGES.LOGIN }">login</router-link>
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
import DesignVirus from '../components/design/virus.vue';
import InputsInput from '../components/inputs/input.vue';

@Component({
  components: { DesignVirus, InputsInput },
})
export default class ViewRegister extends Vue {
  PAGES = PAGES;

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
