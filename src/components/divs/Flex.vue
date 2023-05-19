<script setup lang="ts">
  withDefaults(defineProps<{
    dir: 'column' | 'row',
  }>(), {
    dir: 'column'
  });
</script>

<template>
	<div 
    class="flex"
    :class="{
        column: dir === 'column',
        row: dir === 'row',
    }">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.flex {
    display: flex;
    gap: var(--space-m);
    padding: var(--space-m);
    justify-content: center;
    align-items: center;

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
}

</style>
