import { useToast, type ToastProps } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css';

export default defineNuxtPlugin((nuxtApp) => {
  const toast(props: ToastProps) = useToast()

  return nuxtApp.provide('toast', toast)
})