declare module '#app' {
    interface NuxtApp {
        $toast(msg: string): string
    }
}