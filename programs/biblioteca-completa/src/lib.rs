use anchor_lang::prelude::*;

// Esta ID se genera al hacer "Build". 
declare_id!("76VmnciTKwV2euCiz517sHC6sSUTrYRj3uBrvW2CVy9J");

#[program]
pub mod biblioteca_completa {
    use super::*;

    pub fn registrar_libro(
        ctx: Context<RegisterBook>, 
        titulo: String, 
        autor: String, 
        anio: u16
    ) -> Result<()> {
        let libro = &mut ctx.accounts.book_account;
        libro.owner = *ctx.accounts.owner.key;
        libro.titulo = titulo;
        libro.autor = autor;
        libro.anio = anio;
        libro.descripcion = "Sin descripción aún".to_string();

        msg!("¡Éxito! El libro '{}' ha sido registrado.", libro.titulo);
        Ok(())
    }

    pub fn actualizar_descripcion(
        ctx: Context<UpdateBook>,
        _titulo: String, 
        nueva_descripcion: String,
    ) -> Result<()> {
        let libro = &mut ctx.accounts.book_account;
        libro.descripcion = nueva_descripcion;

        msg!("Descripción actualizada para: {}", libro.titulo);
        Ok(())
    }

    pub fn eliminar_libro(_ctx: Context<DeleteBook>, titulo: String) -> Result<()> {
        msg!("El libro '{}' ha sido eliminado permanentemente.", titulo);
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct BookAccount {
    pub owner: Pubkey,         
    #[max_len(50)]
    pub titulo: String,      
    #[max_len(50)]
    pub autor: String,       
    pub anio: u16,           
    #[max_len(100)]
    pub descripcion: String, 
}

#[derive(Accounts)]
#[instruction(titulo: String)]
pub struct RegisterBook<'info> {
    #[account(
        init,
        seeds = [titulo.as_bytes(), owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + BookAccount::INIT_SPACE
    )]
    pub book_account: Account<'info, BookAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(titulo: String)]
pub struct UpdateBook<'info> {
    #[account(
        mut,
        seeds = [titulo.as_bytes(), owner.key().as_ref()],
        bump,
        has_one = owner 
    )]
    pub book_account: Account<'info, BookAccount>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(titulo: String)]
pub struct DeleteBook<'info> {
    #[account(
        mut,
        seeds = [titulo.as_bytes(), owner.key().as_ref()],
        bump,
        close = owner 
    )]
    pub book_account: Account<'info, BookAccount>,
    pub owner: Signer<'info>,
}