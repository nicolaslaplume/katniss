<script setup lang="ts">
    import { ref } from 'vue';
import { Flex, Collapse } from '../components';

    const opened = ref(-1);
    const onToggle = (isOpen: boolean, index: number)=>{
        if (isOpen) opened.value = index;
        else opened.value = -1;
    }
</script>

<template>
    <Flex screen dir="column">
            <Collapse title="Collapse 1">
                Long ass text i dont care 
                Long ass text i dont care 
                Long ass text i dont care 
                Long ass text i dont care 
                Long ass text i dont care
            </Collapse>

        ----------
<!-- 
        <Collapse title="Section 1" :opened="opened === 0" @toggleOpen="opened=>onToggle(opened,0)">
            Section 1 Section 1 Section 1 Section 1 Section 1 Section 1 Section 1 Section 1 Section 1 Section 1 Section 1 Section 1 Section 1 Section 1 Section 1 Section 1 
        </Collapse>
        <Collapse title="Section 2" :opened="opened === 1" @toggleOpen="opened=>onToggle(opened,1)">
            Section 2 Section 2 Section 2 Section 2 Section 2 Section 2 Section 2 Section 2 Section 2 Section 2 Section 2 Section 2 Section 2 Section 2 Section 2 Section 2 
        </Collapse>
        <Collapse title="Section 3" :opened="opened === 2" @toggleOpen="opened=>onToggle(opened,2)">
            Section 3 Section 3 Section 3 Section 3 Section 3 Section 3 Section 3 Section 3 Section 3 Section 3 Section 3 Section 3 Section 3 Section 3 Section 3 Section 3  
        </Collapse> -->

        
    </Flex>
</template>