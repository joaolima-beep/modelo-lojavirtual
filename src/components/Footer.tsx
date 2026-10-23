import { Link } from 'react-router-dom';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../data';

const FOOTER_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/produtos', label: 'Todos os produtos' },
  { to: '/produtos?categoria=camisetas', label: 'Camisetas' },
  { to: '/produtos?categoria=calcas', label: 'Calcas' },
  { to: '/produtos?categoria=acessorios', label: 'Acessorios' },
  { to: '/produtos?categoria=kits', label: 'Kits' },
];

export default function Footer() {
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsapp}`;

  return (
    <footer className="mt-16 border-t border-brand-gray-700 bg-brand-black">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="font-display text-2xl font-black uppercase text-white">
              PM<span className="text-brand-blue">HOUSE</span>
            </Link>
            <p className="text-sm text-brand-gray-400 max-w-xs">
              Streetwear urbano com identidade propria. Estilo, caimento e atitude em cada peca.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Navegacao
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to + link.label}>
                  <Link to={link.to} className="link-footer">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Contato
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-footer inline-flex items-center gap-2"
                >
                  <MessageCircle size={16} />
                  WhatsApp do vendedor
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STORE_CONFIG.email}`}
                  className="link-footer inline-flex items-center gap-2"
                >
                  <Mail size={16} />
                  {STORE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Redes
            </h4>
            <div className="flex gap-3">
              <a
                href={STORE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-brand-gray-700 text-brand-gray-400 transition-colors hover:border-brand-blue hover:text-brand-blue"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 border-t border-brand-gray-700 pt-6">
          <p className="text-xs text-brand-gray-500 text-center leading-relaxed">
            Prototipo demonstrativo PM HOUSE. Produtos, precos e imagens sao ficticios e
            destinam-se apenas a demonstracao. Nenhum pedido e confirmado automaticamente.
          </p>
        </div>
      </div>
    </footer>
  );
}
