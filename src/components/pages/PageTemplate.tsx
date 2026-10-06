import { ReactNode } from 'react';

interface PageTemplateProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/** Dark intro band with the page title, followed by the page's sections. */
export function PageTemplate({ title, description, children }: PageTemplateProps) {
  return (
    <>
      <div className="hero page">
        <div className="wrap">
          <h1>{title}</h1>
          {description && <p className="lead">{description}</p>}
        </div>
      </div>
      {children}
    </>
  );
}
