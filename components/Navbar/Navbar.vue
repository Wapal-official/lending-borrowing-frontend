<template>
  <div
    class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between tw-px-8 tw-py-6 tw-border tw-border-b-black tw-absolute tw-top-0 tw-bg-transparent md:tw-px-[3.75rem]"
  >
    <a href="/"><img :src="logo" alt="logo" width="120px" height="35px" /></a>
    <connect-wallet />
  </div>
</template>
<script>
import logo from "@/assets/img/logo.svg";

export default {
  data() {
    return {
      logo,
    };
  },
};
</script>
