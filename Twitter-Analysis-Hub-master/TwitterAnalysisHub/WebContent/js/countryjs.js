/* CODE FOR ZONAL */
var countryList= [];
var sentimentList = [];
var countryTweetList = [];
var colorList = [];  
var crequest;

function sendCountry(){
	var brand = document.searchCountry.brandCountry.value;
	if (brand==null || brand=='')
		errorSnackBar('Enter a Brand or Product Name to Analyze');
	else {
		var progress="<div class='progress' style='width:600px;margin:auto'><div class='indeterminate'></div></div>";
		document.getElementById('countryCharts').innerHTML=progress;
		//document.searchCountry.brandCountry.disabled = true;
		var country = document.searchCountry.countryName.value;
		document.searchCountry.brandCountry.disabled = true;
		document.searchCountry.countryName.disabled = true;
		document.searchCountry.countryAnalyze.disabled = true;
		countryList.push(brand+","+country);
		var url="CountryAnalysis?brandName="+encodeURIComponent(brand)+"&countryName="+encodeURIComponent(country);  
		  
		if(window.XMLHttpRequest){  
			crequest=new XMLHttpRequest();  
		}  
		else if(window.ActiveXObject){  
			crequest=new ActiveXObject("Microsoft.XMLHTTP");  
		}  
		  
		try  
		{  
			crequest.onreadystatechange=getCountry;  
			crequest.open("GET",url,true);  
			crequest.send();  
		}  
		catch(e)  
		{  
			alert("Unable to connect to server");  
		}  
	}
}
function getCountry()
{
	if(crequest.readyState==4){
		document.searchCountry.brandCountry.disabled = false;
		document.searchCountry.countryName.disabled = false;
		document.searchCountry.countryAnalyze.disabled = false;
		var arr = [];
		var val=crequest.responseText; 
		var rows = val.split("<br>");
		var i,value,sum=0;
		for(i=0;i<rows.length-1;i++){
			value = parseFloat(rows[i]);
			sum+=value;
			arr.push(value);
		}
		countryTweetList.push(arr);
		sentimentList.push(sum);
		color = 'rgb('+Math.floor(255*Math.random())+','+Math.floor(255*Math.random())+','+Math.floor(255*Math.random())+')';
		var allcharts = "<div id='countryChartHolder' class='mdl-cell mdl-cell--4-col' style='text-align:center;box-shadow: 1px 1px 1px 1px #D1D3D5;border:1px solid #D1D3D5'><canvas id='countryChart' width='400px' height='400px' style='margin:auto'></canvas></div><div id='countryTweetHolder' class='mdl-cell mdl-cell--8-col' style='text-align:center;box-shadow: 1px 1px 1px 1px #D1D3D5;border:1px solid #D1D3D5'><canvas id='countryTweets' width='400px' height='400px' style='margin:auto'></canvas></div>";
		var charts = document.getElementById("countryCharts");
		charts.innerHTML = allcharts;
		colorList.push(color);
		countryPlot();
		countryTweetPlot();
		document.getElementById('countryCharts').scrollIntoView();
	}
}
function countryPlot(){
	document.getElementById("countryChart").remove();
	document.getElementById('countryChartHolder').innerHTML="<canvas id='countryChart' width='400' height='400' style='margin:auto'>";
	var ctx = document.getElementById("countryChart");
	var myChart = new Chart(ctx, {
	    type: 'horizontalBar',
	    data: {
	        labels: countryList,
	        datasets: [{
	        	label: 'Rating Plot',
	            data: sentimentList,
	            backgroundColor: colorList,
	            borderColor:colorList,
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	responsive:false,
	        scales: {
	            xAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});

}

function countryTweetPlot(){
	document.getElementById("countryTweets").remove();
	document.getElementById('countryTweetHolder').innerHTML="<canvas id='countryTweets' width='750px' height='400' style='margin:auto'>";
	var ctx = document.getElementById("countryTweets");
	var i;
	var set = [];
	var lbls = [];
	for(i=0;i<countryTweetList[countryList.length-1].length;i++){
		lbls.push(i+1);
	}
	for(i=0;i<countryList.length;i++){
		setObj = {
			label: countryList[i],
			borderColor: colorList[i],
            data: countryTweetList[i],
            borderWidth: 1
		}
		set.push(setObj);
	}
	var chart = new Chart(ctx, {	    
		type: 'line',
	    data: {
	        labels: lbls,
	        datasets: set
	    },

	    // Configuration options go here
	    options: {
	    	responsive:false,
	    }
	});
}
