import React from 'react';
import { connect } from 'react-redux';
import { client } from '../../../..';
import { CategoryStore } from '../../../../utility/generalInterfaces';
import { getCategoryItems } from '../../../../utility/queries/queries';
import { CategoryItems, CategoryItemsGridProps, CategoryItemsGridState } from './interface';
import ItemCard from './ItemsCard/ItemCard';
import './CategoryItemsGrid.css';

class CategoryItemsGrid extends React.Component<CategoryItemsGridProps, CategoryItemsGridState> {
  constructor(props: CategoryItemsGridProps) {
    super(props);

    this.state = {
      category: {
        products: [],
      },
    };

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
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
        <div className='content__title'>Category name</div>
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
