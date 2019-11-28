import React from 'react';
import View from '../view';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  Guide,
} from "bizcharts";


const databar = [
	{"type":"London","item":"Jan.","value":18.9},
	{"type":"London","item":"Feb.","value":28.8},
	{"type":"London","item":"Mar.","value":39.3},
	{"type":"London","item":"Apr.","value":81.4},
	{"type":"London","item":"May","value":47},
	{"type":"London","item":"Jun.","value":20.3},
	{"type":"London","item":"Jul.","value":24},
	{"type":"London","item":"Aug.","value":35.6},

	{"type":"Berlin","item":"Jan.","value":12.4},
	{"type":"Berlin","item":"Feb.","value":23.2},
	{"type":"Berlin","item":"Mar.","value":34.5},
	{"type":"Berlin","item":"Apr.","value":99.7},
	{"type":"Berlin","item":"May","value":52.6},
	{"type":"Berlin","item":"Jun.","value":35.5},
	{"type":"Berlin","item":"Jul.","value":37.4},
	{"type":"Berlin","item":"Aug.","value":42.4},

  {"type":"Beijin","item":"Jan.","value":12.4},
  {"type":"Beijin","item":"Feb.","value":23.2},
  {"type":"Beijin","item":"Mar.","value":34.5},
  {"type":"Beijin","item":"Apr.","value":99.7},
  {"type":"Beijin","item":"May","value":52.6},
  {"type":"Beijin","item":"Jun.","value":35.5},
  {"type":"Beijin","item":"Jul.","value":37.4},
  {"type":"Beijin","item":"Aug.","value":42.4}
];


const dataline = [
  {
      city: "Tokyo",
      month: "Jan",
      temperature: 7
  },
  {
      city: "London",
      month: "Jan",
      temperature: -3.9
  },
  {
      city: "Tokyo",
      month: "Feb",
      temperature: 6.9
  },
  {
      city: "London",
      month: "Feb",
      temperature: -4.2
  },
  {
      month: "Mar",
      city: "Tokyo",
      temperature: 9.5
  },
  {
      city: "London",
      month: "Mar",
      temperature: -5.7
  },
  {
      city: "Tokyo",
      month: "Apr",
      temperature: 14.5
  },
  {
      city: "London",
      month: "Apr",
      temperature: 8.5
  },
  {
      city: "Tokyo",
      month: "May",
      temperature: 18.4
  },
  {
      city: "London",
      month: "May",
      temperature: 11.9
  },
  {
      city: "Tokyo",
      month: "Jun",
      temperature: 21.5
  },
  {
      city: "London",
      month: "Jun",
      temperature: 15.2
  },
  {
      city: "Tokyo",
      month: "Jul",
      temperature: 25.2
  },
  {
      city: "London",
      month: "Jul",
      temperature: 17
  },
  {
      city: "Tokyo",
      month: "Aug",
      temperature: 26.5
  },
  {
      city: "London",
      month: "Aug",
      temperature: 16.6
  },
  {
      city: "Tokyo",
      month: "Sep",
      temperature: 23.3
  },
  {
      city: "London",
      month: "Sep",
      temperature: 14.2
  },
  {
      city: "Tokyo",
      month: "Oct",
      temperature: 18.3
  },
  {
      city: "London",
      month: "Oct",
      temperature: 10.3
  },
  {
      city: "Tokyo",
      month: "Nov",
      temperature: 13.9
  },
  {
      city: "London",
      month: "Nov",
      temperature: 6.6
  },
  {
      city: "Tokyo",
      month: "Dec",
      temperature: 9.6
  },
  {
      city: "London",
      month: "Dec",
      temperature: 4.8
  }
]

const datapie = [
    {
      item: "A",
      count: 10
    },
    {
      item: "B",
      count: 21
    },
    {
      item: "C",
      count: 17
    },
    {
      item: "D",
      count: 13
    },
    {
      item: "E",
      count: 39
    }
];

