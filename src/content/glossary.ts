export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example: string;
  fr_term: string;
  fr_definition: string;
  fr_example: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'equity',
    term: 'Equity',
    definition: 'The part of your home you truly own: its value minus what you still owe the lender.',
    example: 'A home worth $400,000 with $250,000 left on the mortgage has $150,000 in equity.',
    fr_term: 'Avoir propre foncier',
    fr_definition: 'La part de votre maison qui vous appartient vraiment : sa valeur moins ce que vous devez encore au prêteur.',
    fr_example: 'Une maison évaluée à 400 000 $ avec 250 000 $ restant sur l\'hypothèque a 150 000 $ de valeur nette.',
  },
  {
    id: 'amortization',
    term: 'Amortization',
    definition: 'The total number of years it would take to repay a loan in full, such as 25 years for a mortgage.',
    example: 'A 25-year amortization means your payments are spread out to pay off the loan over 25 years.',
    fr_term: 'Amortissement',
    fr_definition: 'Le nombre total d\'années prévues pour rembourser un prêt en entier, par exemple 25 ans pour une hypothèque.',
    fr_example: 'Un amortissement de 25 ans signifie que vos paiements sont étalés pour rembourser le prêt sur 25 ans.',
  },
  {
    id: 'term',
    term: 'Term',
    definition: 'How long your interest rate and conditions last before you renew or renegotiate.',
    example: 'A 5-year term locks in your rate for 5 years, even if your amortization is 25 years.',
    fr_term: 'Terme',
    fr_definition: 'La durée pendant laquelle votre taux d\'intérêt et vos conditions restent fixes avant le renouvellement ou la renégociation.',
    fr_example: 'Un terme de 5 ans fixe votre taux pour 5 ans, même si votre amortissement est de 25 ans.',
  },
  {
    id: 'fixed-variable-rate',
    term: 'Fixed vs variable rate',
    definition: 'A fixed rate stays the same during your term. A variable rate can move up or down.',
    example: 'With a fixed rate, your payment stays the same for the whole term; with a variable rate, it can change.',
    fr_term: 'Taux fixe ou variable',
    fr_definition: 'Un taux fixe reste le même pendant votre terme. Un taux variable peut monter ou descendre.',
    fr_example: 'Avec un taux fixe, votre paiement reste le même pendant tout le terme; avec un taux variable, il peut changer.',
  },
  {
    id: 'pre-approval',
    term: 'Pre-approval',
    definition: 'A lender\'s estimate of how much they may lend you, before you choose a home.',
    example: 'A pre-approval for $350,000 tells you roughly what price range to shop in.',
    fr_term: 'Préapprobation',
    fr_definition: 'L\'estimation d\'un prêteur du montant qu\'il pourrait vous prêter, avant que vous ne choisissiez une propriété.',
    fr_example: 'Une préapprobation de 350 000 $ vous indique approximativement la fourchette de prix à considérer.',
  },
  {
    id: 'prepayment-penalty',
    term: 'Prepayment penalty',
    definition: 'A charge for leaving or paying off a loan early under certain conditions.',
    example: 'Breaking a 5-year fixed term after 2 years can trigger a prepayment penalty.',
    fr_term: 'Pénalité de remboursement anticipé',
    fr_definition: 'Des frais pour quitter ou rembourser un prêt plus tôt que prévu, selon certaines conditions.',
    fr_example: 'Rompre un terme fixe de 5 ans après 2 ans peut entraîner une pénalité de remboursement anticipé.',
  },
  {
    id: 'tfsa',
    term: 'TFSA',
    definition: 'A tax-free savings account. What you earn inside it, including investment growth, is not taxed.',
    example: 'Money grown inside a TFSA can be withdrawn without owing tax on the gains.',
    fr_term: 'CELI',
    fr_definition: 'Un compte d\'épargne libre d\'impôt. Ce que vous y gagnez, y compris la croissance de vos placements, n\'est pas imposé.',
    fr_example: 'L\'argent qui fructifie dans un CELI peut être retiré sans payer d\'impôt sur les gains.',
  },
  {
    id: 'rrsp',
    term: 'RRSP (REER)',
    definition: 'A retirement account. Contributions can reduce your taxes now, and withdrawals are taxed later.',
    example: 'Contributing $5,000 to an RRSP can lower your taxable income for that year.',
    fr_term: 'REER',
    fr_definition: 'Un compte de retraite. Les cotisations peuvent réduire vos impôts maintenant, et les retraits sont imposés plus tard.',
    fr_example: 'Cotiser 5 000 $ à un REER peut réduire votre revenu imposable pour cette année.',
  },
  {
    id: 'etf',
    term: 'ETF',
    definition: 'A basket of many investments you can buy as one product, usually at a low cost.',
    example: 'One ETF can hold shares of hundreds of companies in a single purchase.',
    fr_term: 'FNB',
    fr_definition: 'Un panier de nombreux placements que vous pouvez acheter comme un seul produit, habituellement à faible coût.',
    fr_example: 'Un seul FNB peut détenir des actions de centaines d\'entreprises en un seul achat.',
  },
  {
    id: 'diversification',
    term: 'Diversification',
    definition: 'Spreading your money across different investments so one bad result does not sink your whole plan.',
    example: 'Holding stocks, bonds and real estate together instead of only one type of investment.',
    fr_term: 'Diversification',
    fr_definition: 'Répartir votre argent entre différents placements pour qu\'un seul mauvais résultat ne fasse pas couler tout votre plan.',
    fr_example: 'Détenir des actions, des obligations et de l\'immobilier ensemble plutôt qu\'un seul type de placement.',
  },
  {
    id: 'credit-score',
    term: 'Credit score',
    definition: 'A number lenders use to judge how reliably you repay money. A higher score usually means better rates.',
    example: 'A higher credit score can mean a lower interest rate on a loan.',
    fr_term: 'Cote de crédit',
    fr_definition: 'Un chiffre que les prêteurs utilisent pour juger de votre fiabilité à rembourser. Plus il est élevé, meilleures sont généralement les conditions.',
    fr_example: 'Une cote de crédit plus élevée peut mener à un taux d\'intérêt plus bas sur un prêt.',
  },
  {
    id: 'emergency-fund',
    term: 'Emergency fund',
    definition: 'Savings set aside for the unexpected, often several months of essential expenses.',
    example: 'Keeping 3 to 6 months of expenses saved in case of a job loss or urgent repair.',
    fr_term: 'Fonds d\'urgence',
    fr_definition: 'Une épargne mise de côté pour l\'imprévu, souvent équivalente à plusieurs mois de dépenses essentielles.',
    fr_example: 'Garder de 3 à 6 mois de dépenses en épargne en cas de perte d\'emploi ou de réparation urgente.',
  },
  {
    id: 'compound-interest',
    term: 'Compound interest',
    definition: 'Earning growth on your earlier growth, which is why starting early helps.',
    example: 'Interest earned one year starts earning its own interest the next year.',
    fr_term: 'Intérêt composé',
    fr_definition: 'Gagner de la croissance sur votre croissance précédente, ce qui explique pourquoi commencer tôt aide.',
    fr_example: 'L\'intérêt gagné une année commence à son tour à générer de l\'intérêt l\'année suivante.',
  },
];
