const currenciesSymbols: Symbols = {
  USD: '$',
  GBP: '£',
  AUD: '$',
  JPY: '¥',
  RUB: '₽',
};

interface Symbols {
  [index: string]: string;
}

export default currenciesSymbols;
