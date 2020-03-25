<template>
  <div class="page__content">
    <h2 class="text__title text__title--black">Convites pendentes</h2>
    <item-invitation v-for="invitation in invitations"
                     :key="invitation.id"
                     :invitation="invitation"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import INVITATION from '../store/interfaces/invitation';
// Components
import ItemInvitation from '../components/items/invitation.vue';

@Component({
  components: { ItemInvitation },
})
export default class ViewInvitations extends Vue {
  get invitations(): INVITATION {
    return this.$store.state.invitations.pending;
  }
}
</script>
