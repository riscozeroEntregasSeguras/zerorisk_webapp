<template>
  <div class="page__content">
    <form-invitation />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PAGES } from '../router/pages';
import ACTIONS from '../store/types-actions';
import MUTATIONS from '../store/types-mutations';
// Components
import FormInvitation from '../components/forms/invitation.vue';

@Component({
  components: { FormInvitation },
})
export default class ViewCircle extends Vue {}
</script>
