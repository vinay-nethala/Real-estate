import { Navbar } from '@/components/Navbar';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SavedSearches() {
  const { savedSearches, loadSearch, deleteSearch } = useAppStore();
  const navigate = useNavigate();

  const handleLoad = (id: string) => {
    loadSearch(id);
    navigate('/properties');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container py-6">
        <h1 className="font-display text-2xl font-bold">Saved Searches</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your saved search criteria</p>

        <div className="mt-6 space-y-3">
          {savedSearches.length === 0 ? (
            <div data-testid="no-saved-searches" className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
              <Bookmark className="h-10 w-10 text-muted-foreground" />
              <p className="mt-3 font-medium text-muted-foreground">No saved searches yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Use the filters on the properties page and click "Save Search"
              </p>
            </div>
          ) : (
            savedSearches.map((search) => (
              <div
                key={search.id}
                data-testid={`saved-search-${search.id}`}
                className="flex items-center justify-between rounded-xl border bg-card p-4 transition-colors hover:bg-muted/50"
              >
                <div>
                  <h3 className="font-semibold">{search.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {search.filters.location || 'All locations'} · ${search.filters.priceMin.toLocaleString()} - ${search.filters.priceMax.toLocaleString()} ·{' '}
                    {search.filters.bedrooms === 'any' ? 'Any beds' : `${search.filters.bedrooms}+ beds`} ·{' '}
                    {search.filters.radius} mi radius
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Saved {new Date(search.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    data-testid={`load-search-${search.id}`}
                    size="sm"
                    onClick={() => handleLoad(search.id)}
                  >
                    <ArrowRight className="mr-1 h-4 w-4" />
                    Load
                  </Button>
                  <Button
                    data-testid={`delete-search-${search.id}`}
                    size="sm"
                    variant="outline"
                    onClick={() => deleteSearch(search.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