const dataradar = [
  {"type":"a","item":"Design","value":70},
  {"type":"a","item":"Development","value":60},
  {"type":"a","item":"Marketing","value":50},
  {"type":"a","item":"Users","value":40},
  {"type":"a","item":"Test","value":60},
  {"type":"a","item":"Language","value":70},

  {"type":"b","item":"Design","value":30},
  {"type":"b","item":"Development","value":70},
  {"type":"b","item":"Marketing","value":60},
  {"type":"b","item":"Users","value":50},
  {"type":"b","item":"Test","value":70},
  {"type":"b","item":"Language","value":50},
]

const datapercent = {"value":34,"total":100};



const defaultProps = {
	ChartBar:(theme)=>({
		atype:'chart',
		style:{
  			width: 400,
  			height: 250,
  			opacity: 1,
    },
    props:{
        legendVisible:true,
		    legendPosition: 'top-right',
				type:'intervalDodge',
        transpose:false,
        labelVisible:false,
        hollow:false
		},
		data:{
      dataType:'static',
			dataset:databar,
      dataDemo:[
          {"type":"London","item":"Jan.","value":18.9},
          {"type":"London","item":"Feb.","value":28.8},
      ],
      dataMap:[
          {
              name:'系列',
              key:'type',
              value:'type'
          },
          {
              name:'类别',
              key:'item',
              value:'item'
          },
          {
              name:'值',
              key:'value',
              value:'value'
          }
        ]
		}
	}),
	ChartLine:(theme)=>({
		atype:'chart',
		style:{
  			width: 400,
  			height: 250,
  			opacity: 1,
    },
    props:{
        legendVisible:true,
		    legendPosition: 'top-right',
        lineShape:'line',
        lineSize:2,
        dotSize:3,
        dotVisible:true,
        labelVisible:false,
    },
		data:{
        dataType:'static',
  			dataset:dataline,
        dataDemo:[
          {
              city: "Tokyo",
              month: "Jan",
              temperature: 7
          },
          {
              city: "London",
              month: "Jan",
              temperature: -3.9
          },
        ],
        dataMap:[
          {
                name:'系列',
                key:'type',
                value:'city'
            },
            {
                name:'类别',
                key:'item',
                value:'month'
            },
            {
                name:'值',
                key:'value',
                value:'temperature'
            }
        ]
      }
	}),
  ChartPie:(theme)=>({
    atype:'chart',
    style:{
        width: 400,
        height: 250,
        opacity: 1,
    },
    props:{
        legendVisible:false,
        legendPosition: 'right-top',
        labelVisible:true,
        ring:false,
        rose:false,
        lebelPosition:'outside'
    },
    data:{
        dataType:'static',
        dataset:datapie,
        dataDemo:[
          {
            item: "A",
            count: 10
          },
          {
            item: "B",
            count: 21
          }
      ],
      dataMap:[
          {
                name:'类别',
                key:'item',
                value:'item'
            },
            {
                name:'值',
                key:'value',
                value:'count'
            }
        ]
    }
  }),
  ChartRadar:(theme)=>({
    atype:'chart',
    style:{
        width: 400,
        height: 250,
        opacity: 1,
    },
    props:{
        legendVisible:true,
        legendPosition: 'top-right',
        axiShape:'polygon'
    },
    data:{
        dataType:'static',
        dataset:dataradar,
        dataDemo:[
          {"type":"a","item":"Design","value":70},
          {"type":"b","item":"Development","value":60},
        ],
        dataMap:[
            {
                name:'系列',
                key:'type',
                value:'type'
            },
            {
                name:'类别',
                key:'item',
                value:'item'
            },
            {
                name:'值',
                key:'value',
                value:'value'
            }
        ]
    }
  }),
  ChartPercent:(theme)=>({
    atype:'chart',
    style:{
        width: 200,
        height: 200,
        opacity: 1,
    },
    props:{
        lockRatio:true,
        percentColor:0,
        titleVisible:false,
        title:'百分比'
    },
    data:{
        dataType:'static',
        dataset:datapercent,
        dataDemo:{
          "value":34,
          "total":100
        },
        dataMap:[
            {
                name:'当前值',
                key:'value',
                value:'value'
            },
            {
                name:'总量',
                key:'total',
                value:'total'
            }
        ]
    }
  }),
}

