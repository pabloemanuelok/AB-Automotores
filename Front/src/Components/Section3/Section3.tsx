// import React from "react";
// import Image from "next/image";
// import image1 from "@/Assets/MarchaKicks.png";
// import image2 from "@/Assets/ToyotaLV.png";
// import image3 from "@/Assets/208Tablero.jpeg";
// import Link from "next/link";

// const Section3 = () => {
//   return (
//     <div>
//       {/* Vista de escritorio */}
//       <div className="hidden md:flex justify-between gap-4 px-4">
//       <div className="w-1/3 h-[300px] relative">
//           <Image
//             src={image1}
//             alt="Image 3"
//             layout="fill"
//             className="object-cover"
//           />
//         </div>
//         <div className="w-1/3 relative flex items-center justify-center h-[300px]"> {/* Ajusta la altura a 300px */}
//           <Image
//             src={image2}
//             alt="Image 3"
//             layout="fill"
//             className="object-cover"
//           />
//           {/* Contenido sobre la imagen */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
//             <h2 className="text-2xl font-bold mb-2">¡Visita nuestro</h2>
//             <Link href="/views/catalogo" className="">
//             <button className="bg-RojoAb hover:bg-red-900  text-xl w-[200px] text-white px-4 py-2 mt-2">Catálogo!</button>
//           </Link>
//           </div>
//         </div>
//         <div className="w-1/3 h-[300px] relative">
//           <Image
//             src={image3}
//             alt="Image 3"
//             layout="fill"
//             className="object-cover"
//           />
//         </div>
//       </div>
      
//       {/* Vista móvil */}
//       <div className="md:hidden relative">
//         <div className="flex overflow-hidden">
//           {/* Solo se muestra la imagen central con el botón en la vista móvil */}
//           <div className="flex-none w-screen h-[300px] relative"> {/* Ajusta la altura a 300px */}
//             <Image
//               src={image2}
//               alt="Image 2"
//               layout="fill"
//               className="object-cover"
//             />
//             {/* Contenido sobre la imagen en vista móvil */}
//             <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
//               <h2 className="text-xl font-bold mb-2">¡Visita nuestro</h2>
//               <Link href="/views/catalogo" className="text-xl">
//             <button className="bg-RojoAb text-white hover: hover:bg-red-900 px-4 py-2 mt-2">Catálogo!</button>
//           </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Section3;
