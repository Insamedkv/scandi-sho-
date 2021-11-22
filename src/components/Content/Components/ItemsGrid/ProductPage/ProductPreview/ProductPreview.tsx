import React from 'react';
import { ProductPreviewProps, ProductPreviewState } from './interface';
import { LittlePreviews } from './LittlePreview/LittlePreviews';
import { MainPreview } from './MainPreview/MainPreview';
import './ProductPreview.css';

export class ProductPreview extends React.Component<ProductPreviewProps, ProductPreviewState> {
  constructor(props: ProductPreviewProps) {
    super(props);

    this.state = {
      currentMainPicture: props.gallery[0],
    };

    this.switchProductPreview = this.switchProductPreview.bind(this);
  }

  switchProductPreview(newMainPreview: string): void {
    this.setState({
      currentMainPicture: newMainPreview,
    });
  }

  render(): JSX.Element {
    return (
      <div className={`product__preview ${this.props.inStock ? '' : 'product__preview-out'}`}>
        <LittlePreviews gallery={this.props.gallery} switchProductPreview={this.switchProductPreview}/>
        <MainPreview mainPreview={this.state.currentMainPicture} />
      </div>
    );
  }
}
