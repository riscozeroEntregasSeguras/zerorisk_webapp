<template>
  <router-link :to="{ name: PAGES.INVITE }" class="add">
    <img class="add__icon" src="../../assets/images/add.png"/>
  </router-link>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { PAGES } from '../../router/pages';
// Components

@Component({})
export default class DesignAdd extends Vue {
  @Prop({ required: false, default: false }) isSmall!: boolean;

  PAGES = PAGES;
}
</script>
