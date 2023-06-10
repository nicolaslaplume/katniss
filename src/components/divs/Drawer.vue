<script setup lang="ts">
import Flex from './Flex.vue';

const props = defineProps<{
    show: boolean;
}>();
</script>

<template>
  <Portal to="overlays">
    <Transition name="slide">
      <div v-if="props.show" class="drawer">
        <Flex dir="column" class="flex-container" justify="start">
            <slot></slot>
        </Flex>
      </div>
    </Transition>
  </Portal>
</template>

<style scoped>
.drawer {
  position: fixed;
  z-index: var(--z-index-drawer);
  top: 0;
  right: 0;
  min-width: 300px;
  width: 25vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  transition: right var(--speed-n);
}

.flex-container {
    width: 100%;
}


/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.slide-leave-to,
.slide-enter-from {
    right: min(-300px,-25vw);
}

</style>