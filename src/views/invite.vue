<template>
  <div class="page__content">
    <design-virus :isSmall="true"/>
    <form-invitation/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// Components
import DesignVirus from '../components/design/virus.vue';
import FormInvitation from '../components/forms/invitation.vue';

@Component({
  components: {
    DesignVirus,
    FormInvitation,
  },
})
export default class ViewInvite extends Vue {}
</script>
