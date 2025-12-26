<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/common/AppHeader.vue';
</script>

<template>
  <div class="app-container">
    <div class="fluid-bg"></div>
    <AppHeader />
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.fluid-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.05;
}

.fluid-bg::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(102, 126, 234, 0.3) 0%,
    transparent 70%
  );
  animation: fluidMove 20s ease-in-out infinite;
}

@keyframes fluidMove {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30%, -30%) scale(1.1);
  }
  66% {
    transform: translate(-20%, 20%) scale(0.9);
  }
}

.main-content {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
