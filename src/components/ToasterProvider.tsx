import { Toaster } from "./ui/sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "var(--color-card)",
          color: "var(--color-foreground)",
          border: "1px solid var(--color-accent-olive)",
        },
        error: {
          style: {
            background: "var(--color-card)",
            color: "var(--color-foreground)",
            border: "2px solid #dc2626",
          },
        },
      }}
    />
  );
}
