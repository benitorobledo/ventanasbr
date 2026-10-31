import { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  subtitle: string;
  updated: string;
  children: ReactNode;
}

export function LegalPage({ title, subtitle, updated, children }: LegalPageProps) {
  return (
    <main className="bg-white">
      <section className="bg-primary pb-16 pt-36 text-white">
        <div className="container mx-auto px-4">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">
            Información legal
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-white/80">{subtitle}</p>
          <p className="mt-6 text-sm text-white/60">
            Última actualización: {updated}
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <div className="space-y-8 leading-relaxed text-gray-600">{children}</div>
      </section>
    </main>
  );
} 

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-primary md:text-2xl">{title}</h2>
      {children}
    </section>
  );
}
