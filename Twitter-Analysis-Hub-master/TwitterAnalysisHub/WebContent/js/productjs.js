/* CODE FOR PRODUCT */
var prequest;

function sendProduct(){
	var product = document.searchProduct.productName.value;
	if (product==null || product=='')
		errorSnackBar('Enter a Product Name to Analyze');
	else {
		var progress="<div class='progress' style='width:600px;margin:auto'><div class='indeterminate'></div></div>";
		document.getElementById('productCharts').innerHTML=progress;  
		var brand = document.searchProduct.productBrand.value;
		document.searchProduct.productName.disabled = true;
		document.searchProduct.productBrand.disabled = true;
		document.searchProduct.productAnalyze.disabled = true;
		var url="ProductAnalysis?productName="+encodeURIComponent(product)+"&brandName="+encodeURIComponent(brand);  
		  
		if(window.XMLHttpRequest){  
			prequest=new XMLHttpRequest();  
		}  
		else if(window.ActiveXObject){  
			prequest=new ActiveXObject("Microsoft.XMLHTTP");  
		}  
		try  
		{  
			prequest.onreadystatechange=getProduct;  
			prequest.open("GET",url,true);  
			prequest.send();  
		}  
		catch(e)  
		{  
			alert("Unable to connect to server");  
		}  
	}
}

function getProduct()
{
	if(prequest.readyState==4){
		document.searchProduct.productName.disabled = false;
		document.searchProduct.productBrand.disabled = false;
		document.searchProduct.productAnalyze.disabled = false;
		var totPos=0;
		var totNeg=0;
		var totNeu=0;
		var productTweetList = [];
		var i;
		var val = prequest.responseText;
		var rows = val.split('<br>');
		for(i=0;i<rows.length-1;i++){
			value = parseFloat(rows[i]);
			if (value>0)
				totPos++;
			else if (value<0)
				totNeg++;
			else
				totNeu++;
			productTweetList.push(value);
		}
		var allcharts='<div id="productChartHolder" class="mdl-cell mdl-cell--4-col" style="text-align:center;box-shadow: 1px 1px 1px 1px #D1D3D5;border:1px solid #D1D3D5"><canvas id="productChart" width="400px" height="400px" style="margin:auto"></canvas></div><div id="productTweetHolder" class="mdl-cell mdl-cell--8-col" style="text-align:center;box-shadow: 1px 1px 1px 1px #D1D3D5;border:1px solid #D1D3D5"><canvas id="productTweet" width="750px" height="400px" style="margin:auto"></canvas></div>';
		var charts = document.getElementById("productCharts");
		charts.innerHTML = allcharts;
		plotProductSentiment(totPos,totNeg,totNeu);
		plotProductTweets(productTweetList);
		document.getElementById('productCharts').scrollIntoView();
	}
}

function plotProductSentiment(cPos,cNeg,cNeu){
	document.getElementById("productChart").remove();
	document.getElementById('productChartHolder').innerHTML="<canvas id='productChart' width='400px' height='400' style='margin:auto'>";
	var ctx = document.getElementById('productChart').getContext('2d');
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

function plotProductTweets(ptl){
	document.getElementById("productTweet").remove();
	document.getElementById('productTweetHolder').innerHTML="<canvas id='productTweet' width='750px' height='400' style='margin:auto'>";
	var lbls = [];
	var i;
	for(i=0;i<ptl.length;i++){
		lbls.push(i+1);
	}
	var ctx = document.getElementById('productTweet').getContext('2d');
	var chart = new Chart(ctx, {	    
		type: 'line',
	    data: {
	        labels: lbls,
	        datasets: [{
	        	label: 'Hash Sentiment',
				borderColor: '#27ABF6',
	            data: ptl,
	            borderWidth: 1
	        }]
	    },

	    // Configuration options go here
	    options: {
	    	responsive:false,
	    }
	});	
}
