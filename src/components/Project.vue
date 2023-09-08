<template>
  <div class="project">
    <div class="project__header">
      <p class="project__title" :class="status === 'blur' ? 'blur' : ''">
        {{
          status === "blur"
            ? project.title
                .split(" ")
                .map((e) => new Array(e.length).fill("A", 0, e.length).join(""))
                .join(" ")
            : project.title
        }}
      </p>
      <p
        class="project__date text-comment"
        :class="status === 'blur' ? 'blur' : ''"
      >
        {{
          status === "blur"
            ? project.date
                .split(" ")
                .map((e) => new Array(e.length).fill("A", 0, e.length).join(""))
                .join(" ")
            : project.date
        }}
      </p>
    </div>
    <div class="project__images">
      <button class="project__button" ref="prev">
        <Icon :name="IconChevron" :size="32" />
      </button>
      <swiper
        :slides-per-view="3"
        :modules="modules"
        :navigation="{
          prevEl: prev,
          nextEl: next,
        }"
        space-between="20"
        class="project__swiper"
        :class="status === 'blur' ? 'blur' : ''"
      >
        <swiper-slide v-for="(image, id) in project.images" :key="id">
          <img
            :src="getSrc(image)"
            class="project__image"
            :key="id"
            @click="
              () => {
                show(id);
              }
            "
          />
        </swiper-slide>
      </swiper>
      <button class="project__button project__button--next" ref="next">
        <Icon :name="IconChevron" :size="32" />
      </button>
    </div>
    <div class="project__row">
      <div class="project__col">
        <p class="project__col-title text-main">
          {{ $t("projects.results") }}:
        </p>
        <ul class="project__results">
          <li
            class="project__result text-main-small"
            v-for="(result, i) in project.results"
            :key="i"
            :class="status === 'blur' ? 'blur' : ''"
          >
            {{
              status === "blur"
                ? result
                    .split(" ")
                    .map((e) =>
                      new Array(e.length).fill("A", 0, e.length).join("")
                    )
                    .join(" ")
                : result
            }}
          </li>
        </ul>
      </div>
      <div class="project__col project__col--member">
        <p class="project__col-title text-comment-small">
          {{ $t("members") }}:
        </p>
        <div class="project__members">
          <Donars
            :value="project.members"
            :size="29"
            :status="status"
            title="Участники"
            projects
          />
        </div>
      </div>
    </div>
    <div class="project__col" v-if="project.description">
      <p class="project__col-title text-main">
        {{ $t("projects.description") }}:
      </p>
      <p
        class="project__col-text text-main-small"
        :class="status === 'blur' ? 'blur' : ''"
      >
        {{
          status === "blur"
            ? project.description
                .split(" ")
                .map((e) => new Array(e.length).fill("A", 0, e.length).join(""))
                .join(" ")
            : project.description
        }}
      </p>
    </div>
    <div class="project__col" v-if="project.link">
      <p class="project__col-title text-main">{{ $t("projects.link") }}:</p>
      <p
        class="project__col-text text-main-small"
        :class="status === 'blur' ? 'blur' : ''"
      >
        {{
          status === "blur"
            ? project.link
                .split(" ")
                .map((e) => new Array(e.length).fill("A", 0, e.length).join(""))
                .join(" ")
            : project.link
        }}
      </p>
    </div>
  </div>
  <teleport to="body">
    <vue-easy-lightbox
      :visible="state.visible"
      :imgs="imgs"
      :index="state.index"
      @hide="onHide"
    ></vue-easy-lightbox>
  </teleport>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import Donars from "./Donars.vue";
import IconChevron from "./icons/IconChevron.vue";
import Icon from "./Icon.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
const modules = [Navigation];

import "swiper/css";
import "swiper/css/navigation";

const prev = ref(null);
const next = ref(null);

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
  },
});

const getSrc = (src) =>
  new URL(`/src/assets/images/${src}`, import.meta.url).href;

const imgs = computed(() => props.project.images.map((img) => getSrc(img)));

const state = reactive({
  index: 0,
  visible: false,
});

const show = (i) => {
  state.visible = true;
  state.index = i;
};
const onHide = () => (state.visible = false);
</script>

<style scoped lang="scss">
.blur {
  filter: blur(7px);
  user-select: none;
  pointer-events: none;
}
.project {
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__swiper {
    width: 100%;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__button {
    cursor: pointer;
    &--next {
      transform: rotate(180deg);
    }
  }
  &__title {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-dynamic-black);
  }
  &__date {
    font-family: "Montserrat", sans-serif;
    font-size: 10px;
  }
  &__images {
    display: flex;
    gap: 8px;
    height: 108px;
  }
  &__image {
    width: 100%;
    height: 100%;
    min-width: 33%;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
  }
  &__row {
    display: flex;
    gap: 10px 24px;
    flex-wrap: wrap-reverse;
  }
  &__members {
    display: flex;
    gap: 4px;
    padding-right: 16px;
  }
  &__col {
    display: flex;
    flex-direction: column;
    gap: 2px;
    &--member {
      gap: 5px;
      margin-left: auto;
      align-items: flex-end;
    }
  }
  &__col-title {
    font-family: "Montserrat", sans-serif;
  }
  &__col-text {
    max-width: 396px;
  }
  &__results {
    padding-left: 18px;
  }
  // @include screen(767.98px) {
  // 	&__image {
  // 		max-width: calc(33.333% - 8.66667px);
  // 	}
  // }
}
</style>
