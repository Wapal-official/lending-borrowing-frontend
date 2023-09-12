import { db } from "@/services/db";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const collectionName =
  process.env.NETWORK === "testnet" ? "testnet_pool" : "mainnet_pool";

const lendingCollectionName =
  process.env.NETWORK === "testnet"
    ? "testnet_lending_offer"
    : "mainnet_lending_offer";

export const getPools = async () => {
  const pools = collection(db, collectionName);
  const poolQuery = query(pools);

  const res = await getDocs(poolQuery);

  const data: any[] = [];

  res.forEach(async (doc) => {
    const lending_offers = collection(db, lendingCollectionName);

    const lendingQuery = query(
      lending_offers,
      where("pool_id", "==", doc.id),
      orderBy("pool_id", "desc"),
      limit(1)
    );

    const lendingRes = await getDocs(lendingQuery);

    let best_offer = 0;
    let lender = "";
    let available_pool = 0;
    lendingRes.forEach((lendingDoc) => {
      if (lendingDoc.data()) {
        best_offer = lendingDoc.data().offer_per_nft;
        lender = lendingDoc.data().wallet_address;
      }
    });

    data.push({
      ...doc.data(),
      id: doc.id,
      best_offer: best_offer,
      lender: lender,
      available_pool: available_pool,
    });
  });

  return data;
};
