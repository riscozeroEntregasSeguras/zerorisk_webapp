<template>
  <router-link :to="{ name: PAGES.INVITATIONS }" class="inviteCounter">
    <p class="inviteCounter__number">{{ invitations }}</p>
  </router-link>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { PAGES } from '../../router/pages';
// Components

@Component({})
export default class DesignInvitations extends Vue {
  @Prop({ required: true }) invitations!: string;

  PAGES = PAGES;
}
</script>
