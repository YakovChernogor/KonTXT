<template>
  <div class="header-wrapper">
    <button class="dev" @click="auth()"></button>
    <header class="header">
      <div class="header__top">
        <router-link class="logo__link" to="/">
          <IconLogo class="logo" />
        </router-link>

        <ThemeSwitcher class="header__theme" />
        <router-link to="/" v-if="isAuth" class="header__message">
          <Icon
            :name="IconNotification"
            :class="{ hasNotification: 'header__message--active' }"
            :size="24"
          />
        </router-link>
        <router-link to="/" v-if="isAuth" class="header__home">
          <Avatar :src="userInfo.src" alt="Go to main" :size="24" />
        </router-link>
        <button
          class="header__burger"
          v-if="isAuth || windowWidth <= 1199.98"
          @click="nav = true"
        >
          <Icon :name="IconBurger" :size="24" />
        </button>
        <Button
          class="header__button"
          :text="$t('button.logIn')"
          @click="login = true"
          v-if="!isAuth"
        />
      </div>
      <!-- <div class="header__bottom">
				<RouterLink :to="`/card/${currentId}`" class="header__link text-h2" :class="{'header__link--active': currentPage === 'card'}">{{$t("card")}}</RouterLink>
				<hr class="header__line">
				<RouterLink :to="`/reputation/${currentId}`" class="header__link text-h2" :class="{'header__link--active': currentPage === 'reputation'}">{{$t("reputation")}}</RouterLink>
			</div> -->
    </header>
    <Modal :open="nav" @close="nav = false" mobile>
      <div class="header-modal">
        <div class="header-modal__top">
          <router-link class="logo__link" to="/">
            <IconLogo class="logo" />
          </router-link>
          <ThemeSwitcher class="header-modal__theme" />
          <router-link to="/" v-if="isAuth" class="header__message">
            <Icon
              :name="IconNotification"
              :class="{ hasNotification: 'header__message--active' }"
              :size="24"
            />
          </router-link>
          <router-link
            to="/"
            v-if="isAuth && windowWidth > 767.98"
            class="header__home"
          >
            <Avatar :src="userInfo.src" alt="Go to main" :size="24" />
          </router-link>
          <button class="header-modal__burger" @click="nav = false">
            <Icon :name="IconCross" :size="24" />
          </button>
        </div>
        <div class="header-modal__content" v-if="!isAuth">
          <div class="header-modal__nav">
            <RouterLink :to="`/`" class="header-modal__link">
              <Icon :name="IconQuestion" :size="24" />
              {{ $t("header.questions") }}
            </RouterLink>
          </div>
          <Button
            class="header-modal__button"
            type="secondary"
            @click="login = true"
            :text="$t('button.logIn')"
          />
        </div>
        <div class="header-modal__content" v-if="isAuth">
          <div class="header-modal__nav">
            <RouterLink :to="`/`" class="header-modal__link">
              <Icon :name="IconQuestion" :size="24" />
              {{ $t("header.questions") }}
            </RouterLink>
            <RouterLink :to="`/`" class="header-modal__link">
              <Icon :name="IconSettings" :size="24" />
              {{ $t("header.settings") }}
            </RouterLink>
            <RouterLink :to="`/`" class="header-modal__link">
              <Icon :name="IconManifest" :size="24" />
              {{ $t("header.manifest") }}
            </RouterLink>
            <RouterLink :to="`/`" class="header-modal__link">
              <Icon :name="IconQuit" :size="24" />
              {{ $t("header.quit") }}
            </RouterLink>
          </div>
        </div>
        <div class="header-modal__footer">
          <div class="header-modal__footer-top">
            <LocaleSwitcher />
            <div class="header-modal__socials">
              <RouterLink :to="`/`" class="header-modal__link">
                <Icon :name="IconTelegram" :size="24" />
              </RouterLink>
              <RouterLink :to="`/`" class="header-modal__link">
                <Icon :name="IconEnvelop" :size="24" />
              </RouterLink>
              <RouterLink :to="`/`" class="header-modal__link">
                <Icon :name="IconWeb" :size="24" />
              </RouterLink>
            </div>
          </div>
          <div class="header-modal__footer-bottom">
            <RouterLink
              :to="`/`"
              class="header-modal__link-small text-comment"
              >{{ $t("header.terms") }}</RouterLink
            >
            <RouterLink
              :to="`/`"
              class="header-modal__link-small text-comment"
              >{{ $t("header.policy") }}</RouterLink
            >
            <p class="text-comment">© KonTxT 2023</p>
            <p class="text-comment">Beta-build 0.1</p>
          </div>
        </div>
      </div>
    </Modal>
    <Login :open="login" @close="login = false" />
  </div>
  <div class="header-wrapper--placeholder"></div>
  <div class="header-wrapper--mobile" v-if="isAuth">
    <div class="header__mobile">
      <!-- <RouterLink class="aside-item__link" to="/">{{$t("card")}}</RouterLink>
			<RouterLink class="aside-item__link" to="/reputation">{{$t("reputation")}}</RouterLink> -->
      <RouterLink
        to="/cutaway"
        class="header-link"
        :class="{ 'router-link-active': currentPath === '/reputation' }"
      >
        <Icon :name="IconMobileCircle" class="header-link__icon" />
        <p class="header-link__title">{{ $t("header.profile") }}</p>
      </RouterLink>
      <RouterLink to="/contacts" disabled class="header-link">
        <Icon :name="IconMobileSquare" class="header-link__icon" />
        <p class="header-link__title">{{ $t("header.contacts") }}</p>
      </RouterLink>
      <RouterLink to="/meets" disabled class="header-link">
        <Icon :name="IconMobileCross" class="header-link__icon" />
        <p class="header-link__title">{{ $t("header.meets") }}</p>
      </RouterLink>
      <RouterLink to="/knowledge" disabled class="header-link">
        <Icon :name="IconMobileTriangle" class="header-link__icon" />
        <p class="header-link__title">{{ $t("header.knowledge") }}</p>
      </RouterLink>
    </div>
  </div>
  <div
    class="header__bottom"
    :class="{
      'header__bottom--mobile':
        currentPage === 'cutaway' || currentPage === 'reputation',
    }"
    v-if="
      // !isAuth ||
      currentPage === 'cutaway' ||
      currentPage === 'reputation' ||
      currentPage === 'userCutaway' ||
      currentPage === 'userReputation'
    "
  >
    <RouterLink
      :to="
        currentPage !== 'reputation' && currentPage !== 'cutaway'
          ? `/user/${currentId}/cutaway`
          : '/cutaway'
      "
      class="header__link text-h2"
      :class="{
        'header__link--active':
          currentPage === 'cutaway' || currentPage === 'userCutaway',
      }"
    >
      {{ $t("card") }}
    </RouterLink>
    <hr class="header__line" />
    <RouterLink
      :to="
        currentPage !== 'reputation' && currentPage !== 'cutaway'
          ? `/user/${currentId}/reputation`
          : '/reputation'
      "
      class="header__link text-h2"
      :class="{
        'header__link--active':
          currentPage === 'reputation' || currentPage === 'userReputation',
      }"
    >
      {{ $t("reputation") }}
    </RouterLink>
  </div>
