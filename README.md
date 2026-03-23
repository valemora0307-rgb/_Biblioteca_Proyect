🧬 Master Project: Dynamic cNFTs
Este proyecto es una Descentralized Application (dApp) construida en la blockchain de Solana utilizando el framework Anchor. El objetivo principal es la creación y evolución de NFTs comprimidos (cNFTs) que cambian sus metadatos (URI) basándose en la interacción del usuario.

🚀 Características
cNFTs (Compressed NFTs): Utiliza la tecnología de compresión de estado de Solana para mintear NFTs a un costo ultra bajo.

Evolución Dinámica: Los NFTs pueden "evolucionar" cambiando su apariencia (URI) a través de instrucciones del Smart Contract.

Integración con Metaplex: Implementa el programa Bubblegum para el manejo de los árboles de Merkle.

🎨 Prototipado y UX/UI
El flujo de usuario y el diseño de la interfaz para la evolución de las mascotas digitales se encuentra disponible en:

Figma: Digital Pet Evolution - Prototipo

🛠️ Estructura del Proyecto
lib.rs: Contrato inteligente en Rust que gestiona la lógica de evolución.

anchor.test.ts: Suite de pruebas para validar el minteo y la evolución.

client.ts: Script de cliente para interactuar con el programa desde el frontend o consola.

🔧 Requisitos (Solana Playground)
Abrir Solana Playground.

Importar los archivos del proyecto.

Tener configurado el entorno en Devnet.

Contar con algo de SOL de prueba ejecutando en la terminal:

Bash
solana airdrop 2
🏗️ Cómo usar
Build: Haz clic en el icono del martillo (Build) para compilar el programa en Rust.

Deploy: Ve a la pestaña de "Build & Deploy" y despliega el contrato en la Devnet.

Test: Ejecuta los tests para verificar que el árbol de Merkle se crea correctamente y el NFT evoluciona.

📝 Instrucción Principal: evolve_pet
Esta función recibe los parámetros del cNFT y actualiza su estado en la cadena:

root, data_hash, creator_hash: Pruebas de Merkle para validar la propiedad del NFT.

nonce e index: Identificadores únicos del NFT dentro del árbol.

new_uri: El nuevo enlace (Arweave o IPFS) con la imagen de la mascota evolucionada.

Generado para el proyecto final de UTMA - Marzo 2026.
