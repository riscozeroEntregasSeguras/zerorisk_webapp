<template>
  <div class="page__content">
    <design-virus :isSmall="true"/>
    <design-add/>
    <items-circle :circle="circle"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PAGES } from '../router/pages';
import ACTIONS from '../store/types-actions';
import MUTATIONS from '../store/types-mutations';
import CIRCLE_USER from '../store/interfaces/circle';
// Components
import DesignVirus from '../components/design/virus.vue';
import DesignAdd from '../components/design/add.vue';
import ItemsCircle from '../components/items/circle.vue';

@Component({
  components: {
    DesignVirus,
    DesignAdd,
    ItemsCircle,
  },
})
export default class ViewCircle extends Vue {
  get circle(): CIRCLE_USER[] {
    return this.$store.state.circle.circle;
  }

  mounted(): void {
    this.$store.dispatch(ACTIONS.CIRCLE_LOAD);
  }
}
</script>
