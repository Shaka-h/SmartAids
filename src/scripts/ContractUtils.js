import { profileFactory_Address, profileFactory_ABI, socialMedia_ABI, socialMedia, discussionContract_Address, DiscussionFactory_ABI } from '@/scripts/ContractConstants'
import {ethers} from 'ethers';

export const getProvider = () => {
    // return new ethers.providers.Web3Provider(window.ethereum);
    if (window.ethereum) {
        return new ethers.providers.Web3Provider(window.ethereum);
    } else {
        console.log("no wallet")
        return null;
    }
}

export const getSignerContract = () => {
    const signer = getProvider()?.getSigner();
    const nftProfileFactory_contract = new ethers.Contract(profileFactory_Address, profileFactory_ABI, signer);
    const socialMedia_contract = new ethers.Contract(socialMedia, socialMedia_ABI, signer);
    const discussion_contract = new ethers.Contract(discussionContract_Address, DiscussionFactory_ABI, signer);

    return { signer, nftProfileFactory_contract, socialMedia_contract, discussion_contract }
}