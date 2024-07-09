import { ReactNode } from 'react';

export default function MarginWidthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col  sm:border-r sm:border-zinc-700 min-h-screen">
      {children}
    </div>
  );
}