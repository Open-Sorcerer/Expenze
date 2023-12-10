# Expenze

*The Complete Cross-chain Payment Solution:  Split Expenses with Friends, Roommates, and Group Trips Easily.*

## **The Problem It Solves**

**EXPENZE** is a mobile-first, Web3-oriented decentralized application (DApp) providing a cross-chain expense payment solution. It empowers groups - whether friends, colleagues, or hackathon partners - to efficiently split and settle expenses across different blockchain networks. In the Web3 era, the common issue is managing payments in fiat while earnings are predominantly in crypto, particularly from hackathon winnings. EXPENZE addresses the complexity where individuals prefer receiving tokens on various chains.

### **Key Features:**

- **Mobile-First Experience**: Optimized for on-the-go access.
- **Exceptional User Interface**: Focused on providing an engaging and intuitive experience.
- **Cross-Chain Token Transfers**: Enabled by integrating Chainlink CCIP and Zetachain.
- **Off-Chain Expense Calculation**: Ensures that each group member only needs to perform one transaction, enhancing the user experience and saving on gas fees.

## **Challenges We Ran Into**

- **React Native DApp Development**: Integrating wallet connectivity posed a significant challenge.
- **Transaction Simulation**: Creating values for CCIP's **`ccipSend`** and Zetachain's **`onCrossChainCall`**.
- **Omnichain vs. Cross-Chain Contracts**: Deciding the appropriate contract flow and building Omnichain smart contracts on Zetachain.
- **WalletConnect Integration**: Seamlessly integrating WalletConnect and other Web3 wallets into the React Native DApp.
- **Understanding Zetachain**: Grasping the flow and mechanics of Zetachain interactions.

## **Technologies We Used**

### **Protocols**

- Chainlink CCIP
- Zetachain
- Scroll

### **Frontend**

- React Native
- Redis
- WalletConnect
- Web3Modal
- Expo

### **Integration**

- viem
- wagmi
- zustand

## **Links**

### **CCIP Transactions**

- [Transaction 1](https://ccip.chain.link/msg/0x715bec7ad556e96d86c171ff29cf9ee54652e45a5bac1c5947d4d59095bd2309)
- [Transaction 2](https://ccip.chain.link/msg/0xd00cc0ac70da08c2f3fb0a3543a73ead7e27158cec97abb13de569dc47afbc00)

### **ZetaChain Contract Address**

- [Contract Address](https://athens3.explorer.zetachain.com/address/0x942a156cd363CC04Eac8577a509D360eFb5453Fa): **`0x942a156cd363CC04Eac8577a509D360eFb5453Fa`**
- [Explorer Link](https://athens3.explorer.zetachain.com/address/0x942a156cd363CC04Eac8577a509D360eFb5453Fa)
- [Transaction 1](https://mumbai.polygonscan.com/tx/0xc464d38717ebbf339de44465a49bf6133415981022b2717de5061c91939be05e)
- [Transaction 2](https://mumbai.polygonscan.com/tx/0x4c5468fa67c6e695d12b11035a1e20d90fe61098d34a5155261ad8b4e9f2f6a2)

### **Scroll**
- [Contract Address](https://sepolia.scrollscan.com/address/0x781758ff2fcb9bbe5f47533ad5ae0e04982665ef): **`0x781758ff2fcb9bbe5f47533ad5ae0e04982665ef`**

### Special thanks to the Chainlink and Zetachain teams for their continued support.

## What You Can Explore

- [ ] : Add ENS Resolving/reverse resolve support
- [ ] : Conduct thorough performance optimizations for smoother user experience.
- [ ] : Add Chain Switch support
- [ ] : Add Config for calling smart-contracts
- [ ] : Build CLI tool that just bootstraps the starter kit in seconds

## Getting Started

Ready to embark on a financial journey like never before? Follow these steps:

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/Open-Sorcerer/Expenze
   ```

## Install Dependencies

Follow these steps to install the required dependencies:

1. **Change Directory**: Navigate to the project directory after cloning the repository:

   ```sh
   cd Expenze
   ```

2. **Install Packages**: Use Yarn or npm to install the project's dependencies:
   ```sh
   yarn
    #or
   npm install
   ```

## Configure the Wallet Connect Project ID and RPC Url

1. **WalletConnect Project ID**: Grab a Project id from [Wallect Connect Cloud](https://cloud.walletconnect.com/),and replace it with `projectId` in `root/src/components/WallectConnectModal.tsx`

```ts
const projectId = "GRAB_FROM_WC_CLOUD_ANDPASTE_HERE";
```

2. **Alchemy RPC URL**: We use Alchemy's RPC API for querying the onchain data.Go to [Alchemy](https://www.alchemy.com/),one you have one project with polygon-mainnet,copy the https url and paste to `root/src/constants/index.ts`

```ts
export const ALCHMEY_RPC_URL = "ADD_RPC_URL_HERE";
```

## Run the DApp

Get ready to blast off! Execute the following command:

1. **Start the Development Server**: Run the following command to start the Expo development server:

   ```sh
   yarn start
   ```

2. Scan the QR code in your expo go app and you are good to go.

### The Cosmic Dashboard:

<img src="https://github.com/Open-Sorcerer/Expenze/assets/63473496/508e2914-4b2a-46c8-9e75-a589f2ef2c05" height="600"/>




Your support fuels our cosmic exploration! Thank you for being part of this intergalactic financial odyssey.

Let's Navigate the Stars with Expenze.

WAGMI (We Are Going Moonward Intergalactically)! 🚀🌌🌕
