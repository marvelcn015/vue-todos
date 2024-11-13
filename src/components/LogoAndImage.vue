<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside>
    <RouterLink to="/login">
      <img src="/src/assets/images/logo.webp" alt="Web Logo" class="logo" />
    </RouterLink>
    <img
      src="/src/assets/images/login-and-register.webp"
      alt="Decoration Image"
      class="hide-on-mobile"
    />
  </aside>
</template>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 386px;
  max-height: 448px;
}

aside img {
  width: 100%;
}

.logo {
  max-width: 312px;
}

@media (max-width: 576px) {
  aside {
    width: auto;
    height: auto;
  }

  .hide-on-mobile {
    display: none;
  }
}
</style>
