<script setup>
import { computed, ref, watch } from "vue";
import Copy from "../components/Copy.vue";
import Icon from "../components/Icon.vue";
import IconVerify from "../components/icons/IconVerify.vue";
import IconQR from "../components/icons/IconQR.vue";
import IconShare from "../components/icons/IconShare.vue";
import IconCamera from "../components/icons/IconCamera.vue";
import IconDownload from "../components/icons/IconDownload.vue";
import IconTelegram from "../components/icons/IconTelegram.vue";
import IconFilledTelegram from "../components/icons/IconFilledTelegram.vue";
import IconPhone from "../components/icons/IconPhone.vue";
import IconEmail from "../components/icons/IconEmail.vue";
import IconLinkedIn from "../components/icons/IconLinkedIn.vue";
import Avatar from "../components/Avatar.vue";
import InterestsList from "../components/InterestsList.vue";
import Social from "../components/Social.vue";
import Button from "../components/Button.vue";
import { useUserStore } from "@/stores/user";
import UserNote from "../components/UserNote.vue";
import IconEnvelop from "../components/icons/IconEnvelop.vue";
import IconFacebook from "../components/icons/IconFacebook.vue";
import IconVK from "../components/icons/IconVK.vue";
import { useRoute, useRouter } from "vue-router";
// import {useHead} from 'unhead'

import Users from "../database/users.js";
import Modal from "../components/Modal.vue";
import UserHeader from "../components/UserHeader.vue";

const route = useRoute();
const id = computed(() => route.params.id);

const userStore = useUserStore();
const mainInfo = computed(() => userStore.userInfo);
const userInfo = computed(() => {
  if (id.value === userStore.userInfo.id) return userStore.userInfo;
  if (id.value) return Users[id.value];
  else return userStore.userInfo;
});

const isAuth = computed(() => userStore.isAuth);
const canShare = computed(() => {
  if (Navigator.share) return true;
  else return false;
});
const noteAboutUser = ref(mainInfo.value.notes?.[id.value]);

watch(noteAboutUser, () => {
  userStore.setNote(id.value, noteAboutUser.value);
});

const modalQR = ref(false);
const modalShare = ref(false);
const url = computed(() => {
  return window.location.href;
});

const getSrc = (src) =>
  new URL(`/src/assets/images/${src}`, import.meta.url).href;
// useHead({
// 	title: userInfo.value.name,
// 	meta: [
// 		{ property: 'og:title', content: userInfo.value.name },
// 		{ property: 'og:description', content: userInfo.value.description },
// 		{ property: 'og:image', content: getSrc(userInfo.value.src) },
// 		{ property: 'og:url', content: window.location.href },
// 	]
// })

// import { useMeta } from 'vue-meta'

// const meta = useMeta(
// 	computed(() => ({
// 		title: userInfo.value.name ?? 'KonTXT',
// 		meta: [
// 			{ property: 'og:title', content: userInfo.value.name },
// 			{ property: 'og:description', content: userInfo.value.description },
// 			{ property: 'og:image', content: getSrc(userInfo.value.src) },
// 			{ property: 'og:url', content: window.location.href },
// 		]
// 	}))
// )
// console.log(meta.meta)
import { definePerson, useSchemaOrg } from "@vueuse/schema-org";

useSchemaOrg([
  definePerson({
    name: userInfo.value.name,
    image: getSrc(userInfo.value.src),
    address: userInfo.value.address,
    jobTitle: userInfo.value.job,
    description: userInfo.value.description,
    worksFor: userInfo.value.company,
  }),
]);

const socials = computed(() => {
  return mainInfo.value.socials.filter(
    (social) => social.status !== "primary" && social.type !== "phone"
  );
});
const socialPhone = computed(() => {
  return mainInfo.value.socials.filter((social) => social.type === "phone")[0];
});
const socialPrimary = computed(() => {
  return mainInfo.value.socials.filter(
    (social) => social.status === "primary"
  )[0];
});
</script>

