<template>
  <div class="bg-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-extrabold text-amber-800 text-center">Contact Us</h1>
        
        <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Visit Our Bakery</h2>
            <div class="mt-4">
              <p class="text-gray-600">123 Bakery Street</p>
              <p class="text-gray-600">Sweet Town, ST 12345</p>
              <p class="mt-4 text-gray-600">Phone: (555) 123-4567</p>
              <p class="text-gray-600">Email: hello@sweetdelights.com</p>
            </div>

            <h2 class="mt-8 text-xl font-semibold text-gray-900">Hours</h2>
            <div class="mt-4">
              <p class="text-gray-600">Monday - Friday: 7am - 7pm</p>
              <p class="text-gray-600">Saturday - Sunday: 8am - 5pm</p>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              >
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              >
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
              <textarea 
                id="message" 
                v-model="form.message"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              ></textarea>
            </div>

            <button 
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = async () => {
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })
    // Reset form and show success message
    form.value = {
      name: '',
      email: '',
      message: ''
    }
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
</script>