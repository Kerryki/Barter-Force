interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`border border-gray-200 rounded-lg shadow-sm p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
