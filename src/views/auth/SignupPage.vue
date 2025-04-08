<template>
  <div class="flex min-h-[80dvh] flex-col justify-center px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
    <div class="mt-4 w-full sm:mx-auto sm:mt-8 sm:w-[90%] sm:max-w-md md:w-[80%] lg:w-[70%]">
      <div
        class="rounded-lg px-4 py-6 shadow-lg sm:rounded-lg sm:px-8 sm:py-8 md:px-10 dark:bg-(--ui-bg-muted)"
      >
        <div class="mb-4 sm:mx-auto sm:mb-6 sm:w-full sm:max-w-md">
          <h2 class="text-center text-xl font-bold sm:text-2xl">Join Xeram Today!</h2>
          <p class="text-center text-sm sm:text-base">Create a new account</p>
        </div>

        <UForm :state="state" class="space-y-4 sm:space-y-6" @submit.prevent="handleSignup">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <UFormField
                label="First Name"
                name="firstName"
                size="xl"
                required
                class="mt-1 block text-base font-medium"
              >
                <UInput
                  id="firstName"
                  v-model="state.firstName"
                  name="firstName"
                  type="text"
                  color="neutral"
                  highlight
                  leading-icon="i-lucide-user"
                  autocomplete="given-name"
                  size="xl"
                  placeholder="First name"
                  required
                  class="block w-full rounded-full"
                />
              </UFormField>
            </div>

            <div>
              <UFormField
                label="Last Name"
                name="lastName"
                required
                size="xl"
                class="mt-1 block text-base font-medium"
              >
                <UInput
                  id="lastName"
                  v-model="state.lastName"
                  name="lastName"
                  type="text"
                  color="neutral"
                  highlight
                  leading-icon="i-lucide-user"
                  autocomplete="family-name"
                  size="xl"
                  placeholder="Last name"
                  required
                  class="block w-full rounded-full"
                />
              </UFormField>
            </div>
          </div>

          <div>
            <UFormField
              label="Email"
              name="email"
              required
              size="xl"
              class="mt-1 block text-base font-medium"
            >
              <UInput
                id="email"
                v-model="state.email"
                name="email"
                type="email"
                color="neutral"
                highlight
                leading-icon="i-lucide-mail"
                autocomplete="email"
                size="xl"
                placeholder="Enter your email"
                required
                class="block w-full rounded-full"
              />
            </UFormField>
          </div>

          <div>
            <UFormField
              name="password"
              label="Password"
              required
              size="xl"
              class="mt-1 block text-base font-medium"
            >
              <UInput
                id="password"
                v-model="state.password"
                name="password"
                color="neutral"
                highlight
                size="xl"
                placeholder="Create a password"
                leading-icon="i-lucide-lock"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                class="block w-full rounded-full"
                :ui="{ trailing: 'pe-1 ' }"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="xl"
                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    :aria-pressed="showPassword"
                    aria-controls="password"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </UInput>
            </UFormField>
          </div>

          <div>
            <UFormField
              name="confirmPassword"
              label="Confirm Password"
              required
              size="xl"
              class="mt-1 block text-base font-medium"
            >
              <UInput
                id="confirmPassword"
                v-model="state.confirmPassword"
                name="confirmPassword"
                color="neutral"
                highlight
                size="xl"
                placeholder="Confirm your password"
                leading-icon="i-lucide-shield-check"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                class="block w-full rounded-full"
                :ui="{ trailing: 'pe-1 ' }"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="xl"
                    :icon="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
                    :aria-pressed="showConfirmPassword"
                    aria-controls="confirmPassword"
                    @click="showConfirmPassword = !showConfirmPassword"
                  />
                </template>
              </UInput>
            </UFormField>
            <p v-if="passwordMismatch" class="mt-1 text-xs text-red-600">Passwords do not match</p>
          </div>

          <div class="mt-5 flex items-center">
            <UCheckbox
              v-model="state.agreeToTerms"
              size="sm"
              sm:size="md"
              color="neutral"
              label="I agree to the Terms of Service and Privacy Policy"
              required
              :ui="{
                base: 'w-4 sm:w-5 h-4 sm:h-5 border-2 ring-(--ui-border-inverted) rounded-md',
                label: 'text-xs sm:text-sm',
              }"
            />
          </div>

          <div class="mt-4 flex items-center justify-center sm:mt-6">
            <UButton
              type="submit"
              color="neutral"
              variant="solid"
              label="Create Account"
              :loading="isLoading"
              size="xl"
              trailing-icon="i-lucide-user-plus"
              :disabled="!formIsValid"
              class="flex w-full items-center justify-center rounded-full border border-(--ui-border) bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-[85%] sm:py-2.5 sm:text-base md:w-[70%] dark:bg-white dark:text-black"
            />
          </div>
        </UForm>

        <div class="mt-4">
          <div class="relative">
            <USeparator
              label="OR"
              size="xs"
              :ui="{
                border: 'border-(--ui-border-inverted)',
              }"
            />
          </div>

          <div class="mt-4 flex items-center justify-center sm:mt-6">
            <UButton
              color="neutral"
              variant="solid"
              label="Sign up with Google"
              class="flex w-full cursor-pointer justify-center rounded-full bg-black px-4 py-3 text-center text-sm font-semibold shadow-md transition-all duration-200 sm:w-[85%] sm:py-2.5 sm:text-base md:w-[70%] dark:bg-white dark:text-black"
              leading-icon="i-logos-google-icon"
              trailing-icon="i-lucide-arrow-right"
            />
          </div>
        </div>

        <p class="mt-4 text-center text-sm sm:mt-6 sm:text-sm">
          Already have an account?
          <router-link :to="{ name: 'login' }" class="ml-1 text-base font-semibold underline">
            Log In
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
})

const isLoading = ref(false)

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const passwordMismatch = computed(() => {
  return (
    state.value.password &&
    state.value.confirmPassword &&
    state.value.password !== state.value.confirmPassword
  )
})

const formIsValid = computed(() => {
  return (
    state.value.firstName &&
    state.value.lastName &&
    state.value.email &&
    state.value.password &&
    state.value.confirmPassword &&
    state.value.password === state.value.confirmPassword &&
    state.value.agreeToTerms
  )
})

const handleSignup = async () => {
  isLoading.value = true
  try {
    // Simulate sending data to a server
    console.table(state.value)
    await new Promise((resolve) => setTimeout(resolve, 5000)) // Simulate network delay

    // Simulate successful login and redirect
    // In a real app, you'd verify credentials first
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
