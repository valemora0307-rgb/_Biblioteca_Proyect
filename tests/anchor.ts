import * as anchor from "@coral-xyz/anchor";
import * as web3 from "@solana/web3.js";
import type { BibliotecaCompleta } from "../target/types/biblioteca_completa";
describe("Pruebas de la Librería", () => {
  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.BibliotecaCompleta as anchor.Program<BibliotecaCompleta>;
  
  const titulo = "Rayuela";
  const autor = "Julio Cortázar";
  const anio = 1963;

  // 1. Calculamos la dirección del libro (PDA)
  const [bookPda] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from(titulo), program.provider.publicKey.toBuffer()],
    program.programId
  );

  it("Registra el libro", async () => {
    const tx = await program.methods
      .registrarLibro(titulo, autor, anio)
      .accounts({
        bookAccount: bookPda,
        owner: program.provider.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();
    
    // IMPORTANTE: Esperamos confirmación para evitar el error "Account does not exist"
    await program.provider.connection.confirmTransaction(tx, "confirmed");

    const account = await program.account.bookAccount.fetch(bookPda);
    console.log("✅ Libro en blockchain:", account.titulo);
    
    // Verificación manual sin usar librerías externas
    if (account.titulo !== titulo) {
      throw new Error("El título no coincide");
    }
  });

  it("Actualiza la descripción", async () => {
    const nuevaDesc = "Una obra maestra fundamental.";
    const tx = await program.methods
      .actualizarDescripcion(titulo, nuevaDesc)
      .accounts({
        bookAccount: bookPda,
        owner: program.provider.publicKey,
      })
      .rpc();

    await program.provider.connection.confirmTransaction(tx, "confirmed");

    const account = await program.account.bookAccount.fetch(bookPda);
    console.log("✅ Nueva descripción:", account.descripcion);
    
    if (account.descripcion !== nuevaDesc) {
      throw new Error("La descripción no se actualizó");
    }
  });

  it("Elimina el libro", async () => {
    const tx = await program.methods
      .eliminarLibro(titulo)
      .accounts({
        bookAccount: bookPda,
        owner: program.provider.publicKey,
      })
      .rpc();
    
    await program.provider.connection.confirmTransaction(tx, "confirmed");
    console.log("✅ Cuenta cerrada y SOL devuelto al dueño.");
  });
});