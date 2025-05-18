<template>
  <q-layout view="lHh Lpr lFf" class="layout-dark">
    <q-header elevated class="header-glass">
      <div class="row items-center q-gutter-sm q-mb-md q-mt-sx">
        <div>
          <q-toolbar-title class="title" @click="animateLightning">
            <span class="lightning" :class="{ active: isActive }">⚡</span>
            <span class="letter-r"> Rick and Morty </span>
          </q-toolbar-title>
        </div>

        <div class="language-switcher items-center flex q-gutter-sm q-mr-md">
          <span class="language-label">{{ $t('language') }}</span>

          <q-btn
            flat
            dense
            round
            @click="setLocale('pt')"
            :class="{ active: currentLocale === 'pt' }"
            class="flag-btn"
            icon="img:https://flagcdn.com/w40/br.png"
            aria-label="Português"
          />

          <q-btn
            flat
            dense
            round
            @click="setLocale('en')"
            :class="{ active: currentLocale === 'en' }"
            class="flag-btn"
            icon="img:https://flagcdn.com/w40/us.png"
            aria-label="English"
          />
        </div>
      </div>
    </q-header>

    <q-page-container class="page-bg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { i18n } from 'src/boot/i18n';
import { ref, computed } from 'vue';

const isActive = ref(false);

function animateLightning() {
  isActive.value = true;
  setTimeout(() => {
    isActive.value = false;
  }, 600);
}

const currentLocale = computed(() => i18n.global.locale.value);

function setLocale(lang: 'pt' | 'en') {
  i18n.global.locale.value = lang;
}
</script>

<style scoped>
.layout-dark {
  background: radial-gradient(circle at center, #0f0f14 0%, #050511 90%);
  color: #00fff7;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header-glass {
  background: rgba(10, 10, 20, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #00fff7;
  box-shadow:
    0 0 15px #00fff7,
    0 0 30px #00fff7,
    0 0 45px #00fff7;
}

.page-bg {
  background: #0a0a0a;
  padding: 20px;
  min-height: 100vh;
}

.title {
  font-weight: 900;
  font-size: 1.9rem;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #00fff7;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}

.letter-r {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-right: 3px;
}

.lightning {
  font-size: 1.4rem;
  margin-left: 4px;
  color: #00fff7;
  opacity: 0.6;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  user-select: none;
}

.lightning.active {
  opacity: 1;
  transform: scale(1.5) rotate(15deg);
  filter: drop-shadow(0 0 8px #00fff7);
  animation: flashLightning 0.6s ease forwards;
}

@keyframes flashLightning {
  0% {
    opacity: 0.6;
    transform: scale(1) rotate(0deg);
    filter: drop-shadow(0 0 0 #00fff7);
  }
  50% {
    opacity: 1;
    transform: scale(1.7) rotate(20deg);
    filter: drop-shadow(0 0 15px #00fff7);
  }
  100% {
    opacity: 0.6;
    transform: scale(1) rotate(0deg);
    filter: drop-shadow(0 0 0 #00fff7);
  }
}

.language-switcher {
  margin-left: auto;
}

.language-label {
  font-size: 0.85rem;
  color: #00fff7;
  opacity: 0.75;
  font-weight: bold;
  margin-right: 4px;
}

.flag-btn {
  border: 2px solid transparent;
  transition:
    border 0.3s,
    box-shadow 0.3s;
}

.flag-btn.active {
  border-color: #00fff7;
  box-shadow: 0 0 6px #00fff7;
}
</style>
