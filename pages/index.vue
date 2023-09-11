<template>
  <div class="tw-w-full tw-bg-dark-9 tw-h-screen">
    <div class="tw-container"></div>
  </div>
</template>

<script>
export default {
  methods: {
    async lendTransaction() {
      const res = await this.$store.dispatch("wallet/lenderOffer");
      console.log(res);
    },
    async borrowTransaction() {
      const res = await this.$store.dispatch("wallet/borrowerSelect");

      console.log(res);
    },
  },
};
</script>
