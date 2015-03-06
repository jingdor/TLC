requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/application',
    paths: {
        app: 'app',
        jquery:'bower_components/jquery/dist/jquery',
        echarts:'bower_components/echarts/build/dist/echarts-all',
        underscore:'bower_components/underscore/underscore',
        lodash:'bower_components/lodash/lodash'
    }
});
requirejs(["jquery",'underscore','lodash','echarts'], function($,_,lodash) {

	var Chart1 = echarts.init(document.getElementById('chart1'));
	var Chart2 = echarts.init(document.getElementById('chart2'));		
	$data=$.get('https://data.sparkfun.com/output/roEl68gjprC4NpV3RzRn.json',function(response){
		xAxis_date=["0"];
		series_data=[];
		legend_date=[];
			option = {
				title : {
			        text: '温度变化',
			        subtext: '温度变化信息'
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:legend_date
			    },

			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : xAxis_date
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel : {
			                formatter: '{value} °C'
			            }
			        }
			    ],
			    series :[
				   {
				   		name: '481',
				   		type:'line',
				   		data:[0]
				   }, 
				   {
				   		name: '124',
				   		type:'line',
				   		data:[0]
				   },
				   {
				   		name: '487',
				   		type:'line',
				   		data:[0]
				   },
				   {
				   		name: '483',
				   		type:'line',
				   		data:[0]
				   },
				   {
				   		name: '484',
				   		type:'line',
				   		data:[0]
				   },
				   {
				   		name: '230',
				   		type:'line',
				   		data:[0]
				   },
				   ,
				   {
				   		name: '485',
				   		type:'line',
				   		data:[0]
				   },
				   ,
				   {
				   		name: '3912',
				   		type:'line',
				   		data:[0]
				   },
				   ,
				   {
				   		name: '486',
				   		type:'line',
				   		data:[0]
				   },
				   {
				   		name: '482',
				   		type:'line',
				   		data:[0]
				   }
			    ]
			};
			Chart1.setOption(option);

			// option.xAxis[0].data.push('aa');
			// 	Chart1.setOption(option);
			for (var i = response.length - 1; i >= 0; i--) {

				option.xAxis[0].data.push(response[i].timestamp);
				console.log(option.series);

				temp=response[i].temperature.split(';');
				temp.pop();
				for (var j = temp.length - 1; j >= 0; j--) {
					console.log(temp);
					ibeacon=temp[j].split(',');
					
					//添加到标题

					option.legend.data.push(ibeacon[0])
					option.legend.data=_.uniq(option.legend.data);


					
					a= lodash.find(option.series, function(n) {
				  			return n.name ==  ibeacon[0];

					});
					index=$.inArray(a,option.series);
					
					if(index>0){

			
						option.series[index].data.push(parseInt(ibeacon[1]));	
					// }else{
					// 	option.series.push(ibeacon[1]);
					}else{
						option.series.push({
							name:ibeacon[0],
							type:'line',
							data:[ibeacon[1]]
						});

					}
					// console.log(ibeacon[0],index);


					// console.log(option.series)

					// return 
				};
				
				// lodash.filter(option.series, function(n) {
				//   return name %  == 0;
				// });
				Chart1.setOption(option);
			};


			console.log(option)

			Chart2.setOption(option);
	},'json');

	


});