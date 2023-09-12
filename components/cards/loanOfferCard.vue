<template>
  <div
    class="tw-mx-3 tw-my-3 gradient-card tw-border-solid tw-border tw-rounded-2xl tw-white tw-py-6 tw-px-8"
  >
    <h4 class="tw-mb-2 tw-text-secondary tw-text-base tw-uppercase">
      {{ cardTitle }}
    </h4>
    <div
      class="tw-mb-4 tw-text-2xl tw-flex tw-flex-row tw-items-center tw-gap-2"
    >
      <span v-if="aptosImg"
        ><img :src="require(`~/assets/img/${aptosImg}`)" alt="aptos logo"
      /></span>
      <span>{{ cardValue }}</span>
    </div>
    <h4 class="tw-text-secondary tw-text-base">
      <span v-html="cardSubtitleHex"></span>
      {{ cardSubtitleValue }}
      {{ cardSubtitle }}
    </h4>
  </div>
</template>

<script>
export default {
  props: {
    cardTitle: String,
    cardValue: Number,
    aptosImg: String,
    cardSubtitleHex: String,
    cardSubtitleValue: Number,
    cardSubtitle: String,
  },
};
</script>

<style lang="css">
.gradient-card {
  background: var(
    --linear-glass,
    linear-gradient(
      90deg,
      rgba(255, 254, 254, 0.19) 1.98%,
      rgba(255, 255, 255, 0.04) 119.76%
    )
  );
}
</style>