</template>

<script setup>
import IconLogo from "@/components/icons/IconLogo.vue";
import IconNotification from "@/components/icons/IconNotification.vue";
import IconBurger from "@/components/icons/IconBurger.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import Button from "./Button.vue";
import { RouterLink, useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import Avatar from "./Avatar.vue";
import Icon from "./Icon.vue";
import IconMobileCircle from "./icons/IconMobileCircle.vue";
import IconMobileSquare from "./icons/IconMobileSquare.vue";
import IconMobileCross from "./icons/IconMobileCross.vue";
import IconCross from "./icons/IconCross.vue";
import IconMobileTriangle from "./icons/IconMobileTriangle.vue";
import Modal from "./Modal.vue";
import IconQuestion from "./icons/IconQuestion.vue";
import IconSettings from "./icons/IconSettings.vue";
import IconManifest from "./icons/IconManifest.vue";
import IconQuit from "./icons/IconQuit.vue";
import LocaleSwitcher from "./LocaleSwitcher.vue";
import IconTelegram from "./icons/IconTelegram.vue";
import IconEnvelop from "./icons/IconEnvelop.vue";
import IconWeb from "./icons/IconWeb.vue";
import Login from "./Login.vue";

const windowWidth = ref(window.innerWidth);
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const isAuth = computed(() => userStore.isAuth);
const route = useRoute();
const currentPage = computed(() => route.name);
const currentPath = computed(() => route.path);
const currentId = computed(() => route.params.id);
const nav = ref(false);
const login = ref(false);

window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
});

const auth = () => {
  localStorage.setItem(
    "auth",
    localStorage.getItem("auth") === "true" ? false : true
  );
  location.reload();
};

let hasNotification = ref(false);
</script>

