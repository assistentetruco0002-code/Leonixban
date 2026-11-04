/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SmartBanner } from './components/SmartBanner';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { VantagensSection } from './components/VantagensSection';
import { PagueSection } from './components/PagueSection';
import { AppTourSection } from './components/AppTourSection';
import { SegurancaSection } from './components/SegurancaSection';
import { ComeceSection } from './components/ComeceSection';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';
import { LegalModal } from './components/LegalModal';
import { SupabaseModal } from './components/SupabaseModal';

export default function App() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [legalTopic, setLegalTopic] = useState<string | null>(null);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  // Dynamic Theme Observer matching section themes
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'hero', theme: 'yellow' },
        { id: 'manifesto', theme: 'black' },
        { id: 'vantagens', theme: 'yellow' },
        { id: 'pague', theme: 'black' },
        { id: 'app', theme: 'white' },
        { id: 'seguranca', theme: 'black' },
        { id: 'comece', theme: 'yellow' },
        { id: 'rodape', theme: 'black' },
      ];

      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            if (document.body.dataset.theme !== sections[i].theme) {
              document.body.dataset.theme = sections[i].theme;
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative font-sans">
      <a className="skip-link" href="#hero">
        Pular para o conteúdo
      </a>

      {/* Smart Mobile App Banner */}
      <SmartBanner onInstall={() => setApplyModalOpen(true)} />

      {/* Sticky Navigation Header */}
      <Header
        onOpenApply={() => setApplyModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenSupabase={() => setSupabaseModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="conteudo">
        <HeroSection
          onOpenApply={() => setApplyModalOpen(true)}
          onNavigateSection={handleNavigateSection}
        />

        <ManifestoSection />

        <VantagensSection />

        <PagueSection onOpenApply={() => setApplyModalOpen(true)} />

        <AppTourSection onOpenApply={() => setApplyModalOpen(true)} />

        <SegurancaSection />

        <ComeceSection onOpenApply={() => setApplyModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(topic) => setLegalTopic(topic)}
        onNavigateSection={handleNavigateSection}
        onOpenSupabase={() => setSupabaseModalOpen(true)}
      />

      {/* Interactive Card Application Modal */}
      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        onOpenSupabaseStatus={() => setSupabaseModalOpen(true)}
      />

      {/* Legal & Terms Modal */}
      <LegalModal
        topic={legalTopic}
        onClose={() => setLegalTopic(null)}
      />

      {/* Supabase Integration & Proposal Consultation Modal */}
      <SupabaseModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
      />
    </div>
  );
}
