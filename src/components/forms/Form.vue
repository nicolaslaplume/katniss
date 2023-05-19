<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { uniqueId } from 'lodash';
  import { LoadingContext, DisabledContext, ValidContext} from './context';
  import { createEvent } from './KatnissEvent';
  const id = uniqueId();
  const emit = defineEmits(['submit']);

  const loading = LoadingContext.provide();
  const formDisabled = DisabledContext.provide();
  ValidContext.provide();

  const props = withDefaults(defineProps<{
    disabled?: boolean,
    // attachStorage?: boolean,
  }>(), {
    disabled: false,
  });

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
    console.log('name of event',{name});
    emit('submit', createEvent({
      name,
      value: getFormValues(),
      loading,
    }));
  }
</script>

<template>
    <form ref="formRef" @submit.stop.prevent="onSubmit">
        <slot></slot>
    </form>
</template>

<style scoped lang="scss">

</style>
