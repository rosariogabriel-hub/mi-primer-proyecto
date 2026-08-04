"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1740377015738-b0f49643d468?auto=format&fit=crop&w=2000&q=80",
    alt: "Persona sosteniendo un burrito recién armado",
    caption: "Armados al momento, para comer con las manos y sin esperas.",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1661777681310-8d1261c6c216?auto=format&fit=crop&w=2000&q=80",
    alt: "Plato blanco con burrito y arroz",
    caption: "Ingredientes frescos, todos los días.",
  },
  {
    src: "https://images.unsplash.com/photo-1683731516309-5283f65b4dd2?auto=format&fit=crop&w=2000&q=80",
    alt: "Grupo de amigos comiendo comida mexicana",
    caption: "Rico para compartir, rápido para pedir solo.",
  },
  {
    src: "https://images.unsplash.com/photo-1711488735428-27c6757beb5c?auto=format&fit=crop&w=2000&q=80",
    alt: "Un par de burritos sobre una mesa",
    caption: "Recetas honestas, sin atajos de sabor.",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1678051227112-abbdccd19360?auto=format&fit=crop&w=2000&q=80",
    alt: "Plato con burrito y un tazón de salsa",
    caption: "Tu salsa favorita, siempre a la mano.",
  },
];

const AUTOPLAY_MS = 5500;

export default function BurritoCarousel() {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    setIndex((i + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index]);

  return (
    <section
      aria-label="Galería de burritos"
      className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-neutral-950"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${i === index ? "animate-kenburns" : ""}`}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-16 z-10 flex flex-col items-center gap-6 px-6 text-center sm:bottom-20">
        <p
          key={index}
          className="animate-fade-in-up max-w-xl text-xl font-semibold text-white sm:text-2xl"
        >
          {slides[index].caption}
        </p>

        <div className="flex items-center gap-2.5">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a la imagen ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index
                  ? "w-8 bg-gradient-to-r from-orange-400 to-red-500"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Imagen anterior"
        className="group absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/40 sm:left-6 sm:p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 sm:h-5 sm:w-5"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Siguiente imagen"
        className="group absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/40 sm:right-6 sm:p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 sm:h-5 sm:w-5"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </section>
  );
}
