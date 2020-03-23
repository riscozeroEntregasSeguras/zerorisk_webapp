<template>
  <div class="state">
    <h3 class="state__title">Como é que eu estou?</h3>
    <div class="state__option">
      <button class="button button--ESTOU_BEM state__option-button"
              @click="changeStatus(USER_STATUS.ESTOU_BEM)">
        Estou Bem
      </button>
    </div>
    <div class="state__option">
      <button class="button button--EU_QUARENTENA state__option-button"
              @click="changeStatus(USER_STATUS.EU_QUARENTENA)">
        Em Quarentena
      </button>
    </div>
    <div class="state__option">
      <button class="button button--COM_CONVID_SEM_SINTOMAS state__option-button"
              @click="changeStatus(USER_STATUS.COM_CONVID_SEM_SINTOMAS)">
        Positivo SEM sintomas
      </button>
    </div>
    <div class="state__option">
      <button class="button button--COM_CONVID_DOENTE state__option-button"
              @click="changeStatus(USER_STATUS.COM_CONVID_DOENTE)">
        Positivo COM sintomas
      </button>
    </div>
    <div class="state__option">
      <button class="button button--RECUPERADO state__option-button"
              @click="changeStatus(USER_STATUS.RECUPERADO)">
        Recuperado
      </button>
    </div>
    <!-- TODO: CTA to register a beneficiary user -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { USER_STATUS } from '../../store/interfaces/user';
import ACTIONS from '../../store/types-actions';

@Component({ components: {} })
export default class SelectorState extends Vue {
  USER_STATUS = USER_STATUS;

  changeStatus(status: USER_STATUS): void {
    this.$store.dispatch(ACTIONS.USER_CHANGE_STATE, { status });
  }
}
</script>
