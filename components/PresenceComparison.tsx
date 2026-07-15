"use client";

import { useState } from "react";

const states = {
  basic: ["Informações dispersas", "Próximo passo incerto", "Dependência de plataformas", "Pouco contexto para pesquisa"],
  strategic: ["Oferta organizada", "Ações claras", "Canal digital próprio", "Conteúdo interpretável"],
};
export function PresenceComparison() {
  const [mode, setMode] = useState<keyof typeof states>("basic");
  return <div className="comparison">
    <div className="comparison-switch" role="group" aria-label="Comparar presença digital"><button data-active={mode === "basic"} onClick={() => setMode("basic")}>Apenas estar na internet</button><button data-active={mode === "strategic"} onClick={() => setMode("strategic")}>Presença estratégica</button></div>
    <div className="comparison-stage" data-mode={mode}><div className="browser-bar"><i/><i/><i/><span>{mode === "basic" ? "presença dispersa" : "estrutura orientada"}</span></div><div className="comparison-content"><strong>{mode === "basic" ? "O visitante precisa descobrir sozinho." : "Cada parte ajuda a decidir o próximo passo."}</strong><ul>{states[mode].map(item => <li key={item}>{item}</li>)}</ul></div></div>
  </div>;
}
