export default function NumberElement({
  number,
  isChecked,
  isSelected,
  onClick,
}) {
  const handleClick = () => {
    if (!isChecked) {
      onClick(number);
    }
  };

  // Formatear el número con 3 dígitos (001, 002, etc.)
  const formattedNumber = number.toString().padStart(3, "0");

  return (
    <div
      className={`number-element ${isSelected ? "selected" : ""} ${isChecked ? "checked" : ""}`}
      onClick={handleClick}
    >
      {isChecked ? (
        <span className="check-mark-center">✗</span>
      ) : (
        <span className="number-text">{formattedNumber}</span>
      )}
    </div>
  );
}