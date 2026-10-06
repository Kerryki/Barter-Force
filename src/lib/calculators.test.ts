import { describe, expect, it } from 'vitest';
import {
  computeBudget,
  computeLeverage,
  formatMoney,
  parseAmount,
  withSign,
} from './calculators';

describe('parseAmount', () => {
  it('treats blanks, junk and negatives as zero', () => {
    expect(parseAmount('')).toBe(0);
    expect(parseAmount('abc')).toBe(0);
    expect(parseAmount('-50')).toBe(0);
    expect(parseAmount('1200.5')).toBe(1200.5);
  });

  it('caps huge input so results never become NaN or Infinity', () => {
    expect(parseAmount('1e999')).toBe(1_000_000_000);
    expect(parseAmount('-1e999')).toBe(0);
    const r = computeBudget(parseAmount('1e999'), 0, 0);
    expect(Number.isFinite(r.left) && Number.isFinite(r.rate) && Number.isFinite(r.barPercent)).toBe(true);
  });
});

describe('computeBudget', () => {
  it('matches the mock-up defaults: 4000 - 2200 - 900 leaves 900 (22.5%)', () => {
    const r = computeBudget(4000, 2200, 900);
    expect(r.left).toBe(900);
    expect(r.rate).toBeCloseTo(22.5);
    expect(r.status).toBe('good');
    expect([r.needs, r.wants, r.savings]).toEqual([2000, 1200, 800]);
    expect(r.barPercent).toBe(100);
  });

  it('reports overspending, low savings and missing income', () => {
    expect(computeBudget(1000, 800, 400).status).toBe('over');
    expect(computeBudget(4000, 2500, 1000).status).toBe('low');
    expect(computeBudget(0, 100, 100).status).toBe('none');
  });

  it('never lets the bar go negative or over 100', () => {
    expect(computeBudget(1000, 900, 400).barPercent).toBe(0);
    expect(computeBudget(1000, 0, 0).barPercent).toBe(100);
  });
});

describe('computeLeverage', () => {
  it('turns +5% on a $250,000 property into +$12,500, +25% on $50,000', () => {
    const r = computeLeverage(5);
    expect(r.gain).toBe(12500);
    expect(r.leveragedReturn).toBe(25);
    expect(r.plainReturn).toBe(5);
  });

  it('magnifies losses too', () => {
    const r = computeLeverage(-15);
    expect(r.gain).toBe(-37500);
    expect(r.leveragedReturn).toBe(-75);
  });
});

describe('formatting', () => {
  it('formats CAD per locale', () => {
    expect(formatMoney(12500, 'en')).toBe('$12,500');
    expect(formatMoney(12500, 'fr').replace(/\s/g, ' ')).toMatch(/12 500 \$/);
  });

  it('uses a true minus sign', () => {
    expect(withSign(-5, (n) => `${n}%`)).toBe('−5%');
    expect(withSign(5, (n) => `${n}%`)).toBe('+5%');
    expect(withSign(0, (n) => `${n}%`)).toBe('0%');
  });
});
