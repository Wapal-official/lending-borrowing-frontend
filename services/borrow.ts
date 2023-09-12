import { db } from "@/services/db";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

const collectionName =
  process.env.NETWORK === "testnet" ? "testnet_borrow" : "mainnet_borrow";

export const addBorrow = async ({
  lender,
  token_name,
  collection_name,
  borrower,
  expiration_date,
}: {
  lender: string;
  token_name: string;
  collection_name: string;
  borrower: string;
  expiration_date: string;
}) => {
  try {
    const doc = await addDoc(collection(db, collectionName), {
      collection_name: collection_name,
      lender: lender,
      borrower: borrower,
      token_name: token_name,
      expiration_time: expiration_date,
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

export const getBorrow = async () => {
  const lendingOffers = collection(db, collectionName);
  const lendingQuery = query(lendingOffers);

  const res = await getDocs(lendingQuery);

  res.forEach((doc) => {
    console.log(doc.data());
  });
};
