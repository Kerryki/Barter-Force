interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export function Section({ children, className = '' }: SectionProps) {
  return (
    <section className={`py-20 md:py-28 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
