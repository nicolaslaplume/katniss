import { isUndefined } from "lodash";
import { ref } from "vue";

const defaultStyle = {
    transition: 'transform 0.4s, filter 0.4s',
    transform: ``,
    filter: ``,
    cursor: 'pointer'
};

export type EffectConfig = {x?: number, y?: number} | undefined;

function provideEffect3d (p: EffectConfig ){
    const enabled = !isUndefined(p);
    const props = {
        x: p?.x ?? 25,
        y: p?.y ?? 25,
    }
    console.log({enabled, props});
    const style3d = ref(enabled? defaultStyle : {
        transition: '',
        transform: ``,
        filter: ``,
        cursor: ''
    });

    const mousemove = (event: MouseEvent)=>{
        const {top, left, width, height} = (event.target as HTMLElement).getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const xDeg = ((mouseX - left) / width)*2 -1;
        const yDeg = ((mouseY - top) / height)*2 -1;
        const x = xDeg * props.x;
        const y = -yDeg * props.y;
        const s = 1.1;
    
        // Convert degrees to radians
        var radX = x * (Math.PI / 180);
        var radY = y * (Math.PI / 180);
    
        // Calculate rotation matrix elements
        var cosX = Math.cos(radX);
        var sinX = Math.sin(radX);
        var cosY = Math.cos(radY);
        var sinY = Math.sin(radY);
    
        const normal = [
            cosX * sinY,
            sinX,
            cosX * cosY
        ];
        const light = [
            0.431934,0.259161,0.863868
        ];
        const cb = (normal[0] * light[0] + normal[1] * light[1] + normal[2] * light[2]);
        const b = (cb/light[2])**2;
    
        style3d.value = {
            transition: 'transform 0.1s, filter 0.1s',
            transform: `scale(${s}) rotateX(${y}deg) rotateY(${x}deg)`,
            filter: `brightness(${b})`,
            cursor: 'pointer',
        };
    }
    const mouseleave = ()=>style3d.value = defaultStyle;

    return {
        style3d,
        mousemove: enabled ? mousemove : ()=>{},
        mouseleave: enabled ? mouseleave : ()=>{},
    }
}

export {provideEffect3d};