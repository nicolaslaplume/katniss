<script setup lang="ts">
import { ref } from 'vue';
import { provideAlerts } from '../other/useAlert';
import type { Alert } from '../other/useAlert';
import Modal from '../divs/Modal.vue';
import Button from '../forms/Button.vue';

const currentAlert = ref(null as Alert | null)
provideAlerts(alert=>{
    currentAlert.value = alert;
});
const closeAlert = (value: boolean)=>{
    if (currentAlert.value) {
        currentAlert.value.callback(value);
        currentAlert.value = null;
    }
}

</script>

<template>
    <Modal :show="currentAlert !== null">
        <template #body>
            {{ currentAlert?.msg }}
        </template>
        <template #footer v-if="currentAlert?.type === 'alert'">
            <Button
                  class="modal-default-button"
                @click="closeAlert(true)"
              >OK</Button>
        </template>
        <template #footer v-if="currentAlert?.type === 'prompt'">
            <Button
                  class="modal-default-button"
                @click="closeAlert(true)"
              >Yes</Button>
              <Button
                  color='secondary'
                  class="modal-default-button"
                @click="closeAlert(false)"
              >No</Button>
        </template>
    </Modal>
    <slot></slot>
</template>

<style scoped>
.modal-default-button {
    float: right;
    margin-left: var(--space-m);
}
</style>