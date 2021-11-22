export interface CategoriesProps {
  category: string,
  changeCategory: (el: string) => void,
}

export interface CategoriesState {
  data: CategoriesData,
  loading: boolean,
}

interface CategoriesData {
  categories: CategoryName[],
}

export interface CategoryName {
  name: string,
}
