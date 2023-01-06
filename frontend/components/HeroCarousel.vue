<script lang="ts">
import { defineComponent } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import heroCarouselImage from "@/assets/images/hero.svg";

export default defineComponent({
  data() {
    return {
      sliders: [
        {
          photo: heroCarouselImage,
        },
        {
          photo: heroCarouselImage,
        },
        {
          photo: heroCarouselImage,
        },
        {
          photo: heroCarouselImage,
        },
        {
          photo: heroCarouselImage,
        },
      ],
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        700: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 1,
          snapAlign: "center",
        },
      },
    };
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
});
</script>
<template>
  <carousel
    :settings="settings"
    :breakpoints="breakpoints"
    :wrapAround="true"
    :transition="500"
    :autoplay="3000"
  >
    <slide v-for="(slider, i) in sliders" :key="i">
      <img :src="slider.photo" width="450" height="450" alt="hero" />
    </slide>
    <template #addons>
      <pagination />
    </template>
  </carousel>
</template>

<style>
.carousel {
  @apply w-full;
}
.carousel_slide {
  @apply bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1;
}
.carousel__prev {
  background-color: rgb(106, 113, 122, 0.3) !important;
}
.carousel__next {
  background-color: rgb(106, 113, 122, 0.3) !important;
}

.carousel__pagination-button::after {
  @apply rounded-full w-2 h-2;
}
.carousel__pagination-button:hover::after {
  @apply bg-red-primary;
}
.carousel__pagination-button--active::after {
  @apply w-6 bg-red-primary;
}
@media screen and (max-width: 820px) {
  .carousel__prev {
    @apply left-0;
  }
  .carousel__next {
    @apply right-0;
  }
}
</style>
