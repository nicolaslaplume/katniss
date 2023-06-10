<template>
    <transition
      name="__expand__"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <slot></slot>
    </transition>
  </template>
<script lang="ts">
export default {
  name: 'TransitionExpand',
  methods: {
    enter(element:HTMLElement) {
      const width = getComputedStyle(element).width;

      element.style.width = width;
      element.style.position = 'absolute';
      element.style.visibility = 'hidden';
      element.style.height = 'auto';

      const height = getComputedStyle(element).height;

      element.style.width = '';
      element.style.position = '';
      element.style.visibility = '';
      element.style.height = '0';

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height;

      // Trigger the animation.
      // We use `requestAnimationFrame` because we need
      // to make sure the browser has finished
      // painting after setting the `height`
      // to `0` in the line above.
      requestAnimationFrame(() => {
        element.style.height = height;
      });
    },
    afterEnter(element: HTMLElement) {
      element.style.height = 'auto';
    },
    leave(element: HTMLElement) {
      const height = getComputedStyle(element).height;
      
      element.style.height = height;

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height;

      requestAnimationFrame(() => {
        element.style.height = '0';
      });
    },
  },
};
</script>

<style>
.__expand__-enter-active,
.__expand__-leave-active {
  transition: height var(--speed-n) ease-in-out;
  overflow: hidden;
}

.__expand__-enter,
.__expand__-leave-to {
  height: 0;
}
</style>

<style scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>