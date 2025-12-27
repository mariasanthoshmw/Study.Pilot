import Image from "next/image";
import dogImage from "../pages/public/dogs.png";
 // place your dog image in public folder
 import { Alfa_Slab_One, Poppins, Alegreya } from "next/font/google";
 const alfaSlab = Alfa_Slab_One({
   weight: "400",
   subsets: ["latin"],
 });
 
 const poppins = Poppins({
   weight: ["400", "500", "600"],
   subsets: ["latin"],
 });
 const alegreya = Alegreya({
   weight: ["400", "500"],
   subsets: ["latin"],
 });

export default function ScrollSection() {
  return (
    <section className="scroll-section">
      <div className="scroll-content">
        <div className="scroll-row">
          <div className="scroll-image">
            <Image src={dogImage} alt="Dog illustration" width={300} height={300} />
          </div>
          <div className="scroll-text">
           <h1 className={alfaSlab.className}>
         Learning Made Fun for Young Minds<br />
       </h1>
            <p className={alegreya.className}>
              Our student-friendly tech platform helps children from Classes 1 to 5 learn through interactive lessons, games, and simple activities. Designed to build strong basics in a fun way, it encourages curiosity, creativity, and confidence while making learning enjoyable and stress-free.
            </p>
            <button className="getStarted-btn">Explore Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
