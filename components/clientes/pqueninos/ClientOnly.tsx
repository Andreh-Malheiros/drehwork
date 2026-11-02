"use client";

import dynamic from "next/dynamic";

// A página depende do endereço (#rota) e do armazenamento local desde o primeiro render, então roda só no navegador.
export const PqueninosClient = dynamic(() => import("./PqueninosApp").then(m => m.PqueninosApp), { ssr: false, loading: () => <div className="app" /> });
