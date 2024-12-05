import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css';

export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast({
    position: 'top-center',
  })

  return nuxtApp.provide('toast', toast)
})