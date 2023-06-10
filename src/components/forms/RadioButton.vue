<script setup lang="ts">
  import { uniqueId } from 'lodash';
  import { ref, watch } from 'vue';
  import type { SemanticColor } from '../types';
import { DataConnectorContext } from './context';
import Checkbox from './Checkbox.vue';
  const props = withDefaults(defineProps<{
    name?: string,
    label?: string,
    disabled?: boolean,
    modelValue?: string,
    required?: boolean,
    color?: SemanticColor,
    options: {value: string, label: string}[]
  }>(), {
    name: '',
    icon: 'check',
    label: '',
    disabled: false,
    modelValue: '',
    required: false,
    color: 'support',
  });

  
  const id = uniqueId();
  const emit = defineEmits(['update:modelValue']);

    
  const {emitChange, value} = DataConnectorContext.inject(props.name, props.modelValue);

  const valueRef = ref(value);
  watch(()=>props.modelValue,()=>{
    valueRef.value = props.modelValue;
  });
  watch(valueRef, ()=>{
    emitChange();
  });

  const onUpdate = (newValue: string)=>{
    valueRef.value = newValue;
    emit('update:modelValue', value);
    emitChange();
  };

  const name = props.name ?? id;


</script>

<template>
    <span :class="{
          [`color-${props.color}`]: true,
        }">
    </span>
    <input class="hiddeninput" :value="valueRef" :name="name"/>
    <Checkbox v-for="o in props.options" :label="o.label" :model-value="o.value === valueRef" :disabled="props.disabled"
        icon='dot' :color="props.color" @update:model-value="$event => onUpdate(o.value)"
    ></Checkbox>

</template>

<style scoped lang="scss">
</style>
