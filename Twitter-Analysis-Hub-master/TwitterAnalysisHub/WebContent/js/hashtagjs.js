/* CODE FOR HASHTAG */
var hrequest;
var hashPos=0;
var hashNeg=0;
var hashNeu=0;
var hashTweetList = [];
var hashLabels=[];
var streamFlag = false;


function streamClick()
{
	var btnAnalyze = document.searchHash.hashanalyze.value;
	var hash=document.searchHash.hashtag.value;
	if (hash==null || hash=='') {
		errorSnackBar('Enter a HashTag to Analyze');
	}
	else {
		if (btnAnalyze == 'Stop') {
			streamFlag = false;
		}
		else {
			var progress="<div class='progress' style='width:600px;margin:auto'><div class='indeterminate'></div></div>";
			document.getElementById('hashCharts').innerHTML=progress;
			sendHash();
		}
	}
}

function sendHash()  
{  
document.searchHash.hashtag.disabled = true;
document.searchHash.isStream.disabled = true;
var hash=document.searchHash.hashtag.value;
var str = document.searchHash.isStream.value;
var btnAnalyze = document.searchHash.hashanalyze.value;
if ((str=='Stream' || str=="Non-Stream")){
	if (str=='Stream'){
		streamFlag = true;
		document.searchHash.hashanalyze.value = 'Stop';
	}
	else if (str=='Non-Stream'){
		document.searchHash.hashanalyze.disabled = true;
	}
	var url="HashAnalysis?hashtag="+encodeURIComponent(hash)+"&isStream="+encodeURIComponent(str);  
	  
	if(window.XMLHttpRequest){  
	hrequest=new XMLHttpRequest();  
	}  
	else if(window.ActiveXObject){  
	hrequest=new ActiveXObject("Microsoft.XMLHTTP");  
	}  
	  
	try  
	{  
	hrequest.onreadystatechange=getHash;
	hrequest.open("GET",url,true);  
	hrequest.send();  
	}  
	catch(e)  
	{  
	alert("Unable to connect to server");  
	} 
}

}  

function getHash()
{
	if(hrequest.readyState==4){
		var arr = [];
		var val=hrequest.responseText; 
		var rows = val.split("<br>");
		var i;
		for(i=0;i<rows.length-1;i++){
			value = parseFloat(rows[i]);
			if (value>0)
				hashPos++;
			else if (value<0)
				hashNeg++;
			else
				hashNeu++;
			hashTweetList.push(value);
			hashLabels.push(hashLabels.length+1);
		}
		var allcharts = "<div id='hashChartHolder' class='mdl-cell mdl-cell--4-col' style='text-align:center;box-shadow: 1px 1px 1px 1px #D1D3D5;border:1px solid #D1D3D5'><canvas id='hashChart' width='400px' height='400px' style='margin:auto'></canvas></div><div id='hashTweetHolder' class='mdl-cell mdl-cell--8-col' style='text-align:center;box-shadow: 1px 1px 1px 1px #D1D3D5;border:1px solid #D1D3D5'><canvas id='hashTweets' width='750px' height='400px' style='margin:auto'></canvas></div>";
		var charts = document.getElementById("hashCharts");
		charts.innerHTML = allcharts;
		plotHashEmotion();
		plotHashTweets();
		document.getElementById('hashCharts').scrollIntoView();
		if (streamFlag)
			sendHash();
		else {
			document.searchHash.hashanalyze.value = 'Analyze';
			hashTweetList = [];
			hashLabels = [];
			hashPos = 0;
			hashNeg = 0;
			hashNeu = 0;
			document.searchHash.hashtag.disabled = false;
			document.searchHash.isStream.disabled = false;
			document.searchHash.hashanalyze.disabled = false;
		}
	}
}

function plotHashEmotion()
{
	document.getElementById("hashChart").remove();
	document.getElementById('hashChartHolder').innerHTML="<canvas id='hashChart' width='400px' height='400' style='margin:auto'>";
	var ctx = document.getElementById('hashChart').getContext('2d');
	data = {
		    datasets: [{
		        data: [hashPos, hashNeu, hashNeg],
		     	backgroundColor: [
			'#0AF1BC','#F3F1B4','#F66627'	
			]
		    }],

		    // These labels appear in the legend and in the tooltips when hovering different arcs
		    labels: [
		        'Positive',
		        'Neutral',
		        'Negative'
		    ]
		};
	var myDoughnutChart = new Chart(ctx, {
	    type: 'doughnut',
	    data: data,
	    options: {
		responsive: false
	    }
	});
}

function plotHashTweets()
{
	document.getElementById("hashTweets").remove();
	document.getElementById('hashTweetHolder').innerHTML="<canvas id='hashTweets' width='750px' height='400' style='margin:auto'>";
	var ctx = document.getElementById('hashTweets').getContext('2d');
	var chart = new Chart(ctx, {	    
		type: 'line',
	    data: {
	        labels: hashLabels,
	        datasets: [{
	        	label: 'Hash Sentiment',
				borderColor: '#27ABF6',
	            data: hashTweetList,
	            borderWidth: 1
	        }]
	    },

	    // Configuration options go here
	    options: {
	    	responsive:false,
	    }
	});
}
