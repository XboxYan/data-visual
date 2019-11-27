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


const dataline = [
  {
      month: "Jan",
      city: "Tokyo",
      temperature: 7
  },
  {
      month: "Jan",
      city: "London",
      temperature: -3.9
  },
  {
      month: "Feb",
      city: "Tokyo",
      temperature: 6.9
  },
  {
      month: "Feb",
      city: "London",
      temperature: -4.2
  },
  {
      month: "Mar",
      city: "Tokyo",
      temperature: 9.5
  },
  {
      month: "Mar",
      city: "London",
      temperature: -5.7
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
  {"item":"Design","user":"a","score":70},
  {"item":"Design","user":"b","score":30},
  {"item":"Development","user":"a","score":60},
  {"item":"Development","user":"b","score":70},
  {"item":"Marketing","user":"a","score":50},
  {"item":"Marketing","user":"b","score":60},
  {"item":"Users","user":"a","score":40},
  {"item":"Users","user":"b","score":50},
  {"item":"Test","user":"a","score":60},
  {"item":"Test","user":"b","score":70},
  {"item":"Language","user":"a","score":70},
  {"item":"Language","user":"b","score":50},
  {"item":"Technology","user":"a","score":50},
  {"item":"Technology","user":"b","score":40},
]

const datapercent = {"item":"a","value":34,"total":100};



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
  			dataset:dataline
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
        dataset:datapie
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
        dataset:dataradar
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
                defautValue:'value',
                value:'value'
            },
            {
                name:'总量',
                defautValue:'total',
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

	const { theme,themeColor,props:{type,transpose,labelVisible,hollow} } = props;
  const color = theme==='dark'?'rgba(255, 255, 255, 1)':'rgba(31, 31, 31, 1)';

	return (
    <ChartBase {...props}>
        <Axis name="月均降雨量" grid={null} label={{textStyle:{fill:color}}} />
        <Axis name="月份" line={{stroke:color,opacity:.5}} tickLine={null} label={{textStyle:{fill:color}}} />
        <Geom
            type={type}
            position="月份*月均降雨量"
            shape={hollow?"hollowRect":"rect"}
            color={["name",themeColor]}
            style={{
                lineWidth: hollow?1:0
            }}
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

ChartBar.defaultProps = (theme)=>defaultProps.ChartBar(theme);

const ChartLine = React.memo((props) => {

	const { theme,themeColor,props:{lineShape,dotSize,dotVisible,lineSize,labelVisible,showArea} } = props;
  const color = theme==='dark'?'rgba(255, 255, 255, 1)':'rgba(31, 31, 31, 1)';

	return (
    <ChartBase {...props}>
        <Axis name="temperature" grid={null} label={{textStyle:{fill:color}}} />
        <Axis name="month" line={{stroke:color,opacity:.5}} tickLine={null} label={{textStyle:{fill:color}}} />
        <Geom
            type="line"
            position="month*temperature"
            size={lineSize}
            color={["city",themeColor]}
            shape={lineShape}
        />
        <Geom
            type="point"
            position="month*temperature"
            size={dotSize}
            color={["city",themeColor]}
            shape={["city"]}
            opacity={dotVisible?1:0}
        >
        {
            showArea &&
            <Geom type="area" position="month*temperature" color={['city',themeColor]} opacity={0.2} />
        }
        {
            labelVisible &&
            <Label content="temperature" offset={10} />
        }
        </Geom>
    </ChartBase>
	)
})

ChartLine.defaultProps = (theme)=>defaultProps.ChartLine(theme);

const ChartPie = React.memo((props) => {

  const { style:{width,height},theme,themeColor,props:{ring, rose, labelVisible,lebelPosition}, data:{dataset} } = props;
  const color = theme==='dark'?'rgba(255, 255, 255, 1)':'rgba(31, 31, 31, 1)';
  const total = dataset.reduce((a,b)=>a+b.count,0);
  
  const data =  dataset.map(el=>({
      ...el,
      percent:el.count/total
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
          position={rose?"item*percent":"percent"}
          color={["item",themeColor]}
          tooltip={[
              'item*percent',
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

  const { theme,themeColor,props:{axiShape} } = props;
  const color = theme==='dark'?'rgba(255, 255, 255, 1)':'rgba(31, 31, 31, 1)';

  const cols = {
      score: {
          min: 0,
          tickCount: 5,
      }
  };

  return (
    <ChartBase {...props} scale={cols}>
        <Axis
            name="item"
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
            name="score"
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
        <Geom type="area" position="item*score" color={["user",themeColor]} />
        <Geom type="line" position="item*score" color={["user",themeColor]} size={2} />
        <Geom
            type="point"
            position="item*score"
            color={["user",themeColor]}
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

  const { theme,themeColor,props:{percentColor,titleVisible,title=''}, data:{dataset} } = props;

  const color = theme==='dark'?'rgba(255,255,255,.2)':'rgba(0,0,0,.2)';

  const data = [dataset,{
      item:'other',
      value:dataset.total-dataset.value
  }]

  const percent = parseInt(dataset.value/dataset.total * 100,10);

  return (
    <ChartBase {...props} data={{dataset:data}}>
        <Geom
          type="intervalStack"
          position={"value"}
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