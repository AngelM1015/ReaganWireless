<script lang="ts">
import { defineComponent } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import DanielKaufmanImg from "~/assets/images/Daniel Kaufman.jpg";
import MarkLafflerImg from "~/assets/images/Mark Laffler.jpg";
import MartinGarciaImg from "~/assets/images/Martin Garcia.jpg";
import FelixCaulderoImg from "~/assets/images/Felix Cauldero.jpg";
import GarySmall from "~/assets/images/GarySmall.jpg";

export default defineComponent({
  data() {
    return {
      // teamMembers: [
      //   {
      //     name: 'Daniel Kaufman',
      //     picturePath: '_nuxt/assets/images/Daniel Kaufman.jpg',
      //     job: 'President & Chief Executive Officer',
      //     Detail: [],
      //   },
      //   {
      //     name: 'Mark Laffler',
      //     picturePath: '_nuxt/assets/images/Mark Laffler.jpg',
      //     job: 'Chief Operating Officer',
      //     Detail: [],
      //   },
      //   {
      //     name: 'J. Martin Garcia',
      //     picturePath: '_nuxt/assets/images/Martin Garcia.jpg',
      //     job: 'Director of Operations',
      //     Detail: [],
      //   },
      //   {
      //     name: 'Felix Cauldero',
      //     picturePath: '_nuxt/assets/images/Felix Cauldero.jpg',
      //     job: 'Production Manager',
      //     Detail: [],
      //   },
      //   {
      //     name: 'Gary Small',
      //     picturePath: '_nuxt/assets/images/GarySmall.jpg',
      //     job: 'Director of Marketing',
      //     Detail: [],
      //   },
      // ],
      
      teamMembers: [
        {
          name: 'Daniel Kaufman',
          picturePath: DanielKaufmanImg,
          job: 'President & Chief Executive Officer',
          Detail: [],
        },
        {
          name: 'Mark Laffler',
          picturePath: MarkLafflerImg,
          job: 'Chief Operating Officer',
          Detail: [],
        },
        {
          name: 'J. Martin Garcia',
          picturePath: MartinGarciaImg,
          job: 'Director of Operations',
          Detail: [],
        },
        {
          name: 'Felix Cauldero',
          picturePath: FelixCaulderoImg,
          job: 'Production Manager',
          Detail: [],
        },
        {
          name: 'Gary Small',
          picturePath: GarySmall,
          job: 'Director of Marketing',
          Detail: [],
        },
      ],
      settings: {
        itemsToShow: 1,
        transition: 200,
        snapAlign: 'start',
      },
      breakpoints: {
        200: {
          itemsToShow: 1,
          snapAlign: 'start',
        },
        700: {
          itemsToShow: 2,
          snapAlign: 'start',
        },
        1024: {
          itemsToShow: 4,
          snapAlign: 'start',
        },
      },
    }
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
})
</script>

<template>
  <section class="container box-border">
    <carousel :settings="settings" :breakpoints="breakpoints">
      <slide v-for="(member, i) in teamMembers" :key="i">
        <div class="carousel_item flex shadow rounded-md select-none mx-auto">
            <img :src="member.picturePath" class="carousel_item" alt="member-picture" height="300px" width="100%"/>
          <div class="p-5 flex align-center flex-col">
            <div>
              <p class="text-lg lg:text-xl font-semibold">{{ member.name }}</p>
              <p class="text-sm lg:text-base h-12 font-semibold text-gray-400">{{ member.job }}</p>
              <button class="text-sm text-blue-primary mt-4">More Detailis -></button>
            </div>
          </div>
        </div>
      </slide>

      <template #addons>
        <navigation />
      </template>
    </carousel>
  </section>
</template>

<style>
.carousel_item {
  min-height: 200px;
  margin: 3px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.carousel_slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  background-color: transparent !important;
  border-radius: 6px;
  height: 54px;
}

.carousel__prev:hover,
.carousel__next:hover {
  background-color: rgba(0, 179, 255, 0.85) !important;
  color: white !important;
}

.carousel__prev:not(:hover),
.carousel__next:not(:hover) {
  /* background-color: white !important; */
  color: white !important;
  background-color: transparent !important;
}

.carousel__icon {
  filter: drop-shadow(0px 0px 2px rgb(0, 0, 0)) drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
}
</style>
