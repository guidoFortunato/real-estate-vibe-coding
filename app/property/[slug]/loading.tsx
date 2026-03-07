import { Navbar } from "../../../components/Navbar";

export default function Loading() {
  return (
    <div className="min-h-screen bg-clear-day">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-16/10 bg-nordic-dark/5 rounded-xl"></div>
            <div className="flex gap-4 overflow-hidden pb-2">
              <div className="w-48 aspect-4/3 bg-nordic-dark/10 rounded-lg shrink-0"></div>
              <div className="w-48 aspect-4/3 bg-nordic-dark/10 rounded-lg shrink-0"></div>
              <div className="w-48 aspect-4/3 bg-nordic-dark/10 rounded-lg shrink-0"></div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm h-100">
              <div className="h-10 bg-nordic-dark/10 rounded w-1/2 mb-4"></div>
              <div className="h-5 bg-nordic-dark/10 rounded w-3/4 mb-4"></div>
              <div className="h-px bg-slate-100 my-6"></div>
              <div className="h-20 bg-nordic-dark/5 rounded-xl mb-6"></div>
              <div className="h-14 bg-nordic-dark/10 rounded-xl mb-3"></div>
              <div className="h-14 bg-nordic-dark/5 rounded-xl"></div>
            </div>
            <div className="w-full aspect-4/3 bg-slate-100 rounded-xl"></div>
          </div>

        </div>
      </main>
    </div>
  );
}
