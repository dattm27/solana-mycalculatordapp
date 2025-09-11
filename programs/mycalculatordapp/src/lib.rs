use anchor_lang::prelude::*;

declare_id!("38ota8ZGNyoAHt6zD9jp3NZFSVqH4C4JakhWz4pVRRLL");

#[program]
pub mod mycalculatordapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
