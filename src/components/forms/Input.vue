<script setup lang="ts">
  import {uniqueId} from 'lodash';
  import { LoadingContext, DisabledContext, ValidContext } from './context';
  const id = uniqueId();

  const loading = LoadingContext.inject();
  const formDisabled = DisabledContext.inject();
  const valid = ValidContext.inject();

  const props = withDefaults(defineProps<{
    name: string,
    type?: 'text' | 'password',
    label?: string,
    disabled?: boolean,
    // validators?: string[],

    modelValue?: string,
  }>(), {
    name: '',
    type: 'text',
    label: '',
    disabled: false,
    modelValue: '',
  });
</script>

<template>
    <input 
        :disabled="loading.isLoading() || formDisabled.isDisabled() || props.disabled"
        :name="props.name"
        :type="props.type"
        :v-model="props.modelValue" 
        @change:modelValue=""/>
</template>

<style scoped lang="scss">

</style>
