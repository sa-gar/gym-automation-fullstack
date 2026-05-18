export default function AdminStatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">{title}</p>
          <p className="mt-2 text-3xl font-black text-white">{value}</p>
        </div>

        <div className="rounded-2xl bg-lime-400/10 p-3 text-lime-300">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}