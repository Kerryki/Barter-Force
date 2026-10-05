import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://barterforce.com'),
  title: 'Barter Force',
  description: 'Private financial brokerage in Montréal: mortgages, savings and investing, credit health and protection.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
