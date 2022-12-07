import {useState} from 'react';
import {ethers,BigNumber} from 'ethers';
import kavli from './kavli.json';
import {Box,Button,Flex,Input,Text} from '@chakra-ui/react'
// import Web3 from "web3";


const psoliAddress = "0x9Cde01341f44316FaB8F8C214dD26C8b2B6ec977"

const MainMint = ({accounts,setAccounts}) => {
    const [mintAmount,setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint(){
        if(window.ethereum){

 
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                psoliAddress,
                kavli.abi,
                signer,
            );
            // let web3 = new Web3(window.ethereum);
            // let contract = await new web3.eth.Contract(kavli.abi, psoliAddress);
            // console.log("contract: ",contract)
            try{
                // const response = await contract.mint(BigNumber.from(mintAmount));
                // const gasPrice= signer.gasPrice;
                // console.log("gasPrice: ",gasPrice)
                // const gasLimit = contract.estimateGas.mint(BigNumber.from(10));
                // console.log("gasLimit: ",gasLimit)
                console.log("address: ",accounts[0]);
                const response = await contract.mint(BigNumber.from(mintAmount),{value:String(6900000000000000*mintAmount)})
                // console.log(response)

                // const result = contract.methods.mint(mintAmount).send({from:accounts[0],value:String(69000000000000000)})
            }catch(err){
                console.log("error: ",err)
            }
        }
    }

    function handleDecrement() {
        if(mintAmount <= 1){
            return;
        }else{
            setMintAmount(mintAmount-1);
        }
    }

    function handleIncrement() {
        if(mintAmount >= 3){
            return;
        }else{
            setMintAmount(mintAmount+1);
        }
    }

    return (
        <div>
        <Flex justify="center" align="center" height="100%" paddingBottom="150px"  >
            <Box width="520px" >
                <div>
                    <Text fontSize="48px" textShadow={"0 5px #000000"} style={{color:"white"}}>The Rocket 🚀 Frogs 🐸 Club</Text>
                    <Text
                    fontSize={"30px"}
                    letterSpacing="-5.5%"
                    fontFamily={"Tiro Telugu"}
                    textShadow="0 2px 2px #000000"
                    style={{color:"white"}}>The Rocket Frogs Club is a collection of 5000 randomly generated #NFTs living on the #Polygon blockchain.</Text>
                    <Text color={"white"}>
                        Half the money collected will be donated Polar Bears Int.
                    </Text>
                </div>

                {
                    isConnected ? 
                    (
                        <div>
                            <Flex align="center" justify="center">
                                <Button 
                                backgroundColor={"#D6517D"}
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor={"pointer"}
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleDecrement}> - </Button>
                                <Input 
                                readOnly
                                fontFamily={"inherit"}
                                width="100px"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px"
                                type="number"
                                value={mintAmount} />
                                <Button
                                backgroundColor={"#D6517D"}
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor={"pointer"}
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleIncrement}> + </Button>
                            </Flex>
                            <Button 
                            backgroundColor={"#D6517D"}
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor={"pointer"}
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleMint}>Mint</Button>
                        </div>
                    )
                    :
                    (
                        <div>
                            <p style={{color:"white"}}>you must be connected to mint</p>
                        </div>
                    )
                }
            </Box>

        </Flex>
    </div>
    );
}
export default MainMint;
