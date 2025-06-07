"use client";
import React from "react";
import Masonry from "react-masonry-css";
import { TributeCard } from "@/components/tributes/tribute-card";
import { useTributesQuery } from "@/hooks/useTributes";
import { TributeForm } from "@/components/tributes/tribute-form";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAtom } from "jotai";
import { tributeDialogOpenAtom } from "@/atoms/tributeAtom";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function TributesPage() {
  const { data: tributes, isLoading, error } = useTributesQuery();
  const [open, setOpen] = useAtom(tributeDialogOpenAtom);

  function extractImageName(url: string) {
    const filename = url.split("/").pop() || "";
    const match = filename.match(/-(.*?)\./);
    return match ? match[1] : "";
  }

  const uniqueTributes = React.useMemo(() => {
    const seenNames = new Set();
    return (tributes || []).filter((tribute) => {
      if (!tribute.image_url) return true;
      const name = extractImageName(tribute.image_url);
      if (seenNames.has(name)) return false;
      seenNames.add(name);
      return true;
    });
  }, [tributes]);

  const breakpointColumns = {
    default: 3,
    1100: 3,
    768: 2,
    500: 1,
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <div className="flex flex-col gap-0">
        <h1 className="text-xl sm:text-3xl font-serif font-medium text-gray-900 text-center font-greatvibes">
          Felix Aranzadi Manterola <br />
          <span className="hidden sm:inline text-sm sm:text-base">
            14/02/1938 - 12/04/2025
          </span>
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="self-center bg-[#b39ddb] text-white rounded px-4 py-2 transition-shadow hover:shadow-lg">
              Añadir Recuerdo
            </button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <button
              className="fixed bottom-8 right-8 z-50 bg-purple-400 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-colors"
              aria-label="Agregar Tributo"
            >
              <Plus className="h-6 w-6" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-md w-full">
            <VisuallyHidden>
              <DialogTitle>Comparte un Recuerdo</DialogTitle>
            </VisuallyHidden>

            <TributeForm />
          </DialogContent>
        </Dialog>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary-500 rounded-full border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>
              Error al cargar los tributos. Por favor, inténtalo de nuevo más
              tarde.
            </p>
          </div>
        ) : !tributes || tributes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Aún no hay tributos. Sé el primero en compartir un recuerdo.</p>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex w-auto gap-4 py-10"
            columnClassName="bg-clip-padding"
          >
            {uniqueTributes.map((tribute, index) => (
              <div key={tribute.id} className="mb-4">
                <TributeCard tribute={tribute} index={index} />
              </div>
            ))}
          </Masonry>
        )}
      </div>
    </div>
  );
}
