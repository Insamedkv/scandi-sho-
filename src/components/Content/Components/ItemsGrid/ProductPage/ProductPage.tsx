import React from 'react';
import { client } from '../../../../..';
import { Product } from '../../../../../utility/generalInterfaces';
import { getCategoryItemById } from '../../../../../utility/queries/queries';
import { ProductPageProps, ProductPageState } from './interface';
import ProductDescription from './ProductDescription/ProductDescription';
import { ProductPreview } from './ProductPreview/ProductPreview';
import './ProductPage.css';

export class ProductPage extends React.Component<ProductPageProps, ProductPageState> {
  constructor(props: ProductPageProps) {
    super(props);

    this.fetchProductData = this.fetchProductData.bind(this);
  }

  fetchProductData(): void {
    const itemQuery = getCategoryItemById(this.props.matchParams.id);
    client.query(itemQuery).then((res: Product) => {
      this.setState({
        product: res.data.product,
        gallery: res.data.product.gallery,
      });
    });
  }

  componentDidMount(): void {
    this.fetchProductData();
  }

  render(): JSX.Element {
    return (this.state?.gallery || null) && (
      <div className='product__page-grid'>
        <ProductPreview gallery={this.state.gallery} inStock={this.state.product.inStock}/>
        <ProductDescription values={this.state.product} key={this.state.product.id}/>
      </div>
    );
  }
}
