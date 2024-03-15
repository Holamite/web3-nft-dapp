import { useCallback } from "react";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import abi from "../constants/erc721.json";
import { ethers } from "ethers";
// import { toast } from "react-toastify";

const useTransferNft = (address, edition) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const contract = new ethers.Contract(
      import.meta.env.VITE_contract_address,
      abi,
      signer
    );

    try {
      const transaction = await contract.transferFrom(
        signer.address,
        address,
        edition
      );
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        return console.log("Transfer Successful!");
      }

      console.log("Transfer failed!");
    } catch (error) {
      console.error(error);
    }
  }, [address, chainId, walletProvider, edition]);
};

export default useTransferNft;
