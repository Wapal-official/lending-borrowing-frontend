<template>
  <div class="max-w-1320 tw-mx-auto">
    <div class="tw-mb-16">
      <h1 class="tw-text-5xl tw-text-white tw-mb-5">My offers and contracts</h1>
      <p class="tw-text-lg">
        Once your offer is accepted by a borrower, a secure contract is created,
        freezing the NFT in their wallet. When the loan ends, you will get paid
        the total SOL (loan with interest). In the event of a default, you can
        foreclose, which transfers the collateral NFT to your wallet.
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
            :cardSubtitleHex="cardItem.cardSubtitleHex"
            :cardSubtitleValue="cardItem.cardSubtitleValue"
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
          cardTitle: "TOTAL INTEREST EARNED (ALL TIME)",
          aptosImg: "aptos.svg",
          cardValue: 0,
          cardSubtitleHex: "+&#9678",
          cardSubtitleValue: 0,
          cardSubtitle: "expected from active loans",
        },
        {
          cardTitle: "TOTAL ACTIVE LOAN VALUE",
          aptosImg: "aptos.svg",
          cardValue: 0,
          cardSubtitleValue: 0,
          cardSubtitle: "active loans",
        },
        {
          cardTitle: "TOTAL OFFER VALUE",
          aptosImg: "aptos.svg",
          cardValue: 0,
          cardSubtitleValue: 0,
          cardSubtitle: "open offers",
        },
        {
          cardTitle: "FORECLOSURE RATE",
          cardValue: 0,
          cardSubtitleValue: 0,
          cardSubtitle: "active loans",
        },
        {
          cardTitle: "TOTAL OFFER VALUE",
          cardValue: 0,
          cardSubtitleValue: 0,
          cardSubtitle: "open offers",
        },
      ],
    };
  },
};
</script>

<style lang="css">
.max-w-1320 {
  max-width: 1320px;
}

.max-w-1000 {
  max-width: 1000px;
}
</style>
