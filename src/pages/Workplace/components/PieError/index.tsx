import { Pie } from 'ant-design-pro/lib/Charts';
import React, { Component } from 'react';
import autoHeight from '../../../../components/Charts/autoHeight';

const salesTypeData = [
  {
    x: '运营商故障',
    y: 4544,
  },
  {
    x: '手机端接受故障',
    y: 3321,
  },
  {
    x: '黑名单',
    y: 3113,
  },
  {
    x: '未知故障',
    y: 2341,
  }
];
  
export interface PieProps {
  
}
interface PieState {
  
}
class PieError extends Component<PieProps, PieState> {
  componentDidMount() {
   
  }
  render() {   
    return (
      <div>
        <Pie   
          color="rgba(156, 171, 255, 0.85)"
          {...this.props}
          data={salesTypeData}
        />
      </div>
    );
  }
}

export default autoHeight()(PieError);
