<template>
  <div class="user__header" v-if="windowWidth > 767.98">
    <h1 class="text-username user__name">{{ userInfo.name }}</h1>
    <Icon :name="IconVerify" v-if="userInfo.isVerified" />
  </div>
  <div class="user-info">
    <div class="user-info__column user-info__column--avatar">
      <Avatar
        :src="userInfo.src"
        :size="235"
        :alt="userInfo.name"
        class="user-info__avatar"
      />
      <Button
        class="user-controlls__button user-controlls__button--pc"
        v-if="isAuth"
        :text="$t('button.write')"
      />
    </div>
    <div class="user__header user__header--mobile" v-if="windowWidth <= 767.98">
      <h1 class="text-username user__name">{{ userInfo.name }}</h1>
      <Icon :name="IconVerify" v-if="userInfo.isVerified" />
    </div>
    <div class="user-info__column" v-if="!isReputation">
      <div class="user-info__column-inner">
        <div
          class="user-info__item"
          v-if="userInfo.profession && userInfo.profession.status !== 'hidden'"
        >
          <p class="user-info__title text-h2">{{ $t("profession") }}</p>
          <p
            class="user-info__text text-uppart"
            :class="
              userInfo.profession.status === 'blur'
                ? 'user-info__text--blur'
                : ''
            "
          >
            {{
              userInfo.profession.status === "blur"
                ? new Array(userInfo.profession.value.length)
                    .fill("A", 0, userInfo.profession.value.length)
                    .join("")
                : userInfo.profession.value
            }}
          </p>
        </div>
        <div
          class="user-info__item"
          v-if="userInfo.job && userInfo.job.status !== 'hidden'"
        >
          <p class="user-info__title text-h2">{{ $t("job") }}</p>
          <p
            class="user-info__text text-uppart"
            :class="
              userInfo.job.status === 'blur' ? 'user-info__text--blur' : ''
            "
          >
            {{
              userInfo.job.status === "blur"
                ? new Array(userInfo.job.value.length)
                    .fill("A", 0, userInfo.job.value.length)
                    .join("")
                : userInfo.job.value
            }}
          </p>
        </div>
        <div
          class="user-info__item"
          v-if="userInfo.company && userInfo.company.status !== 'hidden'"
        >
          <p class="user-info__title text-h2">{{ $t("company") }}</p>
          <p
            class="user-info__text text-uppart"
            :class="
              userInfo.company.status === 'blur' ? 'user-info__text--blur' : ''
            "
          >
            {{
              userInfo.company.status === "blur"
                ? new Array(userInfo.company.value.length)
                    .fill("A", 0, userInfo.company.value.length)
                    .join("")
                : userInfo.company.value
            }}
          </p>
          <p
            class="user-info__address text-main"
            :class="
              userInfo.address.status === 'blur' ? 'user-info__text--blur' : ''
            "
          >
            {{
              userInfo.address.status === "blur"
                ? new Array(userInfo.address.value.length)
                    .fill("A", 0, userInfo.address.value.length)
                    .join("")
                : userInfo.address.value
            }}
          </p>
        </div>
        <div class="user-info__item user-info__item--mobile">
          <p class="user-info__title text-main">
            <span
              v-if="
                userInfo.profession && userInfo.profession.status !== 'hidden'
              "
              :class="
                userInfo.profession.status === 'blur'
                  ? 'user-info__text--blur'
                  : ''
              "
            >
              {{
                userInfo.profession.status === "blur"
                  ? new Array(userInfo.profession.value.length)
                      .fill("A", 0, userInfo.profession.value.length)
                      .join("")
                  : `${userInfo.profession.value},`
              }}
            </span>
            <span
              v-if="userInfo.address && userInfo.address.status !== 'hidden'"
              :class="
                userInfo.address.status === 'blur'
                  ? 'user-info__text--blur'
                  : ''
              "
            >
              {{
                userInfo.address.status === "blur"
                  ? new Array(userInfo.address.value.split(", ")[1].length)
                      .fill(
                        "A",
                        0,
                        userInfo.address.value.split(", ")[1].length
                      )
                      .join("")
                  : userInfo.address.value.split(", ")[1]
              }}
            </span>
          </p>
        </div>
        <div class="user-info__item user-info__item--mobile">
          <p class="user-info__title text-main">
            <span
              v-if="userInfo.job && userInfo.job.status !== 'hidden'"
              :class="
                userInfo.job.status === 'blur' ? 'user-info__text--blur' : ''
              "
            >
              {{
                userInfo.job.status === "blur"
                  ? new Array(userInfo.job.value.length)
                      .fill("A", 0, userInfo.job.value.length)
                      .join("")
                  : userInfo.job.value
              }}
            </span>
            <span
              v-if="userInfo.company && userInfo.company.status !== 'hidden'"
            >
              {{ $t("in") }}
              <span
                :class="
                  userInfo.company.status === 'blur'
                    ? 'user-info__text--blur'
                    : ''
                "
              >
                {{
                  userInfo.company.status === "blur"
                    ? new Array(userInfo.company.value.length)
                        .fill("A", 0, userInfo.company.value.length)
                        .join("")
                    : userInfo.company.value
                }}
              </span>
            </span>
          </p>
        </div>
        <div class="user-info__footer">
          <p class="user-info__id text-comment-small">id{{ userInfo.id }}</p>
          <Copy class="user-info__button" />
          <button
            class="user-info__button"
            @click="
              canShare ? Navigator.share({ url: url }) : $emit('openShare')
            "
          >
            <Icon :name="IconShare" :size="24" />
          </button>
          <button class="user-info__button" @click="$emit('openQR')">
            <Icon :name="IconQR" :size="24" />
          </button>
        </div>
      </div>
      <Button
        class="user-controlls__button user-controlls__button--pc"
        v-if="isAuth"
        type="secondary"
        :text="$t('button.save')"
      />
    </div>
    <div
      class="user-info__column"
      :class="!isAuth ? 'user-info__column--hidden' : ''"
      v-else
    >
      <div class="user-info__column-inner user-info__column-inner--reputation">
        <div
          class="user-info__item"
          v-if="
            userInfo.achivements.value.length > 0 &&
            userInfo.achivements.status !== 'hidden'
          "
        >
          <AchivementList
            :achivements="userInfo.achivements.value"
            :status="userInfo.achivements.status"
            class="user-info__achivments"
          />
        </div>
        <div class="user-info__item user-info__item--karma">
          <Karma
            v-if="userInfo.karma.status !== 'hidden'"
            :value="isAuth ? userInfo.karma.value : NaN"
            :status="userInfo.karma.status"
          />
          <Reputation
            v-if="userInfo.reputation.status !== 'hidden'"
            :value="isAuth ? userInfo.reputation.value : NaN"
            :status="userInfo.reputation.status"
          />
        </div>
        <div
          class="user-info__item user-info__item--donars"
          v-if="userInfo.donars.status !== 'hidden'"
        >
          <p class="user-info__title text-h1">
            {{ $t("donars") }} <Info :text="$t('info.donars')" />
          </p>
          <donars
            :value="userInfo.donars.value"
            :status="userInfo.donars.status"
            :hidden="!isAuth"
          />
        </div>
      </div>
      <Button
        class="user-controlls__button user-controlls__button--pc"
        v-if="isAuth"
        type="secondary"
        :text="$t('button.save')"
      />
    </div>
  </div>
