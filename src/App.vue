<script setup>
import { computed } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import LocaleSwitcher from "./components/LocaleSwitcher.vue";
import Aside from "./components/Aside.vue";

const route = useRoute();
const currentName = computed(() => route.name);
</script>

<template>
  <perfect-scrollbar>
    <Header />
    <div class="main-container">
      <RouterView />
    </div>
    <Aside class="aside aside--main" />
    <LocaleSwitcher class="locale" />
  </perfect-scrollbar>
</template>

<style lang="scss">
html,
body {
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
.ps {
  max-height: 100vh;
  .ps__thumb-y {
    opacity: 0;
    transition: background-color 0.2s linear, width 0.2s ease-in-out,
      opacity 0.2s ease-in-out;
  }
  &--scrolling-y {
    .ps__thumb-y {
      opacity: 1;
    }
  }
}
</style>

<style scoped lang="scss">
.main-container {
  max-width: calc(525px + 40px);
  margin: 20px auto 0;
  width: 100%;
  padding: 0px 20px 60px;
  @include screen(1199.98px) {
    max-width: calc(620px + 40px);
  }
}
.aside {
  position: fixed;
  top: 140px;
  left: 40px;
  &--main {
    top: 125px;
  }
  @include screen(1199.98px) {
    display: none;
  }
}
.locale {
  position: fixed;
  bottom: 40px;
  left: 40px;
  @include screen(1199.98px) {
    display: none;
  }
}
</style>
<style lang="scss">
body {
  background: var(--color-dynamic-white);
}
</style>
