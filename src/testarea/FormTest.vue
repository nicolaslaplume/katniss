<script setup lang="ts">
import { ref, watch } from 'vue';
import { Flex, Form, Button, Input, Box } from '../components';
import type {KatnissEvent} from '../components'

const wait = ()=>new Promise(r=>setTimeout(r, 2000));

const addressValue = ref('123');

const onSubmit = async ({value, isAsync}: KatnissEvent<{name: string}>)=>{
  const done = isAsync();
  await wait();
  console.log(value);
  done();
}

const onLoad = async({isAsync}: KatnissEvent)=>{
    const done = isAsync();
    await wait();
    addressValue.value = 'loaded';
    done();
}
const onLoadNonBlocking = async({isAsync}: KatnissEvent)=>{
    const done = isAsync(false);
    console.log('address', addressValue.value);
    await wait();
    addressValue.value = 'loaded';
    done();
}

</script>

<template>
  
  <Form @submit="onSubmit">
    <Flex screen dir='column' >
      <Input label="Name" model-value="Nico" name="name"/>
      <Button color="secondary" @click="onLoad">Load String</Button>
      <Button color="ghost" @click="onLoadNonBlocking">Load non-blocking</Button>
      <Input v-model="addressValue" name="address" @update:modelValue="console.log" />
      <Button type="submit">
        Submit
      </Button>
    </Flex>
  </Form>
</template>
