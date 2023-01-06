<script setup lang="ts">
defineProps<{
  secondary?: boolean;
  third?: boolean;
  href?: string;
  [key: string]: unknown;
}>();
</script>

<template>
  <button
    class="gap-3 items-center px-5 py-3 rounded font-bold text-center"
    :class="{
      'bg-red-500': !secondary,
      'text-white': !secondary,
      'border-2': secondary,
      'border-blue-600': secondary,
      'text-blue-600': secondary,
      flex: !third,
    }"
  >
    <slot />
  </button>
</template>
