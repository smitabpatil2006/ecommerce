export function Stars({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  const rounded = Math.round(rating);

  return (
    <span
      className={`text-orange-500 ${className}`}
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {"★".repeat(rounded)}
      <span className="text-neutral-300 dark:text-neutral-700">
        {"★".repeat(5 - rounded)}
      </span>
    </span>
  );
}