<template>
  <main class="user">
    <UserHeader @openShare="modalShare = true" @openQR="modalQR = true" />
    <div class="user__content">
      <div class="user-controlls user-controlls--mobile" v-if="isAuth">
        <Button class="user-controlls__button" :text="$t('button.write')" />
        <Button
          class="user-controlls__button"
          type="secondary"
          :text="$t('button.save')"
        />
      </div>
      <div class="user-note" v-if="id && isAuth">
        <p class="user-note__title text-h1">{{ $t("note") }}</p>
        <UserNote
          @update:value="(e) => (noteAboutUser = e)"
          :value="noteAboutUser"
        />
      </div>
      <div class="user-about" v-if="userInfo.description.status !== 'hidden'">
        <p class="user-about__title text-h1">{{ $t("titles.about") }}</p>
        <p
          class="user-about__text text-main"
          :class="
            userInfo.description.status === 'blur'
              ? 'user-about__text--blur'
              : ''
          "
        >
          {{
            userInfo.description.status === "blur"
              ? userInfo.description.value
                  .split(" ")
                  .map((e) =>
                    new Array(e.length).fill("A", 0, e.length).join("")
                  )
              : userInfo.description.value
          }}
        </p>
      </div>
      <div class="user-interes" v-if="userInfo.interests.status !== 'hidden'">
        <div class="user-interes__title text-h1">
          {{ $t("titles.interes") }}
        </div>
        <InterestsList
          :interests="userInfo.interests.value"
          :status="userInfo.interests.status"
        />
      </div>
      <div class="user-contacts">
        <p class="user-contacts__title text-h1">{{ $t("titles.contacts") }}</p>
        <!-- <Social type="phone" :status="item.type" :title="" link="+7 (495) 123-45-67"/> -->
        <!-- <Social :icon="IconFilledTelegram" :title="`${$t('preffered')} - Telegram`" link="@maria.tverdh007"/> -->
        <Social
          v-if="socialPhone && socialPhone.status !== 'primary'"
          :type="socialPhone.type"
          :link="socialPhone.href"
          :messenger="socialPhone.messenger"
          :status="socialPhone.status"
          :text="socialPhone.text"
        />
        <Social
          v-if="socialPrimary"
          :type="socialPrimary.type"
          :link="socialPrimary.href"
          status="primary"
          :text="socialPrimary.text"
        />
        <div class="user-contacts__all user-contacts__all--more">
          <Social
            v-for="(item, i) in socials"
            :key="i"
            :type="item.type"
            :link="item.href"
            :status="item.status"
            :text="item.text"
          />
        </div>
      </div>
      <div class="user-controlls user-controlls--footer">
        <Button
          class="user-controlls__button"
          :text="$t('button.savetophone')"
        />
        <Button
          class="user-controlls__button"
          type="secondary"
          :text="$t('button.save')"
          v-if="!isAuth"
        />
      </div>
    </div>
    <Modal :open="modalQR" @close="modalQR = false" small>
      <div class="modal__header">
        <p class="user-content__title text-h1">QR-код вашего профиля</p>
      </div>
      <div class="modal__content qr">
        <!-- <div class="qr__row">
					<div class="qr__info">
						<p class="text-main">{{ userInfo.name }}</p>
						<p class="text-comment-small">{{ userInfo.job }}, {{ userInfo.company }}</p>
					</div>
				</div> -->
        <div class="qr__qr">
          <Avatar
            :src="userInfo.src"
            :alt="userInfo.name"
            :size="74"
            class="qr__avatar"
          />
          <img src="@/assets/images/qr.png" alt="qr" />
        </div>
        <div class="qr__actions">
          <button class="qr__action">
            <Icon :name="IconDownload" />
          </button>
          <button class="qr__action">
            <Icon :name="IconCamera" />
          </button>
          <button
            class="qr__action"
            @click="
              canShare ? Navigator.share({ url: url }) : (modalShare = true)
            "
          >
            <Icon :name="IconShare" />
          </button>
        </div>
      </div>
    </Modal>
    <Modal :open="modalShare" @close="modalShare = false" share>
      <div class="share">
        <div class="share__input">
          <p class="text-comment">www.kontxt.me/id{{ userInfo.id }}</p>
          <Copy />
        </div>
        <div class="share__links">
          <a
            :href="`https://t.me/share/url?url=${url}`"
            class="share__link"
            target="_blank"
          >
            <Icon :name="IconTelegram" :size="24" />
          </a>
          <a
            :href="`mailto:?subject=Hello%20again`"
            class="share__link"
            target="_top"
          >
            <Icon :name="IconEnvelop" :size="24" />
          </a>
          <a
            :href="`https://www.facebook.com/sharer/sharer.php?u=${url}`"
            class="share__link"
            target="_blank"
          >
            <Icon :name="IconFacebook" :size="24" />
          </a>
          <a
            :href="`https://vk.com/share.php?url=${url}`"
            class="share__link"
            target="_blank"
          >
            <Icon :name="IconVK" :size="24" />
          </a>
          <a
            :href="`https://www.linkedin.com/sharing/share-offsite/?url=${url}`"
            class="share__link"
            target="_blank"
          >
            <Icon :name="IconLinkedIn" :size="24" />
          </a>
        </div>
      </div>
    </Modal>
  </main>
