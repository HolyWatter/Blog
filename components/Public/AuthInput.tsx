interface Props {
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

export const Input = ({ placeholder, value, name, onChange, type }: Props) => {
  return (
    <input
      className="h-10 rounded-sm border pl-4 focus:border-origin focus:outline-none"
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      type={type}
    />
  );
};
