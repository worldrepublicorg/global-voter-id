# Global Voter ID App

The _Global Voter ID_ app is a free and open source application that enables anyone to create a proof of personhood and participate in global democracy. By democratizing decision-making, we aim to ensure that global governance aligns with the needs and values of humanity as a whole.

## How it Works:

1. **Proof of Personhood:** To participate, users complete a facial scanning process to verify that each voter is a real and unique human. This step guarantees the integrity of our democratic system by preventing fraud or duplicate identities.

2. **Voter ID Creation:** After successful verification, you receive a non-transferable (or "soulbound") ERC20 token as your Global Voter ID. This token cannot be transferred, ensuring your identity is securely tied to your participation.

3. **Use in Governance Platforms:** With your Voter ID, you can join democratic governance processes across various platforms. Whether it's participating in a space on [Snapshot](https://snapshot.org/#/), interacting with onchain governor contracts, or engaging with crypto quest platforms, your Global Voter ID gives you the power to vote on key proposals and decisions.

The _Global Voter ID_ system is designed to be universally accessible—free to use by individuals, projects, and organizations without any need for permission. It provides a powerful, decentralized tool for ensuring that global governance processes are inclusive, secure, and transparent.

## Philosophy

[World Republic](https://www.worldrepublic.org/) projects are built on the principles of openness, individual freedom, and the right to fork. All core software and tools needed to run these applications are freely available and easy to use. This ensures that if the World Republic or any of its platforms is ever compromised, the community can fork the system and create a new version that better serves the collective interests of humanity.

## Technology Stack

- Framework: [Next.js (App Router)](https://nextjs.org)
- Language: [TypeScript](https://typescriptlang.org)
- Styling: [Tailwind CSS](https://tailwindcss.com)
- Components: [Shadcn UI](https://ui.shadcn.com)
- Onchain components: [OnchainKit](https://onchainkit.xyz/)
- Backend: [Base](https://base.org) and [thirdweb Engine](https://thirdweb.com/engine)
- Auth: [zkMe](https://zk.me)
- Deployment: [Vercel](https://vercel.com)

## Getting Started

### Environment Setup

1. Copy the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and replace the placeholder values with your actual API keys and configurations:
   - Coinbase Developer Platform: Get this from https://portal.cdp.coinbase.com/products/onchainkit
   - WalletConnect: Get this from https://www.walletconnect.com/
   - zKMe: Obtain from https://dashboard.zk.me/
   - thirdweb: Set up at https://thirdweb.com/dashboard/engine or deploy your own following [this guide](https://support.thirdweb.com/engine/eRgkLPBdL1WJJLzAbuWrPZ/how-to-deploy-your-self-hosted-thirdweb-engine-on-the-railway/d97FnFt8e926FqniTaYxfD)
3. Make sure not to commit your actual `.env` file to version control.

### Running the Development Server

To run the development server:

```bash
pnpm install
pnpm dev
```

The application will be available at http://localhost:3000.

## Contributing

We welcome contributions from the community. Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information on how to get involved.

## License

This project is open-source and available under the [MIT License](LICENSE).
