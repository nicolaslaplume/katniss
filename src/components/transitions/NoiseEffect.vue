<script setup lang="ts">
  import { ref, watch } from 'vue';
import type { Speed } from '../types';
 const props = withDefaults(defineProps<{
    visible: boolean;
    startOut: boolean;
    seed?: number;
    liminal?: number;
    speed?: Speed;
  }>(), {
    startOut: false,
    seed: Math.floor(Number.MAX_SAFE_INTEGER*Math.random()),
    liminal: 0.1,
    speed: 'normal',
  });

  const duration = 1;

function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}
const getNoise = (endT: 0 | 1, startT: number, totalDurationSeconds = 1, seed = 44, liminal = 0.1) => {
    // make sure things will not break
    if (liminal < 0.001) liminal = 0.001;

    const width = 100;
    const height = 100;

  const remainingDuration = Math.abs(endT - startT) * totalDurationSeconds;

  const slope = -1 / (liminal * 2);
  const minIntercept = liminal * -slope;
  const maxIntercept = (1 + liminal) * -slope;

  const startIntercept = lerp(minIntercept, maxIntercept, startT);
  const endIntercept = lerp(minIntercept, maxIntercept, endT);

  const id = `alpha-effect-${Math.random()}`;

  const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewport="0 0 ${width} ${height}" width="${width}" height="${height}">
        <defs>
            <filter id="${id}">
                <feFlood  x="0" y="0"
                width="${width}" height="${height}"/>
                <feGaussianBlur stdDeviation="3"/>
                <feComponentTransfer result="SMOOTH">
                    <feFuncA type="table" tableValues="1 0.7 0.3 0"/>
                </feComponentTransfer>
                <feTurbulence seed="${seed}" result="NOISE" type="fractalNoise" baseFrequency="0.05" numOctaves="5"/>

                <feMerge>
                    <feMergeNode in="NOISE"></feMergeNode>
                    <feMergeNode in="SMOOTH"></feMergeNode>
                </feMerge>

                <feComponentTransfer>
                    <feFuncA type="linear" slope="${slope}" intercept="${endIntercept}">
                        <animate
                        calcMode="linear"
                        attributeName="intercept"
                        from="${startIntercept}"
                        to="${endIntercept}"
                        dur="${remainingDuration}s" />
                    </feFuncA>
                </feComponentTransfer>
            </filter>
        </defs>
        
        <rect x="0" y="0" width="${width}" height="${height}" 
                fill="blue" filter="url(#${id})"/>
        </svg>
    `;
    return svg;
};

const toBase64 = (svg: string)=>`url(data:image/svg+xml;base64,${btoa(svg)})`;

let now = performance.now();
let lastTransition = {
    timeStart: now,
    timeEnd: now+duration*1000,
    startOpacity: props.startOut? 0 : (props.visible? 1 : 0),
    endOpacity: props.visible? 1 : 0 as 0|1,
};
const maskImage = ref(toBase64(getNoise(lastTransition.endOpacity, lastTransition.startOpacity, duration, props.seed, props.liminal)));



watch(()=>props.visible, ()=>{
    now = performance.now();
    if (now < lastTransition.timeEnd) {
        // animation not done
        const timeDone = (now - lastTransition.timeStart) / (lastTransition.timeEnd - lastTransition.timeStart); // [0,1]
        lastTransition.startOpacity = lerp(lastTransition.startOpacity, lastTransition.endOpacity, timeDone);
    } else {
        lastTransition.startOpacity = lastTransition.endOpacity;
    }
    lastTransition.endOpacity = props.visible ? 1 : 0;
    lastTransition.timeStart = now;
    lastTransition.timeEnd = now + duration * 1000;
    maskImage.value = toBase64(getNoise(lastTransition.endOpacity, lastTransition.startOpacity, duration , props.seed, props.liminal));
});

</script>

<template>
    <div :style="{
        maskSize: 'cover',
        maskRepeat: 'no-repeat',
        maskImage,
    }">
        <slot></slot>
    </div>
</template>