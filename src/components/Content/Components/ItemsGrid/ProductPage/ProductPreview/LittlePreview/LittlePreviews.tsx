import React from 'react';
import { LittlePreviewProps } from './interface';

export class LittlePreviews extends React.Component<LittlePreviewProps> {
  render(): JSX.Element {
    return (
      <>
        <div className='product__preview-little'>
          {this.props.gallery?.map((image) => (
            <img className='product__preview-little__image'
              onClick={() => this.props.switchProductPreview(image)}
              src={image}
              key={image}
              alt='product-little-preview'
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = 'none';
              }}/>
          ))}
        </div>
      </>
    );
  }
}
