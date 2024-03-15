import { Flex } from "@radix-ui/themes";

export default function Header() {
  return (
    <Flex gap={"4"} align={"center"} className="justify-between items-center">
      <div>Meta NFT</div>
      <w3m-button />
    </Flex>
  );
}
