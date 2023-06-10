
import { uniqueId } from 'lodash';
import {provide, inject} from 'vue';
import type { SemanticColor } from '../types';

export type Notification = {
    id: string;
    msg: string;
    type: SemanticColor;
    expiration: number;
}
type addNotification = (a:{
    msg: string,
    type: SemanticColor,
    secondsToLive?: number,
})=>void;

const useNotificationSymbol = Symbol();

const provideNotifications = (addNotification: (notification: Notification)=>void)=>{
    provide<addNotification>(useNotificationSymbol, notification=>{
        const seconds = notification.secondsToLive ?? 1000000000;
        addNotification({
            msg: notification.msg,
            type: notification.type,
            expiration: performance.now() + seconds * 1000,
            id: uniqueId(),
        })
    });
};

const useNotification = ()=>{
    return inject<addNotification>(useNotificationSymbol) ?? (()=>{});
}

export { useNotification, provideNotifications };