export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-[1.5rem] border shadow-2xl ${className}`}>
      {children}
    </div>
  );
}