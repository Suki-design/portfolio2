import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Deck } from "@/components/Deck";

export const Route = createFileRoute("/_deck")({
  component: DeckLayout,
});

function DeckLayout() {
  return (
    <>
      <Deck />
      <Outlet />
    </>
  );
}
