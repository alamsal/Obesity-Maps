<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
<title>Obesity Geoext Test</title>
<link rel="stylesheet" type="text/css" href="css/ext-all.css">
<link rel="stylesheet" type="text/css" href="http://vinson:8080/geoserver/openlayers/theme/default/style.css"/>
<script type="text/javascript" src="scripts/ext-base.js"></script>
<script type="text/javascript" src="scripts/ext-all-debug-w-comments.js"></script>
<script src="scripts/OpenLayers.js"></script>
<script type="text/javascript" src="scripts/GeoExt.js"></script>

<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=true&amp;key=ABQIAAAAzJxrThr6CEVz6mTO1VZeERT4--c_gnEmyMDCYhxacJWtfBHA1RSDpHRvhDu100ZpYGN4uYxzIr_AYQ" type="text/javascript"></script> 

<script type="text/javascript">
Ext.onReady(function() {

	var map, layer,controls=[];
	
	//Server that contains the shp information
	var layerhost='http://globalmonitoring.sdstate.edu/geoserver/wms/reflect';  
	 //Shape Name in the server
	var layername='EastWeb:Obesity_MerCentroid';
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
	  {'sphericalMercator':true,minZoomLevel:4, maxZoomLevel:8}); 						//Fixed the zoom level Min=4 and Max=8
	var gphy = new OpenLayers.Layer.Google(
		"Google Physical",
		{type: G_PHYSICAL_MAP,'sphericalMercator':true,minZoomLevel:4, maxZoomLevel:8});
		
	var gsat = new OpenLayers.Layer.Google(
		"Google Satellite",
		{type: G_SATELLITE_MAP,'sphericalMercator':true,minZoomLevel:4, maxZoomLevel:8});
					  
	var ghyb = new OpenLayers.Layer.Google(
					"Google Hybrid",
					{type: G_HYBRID_MAP, 'sphericalMercator':true,minZoomLevel:4, maxZoomLevel:8});

	/* Non Google rural health WMS overlayes */		
	obesity = new OpenLayers.Layer.WMS(
		   'Obesity rates',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'polygon'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': true}
	  ); 
	  
	pa = new OpenLayers.Layer.WMS(
		   'Physical activitiy rates',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'green'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );   
	  
	fvc = new OpenLayers.Layer.WMS(
		   'Fruits and cegetable consumption rates',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'polygon'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  ); 
	
	lsupermarket = new OpenLayers.Layer.WMS(
		   'Distance to nearest large supermaket',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/jpeg', 'transparent':'true','styles':'grass'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility':false}
	  ); 
	  
	lmsupermarket = new OpenLayers.Layer.WMS(
		   'Distance to nearest large or medium supermarket',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'green'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );   
	  
	lmssupermarket = new OpenLayers.Layer.WMS(
		   'Distance to nearest large, medium, or small supermarket',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'polygon'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  ); 	
	
	natamenities = new OpenLayers.Layer.WMS(
		   'Natural amenities index',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/jpeg', 'transparent':'true','styles':'grass'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  ); 
	  
	outrecr = new OpenLayers.Layer.WMS(
		   'Reccreational opportunity index',
		   layerhost, 
		   {'layers':layername,'tiled':true, 'format':'image/png', 'transparent':'true','styles':'green'},
		   {'opacity': 1.0, 'isBaseLayer':false, 'visibility': false}
	  );   
		
	//Add WMS layers into OpenLayers Mapobject.	
	
	map.addLayers([obesity,pa,fvc,lsupermarket,lmsupermarket,lmssupermarket,outrecr,natamenities,gmap,gphy,gsat,ghyb]);
	//Map center at Kansas
	var point = new OpenLayers.LonLat(-94.60,39.12);  
	point.transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()); 
	map.setCenter(point,1);  
   
   
/////////////////////////
//create a branch (or tree)
var blayerBranch = new Ext.tree.TreeNode({
			text: "Ashis was here"
		});
// append children to the branch , define  a loader function
blayerBranch.appendChild(new GeoExt.tree.LayerContainer({
			text: "Ashis test_container",
			map: map,
			loader: {
							 /*
						filter: function(record) {
							var myarr = new Array();
							//myarr[0]=record.get("layer").name.indexOf("City Limits");
							//myarr[1]=record.get("layer").name.indexOf("Google");
							//alert(myarr);
							if(myarr[0]!==-1 && myarr[1]!==-1){
								return true;
							}else{
								return false;
							}
						} */

					}
		}));

// FOR MORE INFO ON THIS OBJECT //
// http://www.lib.virginia.edu/scripts/yui_ext-1.0.1/docs/output/Ext.tree.AsyncTreeNode.html
var myNewLayer= new GeoExt.tree.LayerNode({
	layer: layer,
	leaf: true,
	expanded: true,
	loader: {
	 baseAttrs: {
				   radioGroup: "foo",
					//uiProvider: "use_radio"
				   }
	}
});

layerRoot= new Ext.tree.AsyncTreeNode({
		expanded: true,
		children: [{
			text: 'rMenu Option 1',
			leaf: false ,
			children: [{
			  text: 'ee',
			  leaf: true }]
			
		}, {
			text: 'gMenu Option 2',
			leaf: true
			//children : blayerBranch
		}, {
			text: 'bMenu Option 3',
			leaf: true
		}]
	});
	
 //layerRoot.appendChild(blayerBranch);
 //layerRoot.appendChild(myNewLayer );

 var tree = new Ext.tree.TreePanel({
			region: "west",
			frame: false,
			width : 200,
			title: "Map layers",
			root:   blayerBranch //blayerBranch  //layerRoot
		});

/////////////////////////    

mapPanel = new GeoExt.MapPanel({
	border: true,
	region: "center",
	center:point,
	map: map,
	controls:controls
	
});
controls.push(
	new OpenLayers.Control.Navigation(),
	new OpenLayers.Control.PanZoomBar(),
	new OpenLayers.Control.PanPanel(),
	new OpenLayers.Control.ZoomPanel()
	);
/////////////////////////
new Ext.Viewport({
	layout: "fit",
	hideBorders: true,
	items: {
		layout: "border"
		,deferredRender: false
	  , items: [ tree,mapPanel ]
	}
});


}); //onready

</script>
</head>
<body >

<div id="tags"></div>


</body>
</html>