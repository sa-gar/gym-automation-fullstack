export default function Button({
  children,
  type = "button",
  className = "",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-2xl px-5 py-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}