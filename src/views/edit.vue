<template>
  <div class="page__content">
    <design-virus :isSmall="true"
                  :status="status"/>
    <form-status :isSmall="true"
                 @statusChange="(newStatus) => { status = newStatus }"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// Components
import DesignVirus from '../components/design/virus.vue';
import FormStatus from '../components/forms/status.vue';

@Component({
  components: {
    DesignVirus,
    FormStatus,
  },
})
export default class ViewEdit extends Vue {
  status: string = '';
}
</script>
