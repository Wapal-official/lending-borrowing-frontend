<template>
  <div>
    <button-primary
      text="Connect Wallet"
      v-if="!wallet.address"
      @click="connectWalletDialog = true"
    />
    <button-primary :text="getWalletAddress" v-else />
    <connect-wallet-modal
      :connectDialog="connectWalletDialog"
      @close="connectWalletDialog = false"
    />
  </div>
</template>
<script>
export default {
  computed: {
    wallet() {
      return this.$store.state.wallet.wallet;
    },
    getWalletAddress() {
      if (this.wallet) {
        return this.wallet.address;
      }
    },
  },
  data() {
    return {
      connectWalletDialog: false,
    };
  },
};
</script>
