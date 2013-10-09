Ext.onReady(function() {

	
	Ext.QuickTips.init();
	
	// Apply a set of config properties to the singleton
	Ext.apply(Ext.QuickTips.getQuickTip(), {
		maxWidth: 250,
		minWidth: 100,
		showDelay: 10,      	// Show 10ms after entering target
		dismissDelay: 30000,   // Hide after 30 seconds hover
		trackMouse: true
	});
	

	
	var map,popup,layer,controls=[];
	
	//Server that contains the shp information
	var layerhost='http://globalmonitoring.sdstate.edu/geoserver/wms/reflect';  
	//var layerhost='http://localhost:8080/geoserver/pgWMS/wms';
	//Shape Name in the server
	var layername='EastWeb:Obesity_MerCentroid';
	//var layername='pgWMS:RSWNV2011';
	// Avoid pink error tiles
	OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
	OpenLayers.Util.onImageLoadErrorColor = "transparent";
	// Map is in mercator this time, so over-ride the default
	var options = {
		  //scales:[19568,9784,4892,2446,1223],
		  projection: new OpenLayers.Projection("EPSG:900913"),						//Google Mercator projection equivalnet to ESRI:Web spherical Mercator
		  displayProjection: new OpenLayers.Projection("EPSG:4326"), 				//Equivalent of WGS 84
		  units:"m",
		  maxResolution:"auto",
		  maxExtent: new OpenLayers.Bounds(-20037508,-20037508,20037508,20037508.34) //Earth bound for Google spherical mercator projection
		  };
		// Create the map object
	map = new OpenLayers.Map('mapdiv',options );
	// create Google Maps layer
	var gmap = new OpenLayers.Layer.Google(
	     "Google Streets", // the default
	     {'sphericalMercator':true,minZoomLevel:3, maxZoomLevel:8}); 						//Fixed the zoom level Min=3 and Max=8
	var gphy = new OpenLayers.Layer.Google(
		"Google Physical",
		{type: G_PHYSICAL_MAP,'sphericalMercator':true,minZoomLevel:3, maxZoomLevel:8});
		
	var gsat = new OpenLayers.Layer.Google(
		"Google Satellite",
		{type: G_SATELLITE_MAP,'sphericalMercator':true,minZoomLevel:3, maxZoomLevel:8});
					  
	var ghyb = new OpenLayers.Layer.Google(
					"Google Hybrid",
					{type: G_HYBRID_MAP, 'sphericalMercator':true,minZoomLevel:3, maxZoomLevel:8});
	
	/* Non Google rural health WMS overlayes */		
	var obesity = new OpenLayers.Layer.WMS(
		   'Obesity Prevalence rates',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'SM_OBE'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': true}
	  ); 
	  
	var pa = new OpenLayers.Layer.WMS(
		   'Physical activitiy rates',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'SM_PA'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );   
	  
	var fvc = new OpenLayers.Layer.WMS(
		   'Fruits and vegetable consumption rates',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'SM_FRVG5'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  ); 
	
	var lsupermarket = new OpenLayers.Layer.WMS(
		   'Distance to nearest large supermarket',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/jpeg', 'transparent':'true','styles':'WTED_L'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility':false}
	  ); 
	  
	var lmsupermarket = new OpenLayers.Layer.WMS(
		   'Distance to nearest large or medium supermarket',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'WTED_LM'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );   
	  
	var lmssupermarket = new OpenLayers.Layer.WMS(
		   'Distance to nearest large, medium, or small supermarket',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'WTED_LMS'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  ); 	
	
	var natamenities = new OpenLayers.Layer.WMS(
		   'Natural amenities index',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/jpeg', 'transparent':'true','styles':'NaturalAmen'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': true}
	  ); 
	  
	var outrecr = new OpenLayers.Layer.WMS(
		   'Reccreational opportunity index',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'recopr'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );   
	
	var metro= new OpenLayers.Layer.WMS(
		   'View metropolitan area only',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'METRO'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	var nonmetro=  new OpenLayers.Layer.WMS(
		   'View non-metropolitan area only',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'NONMETRO'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	var econdep= new OpenLayers.Layer.WMS(
		   'Economic-dependance county indicator',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'ECONDEP_OU'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	var urbinf= new OpenLayers.Layer.WMS(
		   'Urban influence codes',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'URBINF03'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	var rulurb= new OpenLayers.Layer.WMS(
		   'Rural-urban continuum codes',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'RULURB03'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	var lowedu= new OpenLayers.Layer.WMS(
		   'Low education county indicator',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'LOWEDU'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	var perpov= new OpenLayers.Layer.WMS(
		   'Persistent poverty county indicator',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'PERPOV'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );
	
	//Add WMS layers into OpenLayers Mapobject.	
	
	map.addLayers([econdep,urbinf,rulurb,lowedu,perpov,outrecr,natamenities,lsupermarket,lmsupermarket,lmssupermarket,pa,fvc,obesity,metro,nonmetro,gmap,gsat,ghyb,gphy]);
	//Map center at Kansas
	var point = new OpenLayers.LonLat(-84.60,39.12);  
	point.transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()); 
	map.setCenter(point,1);
	

	//proxy layer      
	OpenLayers.ProxyHost = "geoproxy.php?url=";
	
	//Start Click event
	map.events.register('click', map, function (e) {
		//Get feature info
        //document.getElementById('tsgraphic').innerHTML = "Loading... please wait...";
        var maplayer=map.layers[3].params.LAYERS;         
	        x1=parseInt(e.xy.x);
			y1=parseInt(e.xy.y);
	    	var url = layerhost 
	      + "?REQUEST=GetFeatureInfo"
	      + "&EXCEPTIONS=application/vnd.ogc.se_xml"
	      + "&BBOX=" + map.getExtent().toBBOX()
	      + "&X=" + x1
	      + "&Y=" + y1
	      + "&INFO_FORMAT=text/plain" // [Supports: GML,plain,&HTML- No xml]
	      + "&QUERY_LAYERS=" +maplayer
	      + "&LAYERS="+maplayer
	      + "&FEATURE_COUNT=50"
	      + "&SRS=EPSG:900913"
	      + "&STYLES="
	      + "&WIDTH=" + map.size.w
	      + "&HEIGHT=" + map.size.h;
        OpenLayers.loadURL(url, '', this, setHTML);
        OpenLayers.Event.stop(e);
    }); 
	
function setHTML(response)
{	
	//Read XML from the Get Request method
	//document.getElementById('nodelist').innerHTML = response.responseText;
        
	var popupContains=response.responseText;
	
	var splitContains=popupContains.split("=",28);
	//alert(splitContains);
	var stateName=splitContains[4].slice(0,3);
	var countyName=splitContains[5].slice(0,-5);
	var lon=parseFloat(splitContains[9]);
	var lat=parseFloat(splitContains[10]);
	var smobe=Math.round(parseFloat(splitContains[13])*100)/100;
	var smpa=Math.round(parseFloat(splitContains[14])*100)/100;
	var smfrvg=Math.round(parseFloat(splitContains[15])*100)/100;
	var wtedL=Math.round(parseFloat(splitContains[16])*100)/100;
	var wtedLM=Math.round(parseFloat(splitContains[17])*100)/100;
	var wtedLMS=Math.round(parseFloat(splitContains[18])*100)/100;
	var sumzz=Math.round(parseFloat(splitContains[19])*100)/100;
	var f18suz=Math.round(parseFloat(splitContains[20])*100)/100;
	var urbaninfcode=Math.round(parseFloat(splitContains[21])*100)/100;
	var urbaninf
	switch(urbaninfcode)
		{
			case 1: 
			urbaninf="Large metro";
			break;
			
			case 2: 
			urbaninf="Small metro";
			break;
			
			case 3: 
			urbaninf="Micro adj large";
			break;
			
			case 4: 
			urbaninf="Noncore adj large";
			break;
			
			case 5: 
			urbaninf="Micro adj small";
			break;
			
			case 6: 
			urbaninf="Noncore adj small w/ town";
			break;
			
			case 7: 
			urbaninf="Noncore adj small no town";
			break;
			
			case 8: 
			urbaninf="Micro nonadj";
			break;
			
			case 9: 
			urbaninf="Nonecore adj micro w/ town";
			break;
			
			case 10: 
			urbaninf="Nonecore adj micro no town";
			break;
			
			case 11: 
			urbaninf="Nonecore nonadj w/town";
			break;
			
			default: 
			urbaninf="Nonecore nonadj no town";
			break;
				
		}
	var rulurbCode=parseFloat(splitContains[22]);
	var rulurb;
	switch(rulurbCode)
	{
			case 1: 
			rulurb="Counties in metro areas of 1 million population or more";
			break;
			
			case 2: 
			rulurb="Counties in metro areas of 250,000 to 1 million population";
			break;
			
			case 3: 
			rulurb="Counties in metro areas of fewer than 250,000 population";
			break;
			
			case 4: 
			rulurb="Urban population of 20,000 or more, adjacent to a metro area";
			break;
			
			case 5: 
			rulurb="Urban population of 20,000 or more, not adjacent to a metro area";
			break;
			
			case 6: 
			rulurb="Urban population of 2,500 to 19,999, adjacent to a metro area";
			break;
				
			case 7: 
			rulurb="Urban population of 2,500 to 19,999, not adjacent to a metro area";
			break;
			
			case 8: 
			rulurb="Completely rural or less than 2,500 urban population, adjacent to a metro area";
			break;
			
			default: 
			rulurb="Completely rural or less than 2,500 urban population, not adjacent to a metro area";
			break;
	}
	var loweduCode=parseFloat(splitContains[24]);
	var lowedu
	switch(loweduCode)
	{
		case 1:
		lowedu="Non-educated county";
		break;
		
		default:
		lowedu="Educated county";
		break;
	}
	
	var perpovCode=parseFloat(splitContains[25]);	
	var perpov
	switch(perpovCode)
	{
		case 1:
		perpov="Poor";
		break;
		
		default:
		perpov="Rich";
		break;
	}
	
	var metroCode=parseFloat(splitContains[26]);
	var metro;
	switch(metroCode)
	{
		case 1:
		metro="Yes";
		break;
		
		default:
		metro="No";
		break;
	}
	var econdepou=parseFloat(splitContains[27]);
	var econdep
	switch(econdepou)
		{
			case 1: 
			econdep="Farming dependent";
			break;
			
			case 2: 
			econdep="Mining dependent";
			break;
			
			case 3: 
			econdep="Manufacturing dependent";
			break;
			
			case 4: 
			econdep="Federal/State government dependent";
			break;
			
			case 5: 
			econdep="Services dependent";
			break;
			
			case 6: 
			econdep="Nonspecialized";
			break;
			
			default: 
			econdep="Recreation dependent";
			break;
								
		}
	
	var results="<b>State: </b>"+stateName+"<br/><b>County: </b>"+countyName+"<br/><b>Obesity rates: </b>"+smobe+"<br/><b>Fruits and vegetable comsumption rates: </b>"+smfrvg+"<br/><b>Physical activity rates: </b>"+smpa+"<br/><b>Distance to nearest large supermarket: </b>"+wtedL+
	"km<br/><b>Distance to nearest large or medium supermarket: </b>"+wtedLM+"km<br/><b>Distance to nearest large, medium or small supermarket: </b>"+wtedLMS+"km<br/><b>Natural amenities index: </b>"+sumzz+
	"<br/><b>Recreational opportunity index: </b>"+f18suz+"<br/><b>Persistant poverty coutny indicator: </b>"+perpov+"<br/><b>Low education county indicator: </b>"+lowedu+"<br/><b>Rural-urban continuum code: </b>"+rulurb+
	"<br/><b>Urban influence code: </b>"+urbaninf+"<br/><b>Economic-dependance county indicator: </b>"+econdep+"<br/><b>IsMetro: </b>"+metro
	//alert(results);
	
	var popup = new GeoExt.Popup({
            title: 'County Information',
            width:320,
			map:map,
			location: new OpenLayers.LonLat(lon,lat),
            //html: response.responseText,
			html:results,
            maximizable: false,
			anchored:true,
            collapsible: false,
			listeners: {
                    close: function() {
                        // closing a popup destroys it, but our reference is truthy
						popup.hide(); 
                        popup = null;
                    }
                }
        });
	
	popup.doLayout();

	// since the popup is anchored, calling show will move popup to this location
	popup.show();

}	
   
/////////////////////////
//create a  TreeNode
var treeNode = new Ext.tree.TreeNode({
			text: "Rural health",
			expanded:true,
			bodyStyle: 'background-color:#A4A4A4;'
		});
// append children to the branch , define  a loader function
treeNode.appendChild(new GeoExt.tree.OverlayLayerContainer({
			text: "Metropolitan and non-metropolitan area",
			map: map,
			qtip:"Counties classified as being within metropolitan and nonmetropolitan statistical areas by the Office of Management and Budget (OMB).",
			loader: {
						
						filter: function(record) {
							return record.get("layer").name.indexOf("area")!== -1;
						} 
							
					},
			expanded:true
		}));	
		
treeNode.appendChild(new GeoExt.tree.OverlayLayerContainer({
			text: "Obesity and associated risk factors",
			map: map,
			qtip:"County level prevalence of obesity (BMI >= 30 kg/m2), consumption of five or more servings of fruit and vegetables per day, and participation in leisure-time physical activity from BRFSS 2000-2006 data. From <i>Michimi and Wimberly (2010) Spatial Patterns of Obesity and Associated Risk Factors in the Conterminous U.S. Am J Prev Med </i> 39: e1-e12.",
			loader: {
						
						filter: function(record) {
							return record.get("layer").name.indexOf("rates")!== -1;
						} 
							
					},
			expanded:true
		}));		
//Append overlays in the TreeNode		
treeNode.appendChild(new GeoExt.tree.OverlayLayerContainer({
			text: "Distance to supermarkets",
			map: map,
			expanded:true,
			autoScroll:true,
			qtip:" Population-weighted distance to the supermarkets summarized at the county level. Distances are computed for three size categories: large, medium, or small supermarkets; large or medium supermarkets; and large supermarkets. From <i>Michimi and Wimberly (2010) Associations of Supermarket Accessibility with Obesity and Fruit and Vegetable Consumption in the Conterminous United States.International Journal of Health Geographics</i> 9:49.",
			loader: {
								
						filter: function(record) {
							return record.get("layer").name.indexOf("supermarket")!== -1;
						} 

					}
		}));		
//Append overlays in the TreeNode
treeNode.appendChild(new GeoExt.tree.OverlayLayerContainer({
			text: "Outdoor Activity Potential",
			map: map,
			qtip:"Natural amenities index based on physiography, land cover, climate, and tourism employment and recreational opportunity index based on data from the National Outdoor Recreation Supply Information System (NORSIS). From <i>Michimi and Wimberly (In press) Natural Environments, Obesity, and Physical Activity in Nonmetropolitan Areas of the United States.The Journal of Rural Health.</i>",
			expanded:true,
			loader: {
							 
						filter: function(record) {
							return record.get("layer").name.indexOf("index")!== -1;
						} 
							
					}
		}));

treeNode.appendChild(new GeoExt.tree.OverlayLayerContainer({
			text: "Social,Demographic, and Economic indicators",
			map: map,
			qtip:"County typologies include persistent poverty counties, low education counties, and economic types with nonmetropolitan recreation counties overlaid. Rural-urban continuum codes are based on degree of urbanization and adjacency to metropolitan areas. Urban influence codes are based on population size, urbanization, and access to larger communities.<i>Data are from the USDA Economic Research Service.<i/>",
			loader: {
						
						filter: function(record) {
							var myarr = new Array();
							myarr[0]=record.get("layer").name.indexOf("indicator");
							myarr[1]=record.get("layer").name.indexOf("codes");
							
							//alert(myarr);
							if(myarr[0]!==-1 || myarr[1]!==-1){
								return true;
							}else{
								return false;
							}
							//return record.get("layer").name.indexOf("indicator")!== -1;
						} 
							
					},
			expanded:true
		}));		
//Append baselayers in the treeNode		
treeNode.appendChild(new GeoExt.tree.LayerContainer({
			text: "Baselayers",
			autoLoad:true,
			map: map,
			expanded:true,			
			loader: {
						
						filter: function(record) {
						/*
							var myarr = new Array();
							myarr[0]=record.get("layer").name.indexOf("Google");
							myarr[1]=record.get("layer").name.indexOf("Google");
							
							//alert(myarr);
							if(myarr[0]!==-1 && myarr[1]!==-1){
								return true;
							}else{
								return false;
							*/
							return record.get("layer").name.indexOf("Google")!== -1;
						} 
					
						
					}
		}));
		
/////////////////////////    
//Create Map Panel
var mapPanel = new GeoExt.MapPanel({
	border: true,
	//region: "center",
	renderTo:"map",	
	center:point,	
	map: map,
	width:1000,
	height:650,
	layout:'fit',
	title:"Obesity and Associated Risk Factors Map",
	controls:controls
	
});
controls.push(
	new OpenLayers.Control.Navigation(),
	new OpenLayers.Control.PanZoomBar(),
	new OpenLayers.Control.PanPanel(),
	new OpenLayers.Control.ZoomPanel()
	);

 var tabpanel=new Ext.TabPanel({
    //region:"west",  
	renderTo:"layer",
	width:277, 
	autoScroll:true,
    defaults     : {
    xtype      : 'panel'
		},	
    items        : [{
        title    : 'Map layers',
		id:'layertab',
		setActiveTab:true,
        items    : [{
		xtype:'treepanel',
		selected:true,
		autoScroll:true,
		root:treeNode
		}]      
        },
        {
          title    : 'Layers description',
		  id:'metatab',
		  autoScroll:true,
          items    : [{ html:'<div style="font-size:10px";><h1>Obesity and associated risk factors:</h1><b>Obesity prevalence:</b> Proportions of adults with BMI >= 30 kg/m2 from BRFSS 2000-2006 data. Values were smoothed using weighted head banging.<a href="http://www.sciencedirect.com/science/article/pii/S074937971000320X" target="_blank"> Michimi and Wimberly (2010) Spatial Patterns of Obesity and Associated Risk Factors in the Conterminous U.S. Am J Prev Med 39: e1-e12.</a><br><b>Fruit and vegetable consumption:</b> Proportions of adults who reported eating fruit and vegetables 5 times or more per day from BRFSS 2000, 2002-2003, and 2005 data. Values were smoothed using weighted head banging. <a href="http://www.sciencedirect.com/science/article/pii/S074937971000320X" target="_blank">Michimi and Wimberly (2010) Spatial Patterns of Obesity and Associated Risk Factors in the Conterminous U.S. Am J Prev Med 39: e1-e12.</a><br/> <b>Physical activity:</b> Proportions of adults who participated in leisure-time physical activity during the past month from BRFSS 2000-2006 data. Values were smoothed using weighted head banging. <a href="http://www.sciencedirect.com/science/article/pii/S074937971000320X" target="_blank">Michimi and Wimberly (2010) Spatial Patterns of Obesity and Associated Risk Factors in the Conterminous U.S. Am J Prev Med 39: e1-e12.</a><br/><br/><h1>Distance to Supermarkets:</h1><b>Large, medium, or small:</b> Population-weighted distance to the nearest large, medium, or small supermarket summarized at the county level.<a href="http://www.ij-healthgeographics.com/content/9/1/49" target="_blank">Michimi and Wimberly (2010) Associations of Supermarket Accessibility with Obesity and Fruit and Vegetable Consumption in the Conterminous United States. International Journal of Health Geographics 9:49.</a><br/><b>Large or medium:</b> Population-weighted distance to the nearest large, medium, or small supermarket summarized at the county level.<a href="http://www.ij-healthgeographics.com/content/9/1/49" target="_blank">Michimi and Wimberly (2010) Associations of Supermarket Accessibility with Obesity and Fruit and Vegetable Consumption in the Conterminous United States. International Journal of Health Geographics 9:49.</a><br/><b>Large:</b> Population-weighted distance to the nearest large, medium, or small supermarket summarized at the county level. <a href="http://www.ij-healthgeographics.com/content/9/1/49" target="_blank">Michimi and Wimberly (2010) Associations of Supermarket Accessibility with Obesity and Fruit and Vegetable Consumption in the Conterminous United States. International Journal of Health Geographics 9:49.</a><br/><br/><h1>Outdoor Activity Potential:</h1><b>Natural amenities index:</b> Natural amenities index based on physiography, land cover, climate, and tourism employment.<a href="http://onlinelibrary.wiley.com/doi/10.1111/j.1748-0361.2012.00413.x/abstract" target="_blank">Michimi and Wimberly (In press) Natural Environments, Obesity, and Physical Activity in Nonmetropolitan Areas of the United States. The Journal of Rural Health.</a><br/> <b>Recreational opportunity index:</b> Recreational opportunity index based on data from the National Outdoor Recreation Supply Information System (NORSIS). <a href="http://onlinelibrary.wiley.com/doi/10.1111/j.1748-0361.2012.00413.x/abstract" target="_blank">Michimi and Wimberly (In press) Natural Environments, Obesity, and Physical Activity in Nonmetropolitan Areas of the United States. The Journal of Rural Health.</a><br/><br/><b>Social, Demographic, and Economic Indicators:</b><br/><b>Persistent poverty:</b> Counties with 20% of greater poverty from 1970-2000.<a href="http://www.ers.usda.gov/topics/rural-economy-population/rural-classifications.aspx" target="_blank">USDA ERS</a><br/><b>Low education:</b> counties where 25% or more of adults lacked a high school diploma or GED in 2000.<a href="http://www.ers.usda.gov/topics/rural-economy-population/rural-classifications.aspx" target="_blank">USDA ERS</a><br/><b> Rural-urban continuum codes:</b> County classification based on degree of urbanization and adjacency to metropolitan areas.<a href="http://www.ers.usda.gov/topics/rural-economy-population/rural-classifications.aspx" target="_blank">USDA ERS</a><br/> <b>Urban influence codes:</b> County classification based on population size, urbanization, and access to larger communities.<a href="http://www.ers.usda.gov/topics/rural-economy-population/rural-classifications.aspx" target="_blank">USDA ERS</a><br/><b> Economic type/recreation:</b> Nonmetropolitan county classification based on earning by place of work (ref) with nonmetropolitan recreation counties overlaid.<a href="http://www.ers.usda.gov/topics/rural-economy-population/rural-classifications.aspx" target="_blank">USDA ERS</a></div>' }]             
        }]
     
    });
// Set tabPanel tab active on default	
tabpanel.setActiveTab('layertab');
	
/////////////////////////////	
 // var tree = new Ext.tree.TreePanel({
			// width : 380,
			// autoScroll:true,
			// title: "Map layers",
			// collapsible: true,
			// root:   treeNode			
		// });




//Create Legend Panel
var legend = new GeoExt.LegendPanel({

		title: "Map Legends",
		bodyStyle: 'padding:5px;background-color:#A4A4A4;',
		width: 200,
		autoScroll: true,
		renderTo:"legend",
		//region: 'east'
});
/////////////////////////////////////////////////////////////////////////////////////////
//Panels are shown/rendered in the appropriate divs no longer use of viewport regions.
// var top = new Ext.Panel({
	// //region:'north',
	// //renderTo:"header",
	// title:'Project Background',
	// layout:'fit',
	// height:200,
	// boarder:true,
	//html:'The increasing prevalence of obesity in the United States has been linked to environmental factors that discourage physical activity and limit the availability of healthy foods. Most research on these phenomena has taken place in metropolitan areas, focusing on suburban sprawl on physical activity and the lack of supermarket access in impoverished urban areas. However, the high prevalence of obesity in rural areas highlights a need for research focused outside of major metropolitan regions. Whereas cities and suburbs are dominated by the built environment, the character of rural landscapes is molded by the natural environment, which influences the social and economic characteristics of rural communities and ultimately the health of rural populations. The overarching goal of this study is to test multiple working hypotheses about the environmental drivers of obesity, with an emphasis on non-metropolitan areas within the conterminous United States. This web visualization tool was developed to facilitate visualization and exploratory analysis of the various geospatial datasets that we used in our research. '

// });

// var bottom = new Ext.Panel({
	// //region:'south',
	// //renderTo:"footer",	
	// layout:'fit',
	// height:70,
	// html:'This work is funded by a National Research Initiative grant (2008-35215-18814) from the USDA Cooperative State Research, Education, and Extension Service. For more information about this project contact Dr. Michael C. Wimberly [hyperlink].<img src="http://globalmonitoring.sdstate.edu/projects/obesity/controller/SungrantImages/sdsu_logo_trans3.png" alt="sdsu logo" height="42" width="42" />&nbsp;<img src="http://globalmonitoring.sdstate.edu/projects/obesity/controller/SungrantImages/CSREESlogotrans.png" alt="csrees" height="42" width="42" />'

// });

//////////////////////////
//Viewport region, which supports North South East West panel region

// new Ext.Viewport({
	// layout: "fit",
	// hideBorders: true,
	// renderTo:'obesityMap',
	// items: {
		// layout: "border",
		// deferredRender: false,
	        // items: [tabpanel,mapPanel,legend,top,bottom]
	// }
// });
///////////////////////////////////////

}); 

