<template>
  <form class="form form--slim form--center" @submit.prevent="addPersons()">
    <misc-loading v-if="isRequesting"/>
    <h3 class="text__title">O teu círculo</h3>
    <h4 class="text__subtitle">Adiciona o email dos teus amigos para saberes como estão!</h4>
    <inputs-input v-for="(newEmail, index) in addEmails"
                  :key="'add_email_' + index"
                  :value="newEmail"
                  :showPlus="index === addEmails.length - 1"
                  placeholder="Adiciona um email"
                  @input="(newValue) => { addEmails[index] = newValue }"
                  @plus="addEmails.push('')"/>
    <button class="button form__submit" type="submit">ADICIONAR</button>
  </form>
</template>
<script lang="ts">
import * as EmailValidator from 'email-validator';
import { Component, Vue } from 'vue-property-decorator';
import ACTIONS from '../../store/types-actions';
import MUTATIONS from '../../store/types-mutations';
// Components
import MiscLoading from '../misc/loading.vue';
import InputsInput from '../inputs/input.vue';

@Component({
  components: { MiscLoading, InputsInput },
})
export default class FormInvitation extends Vue {
  isRequesting: boolean = false;

  addEmails: string[] = [''];

  errorMessage: string = '';

  addPersons() {
    const emails = this.addEmails.filter(EmailValidator.validate);
    console.log(emails);
    if (!emails || emails.length === 0) return;
    this.errorMessage = '';
    this.isRequesting = true;
    this.$store
      .dispatch(ACTIONS.USER_INVITE_USERS, { emails })
      .then(() => { this.addEmails = ['']; })
      .catch((error) => { this.errorMessage = error.error.message; })
      .finally(() => { this.isRequesting = false; });
  }
}
</script>
