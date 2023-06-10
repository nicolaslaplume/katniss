<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { provideNotifications } from '../other/useNotification';
import type { Notification } from '../other/useNotification';
import Box from '../divs/Box.vue';

const notifications = ref([] as Notification[]);
provideNotifications(note=>{
    notifications.value = [
        ...notifications.value,
        note
    ];
});
const closeNotification = (id: string)=>{
    notifications.value = notifications.value.filter(note=>note.id !== id);
}

const hovered = ref<{
    id: string,
    ttl: number,
} | null>(null);
const hover = (id: string)=>{
    const expiration = notifications.value.find(n=>n.id === id)?.expiration ?? 0;
    hovered.value = {
        id,
        ttl: performance.now() - expiration,
    }
}
const unhover = ()=>{
    const oldHover = hovered.value;
    if (oldHover) {
        const note = notifications.value.find(n=>n.id === oldHover.id);
        if (note) {
            note.expiration = performance.now() + oldHover.ttl;
        }
    }
    hovered.value = null;
}

let intervalId = 0;
onMounted(() => {
  intervalId = setInterval(() => {
    const now = performance.now();
    notifications.value = notifications.value.filter(note=>note.expiration > now || note.id === hovered.value?.id);
  }, 1000);
});
onUnmounted(() => clearInterval(intervalId));

</script>

<template>
    <Portal to="overlays">
        <div class="notification-center">
            <TransitionGroup name="fade" class="container">
                <Box v-for="note in notifications" :color="note.type" inverted
                    :key="note.id"
                    @mouseover="()=>hover(note.id)" @mouseleave="unhover"
                    :class="{
                        hovered: hovered?.id === note.id
                    }" class="notification"
                >
                    {{ note.msg }}
                    <v-icon name="fa-times" @click="closeNotification(note.id)"></v-icon>
                </Box>
            </TransitionGroup>
        </div>
    </Portal>
    <slot></slot>
</template>

<style scoped lang="scss">
.notification-center {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    min-width: 100px;
}

.notification {
    opacity: 0.85;
    transition: all 0.4s;
    width: fit-content;

    &.hovered {
        opacity: 1;
    }
}


.container {
  position: relative;
  padding: 0;
}


/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0 !important;
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>