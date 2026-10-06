interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Extra class on the inner `.wrap` container (for example `two` or `grid`). */
  wrapClassName?: string;
}

export function Section({ children, id, className = '', wrapClassName = '' }: SectionProps) {
  return (
    <section id={id} className={className}>
      <div className={`wrap ${wrapClassName}`.trim()}>{children}</div>
    </section>
  );
}
