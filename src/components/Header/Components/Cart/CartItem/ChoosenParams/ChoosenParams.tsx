import React from 'react';
import { ChoosenParamsListProps, ChoosenParamsListState } from './interface';

export class ChoosenParamsList extends React.Component<ChoosenParamsListProps, ChoosenParamsListState> {
  render(): JSX.Element {
    return (
      <div className='header__cart-list__params-choosen'>
        {this.props.attributes.map((item) => (
          <div className="header__cart-list__params-element" key={item.id}
            style={{
              backgroundColor: `${item.type === 'swatch' ? item.items[0].value : 'none'}`,
              border: `${item.type === 'swatch' ? '1px solid #000' : ''}`,
              color: `${item.items[0].value}`,
            }}>
            {item.name} {item.type === 'swatch' ? '' : item.items[0].value}
          </div>
        ))
        }
      </div>
    );
  }
}
