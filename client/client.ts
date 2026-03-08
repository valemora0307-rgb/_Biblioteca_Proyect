import * as anchor from "@coral-xyz/anchor";
import * as web3 from "@solana/web3.js";
import type { BibliotecaCompleta } from "../target/types/biblioteca_completa";

// Configure the client to use the local cluster
anchor.setProvider(anchor.AnchorProvider.env());

const program = anchor.workspace.BibliotecaCompleta as anchor.Program<BibliotecaCompleta>;

(async () => {
  console.log("--- Iniciando Cliente de Librería ---");
  
  // Usamos program.provider.publicKey directamente para evitar errores de variables no definidas
  const direccion = program.provider.publicKey.toString();
  console.log("Tu dirección es:", direccion);

  try {
    // Obtenemos el balance de la red
    const balance = await program.provider.connection.getBalance(program.provider.publicKey);
    
    // Convertimos a SOL
    const sol = balance / web3.LAMPORTS_PER_SOL;
    console.log("Tu balance actual es:", sol, "SOL");

  } catch (error) {
    console.error("Error al conectar con Solana:", error.message);
  }
  
  console.log("---------------------------------------");
})();