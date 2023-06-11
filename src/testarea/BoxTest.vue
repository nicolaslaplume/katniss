<script setup lang="ts">
    import { Flex, Box } from '../components';
</script>

<template>
    <Flex screen dir="column">
      <Box color="main">main</Box>
      <Box color="support">support</Box>
      <Box color="alternative">alternative</Box>
      <Box color="info">info</Box>
      <Box color="warn">warn</Box>
      <Box color="error">error</Box>
      <Box color="success">success</Box>
      <span>-------</span>
      <Box color="main" inverted>main</Box>
      <Box color="support" inverted>support</Box>
      <Box color="alternative" inverted>alternative</Box>
      <Box color="info" inverted>info</Box>
      <Box color="warn" inverted>warn</Box>
      <Box color="error" inverted>error</Box>
      <Box color="success" inverted>success</Box>
  </Flex>
</template>