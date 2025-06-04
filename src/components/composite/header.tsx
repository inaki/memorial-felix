"use client";
import React from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mobile = false,
  onNavigate,
}) => {
  const pathname = usePathname();
  return (
    <header
      className="bg-white shadow-sm flex items-center"
      style={{ height: "50px" }}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full w-full flex items-center`}
      >
        <div className="flex items-center justify-between w-full h-full">
          <Link
            href="/event"
            className="flex items-center gap-2"
            onClick={onNavigate}
          >
            <Heart className="h-6 w-6" style={{ color: "#b39ddb" }} />
            {/* <span className="text-xl font-serif font-medium">
              Kindred Farewell
            </span> */}
          </Link>

          <nav
            className={`flex ${
              mobile ? "flex-col gap-6 w-full mt-8" : "items-center gap-6"
            }`}
          >
            <Link
              href="/event"
              onClick={onNavigate}
              className={`font-medium ${mobile ? "text-2xl" : "text-sm"} ${
                pathname === "/event"
                  ? "text-primary-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="sm:hidden">Misa</span>
              <span className="hidden sm:inline">Detalles del Evento</span>
            </Link>

            <Link
              href="/tribute"
              onClick={onNavigate}
              className={`font-medium ${mobile ? "text-2xl" : "text-sm"} ${
                pathname === "/tribute"
                  ? "text-primary-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="sm:hidden">Recuerdos</span>
              <span className="hidden sm:inline">Muro de Recuerdos</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
