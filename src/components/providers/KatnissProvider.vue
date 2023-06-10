<script setup lang="ts">
    import AlertProvider from './AlertProvider.vue';
</script>

<template>
    <AlertProvider>
        <slot></slot>
    </AlertProvider>
</template>