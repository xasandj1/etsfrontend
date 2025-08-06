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
    <label htmlFor={id} className="radio-wrapper mt-9">
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="custom-radio"></span>
      <span className="radio-label">{label}</span>
    </label>
  );
}
