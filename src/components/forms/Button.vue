<script setup lang="ts">
// ToDo Toggle, size, spinner,
// color, dontBubbleLoading,

  import {uniqueId} from 'lodash';
  import { LoadingContext, DisabledContext } from './context';
  import { createEvent } from './KatnissEvent';
  const id = uniqueId();
  const emit = defineEmits(['click']);

  const loading = LoadingContext.inject();
  const formDisabled = DisabledContext.inject();

  const props = withDefaults(defineProps<{
    circle?: boolean,
    label?: string,
    size: 's' | 'm' | 'l',
    type?: 'button' | 'submit',
    disabled?: boolean,
  }>(), {
    circle: false,
    type: 'button',
    label: '',
    size: 'm',
    disabled: false,
  });

  const onClick = ()=>{
    emit('click', createEvent({
      name: id,
      value: null,
      loading,
    }));
  }
</script>

<template>
	<button 
      :class="{
        circle: props.circle,
      }"
      :disabled="loading.isLoading() || formDisabled.isDisabled() || props.disabled" 
      :type="props.type" 
      @click.stop="onClick"
    >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  user-select: none;
  padding: var(--space-m);

  border-style: solid;
  border-width: 2px;
  border-color: red;

  cursor: pointer;

  border-radius: var(--space-m);
  transition: all var(--speed-n);

  &.circle {
    border-radius: 100%;
  }

  &:hover {
    filter: saturate(3) sepia(0.4);
    text-decoration: underline;
  }
  &:active {
      filter: sepia(0.4) saturate(0.2);
      text-decoration: underline;
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
