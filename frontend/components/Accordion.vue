<script setup lang="ts">
export interface AccordionItem {
  title: string;
  content: string;
}

defineProps<{
  items: AccordionItem[];
}>();

/// STATE ///
const activeIndex = ref<number>(0);

function toggle(index: number) {
  if (index === activeIndex.value) {
    activeIndex.value = -1;
    return;
  }
  activeIndex.value = index;
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <div
      v-for="(item, index) of items"
      :key="item.title"
      class="flex flex-col w-full p-4 lg:p-5 border-b"
      :class="{
        'bg-red-primary rounded-md': activeIndex === index,
      }"
    >
      <div class="flex gap-2 ">
        <h1
          class="font-bold grow text-left  mb-2 p-1 md:p-2 text-sm md:text-base font-semibold"
          :class="{
            'text-white': activeIndex === index,
            'text-gray-500': activeIndex !== index,
          }"
        >
          {{ item.title }}
        </h1>
        <button
          class="text-white grid place-content-center"
          :class="{
            'text-white': activeIndex === index,
            'text-gray-600': activeIndex !== index,
          }"
          @click="toggle(index)"
        >
          <div
            class="text-xl"
            :class="{
              'i-mdi-expand-more': activeIndex !== index,
              'i-mdi-expand-less': activeIndex === index,
            }"
          ></div>
        </button>
      </div>
      <div class="text-red-100 text-left text-sm md:text-base p-1 md:p-2" v-if="activeIndex === index">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>
