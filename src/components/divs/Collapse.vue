<script setup lang="ts">
  import TransitionExpand from '../transitions/TransitionExpand.vue';
  import { ref, useSlots, watch } from 'vue';
  const emit = defineEmits<{
    (event: 'toggleOpen', isOpened: boolean): void
  }>();
  const props = withDefaults(defineProps<{
    title?: string;
    opened?: boolean;
  }>(), {
    opened: false
  });

  const opened = ref(props.opened);
  watch(()=>props.opened, ()=>{
    opened.value = props.opened;
  });

  const toggle = ()=>{
    opened.value = !opened.value;
    emit('toggleOpen', opened.value);
  }

</script>

<template>
	<div class="container" >
        <div @click="toggle">
            <v-icon class="toggle" :class="{
                opened
            }" name="fa-chevron-right"></v-icon>
            {{ props.title }}
        </div>
        <TransitionExpand>
            <div v-if="opened">
                <slot></slot>
            </div>
        </TransitionExpand>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 100%;
}

.toggle {
    transition: transform var(--speed-n);
    &.opened {
        transform: rotate(-0.25turn);
    }
}
</style>
