<template>
  <div class="tw-w-full">
    <h1 class="tw-text-5xl tw-font-medium tw-text-white tw-pb-5">
      Borrow against my NFTs
    </h1>
    <div class="tw-text-lg tw-font-medium tw-capitalize tw-pb-12">
      Instantly take a loan against your NFTs. Escrow-free loans allows you to
      keep the collateral NFT in your wallet. When you accept a loan offer, a
      secure contract is created, freezing the NFT in-wallet. Not repaying by
      the due date means the lender can repossess your NFT. Successfully pay the
      loan in full by the expiration date to automatically thaw the NFT.
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
      content-class="!tw-w-[35%] !tw-bg-dark-9 !tw-border !tw-border-dark-3 !tw-border-solid !tw-rounded-[0.9375rem]"
    >
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-p-9 tw-gap-6"
      >
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
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
          class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full"
        >
          <div>
            <h3 class="tw-text-dark-1 tw-text-sm tw-uppercase">Interest</h3>
            <div class="tw-text-[#4CDA28] tw-text-xl">100%</div>
          </div>
          <div>
            <h3 class="tw-text-dark-1 tw-text-sm tw-uppercase">Duration</h3>
            <div class="tw-text-white tw-font-semibold tw-text-xl">
              {{ selectedCollection.duration }}d
            </div>
          </div>
          <div>
            <h3 class="tw-text-dark-1 tw-text-sm tw-uppercase">
              Available To Borrow
            </h3>
            <div
              class="tw-text-2xl tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
            >
              <img :src="aptIcon" alt="APT" /><span>{{
                selectedCollection.best_offer
                  ? selectedCollection.best_offer
                  : 0
              }}</span>
            </div>
          </div>
        </div>
        <div class="tw-w-full tw-h-[1px] tw-bg-[#444]"></div>
        <div class="tw-grid tw-grid-cols-3 tw-gap-2">
          <div
            class="tw-rounded-t-lg tw-flex tw-flex-col tw-items-start tw-justify-start tw-cursor-pointer"
            v-for="(item, i) in userTokens"
            :key="i"
            @click="selectNft(item)"
            :class="{
              'tw-border-2 tw-border-primary tw-border-solid': selectedNft[0]
                ? selectedNft[0].token_data_id === item.token_data_id
                : false,
            }"
          >
            <img
              class="tw-rounded-t-lg tw-w-full tw-h-full tw-object-cover"
              :src="item.image"
              alt="image"
            />
            <div
              class="tw-w-full tw-p-4 tw-border-b tw-border-l tw-border-r tw-border-dark-6 tw-border-solid tw-text-xs"
            >
              {{ item.current_token_data.token_name }}
            </div>
          </div>
        </div>
        <div class="tw-w-full tw-text-center">
          {{ selectedNft.length }} NFT Selected
        </div>
        <div class="tw-w-full tw-text-center">{{ finalAPT }}APT</div>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center"
        >
          <button-primary text="Borrow" @click="borrowNft" />
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { addBorrow } from "@/services/borrow";
import { getPools } from "@/services/pool";
import aptIcon from "@/assets/img/apt-icon.svg";
import { getTokensOfUser } from "@/services/indexer";
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
          value: "borrow",
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
      userTokens: [],
      selectedNft: [],
      filteredData: [],
      debounce: null,
      search: null,
      aptIcon,
    };
  },
  async mounted() {
    this.data = [];
    this.data = await getPools();
    this.filteredData = this.data;
  },
  methods: {
    async showLendDialog(item) {
      this.userTokens = [];
      this.selectedCollection = item;

      const res = await getTokensOfUser({
        collection_name: this.selectedCollection.collection_name,
        creator_address: this.selectedCollection.creator_address,
        wallet_address: this.walletAddress,
      });

      this.userTokens = res;

      this.lendDialog = true;
    },
    selectNft(item) {
      this.selectedNft = [];
      this.selectedNft.push(item);
    },
    async borrowNft() {
      const res = await this.$store.dispatch("wallet/borrowerSelect", {
        collection_name: this.selectedCollection.collection_name,
        token_name: this.selectedNft[0].current_token_data.token_name,
        property_version: this.selectedNft[0].property_version_v1
          ? this.selectedNft[0].property_version_v1
          : 0,
        lender_address: this.selectedCollection.lender,
      });

      if (res.success) {
        const expiration_date = new Date(
          Date.now() + 86400000 * this.selectedCollection.duration
        ).toISOString();

        const borrowRes = await addBorrow({
          lender: this.selectedCollection.lender,
          borrower: this.walletAddress,
          expiration_date: expiration_date,
          collection_name: this.selectedCollection.collection_name,
          token_name: this.selectedNft[0].current_token_data.token_name,
        });

        if (borrowRes) {
          this.$toast.showMessage({ message: "Loan Borrowed Successfully" });
        }
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
  computed: {
    walletAddress() {
      return this.$store.state.wallet.wallet.address;
    },
    finalAPT() {
      return this.selectedCollection.best_offer * this.selectedNft.length;
    },
  },
};
</script>
