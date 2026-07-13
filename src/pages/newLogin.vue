<script setup lang="ts">
// import * as z from 'zod'
import type { AuthFormField } from "@nuxt/ui";

const toast = useToast();

const fields: AuthFormField[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "name@example.com",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    required: true,
  },
  {
    name: "remember",
    label: "Remember me",
    type: "checkbox",
    color: "neutral",
    ui: {
      base: "cursor-pointer",
      label: "cursor-pointer",
    },
  },
];

const providers = [{
  label: "Google",
  icon: "i-logos-google-icon",
  color: "neutral",
  class: "bg-black shadow-md px-4 py-3 sm:py-2.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:bg-black/80 cursor-pointer mx-auto w-[70%] sm:w-[80%] flex justify-center",
  onClick: () => {
    toast.add({
      title: "Google",
      description: "Login with Google",
      color: "primary",
      duration: 5000,
    });
  },
}];

// const schema = z.object({
//   email: z.email('Invalid email'),
//   password: z.string('Password is required').min(8, 'Must be at least 8 characters')
// })

// type Schema = z.output<typeof schema>

// function onSubmit(payload: FormSubmitEvent<Schema>) {
//   console.log('Submitted', payload)
// }
const submitProps = {
  label: "Log In",
  color: "neutral",
  icon: "i-lucide-log-in",
  class: "bg-black shadow-md px-4 py-3 sm:py-2.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:bg-black/80 cursor-pointer mx-auto w-[70%] sm:w-[80%] flex justify-center items-center mt-4",
};
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4 bg-black/50 bg-blend-overlay bg-cover bg-no-repeat bg-center p-4 md:p-16 min-h-screen page-bg">
    <UPageCard class="bg-neutral-200 shadow-lg rounded-xl w-full max-w-sm">
      <UAuthForm
        title=" Join Xeram Today!"
        :fields="fields"
        :providers="providers"
        :submit="submitProps"
        :separator="{
          size: 'xs',
          label: 'OR',
          color: 'primary',
          class: 'text-highlighted',
        }"
        :ui="{
          title: 'font-newsreader',
        }"
      >
        <template #footer>
          <p class="text-muted text-sm text-center">
            Already have an account?
            <ULink
              to="/login"
              class="font-semibold text-primary hover:underline"
            >
              Log In
            </ULink>
          </p>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>

<style scoped>
.page-bg {
  background-image: url("./img/about.webp");
}

:deep(input),
:deep(.luxury-input) {
  background: var(--color-ivory-200) !important;
}
</style>
