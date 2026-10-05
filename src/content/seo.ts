/**
 * Per-page SEO copy (EN + FR). Drafts: [TODO: check titles and descriptions against
 * the blueprint's Section 8 keyword table before launch]. Keep titles under 55
 * characters (the site name is appended) and descriptions under 160.
 */
export interface SeoEntry {
  title: string;
  description: string;
}

export type SeoKey =
  | 'home'
  | 'services'
  | 'mortgages'
  | 'savings-investing'
  | 'credit-health'
  | 'protection'
  | 'how-it-works'
  | 'about'
  | 'fees'
  | 'faq'
  | 'learning'
  | 'contact'
  | 'privacy'
  | 'terms';

export const seo: Record<SeoKey, Record<'en' | 'fr', SeoEntry>> = {
  home: {
    en: {
      title: 'Financial Broker in Montréal',
      description:
        'Private financial guidance in Montréal: mortgages, savings and investing, credit health and protection, explained in plain language. Book a free consultation.',
    },
    fr: {
      title: 'Courtier financier à Montréal',
      description:
        'Accompagnement financier privé à Montréal : hypothèques, épargne et placements, crédit et protection, en langage courant. Consultation gratuite.',
    },
  },
  services: {
    en: {
      title: 'Mortgage, Investing, Credit and Protection Services',
      description:
        'Four areas, one approach: clear explanations, honest comparisons and your decision. Mortgages, savings and investing, credit health and protection planning.',
    },
    fr: {
      title: 'Services : hypothèques, placements, crédit, protection',
      description:
        'Quatre domaines, une seule approche : des explications claires, des comparaisons honnêtes et votre décision. Hypothèques, épargne, crédit et protection.',
    },
  },
  mortgages: {
    en: {
      title: 'Mortgage Broker in Montréal',
      description:
        'Buying, renewing or refinancing in Québec? Get lenders compared for you and every number on your mortgage offer explained in plain language.',
    },
    fr: {
      title: 'Courtier hypothécaire à Montréal',
      description:
        'Achat, renouvellement ou refinancement au Québec? Les prêteurs sont comparés pour vous et chaque chiffre de votre offre hypothécaire est expliqué simplement.',
    },
  },
  'savings-investing': {
    en: {
      title: 'Savings and Investing for Beginners',
      description:
        'New to investing? Understand the TFSA, RRSP and your risk comfort, and get a simple written plan that fits your goals. No jargon, no pressure.',
    },
    fr: {
      title: 'Épargne et placements pour débutants',
      description:
        'Nouveau en placements? Comprenez le CELI, le REER et votre tolérance au risque, et obtenez un plan écrit simple adapté à vos objectifs. Sans jargon.',
    },
  },
  'credit-health': {
    en: {
      title: 'Credit Health and Credit Score Help',
      description:
        'Understand your credit report and follow a clear, realistic plan to strengthen your profile. Judgement-free guidance for newcomers and anyone rebuilding.',
    },
    fr: {
      title: 'Santé du crédit et cote de crédit',
      description:
        'Comprenez votre rapport de crédit et suivez un plan réaliste pour renforcer votre profil. Sans jugement, pour nouveaux arrivants et reconstruction.',
    },
  },
  protection: {
    en: {
      title: 'Protection Planning for Families and Owners',
      description:
        'Make sure your income, family, home and business are covered without overpaying. Coverage compared side by side, with exclusions and costs explained.',
    },
    fr: {
      title: 'Planification de la protection',
      description:
        'Assurez la protection de votre revenu, de votre famille, de votre maison et de votre entreprise sans payer trop cher. Protections comparées côte à côte.',
    },
  },
  'how-it-works': {
    en: {
      title: 'How It Works',
      description:
        'A calm, four-step process: a free conversation, your options compared, your decision at your own pace, and ongoing care such as renewal reminders.',
    },
    fr: {
      title: 'Comment ça marche',
      description:
        'Un processus serein en quatre étapes : conversation gratuite, options comparées, décision à votre rythme et suivi continu, dont les rappels de renouvellement.',
    },
  },
  about: {
    en: {
      title: 'About Your Broker',
      description:
        'Meet your Montréal financial broker: a plain-language approach, honest comparisons and no pressure. Services in French and English.',
    },
    fr: {
      title: 'À propos de votre courtier',
      description:
        'Faites connaissance avec votre courtier financier à Montréal : langage courant, comparaisons honnêtes et aucune pression. Services en français et en anglais.',
    },
  },
  fees: {
    en: {
      title: 'Fees and Transparency',
      description:
        'Know what each service costs and how your broker is paid before you commit. Your first consultation is free and without obligation.',
    },
    fr: {
      title: 'Frais et transparence',
      description:
        'Sachez ce que coûte chaque service et comment votre courtier est rémunéré avant de vous engager. Première consultation gratuite et sans engagement.',
    },
  },
  faq: {
    en: {
      title: 'Frequently Asked Questions',
      description:
        'Answers about how the first meeting works, how your broker is paid, credit history, privacy and meeting online or in French.',
    },
    fr: {
      title: 'Questions fréquentes',
      description:
        'Réponses sur la première rencontre, la rémunération du courtier, le dossier de crédit, la confidentialité et les rencontres en ligne ou en français.',
    },
  },
  learning: {
    en: {
      title: 'Learning Centre: Finance, Translated',
      description:
        'Plain-language guides and a glossary covering mortgages, investing, credit and protection: equity, amortization, TFSA, RRSP and more.',
    },
    fr: {
      title: "Centre d'apprentissage : la finance, traduite",
      description:
        'Guides en langage courant et glossaire sur les hypothèques, les placements, le crédit et la protection : valeur nette, amortissement, CELI, REER et plus.',
    },
  },
  contact: {
    en: {
      title: 'Book a Free Consultation',
      description:
        'Tell me what you have in mind. Your first consultation is free and without obligation, and I reply personally within one business day.',
    },
    fr: {
      title: 'Réserver une consultation gratuite',
      description:
        'Dites-moi ce que vous avez en tête. Votre première consultation est gratuite et sans engagement, et je réponds personnellement en un jour ouvrable.',
    },
  },
  privacy: {
    en: {
      title: 'Privacy Policy',
      description:
        'How your personal information is collected, used, shared and protected, and how to exercise your rights under Québec privacy law.',
    },
    fr: {
      title: 'Politique de confidentialité',
      description:
        'Comment vos renseignements personnels sont recueillis, utilisés, partagés et protégés, et comment exercer vos droits selon la loi québécoise.',
    },
  },
  terms: {
    en: {
      title: 'Terms of Use',
      description: 'The rules for using this website, including the limits of the general information it provides.',
    },
    fr: {
      title: "Conditions d'utilisation",
      description: "Les règles d'utilisation de ce site Web, y compris les limites de l'information générale qu'il offre.",
    },
  },
};

/** Look up the title and description for a page in the given locale (defaults to English). */
export function getSeo(key: SeoKey, locale: string): SeoEntry {
  return seo[key][locale === 'fr' ? 'fr' : 'en'];
}
