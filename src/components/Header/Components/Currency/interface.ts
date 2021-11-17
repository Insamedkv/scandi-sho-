export interface CurrencyProps {
  currency: string,
  changeCurrency: (el: string) => void,
}

export interface CurrencyState {
  isOpen?: boolean,
  selectedItem?: string,
  data: CurrenciesData,
}

interface CurrenciesData {
  currencies: string[],
}
