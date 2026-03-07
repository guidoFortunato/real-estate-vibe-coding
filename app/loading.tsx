import { Navbar } from "../components/Navbar";
import { FilterPills } from "../components/FilterPills";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background-light font-display">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 mt-8">
        {/* HERO SECTION */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-pulse">
            <div className="h-14 bg-nordic-dark/10 rounded-xl w-3/4 mx-auto mb-4"></div>

            <div className="relative group max-w-2xl mx-auto">
              <div className="w-full h-16 bg-white rounded-xl shadow-soft"></div>
            </div>

            <FilterPills />
          </div>
        </section>

        {/* FEATURED COLLECTIONS SECTION SKELETON */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div className="space-y-2">
              <div className="h-8 bg-nordic-dark/10 rounded w-64"></div>
              <div className="h-4 bg-nordic-dark/10 rounded w-48"></div>
            </div>
            <div className="hidden sm:block h-4 bg-nordic-dark/10 rounded w-20"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-soft bg-white h-100 animate-pulse">
                <div className="w-full h-full bg-nordic-dark/5"></div>
              </div>
            ))}
          </div>
        </section>

        {/* NEW IN MARKET SECTION SKELETON */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div className="space-y-2">
              <div className="h-8 bg-nordic-dark/10 rounded w-48"></div>
              <div className="h-4 bg-nordic-dark/10 rounded w-32"></div>
            </div>
            <div className="hidden md:flex bg-white p-1 rounded-lg h-9 w-40"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-card h-95 animate-pulse">
                <div className="aspect-4/3 relative w-full bg-nordic-dark/5"></div>
                
                <div className="p-4 flex flex-col h-full">
                  <div className="h-6 bg-nordic-dark/10 rounded w-1/3 mb-4"></div>
                  <div className="h-5 bg-nordic-dark/10 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-nordic-dark/10 rounded w-1/2 mb-4"></div>
                  
                  <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between">
                    <div className="h-4 bg-nordic-dark/10 rounded w-12"></div>
                    <div className="h-4 bg-nordic-dark/10 rounded w-12"></div>
                    <div className="h-4 bg-nordic-dark/10 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
