<script setup lang="ts">
import { Flex, Form, Button, Input } from './components';
import type {KatnissEvent} from './components'

const wait = ()=>new Promise(r=>setTimeout(r, 4000));

const onSubmit = async ({value, isAsync}: KatnissEvent<{name: string}>)=>{
  const done = isAsync();
  await wait();
  console.log(value);
  done();
}


</script>

<template>
  <Form @submit="onSubmit">
    <Flex dir='column' >
      <Input name="name"/>
      <Button  type="submit">
        Submit
      </Button>
    </Flex>
  </Form>
</template>

<style scoped>

</style>
