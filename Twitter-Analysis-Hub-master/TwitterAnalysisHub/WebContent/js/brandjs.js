/* CODE FOR BRAND */
var request;

function errorSnackBar(error) 
{
	'use strict';
	var snackbarContainer = document.querySelector('#error_snackbar');
	var showToastButton = document.querySelector('#demo-show-toast');
	'use strict';
	  var data = {
		      message: error,
		      timeout: 2000,
		      actionHandler: function(){},
		      actionText: 'OK'
		    };
	snackbarContainer.MaterialSnackbar.showSnackbar(data);
}


function sendInfo()  
{
	var v=document.search.brand.value;
	if (v==null || v=="")
		errorSnackBar('Enter a Brand Name to Analyze');
	else {
		var progress="<div class='progress' style='width:600px;margin:auto'><div class='indeterminate'></div></div>";
		document.getElementById('brandCharts').innerHTML=progress;
		document.search.brand.disabled = true;
		document.search.brandAnalyze.disabled = true;
		var url="BrandAnalysis?brandName="+encodeURIComponent(v);  
		  
		if(window.XMLHttpRequest){  
			request=new XMLHttpRequest();  
		}  
		else if(window.ActiveXObject){  
			request=new ActiveXObject("Microsoft.XMLHTTP");  
		}  
		  
		try  
		{  
			request.onreadystatechange=getInfo;  
			request.open("GET",url,true);  
			request.send();  
		}  
		catch(e)  
		{  
			alert("Unable to connect to server");  
		}  
	}
}  
function getInfo()
{
	if(request.readyState==4){ 
		document.search.brand.disabled = false;
		document.search.brandAnalyze.disabled = false;
		var val=request.responseText; 
		var rows = val.split("<br>");
		var countPos=0;
		var countNeg=0;
		var countNeu=0;
		var rating = 0;
		var totPos = 0;
		var totNeg = 0;
		var i,value;
		var arr = [];
		for(i=0;i<rows.length-1;i++){
			value=parseFloat(rows[i]);
			if (value==0.0)
				countNeu++;
			else if (value > 0.0){
				countPos++;
				totPos += value;
			}
			else {
				countNeg++;
				totNeg += value;
			}
			arr.push(value);
		}
		rating = totPos + totNeg;
		var allcharts = "<div class='mdl-cell mdl-cell--6-col' style='text-align:center;box-shadow: 1px 1px 1px 1px #D1D3D5;border:1px solid #D1D3D5'><canvas id='emotionChart' width='400px' height='400px' style='margin:auto'></canvas></div><div class='mdl-cell mdl-cell--6-col' style='text-align:center;box-shadow: 1px 1px 1px 1px #D1D3D5;border:1px solid #D1D3D5'><div style='width:100%;height:40px;padding-top:15px;font-size:36px;background-color:#37A1E7;color:white'><b>Brand Rating</b></div><div id='brating' style='width:100%;marin:auto;padding-top:100px;font-size:84px'>556</div></div><div class='mdl-cell mdl-cell--12-col' style='text-align:center;box-shadow: 1px 1px 1px 1px #D1D3D5;border:1px solid #D1D3D5'><canvas id='emotionTweet' width='800px' height='600px' style='margin:auto'></canvas></div>";
		var charts = document.getElementById("brandCharts");
		charts.innerHTML = allcharts; 
		emotionPrint(countPos,countNeu,countNeg);
		emotionTweets(arr);
		ratingPrint(Math.round(rating));
		document.getElementById('brandCharts').scrollIntoView();
	}
}
function emotionPrint(cPos,cNeu,cNeg){
	var ctx = document.getElementById("emotionChart");
	var myChart = new Chart(ctx, {
	    type: 'horizontalBar',
	    data: {
	        labels: ["Positive", "Neutral", "Negative"],
	        datasets: [{
	            label: 'Sentiments Graph',
	            data: [cPos,cNeu,cNeg],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)'
	            ],
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
function ratingPrint(rating){
	document.getElementById('brating').innerHTML = rating;
}  
function emotionTweets(tweets){
	var ctx = document.getElementById("emotionTweet");
	var k = []
	for(i=0;i<tweets.length-1;i++){
		k.push("");
	}
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	    	labels : k,
	        datasets: [{
	            label: 'Sentiment By Tweet',
	            data: tweets,
	            backgroundColor: 'rgba(255, 99, 132, 0.2)',
	            borderColor: 'rgba(255,99,132,1)',
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
