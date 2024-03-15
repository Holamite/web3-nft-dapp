import { ethers } from "ethers";
import erc721 from "../constants/erc721.json";
import { useCallback } from "react";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { isSupportedChain } from "../utils";

const useMintNft = (tokenId) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const estimatedGas = ethers.parseUnits("0.01", 18);

    const contract = new ethers.Contract(
      import.meta.env.VITE_contract_address,
      erc721,
      signer
    );

    try {
      const mint = await contract.safeMint(signer.address, tokenId, {
        value: estimatedGas,
      });

      const receipt = await mint.wait();

      if (receipt.status) {
        return console.log("mint Successfully");
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }, [tokenId, chainId, walletProvider]);
};
export default useMintNft;
