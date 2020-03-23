<template>
  <div class="location">
    <h3 class="location__title">Onde é que eu estou?</h3>
    <div class="location__option">
      <button class="button location__option-button"
              :class="{ 'button--active': userLocation === USER_LOCATION.EM_TRANSITO }"
              @click="changeLocation(USER_LOCATION.EM_TRANSITO)">
        <font-awesome-icon :icon="['fas', 'car']" />
        em transito
      </button>
    </div>
    <div class="location__option">
      <button class="button location__option-button"
              :class="{ 'button--active': userLocation === USER_LOCATION.ISOLAMENTO_EM_CASA }"
              @click="changeLocation(USER_LOCATION.ISOLAMENTO_EM_CASA)">
        <font-awesome-icon :icon="['fas', 'home']" />
        em casa
      </button>
    </div>
    <div class="location__option">
      <button class="button location__option-button"
              :class="{
                'button--active': userLocation === USER_LOCATION.ISOLAMENTO_NO_ESTRANGEIRO
              }"
              @click="changeLocation(USER_LOCATION.ISOLAMENTO_NO_ESTRANGEIRO)">
        <font-awesome-icon :icon="['fas', 'plane']" />
        no estrangeiro
      </button>
    </div>
    <div class="location__option">
      <button class="button location__option-button"
              :class="{ 'button--active': userLocation === USER_LOCATION.HOSPITALIZADO }"
              @click="changeLocation(USER_LOCATION.HOSPITALIZADO)">
        <font-awesome-icon :icon="['fas', 'hospital']" />
        hospitalizado
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { USER_LOCATION } from '../../store/interfaces/user';
import ACTIONS from '../../store/types-actions';

@Component({ components: {} })
export default class SelectorLocation extends Vue {
  USER_LOCATION = USER_LOCATION;

  get userLocation(): string | null {
    if (!this.$store.state.user.user) return null;
    return this.$store.state.user.user.location;
  }

  changeLocation(location: USER_LOCATION): void {
    this.$store.dispatch(ACTIONS.USER_CHANGE_LOCATION, { location });
  }
}
</script>
