<template>
  <div class="circle">
    <h3 class="text__title">O teu círculo</h3>
    <div class="circle__connections">
      <items-connection v-for="connection in circle"
                        :key="connection.id"
                        :connection="connection"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CIRCLE_USER from '../../store/interfaces/circle';
// COMPONENTS
import ItemsConnection from './connection.vue';

@Component({
  components: {
    ItemsConnection,
  },
})
export default class ItemCircle extends Vue {
  @Prop({ required: true }) circle!: CIRCLE_USER[]
}
</script>
