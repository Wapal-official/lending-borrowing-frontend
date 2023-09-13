import axios from "axios";
const GRAPHQL_URL =
  "https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql";

export const getTokensOfUser = async ({
  creator_address,
  collection_name,
  wallet_address,
}: {
  creator_address: string;
  collection_name: string;
  wallet_address: string;
}) => {
  const query = {
    operationName: "GetTokensOfUser",
    query: `query GetTokensOfUser($COLLECTION_NAME:String, $CREATOR_ADDRESS:String, $WALLET_ADDRESS:String){
        current_token_ownerships_v2(
            where: {
                amount:{_gt:0},
                owner_address: {_eq: $WALLET_ADDRESS}, 
                current_token_data: {
                                        current_collection: {
                                                            collection_name: {_eq: $COLLECTION_NAME}, 
                                                            creator_address: {_eq: $CREATOR_ADDRESS}
                                    }
                                }
                    }
            limit:10
          ){
            current_token_data {
                token_name
                current_collection {
                  collection_name
                }
                token_uri
              }
              token_data_id
              property_version_v1
          }
    }`,
    variables: {
      WALLET_ADDRESS: wallet_address,
      CREATOR_ADDRESS: creator_address,
      COLLECTION_NAME: collection_name,
    },
  };

  const res = await axios.post(GRAPHQL_URL, query);

  if (res.data.data) {
    const data = res.data.data.current_token_ownerships_v2;

    const promiseRes = await Promise.all(
      data.map(async (token: any) => {
        let metadata_uri = token.current_token_data.token_uri;

        if (metadata_uri) {
          if (metadata_uri.slice(0, 7) == "ipfs://") {
            metadata_uri = `https://cloudflare-ipfs.com/ipfs/${metadata_uri.slice(
              7
            )}`;
          }
        }

        const metadata = await axios.post(metadata_uri);

        let image = metadata.data.image;

        if (image.slice(0, 7) === "ipfs://") {
          image = `https://cloudflare-ipfs.com/ipfs/${image.slice(7)}`;
        }

        token.image = image;
      })
    );

    return data;
  }

  return [];
};
