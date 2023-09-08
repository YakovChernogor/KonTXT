<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 250,
  },
  rect: {
    type: Boolean,
    default: false,
  },
});

const getSrc = (src) =>
  new URL(`/src/assets/images/${src}`, import.meta.url).href;
</script>

<template>
  <div
    class="avatar"
    :class="{ 'avatar--rect': rect }"
    :style="`max-width: ${size}px; max-height: ${size}px; min-width: ${size}px; min-height: ${size}px`"
  >
    <img
      draggable="false"
      class="avatar__img"
      :class="{ 'avatar__img--rect': rect }"
      :src="getSrc(src)"
      :alt="alt"
      :width="size"
      :height="size"
    />
  </div>
</template>

<style scoped lang="scss">
.avatar {
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  border-radius: 50%;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 250px;
  max-height: 250px;
  &--rect {
    // margin-top: 9px;
    // margin-bottom: 9px;
    border-radius: 10px;
    max-width: 100%;
    max-height: 100%;
  }
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    &--rect {
      object-fit: contain;
    }
  }
}
</style>
