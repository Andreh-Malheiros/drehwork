"use client";

import { useState } from "react";

const states = {
  basic: ["Informações dispersas", "Próximo passo incerto", "Dependência de plataformas", "Pouco contexto para pesquisa"],
  strategic: ["Oferta organizada", "Ações claras", "Canal digital próprio", "Conteúdo interpretável"],
};
export function PresenceComparison() {
  const [mode, setMode] = useState<keyof typeof states>("basic");
  return <div className="comparison" data-mode={mode}>
    <div className="comparison-copy">
      <p className="comparison-index">ESTADO / {mode === "basic" ? "01" : "02"}</p>
      <h3>{mode === "basic" ? "Informação existe. Direção ainda não." : "Cada parte assume uma função."}</h3>
      <p>{mode === "basic" ? "O visitante reúne pistas, compara sinais e tenta descobrir sozinho o próximo passo." : "Oferta, contexto e ação formam uma presença que explica, sustenta confiança e orienta a decisão."}</p>
      <ul>{states[mode].map(item => <li key={item}>{item}</li>)}</ul>
      <div className="comparison-controls" role="group" aria-label="Comparar presença digital">
        <button data-active={mode === "basic"} onClick={() => setMode("basic")}><span>01</span> Dispersa</button>
        <button data-active={mode === "strategic"} onClick={() => setMode("strategic")}><span>02</span> Estruturada</button>
      </div>
    </div>
    <div className="comparison-stage" aria-hidden>
      <div className="presence-frame"><span>EMPRESA / PRESENÇA DIGITAL</span><b>{mode === "basic" ? "SINAL INCOMPLETO" : "SISTEMA ATIVO"}</b></div>
      <div className="presence-module module-offer"><small>01</small><strong>O que fazemos</strong><i /></div>
      <div className="presence-module module-proof"><small>02</small><strong>Por que confiar</strong><i /></div>
      <div className="presence-module module-find"><small>03</small><strong>Como encontrar</strong><i /></div>
      <div className="presence-module module-action"><small>04</small><strong>Próxima ação</strong><i /></div>
      <span className="presence-route route-one" /><span className="presence-route route-two" />
      <div className="presence-core"><span>PRESENÇA</span><b>{mode === "basic" ? "?" : "ATIVA"}</b></div>
    </div>
  </div>;
}
