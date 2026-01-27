interface StatCardProps {
  mainStat: string;
  subtext: string;
}

export default function StatCard({ mainStat, subtext }: StatCardProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-3xl transform translate-x-2 translate-y-2 opacity-60"></div>

      <div className="relative bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] rounded-3xl border border-blue-700/40 shadow-lg shadow-blue-900/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-blue-500/40 w-[360px] h-[220px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent opacity-50"></div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center px-8">
          <div className="text-6xl font-extrabold text-white tracking-tight mb-3 animate-fade-in">
            {mainStat}
          </div>

          <div className="space-y-3">
            <div className="text-lg font-medium text-blue-300 animate-fade-in-up">
              {subtext}
            </div>

            <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
