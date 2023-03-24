require([
  'esri/Map',
  'esri/views/MapView',
  'esri/layers/FeatureLayer',
  'dojo/domReady!'
], function(Map, MapView, FeatureLayer) {
  // Define the map and view
  const map = new Map({
    basemap: 'streets'
  });

  const view = new MapView({
    container: 'map',
    map: map,
    center: [-122.4194, 37.7749],
    zoom: 12
  });

  // Define the feature layer
  const featureLayer = new FeatureLayer({
    url: 'https://services.arcgis.com/xxxxxxx/arcgis/rest/services/MyLayer/FeatureServer/0'
  });

  // Add the feature layer to the map
  map.add(featureLayer);

  // Define the search functionality
  $('#search-form').submit(function(event) {
    event.preventDefault();
    const searchTerm = $('#search-term').val();
    const query = {
      where: `name LIKE '%${searchTerm}%'`
    };
    featureLayer.queryFeatures(query).then(function(results) {
      const features = results.features;
      if (features.length > 0) {
        view.goTo(features[0].geometry);
      }
    });
  });
});
