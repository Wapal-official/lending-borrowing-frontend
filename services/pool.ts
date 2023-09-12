import { db } from "@/services/db";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

const collectionName =
  process.env.NETWORK === "testnet" ? "testnet_pool" : "mainnet_pool";

export const getPools = async () => {
  const pools = collection(db, collectionName);
  const poolQuery = query(pools);

  const res = await getDocs(poolQuery);

  const data: any[] = [];

  res.forEach((doc) => {
    console.log(doc.data());

    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
};
