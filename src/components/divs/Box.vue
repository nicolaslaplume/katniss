<script setup lang="ts">
    import { provideEffect3d , type EffectConfig} from '../other/effect3d';
import type {Size, SemanticColor} from '../types';
  const props = withDefaults(defineProps<{
    color?: SemanticColor;
    inverted?: boolean;
    padding?: Size;
    shadow?: boolean;
    displaced?: boolean;
    effect3d: EffectConfig;
  }>(), {
    padding: 'm',
    shadow: false,
    displaced: false,
    effect3d: undefined,

    color: 'main',
    inverted: false,
  });

  const {style3d, mouseleave, mousemove} = provideEffect3d(props.effect3d);


</script>

<template>
	<div 
    @mousemove="mousemove"
    @mouseleave="mouseleave"
    :style="style3d"

    class="box"
    :class="{
        [`padding-${padding}`]: true,
        shadow,
        displaced,
        [`color-${color}`]: true,
        'color-inverted': inverted,
    }">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.box {
    border-radius: var(--space-m);
    border-width: 2px;
    border-style: solid;

    &.shadow {
        box-shadow: var(--space-m) var(--space-m) var(--space-m) #00000066;
        &.displaced {
            transform: translate(calc(0 - var(--space-m)));
        }
    }
}
</style>
