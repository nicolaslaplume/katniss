<script setup lang="ts">
import { defineSlots } from 'vue';
import Button from '../forms/Button.vue';

defineEmits(['close']);
defineSlots<{
    header?: any,
    body?: any,
    footer?: any,
}>
const props = defineProps<{
    show: boolean;
}>();
</script>

<template>
  <Portal to="overlays">
    <Transition name="modal">
      <div v-if="props.show" class="modal-mask">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body">Default Body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <Button
                  class="modal-default-button"
                @click="$emit('close')"
              >OK</Button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Portal>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: var(--z-index-modal);
  backdrop-filter: blur(5px);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.4s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>