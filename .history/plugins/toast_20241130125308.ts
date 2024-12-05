import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css';

export default defineNuxtPlugin((nuxtApp) => {
  const toast(props: ) = useToast({
    ...params
  })

  return nuxtApp.provide('toast', toast)
})