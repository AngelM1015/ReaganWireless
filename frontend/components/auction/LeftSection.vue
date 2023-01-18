<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {
  console.log('Mounted')
})
function increment() {
  alert('clicked')
  console.log('clicked')
}
</script>

<template>
  <div>
    <h1>Test</h1>
    <button @click="increment()" class="abc">click</button>
  </div>
</template>
