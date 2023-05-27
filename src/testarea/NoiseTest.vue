<script setup lang="ts">
    import { ref } from 'vue';
import { Flex, Box, NoiseEffect, Button} from '../components';
    const visible = ref(false);
</script>

<template>
    <Flex screen dir="column">
        <Button @click="visible = !visible">{{ visible ? 'Turn Off' : 'Turn On' }}</Button>
        <NoiseEffect :visible="visible">
            <Box color="warn" inverted>
                Hello World
            </Box>
        </NoiseEffect>
    </Flex>
</template>