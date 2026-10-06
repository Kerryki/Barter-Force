import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** `ghost` is an outlined button for use on dark backgrounds. */
  variant?: 'primary' | 'ghost';
  href?: string;
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  href,
  ...props
}: ButtonProps) {
  const classes = `btn${variant === 'ghost' ? ' ghost' : ''} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