<style scoped lang="scss">
.dev {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
  cursor: pointer;
  transition: 0.3s ease;
  border-radius: 8px;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
}
.logo {
  height: 45px;
  width: auto;
  &__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: auto;
  }
}
.header-modal {
  &__message,
  &__burger,
  &__theme {
    width: 24px;
    height: 24px;
    display: block;
    cursor: pointer;
  }
  &__top {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .logo {
    height: 28px;
    &__link {
      margin-right: auto;
    }
  }
  &__button {
    max-width: 320px;
    margin: 0 auto 100px;
  }
  &__content {
    display: flex;
    flex-direction: column;
  }
  &__nav {
    margin-top: 100px;
    margin-bottom: 100px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  &__link {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 500;
    font-family: "Inter";
    color: var(--color-dynamic-black);
    &-small {
      text-decoration: none;
    }
  }
  &__socials {
    display: flex;
    gap: 40px;
  }
  &__footer {
    display: flex;
    flex-direction: column;
    gap: 40px;
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-bottom {
      display: grid;
      gap: 10px 0;
      grid-template-columns: auto auto;
      grid-template-areas: "terms date" "policy version";
      flex-direction: column;
      align-items: center;
      gap: 10px;
      *:nth-child(1) {
        grid-area: terms;
      }
      *:nth-child(2) {
        grid-area: policy;
      }
      *:nth-child(3) {
        grid-area: date;
        text-align: right;
      }
      *:nth-child(4) {
        grid-area: version;
        text-align: right;
      }
    }
  }
  @include screen(767.98px, min-width) {
    .logo {
      display: none;
    }
    .locale {
      display: none;
    }
    &__nav {
      margin-top: 60px;
      margin-bottom: 60px;
    }
    &__link {
      flex-direction: row-reverse;
      gap: 22px;
      font-size: 16px;
    }
    &__socials {
      gap: 30px;
      width: 100%;
      justify-content: flex-end;
    }
    &__footer {
      gap: 20px;
      &-bottom {
        justify-content: flex-end;
        text-align: right;
        gap: 10px 26px;
        grid-template-areas: "terms terms" "policy policy" "version date";
        *:nth-child(3),
        *:nth-child(4) {
          margin-top: 10px;
          text-align: left;
        }
      }
      p {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}
.header {
  width: 100%;
  margin: 0 auto;
  padding: 23px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  &__top {
    display: flex;
    gap: 30px;
    align-items: center;
  }
  &__button {
    width: 228px;
  }
  &__bottom {
    display: flex;
    gap: 50px;
    justify-content: center;
    align-items: center;
    margin-top: 14px;
    &--mobile {
      display: none;
    }
  }
  &__line {
    border-right: 1px solid var(--color-dynamic-black);
    height: 20px;
  }
  &__link {
    text-decoration: none;
    color: var(--color-dynamic-gray);
    font-family: "Montserrat";
    &--active {
      color: var(--color-dynamic-black);
    }
  }
  &__home,
  &__message {
    width: 24px;
    height: 24px;
  }
  &__message {
    :deep(circle) {
      display: none;
    }
    &--active {
      :deep(circle) {
        display: block;
      }
    }
  }
  &__burger {
    display: block;
    height: 24px;
    cursor: pointer;
  }
  &__mobile {
    display: none;
  }
  @include screen(1199.98px) {
    padding: 14px 20px;
    padding-right: 43px;
    max-width: 673px;
    &__burger {
      :deep(path) {
        stroke: #e7e7e7 !important;
      }
    }
    &__bottom {
      margin-top: 30px;
      &--mobile {
        max-width: 360px;
        padding-left: 81px;
        padding-right: 63px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        gap: 95px;
      }
    }
    &__line {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    &__button {
      display: none;
    }
    .logo {
      height: 28px;
      :deep(path) {
        fill: var(--color-white);
      }
    }
    &__home,
    &__message,
    &__theme {
      display: none;
    }
    &__mobile {
      max-width: 673px;
      width: 100%;
      padding: 14px 33px 14px 27px;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      background: var(--color-black);
    }
  }
  @include screen(767.98px) {
    padding-right: 45px;
    &__link {
      font-size: 12px;
    }
  }
  @include screen(424.98px) {
    padding-right: 37px;
  }
}
.header-wrapper {
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  // background-color: var(--color-dynamic-white);
  z-index: 2;
  &--placeholder {
    height: 73px;
  }
  @include screen(1199.98px) {
    background-color: var(--color-black);
    &--mobile {
      max-width: 100%;
      background-color: var(--color-black);
      position: sticky;
      top: 55px;
      z-index: 2;
    }
    &--placeholder {
      background-color: var(--color-black);
      height: 61px;
      padding-bottom: 0;
    }
  }
}
.header-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin: -10px;
  text-decoration: none;
  &__title {
    color: var(--color-dynamic-gray);
    font-size: 12px;
  }
  &__icon {
    :deep(path),
    :deep(circle),
    :deep(rect) {
      fill: var(--color-dynamic-gray) !important;
      stroke: var(--color-dynamic-gray) !important;
    }
    :deep(mask) {
      display: none;
    }
  }
  &.router-link-active & {
    &__title {
      color: #e7e7e7;
    }
    &__icon {
      :deep(path),
      :deep(circle),
      :deep(rect) {
        fill: #e7e7e7 !important;
        stroke: #e7e7e7 !important;
      }
    }
  }
  @include screen(424.98px) {
    gap: 6px;
    &__icon {
      width: 24px !important;
      height: 24px !important;
      min-width: 24px !important;
      min-height: 24px !important;
      max-width: 24px !important;
      max-height: 24px !important;
    }
    &__title {
      font-size: 9px;
    }
  }
}
</style>
