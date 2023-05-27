<script setup lang="ts">
    import type {Size} from '../types';
  withDefaults(defineProps<{
    dir: 'column' | 'row',
    gap: Size,
    padding: Size,
    screen: boolean,
    justify: 'center' | 'start' | 'end';
    align: "center" | "start" | "end" | "stretch";
  }>(), {
    gap: 'm',
    padding: 'm',
    justify: 'center',
    align: 'center',
    screen: false,
  });
</script>

<template>
	<div 
    class="flex"
    :class="{
        column: dir === 'column',
        row: dir === 'row',
        screen,
        [`gap-${gap}`]: true,
        [`padding-${padding}`]: true,
        [`justify-${justify}`]: true,
        [`align-${align}`]: true,
    }">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.flex {
    display: flex;

    &.column {
        flex-direction: column;
        & > .divider {
            border-bottom: 1px solid black;
            width: 100%;
            height: 0;
        }
    }
    &.row {
        flex-direction: row;
        & > .divider {
            border-left: 1px solid black;
            height: 2em;
            width: 0;
        }
    }
    & > .flex {
        padding: 0;
    }

    &.screen {
        min-width: 100vw;
        min-height: 100vh;
        overflow: hidden;
    }

}
</style>
