import {Box,Button,Flex,Image,Link,Spacer} from '@chakra-ui/react'
import Twitter from './assets/social-media-icons/twitter_32x32.png';
import Discord from './assets/social-media-icons/discord.png';
import { useEffect, useState } from 'react';

const Navbar = ({accounts,setAccounts}) => {
        const isConnected = Boolean(accounts[0]);
        const [address,setAddress]=useState("");

        async function connectAccount(){
                if(window.ethereum) {
                        const accounts = await window.ethereum.request({
                                method:"eth_requestAccounts",
                        })
                        setAccounts(accounts);
                        console.log("accounts: ",accounts)
                }
        }

        useEffect(()=>{
                if(accounts[0]){
                        setAddress(accounts[0].slice(0,3) + "..." + accounts[0].slice(39,42))
                }
        })

        return (<Flex justify="space-between" align="center" padding="30px">
                {/* left side */}
                <Flex justify="space-around" width="40%" padding="0 75px">
                        {/* <Link href="https://www.google.com">
                                <Image src={Facebook} boxSize="42px" margin="0 15px" />
                        </Link> */}
                        <Link href="https://twitter.com/RocketFrogsClub?t=a6P2wwQRyMi77NUKDQR6wQ&s=09">
                                <Image src={Twitter} boxSize="42px" margin="0 15px" />
                        </Link>
                        <Link href="https://discord.gg/BDRpmNHJky">
                                <Image src={Discord} boxSize="42px" margin="0 15px" />
                        </Link>
                </Flex>


                {/* right side */}
                <Flex
                        justify={"space-around"}
                        align="center"
                        width="40%"
                        padding="30px"
                >
                        {/* <Box margin="0 15px">About</Box> */}
                        <Spacer/>
                        {/* <Box margin="0 15px">FAQ</Box> */}
                        <Spacer/>
                        {/* connect button */}
                {
                        isConnected ? 
                        (
                                <Box margin="0 15px" sx={{border:"1px solid white",padding:"4px",color:"white",fontSize:"25px"}}>{address}</Box>
                        )
                        :
                        (
                                <Button 
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit" //font family doesn't get inherited correctly with button that's why we explicitly declare it here
                                padding="15px"
                                margin="0 15px"
                                onClick={connectAccount}>Connect</Button>
                        )
                }
                </Flex>
        </Flex>);
}
export default Navbar;