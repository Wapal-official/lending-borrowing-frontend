<template>
  <button
    class="tw-capitalize tw-text-white tw-bg-primary tw-border-solid tw-border tw-border-transparent tw-rounded tw-px-6 tw-py-2 tw-text-sm tw-font-normal tw-tracking-[0.0625rem]"
    @click="$emit('click')"
    :class="{
      '!tw-border-primary tw-bg-transparent': secondary,
      '!tw-border-white tw-bg-transparent': white,
    }"
  >
    <div class="tw-flex tw-flex-row tw-items-center tw-justify-start">
      <slot name="prepend-icon"> </slot>
      <span>{{ text }}</span>
    </div>
  </button>
</template>
<script lang="ts">
export default {
  props: {
    text: { type: String },
    secondary: { default: false, type: Boolean },
    white: { default: false, type: Boolean },
  },
};
</script>
