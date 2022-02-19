import React from "react";
import Header from "../../components/Header";
import { useEffect, useMemo, useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useRouter } from "next/router";
import NFTImage from "../../components/nft/NFTImage";
import GeneralDetails from "../../components/nft/GeneralDetails";
import ItemActivity from "../../components/nft/ItemActivity";
import Purhcase from "../../components/nft/Purhcase";

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

function Nft() {
  const { provider } = useWeb3();
  const [selectedNft, setSelectedNft] = useState();
  const [listings, setListings] = useState([]);
  const router = useRouter();

  const nftModule = useMemo(() => {
    if (!provider) return;
    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      "https://eth-rinkeby.alchemyapi.io/v2/vx3PkArc-QmFABhlD3QvZ8neahAtXPQ5"
    );
    return sdk.getNFTModule("0xcfc86e3a7d9fca68fdd4215ca0121f5aa7871afb");
  }, [provider]);

  useEffect(() => {
    if (!nftModule) return;
    (async () => {
      const nfts = await nftModule.getAll();
      const selectedNftItem = nfts.find((nft) => nft.id == router.query.nftid);
      setSelectedNft(selectedNftItem);
    })();
  }, [nftModule]);

  const marketPlaceModule = useMemo(() => {
    if (!provider) return;
    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      "https://eth-rinkeby.alchemyapi.io/v2/vx3PkArc-QmFABhlD3QvZ8neahAtXPQ5"
    );
    return sdk.getMarketplaceModule(
      "0x2d2ea90bfe92F6B69CC2409C5FB37D4e9709F9cD"
    );
  }, [provider]);

  useEffect(() => {
    if (!marketPlaceModule) return;
    (async () => {
      setListings(await marketPlaceModule.getAllListings());
    })();
  }, [marketPlaceModule]);

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purhcase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketPlaceModule={marketPlaceModule}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  );
}

export default Nft;
