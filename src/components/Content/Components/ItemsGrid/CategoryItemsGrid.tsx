import React from 'react';
import { connect } from 'react-redux';
import { client } from '../../../..';
import { CategoryStore } from '../../../../utility/generalInterfaces';
import { getCategoryItems, GET_CATEGORIES } from '../../../../utility/queries/queries';
import { CategoryItems, CategoryItemsGridProps, CategoryItemsGridState } from './interface';
import ItemCard from './ItemsCard/ItemCard';
import './CategoryItemsGrid.css';
import { CategoriesState } from '../../../Header/Components/Categories/interface';

class CategoryItemsGrid extends React.Component<CategoryItemsGridProps, CategoryItemsGridState> {
  constructor(props: CategoryItemsGridProps) {
    super(props);

    this.state = {
      categories: [],
      category: {
        products: [],
      },
    };

    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData() {
    if (this.props.category === 'all') {
      await client.query(GET_CATEGORIES).then((res: CategoriesState) => {
        this.setState({
          categories: res.data.categories,
          initCategory: this.props.category,
          category: {
            products: []
          },
        });
      })
      await Promise.all(this.state.categories.map((category) => {
        const categoryQuery = getCategoryItems(category.name);
        client.query(categoryQuery).then((res: CategoryItems) => {
          this.setState((prevState) => ({
            category: {
              products: [...prevState.category.products, ...res.data.category.products]
            },
          }));
        });
      }));
      return;
    }
    const categoryQuery = getCategoryItems(this.props.category);
    client.query(categoryQuery).then((res: CategoryItems) => {
      this.setState({
        category: res.data.category,
        initCategory: this.props.category,
      });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    if (this.state.initCategory !== this.props.category) {
      this.fetchData();
    }
  }

  render(): JSX.Element {
    return (
      <>
        <div className='content__title'>{this.props.category[0].toUpperCase() + this.props.category.slice(1)}</div>
        <div className='content__grid'>
          {this.state.category.products.map((prod) => <ItemCard product={prod} key={prod.id}/>)}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: CategoryStore) => ({
  category: state.category.value,
});

export default connect(mapStateToProps)(CategoryItemsGrid);
