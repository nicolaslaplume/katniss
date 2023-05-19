import type { InjectedLoadingContext } from "./context";

type KatnissEvent<T> = {
    isAsync: ()=>()=>void;
}

type Props<T> = {
    name: string,
    value: T,
    loading: InjectedLoadingContext,
}
const createEvent = <T>({name, value, loading}: Props<T>)=>{
    return {
        value,
        isAsync: ()=>{
            loading.setLoading(name, true);
            return ()=>{
              loading.setLoading(name, false);
            }
          }
    }
}

export {createEvent};