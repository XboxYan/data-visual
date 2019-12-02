import React, { useState, useEffect, useCallback} from 'react';
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
import DataSet from '@antv/data-set';
import china from '../../map/china.js'




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

const datamap = [
      { key: '10105', name: '广东', value: 0.1138 },
      { key: '10125', name: '四川', value: 0.0899 },
      { key: '10102', name: '安徽', value: 0.0695 },
      { key: '10130', name: '浙江', value: 0.0525 },
      { key: '10112', name: '湖北', value: 0.0505 },
      { key: '10124', name: '上海', value: 0.0495 },
      { key: '10103', name: '福建', value: 0.0484 },
      { key: '10131', name: '重庆', value: 0.0419 },
      { key: '10115', name: '江苏', value: 0.0402 },
      { key: '10123', name: '陕西', value: 0.0388 },
      { key: '10121', name: '山东', value: 0.0387 },
      { key: '10109', name: '河北', value: 0.0359 },
      { key: '10116', name: '江西', value: 0.0315 },
      { key: '10113', name: '湖南', value: 0.0304 },
      { key: '10129', name: '云南', value: 0.0294 },
      { key: '10101', name: '北京', value: 0.0246 },
      { key: '10104', name: '甘肃', value: 0.0232 },
      { key: '10114', name: '吉林', value: 0.0229 },
      { key: '10107', name: '贵州', value: 0.0223 },
      { key: '10106', name: '广西', value: 0.022 },
      { key: '10110', name: '河南', value: 0.019 },
      { key: '10117', name: '辽宁', value: 0.0152 },
      { key: '10118', name: '内蒙古', value: 0.0142 },
      { key: '10128', name: '新疆', value: 0.0142 },
      { key: '10111', name: '黑龙江', value: 0.014 },
      { key: '10126', name: '天津', value: 0.0122 },
      { key: '10122', name: '山西', value: 0.0103 },
      { key: '10108', name: '海南', value: 0.0098 },
      { key: '10119', name: '宁夏', value: 0.008 },
      { key: '10120', name: '青海', value: 0.0052 },
      { key: '10127', name: '西藏', value: 0.002 },
    ]


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
    },

  }),
  ChartMap:(theme)=>({
    atype:'chart',
    style:{
        width: 400,
        height: 400,
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
        dataset:datamap,
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
    },
    
  }),
}

const ChartBase = React.memo((props) => {

  const { theme, scale={},padding="auto", style:{width,height},props:{legendVisible,legendPosition},data: {dataset},children } = props;
  const color = theme==='dark'?'rgba(255, 255, 255, 1)':'rgba(31, 31, 31, 1)';

  return (
    <View className="chart-view" {...props} >
      <Chart width={width} height={height} scale={scale} data={dataset} background={{fill:'transparent'}} plotBackground={{fill:'transparent'}} padding={padding} theme={theme}>
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

  const [dataPie,setDataPie]=useState([]);

  useEffect(()=>{
      const total = dataset.reduce((a,b)=>a+b[value],0);
      const data = dataset.map(el=>({
          ...el,
          percent:el[value]/total
      }))
      setDataPie(data);
  },[dataset])

  const innerside = lebelPosition==='innerside'&&!ring&&!rose?{
      offset:-Math.min(width,height)*0.2+8,
      textStyle:{
          fill:'#fff',
          textAlign:'center'
      }
  }:{}

  const fn = useCallback((name, value) => (item, percent) => {
    percent = `${percent * 100}%`;
    return {
      name: item,
      value: percent,
    };
  },[])

  const formatter = useCallback((val, item) => {
      return (lebelPosition==='outside'||rose||ring?(item.point.item + ': '):'')+(val*100).toFixed(0) + '%';
  },[lebelPosition])

  return (
    <ChartBase {...props} data={{dataset:dataPie}}>
        <Geom
          type="intervalStack"
          position={rose?`${item}*percent`:"percent"}
          color={[item,themeColor]}
          tooltip={[
              `${item}*percent`,
              fn,
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
                    formatter={formatter}
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

  const [dataPer,setDataPer]=useState([]);

  useEffect(()=>{
      const data = [{...dataset,item:'current'},{
          item:'other',
          [value]:dataset[total]-dataset[value]
      }]
      setDataPer(data);
  },[dataset])

  const percent = parseInt(dataset[value]/dataset[total] * 100,10);

  return (
    <ChartBase {...props} data={{dataset:dataPer}}>
        <Geom
          type="intervalStack"
          position={value}
          color={["item",[themeColor[percentColor],color]]}
        />
        <Coord type={"theta"} radius={0.8} innerRadius={0.7} />
        <Legend name="item" visible={false} />
        <Tooltip showTitle={false} triggerOn="none"/>
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

const ChartMap = React.memo((props) => {

  const { theme,themeColor,props:{axiShape},data:{dataMap,dataset}} = props;
  const color = theme==='dark'?'rgba(255, 255, 255, 1)':'rgba(31, 31, 31, 1)';
  const [geoDv,setGeoDev]=useState([]);

  //const [{ value:type  },{ value:item},{ value:value}] = dataMap;

  const scale = {
      latitude: {
        sync: true,
        nice: false,
      },
      longitude: {
        sync: true,
        nice: false,
      },
  };

  const fn = useCallback((name, value) => ({
    name,
    value,
  }),[])

  useEffect(()=>{
      const { features } = china;
      features.forEach((one) => {
        const name = one && one.properties && one.properties.name;
        dataset.forEach((item) => {
          if (name.includes(item.name)) {
            one.value = item.value;
          }
        });
      });
      const geo = new DataSet.View().source(china, { type: 'GeoJSON' });
      setGeoDev(geo);
  },[dataset])


  return (
    <ChartBase {...props} scale={scale} data={{dataset:geoDv}} padding={20}>
        <Geom
          type="polygon"
          position="longitude*latitude"
          color={['value', [themeColor[0],themeColor[1]]]}
          style={{
            fill:'red',
            stroke: '#f1f1f1',
            lineWidth: 0.5,
            fillOpacity: 0.85,
          }}
          tooltip={[
              'name*value',
              fn,
            ]}
        />
        <Tooltip showTitle={false} />
        <Legend position="bottom-left" name="value" sizeType="normal" offsetY={-60} textStyle={{fill:color,stroke:'transparent'}} />
    </ChartBase>
  )
})

ChartMap.defaultProps = (theme)=>defaultProps.ChartMap(theme);


export { ChartBar, ChartLine, ChartPie, ChartRadar, ChartPercent, ChartMap };