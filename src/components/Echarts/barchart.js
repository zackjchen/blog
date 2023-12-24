import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';


const BarChart = (params) => {
    const barchart = useRef(null)
    console.log(params);
    useEffect(()=>{
        // 1.需要一个dom节点渲染
        // const chartDom = document.getElementById('barchart');
        const chartDom = barchart.current // 用ref替换原生dom操作
        // 2.初始化图表对象
        const myChart = echarts.init(chartDom);

        // 3.图表参数
        const option = {
            title:{
                text: params.title
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
                }
            ]
        };
        option && myChart.setOption(option);

        },
        [params.title]
    )
    return (
        <div id="barchart" ref={barchart} style={{width:'500px',height:"400px"}}></div>
    )
}

export default BarChart