const ChartBase = React.memo((props) => {

  const { theme, scale={}, style:{width,height},props:{legendVisible,legendPosition},data: {dataset},children } = props;
  const color = theme==='dark'?'rgba(255, 255, 255, 1)':'rgba(31, 31, 31, 1)';

  return (
    <View className="chart-view" {...props} >
      <Chart width={width} height={height} scale={scale} data={dataset} background={{fill:'transparent'}} plotBackground={{fill:'transparent'}} padding="auto" theme={theme}>
        <Legend visible={legendVisible} position={legendPosition} textStyle={{fill:color}} />
        <Tooltip />
        {
            children
        }
      </Chart>
    </View>
  )
})


const ChartBar = React.memo((props) => {

	const { theme,themeColor,props:{type,transpose,labelVisible,hollow},data:{dataMap} } = props;
  const color = theme==='dark'?'rgba(255, 255, 255, 1)':'rgba(31, 31, 31, 1)';

  const [{ value:name  },{ value:item},{ value:value}] = dataMap;

	return (
    <ChartBase {...props}>
        <Axis name={value} grid={null} label={{textStyle:{fill:color}}} />
        <Axis name={item} line={{stroke:color,opacity:.5}} tickLine={null} label={{textStyle:{fill:color}}} />
        <Geom
            type={type}
            position={`${item}*${value}`}
            shape={hollow?"hollowRect":"rect"}
            color={[name,themeColor]}
            style={{
                lineWidth: hollow?1:0
            }}
            //adjust={'stack'}
        >
          {
              labelVisible &&
              <Label content={value} offset={10} />
          }
        </Geom>
        <Coord transpose={transpose}/>
    </ChartBase>
	)
})

ChartBar.defaultProps = (theme)=>defaultProps.ChartBar(theme);

const ChartLine = React.memo((props) => {

	const { theme,themeColor,props:{lineShape,dotSize,dotVisible,lineSize,labelVisible,showArea},data:{dataMap} } = props;
  const color = theme==='dark'?'rgba(255, 255, 255, 1)':'rgba(31, 31, 31, 1)';

  const [{ value:type  },{ value:item},{ value:value}] = dataMap;

	return (
    <ChartBase {...props}>
        <Axis name={value} grid={null} label={{textStyle:{fill:color}}} />
        <Axis name={item} line={{stroke:color,opacity:.5}} tickLine={null} label={{textStyle:{fill:color}}} />
        <Geom
            type="line"
            position={`${item}*${value}`}
            size={lineSize}
            color={[type,themeColor]}
            shape={lineShape}
        />
        <Geom
            type="point"
            position={`${item}*${value}`}
            size={dotSize}
            color={[type,themeColor]}
            shape={[type]}
            opacity={dotVisible?1:0}
        >
        {
            showArea &&
            <Geom type="area" position={`${item}*${value}`} color={[type,themeColor]} opacity={0.2} />
        }
        {
            labelVisible &&
            <Label content={value} offset={10} />
        }
        </Geom>
    </ChartBase>
	)
})

ChartLine.defaultProps = (theme)=>defaultProps.ChartLine(theme);

const ChartPie = React.memo((props) => {

  const { style:{width,height},theme,themeColor,props:{ring, rose, labelVisible,lebelPosition}, data:{dataset,dataMap} } = props;
  const color = theme==='dark'?'rgba(255, 255, 255, 1)':'rgba(31, 31, 31, 1)';

  const [{ value:item},{ value:value}] = dataMap;

  const total = dataset.reduce((a,b)=>a+b[value],0);
  
  const data =  dataset.map(el=>({
      ...el,
      percent:el[value]/total
  }))

  const innerside = lebelPosition==='innerside'&&!ring&&!rose?{
      offset:-Math.min(width,height)*0.2+8,
      textStyle:{
          fill:'#fff',
          textAlign:'center'
      }
  }:{}

  return (
    <ChartBase {...props} data={{dataset:data}}>
        <Geom
          type="intervalStack"
          position={rose?`${item}*percent`:"percent"}
          color={[item,themeColor]}
          tooltip={[
              `${item}*percent`,
              (item, percent) => {
                percent = `${percent * 100}%`;
                return {
                  name: item,
                  value: percent,
                };
              },
          ]}
        >
            {
                labelVisible &&
                <Label
                    autoRotate={false}
                    content="percent"
                    labelLine={{lineWidth: 1}}
                    textStyle={{fill:color}}
                    {...innerside}
                    formatter={(val, item) => {
                        return (lebelPosition==='outside'||rose||ring?(item.point.item + ': '):'')+(val*100).toFixed(0) + '%';
                    }}
                />
            }
        </Geom>
        <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Coord type={rose?"polar":"theta"} radius={rose?1:0.8} innerRadius={ring?(rose?0.2:0.7):0} />
    </ChartBase>
  )
})

