# Degen-Splitwise

Degen-Splitwise is not your ordinary expense management app. It's a mobile decentralized application (dApp) that introduces a whole new level of excitement to how you manage your finances in the wild world of decentralized finance (DeFi).

## Features

- **WalletConnect Support**: Easily integrate WalletConnect to allow users to connect their wallets to your app securely.

- **Dark/Light Theme**: Customize the look and feel of your app with built-in Dark and Light theme support using Shopify Restyle.

- **TypeScript Ready**: The project is TypeScript ready, making it easier to maintain and scale as your app evolves.

## Getting Started

Ready to embark on a financial journey like never before? Follow these steps:

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/Open-Sorcerer/DegenSplitwise
   ```

## Install Dependencies

Follow these steps to install the required dependencies:

1. **Change Directory**: Navigate to the project directory after cloning the repository:

   ```sh
   cd DegenSplitwise
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

![Home Screen](https://ik.imagekit.io/4uh8nmwsx/tr:h-300/d34bd49d-116f-44d9-9f06-a5184401fd88.jpeg?updatedAt=1696410633340)

## What You Can Explore

- [ ] : Add ENS Resolving/reverse resolve support
- [ ] : Conduct thorough performance optimizations for smoother user experience.
- [ ] : Add Chain Switch support
- [ ] : Add Config for calling smart-contracts
- [ ] : Build CLI tool that just bootstraps the starter kit in seconds

## Found a Quasar Bug?

If you encounter any issues, bugs, or unexpected wormholes while using DegenSplitwise, report them and help us navigate the cosmic chaos. To report a bug:

1. **Check Existing Issues**: Before creating a new issue, please search the [existing issues](https://github.com/Open-Sorcerer/DegenSplitwise/issues) to see if someone has already reported the same problem. If you find a similar issue, you can add a comment with additional details.

2. **Create a New Issue**:

   - Click on the ["Issues" tab](https://github.com/Open-Sorcerer/DegenSplitwise/issues) on the GitHub repository.
   - Click the "New Issue" button.
   - Provide a descriptive title that summarizes the issue.
   - In the issue description, include the following details:
     - A clear and concise description of the problem or bug or the feature you want in Starter Kit.
     - Steps to reproduce the issue (if applicable).
     - Any error messages or screenshots that can help us understand the problem.
     - Information about your spacecraft (environment), including the version of DegenSplitwise and the device or emulator you're using.
   - Assign appropriate labels to the issue, such as "bug" or "help wanted."

3. **Submit the Issue**: Click the "Submit new issue" button to create the issue.

We'll do our best to warp through it ASAP. Your feedback is like stardust, helping Degen-Splitwise shine brighter in the galaxy. Thank you for exploring with us!

## Contributing

Become a star navigator! To contribute, please follow these steps:

1. **Join the Intergalactic Fleet**:
    - Fork the repository and create a new branch for your cosmic feature or bug fix.

2. **Launch Your Changes**:
    - Make your changes, document them with cosmic messages, and commit.

3. **Engage the Hyperdrive**:
    - Push your changes to your fork and create a pull request to the `main` branch of the original repository.

## Support the Project

Degen-Splitwise is a project fueled by interstellar passion. If you find our app a thrilling journey and want to support its voyage, consider:

- **Buy Us Space Coffee**: [Buy Us a Space Coffee](https://www.buymeacoffee.com/Suvraneel)

- **Send Crypto Meteorites**: Send some crypto meteorites to `saviour1001.eth`

Your support fuels our cosmic exploration! Thank you for being part of this intergalactic financial odyssey.

Let's Navigate the Stars with DegenSplitwise.

WAGMI (We Are Going Moonward Intergalactically)! 🚀🌌🌕
