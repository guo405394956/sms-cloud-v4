import { Pie } from 'ant-design-pro/lib/Charts';
import React, { Component } from 'react';
import autoHeight from '../autoHeight';

const salesPieData = [
    {
      x: '成功数',
      y: 91881,
    },
    {
      x: '失败数',
      y: 133919,
    },
    {
      x: '未知',
      y: 21456,
    }
  ];
  
export interface PieProps {
  
}
interface PieState {
  
}
class PieMc extends Component<PieProps, PieState> {
  componentDidMount() {
   
  }
  render() {   
    return (
      <div>
        <Pie   
          {...this.props}
          data={salesPieData}
          valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
        />
      </div>
    );
  }
}

export default autoHeight()(PieMc);
