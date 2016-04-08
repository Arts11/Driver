/**
 * Map state control - hangs on to drawn items for consistent map state across navigation
 */
(function () {
    'use strict';

    /* ngInject */
    function MapState(BaseLayersService, localStorageService) {
        var filterGeoJSON, zoom, location, baseLayer;
        var baseLayers = _.map(BaseLayersService.baseLayers(), 'label');
        var baseLayerStorageName = 'map.baseLayerName';

        var svc = {
            setFilterGeoJSON: setFilterGeoJSON,
            getFilterGeoJSON: getFilterGeoJSON,
            setZoom: setZoom,
            getZoom: getZoom,
            setLocation: setLocation,
            getLocation: getLocation,
            setBaseLayerName: setBaseLayerName,
            getBaseLayerName: getBaseLayerName
        };

        return svc;

        /**
         * Set filter geojson
         * @param {object} geojson for a filter
         */
        function setFilterGeoJSON(geojson) {
            filterGeoJSON = geojson;
        }

        /**
         * Get filter geojson
         */
        function getFilterGeoJSON() {
            return filterGeoJSON;
        }

        /**
         * Set zoomlevel
         * @param {number} mapZoom The zoom level of the leaflet map
         */
        function setZoom(mapZoom) {
            zoom = mapZoom;
        }

        /**
         * Get zoomlevel - default to 5
         */
        function getZoom() {
            return zoom || 5;
        }

        /**
         * Set coordinates for the center of the map
         * @param {object} mapLocation a leaflet lat/lng object
         */
        function setLocation(mapLocation) {
            location = mapLocation;
        }

        /**
         * Get coordinates for the center of the map
         */
        function getLocation() {
            return location;
        }

        /**
         * Set base map selection (by name) and save it in local storage
         */
        function setBaseLayerName(layerName) {
            baseLayer = layerName;
            localStorageService.set(baseLayerStorageName, layerName);
        }

        /**
         * Get base map selection (by name), from local storage if not initialized, falling
         * back to the first basemap if local storage doesn't have one set.
         */
        function getBaseLayerName() {
            if (!baseLayer) {
                baseLayer = localStorageService.get(baseLayerStorageName);
            }
            return baseLayer || baseLayers[0];
        }
    }

    angular.module('driver.state')
    .factory('MapState', MapState);
})();
