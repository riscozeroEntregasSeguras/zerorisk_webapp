<template>
  <div class="virus"
       :class="{
         'virus--small': isSmall,
       }">
    <design-virus-green v-if="activeStatus === USER_STATUS.ESTOU_BEM" />
    <design-virus-yellow v-else-if="activeStatus === USER_STATUS.EU_QUARENTENA" />
    <design-virus-orange v-else-if="activeStatus === USER_STATUS.COM_CONVID_SEM_SINTOMAS" />
    <design-virus-red v-else-if="activeStatus === USER_STATUS.COM_CONVID_DOENTE" />
    <design-virus-green v-else-if="activeStatus === USER_STATUS.RECUPERADO" />
    <design-virus-red v-else/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { USER_STATUS } from '../../store/interfaces/user';
// Components
import DesignVirusRed from './virusRed.vue';
import DesignVirusGreen from './virusGreen.vue';
import DesignVirusYellow from './virusYellow.vue';
import DesignVirusOrange from './virusOrange.vue';

@Component({
  components: {
    DesignVirusRed,
    DesignVirusGreen,
    DesignVirusYellow,
    DesignVirusOrange,
  },
})
export default class DesignVirus extends Vue {
  @Prop({ required: false, default: false }) isSmall!: boolean;

  @Prop({ required: false, default: false }) status!: USER_STATUS;

  USER_STATUS = USER_STATUS;

  defaultStatus = this.USER_STATUS.COM_CONVID_DOENTE;

  get userStatus(): USER_STATUS {
    if (!this.$store.state.user.user) return this.defaultStatus;
    return this.$store.state.user.user.status;
  }

  get activeStatus(): USER_STATUS {
    if (!this.status) return this.userStatus;
    return this.status;
  }
}
</script>
