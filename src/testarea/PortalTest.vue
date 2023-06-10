<script setup lang="ts">
import { ref } from 'vue';
import { Button, Modal, Flex, Drawer, HelpTooltip, useAlert, useNotification } from '../components';

const {alert, prompt} = useAlert();
const notify = useNotification();

const isModalOpened = ref(false);
const toggleModal = ()=>{
    isModalOpened.value = !isModalOpened.value;
}

const isDrawerOpened = ref(false);
const toggleDrawer = ()=>{
    isDrawerOpened.value = !isDrawerOpened.value;
}

const doAlert = async ()=>{
    await alert('mensage');
    console.log('done');
}
const doPrompt = async ()=>{
    const result = await prompt('Question?');
    console.log('done: ', result);
}

let count = 0;

const doNote = ()=>{
    notify({
        msg: 'Hello ' + (++count),
        type: 'info',
        secondsToLive: 4,
    });
}

</script>

<template>
  
  <Flex dir='column' screen>

    <Button @click="toggleModal">Open Modal</Button>
    <Button @click="toggleDrawer">Open Drawer</Button>
    <Button @click="doAlert">Alert!</Button>
    <Button @click="doPrompt">Prompt?</Button>
    <Button @click="doNote">Info</Button>
    <HelpTooltip>
        <span>This is the thing that does the thing</span>
    </HelpTooltip>

    
    <Modal :show="isModalOpened" @close="toggleModal">
        <template #header>
            Welcome
        </template>
        <template #body>
            To a new world
            <HelpTooltip>
                <span>This is the thing that does the thing</span>
            </HelpTooltip>
        </template>
    </Modal>

    <Drawer :show="isDrawerOpened">
        <span>Hello</span>
        <span>World</span>
        <HelpTooltip>
            <span>This is the thing that does the thing</span>
        </HelpTooltip>
    </Drawer>
    

  </Flex>
</template>
