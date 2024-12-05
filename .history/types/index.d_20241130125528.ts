import type { ToastPluginApi } from "vue-toast-notification";

declare module '#app' {
    interface NuxtApp {
        $toast(ToastP): ToastPluginApi
    }
}