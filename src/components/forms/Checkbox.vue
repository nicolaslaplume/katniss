<script setup lang="ts">
  import { uniqueId } from 'lodash';
  import { LoadingContext, DisabledContext } from './context';
  import { ref, watch } from 'vue';
import type { SemanticColor } from '../types';
  const props = withDefaults(defineProps<{
    name?: string,
    label?: string,
    disabled?: boolean,
    icon?: keyof typeof icons,
    modelValue?: boolean,
    required?: boolean,
    color?: SemanticColor,
  }>(), {
    name: '',
    icon: 'check',
    label: '',
    disabled: false,
    modelValue: false,
    required: false,
    color: 'support',
  });

  
  const id = uniqueId();
  const emit = defineEmits(['update:modelValue']);

  const icons = {
    check: ['fa-regular-square', 'fa-regular-check-square'],
    bell: ['fa-bell-slash', 'fa-bell'],
    comment: ['fa-comment-slash', 'fa-comment'],
    door: ['fa-door-closed', 'fa-door-open'],
    eye: ['fa-eye-slash', 'fa-eye'],
    folder: ['fa-folder', 'fa-folder-open'],
    mic: ['fa-microphone-slash', 'fa-microphone'],
    phone: ['fa-phone-slash', 'fa-phone'],
    plane: ['fa-plane-slash', 'fa-plane'],
    toggle: ['fa-toggle-off', 'fa-toggle-on'],
    sound: ['fa-volume-off', 'fa-volume-up'],
    bookmark: ['fa-regular-bookmark', 'fa-bookmark'],
    dot: ['fa-regular-circle', 'fa-regular-dot-circle'],
    star: ['fa-regular-star', 'fa-star'],
    heart: ['fa-regular-heart', 'fa-heart'],
  };
    

  const loading = LoadingContext.inject();
  const formDisabled = DisabledContext.inject();


  const valueRef = ref(props.modelValue);
  watch(()=>props.modelValue,()=>{
    valueRef.value = props.modelValue;
  });
  const icon = ref(icons[props.icon][valueRef.value?1:0]);
  watch(valueRef, ()=>{
    icon.value = icons[props.icon][valueRef.value?1:0];
  });

  const onUpdate = ({target}: Event )=>{
    const value = (target && 'checked' in target )? target.checked as boolean : false;
    valueRef.value = !!value;
    emit('update:modelValue', value);
  };

  const name = props.name ?? id;

</script>

<template>
    <label class="checkbox no-background" :for="id" :class="{
          [`color-${props.color}`]: true,
        }">
      <input 
        :id="id"
        class="input"
        
        :disabled="loading.isFormLoading() || loading.isSelfLoading(name) || formDisabled.isDisabled() || props.disabled"
        :name="name"
        type="checkbox"
        :checked="valueRef"
        @input="onUpdate"/>
        <div class="label">
          <v-icon :name="icon"></v-icon>
          {{ props.label }}
        </div>
    </label>
</template>

<style scoped lang="scss">

  .checkbox {
    user-select: none;
    cursor: pointer;
    border-radius: var(--space-m);

    .input {
      opacity: 0;
      position: fixed;
      top: -100px;
      left: -100px;
    }


    .input:focus + .label {
      border-radius: var(--space-m);
      // box-shadow: inset 0 1px 3px rgba(0,0,0, .1), 0 0 0 6px var(--c-primary);
      outline-style: solid;
    }


  }



</style>
