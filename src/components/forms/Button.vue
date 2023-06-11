<script setup lang="ts">
  import Spinner from '../other/Spinner.vue';
// ToDo Toggle, size 
  import type {SemanticActiveColor} from '../types';
  import {uniqueId} from 'lodash';
  import { LoadingContext, DisabledContext } from './context';
  import { createEvent } from './KatnissEvent';
import { provideEffect3d, type EffectConfig } from '../other/effect3d';
  const props = withDefaults(defineProps<{
    color?: SemanticActiveColor;
    circle?: boolean,
    type?: 'button' | 'submit',
    disabled?: boolean,
    toggled?: boolean,
    effect3d: EffectConfig,
  }>(), {
    color: 'primary',
    circle: false,
    type: 'button',
    disabled: false,
    toggled: false,
    effect3d: undefined,
  });
  
  const id = uniqueId();
  const emit = defineEmits(['click']);

  const loading = LoadingContext.inject();
  const formDisabled = DisabledContext.inject();


  const onClick = ()=>{
    emit('click', createEvent({
      name: id,
      value: null,
      loading,
    }));
  }

  const {style3d, mouseleave, mousemove} = provideEffect3d(props.effect3d);
</script>

<template>
	<button 
      :name="id"
      class="button"
      :class="{
        circle: props.circle,
        [`color-${props.color}`]: true,
        toggled: props.toggled
      }"
        :checked="props.toggled"
      :disabled="loading.isFormLoading() || loading.isSelfLoading(id) || formDisabled.isDisabled() || props.disabled" 
      :type="props.type" 
      @click.stop="onClick"

      @mousemove="mousemove"
      @mouseleave="mouseleave"
      :style="style3d"
    >
    <TransitionGroup tag="div" name="crossfade" class="container">
      <div 
        :class="{
          hidable: true,
          hidden: loading.isSelfLoading(id)
        }">
        <slot></slot>
      </div>
      <div v-if="loading.isSelfLoading(id)" class="crossfadable">
        <Spinner ></Spinner>
      </div>
  </TransitionGroup>
    
  </button>
</template>

<style scoped lang='scss'>
@import url(../transitions/crossfade.css);

.button {
  user-select: none;
  padding: var(--space-m);

  border-style: solid;
  border-width: 2px;

  cursor: pointer;

  border-radius: var(--space-m);
  transition: filter var(--speed-n);

  &.circle {
    border-radius: 100%;
  }

  &:hover {
    filter: saturate(3) sepia(0.4);
    text-decoration: underline;
  }
  &:active {
      filter: sepia(0.4) saturate(0.2) !important;
      text-decoration: underline;
  }

  &.toggled {
    filter: brightness(0.6);
    &:hover {
        filter: brightness(0.6) saturate(3) sepia(0.4);
    }
    &:active {
        filter: brightness(0.6) sepia(0.4) saturate(0.2) !important;
    }
  }

  .hidable {
    transition: opacity var(--speed-n);
    &.hidden {
      opacity: 0;
    }
  }
  .spinner {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
}
/*
& * {
    font-size: ${getRelSize(p.size)};
}

&.toggled {
    filter: brightness(0.6);
    &:hover {
        filter: brightness(0.6) saturate(3) sepia(0.4);
    }
    &:active {
        filter: brightness(0.6) sepia(0.4) saturate(0.2);
    }
}

position: relative;
& .content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${getSize(p,'n')};
    transition: opacity ${getSpeed(p, 'normal')}s;
}
&.--loading .content {
    opacity: 0;
}
& .spinner {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity ${getSpeed(p, 'normal')}s;
    height: 1em;
    width: 1em;
}
&.--loading .spinner {
    opacity: 1;
}
*/
</style>
