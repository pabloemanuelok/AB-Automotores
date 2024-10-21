// import { IProduct } from "@/Interfaces/Interface"

// export const Cars: IProduct[] = [
//     {
//         id: 1,
//         name: "Toyota COROLLA",
//         version: "XLI CVT",
//         year: 2024,
//         description:
//           "El Toyota Corolla 2024 es un sedán compacto que combina eficiencia de combustible con un diseño moderno y elegante. Equipado con tecnología avanzada de seguridad y asistencia al conductor, ofrece un viaje cómodo y suave. Su motor ofrece un equilibrio entre potencia y economía, mientras que su interior bien equipado proporciona un ambiente práctico y agradable para los pasajeros. Ideal para quienes buscan un vehículo confiable y accesible con un toque de sofisticación.",
//         images:[
//             "https://scontent.cdninstagram.com/v/t39.30808-6/455710171_18266136979243846_8363072654468142106_n.jpg?se=-1&stp=dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuaGRyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=FkIHQxTK06oQ7kNvgFRYIFW&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQzNjczNzAwMzM5NDY0NDA1Mw%3D%3D.2-ccb7-5&oh=00_AYDoGPoRTED2FQnKo6XnUMefMHXDeucNOs7PYPqnqSRGKg&oe=66CC4183&_nc_sid=10d13b",
//         ],
//         mainImgUrl: "https://static.wixstatic.com/media/0816f9_da2591eb1fd540e6b85590ed45035a19~mv2.png"
//       },
//       {
//         id: 2,
//         name: "Volkswagen Amarok",
//         version: "Trendline",
//         year: 2010,
//         description:
//           "La Volkswagen Amarok Trendline ofrece un equilibrio perfecto entre potencia y confort. Su diseño robusto y su motor eficiente hacen de este camioneta una excelente opción para quienes necesitan un vehículo fuerte y confiable tanto en la ciudad como fuera de ella.",
//         images:[
//             "https://static.wixstatic.com/media/0816f9_bfc51e61850d4ed7b93f138b02648b3f~mv2.png",
//             "https://static.wixstatic.com/media/0816f9_e27884b8825f43f0b5d05a7148849794~mv2.jpeg",
//             "https://static.wixstatic.com/media/0816f9_c62588870a5546d9bafa3258fabc37f9~mv2.jpeg"
//         ],
//         mainImgUrl:"https://static.wixstatic.com/media/0816f9_bfc51e61850d4ed7b93f138b02648b3f~mv2.png"
//       },
//       {
//         id: 3,
//         name: "Peugeot 208",
//         version: "Active Pack MT",
//         year: 2024,
//         description:
//           "El Peugeot 208 Active Pack MT destaca por su rendimiento excepcional y su diseño moderno. Con su motor eficiente y características avanzadas, este auto es ideal para quienes buscan una conducción emocionante y cómoda en un paquete compacto y elegante.",
//         images:[
//             "https://scontent.cdninstagram.com/v/t39.30808-6/453103254_18263493766243846_4085392995997107870_n.jpg?se=-1&stp=dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuaGRyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=jhTpfkabZlYQ7kNvgFi1_n6&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQyMDkwNzMxOTU2NjAxNjIwNw%3D%3D.2-ccb7-5&oh=00_AYAtFjsdOXiKsoHh87pa6iojN4rvAauM0gWehEPzzWELOQ&oe=66CC460E&_nc_sid=10d13b",
//         ],
//         mainImgUrl:"https://static.wixstatic.com/media/0816f9_e27884b8825f43f0b5d05a7148849794~mv2.jpeg"
//       },
//       {
//         id: 4,
//         name: "Renault Duster",
//         version: "Luxe Nav",
//         year: 2013,
//         description:
//           "El Renault Duster Luxe Nav combina robustez y confort en un SUV compacto. Ideal para aventuras fuera de la carretera o para el uso diario en la ciudad, ofrece un equilibrio perfecto entre capacidad y estilo con características modernas para una experiencia de conducción completa.",
//         images:[
//             "https://scontent.cdninstagram.com/v/t39.30808-6/452620541_18263262718243846_7812360723137807406_n.jpg?se=-1&stp=dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuaGRyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=YNR6xQXxllEQ7kNvgGbSekt&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQxOTUxMTk5NjQ0NDY4MTUxNw%3D%3D.2-ccb7-5&oh=00_AYA8kc0z09J6iZElkqD4J7-VVc4XCMYqsLIUhpIaLdQGeQ&oe=66CC3C98&_nc_sid=10d13b",
//         ],
//         mainImgUrl:"https://static.wixstatic.com/media/0816f9_c62588870a5546d9bafa3258fabc37f9~mv2.jpeg"
//       },
//       {
//         id: 5,
//         name: "Renault Kangoo 2 Confort",
//         version: "Confort",
//         year: 2016,
//         description:
//           "El Renault Kangoo 2 Confort es una opción práctica y funcional para aquellos que necesitan espacio adicional. Con un interior versátil y cómodo, este vehículo es ideal para familias o para quienes buscan un auto con gran capacidad de carga y confort.",
//         images:[
//             "https://scontent.cdninstagram.com/v/t39.30808-6/451686866_18262535941243846_6336160610651848977_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=j4Pt6RwklTYQ7kNvgHEIYwG&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQxNTIxMjAxNTA3NjQ5NTAwMg%3D%3D.2-ccb7-5&oh=00_AYBpOX1YXsvffhU5O_ssq5fqQsmqQ2nwPUdAERunWoXbRA&oe=66CC126A&_nc_sid=10d13b",
//         ],
//         mainImgUrl:"https://static.wixstatic.com/media/0816f9_9dfb875df99b481bb9a9aceb2ded365c~mv2.jpeg"
//       },
//       {
//         id: 6,
//         name: "Volkswagen TAOS",
//         version: "Highline",
//         year: 2024,
//         description:
//           "La Volkswagen Taos es un SUV compacto que destaca por su estilo contemporáneo y su gran versatilidad. Ofrece un interior espacioso y bien equipado, con tecnología avanzada y un rendimiento eficiente. Es ideal para quienes buscan comodidad y funcionalidad en un vehículo urbano.",
//         images:[
//             "https://scontent.cdninstagram.com/v/t39.30808-6/434265623_18248685886243846_5201731896648886723_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=Nd4u3ZVjyD8Q7kNvgFxn6FD&_nc_gid=58aba03749524a0d91e28df557597fd1&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzMyOTYwMTQ2NjU0MDY2ODM1Nw%3D%3D.3-ccb7-5&oh=00_AYCOiV1DOmw7UHJYYBao1TQ2HBwg_PD9K7ghp9XloFsPrQ&oe=66E54DEB&_nc_sid=10d13b",
//         ],
//         mainImgUrl:"https://static.wixstatic.com/media/0816f9_b31235ceb7aa476ca03e285ab4f58cf2~mv2.jpeg"
//       },
//       {
//         id: 7,
//         name: "Tu mama",
//         version: "XLI CVT",
//         year: 2024,
//         description:
//           "El Toyota Corolla 2024 es un sedán compacto que combina eficiencia de combustible con un diseño moderno y elegante. Equipado con tecnología avanzada de seguridad y asistencia al conductor, ofrece un viaje cómodo y suave. Su motor ofrece un equilibrio entre potencia y economía, mientras que su interior bien equipado proporciona un ambiente práctico y agradable para los pasajeros. Ideal para quienes buscan un vehículo confiable y accesible con un toque de sofisticación.",
//         images:[
//             "https://scontent.cdninstagram.com/v/t39.30808-6/455710171_18266136979243846_8363072654468142106_n.jpg?se=-1&stp=dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuaGRyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=FkIHQxTK06oQ7kNvgFRYIFW&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQzNjczNzAwMzM5NDY0NDA1Mw%3D%3D.2-ccb7-5&oh=00_AYDoGPoRTED2FQnKo6XnUMefMHXDeucNOs7PYPqnqSRGKg&oe=66CC4183&_nc_sid=10d13b",
//         ],
//         mainImgUrl: "https://static.wixstatic.com/media/0816f9_da2591eb1fd540e6b85590ed45035a19~mv2.png"
//       },
//       {
//         id: 8,
//         name: "Volkswagen Amarok",
//         version: "Trendline",
//         year: 2010,
//         description:
//           "La Volkswagen Amarok Trendline ofrece un equilibrio perfecto entre potencia y confort. Su diseño robusto y su motor eficiente hacen de este camioneta una excelente opción para quienes necesitan un vehículo fuerte y confiable tanto en la ciudad como fuera de ella.",
//         images:[
//             "https://scontent.cdninstagram.com/v/t39.30808-6/455710171_18266136979243846_8363072654468142106_n.jpg?se=-1&stp=dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuaGRyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=FkIHQxTK06oQ7kNvgFRYIFW&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQzNjczNzAwMzM5NDY0NDA1Mw%3D%3D.2-ccb7-5&oh=00_AYDoGPoRTED2FQnKo6XnUMefMHXDeucNOs7PYPqnqSRGKg&oe=66CC4183&_nc_sid=10d13b",
//         ],
//         mainImgUrl:"https://static.wixstatic.com/media/0816f9_bfc51e61850d4ed7b93f138b02648b3f~mv2.png"
//       },
//       {
//         id: 9,
//         name: "Peugeot 208",
//         version: "Active Pack MT",
//         year: 2024,
//         description:
//           "El Peugeot 208 Active Pack MT destaca por su rendimiento excepcional y su diseño moderno. Con su motor eficiente y características avanzadas, este auto es ideal para quienes buscan una conducción emocionante y cómoda en un paquete compacto y elegante.",
//         images:[
//             "https://scontent.cdninstagram.com/v/t39.30808-6/453103254_18263493766243846_4085392995997107870_n.jpg?se=-1&stp=dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuaGRyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=jhTpfkabZlYQ7kNvgFi1_n6&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQyMDkwNzMxOTU2NjAxNjIwNw%3D%3D.2-ccb7-5&oh=00_AYAtFjsdOXiKsoHh87pa6iojN4rvAauM0gWehEPzzWELOQ&oe=66CC460E&_nc_sid=10d13b",
//         ],
//         mainImgUrl:"https://static.wixstatic.com/media/0816f9_e27884b8825f43f0b5d05a7148849794~mv2.jpeg"
//       },
//       {
//         id: 10,
//         name: "Renault Duster",
//         version: "Luxe Nav",
//         year: 2013,
//         description:
//           "El Renault Duster Luxe Nav combina robustez y confort en un SUV compacto. Ideal para aventuras fuera de la carretera o para el uso diario en la ciudad, ofrece un equilibrio perfecto entre capacidad y estilo con características modernas para una experiencia de conducción completa.",
//         images:[
//             "https://scontent.cdninstagram.com/v/t39.30808-6/452620541_18263262718243846_7812360723137807406_n.jpg?se=-1&stp=dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuaGRyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=YNR6xQXxllEQ7kNvgGbSekt&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQxOTUxMTk5NjQ0NDY4MTUxNw%3D%3D.2-ccb7-5&oh=00_AYA8kc0z09J6iZElkqD4J7-VVc4XCMYqsLIUhpIaLdQGeQ&oe=66CC3C98&_nc_sid=10d13b",
//         ],
//         mainImgUrl:"https://static.wixstatic.com/media/0816f9_c62588870a5546d9bafa3258fabc37f9~mv2.jpeg"
//       },
//       {
//         id: 11,
//         name: "Renault Kangoo 2 Confort",
//         version: "Confort",
//         year: 2016,
//         description:
//           "El Renault Kangoo 2 Confort es una opción práctica y funcional para aquellos que necesitan espacio adicional. Con un interior versátil y cómodo, este vehículo es ideal para familias o para quienes buscan un auto con gran capacidad de carga y confort.",
//         images:[
//             "https://scontent.cdninstagram.com/v/t39.30808-6/451686866_18262535941243846_6336160610651848977_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=j4Pt6RwklTYQ7kNvgHEIYwG&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQxNTIxMjAxNTA3NjQ5NTAwMg%3D%3D.2-ccb7-5&oh=00_AYBpOX1YXsvffhU5O_ssq5fqQsmqQ2nwPUdAERunWoXbRA&oe=66CC126A&_nc_sid=10d13b",
//         ],
//         mainImgUrl:"https://static.wixstatic.com/media/0816f9_9dfb875df99b481bb9a9aceb2ded365c~mv2.jpeg"
//       },
//       {
//         id: 12,
//         name: "Volkswagen TAOS",
//         version: "Highline",
//         year: 2024,
//         description:
//           "La Volkswagen Taos es un SUV compacto que destaca por su estilo contemporáneo y su gran versatilidad. Ofrece un interior espacioso y bien equipado, con tecnología avanzada y un rendimiento eficiente. Es ideal para quienes buscan comodidad y funcionalidad en un vehículo urbano.",
//         images:[
//             "https://scontent.cdninstagram.com/v/t39.30808-6/434265623_18248685886243846_5201731896648886723_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=Nd4u3ZVjyD8Q7kNvgFxn6FD&_nc_gid=58aba03749524a0d91e28df557597fd1&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzMyOTYwMTQ2NjU0MDY2ODM1Nw%3D%3D.3-ccb7-5&oh=00_AYCOiV1DOmw7UHJYYBao1TQ2HBwg_PD9K7ghp9XloFsPrQ&oe=66E54DEB&_nc_sid=10d13b",
//         ],
//         mainImgUrl:"https://static.wixstatic.com/media/0816f9_b31235ceb7aa476ca03e285ab4f58cf2~mv2.jpeg"
//       },

//     ]