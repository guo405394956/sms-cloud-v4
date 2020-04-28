import { Bar } from 'ant-design-pro/lib/Charts';
import React, { Component } from 'react';
import autoHeight from '../../../../components/Charts/autoHeight';

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
  
export interface PieProps {
  
}
interface PieState {
  
}
class BarMessage extends Component<PieProps, PieState> {
  componentDidMount() {
   
  }
  render() {   
    return (
      <div>
        <Bar   
          color="#9cabff"
          {...this.props}
          data={salesData}
        />
      </div>
    );
  }
}

export default autoHeight()(BarMessage);