</template>

<script setup>
import IconVerify from "./icons/IconVerify.vue";
import IconQR from "./icons/IconQR.vue";
import IconShare from "./icons/IconShare.vue";
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import Copy from "./Copy.vue";
import Avatar from "./Avatar.vue";
import Button from "./Button.vue";
import Icon from "./Icon.vue";
import Users from "../database/users";
import AchivementList from "./AchivementList.vue";
import Karma from "./Karma.vue";
import Reputation from "./Reputation.vue";
import donars from "./Donars.vue";
import Info from "./Info.vue";

const route = useRoute();
const id = computed(() => route.params.id);
const isReputation = computed(() => route.path.includes("reputation"));

const userStore = useUserStore();
const mainInfo = computed(() => userStore.userInfo);
const userInfo = computed(() => {
  if (id.value === userStore.userInfo.id) return userStore.userInfo;
  if (id.value) return Users[id.value];
  else return userStore.userInfo;
});

const isAuth = computed(() => userStore.isAuth);

// const getSrc = (src) => new URL(`/src/assets/images/${src}`, import.meta.url).href

const canShare = computed(() => {
  if (Navigator.share) return true;
  else return false;
});

const windowWidth = ref(window.innerWidth);
window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
});

defineEmits(["openShare", "openQR"]);
</script>

<style scoped lang="scss">
.user {
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  @include screen(767.98px) {
    &__header {
      gap: 10px;
      margin-top: 0px;
    }
  }
}
.user-info {
  display: flex;
  justify-content: center;
  gap: 20px 50px;
  margin-top: 40px;
  &__column {
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 218px;
    width: 100%;
    &-inner {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      max-height: 235px;
      gap: 16px;
      height: 100%;
      &--reputation {
        justify-content: center;
        gap: 29px;
      }
    }
    &--avatar {
      max-width: 235px;
      button {
        max-width: 220px;
        margin: 0 auto;
      }
    }
    &--hidden > &-inner {
      pointer-events: none;
      filter: blur(14px);
      user-select: none;
    }
  }
  &__id {
    margin-right: 10px;
  }
  &__address {
    margin-top: 13px;
  }
  &__item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    &--mobile {
      display: none;
    }
    &--karma {
      flex-direction: row;
      justify-content: space-between;
    }
    &--donars {
      gap: 8px;
    }
  }
  &__text {
    font-family: "Montserrat";
    &--blur {
      filter: blur(7px);
      user-select: none;
    }
  }
  &__footer {
    display: flex;
    gap: 20px;
    align-items: flex-end;
  }
  &__button {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  @include screen(767.98px) {
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
    &__achivments {
      justify-content: center;
    }
    &__avatar {
      width: 225px !important;
      height: 225px !important;
      max-width: 225px !important;
      max-height: 225px !important;
      min-width: 225px !important;
      min-height: 225px !important;
    }
    &__column {
      align-items: center;
      gap: 10px;
      max-width: 100%;
      &-inner {
        gap: 10px;
        &--reputation {
          max-width: 100%;
          width: 100%;
          gap: 20px;
          .user-info__item {
            display: flex;
          }
        }
      }
    }
    &__item {
      display: none;
      &--mobile {
        display: flex;
      }
      &--karma {
        gap: 40px;
        justify-content: center;
      }
      &--donars {
        max-width: 100%;
        gap: 10px;
        width: 100%;
        margin: 20px auto 0;
      }
    }
    &__footer {
      margin-top: 10px;
      justify-content: center;
    }
    &__id {
      display: none;
    }
  }
  @include screen(424.98px) {
    &__item {
      &--donars {
        max-width: 100%;
        margin: 20px 0 0;
      }
    }
  }
}

.user-controlls {
  display: flex;
  gap: 20px 40px;
  align-items: center;
  flex-wrap: wrap;
  &__button {
    width: 100%;
  }
  &--mobile {
    display: none;
  }
  @include screen(767.98px) {
    display: none;
    &__button {
      max-width: 100%;
      &--pc {
        display: none;
      }
    }
    &--mobile {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
