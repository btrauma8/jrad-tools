import { RealTimerClient } from "./rt3-client";

export interface CFDCfg {
    readonly app:string;
    readonly storagePrefix:string;
    readonly apiBaseUrl:string;
    // readonly rtc?:RealTimerClient;
    readonly rtc?:RealTimerClient;
    readonly token?:string;
}

export let cfg:CFDCfg = {
    app: '', //  default app. you can stilla access other app cfd stuff though.
    storagePrefix: 'default',
    token: 'none',
    apiBaseUrl: 'none'
}

interface InitCloudFileDbProps {
    readonly defaultApp:string;
    readonly storagePrefix:string;
    readonly webSocketUrl?:string;
    readonly apiBaseUrl:string;
}

export const initCloudFileDb = ({
    defaultApp,
    storagePrefix,
    apiBaseUrl,
    webSocketUrl
}:InitCloudFileDbProps) => {
    // const rtc = webSocketUrl ? createChanneledWsClient(webSocketUrl) : undefined;
    const rtc = webSocketUrl ? new RealTimerClient(webSocketUrl) : undefined;
    console.log('RTC', webSocketUrl, rtc ? 'yes' : 'no');
    cfg = {
        app:defaultApp,
        storagePrefix,
        apiBaseUrl,
        token: localStorage[storagePrefix + ':token'],
        rtc
    }
    return cfg;
}

export const getCloudFileDbToken = () => cfg.token;

export const setCloudFileDbToken = (_token:string) => {
    localStorage[cfg.storagePrefix + ':token'] = _token;
    cfg = {
        ...cfg,
        token: _token
    }
}