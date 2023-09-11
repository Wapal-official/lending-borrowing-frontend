<template>
  <button
    class="tw-text-white tw-bg-black tw-border-transparent tw-rounded tw-px-6 tw-py-2 tw-text-sm tw-font-medium"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>
<script lang="ts">
export default {
  props: { text: { type: String } },
};
</script>
