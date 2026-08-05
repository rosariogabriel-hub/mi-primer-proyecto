import Image from "next/image";
import BurritoCarousel from "./components/BurritoCarousel";
import PedidoForm from "./components/PedidoForm";

export default function Home() {
  return (
    <main>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950">
        <Image
          src="https://images.unsplash.com/photo-1622816931574-4c027c474fb0?auto=format&fit=crop&w=2000&q=80"
          alt="Burrito recién cortado sobre un plato"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-orange-950/40" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <span className="rounded-full border border-orange-300/30 bg-white/10 px-4 py-1.5 text-sm font-medium uppercase tracking-widest text-orange-200 backdrop-blur-sm">
            Burritos for Busy People
          </span>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-7xl">
            Comida real,{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              sin perder el tiempo.
            </span>
          </h1>
          <p className="max-w-xl text-lg text-neutral-200 sm:text-xl">
            Burritos gourmet armados al momento para gente ocupada que no
            piensa sacrificar sabor por rapidez.
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <a
              href="#pedir"
              className="rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-950/50 transition hover:from-orange-400 hover:to-red-500"
            >
              Pide ahora
            </a>
            <a
              href="#menu"
              className="rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Ver menú
            </a>
          </div>
        </div>
      </section>

      <BurritoCarousel />

      <PedidoForm />
    </main>
  );
}
