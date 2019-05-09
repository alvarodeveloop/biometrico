import React from 'react';
import PropTypes from 'prop-types'

import {
  PieChart, Pie, Legend, Tooltip,
   AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';

const Chart = ({type,data,color,title}) => {

  if(type === 'pie'){
    return (
      <div>
        <h4>{title}</h4>
        <br/>
        {data.length > 0 ? (
          <PieChart width={400} height={300}>
            <Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} fill={color} label />
            <Tooltip />
          </PieChart>
        ) : (
          <p className="alert alert-danger text-center" style={{marginTop:'100px'}}>Sin Registros</p>
        )}

      </div>
    );
  }else if(type === 'area'){
    return(
      <div>
        <h4>{title}</h4>
        <br/>
        <AreaChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 40, right: 30, left: 0, bottom: 0,
          }}>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill={color} />
        </AreaChart>
      </div>
    )
  }

}

Chart.propTypes = {
  data: PropTypes.array,
  color: PropTypes.string,
  type:  PropTypes.string,
  title:  PropTypes.string,
}

export default Chart
