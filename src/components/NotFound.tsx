import { Link } from 'react-router-dom';

interface NotFoundProps {
  title?: string;
  message?: string;
}

export default function NotFound({ title, message }: NotFoundProps) {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <span className="font-display text-7xl font-black text-brand-gray-700">404</span>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase text-white">
        {title ?? 'Pagina nao encontrada'}
      </h1>
      <p className="mt-2 max-w-md text-sm text-brand-gray-400">
        {message ?? 'O conteudo que voce procura nao existe ou foi removido.'}
      </p>
      <Link to="/produtos" className="btn-primary mt-8">
        Voltar para a loja
      </Link>
    </div>
  );
}
