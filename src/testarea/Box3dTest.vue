<script setup lang="ts">
    import { Flex, Box, Button } from '../components';
</script>

<template>
    <Flex screen dir="column">
      <Box effect3d color="main">main</Box>
      <Box color="main">main</Box>
      <Button effect3d>Hello World</Button>
      <Button>Hi</Button>
      <Box :effect3d="{x:15, y:5}" color="support">
        super longsuper long super long super long
        super longsuper long super long super long
        super longsuper long super long super long
        super longsuper long super long super long
    </Box>
      <Box effect3d color='warn' shadow>warn</Box>
  </Flex>
</template>