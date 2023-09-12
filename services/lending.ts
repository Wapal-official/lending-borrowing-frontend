import { db } from "@/services/db";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

export const addLendingOffers = async () => {
  try {
    const doc = await addDoc(collection(db, "lending_offer"), {
      collection_name: "test2",
      number_of_offers: 1,
      offer_per_nft: 1,
      wallet_address: "0x12",
    });

    console.log(doc);
  } catch (error) {
    console.log(error);
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
