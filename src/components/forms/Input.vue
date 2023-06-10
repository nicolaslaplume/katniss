<script setup lang="ts">
  import {uniqueId} from 'lodash';
  import { LoadingContext, DisabledContext, ValidContext, DataConnectorContext } from './context';
  import { ref, watch } from 'vue';
  import { getCurrentInstance } from "vue";
  const props = withDefaults(defineProps<{
    name?: string,
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


  const id = uniqueId();
  const emit = defineEmits(['update:modelValue']);

  const {emitChange, value} = DataConnectorContext.inject(props.name, props.modelValue);


  const loading = LoadingContext.inject();
  const formDisabled = DisabledContext.inject();
  const valid = ValidContext.inject();

  const valueRef = ref(value);
  watch(()=>props.modelValue,()=>{
    valueRef.value = props.modelValue;
  });

  watch(valueRef, ()=>{
    // Run Validation

    // update
    emitChange();
  })

  const x = getCurrentInstance();
  const onUpdate = ({target}: Event )=>{
    const value = (target && 'value' in target)? target.value as string : '';
    valueRef.value = value;
    emit('update:modelValue', value);
  };

  const name = props.name ?? id;

</script>

<template>
  <div class="container">
    <label class="label" :class="{
      hasText: valueRef.length > 0,
    }" :for="id">{{ props.label }}</label>
    <input 
        :id="id"
        class="input"
        :disabled="loading.isFormLoading() || loading.isSelfLoading(name) || formDisabled.isDisabled() || props.disabled"
        :name="name"
        :type="props.type"
        :value="valueRef"
        @input="onUpdate"
        />
      </div>
</template>

<style scoped lang="scss">

.container {
  position: relative;
  padding-top: 12px;

  .label {
    position: absolute;
    transform: translate(var(--space-l), var(--space-s));
    transition: transform 0s;
    color: var(--c-support);

    &.hasText {
        transform: translate(var(--space-l), calc(-1 * var(--space-xl)));
    }
  }

  .input {
    border-radius:  var(--space-m);
    border: none;
    padding: var(--space-m) var(--space-l);
  }


}

</style>
