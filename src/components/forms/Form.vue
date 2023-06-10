<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { uniqueId } from 'lodash';
  import { LoadingContext, DisabledContext, ValidContext, DataConnectorContext} from './context';
  import { createEvent } from './KatnissEvent';
  const props = withDefaults(defineProps<{
    disabled?: boolean,
    attachStorage?: string,
  }>(), {
    disabled: false,
  });
  
  const id = uniqueId();
  const emit = defineEmits(['submit']);

  const loading = LoadingContext.provide();
  const formDisabled = DisabledContext.provide();
  ValidContext.provide();
  

  watch(()=>props.disabled, ()=>{
    formDisabled.value = props.disabled;
  });

  const formRef = ref(null);
  const getFormValues = ()=>{
    if (!formRef.value) return;
    const fd = new FormData(formRef.value);
    
    const values: Record<string, string> = {};
    [...fd.keys()].forEach(key=>{
        const value = fd.get(key);
        if (!value) return;
        values[key] = value as string;
    });
    return values;
  }

  const onSubmit = (e:Event & {submitter?: {name?: string}})=>{
    const name = e.submitter?.name ?? id;
    emit('submit', createEvent({
      name,
      value: getFormValues(),
      loading,
    }));
  }

  if (props.attachStorage) {
    DataConnectorContext.provide(props.attachStorage, getFormValues);
  }

</script>

<template>
    <form ref="formRef" @submit.stop.prevent="onSubmit">
        <slot></slot>
    </form>
</template>

<style scoped lang="scss">

</style>
