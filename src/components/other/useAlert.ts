
import { uniqueId } from 'lodash';
import {provide, inject} from 'vue';

export type Alert = {
    msg: string;
    type: 'alert' | 'prompt';
    callback: (result: boolean)=>void;
}
type addAlert = (a:(Omit<Alert,'id'>))=>void;

const useAlertSymbol = Symbol();

const provideAlerts = (addAlert: (alert: Alert)=>void)=>{
    provide<addAlert>(useAlertSymbol, addAlert);
};

const useAlert = ()=>{
    const addAlert = inject<addAlert>(useAlertSymbol) ?? (()=>{});
    return {
        alert: (msg: string)=>{
            return new Promise<void>(resolve=>{
                addAlert({
                    msg,
                    type: 'alert',
                    callback: ()=>resolve(),
                });
            });
        },
        prompt: (msg: string)=>{
            return new Promise<boolean>(callback=>{
                addAlert({
                    msg,
                    type: 'prompt',
                    callback
                });
            });
        },
    }
}

export { useAlert, provideAlerts };