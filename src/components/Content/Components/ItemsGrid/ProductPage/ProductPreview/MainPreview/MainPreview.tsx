import React from 'react';
import { MainPreviewProps } from './interface';

export class MainPreview extends React.Component<MainPreviewProps> {
  render(): JSX.Element {
    return (
      <>
        <div className='product__preview-main'>
          <img
            alt='big-preview'
            className='product__preview-main__image'
            onError={(e: any) => {
            e.target.onerror = null;
            e.target.style = 'display: none';
          }}
          src={this.props?.mainPreview}
          />
        </div>
      </>
    );
  }
}
