<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<title>Analysis Hub - Dashboard</title>
<link rel="stylesheet" href="css/material.min.css">
<link rel="stylesheet" href="css/style.css">
<script src="js/material.min.js"></script>
<script src="js/Chart.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="shortcut icon" href="icons/favicon.ico" type="image/x-icon">
<script src='js/brandjs.js'></script>
<script src='js/countryjs.js'></script>
<script src='js/hashtagjs.js'></script>
<Script src='js/productjs.js'></Script>
</head>
<body>

<div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header
            mdl-layout--fixed-tabs">
  <header class="mdl-layout__header"  style="background-color:#37A1E7">
    <div class="mdl-layout__header-row">
      <!-- Title -->
      <span class="mdl-layout-title">Twitter Analysis Hub</span>
    </div>
    <!-- Tabs -->
    <div class="mdl-layout__tab-bar mdl-js-ripple-effect"  style="background-color:#37A1E7">
      <a href="#Brand" class="mdl-layout__tab is-active" style="font-size:14px"><b>Brand Analysis</b></a>
      <a href="#Product" class="mdl-layout__tab" style="font-size:14px"><b>Product Analysis</b></a>
      <a href="#Hashtag" class="mdl-layout__tab" style="font-size:14px"><b>Hashtag Analysis</b></a>
      <a href="#Country" class="mdl-layout__tab" style="font-size:14px"><b>Zonal Analysis</b></a>
    </div>
  </header>
   <div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
    <span class="mdl-layout-title">Twitter Analysis Hub</span>
     <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
      <a class="mdl-navigation__link" href="Dashboard.jsp" style="font-size:16px;color:white;background-color: #37A1E7"><i class="material-icons">dashboard</i>&nbsp;Dashboard</a>
      <a class="mdl-navigation__link" href="About.html" style="font-size:16px;color:white"><i class="material-icons">person</i>&nbsp;About</a>
      <a class="mdl-navigation__link" href="Guide.html" style="font-size:16px;color:white"><i class="material-icons">description</i>&nbsp;Guide</a>
    </nav>
  </div>
  <div class="mdl-layout__content">
  
  <!--DESIGN OF BRAND ANALYSIS STARTS HERE-->
    <section class="mdl-layout__tab-panel is-active" id="Brand">
      <div class="page-content">
	<div class="mdl-grid">
	  <div class="mdl-cell mdl-cell--12-col" style="text-align:center;box-shadow: 1px 1px 1px 1px #D1D3D5;padding-bottom:100px;border:1px solid #D1D3D5">
	    <div style="padding-top:100px;text-align:center">
			<div align="center"><a><span id="head">Brand </span><span id="head1">analysis</span></a></div>
	    </div>
		<div id="placement">
		<form name="search" >
			<table style="margin:auto"><tr>
			<td><input  id="brandName" type="text" name="brand" placeholder="Enter brand i.e. google"> </td>
			<td><input id="buttonStyle" type="button" value="Analyze" name='brandAnalyze' onclick="sendInfo()"></td></tr></table>
		</form>
	</div>	
	</div>
	</div>
	<div class="mdl-grid" id="brandCharts">
    
    </div>
      </div>
    </section>
    <!--DESIGN OF BRAND ANALYSIS ENDS HERE-->
    
    <!--DESIGN OF HASHTAG ANALYSIS STARTS HERE-->
    <section class="mdl-layout__tab-panel" id="Product">
      <div class="page-content">
      <div class="mdl-grid">
	  <div class="mdl-cell mdl-cell--12-col" style="text-align:center;box-shadow: 1px 1px 1px 1px #D1D3D5;padding-bottom:100px;border:1px solid #D1D3D5">
	    <div style="padding-top:100px;text-align:center">
			<div align="center"><a><span id="head">Product </span><span id="head1">analysis</span></a></div>
	    </div>
		<div id="placement">
		<form name="searchProduct" >
			<table style="margin:auto"><tr>
			<td><input  id="brandName" type="text" name="productName" placeholder="Enter product i.e. headphone"> </td>
			<td><input  id="brandName" type="text" name="productBrand" value="" placeholder="Enter brand i.e. sony"></td>
			<td><input id="buttonStyle" type="button" name="productAnalyze" value="Analyze" onclick="sendProduct()"></td></tr></table>
		</form>
	</div>	
	</div>
	</div>
	<div class="mdl-grid" id="productCharts">
		
	</div>
      </div>
    </section>
   <!--DESIGN OF PRODUCT ANALYSIS ENDS HERE-->
   
   <!--DESIGN OF HASHTAG ANALYSIS STARTS HERE-->
    <section class="mdl-layout__tab-panel" id="Hashtag">
     <div class="page-content">
		<div class="mdl-grid">
	  <div class="mdl-cell mdl-cell--12-col" style="text-align:center;box-shadow: 1px 1px 1px 1px #D1D3D5;padding-bottom:100px;border:1px solid #D1D3D5">
	    <div style="padding-top:100px;text-align:center">
			<div align="center"><a><span id="head">Hashtag </span><span id="head1">analysis</span></a></div>
	    </div>
		<div id="placement">
		<form name="searchHash" >
			<table style="margin:auto"><tr>
			<td><input id="brandName" type="text" name="hashtag" placeholder="Enter hashtag i.e. #sony"> </td>
			<td><select id="brandName" name="isStream"><option>Non-Stream</option><option>Stream</option></select></td>
			<td><input id="buttonStyle" type="button" value="Analyze" name="hashanalyze" onclick="streamClick()"></td></tr></table>
		</form>
	</div>	
	</div>
	</div>
	<div class="mdl-grid" id='hashCharts'>
	  
	</div>
	</div>
    </section>
    	<!--DESIGN OF HASHTAG ANALYSIS ENDS HERE-->
    
    <!--DESIGN OF ZONAL ANALYSIS STARTS HERE-->
     <section class="mdl-layout__tab-panel" id="Country">
      <div class="page-content">
		<div class="mdl-grid">
	  	<div class="mdl-cell mdl-cell--12-col" style="text-align:center;box-shadow: 1px 1px 1px 1px #D1D3D5;padding-bottom:100px;border:1px solid #D1D3D5">
	    <div style="padding-top:100px;text-align:center">
			<div align="center"><a><span id="head">Zonal </span><span id="head1">analysis</span></a></div>
	    </div>
		<div id="placement">
		<form name="searchCountry" >
			<table style="margin:auto"><tr>
			<td><input  id="brandName" type="text" name="brandCountry" placeholder="brand or product i.e. google"> </td>
			<td><input  id="brandName" type="text" name="countryName" placeholder="Enter country i.e. india"> </td>
			<td><input id="buttonStyle" type="button" name="countryAnalyze" value="Add" onclick="sendCountry()"></td></tr></table>
		</form>
	</div>	
	</div>
	</div>
	<div class="mdl-grid" id='countryCharts'>
	
	</div>
	</div>
    </section>
    	<!--DESIGN OF ZONAL ANALYSIS ENDS HERE-->
    	
  </div>
</div>
<!--DESIGN OF SNACKBAR STARTS HERE-->
<div id="error_snackbar" class="mdl-js-snackbar mdl-snackbar">
  <div style="background-color:#37A1E7;font-size:16px;width:90%" class="mdl-snackbar__text"></div>
  <button class="mdl-snackbar__action" style="color:white;font-size:14px"></button>
</div>
<!--DESIGN OF SNACKBAR ENDS HERE-->
</body>
</html>