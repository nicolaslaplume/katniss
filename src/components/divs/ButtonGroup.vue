<script setup lang="ts">
     const props = withDefaults(defineProps<{
        dir?: 'column' | 'row',
    }>(), {
        dir: 'row'
    });

</script>

<template>
	<div class="button-group" :class="{ column: dir === 'column', row: dir === 'row' }">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.button-group {
    display: flex;
    & > .button {
        border-radius: 0 !important;
    }

    &.column {
        flex-direction: column;
        & > .button:first-of-type {
            border-radius: var(--space-m) var(--space-m) 0 0 !important;
        }
        & > .button:last-of-type {
            border-radius: 0 0 var(--space-m) var(--space-m) !important;
        }
    }
    &.row {
        flex-direction: row;
        & > .button:first-of-type {
            border-radius: var(--space-m) 0 0 var(--space-m) !important;
        }
        & > .button:last-of-type {
            border-radius: 0 var(--space-m) var(--space-m) 0 !important;
        }
    }
}
</style>
