import React, { useState, useRef, useEffect, useReducer } from 'react';
import { Icon,message } from 'antd';
import View from '../view';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
const { Global,Theme  } = G2;
console.log(Theme)
//import './index.css';
//
// const { Global } = G2; // 获取 Global 全局对象
// const DarkTheme = Util.deepMix({}, BasicTheme, {

// })
//Global.setTheme('dark');
console.log(112)
const data = [
      {
        State: "WY",
        小于5岁: 25635,
        "5至13岁": 1890,
        "14至17岁": 9314
      },
      {
        State: "DC",
        小于5岁: 30352,
        "5至13岁": 20439,
        "14至17岁": 10225
      },
      {
        State: "VT",
        小于5岁: 38253,
        "5至13岁": 42538,
        "14至17岁": 15757
      },
      {
        State: "ND",
        小于5岁: 51896,
        "5至13岁": 67358,
        "14至17岁": 18794
      },
      {
        State: "AK",
        小于5岁: 72083,
        "5至13岁": 85640,
        "14至17岁": 22153
      }
    ]

const databar = [
	{"name":"London","月份":"Jan.","月均降雨量":18.9},
	{"name":"London","月份":"Feb.","月均降雨量":28.8},
	{"name":"London","月份":"Mar.","月均降雨量":39.3},
	{"name":"London","月份":"Apr.","月均降雨量":81.4},
	{"name":"London","月份":"May","月均降雨量":47},
	{"name":"London","月份":"Jun.","月均降雨量":20.3},
	{"name":"London","月份":"Jul.","月均降雨量":24},
	{"name":"London","月份":"Aug.","月均降雨量":35.6},

	{"name":"Berlin","月份":"Jan.","月均降雨量":12.4},
	{"name":"Berlin","月份":"Feb.","月均降雨量":23.2},
	{"name":"Berlin","月份":"Mar.","月均降雨量":34.5},
	{"name":"Berlin","月份":"Apr.","月均降雨量":99.7},
	{"name":"Berlin","月份":"May","月均降雨量":52.6},
	{"name":"Berlin","月份":"Jun.","月均降雨量":35.5},
	{"name":"Berlin","月份":"Jul.","月均降雨量":37.4},
	{"name":"Berlin","月份":"Aug.","月均降雨量":42.4},

  {"name":"Beijin","月份":"Jan.","月均降雨量":12.4},
  {"name":"Beijin","月份":"Feb.","月均降雨量":23.2},
  {"name":"Beijin","月份":"Mar.","月均降雨量":34.5},
  {"name":"Beijin","月份":"Apr.","月均降雨量":99.7},
  {"name":"Beijin","月份":"May","月均降雨量":52.6},
  {"name":"Beijin","月份":"Jun.","月均降雨量":35.5},
  {"name":"Beijin","月份":"Jul.","月均降雨量":37.4},
  {"name":"Beijin","月份":"Aug.","月均降雨量":42.4}
];

const dataline1 = [
  {
    name:"Tokyo",
    data:{
      x:["Jan"],
      y:[7]
    }
  },
  {
    name:"Berlin",
    data:{
      x:["Jan"],
      y:[7]
    }
  }
]

const dataline = [
  {
      month: "Jan",
      city: "Tokyo",
      temperature: 7
  },
  {
      month: "Jan",
      city: "London",
      temperature: 3.9
  },
  {
      month: "Feb",
      city: "Tokyo",
      temperature: 6.9
  },
  {
      month: "Feb",
      city: "London",
      temperature: 4.2
  },
  {
      month: "Mar",
      city: "Tokyo",
      temperature: 9.5
  },
  {
      month: "Mar",
      city: "London",
      temperature: 5.7
  },
  {
      month: "Apr",
      city: "Tokyo",
      temperature: 14.5
  },
  {
      month: "Apr",
      city: "London",
      temperature: 8.5
  },
  {
      month: "May",
      city: "Tokyo",
      temperature: 18.4
  },
  {
      month: "May",
      city: "London",
      temperature: 11.9
  },
  {
      month: "Jun",
      city: "Tokyo",
      temperature: 21.5
  },
  {
      month: "Jun",
      city: "London",
      temperature: 15.2
  },
  {
      month: "Jul",
      city: "Tokyo",
      temperature: 25.2
  },
  {
      month: "Jul",
      city: "London",
      temperature: 17
  },
  {
      month: "Aug",
      city: "Tokyo",
      temperature: 26.5
  },
  {
      month: "Aug",
      city: "London",
      temperature: 16.6
  },
  {
      month: "Sep",
      city: "Tokyo",
      temperature: 23.3
  },
  {
      month: "Sep",
      city: "London",
      temperature: 14.2
  },
  {
      month: "Oct",
      city: "Tokyo",
      temperature: 18.3
  },
  {
      month: "Oct",
      city: "London",
      temperature: 10.3
  },
  {
      month: "Nov",
      city: "Tokyo",
      temperature: 13.9
  },
  {
      month: "Nov",
      city: "London",
      temperature: 6.6
  },
  {
      month: "Dec",
      city: "Tokyo",
      temperature: 9.6
  },
  {
      month: "Dec",
      city: "London",
      temperature: 4.8
  }
]


const defaultProps = {
	ChartBar:{
		atype:'chart',
		style:{
			width: 400,
			height: 250,
			opacity: 1,
			legendPosition: 'top-right'
		},
		props:{
				type:'intervalDodge',
        transpose:false,
        labelVisible:false,
		},
		data:{
			source:databar,

		}
	},
	ChartLine:{
		atype:'chart',
		style:{
			width: 400,
			height: 250,
			opacity: 1,
			legendPosition: 'top-right'
		},
		props:{
        reflect:false,
        lineShape:'line',
        lineSize:2,
        dotSize:3,
        dotVisible:true,
        labelVisible:false,
    },
		data:{
			source:dataline
		}
	},
}

const ChartBase = React.memo((props) => {

  const { style:{width,height,legendPosition},data: {source},children } = props;

  return (
    <View className="chart-view" {...props} >
      <Chart width={width} height={height} data={source} padding="auto" >
        <Legend position={legendPosition} />
        <Axis />
        <Tooltip />
        {
            children
        }
      </Chart>
    </View>
  )
})


const ChartBar = React.memo((props) => {

	const { props:{type,transpose,labelVisible} } = props;

	return (
    <ChartBase {...props}>
        <Geom
            type={type}
            position="月份*月均降雨量"
            color={["name"]}
            //adjust={'stack'}
        >
          {
              labelVisible &&
              <Label content="月均降雨量" offset={10} />
          }
        </Geom>
        <Coord transpose={transpose}/>
    </ChartBase>
	)
})

ChartBar.defaultProps = defaultProps.ChartBar;

const ChartLine = React.memo((props) => {

	const { props:{lineShape,dotSize,dotVisible,lineSize,labelVisible} } = props;

	return (
    <ChartBase {...props}>
        <Geom
          type="line"
          position="month*temperature"
          size={lineSize}
          color={["city"]}
          shape={lineShape}
        />
        <Geom
          type="point"
          position="month*temperature"
          size={dotSize}
          color={["city"]}
          shape={["city"]}
          opacity={dotVisible?1:0}
        >
          {
              labelVisible &&
              <Label content="temperature" offset={10} />
          }
        </Geom>
    </ChartBase>
	)
})

ChartLine.defaultProps = defaultProps.ChartLine;

export { ChartBar, ChartLine };