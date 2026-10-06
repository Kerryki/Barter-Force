import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';

interface Row {
  label: string;
  term: string;
  permanent: string;
}

export function InsuranceSection() {
  const t = useTranslations('insurance');
  const rows = t.raw('rows') as Row[];
  const more = t.raw('more') as Array<{ title: string; text: string }>;

  return (
    <Section id="insurance">
      <h2>{t('title')}</h2>
      <p className="sub" style={{ margin: '24px 0 40px' }}>{t('intro')}</p>
      <div className="scroll">
        <table className="cmp">
          <thead>
            <tr>
              <td>
                <span style={{ position: 'absolute', left: -9999 }}>{t('aspect')}</span>
              </td>
              <th scope="col">{t('term')}</th>
              <th scope="col">{t('permanent')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{row.term}</td>
                <td>{row.permanent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="plain" style={{ marginTop: 40 }}>
        {more.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            {item.text}
          </li>
        ))}
      </ul>
      <p className="fine">{t('fine')}</p>
    </Section>
  );
}
