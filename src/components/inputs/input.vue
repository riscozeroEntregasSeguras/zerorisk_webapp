<template>
  <div class="input"
       :class="{ 'input--active': isActive }">
      <label class="input__label" v-if="label">{{label}}</label>
      <input class="input__input"
             v-model="inputValue"
             :type="type"
             :placeholder="placeholder"
             @focus="isFocus = true"
             @blur="isFocus = false"
             @change="$emit('change', $event.target.value)"
             @input="$emit('input', $event.target.value)"/>
      <div v-if="showPlus"
           class="input__add"
           @click="$emit('plus')">
        <img src="../../assets/images/add.png" class="input__add-icon"/>
      </div>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
} from 'vue-property-decorator';
// Components

@Component({})
export default class InputsInput extends Vue {
  @Prop({ required: false }) showPlus!: string;

  @Prop({ required: false }) label!: string;

  @Prop({ required: true }) value!: string | boolean;

  @Prop({ required: false, default: 'text' }) type!: string;

  @Prop({ required: false, default: '' }) placeholder!: string;

  inputValue: string | boolean = '';

  isFocus: boolean = false;

  get isActive(): boolean {
    if (!this.inputValue && !this.isFocus) return false;
    return true;
  }

  @Watch('value', { immediate: true })
  onValueChange(newValue: any) {
    if (!newValue) this.inputValue = '';
  }

  mounted() {
    this.inputValue = this.value;
  }
}
</script>
