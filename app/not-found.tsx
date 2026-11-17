import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-pink">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-fg">This page doesn&apos;t exist.</h1>
      <p className="mt-4 text-muted">The link may be old, or the project may have moved.</p>
      <Button href="/" className="mt-8">
        Back home
      </Button>
    </section>
  );
}
