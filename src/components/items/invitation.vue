<template>
  <div class="invitation">
    <misc-loading v-if="isRequesting"/>
    <div class="invitation__data">
      <span class="invitation__data-name">{{invitation.name}}</span>
      <span class="invitation__data-email">({{invitation.email}})</span>
    </div>
    <div class="invitation__actions">
      <button class="button button-icon button--error"
              @click="reject()"
              title="recusar convite">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
      <button class="button button-icon button--success"
              @click="accept()"
              title="aceitar convite">
        <font-awesome-icon :icon="['fas', 'check']" />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import INVITATION from '../../store/interfaces/invitation';
// COMPONENTS
import MiscLoading from '../misc/loading.vue';
import ACTIONS from '../../store/types-actions';

@Component({ components: { MiscLoading } })
export default class ItemInvitation extends Vue {
  @Prop({ required: true }) invitation!: INVITATION

  isRequesting: boolean = false;

  accept(): void {
    this.isRequesting = true;
    this.$store
      .dispatch(ACTIONS.INVITATIONS_ACCEPT, { id: this.invitation.id })
      .then(() => { console.log('here'); })
      .finally(() => { this.isRequesting = false; });
  }

  reject(): void {
    this.isRequesting = true;
    this.$store
      .dispatch(ACTIONS.INVITATIONS_REJECT, { id: this.invitation.id })
      .then(() => { console.log('here'); })
      .finally(() => { this.isRequesting = false; });
  }
}
</script>
