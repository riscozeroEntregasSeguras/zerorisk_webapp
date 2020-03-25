<template>
  <div class="card">
    <misc-loading v-if="isRequesting"/>
    <form class="form"
          @submit.prevent="addPerson()">
        <h2 class="form__title">Adicionar pessoa ao meu círculo</h2>
        <div class="form__group">
        <label class="form__group-label">Email</label>
        <input class="input"
               type="email"
               v-model="addEmail"/>
        </div>
        <div v-if="errorMessage" class="notice notice--error">
          <p>{{errorMessage}}</p>
        </div>
        <button type="submit"
                class="button button--fullwitdh">Adicionar</button>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ACTIONS from '../../store/types-actions';
import MUTATIONS from '../../store/types-mutations';
// Components
import MiscLoading from '../misc/loading.vue';

@Component({
  components: { MiscLoading },
})
export default class FormInvitation extends Vue {
  isRequesting: boolean = false;

  addEmail: string = 'frjijfe@fjif.com';

  errorMessage: string = '';

  addPerson() {
    this.errorMessage = '';
    this.isRequesting = true;
    this.$store
      .dispatch(ACTIONS.USER_INVITE_USER, { email: this.addEmail })
      .catch((error) => { this.errorMessage = error.error.message; })
      .finally(() => { this.isRequesting = false; });
  }
}
</script>
