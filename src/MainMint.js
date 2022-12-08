import {useState} from 'react';
import {ethers,BigNumber} from 'ethers';
import kavli from './kavli.json';
import {Box,Button,Alert,Flex,Input,Text} from '@chakra-ui/react'
import LogoBears from './assets/social-media-icons/Logo-pbi-white.png';


const psoliAddress = "0x4A527ef00F3319FAF793B3400A5761e2fc69df9D"

const MainMint = ({accounts,setAccounts}) => {
    const [mintAmount,setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);
    const [notification,setNotification] = useState("")

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
                setNotification(`https://mumbai.polygonscan.com/tx/${response.hash}`)
                console.log(response)
                alert("success!")

                // const result = contract.methods.mint(mintAmount).send({from:accounts[0],value:String(69000000000000000)})
            }catch(err){
                alert("error! try again")
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
        if(mintAmount >= 69){
            return;
        }else{
            setMintAmount(mintAmount+1);
        }
    }

    return (
        <div>
        <Flex justify="center" align="center" height="100%" paddingBottom="150px"  >
            <Box width="520px" >
                {
                    notification ? 
                    (
                        <Alert status='error' variant="solid" sx={{color:"white",fontSize:"20px", border:"1px solid green",textDecoration:"none"}}>
                            <a href={notification} target={"_blank"} rel="noreferrer" style={{textDecoration:"none",color:"white"}}>
                                {notification}
                            </a>
                        </Alert>
                    ) 
                    :
                    (null)
                }
                <div>
                    <Text fontSize="48px" textShadow={"0 5px #000000"} style={{color:"white"}}>The Rocket 🚀 Frogs 🐸 Club</Text>
                    <Text
                    fontSize={"30px"}
                    letterSpacing="-5.5%"
                    fontFamily={"Tiro Telugu"}
                    textShadow="0 2px 2px #000000"
                    style={{color:"white"}}>The Rocket Frogs Club is a collection of 5000 randomly generated #NFTs living on the #Polygon blockchain.</Text>
                    <Text color={"white"}>
                        Half the money collected will be donated <a href="https://polarbearsinternational.org/" target="_blank" rel="noreferrer" style={{textDecoration:"none",color:"white",fontSize:"35px"}}>Polar Bears Int.</a> 
                    </Text>
                    <img src={LogoBears} alt="" height={180} width={180} />
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
                                fontSize="20px"
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
                                fontSize="25px"
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
                                fontSize="20px"
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
                            fontSize="30px"
                            onClick={handleMint}>Mint</Button>
                        <h2 style={{color:"white"}}>${13*mintAmount} $MATIC</h2>
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
