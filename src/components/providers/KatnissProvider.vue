<script setup lang="ts">
    import AlertProvider from './AlertProvider.vue';
    import NotificationProvider from './NotificationProvider.vue';
</script>

<template>
    <AlertProvider>
        <NotificationProvider>
            <slot></slot>
        </NotificationProvider>
    </AlertProvider>
</template>