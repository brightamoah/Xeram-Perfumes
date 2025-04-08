<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { onClickOutside, useColorMode } from '@vueuse/core'
import type { MenuItems } from '@/types/types'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/ProductStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const mode = useColorMode()
const productStore = useProductStore()
const { cartItemsCount } = storeToRefs(productStore)

const menuItems = ref<NavigationMenuItem[]>([
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Reviews', to: '/reviews' },
])

const mobileMenuItems = ref<MenuItems[]>([
  { label: 'Home', route: { name: 'home' } },
  { label: 'Shop', route: { name: 'shop' } },
  { label: 'About', route: { name: 'about' } },
  { label: 'Contact', route: { name: 'contact' } },
  { label: 'Reviews', route: { name: 'reviews' } },
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

const displayCartItemCount = computed(() => {
  return cartItemsCount.value > 99 ? '99+' : cartItemsCount.value.toString()
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
      class="flex w-full items-center justify-between border-gray-200 bg-(--ui-bg) px-2 py-2 shadow-md transition-all duration-300 dark:bg-(--ui-bg-muted)"
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

      <section class="hidden flex-grow justify-center md:flex">
        <UNavigationMenu
          :items="menuItems"
          variant="link"
          color="neutral"
          :ui="{
            link: 'relative font-relaway text-lg transition-colors duration-300 hover:text-black dark:hover:text-white',
          }"
          class="w-full justify-center font-relaway text-lg"
        />
      </section>

      <section class="flex items-center gap-4 md:gap-10">
        <div>
          <UButton
            variant="link"
            to="/cart"
            color="neutral"
            class="relative cursor-pointer rounded-xl p-2 text-(--ui-text-highlighted) hover:bg-transparent"
          >
            <UIcon name="i-lucide-shopping-cart" class="size-7 font-bold transition-colors" />
            <UBadge
              v-if="cartItemsCount > 0"
              color="neutral"
              variant="solid"
              size="sm"
              class="absolute top-0 right-0 flex h-[20px] min-w-[20px] items-center justify-center rounded-full px-1 text-xs"
              :label="displayCartItemCount"
            />
          </UButton>

          <UButton
            color="neutral"
            variant="ghost"
            @click="mode = mode === 'dark' ? 'light' : 'dark'"
            class="rounded-xl md:hidden dark:hover:bg-(--ui-bg)"
          >
            <SunIcon v-if="mode === 'light'" class="size-7" />
            <MoonIcon v-else class="size-6" />
          </UButton>
        </div>

        <div class="hidden items-center gap-3 md:flex">
          <UButton
            variant="solid"
            color="neutral"
            to="/login"
            label="Login"
            class="rounded-full px-4 py-2 text-center font-bold shadow-md transition-all duration-200"
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
