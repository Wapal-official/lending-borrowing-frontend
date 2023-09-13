import {
  NetworkName,
  WalletCore,
  WalletName,
} from "@aptos-labs/wallet-adapter-core";
import { AptosClient } from "aptos";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";

let NODE_URL = `https://aptos-testnet.nodereal.io/v1/0a895e985f7f44988b049760b76f6510/v1`;

const pid =
  "0x802c67be7b4299cdbdab654c52a8e8fd344c8ae195581c2956a3bfb23b50bc09";

const client = new AptosClient(NODE_URL);

const wallets = [
  new PetraWallet(),
  new MartianWallet(),
  new RiseWallet(),
  new PontemWallet(),
  new FewchaWallet(),
];

const wallet = new WalletCore(wallets);

export const state = () => ({
  wallet: {},
});

export const mutations = {
  setWallet(state: any, payload: any) {
    state.wallet = payload;
  },
};

export const actions = {
  async connectWallet({ commit }: { commit: any }, payload: WalletName) {
    if (!wallet.isConnected()) {
      await wallet.connect(payload);
    }

    commit("setWallet", wallet.account);

    localStorage.setItem(
      "wallet",
      JSON.stringify({ ...wallet.account, name: payload })
    );

    return wallet.account;
  },
  async disconnectWallet({ commit }: { commit: any }) {
    await wallet.disconnect();
    commit("setWallet", { address: "" });

    localStorage.setItem("wallet", "");
  },
  async lenderOffer(
    {},
    {
      collection_name,
      amount,
      numberOfOffers,
    }: { collection_name: string; amount: number; numberOfOffers: number }
  ) {
    const payload = {
      function: pid + "::borrowlend::lender_offer",
      type: "entry_function_payload",
      type_arguments: [],
      arguments: [collection_name, formatPriceToAPT(amount), numberOfOffers],
    };

    const res = await executeTransaction(payload);

    return res;
  },
  async createPool() {
    const payload = {
      function: pid + "::borrowlend::initiate_create_pool",
      type: "entry_function_payload",
      type_arguments: [],
      arguments: [
        "0x5bc359322e350a79b37b9f557428e1f8e199b862546092179bd5e33bda8bd1c9",
        "los mint part II",
        10000,
        2,
      ],
    };

    const res = await executeTransaction(payload);

    return res;
  },
  async borrowerSelect(
    {},
    {
      collection_name,
      token_name,
      property_version,
      lender_address,
    }: {
      collection_name: string;
      token_name: string;
      property_version: number;
      lender_address: string;
    }
  ) {
    const payload = {
      function: pid + "::borrowlend::borrow_select",
      type: "entry_function_payload",
      type_arguments: [],
      arguments: [
        collection_name,
        token_name,
        property_version,
        lender_address,
      ],
    };

    const res = await executeTransaction(payload);

    return res;
  },
  async updatePool() {
    const payload = {
      type: "entry_function_payload",
      function: pid + "::borrowlend::update_pool",
      type_arguments: [],
      arguments: ["Liberating Creators V2", 86400, 1, true],
    };

    const res = await executeTransaction(payload);

    return res;
  },
  async payLoan() {
    const payload = {
      type: "entry_function_payload",
      function: pid + "::borrowlend::borrower_pay_loan",
      type_arguments: [],
      arguments: ["Liberating Creators V2", "Liberating Creators V2 #1665"],
    };

    const res = await executeTransaction(payload);

    return res;
  },
  async cancelLenderOffer() {
    const payload = {
      type: "entry_function_payload",
      function: pid + "::borrowlend::lender_offer_cancel",
      type_arguments: [],
      arguments: ["Liberating Creators V2"],
    };

    const res = await executeTransaction(payload);

    return res;
  },
  async lenderClaimNft() {
    const payload = {
      type: "entry_function_payload",
      function: pid + "::borrowlend::lender_claim_nft",
      type_arguments: [],
      arguments: ["Liberating Creators V2", "Liberating Creators V2 #1665"],
    };

    const res = await executeTransaction(payload);

    return res;
  },
};

export const getters = {
  getWalletsDetail() {
    return wallets;
  },
};

const executeTransaction = async (payload: any) => {
  const transaction = await wallet.signAndSubmitTransaction(payload);

  const result = await client.waitForTransactionWithResult(transaction.hash);

  if (result) {
    return result;
  }

  throw new Error("Execution Failed");
};

const formatPriceToAPT = (price: number) => {
  return Math.floor(price * Math.pow(10, 8));
};