ChartPie.defaultProps = (theme)=>defaultProps.ChartPie(theme);

const ChartRadar = React.memo((props) => {

  const { theme,themeColor,props:{axiShape},data:{dataMap} } = props;
  const color = theme==='dark'?'rgba(255, 255, 255, 1)':'rgba(31, 31, 31, 1)';

  const [{ value:type  },{ value:item},{ value:value}] = dataMap;

  const cols = {
      [value]: {
          min: 0,
          tickCount: 5,
      }
  };

  return (
    <ChartBase {...props} scale={cols}>
        <Axis
            name={item}
            line={null}
            tickLine={null}
            label={{textStyle:{fill:color}}}
            grid={{
              lineStyle: {
                lineDash: null,
                stroke:color,
                strokeOpacity:.3
              },
              hideFirstLine: false
            }}
        />
        <Axis
            name={value}
            line={null}
            tickLine={null}
            label={null}
            grid={{
              type: axiShape,
              lineStyle: {
                lineDash: null,
                stroke:color,
                strokeOpacity:.3
              },
              alternateColor: "rgba(0, 0, 0, 0.1)",
            }}
        />
        <Geom type="area" position={`${item}*${value}`} color={[type,themeColor]} />
        <Geom type="line" position={`${item}*${value}`} color={[type,themeColor]} size={2} />
        <Geom
            type="point"
            position={`${item}*${value}`}
            color={[type,themeColor]}
            shape="circle"
            size={3}
            style={{
              stroke: "#fff",
              lineWidth: 1,
            }}
        />
        <Coord type={"polar"} radius={0.8} />
    </ChartBase>
  )
})

ChartRadar.defaultProps = (theme)=>defaultProps.ChartRadar(theme);

const ChartPercent = React.memo((props) => {

  const { theme,themeColor,props:{percentColor,titleVisible,title=''}, data:{dataset,dataMap} } = props;

  const color = theme==='dark'?'rgba(255,255,255,.2)':'rgba(0,0,0,.2)';

  const [{ value:value  },{ value:total}] = dataMap;

  const data = [{...dataset,item:'current'},{
      item:'other',
      [value]:dataset[total]-dataset[value]
  }]

  const percent = parseInt(dataset[value]/dataset[total] * 100,10);

  return (
    <ChartBase {...props} data={{dataset:data}}>
        <Geom
          type="intervalStack"
          position={value}
          color={["item",[themeColor[percentColor],color]]}
        />
        <Coord type={"theta"} radius={0.8} innerRadius={0.7} />
        <Legend name="item" visible={false} />
        <Tooltip triggerOn="none"/>
        <Guide>
            <Guide.Html
                position={["50%", "50%"]}
                html={`<div style="text-align: center;font-size:${12}px;color:${theme==='dark'?'rgba(255, 255, 255, 1)':'rgba(31, 31, 31, 1)'}"><div style="font-size:1em">${titleVisible?title:''}</div><span style="font-size:1.5em">${percent}%</span></div>`}
                alignY="middle"
            />
        </Guide>
    </ChartBase>
  )
})

ChartPercent.defaultProps = (theme)=>defaultProps.ChartPercent(theme);

export { ChartBar, ChartLine, ChartPie, ChartRadar, ChartPercent };