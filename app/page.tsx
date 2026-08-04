export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 px-6 dark:from-black dark:to-zinc-900">
      <main className="flex flex-col items-center gap-6 text-center">
        <span className="rounded-full bg-zinc-900/5 px-4 py-1 text-sm font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
          Mi primer proyecto
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
          ¡Bienvenido a tu app!
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          Esta es la página de inicio de tu proyecto con Next.js. A partir de
          aquí puedes empezar a construir tu aplicación.
        </p>
      </main>
    </div>
  );
}
