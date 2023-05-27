import type { InjectedLoadingContext } from "./context";

export type KatnissEvent<T = any> = {
    value: T,
    isAsync: (blockForm?: boolean)=>()=>void;
}

type Props<T> = {
    name: string,
    value: T,
    loading: InjectedLoadingContext,
}
const createEvent = <T>({name, value, loading}: Props<T>): KatnissEvent<T>=>{
    return {
        value,
        isAsync: (blockForm = true)=>{
            loading.setLoading(name, true, blockForm);
            return ()=>{
              loading.setLoading(name, false, blockForm);
            }
          }
    }
}

export {createEvent};