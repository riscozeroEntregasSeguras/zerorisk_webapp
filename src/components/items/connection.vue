<template>
  <div class="person" :class="`person--${connection.status}`">
    <div class="person__avatar">
      <img src="../../assets/avatar.webp"/>
    </div>
    <div class="person__info">
      <p class="person__info-name">{{ connection.name }}</p>
      <p class="person__info-nickname">{{ connection.nickname }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CIRCLE_USER from '../../store/interfaces/circle';
// COMPONENTS

@Component({})
export default class ItemCircle extends Vue {
  @Prop({ required: true }) connection!: CIRCLE_USER
}
</script>
