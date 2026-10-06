/** Pure calculations behind the budget and leverage illustrations. */

export type BudgetStatus = 'none' | 'over' | 'good' | 'low';

export interface BudgetResult {
  left: number;
  /** Share of income left over, in percent. */
  rate: number;
  needs: number;
  wants: number;
  savings: number;
  status: BudgetStatus;
  /** Width of the savings bar in percent: 20% of income fills it completely. */
  barPercent: number;
}

/** Parse a user-entered amount: anything that is not a positive number counts as 0. */
export function parseAmount(value: string): number {
  return Math.max(0, parseFloat(value) || 0);
}

/** Compare monthly income and spending with the common 50/30/20 guide. */
export function computeBudget(income: number, essentials: number, other: number): BudgetResult {
  const left = income - essentials - other;
  const rate = income > 0 ? (left / income) * 100 : 0;
  let status: BudgetStatus = 'low';
  if (income <= 0) status = 'none';
  else if (left < 0) status = 'over';
  else if (rate >= 20) status = 'good';

  return {
    left,
    rate,
    needs: income * 0.5,
    wants: income * 0.3,
    savings: income * 0.2,
    status,
    barPercent: Math.max(0, Math.min(100, rate * 5)),
  };
}

export const LEVERAGE_OWN_MONEY = 50000;
export const LEVERAGE_PROPERTY_PRICE = 250000;

export interface LeverageResult {
  /** Change in property value, in dollars. */
  gain: number;
  /** Return on the buyer's own money when using the mortgage, in percent. */
  leveragedReturn: number;
  /** Return on the same money invested with no borrowing, in percent. */
  plainReturn: number;
}

/** Simplified illustration that ignores interest, fees, taxes and other costs. */
export function computeLeverage(changePercent: number): LeverageResult {
  const gain = (LEVERAGE_PROPERTY_PRICE * changePercent) / 100;
  return {
    gain,
    leveragedReturn: (gain / LEVERAGE_OWN_MONEY) * 100,
    plainReturn: changePercent,
  };
}

/** Whole-dollar CAD amount in the visitor's language (fr-CA or en-CA). */
export function formatMoney(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-CA' : 'en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Prefix + or the true minus sign (U+2212) to a formatted magnitude. */
export function withSign(value: number, format: (magnitude: number) => string): string {
  const sign = value > 0 ? '+' : value < 0 ? '−' : '';
  return `${sign}${format(Math.abs(value))}`;
}
