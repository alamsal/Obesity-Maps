<html>
<head>
<title>Influence of Physical and Social Landscapes on the Health of Rural Communities</title>
<link rel="stylesheet" type="text/css" href="css/ext-all.css">
<link rel="stylesheet" type="text/css" href="http://vinson:8080/geoserver/openlayers/theme/default/style.css"/>
<script type="text/javascript" src="scripts/ext-base.js"></script>
<script type="text/javascript" src="scripts/ext-all-debug-w-comments.js"></script>
<script src="scripts/OpenLayers.js"></script>
<script type="text/javascript" src="scripts/GeoExt.js"></script>

<script type="text/javascript">

Ext.BLANK_IMAGE_URL = "images/default/s.gif";
var app, items = [], controls = [];
Ext.onReady(function() {
app = new Ext.Viewport({
layout: "border",
items: items
});
});
items.push({
xtype: "gx_mappanel",
ref: "mapPanel",
region: "center",
map: {
numZoomLevels:5,

center: new OpenLayers.LonLat(-94.60,39.12).transform(
	new OpenLayers.Projection("EPSG:4326"),
	new OpenLayers.Projection("EPSG:900913")
	),
controls: controls
},

extent: OpenLayers.Bounds.fromArray([
-20037508,-20037508,
20037508,20037508.34
]),
layers: [
	/*new OpenLayers.Layer.WMS(
	"map 1",
	"http://maps.opengeo.org/geowebcache/service/wms",
	{layers: "bluemarble"},
	{isBaseLayer: true}
	),
	
	new OpenLayers.Layer.Google(
	"Google Streets",
	{'sphericalMercator': false,minZoomLevel: 3, maxZoomLevel: 7}
	),
	*/
	
	new OpenLayers.Layer.WMS(
	"map 2",
	"http://vinson:8080/geoserver/EastWeb/wms",
	{layers: "EastWeb:Obesity_MerCentroid",transparent: true,format: "image/png"},
	{isBaseLayer: false}
	),
	
	new OpenLayers.Layer.OSM()
	
	]
	
	
});

controls.push(
new OpenLayers.Control.Navigation(),
new OpenLayers.Control.PanZoomBar(),
new OpenLayers.Control.PanPanel(),
new OpenLayers.Control.ZoomPanel()
);

items.push({
xtype: "treepanel",
ref: "tree",
region: "west",
width: 200,
autoScroll: true,
enableDD: true,
root: new GeoExt.tree.LayerContainer({
expanded: true
})
});


items.push({
xtype: "gx_legendpanel",
region: "east",
width: 200,
autoScroll: true,
padding: 5
});

items.push({
xtype: "panel",
region: "north",
width: 200,
autoScroll: true,
padding: 5,
html:'Ashis GeoExt Test'
});
/*
var viewport = new Ext.Viewport({
layout: 'border',
renderTo: Ext.getBody(),
items: [{
region: 'north',
xtype: 'panel',
html: 'North'
},{
region: 'west',
xtype: 'panel',
split: false,
width: 200,
html: 'West'
},{
region: 'center',
xtype: 'gx_mappanel',
map: {
		numZoomLevels: 5		
		},

extent: OpenLayers.Bounds.fromArray([
		-122.911, 42.291,
		-122.787,42.398
		]),

layers: [new OpenLayers.Layer.WMS(
		"EastWeb:Obesity_MerCentroid",
		"http://vinson:8080/geoserver/EastWeb/wms",
		{layers: "EastWeb:Obesity_MerCentroid"},
		{isBaseLayer: false}
	)]


},{
region: 'east',
xtype: 'panel',
split: false,
width: 200,
html: 'East'
},{
region: 'south',
xtype: 'panel',
html: 'South'
}]
});
*/
</script>
</head>

<body>
</body>
</html>