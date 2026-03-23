declare module '@mapbox/mapbox-gl-draw' {
  import { IControl, Map } from 'mapbox-gl';

  interface DrawOptions {
    displayControlsDefault?: boolean;
    controls?: {
      point?: boolean;
      line_string?: boolean;
      polygon?: boolean;
      trash?: boolean;
      combine_features?: boolean;
      uncombine_features?: boolean;
    };
    defaultMode?: string;
  }

  class MapboxDraw implements IControl {
    constructor(options?: DrawOptions);
    onAdd(map: Map): HTMLElement;
    onRemove(map: Map): void;
    changeMode(mode: string, options?: any): this;
    deleteAll(): this;
    getAll(): GeoJSON.FeatureCollection;
  }

  export default MapboxDraw;
}

interface Window {
  mapboxMap: any;
  mapboxMapLoaded: boolean;
}
