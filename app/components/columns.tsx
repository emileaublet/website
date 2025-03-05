export const Columns = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={
        "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full my-6 md:my-8 columns"
      }
    >
      {children}
    </div>
  );
};
