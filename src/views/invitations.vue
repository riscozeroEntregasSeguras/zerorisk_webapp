<template>
  <div class="page__content">
    <design-virus :isSmall="true"/>
    <div class="padding-1">
      <h2 class="text__title">Convites pendentes</h2>
      <h2 v-if="invitations.length === 0"
          class="text__subtitle">Não tem convites pendentes.</h2>
      <item-invitation v-for="invitation in invitations"
                      :key="invitation.id"
                      :invitation="invitation"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import INVITATION from '../store/interfaces/invitation';
// Components
import DesignVirus from '../components/design/virus.vue';
import ItemInvitation from '../components/items/invitation.vue';

@Component({
  components: { DesignVirus, ItemInvitation },
})
export default class ViewInvitations extends Vue {
  get invitations(): INVITATION {
    return this.$store.state.invitations.pending;
  }
}
</script>
