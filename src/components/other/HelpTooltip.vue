<script setup lang="ts">
import { uniqueId } from 'lodash';
import { ref, reactive } from 'vue';

const id = uniqueId();
const hovered = ref(false);


const styleObject = ref({
 top: '0px',
 left: '250px',
});

let timeout = 0;

const mouseover=(e: MouseEvent)=>{
    clearTimeout(timeout);
    if (e.target) {
        const target = document.getElementById(id)!;
        const rect = target.getBoundingClientRect();
        const top  = `${rect.top + rect.height}px`;
        const left = `${rect.left + rect.width/2}px`;
        styleObject.value = {
            top, left
        }
    }
    hovered.value = true;
}
const mouseleave=()=>{
    timeout = setTimeout(()=>{
     hovered.value = false;
    }, 200);
}
</script>

<template>
  <v-icon :id="id" class="icon" name="fa-info-circle" @mouseover="mouseover" @mouseleave="mouseleave"></v-icon>
  <Portal to="overlays">
    <Transition name="fade">
      <div v-if="hovered" :style="styleObject" class="tooltip"  @mouseover="mouseover" @mouseleave="mouseleave">
            <slot></slot>
      </div>
    </Transition>
  </Portal>
</template>

<style scoped>
.icon {
    cursor: pointer;
}
.tooltip {
  position: fixed;
  z-index: var(--z-index-tooltip);
  
  transform: translate(-50%, 0);

  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity var(--speed-n);

  border-radius: var(--space-m);
  padding: var(--space-s);
}


.fade-leave-to,
.fade-enter-from {
    opacity: 0;
}

</style>