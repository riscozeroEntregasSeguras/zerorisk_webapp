<template>
  <div class="page__content">
    <selector-state />
    <selector-location />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// Components
import SelectorState from '../components/selector/state.vue';
import SelectorLocation from '../components/selector/location.vue';

@Component({
  components: { SelectorState, SelectorLocation },
})
export default class ViewHome extends Vue {}
</script>
