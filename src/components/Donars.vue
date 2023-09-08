<template>
  <div
    class="donars"
    :class="{ 'donars--projects': projects }"
    v-if="Object.keys(users).length > 0"
  >
    <RouterLink
      :class="{ 'donars--blur': status === 'blur' }"
      :to="`/user/${donar.id}/cutaway`"
      class="donar"
      v-for="donar of visibleUsers"
      :key="donar"
    >
      <Avatar :src="donar.src" :alt="donar.name" :size="size" />
    </RouterLink>
    <p
      :class="{ 'donars--blur': status === 'blur' }"
      class="donars__more text-menu-up"
      @click="modal = true"
      :style="`width: ${size}px; height: ${size}px; min-width: ${size}px; min-height: ${size}px;`"
      v-if="Object.keys(users).length - 3 > 0"
    >
      +{{ Object.keys(users).length - 3 }}
    </p>
    <Modal :open="modal" @close="modal = false">
      <div class="modal__header">
        <p class="user-content__title text-h1">
          {{ title === "Дона́ры" ? $t("donars") : $t("members") }}
        </p>
        <ActionModalBar search filter plus />
      </div>
      <div class="modal__content user-content__projects">
        <template v-for="(donar, i) of users" :key="i">
          <Donar :value="donar" :id="userInfo.id" giving />
        </template>
      </div>
    </Modal>
  </div>
  <div class="donars donars--text" v-else>
    <p class="donars__text">{{ $t("withOutDonars") }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Avatar from "./Avatar.vue";
import usersList from "@/database/users.js";
import { RouterLink, useRoute } from "vue-router";
import Modal from "./Modal.vue";
import ActionModalBar from "./ActionModalBar.vue";
import Donar from "./Donar.vue";
import { useUserStore } from "@/stores/user";
const users = ref({});

if (props.value) {
  for (const key of props.value) {
    users.value[key] = usersList[key];
  }
}

const visibleUsers = computed(() => {
  const keys = Object.keys(users.value).slice(0, 3);
  const newObj = {};

  keys.forEach((key) => (newObj[key] = users.value[key]));
  return newObj;
});

const props = defineProps({
  value: {
    type: Array,
  },
  size: {
    type: Number,
    default: 48,
  },
  title: {
    type: String,
    default: "Дона́ры",
  },
  projects: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
  },
});

const modal = ref(false);

const route = useRoute();
const id = computed(() => route.params.id);

const userStore = useUserStore();
const userInfo = computed(() => {
  if (id.value) {
    return users[id.value];
  } else return userStore.userInfo;
});
</script>

<style scoped lang="scss">
.donars {
  display: flex;
  gap: 10px;
  &--blur {
    filter: blur(7px);
    user-select: none;
    pointer-events: none;
  }
  &__more {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    width: 58px;
    height: 58px;
    min-width: 58px;
    min-height: 58px;
    border: 1px solid var(--color-dynamic-black);
    position: relative;
    box-sizing: border-box;
    background-color: var(--color-dynamic-white);
    &::after,
    &::before {
      content: "";
      position: absolute;
      display: block;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      min-width: calc(100% + 2px);
      min-height: calc(100% + 2px);
      border-radius: 50%;
      background-color: var(--color-dynamic-white);
      border: 1px solid var(--color-dynamic-gray);
      right: -8px;
      z-index: -1;
      top: -1px;
      box-sizing: border-box;
    }
    &::after {
      right: -16px;
      z-index: -2;
      border-color: #c8c8c8;
    }
  }
  &--projects {
    gap: 4px;
  }
  .dark & {
    .donars__more {
      &::after {
        border-color: #565656;
      }
    }
  }

  @include screen(1199.98px) {
    &:not(.donars--projects) {
      gap: 10px;
      .donars__more {
        margin-left: 2px;
        width: 58px;
        height: 58px;
        min-width: 58px !important;
        min-height: 58px !important;
        &::before {
          right: -19px;
        }
        &::after {
          right: -35px;
        }
      }
      .donar {
        :deep(.avatar) {
          max-width: 58px !important;
          max-height: 58px !important;
          min-width: 58px !important;
          min-height: 58px !important;
          width: 58px;
          height: 58px;
        }
      }
    }
  }
  @include screen(767.98px) {
    &:not(.donars--projects) {
      .donars__more {
        margin-left: 10px;
      }
    }
  }

  &__text {
    margin-top: 15px;
    font-family: Montserrat;
    font-size: 10px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0em;
    color: var(--color-dynamic-gray);
  }
}

.modal {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 8px;
    position: relative;
    z-index: 1;
    background: var(--color-dynamic-white);
  }
  &__content {
    overflow: auto;
    height: calc(100% - 67px);
    &::-webkit-scrollbar {
      display: none;
      opacity: 0;
      width: 0;
      height: 0;
    }
    & > * {
      position: relative;
      padding-bottom: 40px;
      &::after {
        content: "";
        position: absolute;
        width: 82%;
        height: 1px;
        background-color: var(--color-dynamic-gray);
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
      }
    }
  }
  @include screen(767.98px) {
    &__content {
      & > * {
        padding-bottom: 20px;
        &::after {
          display: none;
        }
      }
    }
  }
}

.user-content {
  &__title {
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 20px;
  }
}
</style>
