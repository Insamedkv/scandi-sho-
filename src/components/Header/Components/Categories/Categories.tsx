import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { client } from '../../../..';
import { CategoryStore } from '../../../../utility/generalInterfaces';
import { GET_CATEGORIES } from '../../../../utility/queries/queries';
import { changeCategory } from '../../../../store/slice/categorySlice';
import { CategoriesProps, CategoriesState } from './interface';
import './Categories.css';

class Categories extends React.Component<CategoriesProps, CategoriesState> {
  constructor(props: CategoriesProps) {
    super(props);

    this.state = {
      data: {
        categories: [],
      },
      loading: true,
    };
  }

  componentDidMount(): void {
    client.query(GET_CATEGORIES).then((res: CategoriesState) => {
      this.setState({
        data: res.data,
        loading: res.loading,
      });
    });
  }

  render(): JSX.Element {
    return (
      <nav className='header__categories'>
        <Link to={`/all`}
            key={'all'}
            onClick={() => this.props.changeCategory('all')}
            className={`header__categories-link ${this.props.category === 'all' ? 'underline' : ''}`}>
            {'ALL'}
          </Link>
        {this.state.data.categories.map((el) => (
          <Link to={`/${el.name}`}
            key={el.name}
            onClick={() => this.props.changeCategory(el.name)}
            className={`header__categories-link ${this.props.category === el.name.toLowerCase() ? 'underline' : ''}`}>
            {el.name}
          </Link>
        ))}
      </nav>);
  }
}

const mapStateToProps = (state: CategoryStore) => ({
  category: state.category.value,
});

const mapDispatchToProps = { changeCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
