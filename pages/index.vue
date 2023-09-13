<template>
  <div class="tw-w-full">
    <h1 class="tw-text-5xl tw-font-medium tw-text-white tw-pb-5">
      Make loan offers on NFT collections.
    </h1>
    <div class="tw-text-lg tw-font-medium tw-capitalize tw-pb-12">
      Make loan offers on NFT collections.Browse collections below, and name
      your price. The current best offer will be shown to borrowers. To take
      your offer, they lock in an NFT from that collection to use as collateral.
      You will be repaid at the end of the loan, plus interest. If they fail to
      repay, you get to keep the NFT.
    </div>
    <div class="tw-w-full tw-pb-12">
      <text-field
        placeholder="Search NFTs, Collections"
        @input="searchCollection"
        v-model="search"
      >
        <template #prepend-icon>
          <i class="bx bx-search tw-text-xl"></i>
        </template>
      </text-field>
    </div>
    <table-data-table
      :headers="headers"
      :items="filteredData"
      @buttonClicked="showLendDialog"
    />
    <v-dialog
      v-model="lendDialog"
      v-if="lendDialog"
      content-class="!tw-w-[30%] !tw-bg-dark-9 !tw-border !tw-border-dark-3 !tw-border-solid !tw-rounded-[0.9375rem]"
    >
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-9 tw-gap-6"
      >
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2"
        >
          <img
            class="tw-rounded-full tw-w-[76px] tw-h-[76px] tw-object-cover"
            :src="selectedCollection?.image"
            width="76px"
            height="76px"
          />
          <h2 class="tw-text-white tw-text-sm tw-font-medium">
            {{ selectedCollection.collection_name }}
          </h2>
        </div>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-4/5"
        >
          <div>
            <h3 class="tw-text-dark-1 tw-text-sm tw-uppercase">APY</h3>
            <div class="tw-text-[#4CDA28] tw-font-semibold tw-text-xl">
              100%
            </div>
          </div>
          <div>
            <h3 class="tw-text-dark-1 tw-text-sm tw-uppercase">Duration</h3>
            <div class="tw-text-white tw-font-semibold tw-text-xl">
              {{ selectedCollection.duration }}
            </div>
          </div>
          <div>
            <h3 class="tw-text-dark-1 tw-text-sm tw-uppercase">Floor</h3>
            <div
              class="tw-font-medium tw-text-2xl tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
            >
              <img :src="aptIcon" alt="APT" /><span>30</span>
            </div>
          </div>
        </div>
        <div class="tw-w-full tw-h-[1px] tw-bg-[#444]"></div>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-start tw-justify-between tw-gap-6"
        >
          <div>
            <text-field
              label="Offer Amount"
              :small="true"
              placeholder="Amount"
              v-model="amount"
            >
              <template #prepend-icon>
                <img :src="aptIcon" alt="apt icon" /> </template
            ></text-field>
          </div>
          <div>
            <text-field
              label="Total Interest"
              :small="true"
              placeholder="Interest"
              v-model="amount"
              :disabled="true"
            >
              <template #prepend-icon>
                <img :src="aptIcon" alt="apt icon" /> </template
            ></text-field>
          </div>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2"
        >
          <label class="tw-text-sm tw-font-semibold"> Number of Offers</label>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-6"
          >
            <input
              type="radio"
              id="option1"
              name="options"
              value="1"
              v-model="numberOfOffers"
            />
            <label for="option1" class="button"> 1</label>

            <input
              type="radio"
              id="option2"
              name="options"
              value="4"
              v-model="numberOfOffers"
            />
            <label for="option2" class="button"> 4</label>

            <input
              type="radio"
              id="option3"
              name="options"
              value="14"
              v-model="numberOfOffers"
            />
            <label for="option3" class="button"> 14</label>
          </div>
        </div>
        <div class="tw-w-full tw-text-center">
          Your Total APT is {{ finalAPT }}APT
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center"
        >
          <button-primary text="Place Offer" @click="placeOffer" />
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { addLendingOffers } from "@/services/lending";
import { getPools } from "@/services/pool";
import aptIcon from "@/assets/img/apt-icon.svg";
export default {
  data() {
    return {
      headers: [
        {
          text: "Collection",
          align: "start",
          value: "collection_name",
          width: "264px",
          class: "default-data-table-header",
          showImage: true,
          showSerialNumber: true,
        },
        {
          text: "Available Pool",
          align: "start",
          value: "available_pool",
          width: "200px",
          class: "default-data-table-header",
          showAptIcon: true,
        },
        {
          text: "Best Offer",
          align: "start",
          value: "best_offer",
          width: "200px",
          class: "default-data-table-header",
        },
        {
          text: "Apy",
          align: "start",
          value: "apy",
          width: "100px",
          class: "default-data-table-header",
        },
        {
          text: "Duration",
          align: "start",
          value: "duration",
          width: "200px",
          class: "default-data-table-header",
        },
        {
          value: "leasing",
          button: true,
          text: "",
          width: "100px",
        },
      ],
      data: [],
      lendDialog: false,
      amount: null,
      interest: 0,
      numberOfOffers: 1,
      selectedCollection: null,
      filteredData: [],
      debounce: null,
      search: null,
      aptIcon,
    };
  },
  methods: {
    async lendTransaction() {
      const res = await this.$store.dispatch("wallet/lenderOffer");
      console.log(res);
    },
    async borrowTransaction() {
      const res = await this.$store.dispatch("wallet/borrowerSelect");

      console.log(res);
    },
    async createDocument() {
      // await addLendingOffers();
    },
    showLendDialog(item) {
      this.selectedCollection = item;
      this.lendDialog = true;
    },
    async placeOffer() {
      try {
        const res = await this.$store.dispatch("wallet/lenderOffer", {
          collection_name: this.selectedCollection.collection_name,
          numberOfOffers: this.numberOfOffers,
          amount: this.amount,
        });

        if (res.success) {
          const lendingRes = await addLendingOffers({
            wallet_address: this.$store.state.wallet.wallet.address,
            number_of_offers: this.numberOfOffers,
            total_amount: this.finalAPT,
            collection_name: this.selectedCollection.collection_name,
            offer_per_nft: this.amount,
            pool_id: this.selectedCollection.id,
          });

          this.$toast.showMessage({ message: "Offer Placed Successfully" });

          this.data.map((offer) => {
            if (
              offer.collection_name === this.selectedCollection.collection_name
            ) {
              if (this.amount > offer.best_offer) {
                offer.best_offer = this.amount;
              }
            }
          });
        }

        this.lendDialog = false;
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({
          message: "Something Went Wrong",
          error: true,
        });
        this.lendDialog = false;
      }
    },
    searchCollection() {
      clearTimeout(this.debounce);

      if (!this.search) {
        this.clearSearch();
        return;
      }

      if (this.search.length < 3) {
        return;
      }

      this.debounce = setTimeout(() => {
        this.filteredData = [];

        this.filteredData = this.data.filter((item) =>
          item.collection_name.toLowerCase().includes(this.search.toLowerCase())
        );
      }, 300);
    },
    clearSearch() {
      this.filteredData = this.data;
    },
  },
  async mounted() {
    this.data = [];
    this.data = await getPools();
    this.filteredData = this.data;
  },
  computed: {
    finalAPT() {
      if (this.amount) {
        return this.amount * this.numberOfOffers;
      }
      return 0;
    },
  },
};
</script>
<style scoped>
/* Hide the default radio button */
input[type="radio"] {
  display: none;
}

/* Style the label as a button */
label.button {
  padding: 0.625rem 2.25rem;
  border-radius: 0.25rem;

  @apply tw-border tw-border-solid tw-border-white;
}

/* Style the label when the radio button is checked */
input[type="radio"]:checked + label.button {
  @apply !tw-border-primary;
}
</style>
