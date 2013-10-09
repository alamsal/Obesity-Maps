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

var map = new OpenLayers.Map();
        var layer = new OpenLayers.Layer.WMS(
            "Global Imagery",
            "http://maps.opengeo.org/geowebcache/service/wms",
            {layers: "bluemarble"}
        );
        map.addLayer(layer);

        new GeoExt.MapPanel({
            region: 'center',
            height: 400,
            width: 600,
            map: map,
            title: 'A Simple GeoExt Map'
        });


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