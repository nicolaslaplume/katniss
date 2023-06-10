<script setup lang="ts">
import { ref, watch } from 'vue';
import { Flex, Form, Button, Input, Box, ButtonGroup, ToggleButton } from '../components';
import type {KatnissEvent} from '../components';
const log = console.log;// (...args: any[])=>{} // 

const wait = ()=>new Promise(r=>setTimeout(r, 2000));

const agreement = ref(false);

const onSubmit = async ({value, isAsync}: KatnissEvent<{toggle: boolean, aggre: boolean}>)=>{
    log(agreement.value)
  log(value);
  agreement.value = !agreement.value;
}


</script>

<template>
  
  <Form @submit="onSubmit">
    <Flex screen dir='column'>
      <ToggleButton name="toggle">Toggle Toggle</ToggleButton>
      <ToggleButton name='aggre' v-model="agreement">Agree?</ToggleButton>
      <ButtonGroup dir="column">
        <Button color='primary'>Action</Button>
        <Button color='secondary'>Second</Button>
      </ButtonGroup>
      <ButtonGroup>
        <ToggleButton>B</ToggleButton>
        <ToggleButton>i</ToggleButton>
        <ToggleButton>k</ToggleButton>
      </ButtonGroup>
      <Button type='submit'>Submit</Button>
    </Flex>
  </Form>
</template>
