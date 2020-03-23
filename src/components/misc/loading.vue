<template>
  <div class="loading">
    <div class="loading__animation">
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ components: {} })
export default class MiscLoading extends Vue {}
</script>
