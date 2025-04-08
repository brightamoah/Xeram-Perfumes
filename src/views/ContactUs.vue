<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: '',
})

// const name = ref('')
// const email = ref('')
// const message = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Log form data to the console as a table
    console.table(formData.value)

    successMessage.value = 'Thank you! Your message has been sent successfully.'
    formData.value = { name: '', email: '', message: '' }
  } catch (error) {
    console.error('Error submitting form:', error)
    errorMessage.value = 'Something went wrong. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="min-h-screen py-12">
    <div class="container mx-auto px-4 md:px-16">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
          Contact Us
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          We'd love to hear from you! Whether you have questions, feedback, or just want to say
          hello, reach out to us.
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <!-- Left Column: Image and Text -->
        <div class="space-y-8">
          <!-- Image -->
          <div class="relative h-64 w-full overflow-hidden rounded-xl shadow-lg md:h-96">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="Contact Us Image"
              class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <!-- Contact Info -->
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Get in Touch</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Xeram Perfumes<br />
              123 Fragrance Lane<br />
              Scent City, SC 45678
            </p>
            <p class="text-gray-600 dark:text-gray-300">
              Email: support@xeramperfumes.com<br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>

        <!-- Right Column: Form and Map -->
        <div class="space-y-8">
          <!-- Form -->
          <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <UForm :state="formData" @submit.prevent="handleSubmit" class="space-y-6">
              <UFormField label="Name" name="name" size="xl" required>
                <UInput
                  v-model="formData.name"
                  type="text"
                  placeholder="Enter Your Name"
                  color="neutral"
                  highlight
                  leading-icon="i-lucide-user"
                  autocomplete="name"
                  required
                  size="xl"
                  variant="outline"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="Email" name="email" size="xl" required>
                <UInput
                  v-model="formData.email"
                  type="email"
                  placeholder="Enter Your Email"
                  color="neutral"
                  highlight
                  leading-icon="i-lucide-mail"
                  autocomplete="email"
                  required
                  size="xl"
                  variant="outline"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="Message" name="message" size="xl" required>
                <UTextarea
                  v-model="formData.message"
                  placeholder="Enter Your Message"
                  color="neutral"
                  highlight
                  autoresize
                  autocomplete="message"
                  required
                  size="lg"
                  variant="outline"
                  class="w-full"
                />
              </UFormField>

              <div v-if="successMessage" class="text-center text-sm text-green-500">
                {{ successMessage }}
              </div>
              <div v-if="errorMessage" class="text-center text-sm text-red-500">
                {{ errorMessage }}
              </div>

              <div class="flex w-full items-center justify-center">
                <UButton
                  type="submit"
                  label="Send Message"
                  size="lg"
                  color="neutral"
                  variant="solid"
                  :loading="isLoading"
                  class="flex w-[70%] justify-center rounded-full py-3 shadow-md transition-all duration-300 hover:scale-103 hover:shadow-lg"
                />
              </div>
            </UForm>
          </div>

          <!-- Map -->
          <div class="mt-10 h-70 w-full overflow-hidden rounded-xl shadow-lg md:h-72">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15881.725547217631!2d-0.21527881284178213!3d5.6505620000000265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9c7ebaeabe93%3A0xd78257e67498c1a0!2sUniversity%20of%20Ghana!5e0!3m2!1sen!2sgh!4v1744121281177!5m2!1sen!2sgh"
              class="h-full w-full border-0"
              allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* No additional CSS needed as we're using Tailwind */
</style>
