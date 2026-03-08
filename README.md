📚 Sistema de Gestión de Biblioteca - Solana
Este proyecto es un Smart Contract (Programa) desarrollado en la blockchain de Solana utilizando el framework Anchor. Permite a los usuarios registrar libros, actualizar sus descripciones y eliminarlos para recuperar el depósito de espacio (renta).

🚀 Características
Registro de Libros: Almacena título, autor y año de publicación.

Uso de PDAs (Program Derived Addresses): Cada libro se almacena en una dirección única derivada del título y la billetera del usuario.

Gestión de Renta: Incluye una función para eliminar el registro y devolver los SOL al propietario.

Seguridad: Solo el propietario que registró el libro puede modificarlo o eliminarlo.

🛠️ Tecnologías utilizadas
Rust: Lenguaje para el Smart Contract.

Anchor Framework: v0.28.0+ para el desarrollo y pruebas.

TypeScript: Para el cliente y los tests de integración.

Solana Playground: Entorno de desarrollo.

📂 Estructura del Proyecto
src/lib.rs: Contiene la lógica del programa en Rust.

client.ts: Script para consultar el balance y la dirección del usuario.

anchor.test.ts: Suite de pruebas para verificar el funcionamiento del CRUD.

🔧 Instrucciones de Uso
1. Despliegue (Deploy)
En Solana Playground, haz clic en el botón Build.

Una vez compilado, ve a la pestaña de Deploy y presiona el botón para subirlo a la Devnet.

2. Ejecución del Cliente
En la pestaña client.ts, presiona Run para ver tu dirección y balance:

Bash
Running client...
Tu dirección: FdDNbReJJQTQbaC...
Tu balance actual es: 2.0 SOL
3. Pruebas (Tests)
Para verificar que todo funciona correctamente, ejecuta los tests:

Bash
Running tests...
✅ Libro registrado: Rayuela
✅ Nueva descripción: Una obra maestra fundamental.
✅ Cuenta cerrada y SOL devuelto.
📝 Definición de la Cuenta
El programa utiliza una estructura de datos optimizada:

Owner: 32 bytes (Pubkey)

Título: Máx 50 caracteres.

Autor: Máx 50 caracteres.

Año: 2 bytes (u16)

Descripción: Máx 100 caracteres.
