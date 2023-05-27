<script setup lang="ts">
import { ref, watch } from 'vue';
import { Flex, Form, Button, Input, Box, Checkbox } from '../components';
import type {KatnissEvent} from '../components';
const log = console.log;// (...args: any[])=>{} // 

const wait = ()=>new Promise(r=>setTimeout(r, 2000));

const addressValue = ref('123');

const onSubmit = async ({value, isAsync}: KatnissEvent<{name: string}>)=>{
  const done = isAsync();
  await wait();
  log(value);
  done();
}

const agreement = ref(true);

const onLoad = async({isAsync}: KatnissEvent)=>{
    const done = isAsync();
    await wait();
    addressValue.value = 'loaded';
    agreement.value = !agreement.value;
    done();
}
const onLoadNonBlocking = async({isAsync}: KatnissEvent)=>{
    const done = isAsync(false);
    console.log({agreement: agreement.value});
    log('address', addressValue.value);
    await wait();
    addressValue.value = 'loaded';
    done();
}


</script>

<template>
  
  <Form @submit="onSubmit">
    <Flex screen dir='column' >
      <Checkbox v-model="agreement" name="agree" label="Agree?"/>
      <Input label="Name" model-value="Nico" name="name"/>
      <Button color="secondary" @click="onLoad">Load String</Button>
      <Button color="ghost" @click="onLoadNonBlocking">Load non-blocking</Button>
      <Input v-model="addressValue" name="address" @update:modelValue="log" />
      <Button type="submit">
        Submit
      </Button>
    </Flex>
  </Form>
</template>
