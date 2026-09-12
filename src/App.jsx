import { Button } from "@/components/ui/button";

function App() {
  return (
    <main className="min-h-svh flex flex-col items-center justify-center gap-6 px-4 text-center">
      <img
        src="/brand/strivis-icon-mark-orange-dark.svg"
        alt="Strivis"
        className="h-16 inline dark:hidden"
      />
      <img
        src="/brand/strivis-icon-mark-orange-white.svg"
        alt="Strivis"
        className="h-16 hidden dark:inline"
      />
      <h1 className="font-heading text-3xl tracking-wide">Strivis</h1>
      <p className="text-muted-foreground max-w-md">
        Die All-in-One Fitness-Lösung. Website in Arbeit.
      </p>
      <Button className="rounded-xl h-11">Bald verfügbar</Button>
    </main>
  );
}

export default App;
