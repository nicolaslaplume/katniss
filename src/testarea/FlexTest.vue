<script setup lang="ts">
    import { Flex, Box, Divider } from '../components';
</script>

<template>
    <Flex screen dir="column">
        <Flex dir="row" justify="start">
            <Box>1</Box>
            <Divider />
            <Box>2</Box>
            <Box>4</Box>
        </Flex>
        <Divider />
        <Flex dir="row">
            <Box>1</Box>
            <Box>3</Box>
            <Box>2</Box>
            <Flex dir="column">
                <Box>3</Box>
                <Box>4</Box>
            </Flex>
        </Flex>
        <Box>hi</Box>
        <Box>hi</Box>
        <Box>hi</Box>
    </Flex>
</template>