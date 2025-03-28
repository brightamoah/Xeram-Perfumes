<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { onClickOutside, useColorMode } from '@vueuse/core'
import type { MenuItems } from '@/types/types'
import { useRouter } from 'vue-router'

const router = useRouter()
const mode = useColorMode()
const menuItems = ref<NavigationMenuItem[]>([
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Reviews', to: '/reviews' },
])

const mobileMenuItems = ref<MenuItems[]>([
  { label: 'Home', to: '/', route: { name: 'home' } },
  { label: 'Shop', to: '/shop', route: { name: 'shop' } },
  { label: 'About', to: '/about', route: { name: 'about' } },
  { label: 'Contact', to: '/contact', route: { name: 'contact' } },
  { label: 'Reviews', to: '/reviews', route: { name: 'reviews' } },
])

const mobileMenuOpen = ref<boolean>(false)
const activeLink = ref<string | null>('home')
const setActiveLink = () => {
  activeLink.value = (router.currentRoute.value.name as string) ?? 'home'
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const mobileNav = useTemplateRef<HTMLElement>('mobileNav')

onClickOutside(mobileNav, (event) => {
  if (window.innerWidth <= 768 && mobileMenuOpen.value) {
    const clickedInsideMobileNav =
      mobileNav.value &&
      mobileNav.value instanceof HTMLElement &&
      mobileNav.value.contains(event.target as Node)
    if (!clickedInsideMobileNav) {
      mobileMenuOpen.value = false
      console.log('Clicked outside')
    }
  }
})

const cartItemCount = ref<number>(10)

const displayCartItemCount = computed(() => {
  return cartItemCount.value > 99 ? '99+' : cartItemCount.value.toString()
})

watch(
  () => router.currentRoute.value.name,
  () => {
    setActiveLink()
    mobileMenuOpen.value = false
  },
  { immediate: true },
)

onMounted(() => {
  setActiveLink()
})
</script>

<template>
  <header class="sticky top-0 z-50 w-full">
    <nav
      class="flex w-full items-center justify-between px-2 py-2 border-gray-200 transition-all duration-300 shadow-md bg-(--ui-bg) dark:bg-(--ui-bg-muted)"
    >
      <MobileNav
        ref="mobileNav"
        :mobile-menu-open="mobileMenuOpen"
        :menu-items="mobileMenuItems"
        :active-link="activeLink as string"
        :set-active-link="setActiveLink"
        @toggleMobileMenu="toggleMobileMenu"
      />

      <LogoComponent />

      <section class="hidden md:flex justify-center flex-grow">
        <UNavigationMenu
          :items="menuItems"
          variant="link"
          color="neutral"
          :ui="{
            link: 'relative font-relaway text-lg transition-colors duration-300 hover:text-black dark:hover:text-white',
          }"
          class="w-full text-lg justify-center font-relaway"
        />
      </section>

      <section class="flex items-center gap-4 md:gap-10">
        <div>
          <UButton
            variant="link"
            color="neutral"
            to="/cart"
            :class="{
              'relative rounded-xl pr-5 cursor-pointer hover:bg-transparent': cartItemCount > 0,
              'relative rounded-xl cursor-pointer hover:bg-transparent': cartItemCount <= 0,
            }"
          >
            <UIcon name="i-lucide-shopping-cart" class="size-7 font-extrabold transition-colors" />
            <UBadge
              v-if="cartItemCount > 0"
              color="neutral"
              variant="solid"
              size="sm"
              class="absolute -top-2 right-1 rounded-full"
              :label="displayCartItemCount"
            />
          </UButton>

          <UButton
            color="neutral"
            variant="ghost"
            @click="mode = mode === 'dark' ? 'light' : 'dark'"
            class="rounded-xl dark:hover:bg-(--ui-bg) md:hidden"
          >
            <SunIcon v-if="mode === 'light'" class="size-6" />
            <MoonIcon v-else class="size-6" />
          </UButton>
        </div>

        <div class="hidden items-center gap-3 md:flex">
          <UButton
            variant="solid"
            color="neutral"
            to="/login"
            label="Login"
            class="rounded-full py-2 px-4 text-center font-medium font-bold shadow-md transition-all duration-200"
          />
          <UButton
            color="neutral"
            variant="ghost"
            @click="mode = mode === 'dark' ? 'light' : 'dark'"
            class="rounded-xl dark:hover:bg-(--ui-bg)"
          >
            <SunIcon v-if="mode === 'light'" class="size-6" />
            <MoonIcon v-else class="size-6" />
          </UButton>
        </div>
      </section>

      <!-- <div> -->

      <!-- </div> -->
    </nav>
  </header>
</template>

<style scoped></style>
