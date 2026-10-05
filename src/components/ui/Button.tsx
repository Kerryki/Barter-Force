import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
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
  const baseClass =
    'px-6 py-3 font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 inline-block';

  const variantClass =
    variant === 'primary'
      ? 'bg-gold text-charcoal hover:bg-warm-white focus:ring-gold'
      : 'bg-warm-white text-charcoal hover:bg-gold focus:ring-gold';

  const classes = `${baseClass} ${variantClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
