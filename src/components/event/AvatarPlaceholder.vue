<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 250,
  },
  text: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="avatar"
    :style="`max-width: ${size}px; max-height: ${size}px; min-width: ${size}px; min-height: ${size}px;`"
  >
    <span class="text-comment-small">
      {{ text }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  background: var(--color-dynamic-white);
  border: 0.85px solid var(--color-dynamic-black);
  border-radius: 50%;
  overflow: hidden;
  max-width: 250px;
  max-height: 250px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
