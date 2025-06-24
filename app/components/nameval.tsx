export const NameVal = ({ name, val }: { name: string; val: string }) => {
  return (
    <div className="md:flex gap-0 flex-col justify-start">
      <span className="font-semibold hidden md:block">{name}</span>
      <span className="text-current/75">{val}</span>
    </div>
  );
};
