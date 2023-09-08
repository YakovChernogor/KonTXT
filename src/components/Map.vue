<script setup>
import { computed, ref, inject } from "vue";
import { useI18n } from "vue-i18n";
import { GoogleMap, Marker } from "vue3-google-map";

const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "150px",
  },
  zoom: {
    type: Number,
    default: 15,
  },
  center: {
    type: Object,
    required: true,
  },
  marker: {
    type: Object,
  },
  label: {
    type: String,
  },
  title: {
    type: String,
  },
});

const map = ref();

const i18n = useI18n();
const language = computed(() => i18n.locale.value.replaceAll('"', ""));
</script>

<template>
  <GoogleMap
    ref="map"
    :api-key="inject('mapApiKey')"
    :center="center"
    :zoom="zoom"
    :language="language"
    :style="`width: ${width}; height: ${height}`"
  >
    <Marker
      v-if="marker"
      :options="{ position: marker, label: label, title: title }"
    />
  </GoogleMap>
</template>

<style scoped lang="scss"></style>
