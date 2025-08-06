import RadioButton from "./RedioButton";

export default function RadioGroup({ name, options, selected, onChange }) {
  return (
    <div className="flex flex-col space-y-3">
      {options.map(opt => (
        <RadioButton
          key={opt.value}
          id={`${name}-${opt.value}`}
          name={name}
          value={opt.value}
          label={opt.label}
          checked={selected === opt.value}
          onChange={() => onChange(opt.value)}
        />
      ))}
    </div>
  );
}
