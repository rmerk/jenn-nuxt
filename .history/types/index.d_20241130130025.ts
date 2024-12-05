import type { ToastPluginApi, ToastProps } from "vue-toast-notification";

declare module '#app' {
    interface NuxtApp {
        readonly $toast: ToastPluginApi;
    }
}