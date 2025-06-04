"use client";
import React from "react";
import { formatDistanceStrict } from "date-fns";
import { motion } from "framer-motion";
import type { Tribute } from "@/types";
import Image from "next/image";
import { es } from "date-fns/locale";

interface TributeCardProps {
  tribute: Tribute;
  index: number;
}

export const TributeCard: React.FC<TributeCardProps> = ({ tribute, index }) => {
  const [relativeTime, setRelativeTime] = React.useState<string>("");

  const getTimeAgo = (date: string | Date) => {
    const distance = formatDistanceStrict(new Date(date), new Date(), {
      locale: es,
    });
    return `hace ${distance}`;
  };

  React.useEffect(() => {
    setRelativeTime(getTimeAgo(tribute.created_at));
  }, [tribute.created_at]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="break-inside-avoid bg-white rounded-lg shadow-md overflow-hidden"
    >
      {tribute.image_url && (
        <div className="relative w-full overflow-hidden aspect-square bg-white border border-gray-200 shadow-sm flex items-center justify-center">
          <Image
            src={tribute.image_url}
            alt={`Tribute from ${tribute.author}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
      )}

      <div className="px-4 pb-6 pt-2 bg-white">
        <p className="text-gray-700 whitespace-pre-line mt-2">
          {tribute.message}
        </p>

        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          <p className="text-[12px] sm:text-sm font-medium text-primary-700">
            — {tribute.author}
          </p>
          <p className="text-[12px] sm:text-xs text-gray-400">{relativeTime}</p>
        </div>
      </div>
    </motion.div>
  );
};
