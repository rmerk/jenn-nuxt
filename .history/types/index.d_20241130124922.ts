declare module '#app' {
    interface NuxtApp {
        $hello(msg: string): string
    }
}