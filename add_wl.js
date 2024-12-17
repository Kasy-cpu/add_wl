import { ArchwayClient } from '@archwayhq/arch3.js';
import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice, calculateFee } from "@cosmjs/stargate";

const network = {
  chainId: 'constantine-3',
  endpoint: 'https://rpc.constantine.archway.tech',
  prefix: 'archway',
};

const mnemonic = 'core wear goose congress elephant afraid amazing diet holiday crush better expect provide envelope involve slide hotel prepare dad zoo fatal media cute already';
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: network.prefix });
const accounts = await wallet.getAccounts();
const client = await SigningArchwayClient.connectWithSigner(network.endpoint, wallet);

const contractAddress = 'archway1hwflc4hy67gtn9e2n83qvp3krjwavjpcammajatgseq5xf6q4wwqnyq4md' // hub

const gasPrice = GasPrice.fromString("1000000000000aconst");
const { transactionHash } = await client.execute(
  accounts[0].address,
  contractAddress,
  {
    "whitelist": {
        "addresses": [
            "archway18wjuryzyuwpg5f0wukgjey3za28s4fm9vrefjs"
        ]
    }
  },
  calculateFee(1000000, gasPrice),
  ""
);

console.log(transactionHash);