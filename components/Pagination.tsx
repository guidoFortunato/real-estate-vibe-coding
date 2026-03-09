import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

export function Pagination({ currentPage, totalPages, baseUrl = '/' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getHref = (page: number) => {
    const hasQuery = baseUrl.includes('?');
    return `${baseUrl}${hasQuery ? '&' : '?'}page=${page}`;
  };

  // Build the page number array, with ellipsis logic
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | '...')[] = [1];
    if (currentPage > 3) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Property pagination"
      className="flex items-center justify-center gap-1.5 mt-12"
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={getHref(currentPage - 1)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-nordic-dark/10 text-nordic-dark text-sm font-medium hover:border-mosque hover:text-mosque transition-all shadow-card"
        >
          <span className="material-icons text-sm">arrow_back</span>
          Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-nordic-dark/5 text-nordic-muted/40 text-sm font-medium cursor-not-allowed select-none">
          <span className="material-icons text-sm">arrow_back</span>
          Prev
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, idx) =>
          page === '...' ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-9 h-9 flex items-center justify-center text-nordic-muted text-sm select-none"
            >
              …
            </span>
          ) : (
            <Link
              key={page}
              href={getHref(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                page === currentPage
                  ? 'bg-mosque text-white shadow-lg shadow-mosque/25'
                  : 'bg-white border border-nordic-dark/10 text-nordic-dark hover:border-mosque hover:text-mosque shadow-card'
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={getHref(currentPage + 1)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-nordic-dark/10 text-nordic-dark text-sm font-medium hover:border-mosque hover:text-mosque transition-all shadow-card"
        >
          Next
          <span className="material-icons text-sm">arrow_forward</span>
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-nordic-dark/5 text-nordic-muted/40 text-sm font-medium cursor-not-allowed select-none">
          Next
          <span className="material-icons text-sm">arrow_forward</span>
        </span>
      )}
    </nav>
  );
}
