<script setup lang="ts">
    import type {Size, SemanticColor} from '../types';
  withDefaults(defineProps<{
    color: SemanticColor;
    inverted: boolean;
    padding: Size;
    shadow: boolean;
    displaced: boolean;
  }>(), {
    padding: 'm',
    shadow: false,
    displaced: false,

    color: 'main',
    inverted: false,
  });
</script>

<template>
	<div 
    class="box"
    :class="{
        [`padding-${padding}`]: true,
        shadow,
        displaced,
        [`color-${color}`]: true,
        'color-inverted': inverted,
    }">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.box {
    border-radius: var(--space-m);
    border-width: 2px;
    border-style: solid;

    &.shadow {
        box-shadow: var(--space-m) var(--space-m) var(--space-m) #00000066;
        &.displaced {
            transform: translate(calc(0 - var(--space-m)));
        }
    }
}
</style>
