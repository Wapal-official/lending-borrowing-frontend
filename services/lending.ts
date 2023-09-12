import { db } from "@/services/db";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

const collectionName =
  process.env.NETWORK === "testnet"
    ? "testnet_lending_offer"
    : "mainnet_lending_offer";

export const addLendingOffers = async ({
  wallet_address,
  number_of_offers,
  total_amount,
  collection_name,
  offer_per_nft,
}: {
  wallet_address: string;
  number_of_offers: number;
  total_amount: number;
  collection_name: string;
  offer_per_nft: number;
}) => {
  try {
    const doc = await addDoc(collection(db, collectionName), {
      collection_name: collection_name,
      number_of_offers: number_of_offers,
      offer_per_nft: offer_per_nft,
      wallet_address: wallet_address,
      total_amount: total_amount,
    });

    if (doc.id) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getLendingOffers = async () => {
  const lendingOffers = collection(db, "lending_offer");
  const lendingQuery = query(lendingOffers);

  const res = await getDocs(lendingQuery);

  res.forEach((doc) => {
    console.log(doc.data());
  });
};
