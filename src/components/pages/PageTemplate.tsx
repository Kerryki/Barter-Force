import { ReactNode } from 'react';
import { Section } from '@/components/layout/Section';
import { GoldDivider } from '@/components/ui/GoldDivider';

interface PageTemplateProps {
  title: string;
  description?: string;
  children: ReactNode;
  showDivider?: boolean;
}

export function PageTemplate({
  title,
  description,
  children,
  showDivider = true,
}: PageTemplateProps) {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-charcoal text-warm-white min-h-[400px] flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl font-sans text-gray-300">
              {description}
            </p>
          )}
        </div>
      </Section>

      {showDivider && <GoldDivider />}

      {/* Content Sections */}
      {children}
    </>
  );
}
