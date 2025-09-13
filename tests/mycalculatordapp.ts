import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Mycalculatordapp } from "../target/types/mycalculatordapp";
import { assert } from "chai";


// describe("mycalculatordapp", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.mycalculatordapp as Program<Mycalculatordapp>;

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });



describe("mycalculatordapp", async () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.mycalculatordapp as Program<Mycalculatordapp>;

  it("Creates a calculator", async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      },
      signers: [calculator]
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.equal(account.greeting, "Welcome to Solana");
  })


  it("Adds two numbers", async () => {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3),{
      accounts: {
        calculator: calculator.publicKey, 
      }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(5)))
  })

  it("Subtract numbers", async () => {
    await program.rpc.sub(new anchor.BN(5), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey
      }
    })

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(3)));
  })

  it("Multiply two numbers", async () => {
    await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey
      }
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(6)));
  })

  it("Divide two numbers", async () => {
    await program.rpc.divide(new anchor.BN(5), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey
      }
    })

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(2)));
    assert.ok(account.remainder.eq(new anchor.BN(1)));
  })

})

