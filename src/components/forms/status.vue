<template>
  <form class="form form--status form--center" @submit.prevent>
    <misc-loading v-if="isRequesting"/>
    <h3 class="text__title">Como estás</h3>
    <div class="buttons">
      <button class="button button--status"
        :class="{ 'button--ESTOU_BEM': status === USER_STATUS.ESTOU_BEM }"
        @click="status = USER_STATUS.ESTOU_BEM">
        estou bem
      </button>
      <button class="button button--status"
        :class="{ 'button--EU_QUARENTENA': status === USER_STATUS.EU_QUARENTENA }"
        @click="status = USER_STATUS.EU_QUARENTENA">
        em quarentena
      </button>
      <button class="button button--status"
        :class="{
          'button--COM_CONVID_SEM_SINTOMAS': status === USER_STATUS.COM_CONVID_SEM_SINTOMAS
        }"
        @click="status = USER_STATUS.COM_CONVID_SEM_SINTOMAS">
        positivo s/sintomas
      </button>
      <button class="button button--status"
        :class="{
          'button--COM_CONVID_DOENTE':
            status === USER_STATUS.COM_CONVID_DOENTE
        }"
        @click="status = USER_STATUS.COM_CONVID_DOENTE">
        positivo c/sintomas
      </button>
      <button class="button button--status"
        :class="{ 'button--RECUPERADO': status === USER_STATUS.RECUPERADO }"
        @click="status = USER_STATUS.RECUPERADO">
        recuperado
      </button>
    </div>
    <div class="spacer-2"></div>
    <h3 class="text__title">Onde estás</h3>
    <div class="buttons">
      <button class="button button--status"
        :class="{ 'button--status--active': location === USER_LOCATION.EM_TRANSITO }"
        @click="location = USER_LOCATION.EM_TRANSITO">
        no trabalho
      </button>
      <button class="button button--status"
        :class="{ 'button--status--active': location === USER_LOCATION.ISOLAMENTO_EM_CASA }"
        @click="location = USER_LOCATION.ISOLAMENTO_EM_CASA">
        em casa
      </button>
      <button class="button button--status"
        :class="{ 'button--status--active': location === USER_LOCATION.ISOLAMENTO_NO_ESTRANGEIRO }"
        @click="location = USER_LOCATION.ISOLAMENTO_NO_ESTRANGEIRO">
        no estrangeiro
      </button>
      <button class="button button--status"
        :class="{ 'button--status--active': location === USER_LOCATION.HOSPITALIZADO }"
        @click="location = USER_LOCATION.HOSPITALIZADO">
        hospitalizado
      </button>
    </div>
    <button v-if="hasChanges"
            class="button form__submit"
            type="submit"
            @click="saveStatus()">GUARDAR ESTADO</button>
  </form>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ACTIONS from '../../store/types-actions';
import MUTATIONS from '../../store/types-mutations';
// Components
import MiscLoading from '../misc/loading.vue';
import { USER, USER_STATUS, USER_LOCATION } from '../../store/interfaces/user';

@Component({
  components: { MiscLoading },
})
export default class FormStatus extends Vue {
  USER_STATUS = USER_STATUS;

  USER_LOCATION = USER_LOCATION;

  isRequesting: boolean = false;

  errorMessage: string = '';

  status: USER_STATUS = USER_STATUS.ESTOU_BEM;

  location: USER_LOCATION = USER_LOCATION.EM_TRANSITO;

  @Watch('status', { immediate: true })
  onStatusChange(newStatus: USER_STATUS): void {
    this.$emit('statusChange', newStatus);
  }

  get user(): USER {
    return this.$store.state.user.user;
  }

  get hasChanges(): boolean {
    if (!this.user) return false;
    if (this.status !== this.user.status) return true;
    if (this.location !== this.user.location) return true;
    return false;
  }

  cloneValues() {
    this.status = this.user.status;
    this.location = this.user.location;
  }

  mounted() {
    this.cloneValues();
  }

  saveStatus() {
    if (!this.hasChanges) return;
    this.isRequesting = true;

    let locationPromise: any = true;
    let statusPromise: any = true;

    if (this.status !== this.user.status) {
      statusPromise = this.$store.dispatch(ACTIONS.USER_CHANGE_STATE, {
        status: this.status,
      });
    }

    if (this.location !== this.user.location) {
      locationPromise = this.$store.dispatch(ACTIONS.USER_CHANGE_LOCATION, {
        location: this.location,
      });
    }

    Promise.all([statusPromise, locationPromise])
      .catch((error) => { this.errorMessage = error.error.message; })
      .finally(() => {
        this.isRequesting = false;
        this.cloneValues();
      });
  }
}
</script>
