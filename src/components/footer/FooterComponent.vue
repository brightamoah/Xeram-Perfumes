<script setup lang="ts">
import { useDateFormat, useNow, useWindowScroll } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import InstagramIcon from "@/components/icons/InstagramIcon.vue";
import WhatsAPP from "@/components/icons/WhatsAPP.vue";
import FaceBook from "@/components/icons/FaceBook.vue";
import TwitterIcon from "@/components/icons/TwitterIcon.vue";

const route = useRoute();
const router = useRouter();

// Use VueUse for scrolling with smooth behavior
const { y } = useWindowScroll({ behavior: 'smooth' });

function scrollToTop() {
  y.value = 0;
}

function handleNav(e: Event, to: string) {
  if (to.startsWith('/#')) {
    e.preventDefault();
    const targetId = to.substring(2);
    
    // Let Vue Router handle the URL and state update
    router.push({ path: '/', hash: '#' + targetId }).then(() => {
      // Short delay to ensure DOM is ready, especially if coming from another page
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          // Calculate target position and offset by 100px for fixed navbar
          const top = el.getBoundingClientRect().top + window.scrollY - 100;
          
          // Scroll using VueUse
          y.value = top;
        }
      }, 150);
    });
  }
}

const currentYear = useDateFormat(useNow(), "YYYY");

const exploreLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/#collection" },
];

const infoLinks = [
  { label: "Why Choose Us", to: "/#why-choose" },
  { label: "Delivery", to: "/#delivery" },
  { label: "FAQ", to: "/#faq" },
];

const supportLinks = [
  { label: "Contact", to: "/contact" },
];

const socials = [
  { component: InstagramIcon, href: "#", iconClass: "size-4" },
  { component: WhatsAPP, href: "#", iconClass: "size-4" },
  { component: FaceBook, href: "#", iconClass: "size-4" },
  { component: TwitterIcon, href: "#", iconClass: "size-5" },
];
</script>

<template>
  <footer class="bg-ivory-950 w-full overflow-hidden footer-luxury">
    <!-- Gold top border -->
    <div class="gold-divider-full" />

    <!-- Main footer content -->
    <div class="mx-auto max-w-6xl">
      <!-- Logo + tagline -->
      <div class="mb-10 text-center">
        <RouterLink
          to="/"
          class="inline-block mb-4"
        >
          <img
            src="https://framerusercontent.com/images/sQCmgYexIataswnwC1ra5wB4nNc.png"
            alt="Xeram Perfumes"
            class="brightness-0 invert mx-auto w-auto h-18 object-contain"
          >
        </RouterLink>

        <div class="mx-auto mb-6 gold-divider" />

        <p class="font-light text-ivory-500 text-xs uppercase tracking-[0.4em]">
          Crafted for the connoisseur
        </p>
      </div>

      <!-- Nav links -->
      <nav class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-16 max-w-3xl mx-auto">
        <!-- Explore Group -->
        <div class="flex flex-col items-center gap-5">
          <h4 class="text-gold-500 text-[10px] uppercase tracking-[0.4em] font-medium mb-1 relative after:content-[''] after:block after:w-4 after:h-px after:bg-gold-500/50 after:mx-auto after:mt-3">Explore</h4>
          <RouterLink
            v-for="link in exploreLinks"
            :key="link.label"
            :to="link.to"
            class="font-light text-ivory-500 hover:text-gold-500 text-xs uppercase tracking-[0.3em] transition-colors duration-300 footer-link inline-block"
            @click="handleNav($event, link.to)"
          >
            {{ link.label }}
          </RouterLink>
        </div>

        <!-- Information Group -->
        <div class="flex flex-col items-center gap-5">
          <h4 class="text-gold-500 text-[10px] uppercase tracking-[0.4em] font-medium mb-1 relative after:content-[''] after:block after:w-4 after:h-px after:bg-gold-500/50 after:mx-auto after:mt-3">Information</h4>
          <RouterLink
            v-for="link in infoLinks"
            :key="link.label"
            :to="link.to"
            class="font-light text-ivory-500 hover:text-gold-500 text-xs uppercase tracking-[0.3em] transition-colors duration-300 footer-link inline-block"
            @click="handleNav($event, link.to)"
          >
            {{ link.label }}
          </RouterLink>
        </div>

        <!-- Support Group -->
        <div class="flex flex-col items-center gap-5">
          <h4 class="text-gold-500 text-[10px] uppercase tracking-[0.4em] font-medium mb-1 relative after:content-[''] after:block after:w-4 after:h-px after:bg-gold-500/50 after:mx-auto after:mt-3">Support</h4>
          <RouterLink
            v-for="link in supportLinks"
            :key="link.label"
            :to="link.to"
            class="font-light text-ivory-500 hover:text-gold-500 text-xs uppercase tracking-[0.3em] transition-colors duration-300 footer-link inline-block"
            @click="handleNav($event, link.to)"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </nav>

      <!-- Social icons -->
      <div class="flex justify-center items-center gap-6 mb-16">
        <a
          v-for="(social, index) in socials"
          :key="index"
          :href="social.href"
          class="group social-icon"
        >
          <component
            :is="social.component"
            :class="[social.iconClass, 'text-ivory-500 group-hover:text-gold-500 transition-colors duration-300']"
          />
        </a>
      </div>

      <!-- Bottom bar -->
      <div class="mb-8 gold-divider-full" />

      <div class="flex sm:flex-row flex-col justify-between items-center gap-4 mb-5">
        <p class="font-light text-[10px] text-ivory-500/60 uppercase tracking-[0.2em]">
          © {{ currentYear }} Xeram Perfumes. All rights reserved.
        </p>

        <button
          class="group back-to-top flex items-center gap-2 font-light text-[10px] text-ivory-500 hover:text-gold-500 uppercase tracking-[0.3em] transition-colors duration-300"
          @click="scrollToTop"
        >
          <span>Back to Top</span>

          <span class="back-to-top-arrow text-gold-500 transition-transform group-hover:-translate-y-1 duration-300">↑</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-luxury {
  background-color: #0a0a0a;
}

.text-gold-500 {
  color: #c9a84c;
}
.text-ivory-500 {
  color: #888888;
}
.bg-ivory-950 {
  background-color: #0a0a0a;
}

.gold-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}
.gold-divider-full {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.25), transparent);
}

.social-icon {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(201, 168, 76, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
}
.social-icon:hover {
  border-color: rgba(201, 168, 76, 0.4);
  background-color: rgba(201, 168, 76, 0.05);
}

.footer-link {
  position: relative;
}
.footer-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: #c9a84c;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-link:hover::after {
  transform: scaleX(1);
}

.back-to-top {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
