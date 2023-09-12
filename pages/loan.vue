<template>
  <div class="max-w-1322 tw-px-3 tw-mx-auto">
    <div class="tw-mb-16">
      <h1 class="tw-text-5xl tw-mb-5">My loans</h1>
      <p class="tw-text-lg">
        Here are the NFTs you borrowed against. You must pay these in full by
        the expiration date in order to keep your NFT.
      </p>
    </div>
    <div class="tw-pt-5">
      <div class="tw-mb-16">
        <p class="tw-text-center tw-text-secondary tw-capitalize">
          No active or completed loans.
        </p>
      </div>
      <div class="tw-flex tw-flex-wrap tw-justify-center max-w-1000 tw-mx-auto">
        <div v-for="(cardItem, index) in cardItems" :key="index">
          <CardsLoanOfferCard
            :cardTitle="cardItem.cardTitle"
            :aptosImg="cardItem.aptosImg"
            :cardValue="cardItem.cardValue"
            :cardSubtitle="cardItem.cardSubtitle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardItems: [
        {
          cardTitle: "TOTAL ACTIVE LOANS",
          cardValue: 0,
        },
        {
          cardTitle: "TOTAL BORROWED",
          aptosImg: "aptos.svg",
          cardValue: 0,
        },
        {
          cardTitle: "TOTAL INTEREST OWED",
          aptosImg: "aptos.svg",
          cardValue: 0,
        },
      ],
    };
  },
};
</script>

<style lang="css">
.max-w-1322 {
  max-width: 1322px;
}
</style>