</template>

<style scoped lang="scss">
.share {
  padding: 40px;
  display: flex;
  gap: 30px;
  align-items: center;
  flex-direction: column;
  &__input {
    display: flex;
    border: 1px solid var(--color-dynamic-gray);
    border-radius: 1000px;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    width: 100%;
    justify-content: space-between;
    p {
      font-size: 16px;
    }
    :deep(path[fill]) {
      fill: var(--color-dynamic-gray);
    }
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 30px;
    align-items: center;
    margin: 0 auto;
  }
}
.qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  &__qr {
    position: relative;
  }
  &__avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  // &__row {
  // 	display: flex;
  // 	gap: 20px;
  // }
  // &__info {
  // 	padding-top: 4px;
  // 	display: flex;
  // 	flex-direction: column;
  // 	gap: 2px;
  // }
  &__actions {
    margin-top: 20px;
    display: flex;
    gap: 30px;
  }
  &__action {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
}
.user {
  margin-top: 45px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    &--mobile {
      display: none;
    }
  }

  &__content {
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  @include screen(767.98px) {
    &__header {
      display: none;
      &--mobile {
        display: flex;
        margin-top: 20px;
        gap: 10px;
      }
    }
    &__content {
      margin-top: 40px;
      gap: 40px;
    }
  }
}

.user-about,
.user-interes,
.user-contacts,
.user-note {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__text {
    &--blur {
      user-select: none;
      filter: blur(7px);
    }
  }
}

.user-contacts {
  &__all {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    &--more {
      display: grid;
      grid-template-columns: repeat(2, 200px);
      justify-content: space-between;
      @include screen(767.98px) {
        display: flex;
        flex-direction: column;
      }
    }
  }
  &__row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px 0;
  }
}
.modal {
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 8px;
    position: sticky;
    top: -1px;
    z-index: 1;
    background: var(--color-dynamic-white);
  }
}

.user-controlls {
  display: flex;
  gap: 20px 30px;
  align-items: center;
  flex-wrap: wrap;
  &--mobile {
    display: none;
  }
  &--footer {
    .user-controlls__button {
      max-width: 100%;
      width: auto;
      flex-grow: 1;
      min-width: 200px;
      &:first-child:last-child {
        max-width: 220px;
      }
    }
  }
  @include screen(767.98px) {
    display: none;
    &__button {
      max-width: 100%;
      &--pc {
        display: none;
      }
    }
    &--mobile,
    &--footer {
      display: flex;
      flex-direction: column;
      .user-controlls__button {
        width: 100%;
        &:first-child:last-child {
          max-width: 100%;
        }
      }
    }
  }
}
</style>
