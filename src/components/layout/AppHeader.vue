<template>
  <header class="app-header">
    <h1 class="logo">P<span class="letters">aradox</span>M<span class="letters">ap</span></h1>
    <VaultName />
    <VaultMenu />
  </header>
</template>

<script setup>
import VaultName from '@/components/layout/VaultName.vue'
import VaultMenu from '@/components/layout/VaultMenu.vue'
</script>

<style scoped>
.app-header {
  width: 100%;
  padding: var(--spacing-300) var(--spacing-400);
  border-bottom: 1px solid rgb(0 0 0 / 0.1);
  display: flex;
  justify-content: space-between;
}

@keyframes move-background {
  to {
    background-position: 100% 0;
  }
}

.logo {
  display: inline;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;

  --lightness: 45%;
  background: linear-gradient(
    90deg,
    hsl(0, 100%, calc(var(--lightness) * 1.3)),
    hsl(15, 100%, calc(var(--lightness) * 1.1)),
    hsl(35, 100%, calc(var(--lightness) * 1.02)),
    hsl(48, 100%, calc(var(--lightness) * 0.9)),
    hsl(60, 100%, calc(var(--lightness) * 0.76)),
    hsl(72, 100%, calc(var(--lightness) * 0.71)),
    hsl(90, 100%, calc(var(--lightness) * 0.7)),
    hsl(105, 100%, calc(var(--lightness) * 0.7)),
    hsl(120, 100%, calc(var(--lightness) * 0.695)),
    hsl(135, 100%, calc(var(--lightness) * 0.7)),
    hsl(150, 100%, calc(var(--lightness) * 0.7)),
    hsl(165, 100%, calc(var(--lightness) * 0.69)),
    hsl(180, 100%, calc(var(--lightness) * 0.65)),
    hsl(195, 80%, calc(var(--lightness) * 0.85)),
    hsl(215, 75%, calc(var(--lightness) * 1.25)),
    hsl(225, 100%, calc(var(--lightness) * 1.4)),
    hsl(240, 100%, calc(var(--lightness) * 1.48)),
    hsl(255, 100%, calc(var(--lightness) * 1.44)),
    hsl(270, 100%, calc(var(--lightness) * 1.35)),
    hsl(285, 100%, calc(var(--lightness) * 1.15)),
    hsl(300, 90%, calc(var(--lightness) * 0.89)),
    hsl(315, 80%, calc(var(--lightness) * 0.98)),
    hsl(330, 90%, calc(var(--lightness) * 1.12)),
    hsl(345, 95%, calc(var(--lightness) * 1.21)),
    hsl(360, 100%, calc(var(--lightness) * 1.3)),
    hsl(345, 95%, calc(var(--lightness) * 1.21)),
    hsl(330, 90%, calc(var(--lightness) * 1.12)),
    hsl(315, 80%, calc(var(--lightness) * 0.98)),
    hsl(300, 90%, calc(var(--lightness) * 0.89)),
    hsl(285, 100%, calc(var(--lightness) * 1.15)),
    hsl(270, 100%, calc(var(--lightness) * 1.35)),
    hsl(255, 100%, calc(var(--lightness) * 1.44)),
    hsl(240, 100%, calc(var(--lightness) * 1.48)),
    hsl(225, 100%, calc(var(--lightness) * 1.4)),
    hsl(215, 75%, calc(var(--lightness) * 1.25)),
    hsl(195, 80%, calc(var(--lightness) * 0.85)),
    hsl(180, 100%, calc(var(--lightness) * 0.65)),
    hsl(165, 100%, calc(var(--lightness) * 0.69)),
    hsl(150, 100%, calc(var(--lightness) * 0.7)),
    hsl(135, 100%, calc(var(--lightness) * 0.7)),
    hsl(120, 100%, calc(var(--lightness) * 0.695)),
    hsl(105, 100%, calc(var(--lightness) * 0.7)),
    hsl(90, 100%, calc(var(--lightness) * 0.7)),
    hsl(72, 100%, calc(var(--lightness) * 0.71)),
    hsl(60, 100%, calc(var(--lightness) * 0.76)),
    hsl(48, 100%, calc(var(--lightness) * 0.9)),
    hsl(35, 100%, calc(var(--lightness) * 1.02)),
    hsl(15, 100%, calc(var(--lightness) * 1.1)),
    hsl(0, 100%, calc(var(--lightness) * 1.3)),
    hsl(15, 100%, calc(var(--lightness) * 1.1)),
    hsl(35, 100%, calc(var(--lightness) * 1.02)),
    hsl(48, 100%, calc(var(--lightness) * 0.9)),
    hsl(60, 100%, calc(var(--lightness) * 0.76)),
    hsl(72, 100%, calc(var(--lightness) * 0.71)),
    hsl(90, 100%, calc(var(--lightness) * 0.7)),
    hsl(105, 100%, calc(var(--lightness) * 0.7)),
    hsl(120, 100%, calc(var(--lightness) * 0.695)),
    hsl(135, 100%, calc(var(--lightness) * 0.7)),
    hsl(150, 100%, calc(var(--lightness) * 0.7)),
    hsl(165, 100%, calc(var(--lightness) * 0.69)),
    hsl(180, 100%, calc(var(--lightness) * 0.65)),
    hsl(195, 80%, calc(var(--lightness) * 0.85)),
    hsl(215, 75%, calc(var(--lightness) * 1.25)),
    hsl(225, 100%, calc(var(--lightness) * 1.4)),
    hsl(240, 100%, calc(var(--lightness) * 1.48)),
    hsl(255, 100%, calc(var(--lightness) * 1.44)),
    hsl(270, 100%, calc(var(--lightness) * 1.35)),
    hsl(285, 100%, calc(var(--lightness) * 1.15)),
    hsl(300, 90%, calc(var(--lightness) * 0.89)),
    hsl(315, 80%, calc(var(--lightness) * 0.98)),
    hsl(330, 90%, calc(var(--lightness) * 1.12)),
    hsl(345, 95%, calc(var(--lightness) * 1.21))
  );
  background-size: 300%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  animation: move-background 20s linear infinite;
}

@media screen and (max-width: 500px) {
  .letters {
    display: none;
  }
}
</style>
