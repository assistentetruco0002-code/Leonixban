import React, { useState } from 'react';

interface SmartBannerProps {
  onInstall?: () => void;
}

export const SmartBanner: React.FC<SmartBannerProps> = ({ onInstall }) => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div
      id="mais-app-banner"
      className="mais-app-banner"
      role="region"
      aria-label="Aplicativo LeonixBank"
      style={{
        display: 'flex',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      <button
        type="button"
        className="mais-close text-slate-400 hover:text-white"
        aria-label="Fechar aviso"
        onClick={() => setClosed(true)}
      >
        &times;
      </button>
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1d4ed8] to-[#3b82f6] flex items-center justify-center p-2 shadow-md">
        <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
          <path d="M24 6L37 16L32 37L24 42L16 37L11 16L24 6Z" fill="white" />
          <path d="M24 12L30 19L24 33L18 19L24 12Z" fill="#1e3a8a" />
          <circle cx="24" cy="22" r="2.5" fill="white" />
        </svg>
      </div>
      <div className="mais-details">
        <strong className="mais-name text-white">LeonixBank</strong>
        <span className="mais-tagline text-[#60a5fa] font-bold">AQUI VOCÊ É LEONIX!</span>
        <span
          className="mais-rating"
          aria-label="Nota na loja: 4,9 de 5"
        >
          <span className="mais-stars text-[#38bdf8]" aria-hidden="true">
            ★★★★<span className="mais-half">★</span>
          </span>
          <span className="mais-score text-slate-300">4,9</span>
        </span>
      </div>
      <a
        className="mais-install bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition font-bold"
        href="#comece"
        onClick={(e) => {
          if (onInstall) {
            e.preventDefault();
            onInstall();
          }
        }}
      >
        Baixar app
      </a>
    </div>
  );
};
