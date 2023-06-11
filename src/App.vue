<script setup lang="ts">
import BoxTest from './testarea/BoxTest.vue';
import FormTest from './testarea/FormTest.vue';
import FlexTest from './testarea/FlexTest.vue';
import NoiseTest from './testarea/NoiseTest.vue';
import CheckboxTest from './testarea/CheckboxTest.vue';
import ToggleTest from './testarea/ToggleTest.vue';
import CollapseTest from './testarea/CollapseTest.vue';
import Box3dTest from './testarea/Box3dTest.vue';
import PortalTest from './testarea/PortalTest.vue';
import {KatnissProvider} from './components';
</script>

<template>
  <KatnissProvider>
    <div class="app">
      <PortalTest/>
    </div>
    <portal-target multiple name="overlays"></portal-target>
  </KatnissProvider>
</template>
