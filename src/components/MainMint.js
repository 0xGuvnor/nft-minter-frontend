import { useState } from "react";
import { BigNumber, ethers } from "ethers";
import { Flex, Box, Button, Input, Text } from "@chakra-ui/react";
import roboPunksABI from "../constants/RoboPunksNFT.json";
import networkMapping from "../constants/networkMapping.json";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);
  // const chainId = window.ethereum.networkVersion.toString() || 0;
  const chainId = getChainId();
  const roboPunksAddress = isConnected
    ? networkMapping[chainId]["RoboPunksNFT"][0]
    : "";

  function getChainId() {
    try {
      return window.ethereum.networkVersion.toString();
    } catch (e) {
      return 0;
    }
  }

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksAddress,
        roboPunksABI,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.0001 * mintAmount).toString()),
        });
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000000">
            RoboPunks
          </Text>
          <Text
            fontSize="30px"
            textShadow="0 2px 2px #000000"
            letterSpacing="-5.5%"
            fontFamily="VT323"
          >
            The year is 2022, Ethereum is trading at 4 packets of Tian Tian
            roasted drumstick chicken rice and Su Zhu makes a living from
            cleaning toilets at Newton Food Centre. Can the RoboPunks save
            crypto from drilling for the 69th straight week? Mint one to find
            out!
          </Text>
        </div>
        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                readOnly
                fontFamily="inherit"
                width="100px"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                type="number"
                value={mintAmount}
              />
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
              onClick={handleMint}
            >
              Mint now
            </Button>
          </div>
        ) : (
          <Text
            marginTop="70px"
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 3px #000000"
            color="#D6517D"
          >
            You have to connect your wallet to mint.
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
