<template>
  <div class="bar">
    <input
      type="text"
      v-model="searchValue"
      ref="searchInput"
      class="bar__search"
      :class="{ 'bar__search--hide': searchHide }"
      @focusout="
        () => {
          if (searchValue.length === 0) searchHide = true;
        }
      "
    />
    <button
      v-if="search"
      class="bar__action"
      @click="
        searchHide = false;
        search.focus();
      "
    >
      <Icon :name="IconSearch" :size="24" />
    </button>
    <button v-if="filter" class="bar__action">
      <Icon :name="IconFilter" :size="24" />
    </button>
    <button v-if="plus" class="bar__action">
      <Icon :name="IconPlus" :size="24" />
    </button>
  </div>
</template>

<script setup>
import Icon from "./Icon.vue";
import IconSearch from "./icons/IconSearch.vue";
import IconPlus from "./icons/IconPlus.vue";
import IconFilter from "./icons/IconFilter.vue";
import { ref } from "vue";

defineProps({
  addable: {
    type: Boolean,
  },
  // onlyPlus: {
  // 	type: Boolean,
  // 	default: false
  // },
  search: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: Boolean,
    default: false,
  },
  plus: {
    type: Boolean,
    default: false,
  },
});

const searchInput = ref(null);
const searchHide = ref(true);
const searchValue = ref("");
</script>

<style scoped lang="scss">
.bar {
  display: flex;
  gap: 30px;
  width: 100%;
  margin-left: 30px;
  justify-content: flex-end;
  &__search {
    max-width: 264px;
    width: 100%;
    transition: 0.3s ease;
    border-bottom: 1px solid var(--color-dynamic-black);
    margin-right: -10px;
    cursor: pointer;
    &--hide {
      max-width: 0;
    }
  }
  &__action {
    cursor: pointer;
  }
}
</style>
