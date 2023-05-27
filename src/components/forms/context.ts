import {provide, inject, ref, type Ref} from 'vue';

const loadingSymbol = Symbol();
const LoadingContext = {
    provide: ()=>{
        const loadingList = ref<string[]>([]);
        provide(loadingSymbol, loadingList);
        return {
            isFormLoading(){
                return loadingList.value.length > 0;
            },
            isSelfLoading(){return false},
            setLoading(name: string, isLoading: boolean){
                loadingList.value = loadingList.value.filter(e=>e!==name);
                if (isLoading) {
                    loadingList.value.push(name);
                }
            }
        }
    },
    inject: ()=>{
        const loadingList = inject<Ref<string[]>>(loadingSymbol);
        const selfLoading = ref(false);
        return {
            isFormLoading(){
                return (loadingList?.value ?? []).length > 0;
            },
            isSelfLoading(name: string){
                return selfLoading.value || loadingList?.value.includes(name);
            },
            setLoading(name: string, isLoading: boolean, blockForm = true){
                selfLoading.value = isLoading;
                if (loadingList) {
                    loadingList.value = loadingList.value.filter(e=>e!==name);
                    if (isLoading && blockForm) {
                        loadingList.value.push(name);
                    }
                }
            }
        }
    },
}

export type InjectedLoadingContext = ReturnType<typeof LoadingContext.inject>

const validSymbol = Symbol();
const ValidContext = {
    provide: ()=>{
        const invalidList = ref<string[]>([]);
        provide(validSymbol, invalidList);
    },
    inject: ()=>{
        const invalidList = inject<Ref<string[]>>(validSymbol);
        return {
            isInvalid(name?: string){
                if (name) return invalidList?.value.includes(name);
                return (invalidList?.value ?? []).length > 0;
            },
            setValid(name: string, isValid: boolean){
                if (invalidList) {
                    invalidList.value = invalidList.value.filter(e=>e!==name);
                    if (!isValid) {
                        invalidList.value.push(name);
                    }
                }
            }
        }
    },
}

const disabledSymbol = Symbol();
const DisabledContext = {
    provide: ()=>{
        const disabled = ref(false);
        provide(disabledSymbol, disabled);
        return disabled;
    },
    inject: ()=>{
        const disabled = inject<Ref<boolean>>(disabledSymbol);
        return {
            isDisabled(){
                return disabled?.value;
            }
        }
    },
}

export { LoadingContext, ValidContext, DisabledContext };