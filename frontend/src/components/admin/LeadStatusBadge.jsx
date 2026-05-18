const statusStyles = {
  new: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  contacted: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
  trial_booked: "border-lime-400/30 bg-lime-400/10 text-lime-300",
  converted: "border-green-400/30 bg-green-400/10 text-green-300",
  lost: "border-red-400/30 bg-red-400/10 text-red-300",
};

const statusLabels = {
  new: "New",
  contacted: "Contacted",
  trial_booked: "Trial Booked",
  converted: "Converted",
  lost: "Lost",
};

export default function LeadStatusBadge({ status }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-bold ${
        statusStyles[status] || "border-zinc-700 bg-zinc-900 text-zinc-300"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}