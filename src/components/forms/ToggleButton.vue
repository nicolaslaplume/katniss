<script setup lang="ts">
  import Button from './Button.vue';
  import { uniqueId } from 'lodash';
  import { LoadingContext, DisabledContext, DataConnectorContext } from './context';
  import { ref, watch } from 'vue';
  import type { SemanticActiveColor } from '../types';
  const props = withDefaults(defineProps<{
    name?: string,
    disabled?: boolean,
    modelValue?: boolean,
    color?: SemanticActiveColor,
  }>(), {
    name: '',
    disabled: false,
    modelValue: false,
    color: 'primary',
  });

  
  const id = uniqueId();
  const emit = defineEmits(['update:modelValue']);
  const {emitChange, value} = DataConnectorContext.inject(props.name, props.modelValue);


  const loading = LoadingContext.inject();
  const formDisabled = DisabledContext.inject();


  const valueRef = ref(value);
  watch(()=>props.modelValue,()=>{
    valueRef.value = props.modelValue;
  });
  watch(valueRef, ()=>{
    emitChange();
  });

  const onToggle = ()=>{
    valueRef.value = !valueRef.value;
    emit('update:modelValue', valueRef.value);
  }

  const name = props.name ?? id;


</script>

<template>
    <Button 
        :disabled="loading.isFormLoading() || loading.isSelfLoading(name) || formDisabled.isDisabled() || props.disabled"
        :color="props.color"
        :toggled="valueRef" @click="onToggle"><slot></slot></Button>
    <input :name="name" type="checkbox" class="hidden" :checked="valueRef"/>
</template>
