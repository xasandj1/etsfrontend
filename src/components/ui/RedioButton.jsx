// components/ui/RadioButton.jsx
"use client";
export default function RadioButton({
  id,
  name,
  value,
  checked,
  onChange,
  label,
}) {
  return (
    <label
      htmlFor={id}
      className="relative inline-flex items-center cursor-pointer gap-2"
    >
      {/* Input ko‘zga ko‘rinmay, radio holatni peer orqali boshqarish */}
      <input
        id={id}
        name={name}
        type="radio"
        className="peer sr-only"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <div className="h-5 w-5 border-2 rounded-full border-primary peer-checked:border-primary grid place-items-center">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 0C3.3675 0 0 3.3675 0 7.5C0 11.6325 3.3675 15 7.5 15C11.6325 15 15 11.6325 15 7.5C15 3.3675 11.6325 0 7.5 0ZM11.085 5.775L6.8325 10.0275C6.7275 10.1325 6.585 10.1925 6.435 10.1925C6.285 10.1925 6.1425 10.1325 6.0375 10.0275L3.915 7.905C3.6975 7.6875 3.6975 7.3275 3.915 7.11C4.1325 6.8925 4.4925 6.8925 4.71 7.11L6.435 8.835L10.29 4.98C10.5075 4.7625 10.8675 4.7625 11.085 4.98C11.3025 5.1975 11.3025 5.55 11.085 5.775Z"
            fill="#007855"
          />
        </svg>
      </div>
      <span className="text-base">{label}</span>
    </label>
  );
}
