import type { ToastPluginApi, ToastProps } from "vue-toast-notification";

declare module '#app' {
    interface NuxtApp {
        $toast(props: Partial<ToastProps>): ToastPluginApi
    }
}