<script setup lang="ts">
const imgNo = ref<number>(0);

const changeImgNo = (index: number) => {
  imgNo.value = index;
};

const props = defineProps<{
  carousel?: boolean;
  title: string;
  type: string;
  originalPrice: number;
  price: number;
  productInfo: any;
}>();

const photoTypes = Object.keys(JSON.parse(props.productInfo.Photos));
const photoUrls = Object.values(JSON.parse(props.productInfo.Photos));

const goToProductDetail = (name: string) => {
  return navigateTo(`/my/${name}`);
};
</script>

<template>
  <article
    class="m-1 bg-white p-5 border rounded-xl border-gray-300 shadow-lg flex flex-col gap-3 relative hover:border-green-700 cursor-pointer"
    :class="{
      'h-[98%]': carousel,
    }"
    @click="goToProductDetail(title)"
  >
    <img
      :src="photoUrls[0][imgNo]"
      @mouseover="changeImgNo(1)"
      @mouseleave="changeImgNo(0)"
      width="294"
      height="294"
      alt="product"
      class="w-full"
    />
    <div class="flex justify-between gap-2">
      <div class="text-left">
        <span class="uppercase text-xs font-semibold text-gray-400">PHONE</span>
        <h3 class="font-bold text-sm md:text-sm lg:text-base">{{ title }}</h3>
      </div>
      <div class="text-right flex flex-col">
        <div class="inline-block text-red-600 text-sm line-through">
          $
          {{
            originalPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}
        </div>
        <div
          class="inline-block text-blue-600 text-xl font-semibold whitespace-nowrap"
        >
          $
          {{
            price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}
        </div>
      </div>
    </div>
  </article>
</template>
