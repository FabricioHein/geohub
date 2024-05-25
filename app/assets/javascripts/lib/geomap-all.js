(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('ol/source/Source'), require('ol/extent'), require('ol/layer/Layer')) :
  typeof define === 'function' && define.amd ? define(['exports', 'ol/source/Source', 'ol/extent', 'ol/layer/Layer'], factory) :
  (factory((global.GeoMapAll = {}),global.Source,global.extent,global.Layer));
}(this, (function (exports,Source,extent,Layer) { 'use strict';

  Source = Source && Source.hasOwnProperty('default') ? Source['default'] : Source;
  Layer = Layer && Layer.hasOwnProperty('default') ? Layer['default'] : Layer;

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = "/* \r\n * Defição dos controles \r\n */\r\n\r\n.map-app {\r\n  font-size: 16px;\r\n  font-family: Arial, Helvetica, sans-serif;\r\n}\r\n\r\n.map-app-map {\r\n  width: 100%;\r\n  height: 100%;\r\n  overflow: hidden;\r\n}\r\n\r\n/* Controle Tipo <div> */\r\n.map-app-control {\r\n  width: 2rem !important;\r\n  height: 2rem;\r\n  background-size: 1.5rem 1.5rem;\r\n  cursor: pointer;\r\n  font-size: 0.5rem !important;\r\n}\r\n\r\n/* Controle Tipo <button> */\r\n.map-app-panel button {\r\n  width: 2rem !important;\r\n  height: 2rem;\r\n  cursor: pointer;\r\n  font-size: 1.2rem !important;\r\n  background: none;\r\n  border: none;\r\n}\r\n\r\n.map-app-panel button:focus {\r\n  outline: none;\r\n}\r\n\r\n.map-app-control:hover {\r\n  background-color: rgb(151, 149, 149);\r\n}\r\n\r\n.map-app-control-active {\r\n  background-color: rgb(151, 149, 149) !important;\r\n}\r\n\r\n.map-app-control-marker-rt,\r\n.map-app-control-marker-rb {\r\n  width: 2rem;\r\n  height: 1.875rem;\r\n  background: url(../assets/submenu_left.png) left bottom no-repeat;\r\n  background-size: 0.5rem 0.5rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.map-app-control-marker-lt,\r\n.map-app-control-marker-lb {\r\n  width: 2rem;\r\n  height: 1.875rem;\r\n  background: url(../assets/submenu_right.png) right bottom no-repeat;\r\n  background-size: 0.5rem 0.5rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.map-app-undefined-control {\r\n  background-image: url(../assets/controle-32.png);\r\n  background-position: center center;\r\n  background-repeat: no-repeat;\r\n  background-size: 10.5rem 10.5rem;\r\n}\r\n\r\n/* \r\n * Defição dos paineis \r\n */\r\n\r\n.map-app-panel {\r\n  position: absolute;\r\n  z-index: 999;\r\n  overflow: hidden;\r\n  border-radius: 0.25rem;\r\n  background: #ffff;\r\n  -webkit-box-shadow: 0 0 0.25rem 0 rgba(33, 33, 33, 1);\r\n  -moz-box-shadow: 0 0 0.25rem 0 rgba(33, 33, 33, 1);\r\n  box-shadow: 0 0 0.25rem 0 rgba(33, 33, 33, 1);\r\n  max-height: 50vh; /* Limita a altura do painel à altura do mapa */\r\n}\r\n\r\n.map-app-panel-lt {\r\n  left: 0.625rem;\r\n  right: auto;\r\n  top: 0.625rem;\r\n}\r\n\r\n.map-app-panel-lc {\r\n  left: 0.625rem;\r\n  right: auto;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n}\r\n\r\n.map-app-panel-lb {\r\n  left: 0.625rem;\r\n  right: auto;\r\n  bottom: 0.625rem;\r\n}\r\n\r\n.map-app-panel-rt {\r\n  left: auto;\r\n  right: 0.625rem;\r\n  top: 0.625rem;\r\n}\r\n\r\n.map-app-panel-rc {\r\n  right: 0.625rem;\r\n  left: auto;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n}\r\n\r\n.map-app-panel-rb {\r\n  right: 0;\r\n  left: auto;\r\n  bottom: 0;\r\n  display: flex;\r\n  font-size: 0.25rem;\r\n  -webkit-box-shadow: none;\r\n  -moz-box-shadow: none;\r\n  box-shadow: none;\r\n  border-radius: 0;\r\n  line-height: 1.1;\r\n}\r\n\r\n.map-app-panel-rb input:focus,\r\n.map-app-panel-rb select:focus {\r\n  outline: none;\r\n}\r\n\r\n.map-app-panel-rb input,\r\n.map-app-panel-rb select,\r\n.map-app-panel-rb span {\r\n  font-size: 0.7rem;\r\n  background: none;\r\n  border: none;\r\n}\r\n\r\n.map-app-panel-rb input,\r\n.map-app-panel-rb span {\r\n  color: #ddd;\r\n  padding: 4px;\r\n}\r\n\r\n.map-app-panel-ct {\r\n  right: 50%;\r\n  left: auto;\r\n  transform: translateX(50%);\r\n  top: 0.625rem;\r\n  display: flex;\r\n}\r\n\r\n.map-app-panel-cc {\r\n  right: 50%;\r\n  top: 50%;\r\n  transform: translateX(-50%) translateY(-50%);\r\n}\r\n\r\n.map-app-panel-cb {\r\n  right: 50%;\r\n  transform: translateX(-50%);\r\n  bottom: 0.625rem;\r\n}\r\n\r\n/* \r\n * Defição das tooltips \r\n */\r\n\r\n.map-app-panel-tooltip {\r\n  border-radius: 4px;\r\n  position: absolute;\r\n  height: 2rem;\r\n  z-index: 997;\r\n  overflow: hidden;\r\n  background: rgb(151, 149, 149);\r\n  color: #fff;\r\n  line-height: 2rem;\r\n  padding: 0 0.625rem;\r\n  display: none;\r\n}\r\n\r\n.map-app-panel-lb-tooltip,\r\n.map-app-panel-lt-tooltip {\r\n  left: 2.625rem;\r\n}\r\n\r\n.map-app-panel-rt-tooltip {\r\n  right: 2.625rem;\r\n}\r\n\r\n/* \r\n * Defição dos subpaneis\r\n */\r\n\r\n.map-app-subpanel {\r\n  position: absolute;\r\n  /* height: 2rem; */\r\n  z-index: 998;\r\n  overflow: hidden;\r\n  background: #fff;\r\n  color: #000;\r\n  line-height: 2rem;\r\n  display: none;\r\n  -webkit-box-shadow: 0 0 0.25rem 0 rgba(33, 33, 33, 1);\r\n  -moz-box-shadow: 0 0 0.25rem 0 rgba(33, 33, 33, 1);\r\n  box-shadow: 0 0 0.25rem 0 rgba(33, 33, 33, 1);\r\n}\r\n\r\n.map-app-subpanel-rt,\r\n.map-app-subpanel-rb {\r\n  right: 2.625rem;\r\n  left: auto;\r\n}\r\n\r\n.map-app-subpanel-lt,\r\n.map-app-subpanel-lb {\r\n  left: 2.625rem;\r\n  right: auto;\r\n}\r\n\r\n/* \r\n * Dock \r\n */\r\n\r\n.map-app-dock-bottom {\r\n  width: 100%;\r\n  background: red;\r\n  position: absolute;\r\n  bottom: 0;\r\n  left: 0;\r\n}\r\n\r\n.map-app-dock-right {\r\n  height: 100%;\r\n  background: blue;\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n}\r\n\r\n.map-app-dock-left {\r\n  height: 100%;\r\n  background: blue;\r\n  position: absolute;\r\n  /* top: 0; */\r\n  left: 0;\r\n}\r\n\r\n/* \r\n * Defição dos widgets \r\n */\r\n\r\n.map-app-widget {\r\n  position: absolute;  \r\n  top: 0.625rem;\r\n  left: 52px;\r\n  min-width: 250px;\r\n  min-height: 150px;\r\n  max-width: 100%;\r\n  max-height: 100%;\r\n  background-color: #fff;\r\n  border-radius: 0.25rem;\r\n  border: 1px rgb(33, 33, 33) solid;\r\n  -webkit-box-shadow: 0 0 0.25rem 0 rgba(33, 33, 33, 1);\r\n  -moz-box-shadow: 0 0 0.25rem 0 rgba(33, 33, 33, 1);\r\n  box-shadow: 0 0 0.25rem 0 rgba(33, 33, 33, 1);\r\n  display: none;\r\n  z-index: 996;\r\n  border: 2px solid rgba(164,164,164,0.15);\r\nborder-radius: 23px 23px 23px 23px;\r\n}\r\n\r\n.map-app-widget-maximized {\r\n  top: 10px !important;\r\n  bottom: 25px !important;\r\n  left: 52px !important;\r\n  right: 52px !important;\r\n  min-width: auto;\r\n  min-height: auto;\r\n  max-width: auto;\r\n  max-height: auto;\r\n  width: auto;\r\n  height: auto;\r\n  border: 2px solid rgba(164,164,164,0.15);\r\nborder-radius: 23px 23px 23px 23px;\r\n}\r\n\r\n.map-app-widget-docked {\r\n  top: 0 !important;\r\n  bottom: 0 !important;\r\n  left: 0 !important;\r\n  right: 0 !important;\r\n  min-width: 100%;\r\n  min-height: 100%;\r\n  max-width: 100%;\r\n  max-height: 100%;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.map-app-widget-container {\r\n  width: 100%;\r\n  height: calc(100% - 45px);\r\n  overflow-y: auto;\r\n  overflow-x: hidden;\r\n  display: flex;\r\n}\r\n\r\n.map-app-widget-header {\r\n  text-align: center;\r\n  padding: 0.625rem;\r\n  cursor: move;\r\n  z-index: 10;\r\n  background-color: rgb(0 ,0, 0);\r\n  color: #fff;\r\n  /* text-transform: uppercase; */\r\n  font-weight: bold;\r\n  letter-spacing: 1px;\r\n  border: 2px solid rgba(164,164,164,0.15);\r\nborder-radius: 23px 23px 0px 1px;\r\n}\r\n\r\n.map-app-widget-content {\r\n  /* padding: 0.625rem; */\r\n  /* overflow: auto; */\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n}\r\n\r\n.map-app-widget-close {\r\n  text-align: center;\r\n  float: right;\r\n  cursor: pointer;\r\n  background-color: rgb(88, 179, 133);\r\n  color: #fff;\r\n  padding: 0 0.25rem;\r\n}\r\n\r\n.map-app-widget-close:hover {\r\n  border-radius: 0.25rem;\r\n  background-color: rgb(255, 255, 255);\r\n  color: rgb(33, 33, 33);\r\n}\r\n\r\n.map-app-widget-resizable .map-app-widget-resizers .map-app-widget-resizer {\r\n  width: 0.625rem;\r\n  height: 0.625rem;\r\n  position: absolute;\r\n  z-index: 99999;\r\n}\r\n\r\n.map-app-widget-resizable\r\n  .map-app-widget-resizers\r\n  .map-app-widget-resizer.map-app-widget-bottom-right {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACNSURBVCiRndHNCcJAGITh98tV29AGvFiJWEY62GH3uI2IICKeYgU2lcWbSEyyP3N/GJgxGiLpCFy7Wui9PwAX4GS1MKV0A86S3sV4CgGK8Bwswkswi9egpP0izkFgmL1qDYYQdsBgZv1fcw6O4/gys94597BWCD+D1cIvboEA1golbbuU0r0Wxhg3wPMDOv2mP+uTp9cAAAAASUVORK5CYII=\")\r\n    right bottom no-repeat;\r\n  background-size: 0.625rem 0.625rem;\r\n  right: 0;\r\n  bottom: 0;\r\n  cursor: nwse-resize;\r\n}\r\n\r\n.map-app-float-dlg {\r\n  position: absolute;\r\n  top: 0.625rem;\r\n  left: 3.25rem;\r\n  background: rgba(0, 0, 0, 0.7);\r\n  color: #ddd;\r\n  border-radius: 0.25rem;\r\n  padding: 0.625rem 1.25rem;\r\n  line-height: 0.9375rem;\r\n  font-size: 0.625rem;\r\n  display: none;\r\n}\r\n\r\n.map-app-float-dlg span {\r\n  font-weight: bold;\r\n  cursor: pointer;\r\n  padding-right: 1.25rem;\r\n}\r\n\r\n.map-app-float-dlg span:hover {\r\n  text-decoration: underline;\r\n}\r\n\r\n.map-app-hidden-select {\r\n  width: 1.25rem;\r\n  border: none;\r\n  width: 1rem !important;\r\n  color: #fff !important;\r\n}\r\n\r\n.map-app-hidden-select option {\r\n  background: rgba(0, 0, 0, 0.7);\r\n  color: #fff;\r\n}\r\n\r\n/* Marcador  */\r\n.map-app-control-marker-rt,\r\n.map-app-control-marker-rb {\r\n  width: 2rem;\r\n  height: 1.875rem;\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH4wILDBkhL7ZXzwAAANJJREFUKM+Fjz1KBEEUhKsaWfBn8QhiKug1+hXCBHoIM4O5iKmxYr6MQYPX2miTLoOZhl5x2Eq6gq73VQGLJG0AICI+JT1gRamZWut2sc+2d5KuJa0HUkp7ALB9TvLW9lcpZT3wxxvAY0S8rgZsAwBIttcA3iLi/t8AyZ5A2+Sc/pZ02fb0ow89jWSj3tj+KKVgGIYjwlWrtNSaEXO1J0kv0zQdDd10vi61lht0rfVd0t1ZR2A3vj8E20wpwfYPxnEEAOScLyKCOKGTH5pyziC5/QXrPVGjt2z8xwAAAABJRU5ErkJggg==\")\r\n    left bottom no-repeat;\r\n  background-size: 0.5rem 0.5rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.map-app-control-marker-lt,\r\n.map-app-control-marker-lb {\r\n  width: 2rem;\r\n  height: 1.875rem;\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH4wILDBoZLJm8kgAAAL5JREFUKM+dj7FKBEEQRF8Nw4EYmJqJqaDf0cPCBubGZvcrphcr5rKyLNy/OWWyA6fOBl5HTXW97mrYqFLKQ0S8rf2u6bljBLiy/QFcA0+11q82T7+BZVmw/S7p1vYFQM55G4iIPTAAbto8z3SBiLgHXiQZQNKf3/JJ7kvbn5JkWz0zQBrHseV+BW5sIwnbXSBP00Qp5dn24xpFwOaJVEq5q7UemnndLKB2L9g+ppQ4zb1CiXMqIn4KwzD8a9M34BJP5b4j4JsAAAAASUVORK5CYII=\")\r\n    right bottom no-repeat;\r\n  background-size: 0.5rem 0.5rem;\r\n  cursor: pointer;\r\n}\r\n\r\n/* Layer Switcher */\r\n\r\n.map-app-ls-group {\r\n  width: 100%;\r\n  border-top: 1px rgb(230, 230, 230) solid;\r\n  padding: 4%;\r\n  display: inline-block;\r\n}\r\n\r\n.map-app-ls-group-visibility {\r\n  width: 24px;\r\n  height: 24px;\r\n  float: left;\r\n  cursor: pointer;\r\n}\r\n\r\n/* .checked, .unchecked:hover {\r\n    background: url(../selecionado-32.png) center center no-repeat;\r\n    background-size: 18px 18px;\r\n}\r\n\r\n.unchecked, .checked:hover {\r\n    background: url(../desselecionado-32.png) center center no-repeat;\r\n    background-size: 18px 18px;\r\n} */\r\n\r\n.map-app-ls-title-group {\r\n  font-size: 12px;\r\n  /* width: 230px; */\r\n  height: 30px;\r\n  float: left;\r\n  line-height: 30px;\r\n  padding: 0 10px;\r\n  overflow-y: hidden;\r\n  font-weight: bold;\r\n}\r\n\r\n.map-app-ls-child-visibility {\r\n  width: 24px;\r\n  height: 24px;\r\n  float: left;\r\n  cursor: pointer;\r\n}\r\n\r\n.map-app-ls-title-child {\r\n  font-size: 12px;\r\n  width: 85%;\r\n  height: 24px;\r\n  float: left;\r\n  line-height: 24px;\r\n  padding-left: 10px;\r\n  overflow-y: hidden;\r\n}\r\n\r\n.map-app-ls-group-expand {\r\n  width: 24px;\r\n  height: 24px;\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACFSURBVFhH7ZBbCoAgFERdQN/RbltmyylvOBBye6ij/cwBkUDOGQpCCCEcpnT34NW9xrPFs5xfXMxpbmu42Dp7sKebOQJxuG//RP6QMaLYyRxR7WKMaHa0CJrjoEZEi4MSIT0Ovoi7xcFToHsceKFhcZAHh8bBdcTwOMCIX+JgTkcIUUkIB+geR5Ge8eXYAAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n  background-size: 12px 12px;\r\n  float: left;\r\n  cursor: pointer;\r\n}\r\n\r\n.map-app-ls-group-expand:hover {\r\n  border-radius: 18px;\r\n  background-color: #ddd;\r\n}\r\n\r\n.map-app-ls-group-expand-collapse {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACDSURBVFhH7ZBRCoAgEEQ9QN/Rcbtlx6ldcCCkRN1dI5gHA+rHvMFECDGy5nzCJjly9DwVyM+cqSPucvzAtBGlXO9PbyHUROEjWgRhI3qK3UeMFLqNsBSZR5gLhOEODzno7vKUg+bOReItB+UIdT2yS7zlACPUUeV1nQOR3YQQ8ktSugCihkeTh8UeTAAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n  background-size: 12px 12px;\r\n}\r\n\r\n.map-app-ls-group-menu,\r\n.map-app-ls-menu-child {\r\n  width: 24px;\r\n  height: 24px;\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABJSURBVFhH7dDBCQAgDEPRbifo/guoe6gB8WRvBQ/+B7mEFEQDAAAXZaXvZBWO6N3RVsZOVeGI3h3PH6Bv0pHGSYUjegcAwJfMJp1qJKyBV5b7AAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n  background-size: 12px 12px;\r\n  float: right;\r\n  cursor: pointer;\r\n  margin-right: 0.75rem;\r\n}\r\n\r\n/* .map-app-ls-group-menu:hover,\r\n.map-app-ls-menu-child:hover {\r\n    border-radius: 18px;\r\n    background-color: #ddd;\r\n} */\r\n\r\n.map-app-ls-group-parent {\r\n  width: 100%;\r\n  height: 24px;\r\n}\r\n\r\n.map-app-ls-group-child {\r\n  padding: 12px 0 0 42px;\r\n  display: none;\r\n  float: right;\r\n}\r\n\r\n/* .map-app-ls-group-child:hover {\r\n    background: linear-gradient(to bottom, rgb(250, 250, 250) 24px, transparent 0);\r\n} */\r\n\r\n.map-app-ls-child-symbology {\r\n  width: 220px;\r\n  margin-left: 36px;\r\n  display: table;\r\n}\r\n\r\n.map-app-ls-menu {\r\n  width: 200px;\r\n  top: 90px;\r\n  right: 15px;\r\n  position: absolute;\r\n  -webkit-box-shadow: 0px 0px 2px 0px rgba(33, 33, 33, 1);\r\n  -moz-box-shadow: 0px 0px 2px 0px rgba(33, 33, 33, 1);\r\n  box-shadow: 0px 0px 2px 0px rgba(33, 33, 33, 1);\r\n  background: #fff;\r\n  z-index: 99998;\r\n  display: none;\r\n  border-radius: 2px;\r\n}\r\n\r\n.map-app-ls-menu-item {\r\n  width: 100%;\r\n  font-size: 12px;\r\n  line-height: 36px;\r\n  padding: 5px 15px;\r\n  cursor: pointer;\r\n  border-bottom: 1px rgb(230, 230, 230) solid;\r\n}\r\n\r\n.map-app-ls-menu-item:last-child {\r\n  border-bottom: none;\r\n}\r\n\r\n.map-app-ls-menu-item:hover {\r\n  background: rgb(250, 250, 250);\r\n}\r\n\r\n.map-app-checked {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACbSURBVFhH7ZBRCoAwDEN3CvGOHtjjqEEno3Rb1G4M7IOgfqR5GBxnVLZGodHKFqF5XKjgAv8SmI8s5+tNNwGMr0fQTSW6CKTjeOI70lygNA5MBPBL5WFQGwefBTCuDTDjQN6rIgvaEDsO5L0qWkEOsuNAu1ckV0glEGYc5O5lKRWiBDsOTAXAdIXFXOApLvBawDo0WtkijjMaIezcxsG36QIk1QAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n  background-size: 22px 22px;\r\n}\r\n\r\n.map-app-checked-partial {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH4ggUEysMGfU3SwAAANxJREFUWMPt1s9KAzEQBvBfdnvRgyB4FH0Eb75cn8Z38ib0LrSnVvBfEy9ZCEuXunZxRfJBCEzCzJdvMplQUTEzwoA9/Va8Zm4FFj9UaCwGFZ1dgUqgEmhOrOkwUDFhqjLsnJ3hFq+Frc1z6gWMeMEWuykINLjDEud4wx43eMZ7QSjiA094wGO2TaLAFS7yidtM4joT3BcPTpsVaI4F/04v6PJ8ifvilKFYj3ks8JkDb7DC+oC/0QS6NJT5Dr09sZey2LOlsZczTdwRB/3Vh6gS+PM/ovTvFaiomB1fjlctZoE0VsoAAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n  background-size: 18px 18px;\r\n}\r\n\r\n.map-app-unchecked {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA9SURBVFhH7c5RBgAwDETB3P/S7QVCU1JSZtjP5QVMtR6tLDt3rOz6cCBAgAABAgQIEPBvQPfKsnPHYJqIDWJMn2FbT168AAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n  background-size: 22px 22px;\r\n}\r\n\r\n.map-app-ls-float-widget {\r\n  min-width: 200px;\r\n  min-height: 50px;\r\n  position: absolute;\r\n  background: #fff;\r\n  z-index: 99999;\r\n  border-radius: 4px;\r\n  -webkit-box-shadow: 0px 0px 4px 0px rgba(33, 33, 33, 1);\r\n  -moz-box-shadow: 0px 0px 4px 0px rgba(33, 33, 33, 1);\r\n  box-shadow: 0px 0px 4px 0px rgba(33, 33, 33, 1);\r\n  top: 0px;\r\n  right: 90px;\r\n  display: none;\r\n}\r\n\r\n.map-app-ls-float-widget p {\r\n  margin: 15px;\r\n  padding: 0;\r\n}\r\n\r\n.map-app-opacity50 {\r\n  filter: alpha(opacity=50);\r\n  opacity: 0.5;\r\n  -moz-opacity: 0.5;\r\n  -webkit-opacity: 0.5;\r\n}\r\n\r\n.map-app-slider {\r\n  -webkit-appearance: none;\r\n  width: 170px;\r\n  height: 2px;\r\n  border-radius: 5px;\r\n  background: #0f0f0f;\r\n  outline: none;\r\n  opacity: 0.7;\r\n  -webkit-transition: 0.2s;\r\n  transition: opacity 0.2s;\r\n  margin: 15px;\r\n}\r\n\r\n.map-app-slider::-webkit-slider-thumb {\r\n  -webkit-appearance: none;\r\n  appearance: none;\r\n  width: 15px;\r\n  height: 15px;\r\n  border-radius: 50%;\r\n  background: #0f0f0f;\r\n  cursor: pointer;\r\n}\r\n\r\n.map-app-slider::-moz-range-thumb {\r\n  width: 25px;\r\n  height: 25px;\r\n  border-radius: 50%;\r\n  background: hsla(214, 56%, 47%, 0.5);\r\n  cursor: pointer;\r\n}\r\n\r\n.map-app-hide {\r\n  display: none;\r\n}\r\n\r\n/* Geometry Descriptor */\r\n.map-app-desc-point,\r\n.map-app-desc-line,\r\n.map-app-desc-area {\r\n  position: relative;\r\n  /* background: rgba(255, 255, 255, 0.6); */\r\n  text-shadow: -1px -1px 2px #fff, 1px -1px 2px #fff, -1px 1px 2px #fff,\r\n    1px 1px 2px #fff;\r\n  border-radius: 2px;\r\n  color: rgb(32, 32, 32);\r\n  padding: 1px;\r\n  white-space: nowrap;\r\n  font-weight: 700;\r\n  cursor: move;\r\n  font-size: 14px;\r\n}\r\n\r\n/* PrintMap */\r\n.map-app-blur:before {\r\n  transform: blur(8px);\r\n}\r\n\r\n.map-app-print-config {\r\n  width: 20%;\r\n  float: left;\r\n}\r\n\r\n.map-app-print-preview {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  /* padding: 50px; */\r\n  width: 80%;\r\n  background: #404040;\r\n  float: right;\r\n  overflow: auto;\r\n}\r\n\r\n/* Widget measure */\r\n.map-app-measure-content {\r\n  padding: 10px;\r\n  display: table;\r\n}\r\n\r\n/* LandView */\r\n.map-app-lv-view {\r\n  width: 30%;\r\n  height: 30%;\r\n  position: absolute;\r\n  right: 10px;\r\n  bottom: 25px;\r\n  border: 1px rgb(33, 33, 33) solid;\r\n  z-index: 9999;\r\n  cursor: crosshair;\r\n  display: none;\r\n  background: #fff;\r\n}\r\n\r\n.map-app-lv-date {\r\n  position: absolute;\r\n  width: 200px;\r\n  left: 50%;\r\n  bottom: 0;\r\n  z-index: 9999;\r\n  display: none;\r\n  font-size: 10pt;\r\n  transform: translate(-100px, 0);\r\n}\r\n\r\n.map-app-lv-change {\r\n  left: 10px;\r\n  top: 10px;\r\n  z-index: 999;\r\n  position: absolute;\r\n  width: 32px;\r\n  height: 32px;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  background: #fff\r\n    url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAChSURBVEhLYxgKQARK0wSoAfE7IM4H82gA2IB4LRD/A+IRYsl/KmCQJfFAjBV0UIAPADHIgmtALA7EVAV2QPwViIee4VpATDPDQYAZiJuBmCzDQZpAmkGGUB2ADAd5G+R9UDBQFSAbDopAqgK6GA7KLJuAuJwCjBWAsjcomyNne3IxTgAqqECWgAouUAFGEzC8LAFVh6BqkWaAphU6FQADAwAR/VaU0KtJeQAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n  -webkit-box-shadow: 0px 0px 4px 0px rgba(33, 33, 33, 1);\r\n  -moz-box-shadow: 0px 0px 4px 0px rgba(33, 33, 33, 1);\r\n  box-shadow: 0px 0px 4px 0px rgba(33, 33, 33, 1);\r\n}\r\n\r\n.map-app-lv-change-tip {\r\n  left: 42px;\r\n  top: 10px;\r\n  z-index: 999;\r\n  position: absolute;\r\n  height: 32px;\r\n  color: #fff;\r\n  line-height: 34px;\r\n  padding: 0 10px;\r\n  background: rgba(0, 0, 0, 0.7);\r\n  display: none;\r\n}\r\n\r\n.map-app-lv-change:hover {\r\n  background-color: #ddd;\r\n}\r\n\r\n.map-app-measure-btn {\r\n  padding: 10px;\r\n  width: 3.5rem !important;\r\n  height: 3.5rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.map-app-measure-btn:hover {\r\n  background-color: #ddd;\r\n}\r\n\r\n.map-app-measure-tip {\r\n  width: 100% !important;\r\n  text-align: center;\r\n  padding: 0.5rem 0;\r\n  font-size: 0.75rem;\r\n}\r\n\r\n.map-app-parallel-tip {\r\n  width: 100% !important;\r\n  text-align: center;\r\n  padding: 0;\r\n  font-size: 0.75rem;\r\n  color: crimson;\r\n}\r\n\r\n.map-app-measure-tip {\r\n  width: 100%;\r\n}\r\n\r\n.map-app-w-16 {\r\n  width: 16.5%;\r\n}\r\n\r\n/* StyleEditor */\r\n\r\n.map-app-panel-content {\r\n  display: flex;\r\n}\r\n\r\n.map-app-layers-list-content {\r\n  height: 100%;\r\n  width: 50%;\r\n  background: #ffffff;\r\n  box-shadow: rgba(5, 3, 14, 0.15) 6px 0px 5px 5px;\r\n  padding: 0 10px;\r\n  z-index: 999;\r\n}\r\n\r\n.map-app-layer-style {\r\n  background: linear-gradient(to bottom, #464a5b 50%, #24303c);\r\n  height: 100%;\r\n  width: 50%;\r\n  padding: 0 10px;\r\n}\r\n\r\n.map-app-header-list-content {\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n  padding: 15px 5px;\r\n}\r\n\r\n.map-app-header-style-content {\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: center;\r\n  padding: 15px 0;\r\n}\r\n\r\n.map-app-list-layers-title {\r\n  font-size: 16px;\r\n  font-weight: 500;\r\n  margin-left: 8px;\r\n  /* color: #ffffff; */\r\n  color: #343434;\r\n}\r\n\r\n.map-app-color-green {\r\n  color: #eaeaff !important;\r\n}\r\n\r\n.map-app-list-group-item {\r\n  \r\n  padding: 0.5rem 1.25rem;\r\n  margin: 2px 0;\r\n  /* background: #2C333F; */\r\n  background: #ffffff;\r\n  color: #83879e;\r\n  border-radius: 5px !important;\r\n  cursor: pointer;\r\n  border: none;\r\n  font-weight: 500;\r\n  user-select: none;\r\n}\r\n\r\n.map-app-list-group-item:hover {\r\n  background: rgba(113, 122, 208, 0.2);\r\n}\r\n\r\n.map-app-layer-item-active {\r\n  background: linear-gradient(to right, #94a7e1, #9490fc) !important;\r\n  box-shadow: rgba(26, 16, 58, 0.15) 0px 1px 3px 1px !important;\r\n  color: white !important;\r\n}\r\n\r\n.map-app-style-props {\r\n  width: 100%;\r\n  height: 70%;\r\n  padding: 15px 5px 15px 15px;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.map-app-prop-row {\r\n  width: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  margin: 10px 0;\r\n}\r\n\r\n.map-app-prop-name {\r\n  /* max-width: 200px; */\r\n  color: #f8f8f8;\r\n  font-weight: 500;\r\n  font-size: 14.5px;\r\n}\r\n\r\n.map-app-input-custom {\r\n  background: transparent;\r\n  width: 74px;\r\n  color: white;\r\n  border-color: #e8e8eb;\r\n  font-size: 13px;\r\n  border-width: 2.4px;\r\n}\r\n\r\n.map-app-input-custom:hover {\r\n  border-color: #918deb;\r\n}\r\n\r\n.map-app-input-custom:focus {\r\n  background: #918deb;\r\n  color: white;\r\n  box-shadow: 0 0 0 0.2rem rgba(146, 141, 235, 0.25);\r\n}\r\n\r\n.pcr-app[data-theme=\"nano\"].visible {\r\n  display: flex;\r\n}\r\n\r\n.pcr-app[data-theme=\"nano\"] {\r\n  display: none;\r\n}\r\n\r\n/* Custom Checkbox */\r\n\r\n.map-app-lb-cbx {\r\n  margin: 0 !important;\r\n  -webkit-perspective: 20;\r\n  perspective: 20;\r\n  border: 2px solid #e8e8eb;\r\n  background: transparent;\r\n  border-radius: 4px;\r\n  transform: translate3d(0, 0, 0);\r\n  cursor: pointer;\r\n  transition: all 0.1s ease;\r\n}\r\n\r\n.map-app-lb-cbx:hover {\r\n  border-color: #918deb;\r\n}\r\n\r\n.map-app-flip {\r\n  display: block;\r\n  transition: all 0.4s ease;\r\n  transform-style: preserve-3d;\r\n  position: relative;\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n.map-app-cbx {\r\n  display: none;\r\n}\r\n\r\n.map-app-cbx:checked + .map-app-lb-cbx {\r\n  border-color: #918deb;\r\n}\r\n\r\n.map-app-cbx:checked + .map-app-lb-cbx .map-app-flip {\r\n  transform: rotateY(180deg);\r\n}\r\n\r\n.map-app-front,\r\n.map-app-back {\r\n  backface-visibility: hidden;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  border-radius: 2px;\r\n}\r\n\r\n.map-app-front {\r\n  background: transparent;\r\n  z-index: 1;\r\n}\r\n\r\n.map-app-back {\r\n  transform: rotateY(180deg);\r\n  background: #918deb;\r\n  text-align: center;\r\n  color: #fff;\r\n  line-height: 20px;\r\n  box-shadow: 0 0 0 1px #918deb;\r\n}\r\n\r\n.map-app-back svg {\r\n  margin-top: -3px;\r\n  fill: none;\r\n}\r\n\r\n.map-app-back svg path {\r\n  stroke: #fff;\r\n  stroke-width: 2.5;\r\n  stroke-linecap: round;\r\n  stroke-linejoin: round;\r\n}\r\n\r\n/* End Css StyleEditor */\r\n\r\n/* CAD */\r\n.map-app-cad-container {\r\n  width: 100%;\r\n  background: #0f0f0f;\r\n}\r\n.map-app-cad-aux-container {\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #f8f8f8;\r\n  padding: 10px;\r\n  display: none;\r\n}\r\n\r\n.map-app-prompt {\r\n  margin: 2px;\r\n  background: #0f0f0f;\r\n  border: #000;\r\n  border-bottom: #ddd 1px solid;\r\n  color: #ddd;\r\n  width: 300px;\r\n}\r\n\r\n.map-app-prompt:focus {\r\n  outline: none;\r\n}\r\n\r\n.map-app-info-box {\r\n  width: 50%;\r\n  bottom: 30px;\r\n  position: absolute;\r\n  z-index: 9999;\r\n  background: #0f0f0fdc;\r\n  display: table;\r\n  color: #ddd;\r\n}\r\n\r\ninput[type=\"range\"]::-ms-thumb {\r\n  background: #313131 !important;\r\n}\r\n\r\ninput[type=\"range\"]::-moz-range-thumb {\r\n  background: #313131 !important;\r\n}\r\n\r\ninput[type=\"range\"]::-webkit-slider-thumb {\r\n  background: #313131 !important;\r\n}\r\n\r\n.map-app-overview-map {\r\n  top: 5px;\r\n  right: 5px;\r\n  bottom: unset !important;\r\n  left: unset !important;\r\n}\r\n\r\n.map-app-measure-point {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFESURBVEhL7ZTJTcUwFABzgSpYDkAZILFWwloMnOAAlMBSAQJBDWwtsCPEHWZMconsxP7A7Y80ku3EjvP8nqshf8EKHuA9ftbe1WPLODAzeIlf+IpHuF17jG/oswucxiLm0EUfcA1HsI1j6/iIL+icLNzNO17jmAM9TKDv+pGsP7lCd56zeMM4PuF56HWwhMZ1NfTK2EDnLoRegkP08GIxFw9eYzjH0JpdSUxFsyXGHrpDtR3jBG9/mnE+0DRs466bxRtjf+Jc10jy7x+wQnNCtOtAhFPsDFHfIZvnqVxvDnk/9BIsoju0QkvZQud2pql4t1g0JYVmNT/jWej1YAi8hyx/J/Yxib7rB7KuCvHi8m7xItvEUWzjmGHxHRefxSLcjeEyrh68RbRTa9sD9Zn3zxQOjIdmZtygOa62HZvHIb+hqr4BOYhcQtk3RJUAAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-measure-line {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD5SURBVEhL5ZRBSkJRGEbfKMhB6MiBthX34RJajKtpBU4dFoQ0KKiJOMmBQUFk50QfPN5IvdeJHTiI8Pg+vff/X/PvGf59noQb3OLk91tlDP/GD3zHqiUJX+A1PmC1koS/4RdO0XuoUpLwO+zjHJd4gcUlCV/jC1rQwxEGj+sTvfiDpivhT3iJ7dDgv7hFn/P5vUn4M+5whl2Kw1foLzf8EQcYisPv8RXHKJ59KA7foIFX2KU43CVyzh1Fp6XN0eGOliPmqDlyLpFznuORo8ODS+KyuDQWGhiKw0O3RKqFh3aJx1U1PKTEV3L18GCJF3+S8HDQi+vcaJofW5hTEaLE0s8AAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-measure-polygon {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEkSURBVEhL7dW9SgNBFIbhVVS0sfImtLS28we0FhRbvZKggsTWShsvQKxD7sJCULCwsFJRIYWCqO87ZBtJZiaTlPngIXvCmT2zYXdTjTOqHKGDk1CNOEv4wi++cYktTGOozKIBT/6GD7S7xw57xQUOcY1FJDODZazjDj9wxwuoY88mPPkLHKYrJOMO6wX3WEUs83iC/V5JMs+w2c85v8iIQ+w/D1UiB3DAfqjy48kdMhWqSFbgAD8HyRpctxGqSEoHuPOsn6l0gGnB5+Q4VH0yzIB3uNYnvm9KB0zgAT6U0du1dMA2XLcbqkhKBkziBrfd42hKBuzANXuhSqQJm8/gvZ1yik88Irl7U98Jg3JdVvxj8bXslfTa8X/22Z/1ohunR6rqD/X7XAj/rGa6AAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-measure-azimuth {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH4wIWFDYpgzeaGgAAAMpJREFUSMe10j9qwmAYwOGH2ElcHDxBV2/QxdEDeIwugtADOHgBb+HUqUNHwcFDCNLFXSj0D+qSQBCNCfneDwIhCc8P3jcEn07FuwX+sY+Kn/HWFsmiR/RU87sZDthgFzGic+naYpJ6RF0MMUUfK7xjELHkDK/4zsf1nD/v4RPjtks+YYkXfOGY4x8Y5fdJf9Me1vhrspu6gQL/bYrXCbTCHwVa41WBJPi9QDL8ViApfh1IjpcDIXgRmEfhReAnCi8CYbhoXDSe7FwA6GhDMneS1P0AAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-measure-clear {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFzSURBVEhL7ZZLK0RhGIBHShaKrNyWysLazkKykZB7shAr+Q0WfoNY+AeWyq/gB7hkZcFCkqU7zzP11ZfGnO+MOVNqnnqazlvne85t5kypyX+iBQewvbzVIMbxBr/wBXfQAymUSXzGTzzDJ/QA9rGw+BR6hh+46QCG8BYLi0+j0XfccBBRWHwWQ3TdQQXqHp/DrGigbvEFNOpC2w4SiOO7DvKyiK/oAuoT3IkpGH9A9+92kMoSvqGXdwuN5o2foPsMl7cSWEGDuuoAjOWJz6P732ObgywMuYNnu+wgIjUeP4wzDrIIR+l98f5WIiseR9ccZNGBj2jUA6iGsVM07meI547KCLrQcXkrm59xv9+5o9KL/v7eYY+DBOK45o4GDtAFzjE17pn+KSqteIQudIFehWrUdE9/I45fYh9Woq7RQFa8kGggjl9hP0qh0UAc923jb294aVzjYaKDmBvje+j/K4O1OIo149drDCdqsAubNJpS6RvYNZeG4sh05AAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n/* Controles padrão */\r\n\r\n.map-app-map {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAJCElEQVRIiW2XfVxPZx/H305nx3Ecl99+krRJytPabMxzHiuFWcuyqOQuRWJEE4ukUFvykOKmrEwYultKrBgyssxDnmKGmLjXmORhZszsvv/o5fAr379+51zX9Tmf7+f7+V7X9WPqhUyZF2KJ+9L27s7+8uCx/gIgcHqgAvBB0Q0JwL9ipwagF1wRg3s1k56te8U+RwCs2hIjAM6N76gD/GvTIw3AY9dF9dncaue7Gr5pc8yx+yusqRezDm2wzesvy02dH+oA3+kHNYCAtU1VgPeKBpsATNcc7V6v+lv5IqK7XNN7tbz5j9129bFejPuhMUrSojAbbCIfa/vWbNZCNi7Vng2Odv5HA7Bq1cV4N/x8uQyQEDVa9RtXLQ3ac92sbj2se9x6oE8fVykD/PDLAP3Z/AVt5ti8+MFoz6t6h972clmG03OFy+wOK89+J4feti1c5vP2s+f2ge10gAfFTUSz0jOqS/ZYGWDg/xqL+tmkF0QZcv79m2pgXr2cZQI4UHtVL9YTtPQ25XUJlR2K114EcI4eYPPJnV3mF9/1WJshA3i+H6YChEghxpoT67zVYyErTd3GHtCqPnbSKrucVgFe/XmeeHJyvzTGdb5tn3HzFYDus4XUb1qcxOe3zxsG8Yy6J5qUtFC81o7XvmzS3IIMQLtBF1QAx8yN+uPqJca6qgwfa4Do6dEaQE7OXGmielyal/pEBcgrHWQksT0rSBrY6H6dWlPGvWMMmD1bSSm9fQ2zxQ+sVVaeX91AVoAVeZGOLz6/eatIBXD2Hqb/VLLQqOWjmGR97eIiPdEu2QQwb2/o8/pPDrOVQjekqgAfl8SZO4VmmLyrjisbK49JAPabftABHkZkak06bhQAY5PtZIAebd4x1HlVPqmcTbynLt8boALc9FgmA3y13c1QCIDdZmcdIDHrlgCQFp0xslv27R4D0PuKv/jN5kf18J0Ui+wH1fxpsQ88GeFjOFup8FYTey40rX+3j+q9IsgaIDZ/gmy60E2n5SUfY2HexT8VgG1VBTZJ/R9rACVH6xr/89pOYkb6ST3663Qpt9V15XqFpJU96irf2Ols7Xv0e6M0Bw8e0hYu/1BasDvCcDXA5t3D5YDeg9Twz/LriPsE/W4wvBnxlxT210E51/O+frs0QNdT7hjtkTc/X2o6sKMoHuam9qmZKvUrC1GOffGWzOjpBvE3g/cbWOszXeQT0d3lU9vTVQDJ5aIAuFcdVzdn32QrzU+3UgFmXR2iA5S2nKkAXJ172xpg7qcF0uk950xpmyYZmeWEb9HODdthJ5L7KgD+vtNsU1MzxE53a4tShMZFi4RlW0RchIcZIP5UtVaZP6Su3lmzk0zUi1WNc8UPuXM0gIM3tyvD2vwmxXcNk2bEhtsBVD1yEgCO1oP0mopOosj6uOGHAZ3jTb7pCwwCcZsPy2tjI8XIsBXi05GT6j46LDFLvvbrQXGjp4MKEH1zlQ6wPtrvdUV2MaS767FNGTmqhZiYN0PJiu3tAOA4XNNSt3hpf7lst3BswCR3FaDKbbuevURYJ4QHankzh9kChId9ZWDyyogqBWBx4FxlTZcWlrYHih1yxI4pSWLbG0LKCSszxjtbZSu7ZvYRAE/n3Htprzf/Y68G0C7YQ/n1gqv+IHS56hLlYE3JnpkWJ1OAZ2QD2e3lFQ12MYDSS0eUwKXHhJx0RFn1TqwAuOGSbdOisPylJ5Tj8gEmgKjsXvYA+A0d+NzZPb3VxBpVaX3hlna37XoZoOPPOerZO33FuVYeBoEl0+brJxc01nocsld2N6nbJM5brZJ9smdITcd/pUYd8FRmNS57KeE5ntHPz4Hr0WEWfRc1oFC59NZnJoBrtW8qnYsrrD0m7xIAN+/dU0/nbrMoSQ/7hyrAlIL9pk2zJ9qmtvtQ+u/iiwZm16C5OvWjv+sFo1+1yx5SR721GpO2RHt8zFf+2z5VD9Hf0BLH6DKA3LnW6NsjXYqVzKI1StysU8Y7528cDazFp8YrAH5fTnwXoHHa0+c+CI15aDDpm5+uOPt9LwEEp5cYtQ5yjrG7PDZSB0g27VStNtkYAO+Pm9R+x+kdRvbtJh4w5A2tvqzn5A+xTikvMsgsyxzzUvnZOHWMDcDSb7uIhYds5frjjbLONHD9s9jX9SPzvMf9leL44QJgaVhHMb5ZuYXbo+Zc1BI/cakrQVL7HvK5/EIt5ZvJ4ohHoeSxz84CfK/bNxrAkc6yAnAqN0gFGDii0oK9SZ4sBdc4afvS/eW7SRcbkG4QmUPdHLd0mGIYofkvC7T5xaWyZ+vh6vSkFFNuyFIRcsXLou3ct8Ya8nV2d5c6DPd9HWChvZsZoPL3QP3BtaP6cdvNBu6apRPV11Jq68gmbs1T97wtyekBe0yF6VMtMrief1y+EnVCAGy4Hi6SfZKMNthoG9BA8tkB5Vqbp41UAI81TuqqzIU2q7tdMgj2chilA0RU3NbZOjVWB3BNXW2YLOPjXro61ax/0m+LWvOHrRr8dZYYOv+sATDvQHO5v5OfDnDiA1/hFRsiH3G7oZqzN5tvNG6iL5pRbSTw1tAl5rS+i0S5d4W+7j+zRHGUv0MdS6+VJoDabf9WAWJaJRhmCC6bIc7m56hOPyW/1IkFvS/r/cKTpQvz8sQHK+tuI21nZRnrx98plQGmbE0Qbve2Ka7xpWaAQ7XNBKOsfpQBxtxvrOUvaSTOXG4rNozvJ+S2LZXtIxZbbCo9hrjo1TvyBIBPRIk43XNU3bXV+Tvr94Jj9Ja57+kAd+wnyACfji7XdxT1twZIezJSBxjxaqY6amiUDbPGuNpkntkkfhrdVe61PtRur+MbAiAge42pZMQ86bFHghRwIMTiqptmJYSva7AFqdWRifbO+R00gO7m5RLAoiZddQCv27sNh4f5eNVhNd9W2uBUqcy+L9d06WUhb6TTBGVdRqq5/tz1R3/VAHZNS3AIqrylAZzaUGjxL+LUOhvpetAvxobUbZJu+IWPXPtpAHmtRxsmy8/5wnb3azv1grmtxZTXqrQJ320wfxmQ2z7woY3S5/I/AiBSPSDFdZqsPD2dbqFA/QjyXmSb0KfGSPL/jS3dsNIryU8AAAAASUVORK5CYII=\");\r\n}\r\n\r\n.map-app-blank-control {\r\n  background: #fff;\r\n}\r\n\r\n.map-app-zoomin-control {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABESURBVEhLYxgF1AYmUEwzcBiKaQZGLSAIRi1g0AHi3XjweyjGJgfDIDNwAppbQAgM/jggBEYtIAiGvgU0r3BGHGBgAACVPS8F9ZXtjwAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-zoomout-control {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAnSURBVEhLYxgFo2AUjALSgQ4Q76YQg8zACWhuwSgYBaNgFGAABgYAVCMYEbu8r0IAAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-undefined-control {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGGSURBVEhL7ZQ5TsQwFEBHYiu5AEsB9FwAEGtBATegAgYqSrgE9IDEBVhOgEBQcQC2noodIWrgvUwsZaLJJBko50lPyv+248T2d6XNfzCHe3iPX7F3cW4WW2YEL/AH3/AQt2OP8B1tO8dhLMU4+tJHXMEuTGNuFZ/wFR1TCL/mA6+xz0QOA2hfJyn0J5folxd5eaAfn/Esipowg67rchSVo4qOnYqiDPbRzQtrPonGm1FUzxa6lBNRVBtj7OnKxKPoaQksoV91EEX1mLPNPoFjvK09NuYTPYZJRrG79lhHD9qWxLG+I5NGE5QhdwIrNLlEgQ60ojdiPQzm0pxg0yVKb7Is4gO63knNLWAgbPJuFGUwjQ62QmUdja9wHntjfTb3jVa6hL5Nj6l4t1g0FpoT+ledmMacbfaxml/wFHOx3L2HLH8H5jGI9nWCwpeeF5d3ixfZGjY6puZcFvv48jEshV/jcrmubrxFtBPrsxtqm/fPELaMm+bJuEHPuPpszqukzV+oVH4BYddjJF0AFw0AAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-subpanel-control {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH4wILDCQEDlrLNgAAAUlJREFUSMft1T8vg1EUBvBfqyhCEAabwWAwSKwmu8kqkUgkPgSb2QcwWEQi8R1MJpPBYCARi0QixJ+0Um0tp0lzUdV2MPRJbt4359577jnPc869dPELMn9cV/tWY3TkgF4sYjo54AanKLWb5SqecYvrGLdhW/1tc67uP4+BZP4FC7jHOh7DPob9mDvCcLKviEJK0QrW0F/H7wfmMYUTvIe9H0u4w3ldoJlYc4yDNIM5LGMnyeQCZfQlGpyhJ/FRwBauvjugjAdsB12toIjNyPyLBuqoKbZRFNWfRE6RDwoqwWslmc9iKGgr1URtVEVVTDTbQM0ilzRdARsYDFFrWrz9kMF42B9i/xv2GlH0isM2g95No2jlbmr6+sk2qoBOa1C72CYx2qK/p9RnLnE+Gl2YaaMHRqJAvvA1g9lvquWvyEaQl93n9n/gE6+CQvhUYKZ6AAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-measure-line-control {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD5SURBVEhL5ZRBSkJRGEbfKMhB6MiBthX34RJajKtpBU4dFoQ0KKiJOMmBQUFk50QfPN5IvdeJHTiI8Pg+vff/X/PvGf59noQb3OLk91tlDP/GD3zHqiUJX+A1PmC1koS/4RdO0XuoUpLwO+zjHJd4gcUlCV/jC1rQwxEGj+sTvfiDpivhT3iJ7dDgv7hFn/P5vUn4M+5whl2Kw1foLzf8EQcYisPv8RXHKJ59KA7foIFX2KU43CVyzh1Fp6XN0eGOliPmqDlyLpFznuORo8ODS+KyuDQWGhiKw0O3RKqFh3aJx1U1PKTEV3L18GCJF3+S8HDQi+vcaJofW5hTEaLE0s8AAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-zoom-rect-control {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABp0lEQVRIie3UsWoVURAG4C+m0RuJaWyU4K00KSwEhYiFjeC1UvAFRCVYxcLCQotgFURzawu18AWEgEpsJKB5ABFEhCiYXDAQQUSNYK7Fmc0ui+TuRlMIDixnZ+ac/5+Z8+/yr1tfzf2HcQajaKCDZ3iIz39SyF48QhereIkXWIrYMi5uFnwkgD7hMgZL+SOYDaJbdcEH8AaLOLDBvj7cDpLzdQiuYQ3HMBkAC2hGPot1g+QpPip0ua0HwQVp9s8Lse3xwK5CvIvr2I3TVarfF4fGwz+HlnQfS7gX+XZ0Irro4G4VgrEAOFmKj+Br5O7/5tw8HmfORiP6FutArM1Yx7Ej8q0gbBbO7cSXHsWvA69iKvzJqC4by6g0jo508TCEH7hRhQBmJIk25IqZL+RbchXBlXg/lG3o70HwDhOSMp5Ete8jvoITeCWpbBEPpI+uXbUDmIuq7sjvo2zHg/wD9tQBnw7wOfwMkJs4i1O4JClmDa+xfzPg0+GPSXfyXT73Lt7iqqSsytYugRetgYM4iuE6oJlNyaX4121LwTNNbwl4ZuX/zn/zC+tNa+Y+MqkbAAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-layer-switcher-control {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEXSURBVEhL7ZQ9DgFBGIZXqaGjcAIcgAu4hZ9aHMA1OAC1xDE4AIXOCSRUNBLhfZL5kskaLDGFxJs82S/f334zOzvJXz+lvGg7sL+mmhiJvbg6sPER+0hM2BELQcOzmIuWAxsfMXLIzbSqqvCn3YqhKIm08BEjx18VPYKqiJmwyXaiK55NRowccm2l9KDXQ6UnO4ixqAsTNj5ir1YaVENMxUXQwJ5Lh+/jSS41T1UQfbESFB4FhU1RFrYqmxYfMXLIpYZaetDrTqEXTIQ/Wc5hIkZOphf4Sm/RWgxE0YGNj1jmLTKFPvLG2ScHNr63PnLomPaEHVP2m+0AbESMnMzHNOqP5ovJolwVIUW57EJiwijX9V8xlSQ3T6V5W1j4rmQAAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-landview-control {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFQSURBVEhL7ZW9LkRBFIDHTzyAVqNQegQFjUg8gFrhDbQiQSLhGTSWkqg0KhEaJCQ0KiKIRK3z8317Z5LrxsW6U+6XfNmzZ845szu7Oxu65GIA1/Ahuhpz2XDgG25iC99jLhuP6PDEFvpOsuGw6gb3RZiHFfRYHLwd42XMhsM+Ki5hFqbQgR7RUNTY3CQ2xmN5xvLX0tica405xKMi/II51xrjoLoNvst3jEPOsbf9rMDY3L828HzncL39LIRd9AO9xuGosTnXxFp7fr0+RvAGbd4xAb7aeTQ3FjU2l96VtebsdUYtJ+ivdhp7TETS0PIGPiastecJj03U8YLplZdJQ0+j1Q0SHpkzallEm89wBgdRRvGgojmxxlp77F3AH5nFO7TYO+cK93AD/U9QY3OuWWPtLdr7J/pxAr3k9vESvT1fo8YX6Jr31Dj2YZdOCeETu5xh0Uy6ArMAAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-home-control {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC4SURBVEhL7Y3RDYJAEESPHqQbrEs7wF9MjO2Y+GEZlgIzspss5x65Az5MZJIX9sjuvPBXqUAncN40LLyCXuC8mcSW82vn1ZK4nG/v36LMFa2W5BQslpQcFkuKD5DsG7t4k3duuMubpMSWkwaUhjd6/yU5gDd4Ak+ghzE2KmAHu9g5SQ2OgEue4AUuwkP+2aiAHexyo0ueoB3HT84gJYhvJ9kFvyO4g5MhJbA7vMkWeHgCj1nBnighDKohb+UlhM7FAAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-redo-control {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACdSURBVEhLYxgFQxYYAfFxIJYC82gA7ID4KxDfBOJRSwgCsi1hBmIdIHYGYhcCuAmI/wMxUZYwAnEBEL8CYpAmUvEGIMYL5gMxSOFeII4AYmwuRsdE+yAMiEEKO4EY5BNiAElxcBCIrwIxC5hHGJAcwV+AuBfCJAjISj2g4GmHMPECspMmsRaQXRYRawHZYOhbAMo0KhDmKKALYGAAALrqO+YEtsJOAAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-undo-control {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACfSURBVEhLYxgFQwJIAfFxIDYC86gMQIbfBOKvQGwHEqAmGDUcK4AZ/h+Im4DYhQB2BmJtIGYGYqLABiAGGU4qfgHEBUDMCMR4Aak+AOEIIN4HxCA9s4CYICAnDkAu7wRikCUhIAFCgBxLWIH4OhDvB/OIAORY0g/EnyBM4gCpllQAMSiYSAIgS4gti8iygBQwagFBoADEoMw3CogFDAwAOvU7j8lqY48AAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-heatmap-control {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAhFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADu3R4CAAAAK3RSTlMAWwE5XCCSgBMGhfMmOKUlpFYc5WRUz5EfwPKEZQf05IbtubNRMlBaAu66NouIMAAAAItJREFUKM+t0ukOgjAQBOChtMByiYJ4o+IJ+/7vJ0FIUYiRhPk16Zd2s0mBScP2b3hKKXrghA4ks1EX0+pA1EJVzNXnU8J4iBHD/aafMhcHpcHn2bt7vMX+2LnRnMP1dqD1nwsOwvVyH4aCz4BVbaxihXmqoeQcCAKAEsJiqYFuNGr4xv5KC71M+xFeZVwMfFoS4yIAAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-transp-control {\r\n  background: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAzMiAzMiIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgIiBkPSJNIDYgNiBMIDYgMTAgTCAxMCAxMCBMIDEwIDYgWiBNIDEwIDEwIEwgMTAgMTQgTCAxNCAxNCBMIDE0IDEwIFogTSAxNCAxMCBMIDE4IDEwIEwgMTggNiBMIDE0IDYgWiBNIDE4IDEwIEwgMTggMTQgTCAyMiAxNCBMIDIyIDEwIFogTSAyMiAxMCBMIDI2IDEwIEwgMjYgNiBMIDIyIDYgWiBNIDIyIDE0IEwgMjIgMTggTCAyNiAxOCBMIDI2IDE0IFogTSAyMiAxOCBMIDE4IDE4IEwgMTggMjIgTCAyMiAyMiBaIE0gMjIgMjIgTCAyMiAyNiBMIDI2IDI2IEwgMjYgMjIgWiBNIDE4IDIyIEwgMTQgMjIgTCAxNCAyNiBMIDE4IDI2IFogTSAxNCAyMiBMIDE0IDE4IEwgMTAgMTggTCAxMCAyMiBaIE0gMTAgMjIgTCA2IDIyIEwgNiAyNiBMIDEwIDI2IFogTSAxMCAxOCBMIDEwIDE0IEwgNiAxNCBMIDYgMTggWiBNIDE0IDE4IEwgMTggMTggTCAxOCAxNCBMIDE0IDE0IFogIj48L3BhdGg+PC9nPjwvc3ZnPg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-snap-control {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA21BMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAChqpsaAAAASHRSTlMAiIvuIkQwq2xm7whMM8zHqgF1Qi73JAka2zX7WrL0P1UVSIYPf/iAFK4DNAoOiTEvPXBHeRsRJSwX03viKNK9PNbg1Yc5xGKxkKFZAAAAx0lEQVQoz7WSxxKCMBRFwSRiiwoICHax9957ff//RcbRBHTjyrNIuWfmJjOJJP2BLDDSX2GqKss56CkwkGWt5MtrBkJ56IeggFDGtoSoGxWvagwFIQIRNphhRkeSghD7FBxPtIq5fNHk+VWDi/5aRp/lIS4Utklw4QZ94oj3Qigjn9iEd4kfVSp2dNzlYrkli+mP677FIcmYfQotU6Z0DasTYEon4AjRsJ/nA76Dzqam6vVaQ0JcuJ1hTkhb/XqTcpxR+scXeADhwRv3JOoalwAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-layers-icon {\r\n  height: 25px;\r\n  width: 25px;\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAA0lBMVEVHcExsbOhwbOZva+RpaeFwbOVwbOVmZuZwbOVwbOZwbOaAgP9wbOVmZsxxbORwbOVua+RwbOVwbeVwbORxbeZwbOaAYN9xbOVvbOVwbeVwa+Zva+VwbOVwbOVxbeV0dOhzbOZwbORvbeVxbONxceOAgNVwbOVvbeVwbOVwcOBwbORwbOZvbORwbOVwbOVwa+RwbOVwcN9ubuhxa+VxbeRwbOVwbOVybeRvbOZybeVwauRvaeNvbOVwbeVwbOZxceNvbeRvauZxa+RwbeRva+VwbOV9N8CAAAAARXRSTlMAIfCFEbj9Cvv65gLEBaz+Q7vr00a0CGHHlF1F7PGICyiZbC0SBrl1iRmtoVXp9ml0ECzFc22AL7UxMC6VYsgJXjxfVHeOtgGvAAAA1ElEQVQoz8VS1xKCMBBUwIIIWEBR7GIFbNh72///JY/BGWDEV81DZm+Tu73bJBb7/UopqUi+1aih3t5/XC9rSCY6iSS0cjCxW2GQYeOE4mwGTOXw5jkVSM/EdyTO0oDKeUGpmoWct3oEe1ZeRvZ68evlCoA9vA1toJDzaUGXeBTXDgBnXQQv6YJ3YPRJZ0lg8VzQviSdvhHMWc0JzldujiKEdSbmw5yEdbzepmMe/Hjq9lYtBeYZ0Dyj+4jmGZDOlov24LiJ9O18akZ7vfvyPs0//IoX0y4csluMseUAAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-draft-line {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAQAAABu4E3oAAAAAmJLR0QA/4ePzL8AAAA3SURBVDiN7cvBCcAgEACwWBz1VhIEhz1X6P1qMf9wuCb0WphSVMKQlueGG/4XCGlq7wNd1MIHbeRWJblZZxmkAAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-draft-arrow {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAQAAABu4E3oAAAAAmJLR0QA/4ePzL8AAABtSURBVDiNY2AYjkCaIRQDeuDXEsDwHwNeJ0bLGQZXBhc4tCSs5RQQz2BgJNYvIC2ODFOA5BwGJuK1OABtIEETRAsDKZpgWkjQhNBCtCZkLURqcmW4y2COxGcEBjdJQU6C84acpn5SNEA0DVMAAHl3OhlDHwlHAAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-draft-text {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAQAAABu4E3oAAAAAmJLR0QA/4ePzL8AAADHSURBVDgR5cExK0RxAADwnzNQkkmKklLGK9YrFoYb2fkATCysVsp28QY+AB+Ancn5DqRk4clytzzvb7hBL917/1v5/fwDdSfqBtKSaxlAzYtHr4ZFWxMcClZFu/BuzJtzkUZ8OMWZT6OibAiWsSJYF+XKsxqGPLkUYVzHkZ5jXRMqbQkW9SwJNlW60ZVKpVKpjmsVJmXaEolEIvEgM6XUjmDBj3nBtlJ37hW13SoxK7eraE9uTl8HvswompbZ11dD029NDX/UN2KdN65n/cPMAAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-draft-image {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAQAAABu4E3oAAAAAmJLR0QA/4ePzL8AAADsSURBVDjL3dMhC8JAFMDxv0VFGexL+A0MRhEsJu1iMQlGk1mLZotdsExBg1GDIFj9BrKwlYFgEHGewZ1uboez+l56cD/eu+Md/FvkqcbK/JtMEbFy6icOxa/pBImlGDnBCBuDDGDFI2UEawRtNdGZk/OREoIdgpaK6OwRmB7S6JNiyJEJ6Wiis+dGjxMmOTS2CJYkX6dC5AnqQIETJjtcZgH0QewXkJd2aQJdHwoQgys3Gl6VZcOdlld1EKzCd1n4OmhsvQ4yZKfQYCrwRnbUI0cDiS7hHatwwGWg2LAx5yD5eZPlf6nF/y//EQ9pl6D/UTP0ggAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-draft {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/4ePzL8AAADJSURBVDiN1dAxLgRhAAXgr1kJmpltNLiEwgV2E9nEOTZRUXEPTkC11UbDBSjIhlArNtvQWLqZkZn5Ffr9/22IV395eXn8u+SGLs1d2UzjE0Hh1IfrNF661Tpw5j3GM/caRzrGWoVxvL3yZm7HihvBMD5mYMuLT4dKE/miMXcq+2Dbq9qDbhpnT+lxGV4s1/6nfN2TxoW+DgaxI+kJZmpBP4VzotW1oXYeG/OTkS+7MjNNvB2mgkoQPKfwXGtq5FjPWpyzKkthv5NvpZZX/6c3/V8AAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-draw-point {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAAmJLR0QA/4ePzL8AAABESURBVBhXdc3ZDQAgCAPQ6qge+wkOqHgSo7ZfvBAAvrGIYBACjFJGmWWZeuKmVj+QD6QXpoHhQLce6S7pfyPnk9QrXam22itaBXqagQAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-draw-line {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/4ePzL8AAADgSURBVDgR1cE/KwQAHADQ59KV1cAo3CJJyu4bkOU2s8EgoywGJ9sZdL6AiUImKTaubKbLYjHZru6Ou8P9DDdI7u947xlU+95l9KEqlPVsQs2XPS0kLUr6a8i1sikt3QoFaUtmjUkg5UxY10ZRCCGE0PCmJlQMaWPFg5K6bWkbdh0pCS86SimoWtOUsmVaF6PuNBxI6NmwnHBqRB82fcsb18WOCzOaVpW9WtDBvBA+PLlx4tC58KlkRRvHQnh06d6zohBCuNJSVsiZ8ytpUl7Rsn/21YWsnlWEmj5kVOwZTD9IclJDDCCzAwAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-draw-polygon {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/4ePzL8AAAD6SURBVDgR1cE/K4QBHADg510UF5N8AW/yCWyUBbPVMZBFWa8sFmWnlMJA+QDyZ7ZalcW/XFL+DJyoK9zPJF7eO1bP479IlZWlftFm2oAhC+6EULFpUreiokSOVSGEZ/tu3dhyJYQQRuTYEWrGNPvUZU0IRTk2VA36LrEk9Pih4NGqPO1ezfphTOiV78ChJhmpE5cS+c6EfRkXwr16noSKjLIQFhXk2fNiWEaqZNmbc/OKEllHduXqcyOEEV91qCmpY0IIc76aEnrUkRh37VTBh0E1oV8Dfd4sItFrTVUI0xpaFx5cCI82bFvRqqEZIRwb1eJPUmXnOv0P72tmXVA2Iq/IAAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-draw-gap {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/4ePzL8AAABgSURBVDjLY2AYtOA/EXAoadjAYM/ADYQODJuI0VCOIl5FSMMGjPDbjF+DPYYGR/waeDA08JKqgQ+/BgcMDU74NWzC0LCFULBWoYjXEBNxm4EhwwOETkimD7XER5SGQQQAN1P0839HK14AAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-draw-buffer {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAAmJLR0QA/4ePzL8AAADzSURBVDgR1cHNMQNxHADQd0m6YM3w14UcfJRCqAU5YYQSIjpAaEFIWhBjE7PuP6ednY3Emff8B3uujX35MnJl1682PQm5nlMdPVNhIFmiJfdmX0OpoW0i17LAptyzVfMyQ7nkh0dvViySmXgwZ0/Yt8yhsKPmWq6hkiSVpqmumrGeyoUQzlX6RmoKx0pJCCEkpROFmsKJUhJCCEmp41PN2I3KuRDOVG6N1FyZaqgkSaVppqtmVziwzJGwbc7ARGaRNe/u/ZDkhjLzMkMfNizQkptoayo1HXn3YcsSyYMw09fR0TcT7qz71Y6uV4XCi0vb/r5vKaNcZu4bxvAAAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-create-geom-point {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABN0lEQVRIie3UzSttYRQG8N85XFFSRjcZ+M70ZqKugRKlpAwkIzMm/gPFUP4DSZm73cFlIJIyPIxkYCBD5WtwihH5uIO9Tjjp1D7MnKfe9rvWXvt51nrXejcVVPBZZFLE/sBvtOIOhzj/qkRmcY2XN+sZG2j5LPlyEG5jFB34hXnkcYXucsmngnwx7Axm0BN2Fy5wjKpyBE6R89qrbAguvIkZC9/4RwTZEuTtkeEaasNuj3eNsW/CJm4wnDb7vshsEAPeN7iw9iI2h62PSKpLCOTj+RO7mJAc1Tr+4K9kskQlZ2kryOIS/4p8xT3oDd90WgGYk8z7ZNgZrGAk7AYcSSapvhyBGuzjEUtoDn91iJzgAUPlkBdQh1U8SY4ij/vYn6G/1Mdp/kWdkpvchlscYEdSQQXfGf8Bu2pCqH+dkrcAAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-create-geom-poly {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABxklEQVRIie3UT4hNcRQH8I/xfzGk5F+yIAoxadQUb/HMPIqdvSiZhVjYiGyUxp/YTxaUZGMhSwuTjaxsrBTFJH8WPNP4k0bJs/id591u7859vWGhnLrde8/vnO/3nO899/Df/pBdwFdc+hvgm/AdDfzADezD3JkCL8C5AJ/EJ4xhIsg+4hpGcBcbOwGdh22o4Rl+RsVLczF7cR31IGvgTicE9zMJzzFYEr8IbyN+pF3AnNx7X9zr2IqpEoLPkjSHpG5LbTiqGS6J64uYE9iP3k7AoRoE1YLzzXikJWPz+oIz6JkJQb80Se9wFGuwBBXcjrxbmNUNwXy8xAusCt9OnMrEnI7cI90QHAz/UMZ3NnzZih9GEb+tVLOwmjSOD7BBkmtlnPXH1YubWIt1zcT8mBbZMryOiq9iV+bscdwH8Sqel4tOOu2grqX9SeyOamFPvD/B6vB9KAKqav8NDoe/kvG1+wZj0UXhJF2JpFFJ9xrWY6Ek0VOtvTQkre8m2LHIPV4ETtqa+Z/ojbRzKviGcRzAYszGFmmrNqStOq3s54PkcqaDGlbE+XZJ63wRU7iozdBM+9cVWA92YEAazXHcw/susP4B+wVwxHJVO2+D1QAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-create-geom-line {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABXUlEQVRIie3VMUtcURCG4SfqqoEEsVJBxPwLIUIU1KCFELBIsEsVSCy0kTQLQgrRSq3cxj9hkUKsLAQRS0mRmMYIIgYCFkkkWpy5uFl2i71uUu3AKeY7wzvnfucMl2b8x3iAIgb/FXwDN9Gk4fD1gG9G3oQ34bXh2VNcKYO3ohstjYBfYza059jB72j6Ex8xmgee2bIY2mrkn7GMd9JXfcUfLOWBZ57PRb6OQqxutKEdpdh/nQf+GN+x7e4OxqJmOPIW7OIcnfXAYSa0p2W1lQ1gPLSpeuDwXvK4AwvSHXyL2tPI36IrtPm2KvA1yecS3kRhFtdRUwjwIXrQh0+4wFkcgPTC/opiADdUH6KJ2J8u06pZ9LKKhvSzKNaAi5Of4AgPQ3uGSwxF/gjHsXIN36Rk1S4GKvaeYE+yZiQPPItXuJKmdwdb0fAXfuDFfeBZ9EtTfIAv2McH9JYX3QI6cGQVt916GQAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-move-geom {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABgElEQVRIie3VzUuUURQG8F/5QTjiJiEJNwYSU6vWkQwhgopbBfdK0M4/IST6B2rRB7gOqk2LUhF066ZVlAt3gliGgiGGZIt7hoZpfN93ambXA5fLuefc57nnvPeel/9oER7iCI/aQX4DJzjDKZYwga5/Jb6EB0F+gEOs4luI7eM5FvEG5SKk3biFUXzGzzhxf13MOF7ga4id4VURgZWaDVu4mxPfh52IXywisBfBX6QSFUGflO2zIsFzITBXkLyKTjyJOROVEKg0QV7GnSDvrXdebIKoEa5LN+tdiBy1UqADs/iBY0yhlLepovkSvcaH85x/k0EZtzP8wxipGrlfvQH5mvRyb8baEC5jPuxBLEjtZKOeoCK7RC/9foh5YxMXmhUoYR33cC3Ge3yssSfDHuDPEk3GPN3AR2ofE7iK7Vj7Lt2kqn0stZjdRic8kJ32rtS+a5F5i+pP+Rj38RTL5+zpjrlDatdj0r/hLWYio5ahR7pVn6SytQUlXGkXeS5+ATfbXwMxoi8OAAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-edit-geom {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABXUlEQVRIie3VPUtcQRgF4EfBL1CLYBHTWsXOxnqRNNEmVWoLG8EmlZIgK6Ii2guJhtilEn9A0ihW2tokvY2JIRELDdG1mDco68rOrmsjHhjmXu6Zc+b9mLk8okFYwAkW70O8H2co4R/WMYyWuwq3YzbEf+MPvuJXmB1hDXPYxPMc0VYM4AW+4SJ23FPGeYmP+BlmJWzkGHy5tuA7hqrwu3EQ/Lkcg8Mg/5BSlIPu4K9W+thc9v4u5rc4zTQ4lmpwnkMuSBEUMsX/oyvmAbzGk0YbkKK/iPUH6OVmiupFUSryJ6kxnmK0UQZFzOADxqSWbpYKfwMFtaWoGPz3aMIr/MWWW056LQaTwV2LHY9Inbfjquh1G9QlnmswrXJattFZZWOWY/GKdB9dH8/QJl1+n+sRJ92apVvGEAbj+Q3GaxWH+TBZqhBBBybKTKvmvCnXOTCFPuxiD/vST+gB4xLmhmZNwA/W1wAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-rotate-geom {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABqElEQVRIie3VMWtUQRQF4C9GgyIEBC1EAoppVETzD4LKQrSxkDRqGQtTaK+FSBA7MWATjBHBUgVLV7BZBLEQLASDqCAWJioRFRUTYzE37ONlk51sErDwwGNmmDPnzMydex//sUK4hG+4vBriu/ELs5jGTRzGuuUKr8fFEJ/CFzzE5zD7hOsYwj3syhHtQA8O4SX+xI43lzh9GMXHMJvFnRyDamHBOA404XfiffCHcgwmgjwpXVEOOnEKlRzyQBgMZIpvwh5sy+TrDYPeJrwKaphRv9LXOIu1yzU4JwV/PPr9OK0evyo2tGpwLOZvaJwHJ6VcGW3FoA2v8BTtCwlIWT8j8mLNIsQy9mEnhkNgIVyJTR5dqsGOaJ834U1KcWinScRL+BHtxgxu31xnKQbPpNdTweMG81extTCuYbhscCTa/pL5VzzBfZzBLendF9GFbuyN8e9Gu5xST5ziNy0FebtUTt5JBbGIbjySHsBP3Gb+FV3DIEbwoDT3HW9xUKqcVbyREm4L9sdJT+DC3KK2RsfIQAeOSz+eLqls1zCGD7iLFzjfov4/hL/f8mqS03LaGgAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-remove-geom {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABt0lEQVRIie3UPWtUQRTG8V8EXyK4IKgQyxhYtTLiB1hkBbUVOzsJphQEGzvfEBVtjDYR9gtIinRRu+AXEIuYJgguoolGlBDx5VrMWfZ64Xrvktj5wOXCmTPPf+bMmeG/Nkk38RW3/oX5YXxDhh/o4DS2btR4B66G+So+4xk+BmwF07iOGRyqY7oN42hjAb9ixXsKOafwGMsBy/CkDuBpbsJrHK/Ib+Bt5F+rA3gfyR+kEtVRA3PYXSd5IgATNc172lJ3YLHwL2oID3ChEN8r7eJA1Upa0g5aJeZTMf4T5yK+D68i/qYKUgYYwqMYm8a8dCcm8RJruIwvARkdFDAq9f86DmJXQLIwb0vlno3Y+UEBcFTq+y6aAZnLmXdi7qUy8yoA6bZ28U56QhTMrxQnlLZXiVbia2AkYsMYkw5+ocqgpXwHI1K3rOFELO6efrnm8R1n/wa4E4CHUm3HIr4/VreeM+9Ebv5MXgTkTBlgVf8tyvRrvRPPpcfvYs58KnK6OIklqYTjZYAbAbkdO2jjSIwN+/MxvBvxZgAyfMKxMvM66kHuF+JN6Xw2ZN7TdulmFzVoR26OfgPys3oGyHyiGAAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-duplicate-geom {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAByUlEQVRIie3VPWhUQRAH8F+CioXEQ0QTC8Eq8QMljY0gQWzURgsFIW1K0UpErfQUsbCUgAatrBRttNArLLSyUFDQJBCwEESNRIngR+JZ7DzyeFy41SSdA49hZ2f+/9mZ3Xn8l0WSi5jGpaUA34IfaGIGN7EfyxcKvBLnAnwKX9DA5yCbxHXUcRebc0BXoB97MYrfkfHais8+jOBTkDVxJ4fgUSlgDHva+HfhXfjXcwg+hPNHqUQ50oWXuJbjPBQEQ5ngZdnUythZWY9XdCup4TSe4q2U/TBW5RC0k11S889LJ21gAkfxAmfbAQxE4ECLvT7pqr7G9speTbptTRz/V4IHUvM3xPoQruKUVJ4O3JNefPffEvRg1lwJDobfe+mtjIS9N+zHisDcHmwL38exnpH60CeVrDfso9K72FEELsskKPx+hr6P9QFYw+GS768ybu4JxkLvDD0ozaF1Us37w96NjXhTzayQA6GPlPYm8RzPcAI3pIY2SnHfQp+RenJ7vkynzM2i4puOTHdLx3+INZW4TpwM8CvzgcOFILksTdTi64n9QXyXRvZwnKiOV5HMLYvwn9gaQF8DdBZPpLJ2LBS8Kqvl38SlkT9jxnDzziLYQAAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-undo-geom {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABaUlEQVRIie3UT0uVQRQG8B/SFSl0JQR9A9sJ7dqICJEupaBVLXQRfQBBXIlGX6CNJrhXaSmo9RncWuCuTf5BUSHh6nUxR7yM79XRdBM9MMw7nOc8z8x5zwz/cUf4iEN8ug/xpzhGA3XMYxC1vxXuwGSI72Efa9gNsx18wRS+oqdEtB29GMAGTmPH3RnnJeawHWYNLJUYrDYl/ED/Nfwu/Ar+VInB7yBvSSUqQVfwZ0vIo2EwWih+jpkweZAH2rL1z2xuxgA6WxgsSP/pUklzg1Z4g2Wpq6rwXSrvqzxw6UgVeCt1TCP4zZetjnWpg0awKJVqvJVYXwj1xboN31xcst1s/InYfPBncHDVbnMDeIgVnOBdxq9hInKe4Tmmb2pAatklvKjIeRI5I1WCJf+AVIrhFrGTmCvfptIuujXyEwzF/LoiVoVNHN3EcM/FW1Qy3uNx0/e1J/iMD1K7rRSe4N7xCGPSM/8P4gy9al9SMvSirgAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-redo-geom {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABbElEQVRIie3Uu0seQRQF8B+iEiQIQtKlScBCG7H9qo8QCJrUPiorbfJfBJFUdjaiINgEQWKteRU26WOhliIajUbBIr4tdsR1svrN56MIeGCZ3Zlzz7l35u7wgDvCEPbw4T7EW7GPUxxhAp2ou63wI7wP4jvYxWdsB7MtjGEQn9CSIlqPdrzCIk5Cxk8iTgfG8TuYnWI6xWAuF7CElxX4jVgN/MEUg41A3pRtUQoa8QPDKeT+YNCfKJ7H86LJmuh7ORpTUZY1QkWDm6AJM/jicjOA2irFnqGnQGgBJXyVdeDGTQxa8R1PZf/ESW6tLscpySoqRFl2yOWCtY9YQ3M0/xjzOEBXHFTNGbThm38bYB8r6MZUHFTNFtXiuGD+EL3XBd0WHcFkHn8rGbwJY1dubR0/I14JDUH8HX7hRUo2Oy7uovNnMqwtR+95zp+rBOMKRkJGo5jNVRCjL1TwWnatjKRkXwkDeHsXQv8XzgAY6VQ/7ZGa7QAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-multi-to-poly {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABP0lEQVRIie3UPy8EURQF8F/8CdtuNEunEAmFqET2I6hEpRMt0RCdKEWlInwBolIrVHRIUEgkWoUP4E8IivfWJs/uMLM6TjKZzJ0z59z77snwj5x4z7hWiwh2NKid4DipLRcRb4RmnRaeoC0Ht4Jx9BUxqiHtdAB7vu7jBgu/YbCLB2xhGhNYxGnkDhUxSK/NBrxevEWzTLQnzyUhRSe4xQg2cJXwXjGLfnTiEfc/HOITY8IEE0l9Moqlkx6gnMegN364lIi/CTuooktI1wqeY707j8k1zoRolmLnp8KxpJhq0NC3mFc/grt4r2bwj3CRxwAGhcyfR4OuDO6asPBCmIsGlQzOjgJpqmE4Gqw0ed8TxfeLGhCi+CwsNBU/xAtGWzEoq/8mjrCObaHzF8y0Il5DSYjiJZ7Uj6Wlzv8wPgASs1tMhyzkjQAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-poly-to-multi {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABmElEQVRIie3Uv08UURAH8M8tIDTYoKWKnWJrFAtjJRKsUS/2hlhq9E/Syh+oZ6HYaKM0qAlYAsZOqYl64Sx2Nmz23ltLLfgmL3k735nv3M2bGQ7wr9HJ2A/hEk7FfRur+Br8cZzDCfzCF7yNeyvGcB87GDROH4/j9BP8Du5hNCd+GG/C+QnmMYVxnEavJtYL23j4zONpcCuYbIp38AI/cT2R/AJ2awl2MZvw64bGM43ydyPwViJoBJ8Nl+RjcE0sBX+tblzFWjNr4EpCvDpzCf8ikr+vPo7iLB5EUBNXE7Y2bg8PlV02VShbrYONjMjJlgTTGftGaE4X9n91biZS/+pvXKW1VyiHaICZjPNmS4KtjH1GWapqMFsfeU7+kS8n/At8Eo9c4UYELCUCRpRd0RRfk27T28Ev1o0dPFcOSTcRNGt40M4n/G6GxrJENSbxOgSWsYAjmFDW9GUtQS9sE8o2X1BO7wCvJFZFhVHcxQ/DJenjUZzUsvuOOxrLLteaY7iIM3Hfxgd8C/6Y/XX9G+t4F/cD/Gf4AzGehAw24hONAAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-set-edge-size {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA80lEQVRIie3TPUoEQRCG4UcxNVWEDQxEDGXFRdBEEDyJegXDFYMNPYgnEAQRFAMRDAUDTUz8v8EadI0Mww47sq0Y7AdF/1Bdb1fzNWON9e81EeMG1jPXvsRFseiinzm6MFXT0ajqF5PJTAVrNQwwO+olhh3exyfOcYR2bsA1pjGDHZxhLSfgJsYelvCMk59AqoCq1e5i/0By3GZArgbkluNbhS23IuousYuXAJCeaiG6ua05dxrRSCt4xwPm0cK9ZIBO0yJNIG+/DWn/BaSDjyjcKkFeMZcLslqBLEru2csFKEMecRyA7ZwAWJb+xBMOByV8AV1+T67XwGEOAAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-arc-by-three {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABUElEQVRIie3Uyy5lURAG4M8hSDomBGGgXRLCgPAELi8gjFqPRD9BT3oieAFeg5gwEWLg6PSIKU/gFol0RE9EQjPYldjZDue4JCbnT/6sqrX+qrWqdmVTxmejokRdI0bRGv4ZdnDx3gf0YR23uM/wFmvofWvy77jGX8xjEF+CQ1iIs2tMvTb5BP5jC/WoxBh+BkeRQwO2cYfxUpM34x9+oxoDOPS0RQfoD80fXEm+VVEs4QYd6MElziVtqAtOxd4lutEVMYvFklfgFCvhb8bL2gtoO6LSjfBXcaLIZLZLyp9Bk6S3sy/o50LTiB8R+zUtyGUCWmI9kZSdw/4LF+yFpgvHmRygKmV/w3DYN6gJe1IyooXQGWttxMC0pH3LWXHe44QMB7OT8xyz+nyhCmAXIym/1F9JWp9Pb2QvaMOvVybNog1HhQ7SLXov88oo48PwALldZEhqJdTwAAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n.point-by-linear {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAnklEQVRIie2SQQrCMBBFn9Jtr1Bc2K3eQPQY3qtFSg+jeBSvIRIX/tLsnIGJC+mDD8knMz9MAgvBtFIReiBJXXTzVo0HKQFbS+HaGJCfWzlrzVyYR9RHN5+4S2YqZ8DLed4UcAYarRvg4Q35xpV59kl7M9YR3YCT61oi/Kv9PCBnIxXxj8BTOkT604h2fB68AvZZQZRPDYxSXcBf+GfeizIlRkqrrPIAAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.guide-lines {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAl0lEQVRIie2V4Q2DIBBGn8YBGMURbqR2kjISIzhKN9A/kij9LtqqTUx4CSFw3B2E7wAqGzTFOAD9wZgD8PaMBowHmy0Ddk6i57yTkjj3D2HrgVc56SUYgCTm89GVTdLuXfgrNcEm3iVHtJZzjSRhCyrQ5ScoMUSxLEj4EpW+97/k+yfwZOo92VmK9oXPCuPk5/rvH07lgwm1vjLzY+JyxwAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.create-belzier-curve {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABPUlEQVRIie3Vuy8EURQG8J9HghDxKmgUoiAhkWiUKyEqjZqQqPT+BdGoFKJTkui0EkQpQbYUjVehE4lXgVXcEZvdGXayu52vuXPOmXO+O+ee7w7/SIl2TERrVZBBLlqhE0uYQ32lCXpxF9k57KE2bcHfElbRhjEsYxoLaQkKkRF2O4N3rOVt5BSXqElTMOkLMqjDbmR/Yh39mExDEFc4h2N8oDEv1oQHbFeC4BbXMfFNPKGl1IJJo9eNF+zH+JtxgMeE3GVkv42kM8jiJMZ/L7RpICbWJYi0NaEmioUWh1W8CSLMx3yUO5jvTC0c7KABswX+PmHabsolyOIMiwX+EUEnz+USwAaGhZ5DR/RcOBRFyPj7DAj6uMIFerAltGeoUgQwjlc/l+FK3EvlXMGHGMUUznFUSlLVfzj/KMIX9Ik/Drkf1z4AAAAASUVORK5CYII=\")\r\n    center center no-repeat;\r\n}\r\n\r\n.city-block-splitter {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABJElEQVRIie3Vr04DQRAG8F8JBAuhngSFIQiCKhJJQniOkrNIzlYSngKBQxCw8AAYQgIB12B4AAxF7La0x11vDyr7JZu7mZuZb+fP7TJHDVoFefBP/19YLNHd467Gbw+dhptByCBPsMslZluWwRCr2BmTH9FPCZpKsI3b+H6Dw6bBYSHR7hmffyGYlgFc4xVdoeZZ1G/GZ1UfRtM1jeAJR8LOv/AR9Wvx2yVeCj610zVtilo4xxvaFTa5QlapPSDs/ABXfrKpRVmJOjgp6LaEcuzG4KeRMMMyVvCeSrAfVxEXJvtwLFRgA71UgqqzZSA0dljfLNp2o9yr8GvUg3EsYT3FsO4/qEIbZ3HBw6wJ+hLPpSYEZdNVZjOB2gsjYuYX0RwjfAPrtjE57pM+4QAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n.eaves {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABJklEQVRIie2VPU7DUBCEPxOUxmUkfpqkcg3kIoES4YKGnotgmoQjUIdrJI0pUxJBi2lAchUKr/XGBstybIGEGOlJb2e9s6v1yIZ/NMQYeAQSIAI8yYXAi51QeA+4tZrYNCoRAxs5p8bvA6nwqXEAZ6WaWAV3Sg1GFfEh0Be+DxzYfVijUUAkkyRSvAssJLcwLhdMJHejgrrjPJ6Y8BxYS84Hzu1+D3xIbki2zjXwYI1+Br2GzwfAAHj9RueIbPL3bYe5w+15JrwPLHHuCr+W1iOgaMWNcQBXJf5ZC8s2/VXMcFNOhfdxFk6BizZNAtxqFD3gGNhrI74Vmtq0CiPgkuyTsupIsyD+hns/UdcNrinaNNFkFzZ9qolbwyNbS/7DOem6wR/HJz9hTSUbxvXxAAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.point-from-topo {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA7klEQVRIie3TTUoDQRAF4E8Rgol6AU/gWo+RiXgr3an4m2Slp3Hhz84T6AlixIU/i65g0AyZmQxkMw8Kmqrq95pX1TSYg5USvR3sxPkZb3U9YgtXGOM7YowLbNZB/oRPXCNDD/3IPS4qchlEBzjC61StG7XzquQdyYo+DoPs9k/PQJpFu4rAnuR3hhfczOjpRc9uHslaQbHtnHyZLfyHNt4li/IwlGxcrypyJnnfnVHLonZalZy0gg9BNMB+xBBfuMfGIgITkROM/H60EY7V8NGm0cJdRKvopaJbBB/SQCfnQlgtIVAJjcDyBRrMxQ+VBzIXkc3oJAAAAABJRU5ErkJggg==\")\r\n    center center no-repeat;\r\n}\r\n\r\n.geom-from-wkt {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAjUlEQVRIic3VsQqAIBRG4UNj0Ms11cs2RE8lQS26SBf1+gtdcIn4Ttog/GzWuIbhAbiBfRR+xhUQ7iThF7AAM3Ag2kmOp5FELFwSKeFdkVrcFWnFmyJevCrSi5uRqQMrzZM/UB7RZr2k+Mkm7o004a0RF14b6cJLEQluRaR4Hhly4eQR6Zd/RYZd+q55Ae/LTyKZKRF9AAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.point-by-dist-segment {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAzElEQVRIie2VMQ7CMAxFXxETTD0LEhJ7DwEn4QysvQQsTKyVGJGYOAFXYGIuQyxwUeOE0G55ktXIce36N24hE6Aw9tohck2NG3Y/FujFKjAD9sBF+ZZyvSrfCtikFICuTCVwkPUCeHjikiiAoyRqgRP2+4uixrUPMAcq4CZWiQ+JqX1JYiV6Ag0fWRpP3N+cxaKZGHtaIgtTIqsAxLeeJXof01JMH1Mdl8zogwbuye9ipfIPMmjghmyt1r64Dlab20Dxb3o/76P/cDJBXlVcLQYx3CS4AAAAAElFTkSuQmCC\")\r\n    center center no-repeat;\r\n}\r\n\r\n.map-app-up {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA/wD/AP+gvaeTAAAAlUlEQVQ4je3SsQkCQRSE4Q8xMdYSbONAsQCbEBQswDKsRYwtw0QMNdNEz9zkBctx3h2nCII/TPCG3XmzsPwio9BbZLjjgUnbkDFyHEN5eKV0K5pssMIwvD22mGLXpEmGG5Yxr0Mwi2a1z+zhhHnipUGwwDnOVtIvzMUgGBQvdUqCrnWbcGkS1Ip/UD2vfnbK4VPLvssTwfYXT2DhoDcAAAAASUVORK5CYII=\")\r\n    left center no-repeat;\r\n  background-size: 18px 18px;\r\n  height: 32px;\r\n  cursor: pointer;\r\n  width: 100%;\r\n  padding-left: 32px;\r\n  margin-left: 8px;\r\n  line-height: 32px;\r\n}\r\n\r\n.map-app-down {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA/wD/AP+gvaeTAAAAjklEQVQ4je3PMQrCUBCE4Q+1SSu2trlFQPQAXsLC4GHiCbyJnRewt/IIGnubLSSG5ClYBByY4i2z/+xjiCrDnZokgPKUtlFK6A/6HWiWsPeWaYIynLHtgJSRyfraCtywi3cVhg1qrJpL4xbQFSccAjiN+Rx7rHHsu+ZVy2i/hOuYfaUCdzy0fOdTLcID0xMqnRQbzygYRwAAAABJRU5ErkJggg==\")\r\n    left center no-repeat;\r\n  background-size: 18px 18px;\r\n  height: 32px;\r\n  cursor: pointer;\r\n  width: 100%;\r\n  padding-left: 32px;\r\n  margin-left: 8px;\r\n  line-height: 32px;\r\n}\r\n\r\n.map-app-explode {\r\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA/wD/AP+gvaeTAAAAy0lEQVQ4jc2TvwrCMBDGf0onwTdwCwhueQQH6d4X8BU7dHPyLQShuDjboeiSoQ456RnSP/gH+sHBJfflu7tcAlPDTPkLYKPWNXAO+GtgqdYn4BGKWqABHHADikjiQmJOuDZWnRXCHci6myATjusTqhQxjXBSlajSQoki1cARyIVYArtAqJTYAdjLmUFspfxSzMleFElXQHAFjPiXPuJ8TGljMFTRCt/Wyx8Fg79o8NMx+MvWZminmdO2/Yavxh8K/exBfvxF/vJpp4EnOEo9a0u2oycAAAAASUVORK5CYII=\")\r\n    left center no-repeat;\r\n  background-size: 18px 18px;\r\n  height: 32px;\r\n  cursor: pointer;\r\n  width: 100%;\r\n  padding-left: 32px;\r\n  margin-left: 8px;\r\n  line-height: 32px;\r\n}\r\n\r\n.map-app-union {\r\n  background: url(../assets/mapa/icons8-coletar-24.png) left center no-repeat;\r\n  background-size: 18px 18px;\r\n  height: 32px;\r\n  cursor: pointer;\r\n  width: 100%;\r\n  padding-left: 32px;\r\n  margin-left: 8px;\r\n  line-height: 32px;\r\n}\r\n\r\n.map-app-no-icon-menu {\r\n  background-size: 18px 18px;\r\n  height: 32px;\r\n  cursor: pointer;\r\n  width: 100%;\r\n  padding-left: 32px;\r\n  margin-left: 8px;\r\n  line-height: 32px;\r\n}\r\n\r\n.map-app-clear-btn-layer {\r\n  opacity: 0.1;\r\n  height: 24px;\r\n  cursor: auto;\r\n  pointer-events: none;\r\n}\r\n\r\n.map-app-ls-img {\r\n  margin-left: 48px;\r\n}\r\n\r\n.map-app-ls-font {\r\n  color: #393c47 !important;\r\n  font-size: 14px !important;\r\n  font-family: \"Nunito\", sans-serif !important;\r\n  user-select: none;\r\n}\r\n\r\n.map-app-ls-title {\r\n  background: #f0f0f0 !important;\r\n  border: none !important;\r\n}\r\n.map-app-form-control {\r\n  display: block;\r\n  width: 100%;\r\n  height: calc(1.5 em + 0.75 rem + 2 px);\r\n  font-size: 1rem;\r\n  font-weight: 400;\r\n  line-height: 1.5;\r\n  color: #495057;\r\n  background-color: #fff;\r\n  background-clip: padding-box;\r\n  border: 1 px solid #ced4da;\r\n  border-radius: 0.25 rem;\r\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\r\n}\r\n";
  styleInject(css);

  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var GeoControl = /*#__PURE__*/function () {
    function GeoControl(config) {
      _classCallCheck(this, GeoControl);
      this.__id__ = GeoControl.internalId++;
      this._config = config || {};
      this._map = null;
      this._panel = null;
      this._defaultStyle = null;
      this._setDefaultValues();
      this._events = {
        ready: [],
        activate: []
      };
    }
    return _createClass(GeoControl, [{
      key: "map",
      get: function get() {
        return this._map;
      },
      set: function set(newMap) {
        this._map = newMap;
      }
    }, {
      key: "panel",
      get: function get() {
        return this._panel;
      },
      set: function set(panel) {
        this._panel = panel;
      }
    }, {
      key: "id",
      get: function get() {
        return this.__id__;
      }
    }, {
      key: "config",
      get: function get() {
        return this._config;
      }
    }, {
      key: "_setDefaultValues",
      value: function _setDefaultValues() {
        this._config.position = this._config.position || 'lt';
        this._config.tip = this._config.tip || '';
        this._config.class = this._config.class || 'map-app-undefined-control';
        this._config.title = this._config.title || 'Widget';
      }
    }, {
      key: "_saveDefaultStyle",
      value: function _saveDefaultStyle() {
        this._defaultStyle = Object.assign({}, document.getElementById(this._elementId).style);
      }
    }, {
      key: "_restoreDefaultStyle",
      value: function _restoreDefaultStyle() {
        document.getElementById(this._elementId).style = this._defaultStyle;
      }
    }, {
      key: "eventDispatcher",
      value: function eventDispatcher(eventName, data) {
        this._verifyEventName(eventName);
        for (var i = 0; i < this._events[eventName].length; i++) {
          this._events[eventName][i](data);
        }
      }
    }, {
      key: "on",
      value: function on(eventName, callback) {
        this._verifyEventName(eventName);
        this._events[eventName].push(callback);
      }
    }, {
      key: "un",
      value: function un(eventName, callback) {
        this._verifyEventName(eventName);
        this._events[eventName] = this._events[eventName].filter(function (item) {
          return item !== callback;
        });
      }
    }, {
      key: "_verifyEventName",
      value: function _verifyEventName(eventName) {
        if (Object.keys(this._events).indexOf(eventName) === -1) {
          throw 'Event does not exist: "' + eventName + '".';
        }
      }
    }]);
  }();
  GeoControl.internalId = 1;

  var GeoSubPanel = /*#__PURE__*/function (_GeoControl) {
    function GeoSubPanel(config) {
      var _this;
      _classCallCheck(this, GeoSubPanel);
      config.class = config.class || 'map-app-subpanel-control';
      _this = _callSuper(this, GeoSubPanel, [config]);
      _this._isOpen = false;
      _this._isActive = false;
      _this._controls = [];
      _this._subPanelElementId = null;
      _this._controlElementId = null;
      _this._isRunning = false;
      return _this;
    }
    _inherits(GeoSubPanel, _GeoControl);
    return _createClass(GeoSubPanel, [{
      key: "elementId",
      get: function get() {
        return this._controlElementId;
      },
      set: function set(id) {
        this._controlElementId = id;
      }
    }, {
      key: "subPanelElementId",
      get: function get() {
        return this._subPanelElementId;
      }
    }, {
      key: "isActive",
      get: function get() {
        return this._isActive;
      },
      set: function set(status) {
        this._isActive = status;
      }
    }, {
      key: "isOpen",
      get: function get() {
        return this._isOpen;
      },
      set: function set(status) {
        this._isOpen = status;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this._isRunning;
      },
      set: function set(status) {
        this._isRunning = status;
      }
    }, {
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "registerControls",
      value: function registerControls() {
        for (var i = 0; i < this._controls.length; i++) {
          this.map.addControl(this._controls[i], this._subPanelElementId);
        }
      }
    }, {
      key: "addControl",
      value: function addControl(control) {
        control.parent = this;
        this._controls.push(control);
      }
    }, {
      key: "createSubPanelElement",
      value: function createSubPanelElement() {
        this._subPanelElementId = "map-app-subpanel-".concat(this._config.position || this._config.panel, "_").concat(this.id, "_").concat(this.map.target);
        var subPanelElement = document.createElement('div');
        subPanelElement.className = "map-app-subpanel map-app-subpanel-".concat(this._config.position || this._config.panel);
        subPanelElement.id = this._subPanelElementId;
        document.getElementById(this.map.elementId).append(subPanelElement);
        this.map.subPanels.push(this);
      }
    }, {
      key: "click",
      value: function click() {
        if (this._isOpen) {
          this.deactivate();
        } else {
          this.activate();
        }
      }
    }, {
      key: "activate",
      value: function activate() {
        var controlElement = document.getElementById(this._controlElementId);
        var subPanelElement = document.getElementById(this._subPanelElementId);
        var top = controlElement.parentElement.offsetTop + controlElement.offsetTop;
        var left = 0;
        var right = 0;
        var onLeft = controlElement.parentElement.offsetLeft < window.innerWidth / 2;
        left = controlElement.parentElement.offsetLeft + controlElement.clientWidth;
        right = this.map.clientSize - controlElement.parentElement.offsetLeft;
        if (onLeft) {
          subPanelElement.style.left = left + 'px';
          subPanelElement.style.right = 'auto';
        } else {
          subPanelElement.style.right = right + 'px';
          subPanelElement.style.left = 'auto';
        }
        subPanelElement.style.top = top + 'px';
        subPanelElement.style.display = 'inline-flex';
        controlElement.classList.add('map-app-control-active');
        this._isOpen = true;
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        var controlElement = document.getElementById(this._controlElementId);
        var subPanelElement = document.getElementById(this._subPanelElementId);
        subPanelElement.style.display = 'none';
        controlElement.classList.remove('map-app-control-active');
        controlElement.className = this.config.class + ' map-app-control';
        this._closeAllControls();
        this._isOpen = false;
      }
    }, {
      key: "_closeAllControls",
      value: function _closeAllControls() {
        if (this._isActive) {
          for (var i = 0; i < this._controls.length; i++) {
            if (this._controls[i].isActive) {
              this._controls[i].deactivate();
            }
          }
          this._isActive = false;
        }
      }
    }]);
  }(GeoControl);

  var GeoButton = /*#__PURE__*/function (_GeoControl) {
    function GeoButton(config) {
      _classCallCheck(this, GeoButton);
      return _callSuper(this, GeoButton, [config]);
    }
    _inherits(GeoButton, _GeoControl);
    return _createClass(GeoButton);
  }(GeoControl);

  var GeoTool = /*#__PURE__*/function (_GeoControl) {
    function GeoTool(config) {
      var _this;
      _classCallCheck(this, GeoTool);
      _this = _callSuper(this, GeoTool, [config]);
      _this._isActive = false;
      return _this;
    }
    _inherits(GeoTool, _GeoControl);
    return _createClass(GeoTool, [{
      key: "_restoreUI",
      value: function _restoreUI() {
        this.map.closeAllSubPanels();
      }
    }, {
      key: "isActive",
      get: function get() {
        return this._isActive;
      },
      set: function set(val) {
        this._isActive = val;
      }
    }, {
      key: "activate",
      value: function activate() {
        this._isActive = true;
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this._isActive = false;
        if (this.parent && this.parent instanceof GeoMapAll.GeoSubPanel) {
          this.parent.deactivate();
        }
      }
    }]);
  }(GeoControl);

  var Panel = /*#__PURE__*/function () {
    function Panel(config) {
      _classCallCheck(this, Panel);
      this._controls = [];
      this._position = config.position;
      this._elementId = '';
      this._map = null;
    }
    return _createClass(Panel, [{
      key: "map",
      get: function get() {
        return this._map;
      },
      set: function set(map) {
        this._map = map;
        this.initialize();
      }
    }, {
      key: "position",
      get: function get() {
        return this._position;
      }
    }, {
      key: "elementId",
      get: function get() {
        return this._elementId;
      }
    }, {
      key: "initialize",
      value: function initialize() {
        this._createPanel();
        this._saveDefaultStyle();
      }
    }, {
      key: "_panelExists",
      value: function _panelExists() {
        for (var i = 0; i < this.map._panels.lenght; i++) {
          if (this.map._panels[i].position == this._position) {
            throw 'Painel já adicionado.';
          }
        }
      }
    }, {
      key: "_createPanel",
      value: function _createPanel() {
        if (!this._panelExists(this._position)) {
          this.map._panels.push(this);
        }
        var cssClass = "map-app-panel-".concat(this._position);
        this._elementId = "".concat(cssClass, "_").concat(this.map.elementId);
        var panelElement = document.createElement('div');
        var tooltipElement = document.createElement('div');
        panelElement.className = "map-app-panel ".concat(cssClass);
        panelElement.id = this._elementId;
        document.getElementById(this.map.elementId).append(panelElement);
        tooltipElement.className = "map-app-panel-tooltip ".concat(cssClass, "-tooltip");
        tooltipElement.id = "".concat(this._elementId, "-tooltip");
        document.getElementById(this.map.elementId).append(tooltipElement);
      }
    }, {
      key: "_saveDefaultStyle",
      value: function _saveDefaultStyle() {
        this._defaultStyle = Object.assign({}, document.getElementById(this._elementId).style);
      }
    }, {
      key: "_restoreDefaultStyle",
      value: function _restoreDefaultStyle() {
        document.getElementById(this._elementId).style = this._defaultStyle;
      }
    }]);
  }();
  var PanelPosition = {
    LEFT_TOP: 'lt',
    LEFT_CENTER: 'lc',
    LEFT_BOTTOM: 'lb',
    RIGHT_TOP: 'rt',
    RIGHT_CENTER: 'rc',
    RIGHT_BOTTOM: 'rb',
    CENTER_TOP: 'ct',
    CENTER_CENTER: 'cc',
    CENTER_BOTTOM: 'cb'
  };

  var GeoWidget = /*#__PURE__*/function (_GeoTool) {
    function GeoWidget(config) {
      var _this;
      _classCallCheck(this, GeoWidget);
      _this = _callSuper(this, GeoWidget, [config]);
      _this._elementId = '';
      _this._contentId = '';
      _this._headerId = '';
      _this._titleId = '';
      _this._closeId = '';
      _this._controlElement = null;
      _this._onDock = false;
      _this.__elements = {
        widget: null,
        header: null,
        content: null,
        close: null,
        dock: null,
        maximize: null,
        resizer: null
      };
      return _this;
    }
    _inherits(GeoWidget, _GeoTool);
    return _createClass(GeoWidget, [{
      key: "hasUI",
      get: function get() {
        return this._hasUI;
      }
    }, {
      key: "controlElement",
      get: function get() {
        return this._controlElement;
      },
      set: function set(element) {
        this._controlElement = element;
      }
    }, {
      key: "onDock",
      get: function get() {
        return this._onDock;
      }
    }, {
      key: "createWidget",
      value: function createWidget() {
        this.__handleUiCreation();

        // Cria elemento externo widget
        this.__createWidget();
        if (!this.config.untitled) {
          this.__createWidgetHeader();
          this.__createWidgetTitle();
          this.__createWidgetClose();
          if (this.config.docked) {
            this.__createWidgetDock();
          }
        }
        this.__createWidgetContent();
        this.__makeDraggable();
        this.__makeResizable();
        if (this.config.maximized) {
          this.resizeToMax();
        }
      }
    }, {
      key: "_setWidgetMinMaxSizes",
      value: function _setWidgetMinMaxSizes() {
        var maxHeight = this.map.mapElement.clientHeight * 0.95;
        var maxWidth = this.map.mapElement.clientWidth * 0.95;
        if (this.config.minHeight) {
          this.__elements.widget.style.minHeight = this.config.minHeight;
          this.__elements.widget.style.height = this.__elements.widget.style.height || this.config.minHeight;
        }
        if (this.config.minWidth) {
          this.__elements.widget.style.minWidth = this.config.minWidth;
          this.__elements.widget.style.width = this.__elements.widget.style.width || this.config.minWidth;
        }
        this.__elements.widget.style.maxHeight = this.config.maxHeight || maxHeight + 'px';
        this.__elements.widget.style.maxWidth = this.config.maxWidth || maxWidth + 'px';
      }
    }, {
      key: "__createWidget",
      value: function __createWidget() {
        this.__elements.widget = document.createElement('div');
        this.__elements.widget.id = "map_c".concat(this.id, "_").concat(this.map.target);
        this.__elements.widget.className = 'map-app-widget map-app-widget-resizable';
      }
    }, {
      key: "__createWidgetContent",
      value: function __createWidgetContent() {
        this.__elements.container = document.createElement('div');
        this.__elements.container.className = 'map-app-widget-container';
        this.__elements.content = document.createElement('div');
        this.__elements.content.id = this._contentId;
        this.__elements.content.className = 'map-app-widget-content';
        var resizersElement = document.createElement('div');
        resizersElement.className = 'map-app-widget-resizers';
        this.__elements.resizer = document.createElement('div');
        this.__elements.resizer.className = 'map-app-widget-resizer map-app-widget-bottom-right';
        resizersElement.append(this.__elements.resizer);
        this.__elements.widget.append(resizersElement);
        this.__elements.content.append(this.ui);
        this.__elements.container.append(this.__elements.content);
        this.__elements.widget.append(this.__elements.container);
        document.getElementById(this.map.elementId).append(this.__elements.widget);
        this._setWidgetMinMaxSizes();
      }
    }, {
      key: "__createWidgetHeader",
      value: function __createWidgetHeader() {
        this.__elements.header = document.createElement('div');
        this.__elements.header.id = this._headerId;
        this.__elements.header.className = 'map-app-widget-header';
        this.__elements.widget.append(this.__elements.header);
      }
    }, {
      key: "__createWidgetTitle",
      value: function __createWidgetTitle() {
        this.__elements.title = document.createElement('span');
        this.__elements.title.id = this._titleId;
        this.__elements.title.innerHTML = this._config.title;
        this.__elements.header.append(this.__elements.title);
      }
    }, {
      key: "__createWidgetClose",
      value: function __createWidgetClose() {
        var _this2 = this;
        this.__elements.close = document.createElement('div');
        this.__elements.close.id = this._closeId;
        this.__elements.close.className = 'map-app-widget-close';
        this.__elements.close.innerHTML = '  ×';
        this.__elements.header.append(this.__elements.close);
        this.__elements.close.addEventListener('click', function () {
          _this2.deactivate();
        });
      }
    }, {
      key: "__createWidgetDock",
      value: function __createWidgetDock() {
        var _this3 = this;
        this.__elements.dock = document.createElement('div');
        this.__elements.dock.id = this._dockId;
        this.__elements.dock.className = 'map-app-widget-close';
        this.__elements.dock.innerHTML = '&#8718;';
        this.__elements.header.append(this.__elements.dock);
        this.__elements.dock.addEventListener('click', function () {
          if (_this3._onDock) {
            _this3.removeFromDock('right');
          } else {
            _this3.moveToDock('right');
          }
        });
      }
    }, {
      key: "__handleUiCreation",
      value: function __handleUiCreation() {
        if (!this.ui) {
          throw 'Erro ao criar widget: "ui" não definda';
        }
        if (typeof this.ui === 'string') {
          var uiElement = document.createElement('div');
          uiElement.style.width = '100%';
          uiElement.innerHTML = this.ui;
          this.ui = uiElement;
        } else if (_typeof(this.ui) !== 'object') {
          throw 'Erro ao criar widget: "ui" deve ser um elemento HTML válido';
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        this.__elements.widget.style.display = 'none';
        this._isOpen = false;
        this._isActive = false;
        this._controlElement.classList.remove('map-app-control-active');
        if (this._onDock) {
          this.removeFromDock(this.config.dockPosition || 'right');
        }
        var widgetElement = this.__elements.widget;
        widgetElement.classList.remove('map-app-widget-docked');
        widgetElement.classList.remove('map-app-widget-maximized');
      }
    }, {
      key: "show",
      value: function show() {
        this.__elements.widget.style.display = 'block';
        this.__elements.widget.style.zIndex = ++GeoWidget.currentZIndex;
        this._isOpen = true;
        this._isActive = true;
        this._controlElement.classList.add('map-app-control-active');
        if (this._config.docked) {
          this.moveToDock(this._config.dockPosition || 'right');
        }
        this.__setWidgetSize();
      }
    }, {
      key: "__setWidgetSize",
      value: function __setWidgetSize() {
        var content_height = parseFloat(getComputedStyle(this.__elements.content, null).getPropertyValue('height').replace('px', ''));
        var header_height = parseFloat(getComputedStyle(this.__elements.header, null).getPropertyValue('height').replace('px', ''));
        this.__elements.widget.style.height = this.__elements.widget.style.height || (content_height + header_height) * 1.05 + 'px';
        var content_width = parseFloat(getComputedStyle(this.__elements.content, null).getPropertyValue('width').replace('px', ''));
        this.__elements.widget.style.width = this.__elements.widget.style.width || content_width + 'px';
      }

      /* https://www.w3schools.com/howto/howto_js_draggable.asp */
    }, {
      key: "__makeDraggable",
      value: function __makeDraggable() {
        var self = this;
        var element = this.__elements.widget;
        var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
        if (this.__elements.header) {
          // if present, the header is where you move the DIV from:
          this.__elements.header.onmousedown = dragMouseDown;
        } else {
          // otherwise, move the DIV from anywhere inside the DIV: 
          element.onmousedown = dragMouseDown;
        }
        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          element.style.top = element.offsetTop - pos2 + 'px';
          element.style.left = element.offsetLeft - pos1 + 'px';
          element.style.opacity = 0.5;
        }
        function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
          element.style.opacity = 1;
          var mapRect = self.map.mapElement.getBoundingClientRect();
          var widgetRect = self.__elements.widget.getBoundingClientRect();

          // top
          if (widgetRect.top - mapRect.top < 0) {
            self.__elements.widget.style.top = '10px';
          }
          // left
          if (widgetRect.left - mapRect.left < 0) {
            self.__elements.widget.style.left = '10px';
          }
          // Right
          if (widgetRect.right - mapRect.right > 0) {
            self.__elements.widget.style.left = '10px';
          }
          // Bottom
          if (widgetRect.bottom - mapRect.bottom > 0) {
            self.__elements.widget.style.top = '10px';
          }
        }
      }

      /*Make resizable div by Hung Nguyen*/
    }, {
      key: "__makeResizable",
      value: function __makeResizable() {
        var self = this;
        var element = this.__elements.widget;
        var resizer = this.__elements.resizer;
        var original_width = 0;
        var original_height = 0;
        var original_mouse_x = 0;
        var original_mouse_y = 0;
        var original_x = 0;
        var original_y = 0;
        resizer.addEventListener('mousedown', function (e) {
          e.preventDefault();
          original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
          original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
          original_x = element.getBoundingClientRect().left;
          original_y = element.getBoundingClientRect().top;
          original_mouse_x = e.pageX;
          original_mouse_y = e.pageY;
          window.addEventListener('mousemove', resize);
          window.addEventListener('mouseup', function () {
            return stopResize();
          });
        });
        function resize(e) {
          if (resizer.classList.contains('map-app-widget-bottom-right')) {
            element.style.width = original_width + (e.pageX - original_mouse_x) + 'px';
            element.style.height = original_height + (e.pageY - original_mouse_y) + 'px';
          } else {
            stopResize();
          }
        }
        function stopResize() {
          window.removeEventListener('mousemove', resize);
          var mapRect = self.map.mapElement.getBoundingClientRect();
          var widgetRect = self.__elements.widget.getBoundingClientRect();

          // top
          if (widgetRect.top - mapRect.top < 0) {
            self.__elements.widget.style.top = '10px';
          }
          // left
          if (widgetRect.left - mapRect.left < 0) {
            self.__elements.widget.style.left = '10px';
          }
          // Right
          if (widgetRect.right - mapRect.right > 0) {
            self.__elements.widget.style.left = mapRect.right - widgetRect.width - 10 + 'px';
          }
          // Bottom
          if (widgetRect.bottom - mapRect.bottom > 0) {
            self.__elements.widget.style.top = mapRect.bottom - widgetRect.height - 10 + 'px';
          }
        }
      }
    }, {
      key: "resizeToMax",
      value: function resizeToMax() {
        var element = this.__elements.widget;
        element.classList.add('map-app-widget-maximized');
      }
    }, {
      key: "moveToDock",
      value: function moveToDock(position) {
        this.map.unDockWidgetFrom(position);
        var dockId = "map-app-dock-".concat(position, "_").concat(this.map.target);
        var dockElement = document.getElementById(dockId);
        dockElement.appendChild(this.__elements.widget);
        this.__elements.widget.classList.add('map-app-widget-docked');
        this.map.openDock(position);
        this._onDock = position;
        if (this.__elements.header) {
          this.__elements.header.style.cursor = 'auto';
          this.__elements.header.onmousedown = null;
        }
      }
    }, {
      key: "removeFromDock",
      value: function removeFromDock(position) {
        var mapElement = document.getElementById(this.map.elementId);
        var widgetElement = this.__elements.widget;
        mapElement.appendChild(widgetElement);
        widgetElement.classList.remove('map-app-widget-docked');
        this.__makeDraggable();
        this.map.closeDock(position);
        this._onDock = null;
        if (this.__elements.header) {
          this.__elements.header.style.cursor = 'move';
        }
      }
    }, {
      key: "moveTo",
      value: function moveTo(x, y) {
        var unit = 'px';
        var mapElement = document.getElementById(this.map.elementId);
        var widgetWidth = parseFloat(getComputedStyle(this.__elements.widget, null).getPropertyValue('width').replace('px', ''));
        var widgetHeight = parseFloat(getComputedStyle(this.__elements.widget, null).getPropertyValue('height').replace('px', ''));
        var mapWidth = parseFloat(getComputedStyle(mapElement, null).getPropertyValue('width').replace('px', ''));
        var mapHeight = parseFloat(getComputedStyle(mapElement, null).getPropertyValue('height').replace('px', ''));
        var v = y;
        if (widgetWidth + x > mapWidth) {
          this.__elements.widget.style.left = x - widgetWidth + unit;
        } else {
          this.__elements.widget.style.left = x + unit;
        }
        if (widgetHeight + y > mapHeight) {
          v = y - widgetHeight;
        }
        if (v < 0) v = 0;
        this.__elements.widget.style.top = v + unit;
      }
    }]);
  }(GeoTool);
  GeoWidget.currentZIndex = 9000;

  var GeoMap = /*#__PURE__*/function () {
    function GeoMap(target, config) {
      _classCallCheck(this, GeoMap);
      this._config = config;
      this._target = target || 'map';
      this._elementId = "".concat(target, "_content") || 'map_content';
      this._content = null;
      this._thematicLayers = null;
      this._mapSrid = config.SRID || 'EPSG:3857';
      this._displaySrid = config.displaySrid || 'EPSG:4326';
      this._buttons = [];
      this._tools = [];
      this._panels = [];
      this._subPanels = [];
      this._docks = [];
      this._widgets = [];
      this.toolbox = {};
      this._externalTools = {};
      this._events = {
        ready: [],
        draw: [],
        removeLayers: []
      };
      this._defaultStyle = null;
      this._dockIsOpen = {
        left: false,
        right: false,
        bottom: false
      };
      this._panelPosition = {
        LEFT_TOP: 'lt',
        LEFT_CENTER: 'lc',
        LEFT_BOTTOM: 'lb',
        RIGHT_TOP: 'rt',
        RIGHT_CENTER: 'rc',
        RIGHT_BOTTOM: 'rb',
        CENTER_TOP: 'ct',
        CENTER_CENTER: 'cc',
        CENTER_BOTTOM: 'cb'
      };
      this.containerElement = null;
      this.mapElement = null;
      this._graphicsLayer = null;
      this._setDefaultConfig();
      this._createContentSchema();
      this._createGraphicsLayer();
      this._initMap();
      this._createLayers();
      this._drawLayers();
      this._registerEvents();
      this._saveDefaultStyle();
    }
    return _createClass(GeoMap, [{
      key: "ol",
      get: function get() {
        return this._map2D;
      }
    }, {
      key: "elementId",
      get: function get() {
        return this._elementId;
      }
    }, {
      key: "subPanels",
      get: function get() {
        return this._subPanels;
      },
      set: function set(subPanels) {
        this._subPanels = subPanels;
      }
    }, {
      key: "target",
      get: function get() {
        return this._target;
      }
    }, {
      key: "clientSize",
      get: function get() {
        return this.mapElement.clientWidth;
      }
    }, {
      key: "clientWidth",
      get: function get() {
        return this.mapElement.clientWidth;
      }
    }, {
      key: "clientHeight",
      get: function get() {
        return this.mapElement.clientHeight;
      }
    }, {
      key: "srid",
      get: function get() {
        return this._mapSrid;
      }
    }, {
      key: "content",
      get: function get() {
        return this._content;
      },
      set: function set(content) {
        this._content = content;
      }
    }, {
      key: "toolbox",
      get: function get() {
        return this._externalTools;
      },
      set: function set(tool) {
        this._externalTools = tool;
      }
    }, {
      key: "displaySrid",
      get: function get() {
        return this._displaySrid;
      },
      set: function set(srid) {
        this._displaySrid = srid;
      }
    }, {
      key: "config",
      get: function get() {
        return this._config;
      },
      set: function set(conf) {
        this._config = conf;
      }
    }, {
      key: "_setDefaultConfig",
      value: function _setDefaultConfig() {
        this._content = this._config.content;
        this._thematicLayers = this._config.thematicLayers || {};
        this._config.initialZoom = this._config.initialZoom || 10;
        this._config.minZoom = this._config.minZoom || 1;
        this._config.maxZoom = this._config.maxZoom || 22;
        this._config.linearUnits = this._config.linearUnits || 'm';
        this._config.areaUnits = this._config.areaUnits || 'm2';
        this._config.angularUnits = this._config.angularUnits || 'dms';
        this._config.precision = this._config.precision || 3;
        this._config.displaySrid = this._config.displaySrid || 'EPSG:4326';
      }
    }, {
      key: "_initMap",
      value: function _initMap() {
        var _this = this;
        this._registerProjections();
        var center = [0, 0];
        if (this._config.center && this._config.center.srid != this._mapSrid) {
          center = ol.proj.transform(this._config.center.coordinates, this._config.center.srid || 'EPSG:4326', this._mapSrid);
        }
        this._map2D = new ol.Map({
          target: this._elementId,
          view: new ol.View({
            projection: ol.proj.get(this._mapSrid),
            center: center,
            zoom: this._config.initialZoom,
            minZoom: this._config.minZoom,
            maxZoom: this._config.maxZoom
          }),
          layers: [this._graphicsLayer],
          controls: ol.control.defaults.defaults({
            zoom: true,
            attribution: true,
            rotate: false
          })
        });
        this._map2D.on('change:size', function () {
          for (var i = 0; i < _this._tools.length; i++) {
            if (_this._tools[i].ui) {
              _this._tools[i]._setWidgetMinMaxSizes();
            }
          }
        });
      }
    }, {
      key: "_registerProjections",
      value: function _registerProjections() {
        if (proj4) {
          var projections = this._config.srs;
          for (var i = 0; i < projections.length; i++) {
            var p = projections[i];
            proj4.defs(p.code, p.defs);
          }
          ol.proj.proj4.register(proj4);
        }
      }
    }, {
      key: "_createGraphicsLayer",
      value: function _createGraphicsLayer() {
        this._graphicsLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 0, 0, 0.5)'
            }),
            stroke: new ol.style.Stroke({
              color: 'red',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: 'red'
              })
            })
          })
        });
        this._graphicsLayer.setZIndex(9999999);
      }
    }, {
      key: "updateStyle",
      value: function updateStyle() {
        var content;
        for (var i = 0; i < this.content.length; i++) {
          content = this.content[i];
          for (var j = 0; j < content.layers.length; j++) {
            if (content.type.toLowerCase() === 'ogc' && content.serviceParameters && content.serviceParameters.format && content.serviceParameters.format.toLowerCase() === 'pbf') {
              var style = this.createVectorLayerStyle(content.layers[j]);
              content.layers[j].olLayer.setStyle(style);
            }
            if (content.layers[j].olLayer) {
              content.layers[j].olLayer.setOpacity(content.layers[j].style.opacity);
            }
          }
        }
      }
    }, {
      key: "_createContentSchema",
      value: function _createContentSchema() {
        this.containerElement = document.getElementById(this._target);
        this.mapElement = document.createElement('div');
        this.mapElement.className = 'map-app-map';
        this.mapElement.id = this._elementId;
        this.containerElement.appendChild(this.mapElement);
        this._createDefaultPanels();
        this._createDefaultDocks();
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var self = this;
        document.onkeydown = function (evt) {
          evt = evt || window.event;
          if (evt.keyCode == 27) {
            self.closeAllTools();
            self.closeAllSubPanels();
          }
        };
      }
    }, {
      key: "_createLayers",
      value: function _createLayers() {
        var content;
        for (var i = 0; i < this._content.length; i++) {
          content = this._content[i];
          this._createOlLayer(content, i);
        }
        this._setZIndex();
      }
    }, {
      key: "_createOlLayer",
      value: function _createOlLayer(content, i) {
        var self = this;
        var olLayer;
        console.log(content.type);
        switch (content.type.toLowerCase()) {
          case 'baselayer':
            this._createBaseLayerOlLayer(content, i);
            break;
          case 'wms':
            // Tenta corrigir a url do source 
            content.source = content.source.replace('/wms', '');
            content.wmsSource = content.source + '/wms';
            if (content.wmsParameters && content.wmsParameters.tiled) {
              content.olLayer = this._createTileWmsOlLayer(content);
            } else if (content.wmsParameters && content.wmsParameters.ungrouped) {
              this._createTileWmsEOlLayer(content);
            } else {
              content.olLayer = this._createImageWmsOlLayer(content);
            }
            if (content.auth) this._getLegendImages(content);
            break;
          case 'tilewms':
            content.wmsSource = content.source;
            content.olLayer = this._createTiledWmsOlLayer(content);
            this._getLegendImages(content);
            break;
          case 'ogc':
            content.defaultService = content.defaultService || 'wms';
            if (content.defaultService === 'wms') {
              content.wmsSource = content.source + '/wms';
              if (content.wmsParameters && content.wmsParameters.tiled) {
                content.olLayer = this._createTileWmsOlLayer(content);
              } else {
                content.olLayer = this._createImageWmsOlLayer(content);
              }
            } else if (content.defaultService === 'wfs') {
              if (content.serviceParameters && content.serviceParameters.tiled) {
                this._createTileWfsOlLayer(content);
              } else {
                this._createStaticWfsOlLayer(content);
              }
            }
            break;
          case 'geojson':
            var vectorSource = new ol.source.Vector({
              features: new ol.format.GeoJSON().readFeatures(content.layers[0], {
                featureProjection: self.mapSRID
              })
            });
            olLayer = new ol.layer.Vector({
              source: vectorSource,
              style: function style(feature) {
                return self._vectorStyles[feature.getGeometry().getType()];
              }
            });
            content.olLayer = olLayer;
            break;
          case 'geowisescene':
            break;
          default:
            throw 'Unknown layer type: ' + content.type;
        }
      }
    }, {
      key: "_getLegendImages",
      value: function _getLegendImages(content) {
        for (var i = 0; i < content.layers.length; i++) {
          content.layers[i].legendImg = document.createElement('img');
          var legendUrl = this._buildWMSLegendURL(content.wmsSource, content.workspace, content.layers[i].layer);
          this.customImageLoadFunction(content.layers[i].legendImg, legendUrl, content.auth);
        }
      }
    }, {
      key: "_buildWMSLegendURL",
      value: function _buildWMSLegendURL(source, workspace, layer) {
        return "".concat(source, "/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=").concat(workspace, ":").concat(layer);
      }
    }, {
      key: "_createBaseLayerOlLayer",
      value: function _createBaseLayerOlLayer(content) {
        var _this2 = this;
        for (var j = 0; j < content.layers.length; j++) {
          var confLayer = content.layers[j];
          if (confLayer.type == 'XYZ') {
            var olLayer = new ol.layer.Tile({
              source: new ol.source.XYZ({
                url: confLayer.source,
                crossOrigin: 'Anonymous',
                imageLoadFunction: function imageLoadFunction(img, src) {
                  _this2.customImageLoadFunction(img, src, content.auth);
                }
              })
            });
            confLayer.olLayer = olLayer;
            confLayer.olLayer.setOpacity(confLayer.style ? confLayer.style.opacity : 1);
          } else if (confLayer.type == 'BingMaps') {
            var _olLayer = new ol.layer.Tile({
              visible: true,
              preload: Infinity,
              source: new ol.source.BingMaps({
                key: confLayer.key,
                imagerySet: confLayer.imagery,
                maxZoom: 19
              })
            });
            confLayer.olLayer = _olLayer;
            confLayer.olLayer.setOpacity(confLayer.style ? confLayer.style.opacity : 1);
          }
        }
      }
    }, {
      key: "_createImageWmsOlLayer",
      value: function _createImageWmsOlLayer(content) {
        var _this3 = this;
        var wmsSubLayers = [];
        for (var j = 0; j < content.layers.length; j++) {
          if (content.layers[j].display) {
            wmsSubLayers.push(content.workspace + ':' + content.layers[j].layer);
          }
        }
        var params = content.wmsParameters || {};
        params.layers = wmsSubLayers;
        return new ol.layer.Image({
          source: new ol.source.ImageWMS({
            url: content.wmsSource || content.source,
            params: params,
            ratio: 1,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',
            imageLoadFunction: function imageLoadFunction(img, src) {
              _this3.customImageLoadFunction(img, src, content.auth);
            }
          })
        });
      }
    }, {
      key: "_createTileWmsEOlLayer",
      value: function _createTileWmsEOlLayer(content) {
        var _this4 = this;
        for (var j = 0; j < content.layers.length; j++) {
          var params = content.wmsParameters || {};
          params.layers = content.workspace + ':' + content.layers[j].layer;
          var layer = content.layers[j];
          layer.olLayer = new ol.layer.Image({
            source: new ol.source.ImageWMS({
              url: content.wmsSource || content.source,
              params: {
                layers: content.workspace + ':' + content.layers[j].layer
              },
              ratio: 1,
              serverType: 'geoserver',
              crossOrigin: 'anonymous',
              imageLoadFunction: function imageLoadFunction(img, src) {
                _this4.customImageLoadFunction(img, src, content.auth);
              }
            })
          });
          console.log(content.wmsSource, content.source);
        }
      }
    }, {
      key: "_createTiledWmsOlLayer",
      value: function _createTiledWmsOlLayer(content) {
        var _this5 = this;
        for (var j = 0; j < content.layers.length; j++) {
          var layer = content.layers[j];
          var olLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
              url: layer.source,
              crossOrigin: 'Anonymous',
              imageLoadFunction: function imageLoadFunction(img, src) {
                _this5.customImageLoadFunction(img, src, content.auth);
              }
            })
          });
          layer.olLayer = olLayer;
          layer.olLayer.setOpacity(layer.style ? layer.style.opacity : 1);
        }
      }
    }, {
      key: "_createTileWmsOlLayer",
      value: function _createTileWmsOlLayer(content) {
        var _this6 = this;
        var wmsSubLayers = [];
        for (var j = 0; j < content.layers.length; j++) {
          if (content.layers[j].display) {
            wmsSubLayers.push(content.workspace + ':' + content.layers[j].layer);
          }
        }
        var params = content.wmsParameters;
        params.layers = wmsSubLayers;
        return new ol.layer.Tile({
          visible: true,
          preload: Infinity,
          source: new ol.source.TileWMS({
            url: content.wmsSource,
            params: params,
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0,
            crossOrigin: 'anonymous',
            imageLoadFunction: function imageLoadFunction(img, src) {
              _this6.customImageLoadFunction(img, src, content.auth);
            }
          })
        });
      }
    }, {
      key: "_createTileWfsOlLayer",
      value: function _createTileWfsOlLayer(content) {
        if (content.serviceParameters.format.toLowerCase() === 'pbf') {
          for (var j = 0; j < content.layers.length; j++) {
            var layer = content.layers[j];
            layer.olLayer = new ol.layer.VectorTile({
              //declutter: true,
              style: this.createVectorLayerStyle(layer),
              source: new ol.source.VectorTile({
                tilePixelRatio: 1,
                // oversampling when > 1
                tileGrid: ol.tilegrid.createXYZ(),
                format: new ol.format.MVT(),
                url: content.source + '/gwc/service/tms/1.0.0/' + content.workspace + ':' + layer.layer + '@' + content.serviceParameters.srs + '@pbf/{z}/{x}/{-y}.pbf'
              })
            });
            layer.olLayer.setOpacity(+layer.style.opacity || 1);
          }
        }
      }
    }, {
      key: "_createStaticWfsOlLayer",
      value: function _createStaticWfsOlLayer(content) {
        if (content.serviceParameters.format.toLowerCase() === 'geojson') {
          for (var j = 0; j < content.layers.length; j++) {
            var vectorSource = new ol.source.Vector({
              url: content.source + '/ows?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=5000&typeName=' + content.workspace + ':' + content.layers[j].layer + '&outputFormat=application%2Fjson&srsName=' + this.srid,
              format: new ol.format.GeoJSON()
            });
            content.layers[j].olLayer = new ol.layer.Vector({
              source: vectorSource
            });
          }
        }
      }
    }, {
      key: "createVectorLayerStyle",
      value: function createVectorLayerStyle(layer) {
        var olFill, olStroke, olImage, olCircle, olStyleFnc;
        var style = layer.style;
        switch (layer.primitive.toLowerCase()) {
          case 'polygon':
            olFill = new ol.style.Fill(style.fill);
            olStroke = new ol.style.Stroke(style.stroke);
            break;
          case 'line':
            olStroke = new ol.style.Stroke(style.stroke);
            break;
          case 'point':
            if (style.image) {
              olImage = new ol.style.Icon({
                anchor: style.image.anchor,
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                src: style.image.src
              });
            } else if (style.circle) {
              var circleStyle = {
                radius: style.circle.radius,
                fill: new ol.style.Fill(style.fill),
                stroke: new ol.style.Stroke(style.stroke)
              };
              olCircle = new ol.style.Circle(circleStyle);
            }
            break;
          default:
            break;
        }
        olStyleFnc = function olStyleFnc(feature) {
          // Graphic Style
          var olGraphicStyle = new ol.style.Style({
            fill: olFill,
            stroke: olStroke,
            image: olImage || olCircle
          });

          // Text Style
          var olTextStyle = null;
          if (style.label) {
            olTextStyle = new ol.style.Style();
            olTextStyle.setText(new ol.style.Text({
              font: style.label.size + 'px ' + style.label.font || 'Arial 12px',
              text: feature.get(style.label.text),
              fill: new ol.style.Fill({
                color: style.label.color || 'black'
              }),
              stroke: new ol.style.Stroke({
                color: 'white',
                width: 1
              }),
              placement: style.label.placement || 'point'
              // overflow: false,
              //textBaseline: 'middle',
              // textAlign: 'center',
              // offsetX: 0,
              // offsetY: 0
            }));
          }
          return olTextStyle ? [olGraphicStyle, olTextStyle] : olGraphicStyle;
        };
        return olStyleFnc;
      }
    }, {
      key: "_drawLayers",
      value: function _drawLayers() {
        this._updateLayersParms();
        var content;
        var confLayer;
        for (var i = 0; i < this._content.length; i++) {
          content = this._content[i];
          if (content.display) {
            if (content.olLayer) {
              this.ol.addLayer(content.olLayer);
            } else {
              for (var j = 0; j < content.layers.length; j++) {
                confLayer = content.layers[j];
                if (confLayer.display && confLayer.olLayer) {
                  this.ol.addLayer(confLayer.olLayer);
                }
              }
            }
          }
        }
        this.eventDispatcher('draw');
      }
    }, {
      key: "_setZIndex",
      value: function _setZIndex() {
        var content;
        var confLayer;
        var zIndexCount = 0;
        for (var i = this._content.length - 1; i >= 0; i--) {
          content = this._content[i];
          if (content.olLayer) {
            content.olLayer.setZIndex(++zIndexCount);
          } else {
            for (var j = content.layers.length - 1; j >= 0; j--) {
              confLayer = content.layers[j];
              if (confLayer.olLayer) {
                confLayer.olLayer.setZIndex(++zIndexCount);
              }
            }
          }
        }
      }
    }, {
      key: "_removeAllLayers",
      value: function _removeAllLayers() {
        var content;
        var confLayer;
        for (var i = this._content.length - 1; i >= 0; i--) {
          content = this._content[i];
          if (content.olLayer) {
            this.ol.removeLayer(content.olLayer);
          } else {
            for (var j = content.layers.length - 1; j >= 0; j--) {
              confLayer = content.layers[j];
              if (confLayer.olLayer) {
                this.ol.removeLayer(confLayer.olLayer);
              }
            }
          }
        }
        this.eventDispatcher('removeLayers');
      }
    }, {
      key: "_updateLayersParms",
      value: function _updateLayersParms() {
        for (var i = 0; i < this._content.length; i++) {
          var content = this._content[i];
          if (content.type !== 'vector' && content.display && content.olLayer) {
            var wmsSubLayers = [];
            for (var k = 0; k < content.layers.length; k++) {
              if (content.layers[k].display) {
                wmsSubLayers.push(content.workspace + ':' + content.layers[k].layer);
              }
            }
            if (wmsSubLayers.length > 0) {
              wmsSubLayers = wmsSubLayers.reverse();
              content.olLayer.getSource().updateParams({
                layers: wmsSubLayers
              });
            } else {
              content.display = false;
            }
          }
        }
      }
    }, {
      key: "_createDefaultPanels",
      value: function _createDefaultPanels() {
        var keys = Object.keys(this._panelPosition);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var panel = new GeoMapAll.Panel({
            position: this._panelPosition[key]
          });
          panel.map = this;
        }
      }
    }, {
      key: "getPanel",
      value: function getPanel(position) {
        for (var i = 0; i < this._panels.length; i++) {
          if (this._panels[i].position == position) {
            return this._panels[i];
          }
        }
      }
    }, {
      key: "_createDock",
      value: function _createDock(cssClass) {
        if (this._docks.indexOf(cssClass) > -1) {
          throw 'Dock já adicionado.';
        } else {
          this._docks.push(cssClass);
        }
        var dockElement = document.createElement('div');
        dockElement.className = cssClass;
        dockElement.id = "".concat(cssClass, "_").concat(this._target);
        document.getElementById(this._target).append(dockElement);
      }
    }, {
      key: "_createDefaultDocks",
      value: function _createDefaultDocks() {
        this._createDock('map-app-dock-bottom');
        this._createDock('map-app-dock-right');
        this._createDock('map-app-dock-left');
      }
    }, {
      key: "addControl",
      value: function addControl(control, subPanel) {
        control.map = this;
        control.initialize();
        if (control instanceof GeoMapAll.GeoSubPanel) {
          control.createSubPanelElement();
          control.registerControls();
        } else if (control instanceof GeoMapAll.GeoButton) {
          this._buttons.push(control);
        } else if (control instanceof GeoMapAll.GeoTool) {
          this._tools.push(control);
        }
        if (control._hasUI != false) {
          this._registerControlUIElem(control, subPanel);
        }
        control.eventDispatcher('ready');
      }
    }, {
      key: "_registerControlUIElem",
      value: function _registerControlUIElem(control, subPanel) {
        var targetElementId = '';

        // Define em qual panel ou subpanel o controle será adicionado
        if (!subPanel) {
          var postion = control.config.position || this._panelPosition.LEFT_TOP;
          control.panel = this.getPanel(postion);
          targetElementId = control.panel.elementId;
        } else {
          var hasPanel = false;
          control.panel = subPanel;
          targetElementId = subPanel;
          for (var i = 0; i < this._subPanels.length; i++) {
            if (this._subPanels[i].subPanelElementId == control.panel) {
              hasPanel = true;
            }
          }
          if (!hasPanel) {
            throw 'SubPainel inexistente.';
          }
        }
        var controlElement = document.createElement('div');
        control.element = controlElement;
        controlElement.className = "".concat(control.config.class, " map-app-control");
        controlElement.id = "".concat(targetElementId, "_control_").concat(control.id);
        document.getElementById(targetElementId).append(controlElement);
        if (control.config.tip) {
          var tipElement = null;
          controlElement.addEventListener('mouseover', function () {
            var top = 0;
            var left = 0;
            var right = 0;
            var onLeft = controlElement.parentElement.offsetLeft < document.getElementById(control.map.target).offsetWidth / 2;
            if (!control.parent) {
              // On Panel

              tipElement = document.getElementById("".concat(control.panel.elementId, "-tooltip"));
              top = controlElement.parentElement.offsetTop + controlElement.offsetTop;
              left = controlElement.parentElement.offsetLeft + controlElement.clientWidth;
              right = control.map.clientSize - controlElement.parentElement.offsetLeft;
            } else if (control.parent) {
              // On SubPanel

              var subPanelElement = document.getElementById(control.parent.subPanelElementId);
              tipElement = document.getElementById("".concat(control.parent.panel.elementId, "-tooltip"));
              top = subPanelElement.offsetTop;
              left = subPanelElement.clientWidth + subPanelElement.offsetLeft;
              right = control.map.clientSize - subPanelElement.offsetLeft;
            }
            if (!control.isOpen) {
              tipElement.innerHTML = control.config.tip;
              tipElement.style.display = 'block';
              tipElement.style.top = top + 'px';
              if (onLeft) {
                tipElement.style.left = left + 'px';
                tipElement.style.right = 'auto';
              } else {
                tipElement.style.right = right + 'px';
                tipElement.style.left = 'auto';
              }
            }
            controlElement.addEventListener('click', function () {
              tipElement.style.display = 'none';
            });
          });
          controlElement.addEventListener('mouseout', function () {
            tipElement.style.display = 'none';
          });
        }
        if (control instanceof GeoMapAll.GeoSubPanel) {
          control.elementId = controlElement.id;
          controlElement.addEventListener('click', function () {
            control.click();
          });
          var markerElement = document.createElement('div');
          markerElement.className = "map-app-control-marker-".concat(control.config.position || control.config.panel);
          controlElement.append(markerElement);
        } else if (control instanceof GeoMapAll.GeoButton) {
          controlElement.addEventListener('click', function () {
            control.click();
          });
        } else if (control instanceof GeoMapAll.GeoTool) {
          control.controlElement = controlElement;
          controlElement.addEventListener('click', function () {
            control.map.closeAllSubPanels();
            //control.map.closeAllTools();

            if (control.isActive) {
              control.deactivate();
              controlElement.classList.remove('map-app-control-active');
            } else {
              control.activate();
              controlElement.classList.add('map-app-control-active');
              if (control.parent) {
                var parentControl = document.getElementById(control.parent.elementId);
                parentControl.className = controlElement.className;
                control.parent.isOpen = true;
                control.parent.isActive = true;
              }
              control.eventDispatcher('activate');
            }
          });
          if (control instanceof GeoMapAll.GeoWidget) {
            control.createWidget();
          }
        }
      }
    }, {
      key: "closeAllTools",
      value: function closeAllTools() {
        for (var i = 0; i < this._tools.length; i++) {
          if (this._tools[i].isActive) {
            this._tools[i].deactivate();
            this._tools[i].isActive = false;
            this._tools[i].controlElement.classList.remove('map-app-control-active');
          }
        }
      }
    }, {
      key: "closeAllSubPanels",
      value: function closeAllSubPanels() {
        for (var i = 0; i < this._subPanels.length; i++) {
          this._subPanels[i].deactivate();
        }
      }
    }, {
      key: "openDock",
      value: function openDock(position, width) {
        if (!this._dockIsOpen[position]) {
          var dockId = "map-app-dock-".concat(position, "_").concat(this._target);
          var dockElement = document.getElementById(dockId);
          var dockWidth = 0;
          if (!width) {
            dockWidth = this.clientSize * 0.2 < 350 ? 350 : this.clientSize * 0.2;
            dockElement.style.width = "".concat(dockWidth / this.clientSize * 100, "%");
            this.mapElement.style.width = "".concat((this.clientSize - dockWidth) / this.clientSize * 100, "%");
          } else {
            dockElement.style.width = "".concat(width, "%");
            this.mapElement.style.width = "".concat(100 - width, "%");
          }
          this.mapElement.style.position = 'absolute';
          this.ol.updateSize();
          this._dockIsOpen[position] = true;
          return true;
        }
        return false;
      }
    }, {
      key: "getDock",
      value: function getDock(position) {
        var dockId = "map-app-dock-".concat(position, "_").concat(this._target);
        return document.getElementById(dockId);
      }
    }, {
      key: "closeDock",
      value: function closeDock(position) {
        //if (position == 'right') {

        var dockId = "map-app-dock-".concat(position, "_").concat(this.target);
        var dockElement = document.getElementById(dockId);
        var mapElement = this.mapElement;
        dockElement.style.width = "0px";
        mapElement.style.width = "100%";
        mapElement.style.right = "auto";
        mapElement.style.left = "auto";
        this.ol.updateSize();

        // }

        for (var i = 0; i < this._panels.length; i++) {
          this._panels[i]._restoreDefaultStyle();
        }
        this._dockIsOpen[position] = false;
      }
    }, {
      key: "unDockWidgetFrom",
      value: function unDockWidgetFrom(position) {
        for (var i = 0; i < this._tools.length; i++) {
          if (this._tools[i].onDock && this._tools[i].onDock == position) {
            this._tools[i].removeFromDock(position);
          }
        }
      }
    }, {
      key: "getMapAsDataURL",
      value: function getMapAsDataURL() {
        var mapCanvas = document.createElement('canvas');
        var size = this.ol.getSize();
        mapCanvas.width = size[0];
        mapCanvas.height = size[1];
        var mapContext = mapCanvas.getContext('2d');
        Array.prototype.forEach.call(document.querySelectorAll("#".concat(this.target, " canvas:not(.ol-overviewmap-map canvas)")), function (canvas) {
          if (canvas.width > 0) {
            var opacity = canvas.parentNode.style.opacity;
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
            var transform = canvas.style.transform;
            var matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
            CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
            mapContext.drawImage(canvas, 0, 0);
          }
        });
        return mapCanvas.toDataURL();
      }
    }, {
      key: "getLegend",
      value: function getLegend() {
        var legend = '';
        var content;
        var wmsSubLayers;
        for (var i = 0; i < this.content.length; i++) {
          content = this.content[i];
          if (content.display) {
            if (content.type.toLowerCase() === 'ogc' || content.type.toLowerCase() === 'wms') {
              wmsSubLayers = [];
              for (var j = 0; j < content.layers.length; j++) {
                var url = content.wmsSource || content.source + '/wms';
                if (content.layers[j].display) {
                  var symbol = '';
                  if (content.layers[j].legendImg) {
                    symbol = "<img class=\"img-legend-print\" src=\"".concat(content.layers[j].legendImg.src, "\"/>  ");
                  } else {
                    symbol = '<img class="img-legend-print" src="' + (url + '/?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=' + content.workspace + ':' + content.layers[j].layer) + '"/>';
                  }
                  wmsSubLayers.push('<div style="display: flex; width: max-content;"><div style="width: 20px; overflow: hidden; float: left">' + symbol + '</div><div>' + content.layers[j].name + '</div></div>');
                }
              }
              legend += wmsSubLayers.join('');
            }
          }
        }
        return legend;
      }
    }, {
      key: "_getDotsPerMapUnit",
      value: function _getDotsPerMapUnit() {
        var INCHES_PER_UNIT = {
          'm': 39.37,
          'dd': 4374754
        };
        var div = document.createElement('div');
        div.style.height = '1in';
        div.style.width = '1in';
        div.style.top = '-100%';
        div.style.left = '-100%';
        div.style.position = 'absolute';
        document.body.appendChild(div);
        var dpi = div.offsetHeight;
        document.body.removeChild(div);
        var unit = this._map2D.getView().getProjection().getUnits();
        return INCHES_PER_UNIT[unit] * dpi;
      }
    }, {
      key: "getResolutionFromScale",
      value: function getResolutionFromScale(scaleDenominator) {
        return parseInt(scaleDenominator) / this._getDotsPerMapUnit();
      }
    }, {
      key: "getScaleDenominator",
      value: function getScaleDenominator() {
        var constant = this._getDotsPerMapUnit();
        var resolution = this._map2D.getView().getResolution();
        return Math.round(resolution * constant);
      }
    }, {
      key: "setScaleDenominator",
      value: function setScaleDenominator(scaleDenominator) {
        var resolution = this.getResolutionFromScale(scaleDenominator);
        this._map2D.getView().setResolution(resolution);
      }
    }, {
      key: "updateSize",
      value: function updateSize() {
        this._map2D.updateSize();
      }
    }, {
      key: "_saveDefaultStyle",
      value: function _saveDefaultStyle() {
        this._defaultStyle = Object.assign({}, this.mapElement.style);
      }
    }, {
      key: "_restoreDefaultStyle",
      value: function _restoreDefaultStyle() {
        this.mapElement.style = this._defaultStyle;
      }
    }, {
      key: "_jsonToGeometry",
      value: function _jsonToGeometry(json) {
        return new ol.format.GeoJSON().readGeometry(json);
      }
    }, {
      key: "_wktToGeometry",
      value: function _wktToGeometry(json) {
        return new ol.format.WKT().readGeometry(json);
      }
    }, {
      key: "_fitGeometry",
      value: function _fitGeometry(geometryOrExtent, zoomPercentage) {
        var mapView = this._map2D.getView();
        var mapSize = this._map2D.getSize();
        var paddingX = mapSize[0] * zoomPercentage;
        var paddingY = mapSize[1] * zoomPercentage;
        if (Array.isArray(geometryOrExtent)) {
          mapView.fit(geometryOrExtent, {
            constrainResolution: false,
            padding: [paddingY, paddingX, paddingY, paddingX]
          });
        } else {
          if (geometryOrExtent.getCoordinates().length > 0) {
            mapView.fit(geometryOrExtent.getExtent(), {
              constrainResolution: false,
              padding: [paddingY, paddingX, paddingY, paddingX]
            });
          }
        }
        var minResolution = mapView.getMinResolution();
        var currentResolution = mapView.getResolution();
        if (currentResolution < minResolution) {
          mapView.setResolution(minResolution);
        }
      }
    }, {
      key: "toOlGeom",
      value: function toOlGeom(geometry, format) {
        var geom = null;
        if (format === 'geojson') {
          geom = this._jsonToGeometry(geometry);
        } else if (format === 'wkt') {
          geom = this._wktToGeometry(geometry);
        } else if (format === 'openlayers') {
          return geometry;
        } else {
          throw "Formato n\xE3o suportado \"".concat(format, "\".");
        }
        return geom;
      }
    }, {
      key: "fitTo",
      value: function fitTo(geometry, format) {
        var zoomPercentage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.05;
        var geom = this.toOlGeom(geometry, format);
        this._fitGeometry(geom, zoomPercentage);
      }
    }, {
      key: "fitToDrawingGeometries",
      value: function fitToDrawingGeometries() {
        var zoomPercentage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.05;
        var source = this._graphicsLayer.getSource();
        var featureCount = source.getFeatures().length;
        if (featureCount > 0) {
          var geometry = source.getExtent();
          this.fitTo(geometry, 'openlayers', zoomPercentage);
        }
      }
    }, {
      key: "drawGeometry",
      value: function drawGeometry(geometry, format) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var fitToGeometry = options.fitToGeometry || false;
        var zoomPercentage = typeof options.zoomPercentage === 'undefined' ? 0.05 : options.zoomPercentage;
        var geom = this.toOlGeom(geometry, format);
        geom.transform(options.srid || this.ol.getView().getProjection().getCode(), this.ol.getView().getProjection().getCode());
        var feature = new ol.Feature({
          geometry: geom
        });
        if (options.style) {
          feature.setStyle(options.style);
        }
        this._graphicsLayer.getSource().addFeature(feature);
        if (fitToGeometry) {
          this._fitGeometry(geom, zoomPercentage);
        }
      }
    }, {
      key: "clearDrawingGeometries",
      value: function clearDrawingGeometries() {
        this._graphicsLayer.getSource().clear();
      }
    }, {
      key: "notify",
      value: function notify(message, config) {
        config = config || {};
        var msgElementId = "map_float_msg_".concat(this.target);
        var msgElement = document.createElement('div');
        msgElement.className = 'map-app-float-dlg';
        msgElement.id = msgElementId;
        msgElement.innerHTML = message;
        var mapElement = document.getElementById(this.target);
        mapElement.appendChild(msgElement);
        document.getElementById(msgElementId).style.display = 'block';

        // Events
        window.setTimeout(function () {
          mapElement.removeChild(msgElement);
        }, config.time || 5000);
      }
    }, {
      key: "eventDispatcher",
      value: function eventDispatcher(eventName, data) {
        this._verifyEventName(eventName);
        for (var i = 0; i < this._events[eventName].length; i++) {
          this._events[eventName][i](data);
        }
      }
    }, {
      key: "on",
      value: function on(eventName, callback) {
        this._verifyEventName(eventName);
        this._events[eventName].push(callback);
      }
    }, {
      key: "un",
      value: function un(eventName, callback) {
        this._verifyEventName(eventName);
        this._events[eventName] = this._events[eventName].filter(function (item) {
          return item !== callback;
        });
      }
    }, {
      key: "_verifyEventName",
      value: function _verifyEventName(eventName) {
        if (Object.keys(this._events).indexOf(eventName) === -1) {
          throw 'Event does not exist: "' + eventName + '".';
        }
      }
    }, {
      key: "setTarget",
      value: function setTarget(target) {
        if (typeof target === 'string') {
          target = document.getElementById(target);
        }
        target.appendChild(this.containerElement);
      }
    }, {
      key: "hideDisabledControls",
      value: function hideDisabledControls() {
        // Tools
        for (var i = 0; i < this._tools.length; i++) {
          var tool = this._tools[i];
          if (!tool.isActive && tool.controlElement) {
            tool.controlElement.style.display = 'none';
          }
        }

        // Buttons
        for (var _i = 0; _i < this._buttons.length; _i++) {
          var buttom = this._buttons[_i];
          if (!buttom.isActive && buttom.element) {
            buttom.element.style.display = 'none';
          }
        }

        // subpanels
        for (var _i2 = 0; _i2 < this._subPanels.length; _i2++) {
          var subpanel = this._subPanels[_i2];
          subpanel.deactivate();
          if (!subpanel.isActive && subpanel.element) {
            subpanel.element.style.display = 'none';
          }
        }
      }
    }, {
      key: "hideAllControls",
      value: function hideAllControls() {
        // Tools
        for (var i = 0; i < this._tools.length; i++) {
          var tool = this._tools[i];
          if (tool.controlElement) {
            tool.controlElement.style.display = 'none';
          }
        }

        // Buttons
        for (var _i3 = 0; _i3 < this._buttons.length; _i3++) {
          var buttom = this._buttons[_i3];
          if (buttom.element) {
            buttom.element.style.display = 'none';
          }
        }

        // subpanels
        for (var _i4 = 0; _i4 < this._subPanels.length; _i4++) {
          var subpanel = this._subPanels[_i4];
          subpanel.deactivate();
          if (subpanel.element) {
            subpanel.element.style.display = 'none';
          }
        }
      }
    }, {
      key: "showDisabledControls",
      value: function showDisabledControls() {
        // Tools
        for (var i = 0; i < this._tools.length; i++) {
          var tool = this._tools[i];
          if (tool.controlElement) {
            tool.controlElement.style.display = 'block';
          }
        }

        // Buttons
        for (var _i5 = 0; _i5 < this._buttons.length; _i5++) {
          var buttom = this._buttons[_i5];
          if (buttom.element) {
            buttom.element.style.display = 'block';
          }
        }

        // subpanels
        for (var _i6 = 0; _i6 < this._subPanels.length; _i6++) {
          var subpanel = this._subPanels[_i6];
          if (subpanel.element) {
            subpanel.element.style.display = 'block';
          }
        }
      }
    }, {
      key: "getModifiedStyles",
      value: function getModifiedStyles() {
        var contentStyle = [];
        var content;
        for (var i = 0; i < this.content.length; i++) {
          content = this.content[i];
          for (var j = 0; j < content.layers.length; j++) {
            if (content.layers[j].modifiedStyle) {
              contentStyle.push({
                id: content.layers[j].id,
                style: content.layers[j].style
              });
            }
          }
        }
        return contentStyle;
      }
    }, {
      key: "customImageLoadFunction",
      value: function customImageLoadFunction(img, src, auth) {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", src, true);
        oReq.responseType = "blob";
        if (auth) {
          oReq.setRequestHeader('Authorization', auth);
        }
        oReq.onload = function () {
          var urlCreator = window.URL || window.webkitURL;
          var blob = oReq.response;
          var imageUrl = urlCreator.createObjectURL(blob);
          if (img.getImage) {
            img.getImage().src = imageUrl;
          } else {
            img.src = imageUrl;
          }
        };
        oReq.send();
      }
    }, {
      key: "customVectorLoadFunction",
      value: function customVectorLoadFunction(vectorSource, url, auth) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        if (auth) {
          xhr.setRequestHeader('Authorization', auth);
        }
        xhr.onload = function () {
          if (xhr.status == 200) {
            vectorSource.addFeatures(vectorSource.getFormat().readFeatures(xhr.responseText));
          }
        };
        xhr.send();
      }
    }]);
  }();
  var UnitsCoversion = {
    m: {
      km: 1 / 1000,
      mi: 1 / 1609.344,
      m: 1
    },
    km: {
      m: 1000,
      mi: 1 / 1.609344,
      km: 1
    },
    m2: {
      ha: 1 / 1e-4,
      km2: 1e-6,
      acre: 1 / 4046.856,
      m2: 1,
      sf: 10.7639
    },
    dd: {
      dd: 1
    },
    sf: {
      m2: 0.092903,
      sf: 1
    }
  };

  var ZoomIn = /*#__PURE__*/function (_GeoButton) {
    function ZoomIn(config) {
      _classCallCheck(this, ZoomIn);
      config = config || {};
      config.tip = config.tip || 'Aproximar';
      config.class = config.class || 'map-app-zoomin-control';
      return _callSuper(this, ZoomIn, [config]);
    }
    _inherits(ZoomIn, _GeoButton);
    return _createClass(ZoomIn, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "click",
      value: function click() {
        var zoom = this.map.ol.getView().getZoom() + 1;
        this.map.ol.getView().setZoom(zoom);
      }
    }]);
  }(GeoButton);

  var ZoomOut = /*#__PURE__*/function (_GeoButton) {
    function ZoomOut(config) {
      _classCallCheck(this, ZoomOut);
      config = config || {};
      config.tip = config.tip || 'Afastar';
      config.class = config.class || 'map-app-zoomout-control';
      return _callSuper(this, ZoomOut, [config]);
    }
    _inherits(ZoomOut, _GeoButton);
    return _createClass(ZoomOut, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "click",
      value: function click() {
        var zoom = this.map.ol.getView().getZoom() - 1;
        this.map.ol.getView().setZoom(zoom);
      }
    }]);
  }(GeoButton);

  var ZoomExtent = /*#__PURE__*/function (_GeoButton) {
    function ZoomExtent(config) {
      var _this;
      _classCallCheck(this, ZoomExtent);
      _this = _callSuper(this, ZoomExtent, [config]);
      config = config || {};
      config.tip = config.tip || 'Aproximar para a extensão';
      _this._extent = config.extent || [-180, -90, 180, 90];
      _this._srid = config.srid || 'EPSG:4326';
      _this._forceInit = config.forceOnInitialize;
      return _this;
    }
    _inherits(ZoomExtent, _GeoButton);
    return _createClass(ZoomExtent, [{
      key: "initialize",
      value: function initialize() {
        if (this._forceInit) {
          this.click();
        }
      }
    }, {
      key: "click",
      value: function click() {
        var extent$$1 = ol.proj.transformExtent(this._extent, this._srid, this.map.srid);
        this.map.ol.getView().fit(extent$$1);
      }
    }]);
  }(GeoButton);

  var ZoomByRect = /*#__PURE__*/function (_GeoTool) {
    function ZoomByRect(config) {
      var _this;
      _classCallCheck(this, ZoomByRect);
      config = config || {};
      config.tip = config.tip || 'Zoom por Região';
      config.class = config.class || 'map-app-zoom-rect-control';
      _this = _callSuper(this, ZoomByRect, [config]);
      _this._drawPromise = null;
      return _this;
    }
    _inherits(ZoomByRect, _GeoTool);
    return _createClass(ZoomByRect, [{
      key: "initialize",
      value: function initialize() {
        if (!this.map.toolbox.draw) {
          throw 'DrawControl is not instantiated';
        }
      }
    }, {
      key: "_setZoom",
      value: function _setZoom() {
        var _this2 = this;
        this._drawPromise = this.map.toolbox.draw.getBox();
        this._drawPromise.then(function (feature) {
          var geom = feature.getGeometry();
          _this2.map.ol.getView().fit(geom, _this2.map.ol.getSize());
          _this2._setZoom();
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        _get(_getPrototypeOf(ZoomByRect.prototype), "activate", this).call(this);
        this._setZoom();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this._drawPromise = null;
        this.map.toolbox.draw.stopDrawing();
        _get(_getPrototypeOf(ZoomByRect.prototype), "deactivate", this).call(this);
      }
    }]);
  }(GeoTool);

  var GoToHome = /*#__PURE__*/function (_GeoButton) {
    function GoToHome(config) {
      _classCallCheck(this, GoToHome);
      config = config || {};
      config.tip = config.tip || 'Ir para o início';
      config.class = config.class || 'map-app-home-control';
      return _callSuper(this, GoToHome, [config]);
    }
    _inherits(GoToHome, _GeoButton);
    return _createClass(GoToHome, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "click",
      value: function click() {
        var zoom = this.map.config.initialZoom || 15;
        var center = [0, 0];
        if (this.map.config.center) {
          center = ol.proj.transform(this.map.config.center.coordinates, this.map.config.center.srid || 'EPSG:4326', this.map.ol.getView().getProjection().getCode());
        }
        this.map.ol.getView().animate({
          center: center,
          zoom: zoom,
          duration: 1000
        });
      }
    }]);
  }(GeoButton);

  var Measure = /*#__PURE__*/function (_GeoWidget) {
    function Measure(config) {
      var _this;
      _classCallCheck(this, Measure);
      config = config || {};
      config.tip = config.tip || 'Medir';
      config.title = config.title || 'Medir';
      config.class = config.class || 'map-app-measure-line-control';
      config.geometryType = config.geometryType || 'linestring';
      _this = _callSuper(this, Measure, [config]);
      _this._pointBtnElement = null;
      _this._lineBtnElement = null;
      _this._polygonBtnElement = null;
      _this._azimuthBtnElement = null;
      _this._tipElement = null;
      _this._textContainer = null;
      _this._tipMsg = '';
      _this._initialMsg = 'Selecione uma ferramenta';
      _this._layer = null;
      _this._overlays = [];
      _this._pointStyle = null;
      _this._lineStyle = null;
      _this._polygontStyle = null;
      _this.ui = _this.builUi();
      return _this;
    }
    _inherits(Measure, _GeoWidget);
    return _createClass(Measure, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerEvents();
        });
      }
    }, {
      key: "_initLayer",
      value: function _initLayer() {
        this._layer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#000',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#000'
              })
            })
          })
        });
        this._layer.setZIndex(999);
        this.map.ol.addLayer(this._layer);
      }
    }, {
      key: "_initSefaultStyles",
      value: function _initSefaultStyles() {
        this._pointStyle = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
              color: 'rgba(255,255,255,0.5)'
            }),
            stroke: new ol.style.Stroke({
              color: '#F0F',
              width: 2
            })
          })
        });
        this._lineStyle = new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0, 255, 255, 0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: 'cyan',
            width: 1.5
          })
        });
        this._polygonStyle = new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255,255,255,0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: '#F0F',
            width: 2
          })
        });
      }
    }, {
      key: "builUi",
      value: function builUi() {
        var measureElement = document.createElement('div');
        measureElement.className = 'map-app-measure-content';
        var btnsContainer = document.createElement('div');
        btnsContainer.style.display = 'flex';
        this._tipMsg = this._initialMsg;
        this._textContainer = document.createElement('div');
        this._textContainer.className = 'map-app-measure-tip';
        this._textContainer.innerHTML = this._tipMsg;
        this._pointBtnElement = document.createElement('div');
        this._pointBtnElement.className = 'map-app-measure-btn map-app-measure-point';
        this._lineBtnElement = document.createElement('div');
        this._lineBtnElement.className = 'map-app-measure-btn map-app-measure-line';
        this._polygonBtnElement = document.createElement('div');
        this._polygonBtnElement.className = 'map-app-measure-btn map-app-measure-polygon';
        this._azimuthBtnElement = document.createElement('div');
        this._azimuthBtnElement.className = 'map-app-measure-btn map-app-measure-azimuth';
        this._clearBtnElement = document.createElement('div');
        this._clearBtnElement.className = 'map-app-measure-btn map-app-measure-clear';
        btnsContainer.appendChild(this._pointBtnElement);
        btnsContainer.appendChild(this._lineBtnElement);
        btnsContainer.appendChild(this._polygonBtnElement);
        btnsContainer.appendChild(this._azimuthBtnElement);
        btnsContainer.appendChild(this._clearBtnElement);
        measureElement.appendChild(btnsContainer);
        measureElement.appendChild(this._textContainer);
        //measureElement.appendChild(this._clearBtnElement);

        return measureElement;
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        // Click
        this._pointBtnElement.addEventListener('click', function () {
          _this3._tipMsg = 'Clique no mapa para obter um ponto';
          _this3.map.toolbox.draw.getPoint().then(function (point) {
            _this3._tipMsg = _this3._initialMsg;
            _this3._textContainer.innerHTML = _this3._tipMsg;
            _this3._overlays.push(_this3.map.geodesc.pointDescriptor(point.getGeometry()));
            _this3._layer.getSource().addFeature(point);
          });
        });
        this._lineBtnElement.addEventListener('click', function () {
          _this3._tipMsg = 'Clique no mapa para desenhar uma linha';
          _this3.map.toolbox.draw.getPolyline().then(function (line) {
            _this3._tipMsg = _this3._initialMsg;
            _this3._textContainer.innerHTML = _this3._tipMsg;
            _this3._overlays.push(_this3.map.geodesc.lineDescriptor(line.getGeometry()));
            _this3._layer.getSource().addFeature(line);
          });
        });
        this._polygonBtnElement.addEventListener('click', function () {
          _this3._tipMsg = 'Clique no mapa para obter um polígono';
          _this3.map.toolbox.draw.getPolygon().then(function (polygon) {
            _this3._tipMsg = _this3._initialMsg;
            _this3._textContainer.innerHTML = _this3._tipMsg;
            _this3._overlays.push(_this3.map.geodesc.polygonDescriptor(polygon.getGeometry()));
            _this3._layer.getSource().addFeature(polygon);
          });
        });
        this._azimuthBtnElement.addEventListener('click', function () {
          _this3._tipMsg = 'Clique no mapa para desenhar uma direção';
          _this3.map.toolbox.draw.getPolyline().then(function (pline) {
            _this3._tipMsg = _this3._initialMsg;
            _this3._textContainer.innerHTML = _this3._tipMsg;
            _this3._overlays.push(_this3.map.geodesc.azimuthDescriptor(pline.getGeometry()));
            _this3._layer.getSource().addFeature(pline);
          });
        });
        this._clearBtnElement.addEventListener('click', function () {
          _this3._clearOverlays();
          _this3._clearGeoms();
        });

        // MouseOver
        this._pointBtnElement.addEventListener('mouseover', function () {
          _this3._textContainer.innerHTML = 'Obter coordenadas';
          _this3._textContainer.style.display = 'block';
        });
        this._lineBtnElement.addEventListener('mouseover', function () {
          _this3._textContainer.innerHTML = 'Medir distâncias';
          _this3._textContainer.style.display = 'block';
        });
        this._polygonBtnElement.addEventListener('mouseover', function () {
          _this3._textContainer.innerHTML = 'Medir áreas';
          _this3._textContainer.style.display = 'block';
        });
        this._azimuthBtnElement.addEventListener('mouseover', function () {
          _this3._textContainer.innerHTML = 'Obter azimute';
          _this3._textContainer.style.display = 'block';
        });
        this._clearBtnElement.addEventListener('mouseover', function () {
          _this3._textContainer.innerHTML = 'Limpar medidas';
          _this3._textContainer.style.display = 'block';
        });

        // MouseOut
        this._pointBtnElement.addEventListener('mouseout', function () {
          _this3._textContainer.innerHTML = _this3._tipMsg;
        });
        this._lineBtnElement.addEventListener('mouseout', function () {
          _this3._textContainer.innerHTML = _this3._tipMsg;
        });
        this._polygonBtnElement.addEventListener('mouseout', function () {
          _this3._textContainer.innerHTML = _this3._tipMsg;
        });
        this._azimuthBtnElement.addEventListener('mouseout', function () {
          _this3._textContainer.innerHTML = _this3._tipMsg;
        });
        this._clearBtnElement.addEventListener('mouseout', function () {
          _this3._textContainer.innerHTML = _this3._tipMsg;
        });
      }
    }, {
      key: "_clearOverlays",
      value: function _clearOverlays() {
        this.map.ol.getOverlays().clear();
      }
    }, {
      key: "_clearGeoms",
      value: function _clearGeoms() {
        this._layer.getSource().clear();
      }
    }, {
      key: "activate",
      value: function activate() {
        this._initSefaultStyles();
        this._initLayer();
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this._clearOverlays();
        this._clearGeoms();
        this.hide();
      }
    }]);
  }(GeoWidget);

  var LayerSwitcher = /*#__PURE__*/function (_GeoWidget) {
    function LayerSwitcher(config) {
      var _this;
      _classCallCheck(this, LayerSwitcher);
      config = config || {};
      config.tip = config.tip || 'Camadas';
      config.title = config.title || 'Camadas';
      config.class = config.class || 'map-app-layer-switcher-control';
      config.docked = config.docked || true;
      config.minWidth = config.minWidth || '200';
      config.minHeight = config.minHeight || '400';
      config.maxWidth = config.maxWidth || '200';
      config.maxHeight = config.maxHeight || '500';
      _this = _callSuper(this, LayerSwitcher, [config]);
      _this.ui = null;
      _this._listElm = null;
      return _this;
    }
    _inherits(LayerSwitcher, _GeoWidget);
    return _createClass(LayerSwitcher, [{
      key: "initialize",
      value: function initialize() {
        this.ui = this.builUi();
        this._overlay = new ol.Overlay({
          position: [0, 0],
          positioning: 'left-top',
          element: document.createElement('div'),
          stopEvent: false,
          autoPan: true,
          autoPanMargin: 100
        });
        this.map.ol.addOverlay(this._overlay);
      }
    }, {
      key: "builUi",
      value: function builUi() {
        var listElm = document.createElement('ul');
        listElm.className = 'list-group';
        listElm.style.width = '100%';
        return listElm;
      }
    }, {
      key: "_listLayers",
      value: function _listLayers() {
        var _this2 = this;
        this.ui.innerHTML = '';
        var layerCount = this.map.content.length;
        for (var i = 0; i < layerCount; i++) {
          var group = this.map.content[i];
          if (group.name != 'Service Layer') {
            var liElm = this._createItemElms({
              title: group.name,
              isGroup: true,
              i: i,
              class: 'map-app-ls-title',
              isFirstItem: i == 0,
              isLastItem: i == layerCount - 1,
              display: group.display,
              source: group
            });
            this.ui.appendChild(liElm);
            var ulElm = document.createElement('ul');
            ulElm.className = 'list-group list-group-flush ' + group.class + "".concat(this.map.content[i].isOpen ? '' : ' d-none');
            ulElm.style.width = '100%';
            ulElm.dataset.gbGroup = i;
            for (var j = 0; j < group.layers.length; j++) {
              var layer = group.layers[j];
              var _liElm = this._createItemElms({
                title: layer.name,
                isGroup: false,
                class: '',
                i: i,
                j: j,
                isFirstItem: j == 0,
                isLastItem: j == group.layers.length - 1,
                isUnique: group.layers.length == 1,
                img: layer.legendImg,
                display: layer.display,
                source: layer,
                group: group
              });
              ulElm.appendChild(_liElm);
            }
            this.ui.appendChild(ulElm);
          }
        }
        this.ui.addEventListener('click', function (e) {
          if (!e.target.classList.contains('map-app-ls-group-menu')) {
            var menus = _this2.ui.getElementsByClassName('map-app-ls-list-menu');
            for (var _i = 0; _i < menus.length; _i++) {
              menus[_i].classList.add('d-none');
            }
          }
        });
      }
    }, {
      key: "_createItemElms",
      value: function _createItemElms(conf) {
        var _this3 = this;
        var liElm = document.createElement('li');
        liElm.className = 'list-group-item pt-2 pb-2 pr-0 mr-0 map-app-ls-font ' + conf.class;
        liElm.style.fontSize = '14px';
        var rowElm = document.createElement('div');
        rowElm.className = 'row pr-0 mr-0 ';
        var titleElm = document.createElement('div');
        titleElm.className = 'col overflow-hidden pr-0 mr-0 ';
        titleElm.innerHTML = conf.title;
        var upElm = document.createElement('div');
        upElm.title = 'Mover para cima';
        upElm.innerHTML = 'Mover para cima';
        upElm.className = 'map-app-up';
        var downElm = document.createElement('div');
        downElm.title = 'Mover para baixo';
        downElm.innerHTML = 'Mover para baixo';
        downElm.className = 'map-app-down';
        var explodeElm = document.createElement('div');
        explodeElm.title = 'Separar camada';
        explodeElm.innerHTML = 'Separar camada';
        explodeElm.className = 'map-app-explode';
        var groupElm = document.createElement('div');
        groupElm.title = 'Agrupar com...';
        groupElm.innerHTML = 'Agrupar com...';
        groupElm.className = 'map-app-union ';
        var infoElm = document.createElement('div');
        infoElm.title = 'Identificar feição';
        infoElm.innerHTML = 'Identificar feição';
        infoElm.className = 'map-app-map-info ';
        var menuElm = document.createElement('div');
        menuElm.title = 'Menu';
        menuElm.className = 'col-1 map-app-ls-group-menu';
        menuElm.style.marginRight = '15px';
        var listElm = document.createElement('div');
        listElm.className = 'map-app-ls-list-menu d-none';
        menuElm.append(listElm);
        var groupListElm = document.createElement('div');
        groupListElm.className = 'map-app-ls-list-menu d-none ';
        menuElm.append(groupListElm);
        var _loop = function _loop(i) {
          var group = _this3.map.content[i];
          if (group.type.toLowerCase() == 'wms') {
            var _groupElm = document.createElement('div');
            _groupElm.title = group.name;
            _groupElm.innerHTML = group.name;
            _groupElm.className = 'map-app-no-icon-menu';
            groupListElm.append(_groupElm);
            _groupElm.addEventListener('click', function () {
              var layer = Object.assign({}, _this3.map.content[conf.i].layers[conf.j]);
              _this3.map.content[i].layers.push(layer);
              _this3.map.content[conf.i].layers.splice(conf.j, 1);
              if (_this3.map.content[conf.i].layers.length == 0) {
                _this3.map.content.splice(conf.i, 1);
              }
              _this3._listLayers();
              _this3.map._removeAllLayers();
              _this3.map._drawLayers();
              new Notify({
                message: "\"".concat(layer.name, "\" adicionado ao grupo \"").concat(_this3.map.content[i].name, "\"."),
                type: 'success',
                timeout: 5
              }).show();
            });
          }
        };
        for (var i = 0; i < this.map.content.length; i++) {
          _loop(i);
        }
        var checkElm = document.createElement('div');
        checkElm.className = 'map-app-ls-group-visibility ' + (conf.display ? 'map-app-checked' : 'map-app-unchecked');
        titleElm.prepend(checkElm);
        rowElm.appendChild(titleElm);
        listElm.appendChild(explodeElm);
        listElm.appendChild(upElm);
        listElm.appendChild(downElm);
        rowElm.appendChild(menuElm);
        liElm.appendChild(rowElm);
        if (conf.isGroup) {
          explodeElm.classList.add('d-none');
          titleElm.style.fontWeight = 600;
          titleElm.style.padding = 0;
          var expandElm = document.createElement('div');
          //expandElm.className = 'map-app-ls-group-expand ' + (conf.source.class != 'd-none' ?  'map-app-ls-group-expand-collapse' : '');
          expandElm.className = 'map-app-ls-group-expand';
          expandElm.style.marginRight = '15px';
          menuElm.style.marginRight = '0';
          rowElm.append(expandElm);
          expandElm.addEventListener('click', function () {
            var listElm = document.querySelector("[data-gb-group='".concat(conf.i, "']"));
            var isHidden = listElm.classList.contains('d-none');
            if (isHidden) {
              conf.source.class = '';
              listElm.classList.remove('d-none');
              expandElm.classList.add('map-app-ls-group-expand-collapse');
              _this3.map.content[conf.i].isOpen = true;
            } else {
              conf.source.class = 'd-none';
              listElm.classList.add('d-none');
              expandElm.classList.remove('map-app-ls-group-expand-collapse');
              _this3.map.content[conf.i].isOpen = false;
            }
          });
        } else {
          listElm.appendChild(groupElm);
          listElm.appendChild(infoElm);
          rowElm.classList.add('ml-1');
          if (conf.source.showLegend && conf.img) {
            conf.img.classList.add('map-app-ls-img');
            liElm.append(conf.img);
          }
        }
        if (conf.isUnique) {
          explodeElm.classList.add('map-app-clear-btn-layer');
        }
        if (conf.isFirstItem) {
          upElm.classList.add('map-app-clear-btn-layer');
        }
        if (conf.isLastItem) {
          downElm.classList.add('map-app-clear-btn-layer');
        }
        upElm.addEventListener('click', function () {
          _this3._moveLayer(conf, -1);
          new Notify({
            message: "\"".concat(conf.source.name, "\" movido para cima."),
            type: 'success',
            timeout: 5
          }).show();
        });
        downElm.addEventListener('click', function () {
          _this3._moveLayer(conf, +1);
          new Notify({
            message: "\"".concat(conf.source.name, "\" movido para baixo."),
            type: 'success',
            timeout: 5
          }).show();
        });
        explodeElm.addEventListener('click', function () {
          _this3._explodeLayer(conf);
          new Notify({
            message: "\"".concat(conf.source.name, "\" separado com sucesso!"),
            type: 'success',
            timeout: 5
          }).show();
        });
        groupElm.addEventListener('click', function (e) {
          e.stopImmediatePropagation();
          groupListElm.classList.remove('d-none');
        });
        infoElm.addEventListener('click', function (e) {
          _this3._getFeatureInfo(conf);
        });
        checkElm.addEventListener('click', function (evt) {
          var display;
          if (conf.isGroup) {
            _this3.map.content[conf.i].display = !_this3.map.content[conf.i].display;
            display = _this3.map.content[conf.i].display;
            if (evt.ctrlKey) {
              for (var _i2 = 0; _i2 < _this3.map.content[conf.i].layers.length; _i2++) {
                _this3.map.content[conf.i].layers[_i2].display = display;
              }
            }
          } else {
            _this3.map.content[conf.i].layers[conf.j].display = !_this3.map.content[conf.i].layers[conf.j].display;
            display = _this3.map.content[conf.i].layers[conf.j].display;
          }
          checkElm.className = 'map-app-ls-group-visibility ' + (display ? 'map-app-checked' : 'map-app-unchecked');
          _this3.map._removeAllLayers();
          _this3.map._drawLayers();
          _this3._listLayers();
        });
        menuElm.addEventListener('click', function () {
          var isHidden = listElm.classList.contains('d-none');
          if (isHidden) {
            listElm.classList.remove('d-none');
          } else {
            listElm.classList.add('d-none');
          }
        });
        return liElm;
      }
    }, {
      key: "_arrayMove",
      value: function _arrayMove(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
      }
    }, {
      key: "_moveLayer",
      value: function _moveLayer(conf, offset) {
        var arr = conf.isGroup ? this.map.content : this.map.content[conf.i].layers;
        var idx = conf.isGroup ? conf.i : conf.j;
        this._arrayMove(arr, idx, idx + offset);
        this._listLayers();
        this._reloadLayers();
      }
    }, {
      key: "_explodeLayer",
      value: function _explodeLayer(conf) {
        var layer = Object.assign({}, this.map.content[conf.i].layers[conf.j]);
        var group = Object.assign({}, this.map.content[conf.i]);
        group.layers = [];
        group.layers.push(layer);
        group.name = layer.name;
        layer.originalI = conf.i;
        layer.originalJ = conf.j;
        this.map.content[conf.i].layers.splice(conf.j, 1);
        this.map.content.splice(0, 0, group);
        this._listLayers();
        this._reloadLayers();
      }
    }, {
      key: "_removeAllLayers",
      value: function _removeAllLayers() {
        var groupCount = this.map.content.length;
        for (var i = 0; i < groupCount; i++) {
          var group = this.map.content[i];
          if (group.olLayer) {
            this.map.ol.removeLayer(group.olLayer);
            delete group.olLayer;
          } else {
            for (var j = 0; j < group.layers.length; j++) {
              var layer = group.layers[j];
              this.map.ol.removeLayer(layer.olLayer);
              delete layer.olLayer;
            }
          }
        }
      }
    }, {
      key: "_getGeometryName",
      value: function _getGeometryName(conf) {
        return new Promise(function (resolve, reject) {
          var url = conf.group.source + '/wfs?service=wfs&version=1.0.0&request=GetFeature&' + 'typeNames=' + conf.group.workspace + ':' + conf.source.layer + '&' + 'maxFeatures=1&' + 'outputFormat=application/json&' + 'exceptions=application/json';
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          if (conf.group.auth) {
            xhr.setRequestHeader('Authorization', conf.group.auth);
          }
          xhr.onload = function () {
            if (xhr.status == 200) {
              var data = JSON.parse(xhr.responseText);
              if (data.numberReturned > 0) {
                resolve(data.features[0].geometry_name);
              } else {
                reject();
              }
            } else {
              reject();
            }
          };
          xhr.onerror = function () {
            reject();
          };
          xhr.send();
        });
      }
    }, {
      key: "_getFeatureInfo",
      value: function _getFeatureInfo(conf) {
        var _this4 = this;
        this.map.toolbox.draw.getPoint().then(function (feature) {
          _this4._getGeometryName(conf).then(function (geometryName) {
            document.body.style.cursor = 'progress';
            _this4.map.mapElement.style.cursor = 'progress';
            var geom = feature.getGeometry(); //.transform(this.map.ol.getView().getProjection().getCode(), 'EPSG:3857');

            var fullCode = _this4.map.ol.getView().getProjection().getCode();
            var unit = _this4.map.ol.getView().getProjection().getUnits();
            var d = unit == 'm' ? 1 : 0.00001;
            var c = geom.getCoordinates();
            var wkt = "SRID=".concat(fullCode.replace('EPSG:', ''), ";LINESTRING(").concat(c[0] - d, " ").concat(c[1] - d, ",").concat(c[0] + d, " ").concat(c[1] + d, ")");
            var url = conf.group.source + '/wfs?service=wfs&version=2.0.0&request=GetFeature&' + 'typeNames=' + conf.group.workspace + ':' + conf.source.layer + '&' + 'srsName=' + fullCode + '&' + 'outputFormat=application/json&' + 'exceptions=application/json&' + 'CQL_FILTER=INTERSECTS(' + geometryName + ', ' + wkt + ')';
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            if (conf.group.auth) {
              xhr.setRequestHeader('Authorization', conf.group.auth);
            }
            xhr.onload = function () {
              document.body.style.cursor = 'unset';
              _this4.map.mapElement.style.cursor = 'unset';
              if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.exceptions) {
                  new Notify({
                    message: "N\xE3o foi poss\xEDvel obter as informa\xE7\xF5es da fei\xE7\xE3o.",
                    type: 'warning',
                    timeout: 5
                  }).show();
                  return;
                }
                console.log(data.numberReturned);
                if (data.numberReturned == 0) {
                  new Notify({
                    message: "Nenhuma fei\xE7\xE3o foi encontrada.",
                    type: 'success',
                    timeout: 5
                  }).show();
                  return;
                }
                _this4._showPopUp(data, conf, feature);
              } else {
                new Notify({
                  message: "N\xE3o foi poss\xEDvel obter as informa\xE7\xF5es da fei\xE7\xE3o.",
                  type: 'warning',
                  timeout: 5
                }).show();
              }
            };
            xhr.onerror = function () {
              document.body.style.cursor = 'unset';
              this.map.mapElement.style.cursor = 'unset';
              new Notify({
                message: "N\xE3o foi poss\xEDvel obter as informa\xE7\xF5es da fei\xE7\xE3o.",
                type: 'warning',
                timeout: 5
              }).show();
            };
            xhr.send();
          });
        });
      }
    }, {
      key: "_showPopUp",
      value: function _showPopUp(data, conf, feature) {
        var _this5 = this;
        this.map.clearDrawingGeometries();
        var attributes = '';
        for (var i = 0; i < data.features.length; i++) {
          this.map.drawGeometry(data.features[i].geometry, 'geojson', {
            style: new ol.style.Style({
              fill: new ol.style.Fill({
                color: 'rgba(255, 0, 255, 0.2)'
              }),
              stroke: new ol.style.Stroke({
                color: '#f0f',
                width: 2
              }),
              image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                  color: '#f0f'
                })
              })
            })
          });
          var keys = Object.keys(data.features[0].properties);
          var props = data.features[0].properties;
          for (var j = 0; j < keys.length; j++) {
            if (keys[j] == 'fields') {
              var fields = props[keys[j]];
              var nKeys = Object.keys(fields);
              for (var k = 0; k < nKeys.length; k++) {
                attributes += "<p><strong>".concat(nKeys[k], ": </strong>").concat(fields[nKeys[k]], "</p>");
              }
            } else {
              attributes += "<p><strong>".concat(keys[j], ": </strong>").concat(props[keys[j]], "</p>");
            }
          }
          attributes += "<hr>";
        }
        var content = "\n        <div class=\"card\" style=\"max-width: 400px; max-height: 400px; overflow: auto; font-size: 14px;\">\n            <div class=\"ol-popup-closer\"></div>\n            <div class=\"card-body\">\n                <h6 class=\"card-title\" style=\"font-size: 18px;\">".concat(conf.group.name, " - ").concat(conf.source.name, "</h6>\n                ").concat(attributes, "\n            </div>\n        </div>");
        var container = document.createElement('div');
        container.innerHTML = content;
        container.addEventListener('scroll', function (e) {
          e.stopImmediatePropagation();
          e.stopPropagation();
        });
        var closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'btn btn-light';
        closeBtn.innerHTML = 'Fechar';
        //container.getElementsByClassName('card')[0].append(closeBtn);

        this._overlay.setElement(container);
        this._overlay.setPosition(feature.getGeometry().getCoordinates());
        closeBtn.addEventListener('click', function (e) {
          return _this5._closePopUp();
        });
        var closeBtn2 = container.getElementsByClassName('ol-popup-closer')[0];
        closeBtn2.addEventListener('click', function (e) {
          return _this5._closePopUp();
        });
      }
    }, {
      key: "_closePopUp",
      value: function _closePopUp() {
        this.map.clearDrawingGeometries();
        this._overlay.setElement(document.createElement('div'));
      }
    }, {
      key: "_reloadLayers",
      value: function _reloadLayers() {
        this._removeAllLayers();
        this.map._createLayers();
        this.map._drawLayers();
      }
    }, {
      key: "activate",
      value: function activate() {
        this._listLayers();
        this.show();

        // let elms = document.getElementsByClassName('map-app-ls-group-expand-collapse');
        // for (let i = 0; i < elms.length; i++) {
        //     const element = elms[i];
        //     element.click();
        // }
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
      }
    }]);
  }(GeoWidget);

  var SaveStatus = /*#__PURE__*/function (_GeoWidget) {
    function SaveStatus(config) {
      var _this;
      _classCallCheck(this, SaveStatus);
      config = config || {};
      config.hasUI = false;
      _this = _callSuper(this, SaveStatus, [config]);
      _this._firstMoveMap = true;
      _this._hasUI = false;
      return _this;
    }
    _inherits(SaveStatus, _GeoWidget);
    return _createClass(SaveStatus, [{
      key: "initialize",
      value: function initialize() {
        this._registerEvents();
      }
    }, {
      key: "_saveMapState",
      value: function _saveMapState() {
        var d = new Date();
        var state = {
          center: this.map.ol.getView().getCenter(),
          zoom: this.map.ol.getView().getZoom()
        };
        state = encodeURIComponent(JSON.stringify(state));
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * 5); // 5 dias
        document.cookie = 'gb_' + this.map.target + '=' + state + ';path=/;expires=' + d.toGMTString();
      }
    }, {
      key: "_saveMapHistory",
      value: function _saveMapHistory() {
        var stateHistory = [];
        var localStateHistory = JSON.parse(localStorage.getItem('stateHistory'));
        if (localStateHistory) {
          Array.prototype.push.apply(stateHistory, localStateHistory);
        }
        var state = {
          center: this.map.ol.getView().getCenter(),
          zoom: this.map.ol.getView().getZoom()
        };
        stateHistory.push(state);
        if (stateHistory.length > 20) {
          stateHistory.shift();
        }
        localStorage.setItem('stateHistory', JSON.stringify(stateHistory));
      }
    }, {
      key: "_restoreMapState",
      value: function _restoreMapState() {
        var v = document.cookie.match("(^|;) ?gb_".concat(this.map.target, "=([^;]*)(;|$)"));
        if (v) {
          var state = JSON.parse(decodeURIComponent(v[2]));
          this.map.ol.getView().setCenter(state.center);
          this.map.ol.getView().setZoom(state.zoom);
        }
      }
    }, {
      key: "_hasMapState",
      value: function _hasMapState() {
        var v = document.cookie.match("(^|;) ?gb_".concat(this.map.target, "=([^;]*)(;|$)"));
        if (v) {
          return true;
        }
        return false;
      }
    }, {
      key: "_showPreviousViewDlg",
      value: function _showPreviousViewDlg() {
        var self = this;
        var msgElementId = "gb_state_float_msg_".concat(this.map.target);
        var yesElementId = "gb_state_restore_pv_".concat(this.map.target);
        var noElementId = "gb_state_ignore_pv_".concat(this.map.target);
        var msgElement = document.createElement('div');
        msgElement.className = 'gb map-app-float-dlg';
        msgElement.id = msgElementId;
        msgElement.innerHTML = " Voltar \xE0 vis\xE3o anterior? <br>\n            <span id='".concat(yesElementId, "'>Sim</span>\n            <span id='").concat(noElementId, "'>N\xE3o</span>");
        document.getElementById(this.map.target).append(msgElement);
        document.getElementById(msgElementId).style.display = 'block';

        // Events
        window.setTimeout(function () {
          document.getElementById(msgElementId).style.display = 'none';
        }, 5000);
        document.getElementById(yesElementId).addEventListener('click', function () {
          self._restoreMapState();
          document.getElementById(msgElementId).style.display = 'none';
        });
        document.getElementById(noElementId).addEventListener('click', function () {
          document.getElementById(msgElementId).style.display = 'none';
        });
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var self = this;
        this.map.ol.once('postrender', function () {
          if (self._hasMapState()) {
            self._showPreviousViewDlg();
          }
        });
        this.map.ol.on('moveend', function () {
          if (!self._firstMoveMap) {
            self._saveMapState();
            self._saveMapHistory();
          }
          self._firstMoveMap = false;
        });
      }
    }]);
  }(GeoWidget);

  var Draw = /*#__PURE__*/function (_GeoWidget) {
    function Draw(config) {
      var _this;
      _classCallCheck(this, Draw);
      config = config || {};
      config.hasUI = false;
      config.position = config.position || 'ct';
      _this = _callSuper(this, Draw, [config]);
      _this._panelElement = null;
      _this._hasUI = false;
      _this._layer = null;
      _this._geomType = 'Point';
      _this._geomFunc = null;
      _this._drawing = false;
      _this._options = null;
      return _this;
    }
    _inherits(Draw, _GeoWidget);
    return _createClass(Draw, [{
      key: "initialize",
      value: function initialize() {
        //this._initInterface();
        this._initStyles();
        this._initLayer();
        //this._addDrawInteraction();
        this._registerExternalInteraction();
      }
    }, {
      key: "_initInterface",
      value: function _initInterface() {
        var panelElementId = this.map.getPanel(this._config.position).elementId;
        this._panelElement = document.getElementById(panelElementId);
        this.pointBtn = document.createElement('div');
        this.pointBtn.className = 'map-app-control map-app-draw-point';
        this.lineBtn = document.createElement('div');
        this.lineBtn.className = 'map-app-control map-app-draw-line';
        this.polygonBtn = document.createElement('div');
        this.polygonBtn.className = 'map-app-control map-app-draw-polygon';
        this.gapBtn = document.createElement('div');
        this.gapBtn.className = 'map-app-control map-app-draw-gap';
        this.bufferBtn = document.createElement('div');
        this.bufferBtn.className = 'map-app-control map-app-draw-buffer';

        // let input = document.createElement('input');
        // input.type = 'text';
        // input.addEventListener('keypress', (e) => {
        //     var key = e.which || e.keyCode;
        //     if (key === 13) { // 13 is enter
        //         this._setGeomType(input.value);

        //     }
        // });

        this._panelElement.appendChild(this.pointBtn);
        this._panelElement.appendChild(this.lineBtn);
        this._panelElement.appendChild(this.polygonBtn);
        this._panelElement.appendChild(this.gapBtn);
        this._panelElement.appendChild(this.bufferBtn);
      }
    }, {
      key: "_initStyles",
      value: function _initStyles() {
        this._layerStyle = [new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#000',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
              color: '#000'
            })
          })
        }), new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
              color: 'orange'
            })
          }),
          geometry: function geometry(feature) {
            // return the coordinates of the first ring of the polygon
            if (feature.getGeometry() instanceof ol.geom.Polygon) {
              var coordinates = feature.getGeometry().getCoordinates()[0];
              return new ol.geom.MultiPoint(coordinates);
            }
          }
        })];
        this._pointDrawStyle = new ol.style.RegularShape({
          fill: new ol.style.Fill({
            color: 'rgba(0, 255, 255, 0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: 'cyan',
            width: 1.5
          }),
          points: 4,
          radius: 10,
          radius2: 0,
          angle: Math.PI / 4
        });
        this._drawStyle = new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0, 255, 255, 0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: 'cyan',
            width: 1.5
          }),
          image: this._pointDrawStyle
        });
      }
    }, {
      key: "_initLayer",
      value: function _initLayer() {
        this._layer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: this._layerStyle
        });
        this._layer.setZIndex(999);
        this.map.ol.addLayer(this._layer);
      }
    }, {
      key: "_addDrawInteraction",
      value: function _addDrawInteraction() {
        document.getElementById(this.map.elementId).style.cursor = 'crosshair';
        this.draw = new ol.interaction.Draw(_objectSpread2(_objectSpread2({
          source: this._layer.getSource(),
          type: this._geomType,
          geometryFunction: this._geomFunc,
          style: this._drawStyle,
          stopClick: true
        }, this._options), {}, {
          freehandCondition: function freehandCondition(event) {
            return ol.events.condition.never(event);
          }
        }));
        this.map.ol.addInteraction(this.draw);
        this._options = null;
      }
    }, {
      key: "_addModifyInteraction",
      value: function _addModifyInteraction() {
        this.modify = new ol.interaction.Modify({
          source: this._layer.getSource(),
          style: this._drawStyle,
          deleteCondition: function deleteCondition(event) {
            var isClick = event.originalEvent.type === 'pointerdown';
            var isCtrl = event.originalEvent.ctrlKey;
            if (isClick && isCtrl) {
              return ol.events.condition.always(event);
            } else {
              return ol.events.condition.never(event);
            }
          }
        });
        this.map.ol.addInteraction(this.modify);

        // this.select = new ol.interaction.Select({
        //     wrapX: false
        // });
        // this.map.ol.addInteraction(this.select);
      }
    }, {
      key: "_removeInteraction",
      value: function _removeInteraction() {
        document.getElementById(this.map.elementId).style.cursor = 'auto';
        this.map.ol.removeInteraction(this.draw);
        this.draw = null;
        //this._geomFunc = null;
        //this._geomType = null;
      }
    }, {
      key: "_setGeomType",
      value: function _setGeomType(type) {
        switch (type.toLowerCase()) {
          case 'point':
          case 'ponto':
          case 'po':
            this._geomType = 'Point';
            this._geomFunc = null;
            break;
          case 'polyline':
          case 'polilinha':
          case 'pline':
            this._geomType = 'LineString';
            this._geomFunc = null;
            break;
          case 'polygon':
          case 'poligono':
          case 'pol':
            this._geomType = 'Polygon';
            this._geomFunc = null;
            break;
          case 'circle':
          case 'circulo':
          case 'c':
            this._geomType = 'Circle';
            this._geomFunc = null;
            break;
          case 'box':
            this._geomType = 'Circle';
            this._geomFunc = ol.interaction.Draw.createBox();
            break;
        }
        this._removeInteraction();
        this._addDrawInteraction();
        if (this.map.toolbox.hasSnap) {
          this.map.toolbox.refreshSnap();
        }
      }
    }, {
      key: "_registerExternalInteraction",
      value: function _registerExternalInteraction() {
        var _this2 = this;
        this.map.toolbox.draw = {};
        this.map.toolbox.draw.stopDrawing = function () {
          return _this2._stopDrawing();
        };
        this.map.toolbox.draw.getArrow = function () {
          return _this2._getArrow();
        };
        this.map.toolbox.draw.getBox = function () {
          return _this2._getBox();
        };
        this.map.toolbox.draw.getPoint = function () {
          return _this2._getPoint();
        };
        this.map.toolbox.draw.getPolyline = function (evt) {
          return _this2._getPolyline(evt);
        };
        this.map.toolbox.draw.getPolygon = function () {
          return _this2._getPolygon();
        };
        this.map.toolbox.draw.drawPolygon = function () {
          return _this2._drawPolygon();
        };
        this.map.toolbox.draw.getCircle = function () {
          return _this2._getCircle();
        };
        this.map.toolbox.draw.editFeature = function (feature) {
          return _this2._editFeature(feature);
        };
        this.map.toolbox.draw.getInteraction = function () {
          return _this2.draw;
        };
      }
    }, {
      key: "_stopDrawing",
      value: function _stopDrawing() {
        this._removeInteraction();
      }
    }, {
      key: "_getCircle",
      value: function _getCircle() {
        var _this3 = this;
        this._setGeomType('circle');
        return new Promise(function (resolve) {
          _this3.draw.once('drawend', function (evt) {
            _this3._removeInteraction();
            resolve(evt.feature.clone());
            evt.feature.setStyle([]);
          });
        });
      }
    }, {
      key: "_getArrow",
      value: function _getArrow() {
        var _this4 = this;
        this._setGeomType('pline');
        return new Promise(function (resolve) {
          _this4.draw.once('drawend', function (evt) {
            _this4._removeInteraction();
            resolve(evt.feature.clone());
            evt.feature.setStyle([]);
          });
        });
      }
    }, {
      key: "_getBox",
      value: function _getBox() {
        var _this5 = this;
        var self = this;
        this._setGeomType('box');
        return new Promise(function (resolve) {
          _this5.draw.once('drawend', function (evt) {
            evt.feature.setStyle([]);
            self._removeInteraction();
            self._geomType = null;
            resolve(evt.feature);
          });
        });
      }
    }, {
      key: "_getPoint",
      value: function _getPoint() {
        var _this6 = this;
        var self = this;
        this._setGeomType('point');
        return new Promise(function (resolve) {
          _this6.draw.once('drawend', function (evt) {
            self._removeInteraction();
            resolve(evt.feature.clone());
            evt.feature.setStyle([]);
          });
        });
      }
    }, {
      key: "_getPolyline",
      value: function _getPolyline(props) {
        var _this7 = this;
        this._options = props;
        this._setGeomType('pline');
        return new Promise(function (resolve) {
          _this7.draw.once('drawend', function (evt) {
            _this7._removeInteraction();
            resolve(evt.feature.clone());
            evt.feature.setStyle([]);
          });
        });
      }
    }, {
      key: "_getPolygon",
      value: function _getPolygon() {
        var _this8 = this;
        this._setGeomType('pol');
        return new Promise(function (resolve) {
          _this8.draw.once('drawend', function (evt) {
            _this8._removeInteraction();
            resolve(evt.feature.clone());
            evt.feature.setStyle([]);
          });
        });
      }
    }, {
      key: "_drawPolygon",
      value: function _drawPolygon() {
        var _this9 = this;
        this._setGeomType('pol');
        this.draw.once('drawend', function () {
          _this9._removeInteraction();
        });
        this._addModifyInteraction();
      }
    }, {
      key: "_editFeature",
      value: function _editFeature(feature) {
        this._layer.getSource().clear();
        this._layer.getSource().addFeature(feature);
        this._addModifyInteraction();
        document.getElementById(this.map.elementId).style.cursor = 'crosshair';
      }
    }, {
      key: "_getEditGeom",
      value: function _getEditGeom(format) {
        var geom = null;
        if (format === 'geojson') {
          geom = new ol.format.GeoJSON().writeFeatures(this._layer.getSource().getFeatures());
        } else if (format === 'wkt') {
          geom = new ol.format.WKT().writeFeatures(this._layer.getSource().getFeatures());
        } else {
          throw "Formato n\xE3o suportado \"".concat(format, "\".");
        }
        return geom;
      }
    }]);
  }(GeoWidget);

  var arrow = {
    base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABmJLR0QA/wD/AP+gvaeTAAAAnUlEQVRIx2NgGAX0BmnxH5TpamFG/MezmQkfQulmYXr8xytAS/+kJ3zIoKeF/0E4PeFTB10thOL5DQ7/WehpIQhvLAz9z0lPC/9nJnw8kRb5SYRuFkLx1bS4d3L0tBCEn6Ynvdenp4Ug/C4z4ZMtPS0E4R9UKSAGq4V0DVK6Jhr6ZQt6Z3y6Fm30K7zpWT3RrwKmexOD7o2oUUAqAACT1nVmwNHzagAAAABJRU5ErkJggg=='
  };

  var Draft = /*#__PURE__*/function (_GeoWidget) {
    function Draft(config) {
      var _this;
      _classCallCheck(this, Draft);
      config = config || {};
      config.tip = config.tip || 'Rascunho';
      config.title = config.title || 'Rascunho';
      config.class = config.class || 'map-app-draft';
      config.geometryType = config.geometryType || 'linestring';
      _this = _callSuper(this, Draft, [config]);
      _this._textBtnElement = null;
      _this._pointBtnElement = null;
      _this._lineBtnElement = null;
      _this._polygonBtnElement = null;
      _this._arrowBtnElement = null;
      _this._imageBtnElement = null;
      _this._tipElement = null;
      _this._textContainer = null;
      _this._textTest = null;
      _this._tipMsg = '';
      _this._initialMsg = 'Selecione uma ferramenta';
      _this._layer = null;
      _this._overlays = [];
      _this._pointStyle = null;
      _this._lineStyle = null;
      _this._polygontStyle = null;
      _this.ui = _this.builUi();
      return _this;
    }
    _inherits(Draft, _GeoWidget);
    return _createClass(Draft, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerEvents();
        });
      }
    }, {
      key: "_initLayer",
      value: function _initLayer() {
        this._layer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#685ff1',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#685ff1'
              })
            })
          })
        });
        this._layer.setZIndex(999);
        this.map.ol.addLayer(this._layer);
      }
    }, {
      key: "_initSefaultStyles",
      value: function _initSefaultStyles() {
        this._pointStyle = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
              color: 'rgba(255,255,255,0.5)'
            }),
            stroke: new ol.style.Stroke({
              color: '#F0F',
              width: 2
            })
          })
        });
        this._lineStyle = new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0, 255, 255, 0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: 'cyan',
            width: 1.5
          })
        });
        this._polygonStyle = new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255,255,255,0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: '#F0F',
            width: 2
          })
        });
      }
    }, {
      key: "builUi",
      value: function builUi() {
        var draftElement = document.createElement('div');
        draftElement.className = 'map-app-measure-content';
        var btnsContainer = document.createElement('div');
        btnsContainer.style.display = 'flex';
        this._tipMsg = this._initialMsg;
        this._textContainer = document.createElement('div');
        this._textContainer.className = 'map-app-measure-tip';
        this._textContainer.innerHTML = this._tipMsg;
        this._textBtnElement = document.createElement('div');
        this._textBtnElement.className = 'map-app-measure-btn map-app-draft-text';
        this._pointBtnElement = document.createElement('div');
        this._pointBtnElement.className = 'map-app-measure-btn map-app-measure-point';
        this._lineBtnElement = document.createElement('div');
        this._lineBtnElement.className = 'map-app-measure-btn map-app-draft-line';
        this._polygonBtnElement = document.createElement('div');
        this._polygonBtnElement.className = 'map-app-measure-btn map-app-measure-polygon';
        this._arrowBtnElement = document.createElement('div');
        this._arrowBtnElement.className = 'map-app-measure-btn map-app-draft-arrow';
        this._imageBtnElement = document.createElement('div');
        this._imageBtnElement.className = 'map-app-measure-btn map-app-draft-image';
        this._clearBtnElement = document.createElement('div');
        this._clearBtnElement.className = 'map-app-measure-btn map-app-measure-clear';
        btnsContainer.appendChild(this._textBtnElement);
        btnsContainer.appendChild(this._pointBtnElement);
        btnsContainer.appendChild(this._lineBtnElement);
        btnsContainer.appendChild(this._polygonBtnElement);
        btnsContainer.appendChild(this._arrowBtnElement);
        btnsContainer.appendChild(this._imageBtnElement);
        btnsContainer.appendChild(this._clearBtnElement);
        draftElement.appendChild(btnsContainer);
        draftElement.appendChild(this._textContainer);
        //draftElement.appendChild(this._clearBtnElement);

        return draftElement;
      }
    }, {
      key: "_makeDraggable",
      value: function _makeDraggable(element) {
        var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;

        // otherwise, move the DIV from anywhere inside the DIV: 
        element.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          element.style.top = element.offsetTop - pos2 + 'px';
          element.style.left = element.offsetLeft - pos1 + 'px';
          element.style.opacity = 0.5;
        }
        function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
          element.style.opacity = 1;
        }
      }
    }, {
      key: "_toBase64",
      value: function _toBase64(file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            return resolve(reader.result);
          };
          reader.onerror = function (error) {
            return reject(error);
          };
        });
      }
    }, {
      key: "_setOverlays",
      value: function _setOverlays(coords) {
        var pointLabel = document.createElement('div');
        var inputText = document.createElement('input');
        pointLabel.className = 'map-app-desc-point';
        pointLabel.innerHTML = 'TEXT';
        this._makeDraggable(pointLabel);
        var label = new ol.Overlay({
          element: pointLabel,
          offset: [4, 4],
          positioning: 'top-left'
        });
        label.setPosition(coords.getCoordinates());
        this.map.ol.addOverlay(label);
        pointLabel.addEventListener('dblclick', function () {
          var textTemp = pointLabel.innerHTML;
          inputText.value = textTemp;
          pointLabel.innerHTML = '';
          pointLabel.appendChild(inputText);
          inputText.focus();
        });
        pointLabel.addEventListener('keydown', function (e) {
          if (e.which == 13) {
            pointLabel.innerHTML = pointLabel.firstElementChild.value;
          }
        });
        return label;
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        // Click
        this._textBtnElement.addEventListener('click', function () {
          _this3._tipMsg = 'Clique no mapa para adicionar um texto';
          _this3.map.toolbox.draw.getPoint().then(function (point) {
            _this3._tipMsg = _this3._initialMsg;
            _this3._textContainer.innerHTML = _this3._tipMsg;
            _this3._overlays.push(_this3._setOverlays(point.getGeometry()));
            //this._layer.getSource().addFeature(point);
          });
        });
        this._pointBtnElement.addEventListener('click', function () {
          _this3._tipMsg = 'Clique no mapa para obter um ponto';
          _this3.map.toolbox.draw.getPoint().then(function (point) {
            _this3._tipMsg = _this3._initialMsg;
            _this3._textContainer.innerHTML = _this3._tipMsg;
            _this3._layer.getSource().addFeature(point);
          });
        });
        this._lineBtnElement.addEventListener('click', function () {
          _this3._tipMsg = 'Clique no mapa para desenhar uma linha';
          _this3.map.toolbox.draw.getPolyline().then(function (line) {
            _this3._tipMsg = _this3._initialMsg;
            _this3._textContainer.innerHTML = _this3._tipMsg;
            _this3._layer.getSource().addFeature(line);
          });
        });
        this._polygonBtnElement.addEventListener('click', function () {
          _this3._tipMsg = 'Clique no mapa para obter um polígono';
          _this3.map.toolbox.draw.getPolygon().then(function (polygon) {
            _this3._tipMsg = _this3._initialMsg;
            _this3._textContainer.innerHTML = _this3._tipMsg;
            _this3._layer.getSource().addFeature(polygon);
          });
        });
        this._arrowBtnElement.addEventListener('click', function () {
          _this3._tipMsg = 'Clique no mapa para desenhar uma direção';
          _this3.map.toolbox.draw.getArrow().then(function (pline) {
            var myStyles = [];
            var plineTemp = pline.clone();
            pline.getGeometry().forEachSegment(function (start, end) {
              var dx = end[0] - start[0];
              var dy = end[1] - start[1];
              var rotation = Math.atan2(dy, dx);
              // arrows
              myStyles.push(new ol.style.Style({
                geometry: new ol.geom.Point(end),
                image: new ol.style.Icon({
                  src: arrow.base64,
                  anchor: [0.75, 0.5],
                  rotateWithView: true,
                  rotation: -rotation
                }),
                stroke: new ol.style.Stroke({
                  color: '#685ff1',
                  width: 150
                })
              }));
            });
            pline.setStyle(myStyles);
            _this3._tipMsg = _this3._initialMsg;
            _this3._textContainer.innerHTML = _this3._tipMsg;
            _this3._layer.getSource().addFeature(pline);
            _this3._layer.getSource().addFeature(plineTemp);
          });
        });
        this._imageBtnElement.addEventListener('click', function () {
          var input = document.createElement('input');
          input.type = 'file';
          input.setAttribute('accept', '.jpg, .png, .jpeg, .gif |image/*');
          var imageFile = null;
          input.onchange = function (e) {
            imageFile = e.target.files[0];
            if (imageFile) {
              _this3._toBase64(imageFile).then(function (image) {
                _this3._tipMsg = 'Clique no mapa para adicionar um texto';
                _this3.map.toolbox.draw.getPoint().then(function (point) {
                  var myStyle = new ol.style.Style({
                    geometry: point.getGeometry(),
                    image: new ol.style.Icon({
                      src: image,
                      anchor: [0.5, 0.5]
                    })
                  });
                  point.setStyle(myStyle);
                  _this3._tipMsg = _this3._initialMsg;
                  _this3._textContainer.innerHTML = _this3._tipMsg;
                  _this3._layer.getSource().addFeature(point);
                });
              });
            }
          };
          input.click();
        });
        this._clearBtnElement.addEventListener('click', function () {
          _this3._clearOverlays();
          _this3._clearGeoms();
        });

        // MouseOver
        this._textBtnElement.addEventListener('mouseover', function () {
          _this3._textContainer.innerHTML = 'Incluir texto';
          _this3._textContainer.style.display = 'block';
        });
        this._pointBtnElement.addEventListener('mouseover', function () {
          _this3._textContainer.innerHTML = 'Incluir ponto';
          _this3._textContainer.style.display = 'block';
        });
        this._lineBtnElement.addEventListener('mouseover', function () {
          _this3._textContainer.innerHTML = 'Incluir linha';
          _this3._textContainer.style.display = 'block';
        });
        this._polygonBtnElement.addEventListener('mouseover', function () {
          _this3._textContainer.innerHTML = 'Incluir polígono';
          _this3._textContainer.style.display = 'block';
        });
        this._arrowBtnElement.addEventListener('mouseover', function () {
          _this3._textContainer.innerHTML = 'Incluir seta';
          _this3._textContainer.style.display = 'block';
        });
        this._imageBtnElement.addEventListener('mouseover', function () {
          _this3._textContainer.innerHTML = 'Incluir imagem';
          _this3._textContainer.style.display = 'block';
        });
        this._clearBtnElement.addEventListener('mouseover', function () {
          _this3._textContainer.innerHTML = 'Limpar rascunho';
          _this3._textContainer.style.display = 'block';
        });

        // MouseOut
        this._textBtnElement.addEventListener('mouseout', function () {
          _this3._textContainer.innerHTML = _this3._tipMsg;
        });
        this._pointBtnElement.addEventListener('mouseout', function () {
          _this3._textContainer.innerHTML = _this3._tipMsg;
        });
        this._lineBtnElement.addEventListener('mouseout', function () {
          _this3._textContainer.innerHTML = _this3._tipMsg;
        });
        this._polygonBtnElement.addEventListener('mouseout', function () {
          _this3._textContainer.innerHTML = _this3._tipMsg;
        });
        this._arrowBtnElement.addEventListener('mouseout', function () {
          _this3._textContainer.innerHTML = _this3._tipMsg;
        });
        this._imageBtnElement.addEventListener('mouseout', function () {
          _this3._textContainer.innerHTML = _this3._tipMsg;
        });
        this._clearBtnElement.addEventListener('mouseout', function () {
          _this3._textContainer.innerHTML = _this3._tipMsg;
        });
      }
    }, {
      key: "_clearOverlays",
      value: function _clearOverlays() {
        this.map.ol.getOverlays().clear();
      }
    }, {
      key: "_clearGeoms",
      value: function _clearGeoms() {
        this._layer.getSource().clear();
      }
    }, {
      key: "activate",
      value: function activate() {
        this._initSefaultStyles();
        this._initLayer();
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this._clearOverlays();
        this._clearGeoms();
        this.hide();
      }
    }]);
  }(GeoWidget);

  var GeoDesc = /*#__PURE__*/function (_GeoWidget) {
    function GeoDesc(config) {
      var _this;
      _classCallCheck(this, GeoDesc);
      config = config || {};
      config.hasUI = false;
      config.position = config.position || 'cb';
      _this = _callSuper(this, GeoDesc, [config]);
      _this._hasUI = false;
      _this.format = new ol.format.GeoJSON();
      return _this;
    }
    _inherits(GeoDesc, _GeoWidget);
    return _createClass(GeoDesc, [{
      key: "initialize",
      value: function initialize() {
        this._registerExternalInteraction();
      }
    }, {
      key: "_registerExternalInteraction",
      value: function _registerExternalInteraction() {
        var _this2 = this;
        this.map.geodesc = {};
        this.map.geodesc.pointDescriptor = function (g) {
          return _this2._pointsDescriptor(g);
        };
        this.map.geodesc.lineDescriptor = function (o) {
          return _this2._linesDescriptor(o);
        };
        this.map.geodesc.polygonDescriptor = function (o) {
          return _this2._polygonDescriptor(o);
        };
        this.map.geodesc.azimuthDescriptor = function (o) {
          return _this2._azimuthsDescriptor(o);
        };
      }
    }, {
      key: "_pointsDescriptor",
      value: function _pointsDescriptor(opt) {
        return this._pointDescriptor(opt);
      }
    }, {
      key: "_linesDescriptor",
      value: function _linesDescriptor(opt) {
        return this._lineDescriptor(opt);
      }
    }, {
      key: "_azimuthsDescriptor",
      value: function _azimuthsDescriptor(opt) {
        return this._azimuthDescriptor(opt);
      }
    }, {
      key: "_lineDescriptor",
      value: function _lineDescriptor(opt) {
        var _this3 = this;
        var features = opt.features,
          labelClickCb = opt.labelClickCb,
          tolerance = opt.tolerance;
        tolerance = tolerance || 0;
        var mapProj = this.map.ol.getView().getProjection().getCode();
        var allOverlays = [];
        if (features) {
          var _loop = function _loop() {
            var overlaysCollection = opt.features[i].get('overlays') || [];
            var segmentCount = 0;
            var jfeatures = _this3.format.writeFeatureObject(features[i], {
              dataProjection: 'EPSG:4326',
              featureProjection: mapProj
            });
            turf.segmentEach(jfeatures, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
              segmentCount++;
              var dist = turf.length(currentSegment, {
                units: 'meters'
              });
              if (dist > tolerance) {
                var lineLabel = document.createElement('div');
                if (labelClickCb) {
                  lineLabel.addEventListener('click', labelClickCb);
                }
                var label = overlaysCollection[featureIndex + '' + segmentIndex];
                if (!label) {
                  label = new ol.Overlay({
                    element: lineLabel,
                    offset: [2, 0],
                    positioning: 'top-center'
                  });
                  _this3.map.ol.addOverlay(label);
                  overlaysCollection[featureIndex + '' + segmentIndex] = label;
                }
                var lineLength = turf.length(currentSegment);
                var labelLength = lineLength / 2;
                var labelPoint = turf.along(currentSegment, labelLength);
                //let labelPoint = turf.explode(currentSegment).features[0];

                var points = turf.explode(currentSegment).features;
                var bearing = turf.bearing(points[0].geometry, points[1].geometry);
                var rotation = bearing <= 0 ? bearing + 90 : bearing - 90;
                var values = _this3._stUnits(lineLength, 'km', 'linear');
                lineLabel.className = 'map-app-desc-line';
                lineLabel.innerHTML = values.defaultValue;
                lineLabel.setAttribute('alternativeValue', values.alternativeValue);
                lineLabel.setAttribute('defaultValue', values.defaultValue);
                lineLabel.setAttribute('valueType', 'defaultValue');
                lineLabel.style.transform = "rotate(".concat(rotation, "deg)");
                _this3._makeDraggable(lineLabel);
                lineLabel.addEventListener('dblclick', function () {
                  var valueType = lineLabel.getAttribute('valueType') == 'defaultValue' ? 'alternativeValue' : 'defaultValue';
                  var value = lineLabel.getAttribute(valueType);
                  lineLabel.innerHTML = value;
                  lineLabel.setAttribute('valueType', valueType);
                });
                var olPointLabel = _this3.format.readGeometry(labelPoint.geometry);
                olPointLabel.transform('EPSG:4326', mapProj);
                label.setElement(lineLabel);
                label.setPosition(olPointLabel.getCoordinates());
              } else {
                var _label = overlaysCollection[featureIndex + '' + segmentIndex];
                if (_label) {
                  _label.setPosition([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
                }
              }
            });
            if (segmentCount > 1) {
              turf.featureEach(jfeatures, function (currentFeature, featureIndex) {
                var lineLabel = document.createElement('div');
                if (labelClickCb) {
                  lineLabel.addEventListener('click', labelClickCb);
                }
                var label = overlaysCollection[featureIndex + 't'];
                if (!label) {
                  label = new ol.Overlay({
                    element: lineLabel,
                    offset: [-2, 0],
                    positioning: 'bottom-center'
                  });
                  _this3.map.ol.addOverlay(label);
                  overlaysCollection[featureIndex + 't'] = label;
                }
                var lineLength = turf.length(currentFeature);
                var labelLength = lineLength / 2;
                var labelPoint = turf.along(currentFeature, labelLength);
                var snapped = turf.nearestPointOnLine(currentFeature, labelPoint, {
                  units: 'miles'
                });
                var rotation = 0;
                turf.segmentEach(currentFeature, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
                  if (segmentIndex == snapped.properties.index) {
                    var points = turf.explode(currentSegment).features;
                    var bearing = turf.bearing(points[0].geometry, points[1].geometry);
                    rotation = bearing <= 0 ? bearing + 90 : bearing - 90;
                  }
                });
                var values = _this3._stUnits(lineLength, 'km', 'linear');
                lineLabel.className = 'map-app-desc-line';
                lineLabel.innerHTML = 'Total: ' + values.defaultValue;
                lineLabel.setAttribute('alternativeValue', values.alternativeValue);
                lineLabel.setAttribute('defaultValue', values.defaultValue);
                lineLabel.setAttribute('valueType', 'defaultValue');
                lineLabel.style.transform = "rotate(".concat(rotation, "deg)");
                _this3._makeDraggable(lineLabel);
                lineLabel.addEventListener('dblclick', function () {
                  var valueType = lineLabel.getAttribute('valueType') == 'defaultValue' ? 'alternativeValue' : 'defaultValue';
                  var value = lineLabel.getAttribute(valueType);
                  lineLabel.innerHTML = 'Total: ' + value;
                  lineLabel.setAttribute('valueType', valueType);
                });
                var olPointLabel = _this3.format.readGeometry(labelPoint.geometry);
                olPointLabel.transform('EPSG:4326', mapProj);
                label.setElement(lineLabel);
                label.setPosition(olPointLabel.getCoordinates());
              });
            }
            opt.features[i].set('overlays', overlaysCollection);
            allOverlays = allOverlays.concat(Object.values(overlaysCollection));
          };
          for (var i = 0; i < features.length; i++) {
            _loop();
          }
          return allOverlays;
        }
      }
    }, {
      key: "_azimuthDescriptor",
      value: function _azimuthDescriptor(opt) {
        var _this4 = this;
        var features = opt.features,
          labelClickCb = opt.labelClickCb;
        var mapProj = this.map.ol.getView().getProjection().getCode();
        var allOverlays = [];
        if (features) {
          var _loop2 = function _loop2() {
            var overlaysCollection = opt.features[i].get('overlays') || [];
            var jfeatures = _this4.format.writeFeatureObject(opt.features[i], {
              dataProjection: 'EPSG:4326',
              featureProjection: mapProj
            });
            turf.segmentEach(jfeatures, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
              if (turf.length(currentSegment, {
                units: 'meters'
              }) != 0) {
                var lineLabel = document.createElement('div');
                if (labelClickCb) {
                  lineLabel.addEventListener('click', labelClickCb);
                }
                var label = overlaysCollection[featureIndex + '' + segmentIndex];
                if (!label) {
                  label = new ol.Overlay({
                    element: lineLabel,
                    offset: [2, 0],
                    positioning: 'top-center'
                  });
                  _this4.map.ol.addOverlay(label);
                  overlaysCollection[featureIndex + '' + segmentIndex] = label;
                }
                var lineLength = turf.length(currentSegment);
                var labelLength = lineLength / 2;
                var labelPoint = turf.along(currentSegment, labelLength);
                var points = turf.explode(currentSegment).features;
                var bearing = turf.bearing(points[0].geometry, points[1].geometry);
                var rotation = bearing <= 0 ? bearing + 90 : bearing - 90;
                lineLabel.className = 'map-app-desc-line';
                lineLabel.innerHTML = 'Az:' + _this4._localeFormat(_this4._getAzimuth(currentSegment, 'dms'));
                lineLabel.style.transform = "rotate(".concat(rotation, "deg)");
                _this4._makeDraggable(lineLabel);
                var olPointLabel = _this4.format.readGeometry(labelPoint.geometry);
                olPointLabel.transform('EPSG:4326', mapProj);
                label.setElement(lineLabel);
                label.setPosition(olPointLabel.getCoordinates());
              }
            });
            opt.features[i].set('overlays', overlaysCollection);
            allOverlays = allOverlays.concat(Object.values(overlaysCollection));
          };
          for (var i = 0; i < features.length; i++) {
            _loop2();
          }
          return allOverlays;
        }
      }
    }, {
      key: "_polygonDescriptor",
      value: function _polygonDescriptor(opt) {
        var _this5 = this;
        var features = opt.features,
          labelClickCb = opt.labelClickCb;
        var mapProj = this.map.ol.getView().getProjection().getCode();
        var allOverlays = [];
        if (features) {
          var _loop3 = function _loop3() {
            var overlaysCollection = opt.features[i].get('overlays') || [];
            var jfeatures = _this5.format.writeFeatureObject(opt.features[i], {
              dataProjection: 'EPSG:4326',
              featureProjection: mapProj
            });
            turf.geomEach(jfeatures, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
              var area = turf.area(currentGeometry);
              var labelPoint = turf.centroid(currentGeometry);
              var polygonLabel = document.createElement('div');
              if (labelClickCb) {
                polygonLabel.addEventListener('click', labelClickCb);
              }
              var label = overlaysCollection[featureIndex];
              if (!label) {
                label = new ol.Overlay({
                  element: polygonLabel,
                  offset: [0, 0],
                  positioning: 'center-center'
                });
                _this5.map.ol.addOverlay(label);
                overlaysCollection[featureIndex] = label;
              }
              var values = _this5._stUnits(area, 'm2', 'area');
              polygonLabel.className = 'map-app-desc-line';
              polygonLabel.innerHTML = values.defaultValue;
              polygonLabel.setAttribute('alternativeValue', values.alternativeValue);
              polygonLabel.setAttribute('defaultValue', values.defaultValue);
              polygonLabel.setAttribute('valueType', 'defaultValue');
              _this5._makeDraggable(polygonLabel);
              polygonLabel.addEventListener('dblclick', function () {
                var valueType = polygonLabel.getAttribute('valueType') == 'defaultValue' ? 'alternativeValue' : 'defaultValue';
                var value = polygonLabel.getAttribute(valueType);
                polygonLabel.innerHTML = value;
                polygonLabel.setAttribute('valueType', valueType);
              });
              var olPointLabel = _this5.format.readGeometry(labelPoint.geometry);
              olPointLabel.transform('EPSG:4326', mapProj);
              label.setElement(polygonLabel);
              label.setPosition(olPointLabel.getCoordinates());
            });
            opt.features[i].set('overlays', overlaysCollection);
            allOverlays = allOverlays.concat(Object.values(overlaysCollection));
          };
          for (var i = 0; i < features.length; i++) {
            _loop3();
          }
        }
        return allOverlays;
      }
    }, {
      key: "_pointDescriptor",
      value: function _pointDescriptor(opt) {
        var _this6 = this;
        var features = opt.features,
          labelClickCb = opt.labelClickCb;
        var mapProj = this.map.ol.getView().getProjection().getCode();
        var allOverlays = [];
        var displayCoords;
        var currentProjection = this.map.currentProjection;
        if (features) {
          var _loop4 = function _loop4(i) {
            var overlaysCollection = opt.features[i].get('overlays') || [];
            var jfeatures = _this6.format.writeFeatureObject(features[i]);
            turf.coordEach(jfeatures, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
              if (currentProjection.type == 'lat-lng') {
                if (currentProjection.format == 'DMS') {
                  displayCoords = ol.coordinate.toStringHDMS(currentCoord, _this6.map.config.precision);
                } else {
                  displayCoords = currentCoord.map(function (e) {
                    return Number(e.toFixed(8)).toString().padEnd(8, "000");
                  });
                  displayCoords = displayCoords.reverse().join(' ');
                }
              } else {
                displayCoords = currentCoord.map(function (e) {
                  return Number(e.toFixed(_this6.map.config.precision)).toString().padEnd(3, "000");
                });
                displayCoords = displayCoords.join(' ');
              }
              var pointLabel = document.createElement('div');
              pointLabel.className = 'map-app-desc-point';
              pointLabel.innerHTML = _this6._localeFormat(displayCoords);
              _this6._makeDraggable(pointLabel);
              var label = overlaysCollection[featureIndex + '' + geometryIndex + '' + coordIndex];
              if (!label) {
                label = new ol.Overlay({
                  element: pointLabel,
                  offset: [4, 4],
                  positioning: 'top-left'
                });
                _this6.map.ol.addOverlay(label);
                overlaysCollection[featureIndex + '' + geometryIndex + '' + coordIndex] = label;
              }
              label.setPosition(currentCoord);
              opt.features[i].set('overlays', overlaysCollection);
              allOverlays = allOverlays.concat(Object.values(overlaysCollection));
            });
          };
          for (var i = 0; i < features.length; i++) {
            _loop4(i);
          }
        }
        return allOverlays;
      }
    }, {
      key: "_stUnits",
      value: function _stUnits(value, unit, type) {
        var conversionFactor, unitDestination, convertedValue, defaultValue, alternativeValue;
        if (type === 'linear') {
          unitDestination = this.map.config.linearUnits;
        } else if (type === 'area') {
          unitDestination = this.map.config.areaUnits;
        } else if (type === 'angular') {
          unitDestination = this.map.config.angularUnits;
        } else {
          throw 'Tipo de unidade inexistente.';
        }
        conversionFactor = GeoMapAll.UnitsCoversion[unit][unitDestination];
        value = value * conversionFactor;
        value = Number(value.toFixed(this.map.config.precision));
        if (type === 'linear') {
          conversionFactor = GeoMapAll.UnitsCoversion[unitDestination]['km'];
          convertedValue = value * conversionFactor;
          convertedValue = Number(convertedValue.toFixed(this.map.config.precision));
          if (value > 1000) {
            defaultValue = convertedValue + 'km';
            alternativeValue = value + 'm';
          } else {
            alternativeValue = convertedValue + 'km';
            defaultValue = value + 'm';
          }
        } else if (type === 'area') {
          conversionFactor = GeoMapAll.UnitsCoversion[unitDestination]['km2'];
          convertedValue = value * conversionFactor;
          convertedValue = Number(convertedValue.toFixed(this.map.config.precision));
          if (value > 100000) {
            defaultValue = convertedValue + 'km²';
            alternativeValue = value + 'm²';
          } else {
            alternativeValue = convertedValue + 'km²';
            defaultValue = value + 'm²';
          }
        }
        defaultValue = this._localeFormat(defaultValue);
        alternativeValue = this._localeFormat(alternativeValue);
        return {
          defaultValue: defaultValue,
          alternativeValue: alternativeValue
        };
      }
    }, {
      key: "_localeFormat",
      value: function _localeFormat(value) {
        return value.replace(/,/g, '__COMMA__').replace(/\./g, ',').replace(/__COMMA__/g, '.');
      }
    }, {
      key: "_convertToDms",
      value: function _convertToDms(dd) {
        var absDd = Math.abs(dd);
        var deg = absDd | 0;
        var frac = absDd - deg;
        var min = frac * 60 | 0;
        var sec = frac * 3600 - min * 60;
        // Round it to 2 decimal points.
        sec = Math.round(sec * 100) / 100;
        return deg + '°' + min + '\'' + sec + '"';
      }
    }, {
      key: "_getAzimuth",
      value: function _getAzimuth(turfLine) {
        var turfLinesCollection = turf.lineSegment(turfLine);
        for (var i = 0; i < turfLinesCollection.features.length; i++) {
          var line = turfLinesCollection.features[i].geometry;
          var points = turf.explode(line).features;
          var bearing = turf.bearing(points[0].geometry, points[1].geometry);
          var azimuth = turf.bearingToAzimuth(bearing);
          if (this.map.config.angularUnits === 'dms') {
            return this._convertToDms(azimuth);
          } else {
            return azimuth;
          }
        }
      }
    }, {
      key: "_makeDraggable",
      value: function _makeDraggable(element) {
        //let element = document.getElementById(this._elementId);
        var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
        //if (document.getElementById(this._headerId)) {
        // if present, the header is where you move the DIV from:
        // document.getElementById(this._headerId).onmousedown = dragMouseDown;
        //} else {
        // otherwise, move the DIV from anywhere inside the DIV: 
        element.onmousedown = dragMouseDown;
        // }

        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          element.style.top = element.offsetTop - pos2 + 'px';
          element.style.left = element.offsetLeft - pos1 + 'px';
          element.style.opacity = 0.5;
        }
        function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
          element.style.opacity = 1;
          //this._autoRepositioning();
        }
      }
    }]);
  }(GeoWidget);

  var Snap = /*#__PURE__*/function (_GeoWidget) {
    function Snap(config) {
      var _this;
      _classCallCheck(this, Snap);
      config = config || {};
      config.position = config.position || 'rt';
      config.class = config.class || 'map-app-snap-control';
      config.tip = config.tip || 'Configuração do Snap';
      config.title = config.title || 'Configuração do Snap';
      _this = _callSuper(this, Snap, [config]);
      _this._scale = config.minScale || 250;
      _this._sources = [];
      _this._layers = [];
      _this._snaps = [];
      _this._format = null;
      _this._units = 'px';
      _this._tolerance = 50;
      _this._toEdge = true;
      _this._tovertex = true;
      _this._maxResolution = 0;
      _this.ui = document.createElement('div');
      _this.ui.style.width = '100%';
      _this.ui.style.height = '100%';
      _this.on('ready', function () {
        _this.ui.innerHTML = _this._buildUi();
        _this._listLayers();
        _this._bindUi();
        _this._registerEvents();
      });
      return _this;
    }
    _inherits(Snap, _GeoWidget);
    return _createClass(Snap, [{
      key: "initialize",
      value: function initialize() {
        this._initFormat();
        this._createSources();
        this._initAuxLayers();
        this._addInteraction();
        this._initSelects();
        this._registerExternalInteraction();
      }
    }, {
      key: "_buildUi",
      value: function _buildUi() {
        return "\n        <div class=\"p-3\">\n            <div class=\"form-group\">\n                <label>Camadas</label>\n                <div id=\"map-app-snap".concat(this.id, "-layers\">\n                    ").concat(this._listLayers(), "\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <label>Toler\xE2ncia</label>\n                        <input type=\"number\" class=\"form-control\" id=\"map-app-snap").concat(this.id, "-tol\">\n                    </div>\n                    <div class=\"col\">\n                        <label>Unidade</label>\n                        <select class=\"form-control\" id=\"map-app-snap").concat(this.id, "-unit\">\n                            <option value=\"m\" selected>metro(s)</option>\n                            <option value=\"px\" >pixel(s)</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label>Escala m\xE1xima</label>\n                <select class=\"form-control\" id=\"map-app-snap").concat(this.id, "-scales\">\n                    <option value=\"250\" selected>1:250</option>\n                    <option value=\"500\">1:500</option>\n                    <option value=\"1000\">1:1000</option>\n                    <option value=\"5000\">1:5000</option>\n                    <option value=\"10000\">1:10000</option>\n                    <option value=\"1000000\">1:1000000</option>\n                </select>\n            </div>\n\n            <div class=\"row\">\n                <div class=\"col\">\n                    <div class=\"form-group\">\n                        <label>Tipo Snap</label>\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"map-app-snap").concat(this.id, "-vertice\">\n                            <label class=\"form-check-label\" for=\"map-app-snap").concat(this.id, "-vertice\">\n                            V\xE9rtice\n                            </label>\n                        </div>\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"map-app-snap").concat(this.id, "-edge\">\n                            <label class=\"form-check-label\" for=\"map-app-snap").concat(this.id, "-edge\">\n                            Segmento\n                            </label>\n                        </div>\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"map-app-snap").concat(this.id, "-extention\">\n                            <label class=\"form-check-label\" for=\"map-app-snap").concat(this.id, "-extention\">\n                            Prolongamento\n                            </label>\n                        </div>\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"map-app-snap").concat(this.id, "-centroid\">\n                            <label class=\"form-check-label\" for=\"map-app-snap").concat(this.id, "-centroid\">\n                            Centr\xF3ide\n                            </label>\n                        </div>\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"map-app-snap").concat(this.id, "-midpoint\">\n                            <label class=\"form-check-label\" for=\"map-app-snap").concat(this.id, "-midpoint\">\n                            Ponto M\xE9dio\n                            </label>\n                        </div>\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"map-app-snap").concat(this.id, "-intersection\">\n                            <label class=\"form-check-label\" for=\"map-app-snap").concat(this.id, "-intersection\">\n                            Intersec\xE7\xF5es\n                            </label>\n                        </div>\n                        <div class=\"form-check d-none\">\n                            <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"map-app-snap").concat(this.id, "-orto\">\n                            <label class=\"form-check-label\" for=\"map-app-snap").concat(this.id, "-orto\">\n                            Linhas ortogonais\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col\">\n                    <div class=\"form-group\">\n                        <label>Elementos Auxiliares</label>\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"map-app-snap").concat(this.id, "-show-lines\">\n                            <label class=\"form-check-label\" for=\"map-app-snap").concat(this.id, "-show-lines\">\n                                Mostrar\n                            </label>\n                        </div>\n                    </div>\n                </div>   \n            </div>\n\n            <a href=\"#\" class=\"btn btn-dark float-right mb-3\" role=\"button\" id=\"map-app-snap").concat(this.id, "-save\">Aplicar configura\xE7\xF5es</a>\n\n        </div>\n        ");
      }
    }, {
      key: "_initAuxLayers",
      value: function _initAuxLayers() {
        this._auxLayers = {
          extendSegments: new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
              stroke: new ol.style.Stroke({
                width: 1,
                color: 'rgba(255, 0, 255, 0.1)',
                lineDash: [2, 5]
              })
            })
          }),
          intersections: new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
              image: new ol.style.RegularShape({
                stroke: new ol.style.Stroke({
                  width: 1,
                  color: 'rgba(255, 0, 255, 0.1)'
                }),
                points: 4,
                radius: 5,
                radius2: 0,
                rotation: 0,
                angle: 0
              })
            })
          }),
          midPoints: new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
              image: new ol.style.RegularShape({
                stroke: new ol.style.Stroke({
                  width: 1,
                  color: 'rgba(255, 0, 255, 0.1)'
                }),
                points: 3,
                radius: 5,
                rotation: 0,
                angle: 0
              })
            })
          }),
          centroids: new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
              image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                  width: 1,
                  color: 'rgba(255, 0, 255, 0.1)'
                })
              })
            })
          }),
          orthoLines: new ol.layer.Vector({
            source: new ol.source.Vector()
          })
        };
        this.map.ol.addLayer(this._auxLayers.extendSegments);
        this.map.ol.addLayer(this._auxLayers.intersections);
        this.map.ol.addLayer(this._auxLayers.midPoints);
        this.map.ol.addLayer(this._auxLayers.centroids);
        this.map.ol.addLayer(this._auxLayers.orthoLines);
      }
    }, {
      key: "_initSelects",
      value: function _initSelects() {
        var resolution = this.map.ol.getView().getResolution();
        var pixelTolerance = this._units === 'px' ? parseInt(this._tolerance) : Math.round(parseInt(this._tolerance) / resolution);
        this._select = {
          extendSegments: new ol.interaction.Select({
            condition: ol.events.condition.pointerMove,
            multi: true,
            layers: [this._auxLayers.extendSegments],
            hitTolerance: pixelTolerance,
            style: new ol.style.Style({
              stroke: new ol.style.Stroke({
                width: 1,
                color: 'rgb(255, 0, 255)',
                lineDash: [2, 5] //or other combinations
              })
            })
          }),
          intersections: new ol.interaction.Select({
            condition: ol.events.condition.pointerMove,
            multi: true,
            layers: [this._auxLayers.intersections],
            hitTolerance: pixelTolerance,
            style: new ol.style.Style({
              image: new ol.style.RegularShape({
                stroke: new ol.style.Stroke({
                  width: 1,
                  color: 'rgba(255, 0, 255, 1)'
                }),
                points: 4,
                radius: 5,
                radius2: 0,
                rotation: 0,
                angle: 0
              })
            })
          }),
          midPoints: new ol.interaction.Select({
            condition: ol.events.condition.pointerMove,
            multi: true,
            layers: [this._auxLayers.midPoints],
            hitTolerance: pixelTolerance,
            style: new ol.style.Style({
              image: new ol.style.RegularShape({
                stroke: new ol.style.Stroke({
                  width: 1,
                  color: 'rgba(255, 0, 255, 1)'
                }),
                points: 3,
                radius: 5,
                rotation: 0,
                angle: 0
              })
            })
          }),
          centroids: new ol.interaction.Select({
            condition: ol.events.condition.pointerMove,
            multi: true,
            layers: [this._auxLayers.centroids],
            hitTolerance: pixelTolerance,
            style: new ol.style.Style({
              image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                  width: 1,
                  color: 'rgba(255, 0, 255, 1)'
                })
              })
            })
          })
        };
      }
    }, {
      key: "_listLayers",
      value: function _listLayers() {
        var content;
        var layers = '';
        layers += "\n        <div class=\"form-check\">\n            <input class=\"form-check-input\" type=\"checkbox\" value=\"internal\" group=\"-1\" layer=\"-1\" id=\"map-app-snap".concat(this.id, "-internal\" checked>\n            <label class=\"form-check-label\" for=\"map-app-snap").concat(this.id, "-internal\">\n                Camadas de edi\xE7\xE3o\n            </label>\n        </div>");
        for (var i = 0; i < this.map.content.length; i++) {
          content = this.map.content[i];
          if (content.type == 'ogc' || content.type == 'wfs') {
            for (var k = 0; k < content.layers.length; k++) {
              //if (content.layers[k].snap) {

              layers += "\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" value=\"\" group=\"".concat(i, "\" layer=\"").concat(k, "\" id=\"map-app-snap").concat(this.id, "-").concat(i, "-").concat(k, "\">\n                            <label class=\"form-check-label\" for=\"map-app-snap").concat(this.id, "-").concat(i, "-").concat(k, "\">\n                            ").concat(content.name, ":").concat(content.layers[k].name, "\n                            </label>\n                        </div>");

              //}
            }
          }
        }
        if (layers === '') {
          layers = 'Nenhuma camada disponível para snap.';
        }
        return layers;
      }
    }, {
      key: "_bindUi",
      value: function _bindUi() {
        // Layers
        var content;
        for (var i = 0; i < this.map.content.length; i++) {
          content = this.map.content[i];
          if (content.type == 'ogc' || content.type == 'wfs') {
            for (var k = 0; k < content.layers.length; k++) {
              document.getElementById("map-app-snap".concat(this.id, "-").concat(i, "-").concat(k)).checked = content.layers[k].snap;
            }
          }
        }
        document.getElementById("map-app-snap".concat(this.id, "-tol")).value = this._tolerance;
        document.getElementById("map-app-snap".concat(this.id, "-unit")).value = this._units;
        document.getElementById("map-app-snap".concat(this.id, "-scales")).value = this._scale;
        document.getElementById("map-app-snap".concat(this.id, "-vertice")).checked = this._tovertex;
        document.getElementById("map-app-snap".concat(this.id, "-edge")).checked = this._toEdge;
        document.getElementById("map-app-snap".concat(this.id, "-extention")).checked = this._toExtention;
        document.getElementById("map-app-snap".concat(this.id, "-centroid")).checked = this._toCentroid;
        document.getElementById("map-app-snap".concat(this.id, "-midpoint")).checked = this._toMidPoint;
        document.getElementById("map-app-snap".concat(this.id, "-intersection")).checked = this._toIntersection;
        document.getElementById("map-app-snap".concat(this.id, "-orto")).checked = this._toOrto;
      }
    }, {
      key: "_initFormat",
      value: function _initFormat() {
        this._format = new ol.format.GeoJSON({
          featureProjection: 'EPSG:4326'
        });
        // Força leitura de geojson fornecido pelo geoserver
        this._format.readProjectionFromObject = function (object) {
          var geoJSONObject = object;
          var crs = geoJSONObject.crs;
          var projection;
          if (crs) {
            if (crs.type == 'name') {
              projection = ol.proj.get(crs.properties.name);
            } else if (crs.type == 'EPSG') {
              projection = ol.proj.get('EPSG:' + crs.properties.code);
            } else {
              assert(false, 36);
            }
          } else {
            projection = ol.proj.get(this.map.srid);
          }
          return projection;
        };
      }
    }, {
      key: "_createSources",
      value: function _createSources() {
        var _this2 = this;
        var content;
        var subLayers = [];
        this._sources = [];
        var _loop = function _loop() {
            content = _this2.map.content[i];
            if (content.type == 'ogc' || content.type == 'wfs') {
              for (k = 0; k < content.layers.length; k++) {
                if (content.layers[k].snap) {
                  subLayers.push(content.workspace + ':' + content.layers[k].layer);
                }
              }
              if (subLayers.length > 0) {
                var srid = _this2.map.srid;
                var source = content.source;
                var vectorSource = new ol.source.Vector({
                  format: _this2._format,
                  url: function url(extent$$1) {
                    return source + '/ows?service=WFS&' + 'version=1.0.0&request=GetFeature&' + 'typeName=' + subLayers.join() + '&' + 'outputFormat=json&srsname=' + srid + '&bbox=' + extent$$1.join(',') + ',' + srid + '&maxFeatures=2000';
                  },
                  strategy: ol.loadingstrategy.bbox
                });
                var scale = _this2._scale;
                var constant = _this2._getConstant();
                _this2._maxResolution = (parseInt(scale) + 1) / constant;
                var snapLayer = new ol.layer.Vector({
                  source: vectorSource,
                  maxResolution: _this2._maxResolution
                });
                snapLayer.setOpacity(0);
                _this2.map.ol.addLayer(snapLayer);
                _this2._sources.push(vectorSource);
                _this2._layers.push(snapLayer);
              }
            }
          },
          k;
        for (var i = 0; i < this.map.content.length; i++) {
          _loop();
        }
      }
    }, {
      key: "_getInternalSources",
      value: function _getInternalSources() {
        if (this._internalLayers) {
          var layers = this.map.ol.getLayers().getArray();
          for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            if (layer instanceof ol.layer.Vector) {
              this._sources.push(layer.getSource());
            }
          }
        }
      }
    }, {
      key: "_removeSources",
      value: function _removeSources() {
        for (var i = 0; i < this._sources.length; i++) {
          this.map.ol.removeLayer(this._layers[i]);
          this._layers[i] = null;
          this._sources[i] = null;
        }
        this._sources = [];
        this._layers = [];
      }
    }, {
      key: "_getConstant",
      value: function _getConstant() {
        var INCHES_PER_UNIT = {
          'm': 39.37,
          'dd': 4374754
        };
        var div = document.createElement('div');
        div.style.height = '1in';
        div.style.width = '1in';
        div.style.top = '-100%';
        div.style.left = '-100%';
        div.style.position = 'absolute';
        document.body.appendChild(div);
        var dpi = div.offsetHeight;
        document.body.removeChild(div);
        var unit = this.map.ol.getView().getProjection().getUnits();
        return INCHES_PER_UNIT[unit] * dpi;
      }
    }, {
      key: "_addInteraction",
      value: function _addInteraction() {
        this._snaps = [];
        var resolution = this.map.ol.getView().getResolution();
        var pixelTolerance = this._units === 'px' ? parseInt(this._tolerance) : Math.round(parseInt(this._tolerance) / resolution);
        for (var i = 0; i < this._sources.length; i++) {
          var snap = new ol.interaction.Snap({
            source: this._sources[i],
            edge: this._toEdge,
            vertex: this._toVertex,
            pixelTolerance: pixelTolerance
          });
          this._snaps.push(snap);
          this.map.ol.addInteraction(snap);
        }
        var internalLayers = Object.values(this._auxLayers);
        for (var _i = 0; _i < internalLayers.length; _i++) {
          var _snap = new ol.interaction.Snap({
            source: internalLayers[_i].getSource(),
            edge: this._toEdge,
            vertex: this._toVertex,
            pixelTolerance: pixelTolerance
          });
          this._snaps.push(_snap);
          this.map.ol.addInteraction(_snap);
        }
        if (this._showAuxFeatures) {
          this.map.ol.addInteraction(this._select.extendSegments);
          this.map.ol.addInteraction(this._select.intersections);
          this.map.ol.addInteraction(this._select.midPoints);
          this.map.ol.addInteraction(this._select.centroids);
        }
      }
    }, {
      key: "_getAllFeatures",
      value: function _getAllFeatures() {
        var allFeatures = [];
        var layers = this.map.ol.getLayers().getArray();
        for (var i = 0; i < layers.length; i++) {
          var layer = layers[i];
          if (layer.getSource() instanceof ol.source.Vector) {
            allFeatures = allFeatures.concat(layer.getSource().getFeatures());
          }
        }
        return allFeatures;
      }
    }, {
      key: "_getViewBBox",
      value: function _getViewBBox() {
        var e = ol.proj.transformExtent(map.ol.getView().calculateExtent(), map.srid, 'EPSG:4326');
        var l = turf.lineString([[e[0], e[1]], [e[2], e[3]]]);
        return turf.envelope(l);
      }

      // TODO: Implementar esse método
    }, {
      key: "_getFeatures",
      value: function _getFeatures() {
        var olFeatures = this._getAllFeatures();
        var featCollection = this._format.writeFeaturesObject(olFeatures, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });
        var bbox = this._getViewBBox();
        var rFeatures = [];
        turf.geomEach(featCollection, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
          // if (currentGeometry) {

          //     if (currentGeometry.type.toLowerCase().indexOf('point') > -1) {

          //         inBBox = turf.booleanPointInPolygon(currentGeometry, bbox);

          //     } else {

          //         // let centroid = turf.centroid(currentGeometry);
          //         // inBBox = turf.booleanPointInPolygon(centroid, bbox);

          //         let intersects = turf.lineIntersect(currentGeometry, bbox);
          //         inBBox = intersects.features.length > 0;

          //     }

          //     if (inBBox) rFeatures.push(turf.feature(currentGeometry));

          //     console.log(inBBox)

          // }

          rFeatures.push(turf.feature(currentGeometry));

          //inBBox = false;
        });
        return turf.featureCollection(rFeatures);
      }
    }, {
      key: "_createAuxFeatures",
      value: function _createAuxFeatures() {
        this._clearAuxLayers();
        if (this._hasSnap() && this._internalLayers) {
          this._featCollection = this._getFeatures();
          if (this._toExtention) this._createExtendLines();
          if (this._toCentroid) this._createControids();
          if (this._toMidPoint) this._createMidPoints();
          if (this._toIntersection) this._createIntersections();
        }
      }
    }, {
      key: "_clearAuxLayers",
      value: function _clearAuxLayers() {
        this._auxLayers.extendSegments.getSource().clear();
        this._auxLayers.centroids.getSource().clear();
        this._auxLayers.midPoints.getSource().clear();
        this._auxLayers.intersections.getSource().clear();
      }
    }, {
      key: "_getDrawDistance",
      value: function _getDrawDistance() {
        var e = ol.proj.transformExtent(map.ol.getView().calculateExtent(), map.srid, 'EPSG:4326');
        var l = turf.lineString([[e[0] * 1.01, e[1] * 1.01], [e[2] * 1.01, e[3] * 1.01]]);
        var d = turf.length(l, {
          units: 'meters'
        });
        return d * 2;
      }
    }, {
      key: "_getSegmentBearing",
      value: function _getSegmentBearing(segment) {
        var c = segment.geometry.coordinates;
        var p1 = turf.point(c[0]);
        var p2 = turf.point(c[1]);
        return turf.bearing(p1, p2);
      }
    }, {
      key: "_createExtendLines",
      value: function _createExtendLines() {
        var _this3 = this;
        var distance = this._getDrawDistance();
        turf.segmentEach(this._featCollection, function (segment) {
          var bearing = _this3._getSegmentBearing(segment);
          var p1 = turf.point(segment.geometry.coordinates[0]);
          var p2 = turf.point(segment.geometry.coordinates[1]);
          var dest1 = turf.destination(p1, distance, bearing, {
            units: 'meters'
          });
          var dest2 = turf.destination(p2, distance, bearing + 180, {
            units: 'meters'
          });
          var l1 = turf.lineString([dest1.geometry.coordinates, p2.geometry.coordinates], {
            __i__: true
          });
          var l2 = turf.lineString([dest2.geometry.coordinates, p1.geometry.coordinates], {
            __i__: true
          });
          var collection = turf.featureCollection([l1, l2]);
          var olFeature = _this3._format.readFeaturesFromObject(collection, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
          });
          _this3._auxLayers.extendSegments.getSource().addFeatures(olFeature);
        });
      }
    }, {
      key: "_createControids",
      value: function _createControids() {
        var _this4 = this;
        turf.geomEach(this._featCollection, function (geom) {
          if (geom) {
            var geomType = turf.getType(geom);
            if (geomType.toLowerCase().indexOf('polygon') > -1) {
              var centroid = turf.centroid(geom);
              var olFeature = _this4._format.readFeatureFromObject(centroid, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
              });
              _this4._auxLayers.centroids.getSource().addFeature(olFeature);
            }
          }
        });
      }
    }, {
      key: "_createMidPoints",
      value: function _createMidPoints() {
        var _this5 = this;
        turf.segmentEach(this._featCollection, function (segment) {
          if (segment) {
            var centroid = turf.centroid(segment);
            var olFeature = _this5._format.readFeatureFromObject(centroid, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857'
            });
            _this5._auxLayers.midPoints.getSource().addFeature(olFeature);
          }
        });
      }
    }, {
      key: "_createIntersections",
      value: function _createIntersections() {
        var _this6 = this;
        this._featCollection = this._getFeatures();
        turf.segmentEach(this._featCollection, function (s1) {
          if (s1) {
            turf.segmentEach(_this6._featCollection, function (s2) {
              if (s2) {
                var intersects = turf.lineIntersect(s1, s2);
                if (intersects.features.length > 0) {
                  var olFeature = _this6._format.readFeaturesFromObject(intersects, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                  });
                  _this6._auxLayers.intersections.getSource().addFeatures(olFeature);
                }
              }
            });
          }
        });
      }
    }, {
      key: "_removeInteractions",
      value: function _removeInteractions() {
        for (var i = 0; i < this._snaps.length; i++) {
          this.map.ol.removeInteraction(this._snaps[i]);
        }
        this.map.ol.removeInteraction(this._select.extendSegments);
        this.map.ol.removeInteraction(this._select.intersections);
        this.map.ol.removeInteraction(this._select.midPoints);
        this.map.ol.removeInteraction(this._select.centroids);
      }

      // External Used
    }, {
      key: "_refreshInteractions",
      value: function _refreshInteractions() {
        for (var i = 0; i < this._snaps.length; i++) {
          this.map.ol.removeInteraction(this._snaps[i]);
          this.map.ol.addInteraction(this._snaps[i]);
        }
      }

      // External Used
    }, {
      key: "_addSource",
      value: function _addSource(source) {
        this._sources.push(source);
        this._addInteraction();
      }

      // External Used
    }, {
      key: "_hasSnap",
      value: function _hasSnap() {
        var scale = this._scale;
        var constant = this._getConstant();
        this._maxResolution = (parseInt(scale) + 1) / constant;
        return this._maxResolution >= this.map.ol.getView().getResolution();
      }

      // External Used
    }, {
      key: "_registerExternalInteraction",
      value: function _registerExternalInteraction() {
        var _this7 = this;
        this.map.toolbox.refreshSnap = function () {
          return _this7._refreshInteractions();
        };
        this.map.toolbox.hasSnap = function () {
          return _this7._hasSnap();
        };
        this.map.toolbox.addSnapSource = function (source) {
          return _this7._addSource(source);
        };
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this8 = this;
        document.getElementById("map-app-snap".concat(this.id, "-save")).addEventListener('click', function () {
          var content;
          for (var i = 0; i < _this8.map.content.length; i++) {
            content = _this8.map.content[i];
            if (content.type == 'ogc' || content.type == 'wfs') {
              for (var k = 0; k < content.layers.length; k++) {
                content.layers[k].snap = document.getElementById("map-app-snap".concat(_this8.id, "-").concat(i, "-").concat(k)).checked;
              }
            }
          }
          _this8._tolerance = document.getElementById("map-app-snap".concat(_this8.id, "-tol")).value;
          _this8._units = document.getElementById("map-app-snap".concat(_this8.id, "-unit")).value;
          _this8._scale = document.getElementById("map-app-snap".concat(_this8.id, "-scales")).value;
          _this8._toVertex = document.getElementById("map-app-snap".concat(_this8.id, "-vertice")).checked;
          _this8._toEdge = document.getElementById("map-app-snap".concat(_this8.id, "-edge")).checked;
          _this8._internalLayers = document.getElementById("map-app-snap".concat(_this8.id, "-internal")).checked;
          _this8._toExtention = document.getElementById("map-app-snap".concat(_this8.id, "-extention")).checked;
          _this8._toCentroid = document.getElementById("map-app-snap".concat(_this8.id, "-centroid")).checked;
          _this8._toMidPoint = document.getElementById("map-app-snap".concat(_this8.id, "-midpoint")).checked;
          _this8._toIntersection = document.getElementById("map-app-snap".concat(_this8.id, "-intersection")).checked;
          _this8._toOrto = document.getElementById("map-app-snap".concat(_this8.id, "-orto")).checked;
          _this8._showAuxFeatures = document.getElementById("map-app-snap".concat(_this8.id, "-show-lines")).checked;
          _this8._removeInteractions();
          _this8._removeSources();
          _this8._createSources();
          _this8._getInternalSources();
          _this8._createAuxFeatures();
          _this8._addInteraction();
        });
        this.map.ol.getView().on('change:resolution', function () {
          _this8._createAuxFeatures();
          _this8._refreshInteractions();
        });
        this.map.ol.on('moveend', function () {
          _this8._createAuxFeatures();
          _this8._refreshInteractions();
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
      }
    }]);
  }(GeoWidget);

  var OgcExporter = /*#__PURE__*/function (_GeoWidget) {
    function OgcExporter(config) {
      var _this;
      _classCallCheck(this, OgcExporter);
      config = config || {};
      config.tip = config.tip || 'Exportar';
      config.title = config.title || 'Exportar Dados';
      config.class = config.class || 'map-app-measure-line-control';
      config.formats = config.formats || [{
        format: 'DXF',
        name: 'AutoCAD DXF',
        ext: 'dxf'
      }, {
        format: 'SHAPE-ZIP',
        name: 'ESRI Shape File',
        ext: 'zip'
      }, {
        format: 'application/json',
        name: 'GeoJSON',
        ext: 'geojson'
      }, {
        format: 'csv',
        name: 'CSV',
        ext: 'csv'
      }, {
        format: 'application/vnd.google-earth.kml+xml',
        name: 'Google Earth KML',
        ext: 'kml'
      }];
      _this = _callSuper(this, OgcExporter, [config]);
      _this.ui = _this._builUi();
      _this._supportedFormats = null;
      _this._layersElements = [];
      _this._hasBtn = false;
      return _this;
    }
    _inherits(OgcExporter, _GeoWidget);
    return _createClass(OgcExporter, [{
      key: "initialize",
      value: function initialize() {
        this._getFormats();
      }
    }, {
      key: "_writeLayers",
      value: function _writeLayers(content) {
        var layers = content.layers;
        for (var j = 0; j < layers.length; j++) {
          var layerElement = document.createElement('input');
          var nameElement = document.createElement('span');
          var _newLineElement = document.createElement('br');
          layerElement.type = 'checkbox';
          layerElement.name = 'map-app-ogc-exporter-' + this.id + '-' + this.map.target;
          layerElement.value = content.workspace + ':' + layers[j].layer;
          layers[j].exportElement = layerElement;
          nameElement.innerHTML = ' ' + layers[j].name;
          this._listElm.appendChild(layerElement);
          this._listElm.appendChild(nameElement);
          this._listElm.appendChild(_newLineElement);
        }
        var newLineElement = document.createElement('br');
        this._listElm.appendChild(newLineElement);
      }
    }, {
      key: "_writeFormats",
      value: function _writeFormats() {
        this._formatsElement.className = 'form-control mt-3 mb-3';

        //for (let i = 0; i < this._supportedFormats.length; i++) {

        for (var j = 0; j < this.config.formats.length; j++) {
          // if (this._supportedFormats[i] === this.config.formats[j].format) {

          var option = document.createElement('option');
          option.text = this.config.formats[j].name;
          option.value = this.config.formats[j].format;
          this._formatsElement.add(option);

          // }
        }
        //}
      }
    }, {
      key: "_writeSendBtn",
      value: function _writeSendBtn() {
        var _this2 = this;
        this._btnElement.className = 'btn btn-dark btn-block';
        this._btnElement.innerText = 'Exportar';
        this._btnElement.addEventListener('click', function () {
          return _this2._getFile();
        });
      }
    }, {
      key: "_getFile",
      value: function _getFile() {
        var format = this._formatsElement.value;
        for (var i = 0; i < this.map.content.length; i++) {
          var layersExport = [];
          var layers = this.map.content[i].layers;
          for (var j = 0; j < layers.length; j++) {
            var element = layers[j].exportElement;
            if (element && element.checked) {
              layersExport.push(element.value);
            }
          }
          if (layersExport.length > 0) {
            var path = this.map.content[i].source + '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' + layersExport.join(',') + '&outputFormat=' + format;
            var auth = this.map.content[i].auth;
            this.map.containerElement.style.cursor = 'wait';
            this._open(path, auth, format);
          }
        }
      }
    }, {
      key: "_open",
      value: function _open(path, auth, format) {
        for (var i = 0; i < this.config.formats.length; i++) {
          if (this.config.formats[i].format == format) {
            format = this.config.formats[i].ext;
          }
        }
        var msg = new Notify({
          message: "Preparando arquivo...",
          type: 'success',
          timeout: 60
        });
        msg.show();
        var mapElm = this.map.containerElement;
        var fileName = '';
        var save = this._saveFile;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path);
        xhr.withCredentials = true;
        if (auth) xhr.setRequestHeader('Authorization', auth);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          var blob = xhr.response;
          if (xhr.getResponseHeader('Content-Disposition')) {
            var contentDispo = xhr.getResponseHeader('Content-Disposition');
            fileName = contentDispo.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1];
          } else {
            fileName = Date.now() + '_exportacao.' + format;
          }
          save(blob, fileName);
          mapElm.style.cursor = '';
          msg.hide();
        };
        xhr.send();
      }
    }, {
      key: "_saveFile",
      value: function _saveFile(blob, fileName) {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;
        a.dispatchEvent(new MouseEvent('click'));
      }
    }, {
      key: "_builUi",
      value: function _builUi() {
        var container = document.createElement('div');
        var br = document.createElement('br');
        container.className = 'm-0 p-3';
        this._listElm = document.createElement('div');
        this._btnElement = document.createElement('button');
        this._formatsElement = document.createElement('select');
        container.appendChild(this._listElm);
        container.appendChild(this._formatsElement);
        container.appendChild(this._btnElement);
        container.appendChild(br);
        return container;
      }
    }, {
      key: "_getFormats",
      value: function _getFormats() {
        this._writeSendBtn();
        this._writeFormats();
        for (var i = 0; i < this.map.content.length; i++) {
          switch (this.map.content[i].type.toLowerCase()) {
            case 'wms':
            case 'wfs':
            case 'ogc':
              this._writeLayers(this.map.content[i]);
              break;
          }
        }
      }
    }, {
      key: "_xmlToJson",
      value: function _xmlToJson(xml) {
        // Create the return object
        var obj = {};
        if (xml.nodeType == 1) {
          // element
          // do attributes
          if (xml.attributes.length > 0) {
            obj['@attributes'] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
            }
          }
        } else if (xml.nodeType == 3) {
          // text
          obj = xml.nodeValue;
        }

        // do children
        // If just one text node inside
        if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
          obj = xml.childNodes[0].nodeValue;
        } else if (xml.hasChildNodes()) {
          for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof obj[nodeName] == 'undefined') {
              obj[nodeName] = this._xmlToJson(item);
            } else {
              if (typeof obj[nodeName].push == 'undefined') {
                var old = obj[nodeName];
                obj[nodeName] = [];
                obj[nodeName].push(old);
              }
              obj[nodeName].push(this._xmlToJson(item));
            }
          }
        }
        return obj;
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
      }
    }]);
  }(GeoWidget);

  var PrintMap = /*#__PURE__*/function (_GeoWidget) {
    function PrintMap(config) {
      var _this;
      _classCallCheck(this, PrintMap);
      config = config || {};
      config.tip = config.tip || 'Imprimir Mapa';
      config.title = config.title || 'Imprimir Mapa';
      config.class = config.class || 'map-app-measure-line-control';
      config.maximized = true;
      config.dockable = false;
      config.templates = config.templates || [{
        path: '/templates/a0_landscape.html',
        name: 'Folha A0 Paisagem - Legenda padrão',
        description: 'Folha A0 no padrão NBR 10068',
        elements: ['map', 'legend', 'title', 'vendor', 'scale', 'data']
      }, {
        path: '/templates/a0_portrait.html',
        name: 'Folha A0 Retrato - Legenda padrão',
        description: 'Folha A0 no padrão NBR 10068',
        elements: ['map', 'legend', 'title', 'vendor', 'scale', 'data']
      }, {
        path: '/templates/a1_landscape.html',
        name: 'Folha A1 Paisagem - Legenda padrão',
        description: 'Folha A1 no padrão NBR 10068',
        elements: ['map', 'legend', 'title', 'vendor', 'scale', 'data']
      }, {
        path: '/templates/a1_portrait.html',
        name: 'Folha A1 Retrato - Legenda padrão',
        description: 'Folha A1 no padrão NBR 10068',
        elements: ['map', 'legend', 'title', 'vendor', 'scale', 'data']
      }, {
        path: '/templates/a2_landscape.html',
        name: 'Folha A2 Paisagem - Legenda padrão',
        description: 'Folha A2 no padrão NBR 10068',
        elements: ['map', 'legend', 'title', 'vendor', 'scale', 'data']
      }, {
        path: '/templates/a2_portrait.html',
        name: 'Folha A2 Retrato - Legenda padrão',
        description: 'Folha A2 no padrão NBR 10068',
        elements: ['map', 'legend', 'title', 'vendor', 'scale', 'data']
      }, {
        path: '/templates/a3_landscape.html',
        name: 'Folha A3 Paisagem - Legenda padrão',
        description: 'Folha A3 no padrão NBR 10068',
        elements: ['map', 'legend', 'title', 'vendor', 'scale', 'data']
      }, {
        path: '/templates/a3_portrait.html',
        name: 'Folha A3 Retrato - Legenda padrão',
        description: 'Folha A3 no padrão NBR 10068',
        elements: ['map', 'legend', 'title', 'vendor', 'scale', 'data']
      }, {
        path: '/templates/a4_landscape.html',
        name: 'Folha A4 Paisagem - Legenda padrão',
        description: 'Folha A4 no padrão NBR 10068',
        elements: ['map', 'legend', 'title', 'vendor', 'scale', 'data']
      }, {
        path: '/templates/a4_portrait.html',
        name: 'Folha A4 Retrato - Legenda padrão',
        description: 'Folha A4 no padrão NBR 10068',
        elements: ['map', 'legend', 'title', 'vendor', 'scale', 'data'],
        default: true
      }];
      config.css = config.css || '/libs/openlayers/v5.2.0/ol.css';
      _this = _callSuper(this, PrintMap, [config]);
      _this._graticule = null;
      _this._editor = null;
      _this._preview = null;
      _this._mapTemplateId = null;
      _this._titleTemplateId = null;
      _this._legendTemplateId = null;
      _this._vendorTemplateId = null;
      _this._scaleTemplateId = null;
      _this._dataTemplateId = null;
      _this._referralSystemTemplateId = null;
      _this._overviewMapTemplateId = null;
      _this._templateElementId = null;
      _this._cTitleElementId = null;
      _this._titleElementId = null;
      _this._cScaleElementId = null;
      _this._scaleElementId = null;
      _this._cLengendElementId = null;
      _this._cNorthElementId = null;
      _this._cGridElementId = null;
      _this._cGraphicScaleElementId = null;
      _this._cLogoElementId = null;
      _this._cDataElementId = null;
      _this._cReferralSystemElementId = null;
      _this._cOverviewMapElementId = null;
      _this._scaleLineControl = null;
      _this._btnSaveImage = null;
      _this._zoomElementId = null;
      _this.overviewMap = null;
      _this.minMap = config.minMap || null;
      _this.ui = _this._builUi();
      return _this;
    }
    _inherits(PrintMap, _GeoWidget);
    return _createClass(PrintMap, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "_formTemplate",
      value: function _formTemplate() {
        return "\n            <form class=\"position-absolute map-app-w-16\" id=\"".concat(this._formElementId, "\">\n\n                <div class=\"form-group\">\n                    <div class=\"form-check\">\n                        <label class=\"form-check-label\" for=\"gridCheck\">\n                            Modelo\n                        </label>\n                    </div>\n                    <select class=\"form-control\" id=\"").concat(this._templateElementId, "\"></select>\n                </div>\n\n                <div class=\"form-group\">\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"checkbox\" id=\"").concat(this._cTitleElementId, "\" checked>\n                        <label class=\"form-check-label\" for=\"").concat(this._cTitleElementId, "\">\n                            T\xEDtulo\n                        </label>\n                    </div>\n                    <input class=\"form-control\" id=\"").concat(this._titleElementId, "\" type=\"text\" >\n                </div>\n\n                <div class=\"form-group\">\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"checkbox\" id=\"").concat(this._cScaleElementId, "\" checked>\n                        <label class=\"form-check-label\" for=\"").concat(this._cScaleElementId, "\">\n                            Escala\n                        </label>\n                    </div>\n                    <input class=\"form-control\" id=\"").concat(this._scaleElementId, "\" type=\"text\" >\n                </div>\n\n                <div class=\"form-group\">\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"checkbox\" id=\"").concat(this._cLengendElementId, "\" checked>\n                        <label class=\"form-check-label\" for=\"").concat(this._cLengendElementId, "\">\n                            Legenda\n                        </label>\n                    </div>\n\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"checkbox\" id=\"").concat(this._cNorthElementId, "\" checked>\n                        <label class=\"form-check-label\" for=\"").concat(this._cNorthElementId, "\">\n                            Indicador do Norte\n                        </label>\n                    </div>\n\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"checkbox\" id=\"").concat(this._cGridElementId, "\" checked>\n                        <label class=\"form-check-label\" for=\"").concat(this._cGridElementId, "\">\n                            Grade de Coordenadas\n                        </label>\n                    </div>\n\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"checkbox\" id=\"").concat(this._cGraphicScaleElementId, "\" checked>\n                        <label class=\"form-check-label\" for=\"").concat(this._cGraphicScaleElementId, "\">\n                            Escala Gr\xE1fica\n                        </label>\n                    </div>\n\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"checkbox\" id=\"").concat(this._cLogoElementId, "\" checked>\n                        <label class=\"form-check-label\" for=\"").concat(this._cLogoElementId, "\">\n                            Logo\n                        </label>\n                    </div>\n\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"checkbox\" id=\"").concat(this._cOverviewMapElementId, "\" checked>\n                        <label class=\"form-check-label\" for=\"").concat(this._cOverviewMapElementId, "\">\n                            Mapa de Localiza\xE7\xE3o\n                        </label>\n                    </div>\n\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"checkbox\" id=\"").concat(this._cDataElementId, "\" checked>\n                        <label class=\"form-check-label\" for=\"").concat(this._cDataElementId, "\">\n                            Data\n                        </label>\n                    </div>\n\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"checkbox\" id=\"").concat(this._cReferralSystemElementId, "\" checked>\n                        <label class=\"form-check-label\" for=\"").concat(this._cReferralSystemElementId, "\">\n                            Sistema de Refer\xEAncia\n                        </label>\n                    </div>\n\n                </div>\n\n                <div class=\"form-group\">\n                    <button type=\"submit\" class=\"btn btn-dark\">Imprimir</button>\n                </div>\n\n                <div class=\"form-group\">\n                    <button id=\"").concat(this._btnSaveImage, "\" class=\"btn btn-dark\">Salvar Imagem</button>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"customRange1\">Zoom</label>\n                    <input id=\"").concat(this._zoomElementId, "\" type=\"range\" class=\"custom-range\" value=\"1.0\" min=\"0.1\" max=\"1.0\" step=\"any\">\n                </div>\n                \n            </form> \n        ");
      }
    }, {
      key: "_builUi",
      value: function _builUi() {
        var container = document.createElement('div');
        container.className = 'row w-100 h-100 m-0';
        this._editor = document.createElement('div');
        //this._editor.className = 'col-2 m-3 float-left';
        this._editor.className = 'map-app-print-config p-3 float-left';
        this._preview = document.createElement('div');
        this._preview.className = 'map-app-print-preview bg-dark float-left';
        this._modalAlert = document.createElement('div');
        this._modalDialog = document.createElement('div');
        this._modalContent = document.createElement('div');
        this._modalHeader = document.createElement('div');
        this._modalHeaderTitle = document.createElement('h4');
        this._modalBody = document.createElement('div');
        this._modalFooter = document.createElement('div');
        this._modalFooterCheck = document.createElement('input');
        this._modalFooterText = document.createElement('p');
        this._modalFooterBtn = document.createElement('button');
        this._modalHeader.appendChild(this._modalHeaderTitle);
        this._modalFooter.append(this._modalFooterCheck, this._modalFooterText, this._modalFooterBtn);
        this._modalContent.append(this._modalHeader, this._modalBody, this._modalFooter);
        this._modalDialog.append(this._modalContent);
        this._modalAlert.append(this._modalDialog);
        container.appendChild(this._editor);
        container.appendChild(this._preview);
        container.appendChild(this._modalAlert);
        return container;
      }
    }, {
      key: "_createModal",
      value: function _createModal() {
        this._modalAlert.id = 'modal-print-alert';
        this._modalAlert.tabIndex = '-1"';
        this._modalAlert.style.paddingTop = '300px';
        this._modalAlert.style.paddingLeft = '800px';
        this._modalAlert.style.width = '1600px';
        this._modalAlert.className = 'modal';
        this._modalDialog.className = 'modal-dialog';
        this._modalContent.className = 'modal-content';
        this._modalHeader.className = 'modal-header';
        this._modalHeaderTitle.className = 'modal-title';
        this._modalBody.className = 'modal-body';
        this._modalFooter.className = 'modal-footer';
        this._modalFooterBtn.className = 'btn btn-primary';
        this._modalFooterCheck.type = 'checkbox';
        this._modalHeaderTitle.innerText = 'Aviso sobre Uso dos Dados Geoespaciais';
        this._modalBody.innerHTML = 'Os dados aqui disponibilizados são de responsabilidade das respectivas instituições produtoras. Para mais informações, consulte os metadados de cada camada.';
        this._modalFooterBtn.innerText = 'ok';
        this._modalFooterText.style.fontSize = '12px';
        this._modalFooterText.innerText = 'Li e estou ciente das restrições de uso de utilização dos dados geoespaciais.';
        $('#modal-print-alert').modal('show');
        this._modalFooterBtn.addEventListener('click', function () {
          localStorage.setItem('geodado_alert', true);
          $('#modal-print-alert').modal('hide');
        });
      }
    }, {
      key: "_listTemplates",
      value: function _listTemplates() {
        var list = document.getElementById(this._templateElementId);
        list.innerHTML = '';
        for (var i = 0; i < this._config.templates.length; i++) {
          var option = document.createElement('option');
          option.value = i;
          option.innerText = this._config.templates[i].name;
          list.appendChild(option);
        }
      }
    }, {
      key: "_setDefaultTemplate",
      value: function _setDefaultTemplate() {
        for (var i = 0; i < this._config.templates.length; i++) {
          if (this._config.templates[i].default) {
            this._activeTemplate = this._config.templates[i];
            this._activeTemplate.order = i;
          }
        }
        if (!this._activeTemplate) {
          this._activeTemplate = this._config.templates[0];
          this._activeTemplate.order = 0;
        }
      }
    }, {
      key: "_addGraticule",
      value: function _addGraticule() {
        var code = this.map.ol.getView().getProjection().getCode();
        if (code == 'EPSG:4326' || code == 'EPSG:3857') {
          this._graticule = new ol.Graticule({
            // the style to use for the lines, optional.
            strokeStyle: new ol.style.Stroke({
              color: 'rgba(0,0,0,0.8)',
              width: 1
            }),
            showLabels: true,
            targetSize: 200
          });
          console.log(this._graticule);
          this._graticule.setMap(this.map.ol);
        }
      }
    }, {
      key: "_addScaleLine",
      value: function _addScaleLine() {
        this._scaleLineControl = new ol.control.ScaleLine();
        this._scaleLineControl.setTarget(this._graphicScaleTemplateId);
        this._scaleLineControl.element.classList.remove('ol-scale-line');
        this.map.ol.addControl(this._scaleLineControl);
      }
    }, {
      key: "_fitTemplate",
      value: function _fitTemplate() {
        var wHeight = document.getElementById(this._contentId).clientHeight;
        var pHeight = this._preview.clientHeight;
        var wWidth = document.getElementById(this._contentId).clientWidth;
        var pWidth = this._preview.clientWidth;
        var zoomFactor = wHeight / pHeight < wWidth / pWidth ? wHeight / pHeight : wWidth / pWidth;
        this._preview.style.zoom = "".concat(zoomFactor * 100, "%");
      }
    }, {
      key: "_getTemplate",
      value: function _getTemplate(path) {
        var self = this;
        this.map.ol.removeControl(this.overviewMap);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path);
        xhr.onload = function () {
          if (xhr.status === 200) {
            self._showTemplate(xhr.responseText);
          } else {
            self.map.notify('Não foi possível obter a lista de templates');
            self.deactivate();
          }
        };
        xhr.send();
      }
    }, {
      key: "_showTemplate",
      value: function _showTemplate(templateContent) {
        var _this2 = this;
        templateContent = this._setTemplateIds(templateContent);
        this._preview.innerHTML = templateContent;
        this._editor.innerHTML = this._formTemplate();
        this._listTemplates();
        this._setValues();
        this._handleView();
        this._registerEvents();
        this.map.ol.setTarget(this._mapTemplateId);
        var legendElm = document.getElementById('map-app-thematic-neo-legend');
        //document.getElementById(this._mapTemplateId).querySelector('canvas').appendChild(legendElm);

        this._addGraticule();
        this._addScaleLine();
        this._addOverviewMap();
        if (legendElm) document.getElementById(this._legendTemplateId).innerHTML = legendElm.innerHTML;
        document.getElementById(this._legendTemplateId).innerHTML += this.map.getLegend();
        var legends = document.getElementsByClassName('img-legend-print');
        var northImage = document.getElementById(this._northTemplateId);
        var clientLogo = document.getElementById('clientLogo');
        this._toDataURL(northImage.src, function (dataUrl) {
          northImage.src = dataUrl;
          var rotation = _this2.map.ol.getView().getRotation();
          northImage.style.transform = "rotate(".concat(rotation, "rad)");
          _this2.map.ol.getView().on("change:rotation", function () {
            var rotation = _this2.map.ol.getView().getRotation();
            northImage.style.transform = "rotate(".concat(rotation, "rad)");
          });
        });
        this._toDataURL(clientLogo.src, function (dataUrl) {
          clientLogo.src = dataUrl;
        });
        var _loop = function _loop(i) {
          _this2._toDataURL(legends[i].src, function (dataUrl) {
            legends[i].src = dataUrl;
          });
        };
        for (var i = 0; i < legends.length; i++) {
          _loop(i);
        }
      }
    }, {
      key: "_addOverviewMap",
      value: function _addOverviewMap() {
        this.overviewMap = new ol.control.OverviewMap({
          collapsible: false,
          className: 'ol-overviewmap map-app-overview-map',
          layers: [new ol.layer.Tile({
            source: new ol.source.OSM()
          })]
        });
        this.map.ol.addControl(this.overviewMap);
      }
    }, {
      key: "_setTemplateIds",
      value: function _setTemplateIds(templateContent) {
        this._mapTemplateId = "gb_print_map_".concat(this.id, "_").concat(this.map.target);
        this._titleTemplateId = "gb_print_title_".concat(this.id, "_").concat(this.map.target);
        this._legendTemplateId = "gb_print_legend_".concat(this.id, "_").concat(this.map.target);
        this._dataTemplateId = "gb_print_data_".concat(this.id, "_").concat(this.map.target);
        this._referralSystemTemplateId = "gb_print_referral_system_".concat(this.id, "_").concat(this.map.target);
        this._overviewMapTemplateId = "gb_print_overview_map_".concat(this.id, "_").concat(this.map.target);
        this._vendorTemplateId = "gb_print_vendor_".concat(this.id, "_").concat(this.map.target);
        this._scaleTemplateId = "gb_print_scale_".concat(this.id, "_").concat(this.map.target);
        this._northTemplateId = "gb_print_north_".concat(this.id, "_").concat(this.map.target);
        this._graphicScaleTemplateId = "gb_print_graphicScale_".concat(this.id, "_").concat(this.map.target);
        this._logoTemplateId = "gb_print_logo_".concat(this.id, "_").concat(this.map.target);
        this._formElementId = "gb_print_c_form_".concat(this.id, "_").concat(this.map.target);
        this._templateElementId = "gb_print_c_template_".concat(this.id, "_").concat(this.map.target);
        this._titleElementId = "gb_print_c_title_".concat(this.id, "_").concat(this.map.target);
        this._scaleElementId = "gb_print_c_scale_".concat(this.id, "_").concat(this.map.target);
        this._cTitleElementId = "gb_print_cc_title_".concat(this.id, "_").concat(this.map.target);
        this._cScaleElementId = "gb_print_cc_scale_".concat(this.id, "_").concat(this.map.target);
        this._cLengendElementId = "gb_print_cc_legend_".concat(this.id, "_").concat(this.map.target);
        this._cNorthElementId = "gb_print_cc_north_".concat(this.id, "_").concat(this.map.target);
        this._cGridElementId = "gb_print_cc_grid_".concat(this.id, "_").concat(this.map.target);
        this._cGraphicScaleElementId = "gb_print_cc_graphic_scale_".concat(this.id, "_").concat(this.map.target);
        this._cLogoElementId = "gb_print_cc_logo_".concat(this.id, "_").concat(this.map.target);
        this._cDataElementId = "gb_print_cc_data_".concat(this.id, "_").concat(this.map.target);
        this._cReferralSystemElementId = "gb_print_cc_referral_system_".concat(this.id, "_").concat(this.map.target);
        this._cOverviewMapElementId = "gb_print_cc_overview_map_".concat(this.id, "_").concat(this.map.target);
        this._btnSaveImage = "gb_print_saveImage_".concat(this.id, "_").concat(this.map.target);
        this._zoomElementId = "gb_zoom_map_".concat(this.id, "_").concat(this.map.target);
        templateContent = templateContent.replace('{{map}}', this._mapTemplateId);
        templateContent = templateContent.replace('{{title}}', this._titleTemplateId);
        templateContent = templateContent.replace('{{legend}}', this._legendTemplateId);
        templateContent = templateContent.replace('{{data}}', this._dataTemplateId);
        templateContent = templateContent.replace('{{referralSystem}}', this._referralSystemTemplateId);
        templateContent = templateContent.replace('{{vendor}}', this._vendorTemplateId);
        templateContent = templateContent.replace('{{scale}}', this._scaleTemplateId);
        templateContent = templateContent.replace('{{north}}', this._northTemplateId);
        templateContent = templateContent.replace('{{graphicScale}}', this._graphicScaleTemplateId);
        templateContent = templateContent.replace('{{logo}}', this._logoTemplateId);
        templateContent = templateContent.replace('{{overviewmap}}', this._overviewMapTemplateId);
        return templateContent;
      }
    }, {
      key: "_setValues",
      value: function _setValues() {
        document.getElementById(this._titleTemplateId).innerText = this._activeTemplate.name;
        document.getElementById(this._titleElementId).value = this._activeTemplate.name;
        document.getElementById(this._scaleElementId).value = this.map.getScaleDenominator();
        document.getElementById(this._scaleTemplateId).innerText = ' 1:' + this.map.getScaleDenominator();
        document.getElementById(this._templateElementId).value = this._activeTemplate.order;
        document.getElementById(this._dataTemplateId).innerText = new Date().toLocaleDateString();
        var code = this.map.ol.getView().getProjection().getCode();
        var referralSystem = '';
        switch (code) {
          case 'EPSG:3857':
            referralSystem = 'WGS84 PSEUDOMERCATOR';
            break;
          case 'EPSG:4326':
            referralSystem = 'WGS84';
            break;
          case 'EPSG:31982':
            referralSystem = 'SIRGAS 2000 / UTM zone 22S';
            break;
          default:
            break;
        }
        document.getElementById(this._referralSystemTemplateId).innerText = referralSystem;
      }
    }, {
      key: "_handleView",
      value: function _handleView() {
        var _this3 = this;
        document.getElementById(this._cLogoElementId).addEventListener('change', function (evt) {
          if (evt.target.checked) {
            document.getElementById(_this3._logoTemplateId).style.display = 'block';
          } else {
            document.getElementById(_this3._logoTemplateId).style.display = 'none';
          }
        });
        document.getElementById(this._cGraphicScaleElementId).addEventListener('change', function (evt) {
          if (evt.target.checked) {
            _this3.map.ol.addControl(_this3._scaleLineControl);
          } else {
            _this3.map.ol.removeControl(_this3._scaleLineControl);
          }
        });
        document.getElementById(this._cGridElementId).addEventListener('change', function (evt) {
          if (evt.target.checked) {
            _this3._graticule.setMap(_this3.map.ol);
          } else {
            _this3._graticule.setMap(null);
          }
        });
        document.getElementById(this._cNorthElementId).addEventListener('change', function (evt) {
          if (evt.target.checked) {
            document.getElementById(_this3._northTemplateId).style.display = 'block';
          } else {
            document.getElementById(_this3._northTemplateId).style.display = 'none';
          }
        });
        document.getElementById(this._cLengendElementId).addEventListener('change', function (evt) {
          if (evt.target.checked) {
            document.getElementById(_this3._legendTemplateId).style.display = 'flex';
            document.getElementById(_this3._legendTemplateId).innerHTML = _this3.map.getLegend();
          } else {
            document.getElementById(_this3._legendTemplateId).style.display = 'none';
          }
        });
        document.getElementById(this._cScaleElementId).addEventListener('change', function (evt) {
          if (evt.target.checked) {
            document.getElementById(_this3._scaleTemplateId).style.display = 'flex';
            document.getElementById(_this3._scaleElementId).removeAttribute('readonly');
          } else {
            document.getElementById(_this3._scaleTemplateId).style.display = 'none';
            document.getElementById(_this3._scaleElementId).setAttribute('readonly', null);
          }
        });
        document.getElementById(this._cTitleElementId).addEventListener('change', function (evt) {
          if (evt.target.checked) {
            document.getElementById(_this3._titleTemplateId).parentElement.style.display = 'block';
            document.getElementById(_this3._titleElementId).removeAttribute('readonly');
          } else {
            document.getElementById(_this3._titleTemplateId).parentElement.style.display = 'none';
            document.getElementById(_this3._titleElementId).setAttribute('readonly', null);
          }
        });
        document.getElementById(this._cDataElementId).addEventListener('change', function (evt) {
          if (evt.target.checked) {
            document.getElementById(_this3._dataTemplateId).style.display = 'flex';
            document.getElementById(_this3._dataTemplateId).removeAttribute('readonly');
          } else {
            document.getElementById(_this3._dataTemplateId).style.display = 'none';
            document.getElementById(_this3._dataTemplateId).setAttribute('readonly', null);
          }
        });
        document.getElementById(this._cReferralSystemElementId).addEventListener('change', function (evt) {
          if (evt.target.checked) {
            document.getElementById(_this3._referralSystemTemplateId).style.display = 'flex';
            document.getElementById(_this3._referralSystemTemplateId).removeAttribute('readonly');
          } else {
            document.getElementById(_this3._referralSystemTemplateId).style.display = 'none';
            document.getElementById(_this3._referralSystemTemplateId).setAttribute('readonly', null);
          }
        });
        document.getElementById(this._cOverviewMapElementId).addEventListener('change', function (evt) {
          if (evt.target.checked) {
            _this3.map.ol.addControl(_this3.overviewMap);
            document.getElementById(_this3._overviewMapTemplateId).style.display = 'flex';
          } else {
            _this3.map.ol.removeControl(_this3.overviewMap);
            document.getElementById(_this3._overviewMapTemplateId).style.display = 'none';
          }
        });
      }
    }, {
      key: "_toDataURL",
      value: function _toDataURL(url, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onload = function () {
          var fileReader = new FileReader();
          fileReader.onloadend = function () {
            callback(fileReader.result);
          }, fileReader.readAsDataURL(httpRequest.response);
        };
        httpRequest.open('GET', url);
        httpRequest.responseType = 'blob';
        httpRequest.send();
      }
    }, {
      key: "_print",
      value: function _print() {
        var canvasMap = document.getElementById(this._mapTemplateId).getElementsByTagName('canvas');
        var overviewMapTemplate = document.getElementById(this._cOverviewMapElementId);
        if (overviewMapTemplate.checked) {
          var canv = null;
          for (var i = 0; i < canvasMap.length; i++) {
            if (canvasMap[i].width > 130 && canvasMap[i].width < 165) {
              canv = canvasMap[i];
            }
          }
          if (canv) {
            document.getElementById(this._overviewMapTemplateId).style.background = 'url(' + canv.toDataURL() + ')';
          }
        }

        // let scale = document.getElementsByClassName('ol-scale-line-inner')[1];
        // let textScale = scale.innerHTML;
        // let span = document.createElement('span');
        // span.className = 'map-app-scale';
        // span.textContent = textScale;
        // span.style.color = '#ffffff';
        // span.style.fontFamily = 'Arial, Helvetica, sans-serif';
        // scale.innerHTML = '';
        // scale.appendChild(span);

        //document.getElementById(this._mapTemplateId).style.background = 'url(' + canvasMap[0].toDataURL() + ')';
        document.getElementById(this._mapTemplateId).style.background = 'url(' + this.map.getMapAsDataURL() + ')';
        this._preview.id = 'gb_preview_print_map';
        window.printJS({
          printable: 'gb_preview_print_map',
          type: 'html',
          documentTitle: 'Mapa',
          css: this._config.css,
          scanStyles: false
        });

        //document.getElementsByClassName('ol-scale-line-inner')[1].innerHTML = textScale;
        document.getElementById(this._overviewMapTemplateId).style.background = 'none';
        document.getElementById(this._mapTemplateId).style.background = 'none';
      }
    }, {
      key: "_saveImage",
      value: function _saveImage(filename) {
        var _this4 = this;
        html2canvas(this._preview.getElementsByTagName('div')[0], {
          scale: 1,
          useCORS: true
        }).then(function (canvas) {
          _this4._saveAs(canvas.toDataURL(), filename + '.png');
        });
      }
    }, {
      key: "_saveAs",
      value: function _saveAs(uri, filename) {
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
          link.href = uri;
          link.download = filename;

          //Firefox requires the link to be in the body
          document.body.appendChild(link);

          //simulate click
          link.click();

          //remove the link when done
          document.body.removeChild(link);
        } else {
          window.open(uri);
        }
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this5 = this;
        document.getElementById(this._templateElementId).addEventListener('change', function () {
          var div = document.createElement('div');
          div.style.height = '10px';
          div.style.width = '10px';
          div.style.top = '-100%';
          div.style.left = '-100%';
          div.style.position = 'absolute';
          document.body.appendChild(div);
          _this5._graticule.setMap(null);
          _this5.map.ol.setTarget(div);
          var order = document.getElementById(_this5._templateElementId).value;
          _this5._activeTemplate.order = order;
          _this5._activeTemplate = _this5._config.templates[order];
          _this5._getTemplate(_this5._activeTemplate.path);
          document.body.removeChild(div);
        });
        document.getElementById(this._titleElementId).addEventListener('input', function () {
          document.getElementById(_this5._titleTemplateId).innerText = document.getElementById(_this5._titleElementId).value;
        });
        document.getElementById(this._scaleElementId).addEventListener('change', function () {
          _this5.map.setScaleDenominator(document.getElementById(_this5._scaleElementId).value);
          document.getElementById(_this5._scaleTemplateId).innerText = ' 1:' + document.getElementById(_this5._scaleElementId).value;
        });
        this.map.ol.getView().on('change:resolution', function () {
          document.getElementById(_this5._scaleElementId).value = _this5.map.getScaleDenominator();
          document.getElementById(_this5._scaleTemplateId).innerText = ' 1:' + _this5.map.getScaleDenominator();
        });
        document.getElementById(this._formElementId).addEventListener('submit', function (e) {
          document.getElementsByClassName('map-app-template-leaf')[0].style.transform = 'scale(1.0)';
          e.preventDefault();
          _this5._print();
        });
        document.getElementById(this._btnSaveImage).addEventListener('click', function (e) {
          document.getElementsByClassName('map-app-template-leaf')[0].style.transform = 'scale(1.0)';
          e.preventDefault();
          _this5._saveImage(_this5._btnSaveImage);
        });
        document.getElementById(this._zoomElementId).addEventListener('input', function (e) {
          document.getElementsByClassName('map-app-template-leaf')[0].style.transform = "scale(".concat(e.currentTarget.value, ")");
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        localStorage.getItem('geodado_alert') != 'true' ? this._createModal() : '';
        this.show();
        this.resizeToMax();
        this._setDefaultTemplate();
        this._getTemplate(this._activeTemplate.path);
        if (this.minMap) {
          this.map.ol.removeControl(this.minMap);
        }
        var legendElm = document.getElementById('map-app-thematic-neo-legend');
        if (legendElm) legendElm.classList.add('d-none');
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
        this.map.ol.setTarget(this.map.elementId);
        this._graticule.setMap(null);
        this.map.ol.removeControl(this.overviewMap);
        if (this.minMap) {
          this.map.ol.addControl(this.minMap);
        }
        var legendElm = document.getElementById('map-app-thematic-neo-legend');
        if (legendElm) legendElm.classList.remove('d-none');
      }
    }]);
  }(GeoWidget);

  var ScaleLine = /*#__PURE__*/function (_GeoWidget) {
    function ScaleLine(config) {
      var _this;
      _classCallCheck(this, ScaleLine);
      config = config || {};
      config.hasUI = false;
      config.position = config.position || 'rb';
      _this = _callSuper(this, ScaleLine, [config]);
      _this.scaleLineControl = null;
      _this._hasUI = false;
      return _this;
    }
    _inherits(ScaleLine, _GeoWidget);
    return _createClass(ScaleLine, [{
      key: "initialize",
      value: function initialize() {
        var panelElementId = this.map.getPanel(this._config.position).elementId;
        this._panelElement = document.getElementById(panelElementId);
        this.scaleLineControl = new ol.control.ScaleLine();
        this.scaleLineControl.setTarget(panelElementId);
        this.scaleLineControl.element.classList.remove('ol-scale-line');
        this.scaleLineControl.element.style.padding = '3px';
        this.map.ol.addControl(this.scaleLineControl);
      }
    }]);
  }(GeoWidget);

  var ScaleSelector = /*#__PURE__*/function (_GeoWidget) {
    function ScaleSelector(config) {
      var _this;
      _classCallCheck(this, ScaleSelector);
      config = config || {};
      config.hasUI = false;
      config.position = config.position || 'rb';
      config.predefinedScales = config.predefinedScales || [250, 500, 1000, 5000, 10000, 50000, 100000, 1000000];
      _this = _callSuper(this, ScaleSelector, [config]);
      _this.scaleLineControl = null;
      _this._hasUI = false;
      _this._inputId = '';
      return _this;
    }
    _inherits(ScaleSelector, _GeoWidget);
    return _createClass(ScaleSelector, [{
      key: "initialize",
      value: function initialize() {
        var panelElementId = this.map.getPanel(this._config.position).elementId;
        this._panelElement = document.getElementById(panelElementId);
        this._panelElement.appendChild(this._getTemplate());
        this._inputElement.style.width = '9ch';
        this._inputElement.value = this.map.getScaleDenominator();
        this._registerEvents();
      }
    }, {
      key: "_getTemplate",
      value: function _getTemplate() {
        var container = document.createElement('div');
        this._selectElement = document.createElement('select');
        this._selectElement.className = 'map-app-hidden-select';
        this._inputElement = document.createElement('input');
        this._inputElement.type = 'text';
        var scaleNumElement = document.createElement('span');
        scaleNumElement.innerText = '     1 :';
        container.appendChild(scaleNumElement);
        container.appendChild(this._inputElement);
        container.appendChild(this._selectElement);
        for (var i = 0; i < this._config.predefinedScales.length; i++) {
          var option = document.createElement('option');
          option.value = this._config.predefinedScales[i];
          option.innerText = this._config.predefinedScales[i];
          this._selectElement.add(option);
        }
        return container;
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this2 = this;
        this.map.ol.getView().on('change:resolution', function () {
          _this2._inputElement.value = _this2.map.getScaleDenominator();
        });
        this._selectElement.addEventListener('change', function () {
          _this2._inputElement.value = _this2._selectElement.value;
          _this2.map.setScaleDenominator(_this2._selectElement.value);
        });
        this._inputElement.addEventListener('keypress', function (e) {
          var key = e.which || e.keyCode;
          if (key === 13) {
            // 13 is enter

            _this2.map.setScaleDenominator(_this2._inputElement.value);
          }
        });
      }
    }]);
  }(GeoWidget);

  var MousePosition = /*#__PURE__*/function (_GeoWidget) {
    function MousePosition(config) {
      var _this;
      _classCallCheck(this, MousePosition);
      config = config || {};
      config.hasUI = false;
      config.position = config.position || 'rb';
      _this = _callSuper(this, MousePosition, [config]);
      _this.scaleLineControl = null;
      _this._hasUI = false;
      _this._currentProjection = null;
      return _this;
    }
    _inherits(MousePosition, _GeoWidget);
    return _createClass(MousePosition, [{
      key: "initialize",
      value: function initialize() {
        this._srsList = this.map._config.srs;
        var panelElementId = this.map.getPanel(this._config.position).elementId;
        this._panelElement = document.getElementById(panelElementId);
        this._panelElement.appendChild(this._getTemplate());
        var projectionCode = this.map.ol.getView().getProjection().getCode();
        this._currentProjection = null;
        for (var i = 0; i < this._srsList.length; i++) {
          if (this._srsList[i].code == projectionCode) {
            this._currentProjection = this._srsList[i];
            this.map.currentProjection = this._srsList[i];
          }
        }
        this._currentProjection = this._currentProjection || this._srsList[0];
        this._registerEvents();
        this._selectElement.value = this.map.ol.getView().getProjection().getCode();
      }
    }, {
      key: "_getTemplate",
      value: function _getTemplate() {
        var container = document.createElement('div');
        container.style.padding = '4px 0 0 0';
        this._inputElement = document.createElement('span');
        this._inputElement.style.textAlign = 'right';
        container.appendChild(this._inputElement);
        this._selectElement = document.createElement('select');
        this._selectElement.className = 'map-app-hidden-select';
        for (var i = 0; i < this._srsList.length; i++) {
          this._srsList[i].element = document.createElement('option');
          this._srsList[i].element.innerHTML = this._srsList[i].name;
          this._srsList[i].element.value = i;
          this._selectElement.appendChild(this._srsList[i].element);
        }
        container.appendChild(this._selectElement);
        return container;
      }
    }, {
      key: "_projectPoint",
      value: function _projectPoint(coordinate) {
        return coordinate;
      }
    }, {
      key: "_formatCoord",
      value: function _formatCoord(coordinate) {
        var _this2 = this;
        var displayCoords = '';
        if (this._currentProjection.format === 'DMS') {
          displayCoords = ol.coordinate.toStringHDMS(coordinate, this.map.config.precision || 3);
        } else if (this._currentProjection.format === 'DD') {
          displayCoords = coordinate.map(function (e) {
            return Number(e.toFixed(8));
          });
          displayCoords = displayCoords.reverse().toString();
        } else {
          displayCoords = coordinate.map(function (e) {
            return Number(e.toFixed(_this2.map.config.precision || 3));
          });
          displayCoords = displayCoords.toString();
        }
        displayCoords = displayCoords.replace(',', ' ').replace(',', ' ').replace('.', ',').replace('.', ',');
        return displayCoords;
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this.map.ol.on('pointermove', function (evt) {
          var projectedCoord = _this3._projectPoint(evt.coordinate);
          var formatedCoord = _this3._formatCoord(projectedCoord);
          _this3._inputElement.innerText = formatedCoord;
        });
        this._selectElement.addEventListener('change', function () {
          _this3._currentProjection = _this3._srsList[_this3._selectElement.value];
          _this3.map.currentProjection = _this3._srsList[_this3._selectElement.value];
          var center = ol.proj.transform(_this3.map.ol.getView().getCenter(), _this3.map.ol.getView().getProjection().getCode(), _this3._srsList[_this3._selectElement.value].code);
          var zoom = _this3.map.ol.getView().getZoom();
          var newView = new ol.View({
            projection: ol.proj.get(_this3._srsList[_this3._selectElement.value].code),
            center: center,
            zoom: zoom
          });
          _this3.map.ol.setView(newView);
          var controls = _this3.map.ol.getControls().getArray();
          for (var i = 0; i < controls.length; i++) {
            var control = controls[i];
            if (control instanceof ol.control.OverviewMap) {
              _this3.map.ol.removeControl(control);
            }
          }
          var overviewMap = new ol.control.OverviewMap({
            view: new ol.View({
              projection: ol.proj.get(_this3._srsList[_this3._selectElement.value].code),
              center: center
            }),
            className: 'ol-overviewmap bottom-overview-map',
            label: '«',
            collapseLabel: '»',
            tipLabel: 'Mapa de localização',
            layers: [new ol.layer.Tile({
              source: new ol.source.OSM()
            })]
          });
          _this3.map.ol.addControl(overviewMap);
        });
      }
    }]);
  }(GeoWidget);

  var StreetView = /*#__PURE__*/function (_GeoTool) {
    function StreetView(config) {
      var _this;
      _classCallCheck(this, StreetView);
      config = config || {};
      config.tip = config.tip || 'Google StreetView';
      _this = _callSuper(this, StreetView, [config]);
      _this._drawPromise = null;
      return _this;
    }
    _inherits(StreetView, _GeoTool);
    return _createClass(StreetView, [{
      key: "initialize",
      value: function initialize() {
        this._builUi();
        this.streetViewLayer = new ol.layer.Vector({
          source: new ol.source.Vector()
        });
        this.streetViewLayer.setZIndex(99999);
        this.map.ol.addLayer(this.streetViewLayer);
        this.projection = this.map.ol.getView().getProjection().getCode();
        this.streetViewPanoramaStyle = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 3,
            fill: new ol.style.Fill({
              color: 'rgb(255,0,0)'
            }),
            stroke: new ol.style.Stroke({
              color: 'rgb(255,0,0)',
              width: 1
            })
          }),
          fill: new ol.style.Fill({
            color: 'rgba(255,0,0,.5)'
          }),
          stroke: new ol.style.Stroke({
            color: 'rgb(255,0,0)',
            width: 2
          })
        });
      }
    }, {
      key: "_builUi",
      value: function _builUi() {
        this._mapContainer = document.createElement('div');
        this._mapContainer.id = 'map-app-lv-view-map' + this.id;
        this._mapContainer.className = 'map-app-lv-view';
        this.map.mapElement.appendChild(this._mapContainer);

        // this._changeButtom = document.createElement('div');
        // this._changeButtom.className = 'map-app-lv-change';
        // this._mapContainer.appendChild(this._changeButtom);

        // this._changeButtomTip = document.createElement('div');
        // this._changeButtomTip.className = 'map-app-lv-change-tip';
        // this._changeButtomTip.innerHTML = 'Trocar Posição';
        // this._mapContainer.appendChild(this._changeButtomTip);

        this._streetViewContainer = document.createElement('div');
        this._streetViewContainer.id = 'map-app-lv-view' + this.id;
        this._streetViewContainer.style.width = '100%';
        this._streetViewContainer.style.height = '100%';
        this._streetViewContainer.style.display = 'absolute';
        this._landViewDate = document.createElement('div');
        this._landViewDate.className = 'map-app-lv-date';
        this.map.mapElement.appendChild(this._landViewDate);

        // this._changeButtom.addEventListener('mouseover', () => {
        //     this._changeButtomTip.style.display = 'block';
        // });

        // this._changeButtom.addEventListener('mouseout', () => {
        //     this._changeButtomTip.style.display = 'none';
        // });

        // this._changeButtom.addEventListener('click', () => {
        //     this._changePosition();
        // });
      }
    }, {
      key: "_setDefaultPanorama",
      value: function _setDefaultPanorama() {
        var center = this.config.initialLngLat || ol.proj.transform(this.map.ol.getView().getCenter(), this.projection, 'EPSG:4326');
        this.panorama = new google.maps.StreetViewPanorama(this._streetViewContainer, {
          position: {
            lat: center[1],
            lng: center[0]
          },
          pov: {
            heading: 0,
            pitch: 0
          },
          zoom: 1,
          addressControl: false,
          fullscreenControl: false,
          zoomControl: false,
          motionTrackingControl: false
        });
      }
    }, {
      key: "getPanoramaMapView",
      value: function getPanoramaMapView() {
        var p1 = [this.panorama.position.lng(), this.panorama.position.lat()];
        p1 = ol.proj.transform(p1, 'EPSG:4326', 'EPSG:3857');
        var radius = 15;
        var zoom = this.panorama.pov.zoom;
        var fov = Math.PI / Math.pow(2, zoom);
        var azimuth = this.panorama.pov.heading * Math.PI / 180;
        var p2 = [];
        var p3 = [];
        p2[0] = p1[0] + radius * Math.sin(azimuth + fov / 2);
        p2[1] = p1[1] + radius * Math.cos(azimuth + fov / 2);
        p3[0] = p1[0] + radius * Math.sin(azimuth - fov / 2);
        p3[1] = p1[1] + radius * Math.cos(azimuth - fov / 2);
        p1 = ol.proj.transform(p1, 'EPSG:3857', this.projection);
        p2 = ol.proj.transform(p2, 'EPSG:3857', this.projection);
        p3 = ol.proj.transform(p3, 'EPSG:3857', this.projection);
        var polygon = new ol.geom.Polygon([[p1, p2, p3]]);
        return new ol.Feature({
          geometry: polygon
        });
      }
    }, {
      key: "drawPanoramaPosition",
      value: function drawPanoramaPosition() {
        var pos = [this.panorama.position.lng(), this.panorama.position.lat()];
        pos = ol.proj.transform(pos, 'EPSG:4326', this.projection);
        var triangleFeature = this.getPanoramaMapView(pos, this.panorama);
        var pointFeature = new ol.Feature({
          geometry: new ol.geom.Point(pos)
        });
        pointFeature.setStyle(this.streetViewPanoramaStyle);
        triangleFeature.setStyle(this.streetViewPanoramaStyle);
        this.streetViewLayer.getSource().clear();
        this.streetViewLayer.getSource().addFeature(pointFeature);
        this.streetViewLayer.getSource().addFeature(triangleFeature);
        this.map.ol.getView().animate({
          center: pos,
          duration: 500
        });
        if (this._isMapClick) {
          this._isMapClick = false;
          var p1 = [this.panorama.position.lng(), this.panorama.position.lat()];
          var pt = ol.proj.transform(this._clickPosition, this.projection, 'EPSG:3857');
          p1 = ol.proj.transform(p1, 'EPSG:4326', 'EPSG:3857');
          var heading = Math.atan2(pt[0] - p1[0], pt[1] - p1[1]) * 180 / Math.PI;
          this.panorama.setPov({
            heading: heading,
            pitch: this.panorama.pov.pitch
          });
        }
      }
    }, {
      key: "_mapClickEvent",
      value: function _mapClickEvent(evt) {
        var coord = evt.coordinate;
        var pos = ol.proj.transform(coord, this.projection, 'EPSG:4326');
        this.panorama.setPosition({
          lat: pos[1],
          lng: pos[0]
        });
        this._isMapClick = true;
        this._clickPosition = coord;
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this2 = this;
        this.panorama.addListener('position_changed', function () {
          _this2.drawPanoramaPosition();
        });
        this.panorama.addListener('pov_changed', function () {
          _this2.drawPanoramaPosition();
        });
        this.map.ol.on('click', function (evt) {
          return _this2._mapClickEvent(evt);
        });
      }
    }, {
      key: "_unregisterEvents",
      value: function _unregisterEvents() {
        var _this3 = this;
        this.map.ol.un('click', function (evt) {
          return _this3._mapClickEvent(evt);
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        _get(_getPrototypeOf(StreetView.prototype), "activate", this).call(this);
        this._mapContainer.style.display = 'block';
        this._landViewDate.style.display = 'block';
        this.map.ol.setTarget(this._mapContainer);
        this._isMiniMap = true;
        this.map.mapElement.appendChild(this._streetViewContainer);
        this._setDefaultPanorama();
        this._registerEvents();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.streetViewLayer.getSource().clear();
        this.panorama = null;
        this.map.ol.setTarget(this.map.mapElement);
        this._mapContainer.style.display = 'none';
        this._mapContainer.innerHTML = '';
        this._streetViewContainer.innerHTML = '';
        //this._mapContainer.appendChild(this._changeButtom);
        //this._mapContainer.appendChild(this._changeButtomTip);
        this.map.mapElement.removeChild(this._streetViewContainer);
        this.map.showDisabledControls();
        _get(_getPrototypeOf(StreetView.prototype), "deactivate", this).call(this);
      }
    }]);
  }(GeoTool);

  var FullScreen = /*#__PURE__*/function (_GeoButton) {
    function FullScreen(config) {
      var _this;
      _classCallCheck(this, FullScreen);
      config = config || {};
      config.tip = config.tip || 'Alternar Tela Cheia';
      config.class = 'map-app-blank-control';
      _this = _callSuper(this, FullScreen, [config]);
      _this._fsControl = null;
      return _this;
    }
    _inherits(FullScreen, _GeoButton);
    return _createClass(FullScreen, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this._fsControl = new ol.control.FullScreen({
          source: this.map.target
        });
        this._fsControl.element.classList.remove('ol-control');
        this.on('ready', function () {
          _this2._fsControl.setTarget(_this2.element);
          _this2.map.ol.addControl(_this2._fsControl);
        });
      }
    }, {
      key: "click",
      value: function click() {
        var zoom = this.map.ol.getView().getZoom() - 1;
        this.map.ol.getView().setZoom(zoom);
      }
    }]);
  }(GeoButton);

  var ListMenu = /*#__PURE__*/function (_GeoWidget) {
    function ListMenu(config) {
      var _this;
      _classCallCheck(this, ListMenu);
      config = config || {};
      config.tip = config.tip || 'ListMenu';
      config.title = config.title || 'Lista de camadas';
      config.class = config.class || 'map-app-menu-control';
      config.docked = config.docked || true;
      config.dockPosition = 'left';
      config.untitled = true;
      _this = _callSuper(this, ListMenu, [config]);
      _this._itens = [];
      _this._listElement = null;
      _this.ui = _this._buildUi();
      _this.on('ready', function () {
        _this._registerExternalFunction();
      });
      return _this;
    }
    _inherits(ListMenu, _GeoWidget);
    return _createClass(ListMenu, [{
      key: "initialize",
      value: function initialize() {

        //this.ui = this._buildUi();
      }
    }, {
      key: "_buildUi",
      value: function _buildUi() {
        this._listElement = document.createElement('ul');
        this._listElement.className = 'list-group w-100';
        this._listElement.style.cursor = 'pointer';
        return this._listElement;
      }
    }, {
      key: "addItem",
      value: function addItem(item) {
        var _this2 = this;
        var itemElement = document.createElement('li');
        itemElement.className = 'list-group-item';
        itemElement.innerHTML = item.text;
        this._listElement.appendChild(itemElement);
        this._itens.push(itemElement);

        //Default Event
        itemElement.addEventListener('click', function () {
          _this2.deactivate();
        });

        //Handler Event
        itemElement.addEventListener('click', item.handler);
      }
    }, {
      key: "_registerExternalFunction",
      value: function _registerExternalFunction() {
        var _this3 = this;
        this.map.getListMenu = function () {
          return _this3;
        };
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
      }
    }]);
  }(GeoWidget);

  var LandView = /*#__PURE__*/function (_GeoTool) {
    function LandView(config) {
      var _this;
      _classCallCheck(this, LandView);
      config = config || {};
      config.tip = config.tip || 'Mapeamento 360';
      config.title = config.title || 'Mapeamento 360 - LandView';
      config.class = config.class || 'map-app-landview-control';
      config.dockable = false;
      _this = _callSuper(this, LandView, [config]);
      _this.LANDRUNNER_SPHERE_RADIUS = 20.0;
      _this._months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      _this._provider = null;
      _this._panorama = null;
      _this._isLoadingPanorama = false;
      _this._currentPhoto = null;
      _this._triangleVectorLayer = null;
      _this._currentMapProjection = null;
      _this._mapContainer = null;
      _this._landViewContainer = null;
      _this._landViewDate = null;
      return _this;
    }
    _inherits(LandView, _GeoTool);
    return _createClass(LandView, [{
      key: "_builUi",
      value: function _builUi() {
        var _this2 = this;
        this._mapContainer = document.createElement('div');
        this._mapContainer.id = 'map-app-lv-view-map' + this.id;
        this._mapContainer.className = 'map-app-lv-view';
        this.map.mapElement.appendChild(this._mapContainer);
        this._changeButtom = document.createElement('div');
        this._changeButtom.className = 'map-app-lv-change';
        this._mapContainer.appendChild(this._changeButtom);
        this._changeButtomTip = document.createElement('div');
        this._changeButtomTip.className = 'map-app-lv-change-tip';
        this._changeButtomTip.innerHTML = 'Trocar Posição';
        this._mapContainer.appendChild(this._changeButtomTip);
        this._landViewContainer = document.createElement('div');
        this._landViewContainer.id = 'map-app-lv-view' + this.id;
        this._landViewContainer.style.width = '100%';
        this._landViewContainer.style.height = '100%';
        this._landViewContainer.style.display = 'absolute';
        this._landViewDate = document.createElement('div');
        this._landViewDate.className = 'map-app-lv-date';
        this.map.mapElement.appendChild(this._landViewDate);
        this._changeButtom.addEventListener('mouseover', function () {
          _this2._changeButtomTip.style.display = 'block';
        });
        this._changeButtom.addEventListener('mouseout', function () {
          _this2._changeButtomTip.style.display = 'none';
        });
        this._changeButtom.addEventListener('click', function () {
          _this2._changePosition();
        });
      }
    }, {
      key: "_checkIntegrity",
      value: function _checkIntegrity() {
        if (!this.config.provider) {
          throw 'Set a provider property for the Landview Control';
        }
        if (!this.config.tileServer) {
          throw 'Set a tileServer property for the Landview Control';
        }
        if (!this.config.defaultCoordinates) {
          throw 'Set a defaultCoordinates property for the Landview Control';
        }
        if (!this.config.triangleSymbology) {
          throw 'Set a triangleSymbology property for the Landview Control';
        }
      }
    }, {
      key: "initialize",
      value: function initialize() {
        this._checkIntegrity();
        this._builUi();

        // sistema de projeção do mapa
        this._currentMapProjection = this.map.ol.getView().getProjection().getCode();

        // layer para desenho do triângulo
        this._triangleVectorLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: this.config.triangleSymbology.polygonStyle.fill
            }),
            stroke: new ol.style.Stroke({
              color: this.config.triangleSymbology.polygonStyle.stroke,
              width: this.config.triangleSymbology.polygonStyle.strokeWidth
            }),
            image: new ol.style.Circle({
              radius: this.config.triangleSymbology.pointStyle.pointRadius,
              fill: new ol.style.Fill({
                color: this.config.triangleSymbology.pointStyle.color
              })
            })
          })
        });
        this._triangleVectorLayer.setZIndex(999);
        this.map.ol.addLayer(this._triangleVectorLayer);
        this._initLandViewProvider();
      }
    }, {
      key: "activate",
      value: function activate() {
        var _this3 = this;
        _get(_getPrototypeOf(LandView.prototype), "activate", this).call(this);
        if (this.config.defaultCoordinates && this.config.goToDefaultCoordinates) {
          var mapView = this.map.ol.getView();
          mapView.setCenter(ol.proj.transform([this.config.defaultCoordinates.lon, this.config.defaultCoordinates.lat], 'EPSG:4326', mapView.getProjection()));
          mapView.setZoom(this.config.goToZoomLevel || 18);
        }
        this._registerEvents();
        this._mapContainer.style.display = 'block';
        this._landViewDate.style.display = 'block';
        this.map.ol.setTarget(this._mapContainer);
        this._isMiniMap = true;
        this.map.mapElement.appendChild(this._landViewContainer);
        var self = this;
        this._panorama = new LandViewJS.LandViewPanorama(this._landViewContainer.id, this.config.tileServer.url, self._provider, function (e) {
          self._onPovChanged(e);
        }, function (e) {
          self._onLoadPanorama(e);
        });
        this._setDefaultPanorama();

        //this.map.closeAllTools();
        this.on('activate', function () {
          _this3.map.hideDisabledControls();
        });
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this._unregisterEvents();
        this._triangleVectorLayer.getSource().clear();
        this.map.ol.setTarget(this.map.mapElement);
        this._mapContainer.style.display = 'none';
        this._landViewDate.style.display = 'none';
        this._mapContainer.innerHTML = '';
        this._landViewContainer.innerHTML = '';
        this._mapContainer.appendChild(this._changeButtom);
        this._mapContainer.appendChild(this._changeButtomTip);
        this.map.mapElement.removeChild(this._landViewContainer);
        this.map.showDisabledControls();
        _get(_getPrototypeOf(LandView.prototype), "deactivate", this).call(this);
      }
    }, {
      key: "_changePosition",
      value: function _changePosition() {
        var self = this;
        if (this._isMiniMap) {
          this._landViewContainer.innerHTML = '';
          this.map.ol.setTarget(this._landViewContainer);
          this._landViewContainer.style.cursor = 'crosshair';
          this._panorama = new LandViewJS.LandViewPanorama(this._mapContainer.id, this.config.tileServer.url, self._provider, function (e) {
            self._onPovChanged(e);
          }, function (e) {
            self._onLoadPanorama(e);
          });
          this._mapContainer.style.cursor = 'auto';
          this._isMiniMap = false;
        } else {
          this._mapContainer.innerHTML = '';
          this.map.ol.setTarget(this._mapContainer);
          this._mapContainer.style.cursor = 'crosshair';
          this._mapContainer.appendChild(this._changeButtom);
          this._mapContainer.appendChild(this._changeButtomTip);
          this._panorama = new LandViewJS.LandViewPanorama(this._landViewContainer.id, this.config.tileServer.url, self._provider, function (e) {
            self._onPovChanged(e);
          }, function (e) {
            self._onLoadPanorama(e);
          });
          this._landViewContainer.style.cursor = 'auto';
          this._isMiniMap = true;
        }
        var coord = ol.proj.transform(this.map.ol.getView().getCenter(), this.map.ol.getView().getProjection(), 'EPSG:4326');
        var pt = new LandViewJS.LandViewLatLng(coord[1], coord[0]);
        this._panorama.getPanoramaByLocation(pt, function (e) {
          self._onLoadPanorama(e);
        }, function (e) {
          self._onErrorLoadingPanorama(e);
        });
      }
    }, {
      key: "_initLandViewProvider",
      value: function _initLandViewProvider() {
        if (this.config.provider.type === 'ArcGISServer') {
          this._provider = new LandViewJS.LandViewPanoramaArcGISServerProvider({
            url: this.config.provider.url,
            searchRadiusMeters: this.config.provider.searchRadiusMeters
          });
        } else {
          this._provider = new LandViewJS.LandViewPanoramaWFSProvider({
            url: this.config.provider.url,
            typeName: this.config.provider.typeName,
            serverType: this.config.provider.serverType,
            geojsonOutputFormat: this.config.provider.geojsonOutputFormat,
            geometryFieldName: this.config.provider.geometryFieldName,
            searchRadiusMeters: this.config.provider.searchRadiusMeters,
            useJSONP: this.config.provider.useJSONP
          });
        }
      }

      // Define o panorama padrão a ser carregado
    }, {
      key: "_setDefaultPanorama",
      value: function _setDefaultPanorama() {
        var self = this;
        if (self._panorama && this.config.defaultCoordinates) {
          var pt = new LandViewJS.LandViewLatLng(this.config.defaultCoordinates.lat, this.config.defaultCoordinates.lon);
          self._panorama.getPanoramaByLocation(pt, function (e) {
            self._onLoadPanorama(e);
          }, function (e) {
            self._onErrorLoadingPanorama(e);
          });
        }
      }

      // Evento chamado quando um novo panorama é carregado
    }, {
      key: "_onLoadPanorama",
      value: function _onLoadPanorama(photo) {
        this._isLoadingPanorama = false;
        this._currentPhoto = photo;

        // data de captura da foto
        var panoDateTaken = this._currentPhoto.getDateOfPictureTaken();
        this._landViewDate.innerHTML = 'Data de Captura: ' + parseInt(panoDateTaken.getDate()) + ' ' + this._months[panoDateTaken.getMonth()] + ' ' + parseInt(panoDateTaken.getFullYear());
        this._onPovChanged(new LandViewJS.LandViewPovChangedEventArgs(this._panorama.getPov()));
      }

      // Erro ao carregar um panorama
    }, {
      key: "_onErrorLoadingPanorama",
      value: function _onErrorLoadingPanorama() {
        this._isLoadingPanorama = false;
      }

      // Mudança no Point of View do panorama
    }, {
      key: "_onPovChanged",
      value: function _onPovChanged() {
        var pov = this._panorama.getPov();
        var fovDiv2 = THREE.Math.degToRad(pov.getFieldOfView() / 2.0);
        var dx = this.LANDRUNNER_SPHERE_RADIUS * Math.cos(fovDiv2);
        var dy = this.LANDRUNNER_SPHERE_RADIUS * Math.sin(fovDiv2);
        var photoAngleRadians = THREE.Math.degToRad(this._currentPhoto.getAngle());
        var headingRadians = THREE.Math.degToRad(pov.getHeading());

        // criação dos 3 pontos do triângulo (são calculadas em Web Mercator)

        var p1 = LandViewJS.LandViewWebMercatorUtils.geographicToWebMercator(this._currentPhoto.getPosition());
        var p2 = new LandViewJS.LandViewXY();
        p2.x = p1.x + dx;
        p2.y = p1.y + dy;
        var p3 = new LandViewJS.LandViewXY();
        p3.x = p1.x + dx;
        p3.y = p1.y - dy;
        p2.x = p2.x - p1.x;
        p2.y = p2.y - p1.y;
        p3.x = p3.x - p1.x;
        p3.y = p3.y - p1.y;
        p2 = this._rigidBodyTransform(p2, photoAngleRadians);
        p3 = this._rigidBodyTransform(p3, photoAngleRadians);
        p2 = this._rigidBodyTransform(p2, -headingRadians);
        p3 = this._rigidBodyTransform(p3, -headingRadians);
        p2.x = p2.x + p1.x;
        p2.y = p2.y + p1.y;
        p3.x = p3.x + p1.x;
        p3.y = p3.y + p1.y;

        // transforma para o sistema de coordenadas do mapa
        p1 = this._webMercatorToMapProjection(p1);
        p2 = this._webMercatorToMapProjection(p2);
        p3 = this._webMercatorToMapProjection(p3);
        var polygon = new ol.geom.Polygon([[p1.getCoordinates(), p2.getCoordinates(), p3.getCoordinates()]]);

        // features      
        var trianglePointFeature = new ol.Feature({
          name: 'Point',
          geometry: p1
        });
        var triangleFeature = new ol.Feature({
          name: 'Triangle',
          geometry: polygon
        });
        this._triangleVectorLayer.getSource().clear();
        this._triangleVectorLayer.getSource().addFeatures([trianglePointFeature, triangleFeature]);
        this.map.ol.getView().setCenter(p1.getCoordinates());
      }

      // Transformação de corpo rígido
    }, {
      key: "_rigidBodyTransform",
      value: function _rigidBodyTransform(coordinates, angleRadians) {
        var newCoordinates = new LandViewJS.LandViewXY();
        var sina = Math.sin(angleRadians);
        var cosa = Math.cos(angleRadians);
        newCoordinates.x = coordinates.x * cosa - coordinates.y * sina;
        newCoordinates.y = coordinates.x * sina + coordinates.y * cosa;
        return newCoordinates;
      }

      // Transforma as coordenadas de Web Mercator (LandViewXY) para a projeção atual do mapa (OpenLayers.Geometry.Point)
    }, {
      key: "_webMercatorToMapProjection",
      value: function _webMercatorToMapProjection(pt) {
        if (this._currentMapProjection == 'EPSG:3857') {
          return new ol.geom.Point([pt.x, pt.y]);
        } else {
          var mapPoint = new ol.geom.Point([pt.x, pt.y]);
          return mapPoint.transform('EPSG:3857', this._currentMapProjection);
        }
      }
    }, {
      key: "_onMapClick",
      value: function _onMapClick(e) {
        var self = this;
        if (!this._isLoadingPanorama) {
          // transforma coordenada do mapa para WGS-84
          var coordinate = ol.proj.transform(e.coordinate, e.target.getView().getProjection(), 'EPSG:4326');

          // busca pelo panorama
          var pt = new LandViewJS.LandViewLatLng(coordinate[1], coordinate[0]);
          self._panorama.getPanoramaByLocation(pt, function (e) {
            self._onLoadPanorama(e);
          }, function (e) {
            self._onErrorLoadingPanorama(e);
          });
        }
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var self = this;
        self.map.ol.on('click', function (e) {
          self._onMapClick(e);
        });
      }
    }, {
      key: "_unregisterEvents",
      value: function _unregisterEvents() {
        var self = this;
        self.map.ol.un('click', function (e) {
          self._onMapClick(e);
        });
      }
    }]);
  }(GeoTool);

  var Geobuilder3D = /*#__PURE__*/function (_GeoTool) {
    function Geobuilder3D(config) {
      var _this;
      _classCallCheck(this, Geobuilder3D);
      config = config || {};
      config.tip = config.tip || 'Visualização 3D';
      _this = _callSuper(this, Geobuilder3D, [config]);
      _this._ol3d = null;
      return _this;
    }
    _inherits(Geobuilder3D, _GeoTool);
    return _createClass(Geobuilder3D, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYjhkNmRhMi1jZjc2LTQyMTgtYmIzNS1mYmU3ZmM4YWU0M2MiLCJpZCI6NjI5MCwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0NTg0NzI4N30.Vh6gppTA4Jrl_ZFeRbZvGYUTrxV-0R4O02RZH4Jg9F4';
        this._ol3d = new olcs.OLCesium({
          map: this.map.ol
        });
        this.map.on('draw', function () {
          _this2._drawLayers();
        });
        this.map.on('removeLayers', function () {
          _this2._removeLayers();
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        _get(_getPrototypeOf(Geobuilder3D.prototype), "activate", this).call(this);
        this.enable3D();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.disable3D();
        _get(_getPrototypeOf(Geobuilder3D.prototype), "deactivate", this).call(this);
      }
    }, {
      key: "enable3D",
      value: function enable3D() {
        this._ol3d.setEnabled(true);
        this._drawLayers();
        document.getElementsByClassName('cesium-credit-logoContainer')[0].style.display = 'none';
        this._is3dEnabled = true;
      }
    }, {
      key: "disable3D",
      value: function disable3D() {
        this._ol3d.setEnabled(false);
        this.map.ol.getView().setRotation(0);
        this._ol3d = null;
      }
    }, {
      key: "_drawLayers",
      value: function _drawLayers() {
        for (var i = 0; i < this.map.content.length; i++) {
          var content = this.map.content[i];
          if (content.display && content.type === 'ion') {
            for (var j = 0; j < content.layers.length; j++) {
              var confLayer = content.layers[j];
              if (confLayer.display && confLayer.type.toLowerCase() === 'terrain') {
                this._ol3d.getCesiumScene().terrainProvider = new Cesium.CesiumTerrainProvider({
                  url: Cesium.IonResource.fromAssetId(confLayer.id)
                });
              } else if (confLayer.display && confLayer.type.toLowerCase() === '3dtile') {
                confLayer.csLayer = new Cesium.Cesium3DTileset({
                  url: Cesium.IonResource.fromAssetId(confLayer.id)
                });
                this._ol3d.getCesiumScene().primitives.add(confLayer.csLayer);
                confLayer.csLayer.style = new Cesium.Cesium3DTileStyle({
                  pointSize: '4.0'
                });
              }
            }
          } else if (content.type === 'ogc' && content.defaultService === 'wfs' && content.serviceParameters.extrudField) {
            for (var _j = 0; _j < content.layers.length; _j++) {
              var _confLayer = content.layers[_j];
              if (_confLayer.display) {
                var url = this.map.content[i].layers[_j].olLayer.getSource().getUrl();
                url = url.replace('3857', '4326');
                this._drawJson(url, content.serviceParameters.extrudField);
              }
            }
          }
        }
      }
    }, {
      key: "_drawJson",
      value: function _drawJson(url, extrudField) {
        var self = this;
        var promise = Cesium.GeoJsonDataSource.load(url);
        promise.then(function (dataSource) {
          self._ol3d.getDataSources().add(dataSource);
          var entities = dataSource.entities.values;
          for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            entity.polygon.extrudedHeight = entity.properties[extrudField];
          }
        }).otherwise(function (error) {
          self.map.notify(error);
        });
      }
    }, {
      key: "_removeLayers",
      value: function _removeLayers() {
        for (var i = 0; i < this.map.content.length; i++) {
          var content = this.map.content[i];
          if (content.type === 'ion') {
            for (var j = 0; j < content.layers.length; j++) {
              var confLayer = content.layers[j];
              if (confLayer.type.toLowerCase() === 'terrain') {
                this._ol3d.getCesiumScene().terrainProvider = new Cesium.EllipsoidTerrainProvider({});
              } else if (confLayer.type.toLowerCase() === '3dtile') {
                this._ol3d.getCesiumScene().primitives.remove(confLayer.csLayer);
              }
            }
          }
        }
      }
    }]);
  }(GeoTool);

  var Undo = /*#__PURE__*/function (_GeoButton) {
    function Undo(config) {
      _classCallCheck(this, Undo);
      config = config || {};
      config.tip = config.tip || 'Voltar posição';
      config.class = config.class || 'map-app-undo-control';
      return _callSuper(this, Undo, [config]);
    }
    _inherits(Undo, _GeoButton);
    return _createClass(Undo, [{
      key: "initialize",
      value: function initialize() {
        this._registerEvents();
      }
    }, {
      key: "click",
      value: function click() {
        this._undoMapState();
      }
    }, {
      key: "_undoMapState",
      value: function _undoMapState() {
        var localStateHistoryUndo = JSON.parse(localStorage.getItem('stateHistory'));
        var localStateHistoryRedo = JSON.parse(localStorage.getItem('stateHistoryRedo'));
        var stateHistoryRedo = [];
        if (localStateHistoryUndo) {
          if (localStateHistoryRedo) {
            Array.prototype.push.apply(stateHistoryRedo, localStateHistoryRedo);
          }
          stateHistoryRedo.push(localStateHistoryUndo[localStateHistoryUndo.length - 1]);
          if (stateHistoryRedo.length > 20) {
            stateHistoryRedo.shift();
          }
          localStateHistoryUndo.pop();
          if (localStateHistoryUndo.length < 1) {
            return;
          }
          var lastState = localStateHistoryUndo[localStateHistoryUndo.length - 1];
          this.map.ol.getView().animate({
            center: lastState.center,
            zoom: lastState.zoom,
            duration: 300
          });
          localStateHistoryUndo.pop();
          localStorage.setItem('stateHistory', JSON.stringify(localStateHistoryUndo));
          localStorage.setItem('stateHistoryRedo', JSON.stringify(stateHistoryRedo));
        }
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var self = this;
        window.addEventListener('keyup', function (e) {
          if (e.ctrlKey && e.which == 90) {
            self._undoMapState();
          }
        });
      }
    }]);
  }(GeoButton);

  var Redo = /*#__PURE__*/function (_GeoButton) {
    function Redo(config) {
      _classCallCheck(this, Redo);
      config = config || {};
      config.tip = config.tip || 'Avançar posição';
      config.class = config.class || 'map-app-redo-control';
      return _callSuper(this, Redo, [config]);
    }
    _inherits(Redo, _GeoButton);
    return _createClass(Redo, [{
      key: "initialize",
      value: function initialize() {
        this._registerEvents();
      }
    }, {
      key: "click",
      value: function click() {
        this._redoMapState();
      }
    }, {
      key: "_redoMapState",
      value: function _redoMapState() {
        var localStateHistoryUndo = JSON.parse(localStorage.getItem('stateHistory'));
        var localStateHistoryRedo = JSON.parse(localStorage.getItem('stateHistoryRedo'));
        var stateHistoryUndo = [];
        if (localStateHistoryRedo) {
          if (localStateHistoryUndo) {
            Array.prototype.push.apply(stateHistoryUndo, localStateHistoryUndo);
          }
          stateHistoryUndo.push(localStateHistoryRedo[localStateHistoryRedo.length - 1]);
          if (localStateHistoryRedo.length < 1) {
            return;
          }
          var lastState = localStateHistoryRedo[localStateHistoryRedo.length - 1];
          this.map.ol.getView().animate({
            center: lastState.center,
            zoom: lastState.zoom,
            duration: 300
          });
          localStateHistoryRedo.pop();
          localStorage.setItem('stateHistory', JSON.stringify(localStateHistoryUndo));
          localStorage.setItem('stateHistoryRedo', JSON.stringify(localStateHistoryRedo));
        }
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var self = this;
        window.addEventListener('keyup', function (e) {
          if (e.ctrlKey && e.which == 89) {
            self._redoMapState();
          }
        });
      }
    }]);
  }(GeoButton);

  var Heatmap = /*#__PURE__*/function (_GeoWidget) {
    function Heatmap(config) {
      var _this;
      _classCallCheck(this, Heatmap);
      config = config || {};
      config.tip = config.tip || 'Mapa de Calor';
      config.title = config.title || 'Mapa de Calor';
      config.class = config.class || 'map-app-heatmap-control';
      _this = _callSuper(this, Heatmap, [config]);
      _this._radiusInptElement = null;
      _this._blurInptElement = null;
      _this._layersSlctElement = null;
      _this._componentSlctElement = null;
      _this._btnElement = null;
      _this._maxInptElement = null;
      _this._vector = null;
      _this.ui = _this.builUi();
      return _this;
    }
    _inherits(Heatmap, _GeoWidget);
    return _createClass(Heatmap, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._getLayersOgc();
          _this2._registerEvents();
        });
      }
    }, {
      key: "builUi",
      value: function builUi() {
        var heatmapElement = document.createElement('div');
        heatmapElement.className = 'map-app-measure-content';
        heatmapElement.classList.add('w-100');
        var inputsContainer = document.createElement('div');
        inputsContainer.classList.add('d-flex');
        inputsContainer.classList.add('justify-content-center');
        inputsContainer.classList.add('align-items-center');
        inputsContainer.classList.add('mt-2');
        var formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        var labelRadius = document.createElement('label');
        labelRadius.textContent = 'Tamanho do Raio';
        this._radiusInptElement = document.createElement('input');
        this._radiusInptElement.setAttribute('type', 'range');
        this._radiusInptElement.setAttribute('min', '1');
        this._radiusInptElement.setAttribute('max', '50');
        this._radiusInptElement.setAttribute('step', '1');
        this._radiusInptElement.setAttribute('value', '5');
        this._radiusInptElement.className = 'custom-range';

        //////////////
        var labelMaxFeatures = document.createElement('label');
        labelMaxFeatures.textContent = 'Máximo de Feições';
        this._maxInptElement = document.createElement('input');
        this._maxInptElement.setAttribute('type', 'number');
        this._maxInptElement.setAttribute('min', '1');
        this._maxInptElement.setAttribute('value', '5000');
        this._maxInptElement.className = 'form-control';
        //////////////

        var labelLayers = document.createElement('label');
        labelLayers.textContent = 'Camadas';
        this._layersSlctElement = document.createElement('select');
        this._layersSlctElement.classList = 'form-control';
        this._layersSlctElement.classList.add('mb-2');
        var labelFields = document.createElement('label');
        labelFields.textContent = 'Campos';
        this._componentSlctElement = document.createElement('select');
        this._componentSlctElement.classList = 'form-control';
        this._componentSlctElement.classList.add('mb-2');
        var labelBlur = document.createElement('label');
        labelBlur.textContent = 'Tamanho do Borrão';
        this._blurInptElement = document.createElement('input');
        this._blurInptElement.setAttribute('type', 'range');
        this._blurInptElement.setAttribute('min', '1');
        this._blurInptElement.setAttribute('max', '50');
        this._blurInptElement.setAttribute('step', '1');
        this._blurInptElement.setAttribute('value', '15');
        this._blurInptElement.className = 'custom-range';
        this._btnElement = document.createElement('button');
        this._btnElement.className = 'btn btn-dark btn-block';
        this._btnElement.classList.add('mt-4');
        this._btnElement.innerText = 'Gerar';
        formGroup.appendChild(labelLayers);
        formGroup.appendChild(this._layersSlctElement);
        formGroup.appendChild(labelFields);
        formGroup.appendChild(this._componentSlctElement);
        formGroup.appendChild(labelMaxFeatures);
        formGroup.appendChild(this._maxInptElement);
        formGroup.appendChild(labelBlur);
        formGroup.appendChild(this._blurInptElement);
        formGroup.appendChild(labelRadius);
        formGroup.appendChild(this._radiusInptElement);
        formGroup.appendChild(this._btnElement);
        inputsContainer.appendChild(formGroup);
        heatmapElement.appendChild(inputsContainer);
        return heatmapElement;
      }
    }, {
      key: "_getLayersOgc",
      value: function _getLayersOgc() {
        for (var i = 0; i < this.map.content.length; i++) {
          if (this.map.content[i].type == 'ogc') {
            for (var j = 0; j < this.map.content[i].layers.length; j++) {
              var option = document.createElement('option');
              option.setAttribute('i', i);
              option.setAttribute('j', j);
              option.text = this.map.content[i].name + ': ' + this.map.content[i].layers[j].name;
              this._layersSlctElement.add(option);
            }
          }
        }
      }
    }, {
      key: "_initLayers",
      value: function _initLayers() {
        var selectedLayer = this._layersSlctElement.options[this._layersSlctElement.selectedIndex];
        var selectedField = this._componentSlctElement.options[this._componentSlctElement.selectedIndex];
        var i = selectedLayer.getAttribute('i');
        var j = selectedLayer.getAttribute('j');
        if (this._vector) {
          this.map.ol.removeLayer(this._vector);
          this._vector = null;
        }
        this._vector = new ol.layer.Heatmap({
          source: new ol.source.Vector({
            url: this.map.content[i].source + '/ows?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=' + this._maxInptElement.value + '&typeName=' + this.map.content[i].workspace + ':' + this.map.content[i].layers[j].layer + '&outputFormat=application%2Fjson&srsName=EPSG:900913',
            format: new ol.format.GeoJSON()
          }),
          blur: parseInt(this._blurInptElement.value, 10),
          radius: parseInt(this._radiusInptElement.value, 10)
        });
        this._vector.setZIndex(99999);
        this.map.ol.addLayer(this._vector);
        if (selectedField != undefined) {
          this._vector.getSource().on('addfeature', function (event) {
            event.feature.set('weight', event.feature.get(selectedField.value));
          });
        }
      }
    }, {
      key: "_getFields",
      value: function _getFields() {
        var self = this;
        var selectedLayer = this._layersSlctElement.options[this._layersSlctElement.selectedIndex];
        var i = selectedLayer.getAttribute('i');
        var j = selectedLayer.getAttribute('j');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.map.content[i].source + '/wfs?request=describeFeatureType&typename=' + this.map.content[i].workspace + ':' + this.map.content[i].layers[j].layer + '&outputFormat=application%2Fjson');
        xhr.onload = function () {
          if (xhr.status === 200) {
            self._writeFields(JSON.parse(xhr.responseText));
          } else {
            self.map.notify('Não foi possível obter a lista dos campos');
            self.deactivate();
          }
        };
        xhr.send();
      }
    }, {
      key: "_writeFields",
      value: function _writeFields(fields) {
        this._componentSlctElement.innerHTML = '';
        for (var i = 0; i < fields.featureTypes[0].properties.length; i++) {
          var option = document.createElement('option');
          option.setAttribute('i', i);
          option.text = fields.featureTypes[0].properties[i].name;
          this._componentSlctElement.add(option);
        }
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this._blurInptElement.addEventListener('input', function () {
          if (_this3._vector) {
            _this3._vector.setBlur(parseInt(_this3._blurInptElement.value, 10));
          }
        });
        this._layersSlctElement.addEventListener('change', function () {
          _this3._getFields();
        });
        this._radiusInptElement.addEventListener('input', function () {
          if (_this3._vector) {
            _this3._vector.setRadius(parseInt(_this3._radiusInptElement.value, 10));
          }
        });
        this._btnElement.addEventListener('click', function () {
          _this3._initLayers();
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
        this._getFields();
        this._initLayers();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.map.ol.removeLayer(this._vector);
        this._vector = null;
        this.hide();
      }
    }]);
  }(GeoWidget);

  var Transparency = /*#__PURE__*/function (_GeoWidget) {
    function Transparency(config) {
      var _this;
      _classCallCheck(this, Transparency);
      config = config || {};
      config.tip = config.tip || 'Controle de Transparência';
      config.title = config.title || 'Controle de Transparência';
      config.class = config.class || 'map-app-transp-control';
      config.docked = config.docked || false;
      config.minWidth = config.minWidth || '300';
      config.minHeight = config.minHeight || '400';
      config.maxWidth = config.maxWidth || '400';
      config.maxHeight = config.maxHeight || '600';
      _this = _callSuper(this, Transparency, [config]);
      _this._layersSelectElm = null;
      _this._sliderElm = null;
      _this._valueElm = null;
      _this._minElm = null;
      _this._maxElm = null;
      _this.ui = _this._builUi();
      return _this;
    }
    _inherits(Transparency, _GeoWidget);
    return _createClass(Transparency, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._getElements();
          _this2._registerEvents();
        });
      }
    }, {
      key: "_builUi",
      value: function _builUi() {
        return "\n        <div class=\"p-3\">\n            <div class=\"form-group\">\n                <label>Camada</label>\n                <select class=\"form-control\" id=\"map-app-t".concat(this.id, "-camada\"></select>\n            </div>\n            <div class=\"form-group\">\n                <label>Transpar\xEAncia</label>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <input type='range' min='0' max='100' value='0' class='map-app-form-control' id='map-app-t").concat(this.id, "-slider'>\n                    </div>\n                    <div class=\"col\">\n                        <input type='number' min='0' max='100' value='0' class='form-control' id='map-app-t").concat(this.id, "-valor'>\n                    </div>\n                </div>\n\n                <div class=\"row pt-3\">\n                    <div class=\"col\">\n                        <a class=\"btn btn-dark btn-block\" href=\"#\" role=\"button\" id='map-app-t").concat(this.id, "-min'>Transparente</a>\n                    </div>\n                    <div class=\"col\">\n                        <a class=\"btn btn-dark btn-block\" href=\"#\" role=\"button\"  id='map-app-t").concat(this.id, "-max'>Opaco</a>\n                    </div>\n                </div>\n            </div>\n        </div>");
      }
    }, {
      key: "_getElements",
      value: function _getElements() {
        this._layersSelectElm = document.getElementById("map-app-t".concat(this.id, "-camada"));
        this._sliderElm = document.getElementById("map-app-t".concat(this.id, "-slider"));
        this._valueElm = document.getElementById("map-app-t".concat(this.id, "-valor"));
        this._minElm = document.getElementById("map-app-t".concat(this.id, "-min"));
        this._maxElm = document.getElementById("map-app-t".concat(this.id, "-max"));
      }
    }, {
      key: "_listLayers",
      value: function _listLayers() {
        this._layersSelectElm.innerHTML = '';
        for (var i = 0; i < this.map.content.length; i++) {
          if (this.map.content[i].olLayer) {
            this._layersSelectElm.innerHTML += "<option group=\"".concat(i, "\">").concat(this.map.content[i].name, "</option>");
          } else {
            for (var j = 0; j < this.map.content[i].layers.length; j++) {
              if (this.map.content[i].layers[j].olLayer) {
                this._layersSelectElm.innerHTML += "<option group=\"".concat(i, "\" layer=\"").concat(j, "\">").concat(this.map.content[i].layers[j].name, "</option>");
              }
            }
          }
        }
      }
    }, {
      key: "_getOlLayer",
      value: function _getOlLayer() {
        var group = this._layersSelectElm.selectedOptions[0].getAttribute('group');
        var layer = this._layersSelectElm.selectedOptions[0].getAttribute('layer');
        if (group && layer) {
          this._curruentOlLayer = this.map.content[group].layers[layer].olLayer;
        } else {
          this._curruentOlLayer = this.map.content[group].olLayer;
        }
      }
    }, {
      key: "_setTransparency",
      value: function _setTransparency() {
        var val = parseInt(this._sliderElm.value);
        var opacity = 1 - val / 100;
        this._getOlLayer();
        this._curruentOlLayer.setOpacity(opacity);
      }
    }, {
      key: "_getTransparency",
      value: function _getTransparency() {
        this._getOlLayer();
        var opacity = this._curruentOlLayer.getOpacity();
        var transp = parseInt((1 - opacity) * 100);
        this._sliderElm.value = transp;
        this._valueElm.value = transp;
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this._layersSelectElm.addEventListener('change', function () {
          _this3._getTransparency();
        });
        this._sliderElm.addEventListener('change', function () {
          _this3._valueElm.value = _this3._sliderElm.value;
          _this3._setTransparency();
        });
        this._valueElm.addEventListener('change', function () {
          if (_this3._valueElm.value < 0) {
            _this3._valueElm.value = 0;
          } else if (_this3._valueElm.value > 100) {
            _this3._valueElm.value = 100;
          }
          _this3._sliderElm.value = _this3._valueElm.value;
          _this3._setTransparency();
        });
        this._minElm.addEventListener('click', function () {
          _this3._valueElm.value = 100;
          _this3._sliderElm.value = 100;
          _this3._setTransparency();
        });
        this._maxElm.addEventListener('click', function () {
          _this3._valueElm.value = 0;
          _this3._sliderElm.value = 0;
          _this3._setTransparency();
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        _get(_getPrototypeOf(Transparency.prototype), "activate", this).call(this);
        this._listLayers();
        this._getTransparency();
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
        _get(_getPrototypeOf(Transparency.prototype), "deactivate", this).call(this);
      }
    }]);
  }(GeoWidget);

  var StyleEditor = /*#__PURE__*/function (_GeoWidget) {
    function StyleEditor(config) {
      var _this;
      _classCallCheck(this, StyleEditor);
      config = config || {};
      config.tip = config.tip || 'StyleEditor';
      config.title = config.title || 'Lista de camadas';
      config.class = config.class || 'map-app-menu-control';
      config.docked = config.docked || true;
      config.hasUI = false;
      config.untitled = true;
      _this = _callSuper(this, StyleEditor, [config]);
      _this._layersListGroup = null;
      _this._fillPickr = null;
      _this._strokePickr = null;
      _this._strokeWidth = null;
      _this._pointStrokeWidth = null;
      _this._pointRadius = null;
      _this._layerItem = null;
      _this._layerOpacity = null;
      _this._pointGroup = null;
      _this._fillGroup = null;
      _this._strokeGroup = null;
      _this._hasUI = false;
      _this.on('ready', function () {
        _this._getLayers();
        _this._initColorPicker();
        _this._initLayerProps();
        _this._handleInterface();
        _this._registerEvents();
      });
      return _this;
    }
    _inherits(StyleEditor, _GeoWidget);
    return _createClass(StyleEditor, [{
      key: "initialize",
      value: function initialize() {
        this._showInterface();
      }
    }, {
      key: "_buildUIPoint",
      value: function _buildUIPoint() {
        this._groupCircle = document.createElement('div');
        this._groupImage = document.createElement('div');

        //Row10
        var rowStyleType = document.createElement('div');
        rowStyleType.classList.add('map-app-prop-row');
        var estilo = document.createElement('span');
        estilo.textContent = 'Estilo Ponto:';
        estilo.classList.add('map-app-prop-name');
        var inputestilo = document.createElement('select');
        inputestilo.innerHTML += '<option value="circle">Círculo</option>';
        inputestilo.innerHTML += '<option value="image">Imagem</option>';
        inputestilo.classList.add('form-control');
        inputestilo.style.width = '148px';
        inputestilo.classList.add('map-app-input-custom');
        inputestilo.id = 'inputestilo';
        this._estiloPonto = inputestilo;
        rowStyleType.appendChild(estilo);
        rowStyleType.appendChild(inputestilo);

        //Row 
        var propRow4 = document.createElement('div');
        propRow4.classList.add('map-app-prop-row');
        var pointRadius = document.createElement('span');
        pointRadius.textContent = 'Raio do Ponto:';
        pointRadius.classList.add('map-app-prop-name');
        var inputRadius = document.createElement('input');
        inputRadius.setAttribute('type', 'number');
        inputRadius.setAttribute('min', '0');
        inputRadius.classList.add('form-control');
        inputRadius.classList.add('map-app-input-custom');
        inputRadius.style.width = '74px';
        inputRadius.id = 'inputRadius';
        this._pointRadius = inputRadius;
        propRow4.appendChild(pointRadius);
        propRow4.appendChild(inputRadius);

        //Row11
        var propRow11 = document.createElement('div');
        propRow11.classList.add('map-app-prop-row');
        var xAncor = document.createElement('span');
        xAncor.textContent = 'Âncora X:';
        xAncor.classList.add('map-app-prop-name');
        var inputxAncor = document.createElement('input');
        inputxAncor.setAttribute('type', 'number');
        inputxAncor.setAttribute('min', '0');
        inputxAncor.setAttribute('max', '100');
        inputxAncor.value = 0;
        inputxAncor.classList.add('form-control');
        inputxAncor.style.width = '74px';
        inputxAncor.classList.add('map-app-input-custom');
        inputxAncor.id = 'inputxAncor';
        this._xAncor = inputxAncor;
        propRow11.appendChild(xAncor);
        propRow11.appendChild(inputxAncor);

        //Row12
        var propRow12 = document.createElement('div');
        propRow12.classList.add('map-app-prop-row');
        var yAncor = document.createElement('span');
        yAncor.textContent = 'Âncora Y:';
        yAncor.classList.add('map-app-prop-name');
        var inputyAncor = document.createElement('input');
        inputyAncor.setAttribute('type', 'number');
        inputyAncor.setAttribute('min', '0');
        inputyAncor.setAttribute('max', '100');
        inputyAncor.value = 0;
        inputyAncor.classList.add('form-control');
        inputyAncor.style.width = '74px';
        inputyAncor.classList.add('map-app-input-custom');
        inputyAncor.id = 'inputyAncor';
        this._yAncor = inputyAncor;
        propRow12.appendChild(yAncor);
        propRow12.appendChild(inputyAncor);

        //Row13
        var propRow13 = document.createElement('div');
        propRow13.classList.add('map-app-prop-row');
        var path = document.createElement('span');
        path.textContent = 'Ícone:';
        path.classList.add('map-app-prop-name');
        var inputpath = document.createElement('input');
        inputpath.setAttribute('type', 'text');
        inputpath.classList.add('form-control');
        inputpath.style.width = '148px';
        inputpath.classList.add('map-app-input-custom');
        inputpath.id = 'inputpath';
        this._path = inputpath;
        propRow13.appendChild(path);
        propRow13.appendChild(inputpath);

        //Icones
        this._iconConteiner = document.createElement('div');
        this._iconConteiner.style.position = 'absolute';
        this._iconConteiner.style.top = '2%';
        this._iconConteiner.style.left = '35%';
        this._iconConteiner.style.width = '500px';
        this._iconConteiner.style.padding = '10px';
        //this._iconConteiner.style.height = '500px';
        this._iconConteiner.style.zIndex = '999999';
        this._iconConteiner.style.background = '#fff';
        this._iconConteiner.style.display = 'none';
        document.body.appendChild(this._iconConteiner);
        this._pointGroup.appendChild(rowStyleType);
        ///this._pointGroup.appendChild(iconConteiner);
        this._groupCircle.appendChild(propRow4);
        this._pointGroup.appendChild(this._groupCircle);
        this._groupImage.appendChild(propRow11);
        this._groupImage.appendChild(propRow12);
        this._groupImage.appendChild(propRow13);
        this._pointGroup.appendChild(this._groupImage);
        this._groupImage.style.display = 'none';
      }
    }, {
      key: "_buildUIFill",
      value: function _buildUIFill() {
        //Row 1

        var propRow = document.createElement('div');
        propRow.classList.add('map-app-prop-row');
        var fillColor = document.createElement('span');
        fillColor.textContent = 'Cor de Preenchimento:';
        fillColor.classList.add('map-app-prop-name');
        var colorSelector = document.createElement('div');
        colorSelector.id = 'colorPicker';
        propRow.appendChild(fillColor);
        propRow.appendChild(colorSelector);
        this._fillGroup.appendChild(propRow);
      }
    }, {
      key: "_buildUIStroke",
      value: function _buildUIStroke() {
        //Row 2

        var propRow2 = document.createElement('div');
        propRow2.classList.add('map-app-prop-row');
        var strokeColor = document.createElement('span');
        strokeColor.textContent = 'Cor da Linha:';
        strokeColor.classList.add('map-app-prop-name');
        var strokeSelector = document.createElement('div');
        strokeSelector.id = 'strokePicker';
        propRow2.appendChild(strokeColor);
        propRow2.appendChild(strokeSelector);

        //Row 3

        var propRow3 = document.createElement('div');
        propRow3.classList.add('map-app-prop-row');
        var strokeWidth = document.createElement('span');
        strokeWidth.textContent = 'Largura da Linha:';
        strokeWidth.classList.add('map-app-prop-name');
        var inputWidth = document.createElement('input');
        inputWidth.setAttribute('type', 'number');
        inputWidth.setAttribute('min', '0');
        inputWidth.classList.add('form-control');
        inputWidth.style.width = '74px';
        inputWidth.classList.add('map-app-input-custom');
        inputWidth.id = 'sinputWidth';
        this._strokeWidth = inputWidth;
        propRow3.appendChild(strokeWidth);
        propRow3.appendChild(inputWidth);

        //Row9
        var propRow9 = document.createElement('div');
        propRow9.classList.add('map-app-prop-row');
        var dash = document.createElement('span');
        dash.textContent = 'Traço da Linha:';
        dash.classList.add('map-app-prop-name');
        var inputDash = document.createElement('input');
        inputDash.setAttribute('type', 'text');
        inputDash.classList.add('form-control');
        inputDash.style.width = '148px';
        inputDash.classList.add('map-app-input-custom');
        inputDash.id = 'inputDash';
        this._dash = inputDash;
        propRow9.appendChild(dash);
        propRow9.appendChild(inputDash);

        //Row10
        var rowStyleType = document.createElement('div');
        rowStyleType.classList.add('map-app-prop-row');
        var estilo = document.createElement('span');
        estilo.textContent = 'União da Linha:';
        estilo.classList.add('map-app-prop-name');
        var inputestilo = document.createElement('select');
        inputestilo.innerHTML += '<option value="bevel">Chanfrada</option>';
        inputestilo.innerHTML += '<option value="round">Redonda</option>';
        inputestilo.innerHTML += '<option value="miter">Miter</option>';
        inputestilo.classList.add('form-control');
        inputestilo.style.width = '148px';
        inputestilo.classList.add('map-app-input-custom');
        inputestilo.id = 'inputestilo';
        this._join = inputestilo;
        rowStyleType.appendChild(estilo);
        rowStyleType.appendChild(inputestilo);
        this._strokeGroup.appendChild(propRow2);
        this._strokeGroup.appendChild(propRow3);
        this._strokeGroup.appendChild(propRow9);
        this._strokeGroup.appendChild(rowStyleType);
      }
    }, {
      key: "_buildUILabel",
      value: function _buildUILabel() {
        this._labelGroupToHide = document.createElement('div');

        // Mostar/Ocultar Label
        var propRow0 = document.createElement('div');
        propRow0.classList.add('map-app-prop-row');
        var display = document.createElement('span');
        display.textContent = 'Mostrar Etiquetas:';
        display.classList.add('map-app-prop-name');
        var checkDisplay = document.createElement('input');
        checkDisplay.setAttribute('type', 'checkbox');
        checkDisplay.classList.add('form-control');
        checkDisplay.style.width = '24px';
        checkDisplay.classList.add('map-app-input-custom');
        this._label = checkDisplay;
        propRow0.appendChild(display);
        propRow0.appendChild(checkDisplay);

        // fonte
        var fontRow = document.createElement('div');
        fontRow.classList.add('map-app-prop-row');
        var fonte = document.createElement('span');
        fonte.textContent = 'Fonte:';
        fonte.classList.add('map-app-prop-name');
        var inputfonte = document.createElement('select');
        inputfonte.innerHTML += '<option value="Sans-serif">Arial</option>';
        inputfonte.innerHTML += '<option value="Serif">Times</option>';
        inputfonte.innerHTML += '<option value="Monospace">Courier</option>';
        inputfonte.classList.add('form-control');
        inputfonte.style.width = '148px';
        inputfonte.classList.add('map-app-input-custom');
        inputfonte.id = 'inputfonte';
        this._fonte = inputfonte;
        fontRow.appendChild(fonte);
        fontRow.appendChild(inputfonte);

        //color
        var propRow = document.createElement('div');
        propRow.classList.add('map-app-prop-row');
        var fillColor = document.createElement('span');
        fillColor.textContent = 'Cor da Fonte:';
        fillColor.classList.add('map-app-prop-name');
        var colorSelector = document.createElement('div');
        colorSelector.id = 'fontColorPicker';
        propRow.appendChild(fillColor);
        propRow.appendChild(colorSelector);

        //tamanho
        var fontSizeRow = document.createElement('div');
        fontSizeRow.classList.add('map-app-prop-row');
        var strokeWidth = document.createElement('span');
        strokeWidth.textContent = 'Tamanho da fonte';
        strokeWidth.classList.add('map-app-prop-name');
        var inputWidth = document.createElement('input');
        inputWidth.setAttribute('type', 'number');
        inputWidth.setAttribute('min', '0');
        inputWidth.classList.add('form-control');
        inputWidth.style.width = '74px';
        inputWidth.classList.add('map-app-input-custom');
        inputWidth.id = 'fontSize';
        this._fontSize = inputWidth;
        fontSizeRow.appendChild(strokeWidth);
        fontSizeRow.appendChild(inputWidth);

        //field
        var propRow13 = document.createElement('div');
        propRow13.classList.add('map-app-prop-row');
        var path = document.createElement('span');
        path.textContent = 'Campo:';
        path.classList.add('map-app-prop-name');
        var inputpath = document.createElement('input');
        inputpath.setAttribute('type', 'text');
        inputpath.classList.add('form-control');
        inputpath.style.width = '148px';
        inputpath.classList.add('map-app-input-custom');
        inputpath.id = 'inputpath';
        this._field = inputpath;
        propRow13.appendChild(path);
        propRow13.appendChild(inputpath);
        this._labelGroup.appendChild(propRow0);
        this._labelGroup.appendChild(this._labelGroupToHide);
        this._labelGroupToHide.appendChild(fontRow);
        this._labelGroupToHide.appendChild(fontSizeRow);
        this._labelGroupToHide.appendChild(propRow);
        this._labelGroupToHide.appendChild(propRow13);
      }
    }, {
      key: "_handleLabelUi",
      value: function _handleLabelUi() {
        if (this._label.checked) {
          this._labelGroupToHide.style.display = 'block';
        } else {
          this._labelGroupToHide.style.display = 'none';
        }
      }
    }, {
      key: "_showInterface",
      value: function _showInterface() {
        this.map.hideAllControls();
        this.map.openDock('left', 35);
        this.map.mapElement.style.right = '0';
        var panel = this.map.getDock('left');
        panel.classList.add('map-app-panel-content');
        panel.style.background = 'linear-gradient(to bottom, #464A5B 50%, #24303C)';
        var layersList = document.createElement('div');
        layersList.className = 'map-app-layers-list-content';
        var layersStyle = document.createElement('div');
        layersStyle.className = 'map-app-layer-style';

        /*
         *
         * Lista de Camadas
         *
         */

        var headerList = document.createElement('div');
        headerList.className = 'map-app-header-list-content';
        var title = document.createElement('span');
        title.textContent = 'Lista das Camadas';
        title.className = 'map-app-list-layers-title';
        var layersIcon = document.createElement('div');
        layersIcon.classList.add('map-app-layers-icon');
        this._layersListGroup = document.createElement('ul');
        this._layersListGroup.classList.add('list-group');
        this._layersListGroup.classList.add('list-group-flush');
        headerList.appendChild(layersIcon);
        headerList.appendChild(title);
        layersList.appendChild(headerList);
        layersList.appendChild(this._layersListGroup);

        /*
         *
         * Estilo das Camadas
         *
         */

        var headerStyle = document.createElement('div');
        headerStyle.className = 'map-app-header-style-content';
        var titleStyle = document.createElement('span');
        titleStyle.textContent = 'Estilo da Camada';
        titleStyle.className = 'map-app-list-layers-title';
        titleStyle.classList.add('map-app-color-green');
        var styleProps = document.createElement('div');
        styleProps.classList.add('map-app-style-props');

        // Mostar/Ocultar Layer
        var propRow0 = document.createElement('div');
        propRow0.classList.add('map-app-prop-row');
        var display = document.createElement('span');
        display.textContent = 'Mostrar:';
        display.classList.add('map-app-prop-name');
        var checkDisplay = document.createElement('input');
        checkDisplay.setAttribute('type', 'checkbox');
        checkDisplay.classList.add('form-control');
        checkDisplay.style.width = '24px';
        checkDisplay.classList.add('map-app-input-custom');
        this._display = checkDisplay;
        propRow0.appendChild(display);
        propRow0.appendChild(checkDisplay);

        // Controle da Opacidade
        var propRow8 = document.createElement('div');
        propRow8.classList.add('map-app-prop-row');
        var spanOpacity = document.createElement('span');
        spanOpacity.textContent = 'Opacidade:';
        spanOpacity.classList.add('map-app-prop-name');
        var inputOpacity = document.createElement('input');
        inputOpacity.setAttribute('type', 'number');
        inputOpacity.setAttribute('min', '0');
        inputOpacity.setAttribute('max', '100');
        inputOpacity.classList.add('form-control');
        inputOpacity.classList.add('map-app-input-custom');
        inputOpacity.style.width = '74px';
        inputOpacity.id = 'inputOpacity';
        this._layerOpacity = inputOpacity;
        propRow8.appendChild(spanOpacity);
        propRow8.appendChild(inputOpacity);

        /*
         *
         * Cria os elementos para a manipulação dos estilos
         *
         */
        this._pointGroup = document.createElement('div');
        this._fillGroup = document.createElement('div');
        this._strokeGroup = document.createElement('div');
        this._labelGroup = document.createElement('div');
        this._buildUIPoint();
        this._buildUIFill();
        this._buildUIStroke();
        this._buildUILabel();

        /*
         *
         * Monta a interface
         *
         */
        headerStyle.appendChild(titleStyle);
        layersStyle.appendChild(headerStyle);
        layersStyle.appendChild(styleProps);
        styleProps.appendChild(propRow0);
        styleProps.appendChild(this._pointGroup);
        styleProps.appendChild(this._fillGroup);
        styleProps.appendChild(this._strokeGroup);
        styleProps.appendChild(this._labelGroup);
        styleProps.appendChild(propRow8);
        panel.appendChild(layersList);
        panel.appendChild(layersStyle);
        this._getIcons();
      }
    }, {
      key: "_getIcons",
      value: function _getIcons() {
        var path = 'https://cdn.jsdelivr.net/npm/@mapbox/maki@6.1.0/icons/';
        var icons = ['aerialway', 'airfield', 'airport', 'alcohol-shop', 'american-football', 'amusement-park', 'aquarium', 'art-gallery', 'attraction', 'bakery', 'bank', 'bar', 'barrier', 'baseball', 'basketball', 'bbq', 'beach', 'beer', 'bicycle', 'bicycle-share', 'blood-bank', 'bowling-alley', 'bridge', 'building', 'building-alt1', 'bus', 'cafe', 'campsite', 'car', 'car-rental', 'car-repair', 'casino', 'castle', 'cemetery', 'charging-station', 'cinema', 'circle', 'circle-stroked', 'city', 'clothing-store', 'college', 'commercial', 'communications-tower', 'confectionery', 'convenience', 'cricket', 'cross', 'dam', 'danger', 'defibrillator', 'dentist', 'doctor', 'dog-park', 'drinking-water', 'embassy', 'emergency-phone', 'entrance', 'entrance-alt1', 'farm', 'fast-food', 'fence', 'ferry', 'fire-station', 'fitness-centre', 'florist', 'fuel', 'furniture', 'gaming', 'garden', 'garden-centre', 'gift', 'globe', 'golf', 'grocery', 'hairdresser', 'harbor', 'hardware', 'heart', 'heliport', 'home', 'horse-riding', 'hospital', 'ice-cream', 'industry', 'information', 'jewelry-store', 'karaoke', 'landmark', 'landuse', 'laundry', 'library', 'lighthouse', 'lodging', 'logging', 'marker', 'marker-stroked', 'mobile-phone', 'monument', 'mountain', 'museum', 'music', 'natural', 'optician', 'paint', 'park', 'park-alt1', 'parking', 'parking-garage', 'pharmacy', 'picnic-site', 'pitch', 'place-of-worship', 'playground', 'police', 'post', 'prison', 'rail', 'rail-light', 'rail-metro', 'ranger-station', 'recycling', 'religious-buddhist', 'religious-christian', 'religious-jewish', 'religious-muslim', 'residential-community', 'restaurant', 'restaurant-noodle', 'restaurant-pizza', 'restaurant-seafood', 'roadblock', 'rocket', 'school', 'scooter', 'shelter', 'shoe', 'shop', 'skateboard', 'skiing', 'slaughterhouse', 'slipway', 'snowmobile', 'soccer', 'square', 'square-stroked', 'stadium', 'star', 'star-stroked', 'suitcase', 'sushi', 'swimming', 'table-tennis', 'teahouse', 'telephone', 'tennis', 'theatre', 'toilet', 'town', 'town-hall', 'triangle', 'triangle-stroked', 'veterinary', 'viewpoint', 'village', 'volcano', 'volleyball', 'warehouse', 'waste-basket', 'watch', 'water', 'waterfall', 'watermill', 'wetland', 'wheelchair', 'windmill', 'zoo'];
        for (var i = 0; i < icons.length; i++) {
          this._iconConteiner.innerHTML += "<img class=\"map-app-editor-point-image\" style=\"padding: 5px; cursor: pointer;\" src=\"".concat(path).concat(icons[i], "-15.svg\">");
        }
      }
    }, {
      key: "_getLayers",
      value: function _getLayers() {
        for (var i = 0; i < this.map.content.length; i++) {
          if (this.map.content[i].type.toLowerCase() == 'ogc' || this.map.content[i].type.toLowerCase() == 'baselayer') {
            for (var j = 0; j < this.map.content[i].layers.length; j++) {
              var layer = document.createElement('a');
              layer.classList.add('list-group-item');
              layer.classList.add('list-group-item-action');
              layer.setAttribute('i', i);
              layer.setAttribute('j', j);
              layer.classList.add('map-app-list-group-item');
              if (i == 0 && j == 0) {
                layer.classList.add('map-app-layer-item-active');
                this._layerItem = layer;
              }
              layer.text = this.map.content[i].name + ': ' + this.map.content[i].layers[j].name;
              this._layersListGroup.appendChild(layer);
            }
          }
        }
      }
    }, {
      key: "_initColorPicker",
      value: function _initColorPicker() {
        var i = this._layerItem.getAttribute('i');
        var j = this._layerItem.getAttribute('j');
        var layer = this.map.content[i].layers[j];
        this._fillPickr = Pickr.create({
          el: '#colorPicker',
          theme: 'nano',
          default: layer.style.fill ? layer.style.fill.color : '#fff',
          position: 'right',
          components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: {
              hex: true,
              rgba: true,
              hsla: true,
              input: true,
              save: true
            }
          }
        });
        this._strokePickr = Pickr.create({
          el: '#strokePicker',
          theme: 'nano',
          default: layer.style.stroke ? layer.style.stroke.color : '#000',
          position: 'right-end',
          components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: {
              hex: true,
              rgba: true,
              hsla: true,
              input: true,
              save: true
            }
          }
        });
        this._fontColorPickr = Pickr.create({
          el: '#fontColorPicker',
          theme: 'nano',
          default: layer.style.fill ? layer.style.fill.color : '#fff',
          position: 'right',
          components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: {
              hex: true,
              rgba: true,
              hsla: true,
              input: true,
              save: true
            }
          }
        });
      }
    }, {
      key: "_initLayerProps",
      value: function _initLayerProps() {
        var i = this._layerItem.getAttribute('i');
        var j = this._layerItem.getAttribute('j');
        var layer = this.map.content[i].layers[j];
        this._display.checked = layer.display;
        if (layer.primitive === 'point') {
          if (layer.style.image) {
            this._xAncor.value = layer.style.image.anchor[0];
            this._yAncor.value = layer.style.image.anchor[0];
            this._path.value = layer.style.image.src;
          } else if (layer.style.circle) {
            this._fillPickr.setColor(layer.style.fill.color, false);
            this._strokePickr.setColor(layer.style.stroke.color, false);
            this._strokeWidth.value = layer.style.stroke.width;
            this._pointRadius.value = layer.style.circle.radius;
            this._dash.value = layer.style.stroke.lineDash ? layer.style.stroke.lineDash.join(',') : '1';
            this._join.value = layer.style.stroke.lineJoin || 'round';
          }

          // Hide/Show elements
          if (layer.style.circle) {
            this._estiloPonto.value = 'circle';
          } else if (layer.style.image) {
            this._estiloPonto.value = 'image';
          }
          this._handlePointUI();
        } else if (layer.primitive === 'line') {
          this._strokePickr.setColor(layer.style.stroke.color, false);
          this._strokeWidth.value = layer.style.stroke.width;
          this._dash.value = layer.style.stroke.lineDash ? layer.style.stroke.lineDash.join(',') : '1';
          this._join.value = layer.style.stroke.lineJoin || 'round';
        } else if (layer.primitive === 'polygon') {
          this._fillPickr.setColor(layer.style.fill.color, false);
          this._strokePickr.setColor(layer.style.stroke.color, false);
          this._strokeWidth.value = layer.style.stroke.width;
          this._dash.value = layer.style.stroke.lineDash ? layer.style.stroke.lineDash.join(',') : '1';
          this._join.value = layer.style.stroke.lineJoin || 'round';
        }

        // Hide/Show elements
        if (layer.style.label) {
          this._label.checked = true;
          this._fonte.value = layer.style.label.font || 'Sans-serif';
          this._fontSize.value = layer.style.label.size || '12';
          this._fontColorPickr.setColor(layer.style.label.color, false);
          this._field.value = layer.style.label.text;
        } else {
          this._label.checked = false;
          this._fonte.value = 'Sans-serif';
          this._fontSize.value = '12';
          this._fontColorPickr.setColor('#000', false);
          this._field.value = '';
        }
        this._handleLabelUi();
        this._layerOpacity.value = layer.style.opacity * 100;
      }
    }, {
      key: "_handlePointUI",
      value: function _handlePointUI() {
        var i = this._layerItem.getAttribute('i');
        var j = this._layerItem.getAttribute('j');
        if (this._estiloPonto.value === 'circle') {
          this._groupCircle.style.display = 'block';
          this._groupImage.style.display = 'none';
          this._fillGroup.style.display = 'block';
          this._strokeGroup.style.display = 'block';
        } else if (this._estiloPonto.value === 'image') {
          this._groupCircle.style.display = 'none';
          this._groupImage.style.display = 'block';
          this._fillGroup.style.display = 'none';
          this._strokeGroup.style.display = 'none';
        }
        if (this._changeStylePoint) {
          if (this.map.content[i].layers[j].style.circle) {
            delete this.map.content[i].layers[j].style.circle;
            delete this.map.content[i].layers[j].style.stroke;
            delete this.map.content[i].layers[j].style.fill;
            this.map.content[i].layers[j].style.image = {};
          } else if (this.map.content[i].layers[j].style.image) {
            delete this.map.content[i].layers[j].style.image;
            this.map.content[i].layers[j].style.stroke = {};
            this.map.content[i].layers[j].style.fill = {};
            this.map.content[i].layers[j].style.circle = {};
          }
          this._changeStylePoint = false;
        }
      }
    }, {
      key: "_handleInterface",
      value: function _handleInterface() {
        var i = this._layerItem.getAttribute('i');
        var j = this._layerItem.getAttribute('j');
        var layer = this.map.content[i].layers[j];
        if (layer.primitive === 'point') {
          this._handlePointUI();
          this._pointGroup.style.display = 'block';
        } else if (layer.primitive === 'line') {
          this._pointGroup.style.display = 'none';
          this._fillGroup.style.display = 'none';
          this._strokeGroup.style.display = 'block';
        } else if (layer.primitive === 'polygon') {
          this._pointGroup.style.display = 'none';
          this._fillGroup.style.display = 'block';
          this._strokeGroup.style.display = 'block';
        } else if (layer.primitive === 'raster') {
          this._pointGroup.style.display = 'none';
          this._fillGroup.style.display = 'none';
          this._strokeGroup.style.display = 'none';
          this._labelGroup.style.display = 'none';
        }
        if (layer.primitive !== 'raster') {
          this._labelGroup.style.display = 'block';
        }
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this2 = this;
        this._display.addEventListener('change', function () {
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].display = _this2._display.checked;
          _this2.map._removeAllLayers();
          _this2.map._drawLayers();
        });
        this._fillPickr.on('change', function (color) {
          _this2._fillPickr.applyColor(true);
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.fill.color = color.toRGBA().toString(1);
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        this._strokePickr.on('change', function (color) {
          _this2._strokePickr.applyColor(true);
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.stroke.color = color.toRGBA().toString(1);
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        this._pointRadius.addEventListener('change', function () {
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.circle.radius = _this2._pointRadius.value;
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        this._strokeWidth.addEventListener('change', function () {
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.stroke.width = _this2._strokeWidth.value;
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        this._layerOpacity.addEventListener('change', function () {
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.opacity = _this2._layerOpacity.value / 100;
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        var layers = document.getElementsByClassName('map-app-list-group-item');
        Array.from(layers).forEach(function (element) {
          element.addEventListener('click', function () {
            _this2._layerItem.classList.remove('map-app-layer-item-active');
            element.classList.add('map-app-layer-item-active');
            _this2._layerItem = element;
            _this2._handleInterface();
            _this2._initLayerProps();
          });
        });
        this._estiloPonto.addEventListener('change', function () {
          _this2._handlePointUI();
        });
        this._estiloPonto.addEventListener('click', function () {
          _this2._changeStylePoint = true;
        });
        this._xAncor.addEventListener('change', function () {
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.image.anchor[0] = _this2._xAncor.value;
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        this._yAncor.addEventListener('change', function () {
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.image.anchor[1] = _this2._xAncor.value;
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        this._path.addEventListener('change', function () {
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.image.src = _this2._path.value;
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        this._path.addEventListener('focus', function () {
          _this2._iconConteiner.style.display = 'block';
          _this2._iconConteiner.style.top = _this2._path.offsetTop + 'px';
          var images = document.getElementsByClassName(' map-app-editor-point-image');
          Array.from(images).forEach(function (element) {
            element.addEventListener('click', function () {
              var i = _this2._layerItem.getAttribute('i');
              var j = _this2._layerItem.getAttribute('j');
              _this2._path.value = element.src;
              _this2.map.content[i].layers[j].style.image.src = element.src;
              _this2.map.updateStyle();
              _this2.map.content[i].layers[j].modifiedStyle = true;
            });
          });
        });
        this._iconConteiner.addEventListener('click', function () {
          _this2._iconConteiner.style.display = 'none';
        });
        this._dash.addEventListener('change', function () {
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.stroke.lineDash = _this2._dash.value.split(',').map(Number);
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        this._join.addEventListener('change', function () {
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.stroke.lineJoin = _this2._join.value;
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        this._label.addEventListener('change', function () {
          _this2._handleLabelUi();
        });
        this._label.addEventListener('change', function () {
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          if (_this2._label.checked) {
            _this2.map.content[i].layers[j].style.label = {};
            _this2.map.content[i].layers[j].style.label.font = 'Sans-serif';
            _this2.map.content[i].layers[j].style.label.size = '12';
            _this2.map.content[i].layers[j].style.label.color = '#000';
          } else {
            delete _this2.map.content[i].layers[j].style.label;
          }
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        this._fonte.addEventListener('change', function () {
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.label.font = _this2._fonte.value;
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        this._fontSize.addEventListener('change', function () {
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.label.size = _this2._fontSize.value;
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        this._fontColorPickr.on('change', function (color) {
          _this2._fontColorPickr.applyColor(true);
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.label.color = color.toRGBA().toString(1);
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
        this._field.addEventListener('change', function () {
          var i = _this2._layerItem.getAttribute('i');
          var j = _this2._layerItem.getAttribute('j');
          _this2.map.content[i].layers[j].style.label.text = _this2._field.value;
          _this2.map.updateStyle();
          _this2.map.content[i].layers[j].modifiedStyle = true;
        });
      }
    }]);
  }(GeoWidget);

  var GetPosition = /*#__PURE__*/function (_GeoWidget) {
    function GetPosition(config) {
      var _this;
      _classCallCheck(this, GetPosition);
      config = config || {};
      config.hasUI = false;
      config.position = config.position || 'rb';
      _this = _callSuper(this, GetPosition, [config]);
      _this.scaleLineControl = null;
      _this._hasUI = false;
      _this._currentProjection = null;
      _this._srsList = config.srsList || [{
        name: 'WGS-84 GMS',
        type: 'lat-lng',
        format: 'DMS',
        defs: '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
      }, {
        name: 'WGS-84 GD',
        type: 'lat-lng',
        format: 'DD',
        defs: '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
      }, {
        name: 'SIRGAS 2000 - UTM 22S',
        type: 'projected',
        defs: '+proj=utm +zone=22 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
      }];
      return _this;
    }
    _inherits(GetPosition, _GeoWidget);
    return _createClass(GetPosition, [{
      key: "initialize",
      value: function initialize() {
        this._menu = document.createElement('div');
        this._menu.style.width = '300px';
        //this._menu.style.height = '100px';
        this._menu.style.position = 'absolute';
        this._menu.style.top = '0';
        this._menu.style.left = '0';
        this._menu.style.background = '#fff';
        var target = document.getElementById(this.map.target);
        target.appendChild(this._menu);
        this._registerEvents();
      }
    }, {
      key: "_getMenu",
      value: function _getMenu() {
        var ul = document.createElement('ul');
        ul.className = 'list-group';

        // let title = document.createElement('li');
        // title.className = 'list-group-item p-2 active bg-dark';
        // title.innerHTML = 'Obter coordenadas:';
        // ul.appendChild(title);

        for (var i = 0; i < this._srsList.length; i++) {
          var srs = this._srsList[i];
          var li = document.createElement('li');
          li.className = 'list-group-item list-group-item-action flex-column align-items-start p-2';
          li.style.cursor = 'pointer';
          this._currentProjection = srs;
          var projectedCoord = this._projectPoint(this._currentCoord);
          var formatedCoord = this._formatCoord(projectedCoord);
          var template = "\n                <div class=\"input-group input-group-sm m-0\">\n                    <div class=\"input-group-prepend\">\n                        <span class=\"input-group-text\">".concat(srs.name, "</span>\n                    </div>\n                    <input value=\"").concat(formatedCoord, "\" type=\"text\" class=\"form-control\" aria-label=\"Coordenadas\" aria-describedby=\"inputGroup-sizing-sm\">\n                </div>\n            ");
          li.innerHTML = template;
          ul.appendChild(li);
        }
        this._menu.innerHTML = '';
        this._menu.appendChild(ul);
      }
    }, {
      key: "_setMenuPosition",
      value: function _setMenuPosition(x, y) {
        this._menu.style.left = x + 'px';
        this._menu.style.top = y + 'px';
        this._menu.style.right = 'auto';
        this._menu.style.bottom = 'auto';
      }
    }, {
      key: "_showMenu",
      value: function _showMenu() {
        this._menu.style.display = 'block';
      }
    }, {
      key: "_hideMenu",
      value: function _hideMenu() {
        this._menu.style.display = 'none';
      }
    }, {
      key: "_projectPoint",
      value: function _projectPoint(coordinate) {
        var wgsCoords = ol.proj.transform(coordinate, this.map.srid, 'EPSG:4326');
        return proj4(this._currentProjection.defs, wgsCoords);
      }
    }, {
      key: "_formatCoord",
      value: function _formatCoord(coordinate) {
        var _this2 = this;
        var displayCoords = '';
        if (this._currentProjection.format === 'DMS') {
          displayCoords = ol.coordinate.toStringHDMS(coordinate, this.map.config.precision || 3);
        } else if (this._currentProjection.format === 'DD') {
          displayCoords = coordinate.map(function (e) {
            return Number(e.toFixed(8));
          });
          displayCoords = displayCoords.toString();
        } else {
          displayCoords = coordinate.map(function (e) {
            return Number(e.toFixed(_this2.map.config.precision || 3));
          });
          displayCoords = displayCoords.toString();
        }
        return displayCoords;
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this.map.ol.getViewport().addEventListener('contextmenu', function (evt) {
          evt.preventDefault();
          _this3._currentCoord = _this3.map.ol.getEventCoordinate(evt);
          _this3._setMenuPosition(evt.offsetX, evt.offsetY);
          _this3._getMenu();
          _this3._showMenu();
        });
        this.map.ol.getView().on('change:resolution', function () {
          _this3._hideMenu();
        });
        window.addEventListener('click', function (e) {
          if (!_this3._menu.contains(e.target)) {
            _this3._hideMenu();
          }
        });
        document.onkeydown = function (evt) {
          evt = evt || window.event;
          if (evt.keyCode == 27) {
            _this3._hideMenu();
          }
        };
      }
    }]);
  }(GeoWidget);

  var Cad = /*#__PURE__*/function (_GeoWidget) {
    function Cad(config) {
      var _this;
      _classCallCheck(this, Cad);
      config = config || {};
      config.hasUI = false;
      config.position = config.position || 'ct';
      _this = _callSuper(this, Cad, [config]);
      _this._dock = null;
      _this._hasUI = false;
      _this._drawingLayer = null;
      _this._auxLayer = null;
      _this._layers = {
        centroids: null,
        drawing: null,
        intersections: null,
        lines: null,
        midLines: null,
        orthoLines: null
      };
      _this._snaps = [];
      _this._units = 'px';
      _this._tolerance = 50;
      _this._toSegment = true;
      _this._tovertex = true;
      _this._maxResolution = 0;
      _this._selectedFeaturesHover = null;
      _this._selectedFeaturesClick = null;
      _this._selectClickControl = null;
      _this._isDrawing = false;
      _this._toolsStatus = {
        auxLines: false,
        intersections: false,
        centroids: false,
        midPoints: false,
        ortho: false
      };
      _this._promptFunction = null;
      _this._promptTip = null;
      _this.cmdList = [{
        title: 'Add a WKT feature to map',
        cmd: 'wkt',
        fnc: _this._fromWktPrompt
      }, {
        title: 'Create a buffer from a selected geometry',
        cmd: 'buffer',
        fnc: _this._bufferPrompt
      }, {
        title: 'Select a feature',
        cmd: 'select',
        fnc: _this._selectPrompt
      }, {
        title: 'Add a point',
        cmd: 'point',
        fnc: _this._pointPrompt
      }];
      return _this;
    }
    _inherits(Cad, _GeoWidget);
    return _createClass(Cad, [{
      key: "initialize",
      value: function initialize() {
        this._initInterface();
        this._initLayers();
        this._setDefaultStyles();
        this._createSnapInteraction();
        this._initSelections();
        this._registerEvents();
        this._refreshStatus();
      }
    }, {
      key: "_initInterface",
      value: function _initInterface() {
        this._dock = this.map.getDock('bottom');
        this._dock.innerHTML = this._template();
        this._auxDock = document.getElementById("infobox_".concat(this.id));
        this._auxDock.innerHTML = this._snapTemplate();
        this._auxDock.innerHTML += this._promptTemplate();
      }
    }, {
      key: "_template",
      value: function _template() {
        return "\n            <div id=\"infobox_".concat(this.id, "\" class=\"map-app-info-box\"> </div>\n            <div class=\"map-app-cad-container\"> \n                <input class=\"map-app-prompt\" id=\"prompt_").concat(this.id, "\" type=\"text\" placeholder=\"Type a command...\">\n                <button id=\"addPoint_").concat(this.id, "\">Point</button>\n                <button id=\"addLine_").concat(this.id, "\">Line</button>\n                <button id=\"addPolygon_").concat(this.id, "\">Polygon</button>\n                <button id=\"addRing_").concat(this.id, "\" disabled>Add Ring</button>\n                <button id=\"removeRing_").concat(this.id, "\" disabled>Remove Ring</button>\n                <button id=\"addBuffer_").concat(this.id, "\" disabled>Buffer</button>\n                <button id=\"select_").concat(this.id, "\">Select Feature</button>\n                <button id=\"snap_").concat(this.id, "\">Snap Tools</button>\n            </div>\n        ");
      }
    }, {
      key: "_snapTemplate",
      value: function _snapTemplate() {
        return "\n            <div id=\"snap-container_".concat(this.id, "\" class=\"map-app-cad-aux-container\"> \n                <h5>Snap Config</h5>\n                <input id=\"auxLines_").concat(this.id, "\" type=\"checkbox\" value=\"1\">\n                <label for=\"auxLines_").concat(this.id, "\">Aux Lines</label><br>\n\n                <input id=\"intersections_").concat(this.id, "\" type=\"checkbox\" value=\"1\">\n                <label for=\"intersections_").concat(this.id, "\">Intersections</label><br>\n\n                <input id=\"centroids_").concat(this.id, "\" type=\"checkbox\" value=\"1\">\n                <label for=\"centroids_").concat(this.id, "\">Centroids</label><br>\n\n                <input id=\"midPoints_").concat(this.id, "\" type=\"checkbox\" value=\"1\">\n                <label for=\"midPoints_").concat(this.id, "\">Mid Points</label><br>\n\n                <input id=\"ortho_").concat(this.id, "\" type=\"checkbox\" value=\"1\">\n                <label for=\"ortho_").concat(this.id, "\">Ortho Lines</label><br>\n\n            </div>\n        ");
      }
    }, {
      key: "_promptTemplate",
      value: function _promptTemplate() {
        return "\n        <div id=\"prompt_container_".concat(this.id, "\" class=\"map-app-cad-aux-container\"> \n        </div>\n    ");
      }
    }, {
      key: "_uiHandler",
      value: function _uiHandler() {
        // Ring
        document.getElementById("addRing_".concat(this.id)).setAttribute('disabled', '');
        document.getElementById("removeRing_".concat(this.id)).setAttribute('disabled', '');
        document.getElementById("addBuffer_".concat(this.id)).setAttribute('disabled', '');
        if (this._selectedFeaturesClick && this._selectedFeaturesClick.getArray().length > 0) {
          var selectedFeatures = this._selectedFeaturesClick.getArray();
          for (var i = 0; i < selectedFeatures.length; i++) {
            if (selectedFeatures[i].getGeometry().getType() == 'Polygon') {
              // Ring
              document.getElementById("addRing_".concat(this.id)).removeAttribute('disabled');
              document.getElementById("removeRing_".concat(this.id)).removeAttribute('disabled');
            }
            document.getElementById("addBuffer_".concat(this.id)).removeAttribute('disabled');
          }
        }
      }
    }, {
      key: "_refreshStatus",
      value: function _refreshStatus() {
        document.getElementById("auxLines_".concat(this.id)).checked = this._toolsStatus.auxLines;
        document.getElementById("intersections_".concat(this.id)).checked = this._toolsStatus.intersections;
        document.getElementById("centroids_".concat(this.id)).checked = this._toolsStatus.centroids;
        document.getElementById("midPoints_".concat(this.id)).checked = this._toolsStatus.midPoints;
        document.getElementById("ortho_".concat(this.id)).checked = this._toolsStatus.ortho;
        this._createAuxFeatures();
      }
    }, {
      key: "_initSelections",
      value: function _initSelections() {
        var _this2 = this;
        var selectPointerMove = new ol.interaction.Select({
          condition: ol.events.condition.pointerMove,
          hitTolerance: 10,
          multi: true,
          layers: [this._layers.drawing, this._layers.lines],
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 0, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: 'rgba(255, 0, 255, 1)',
              width: 1,
              lineDash: [5, 7]
            }),
            image: new ol.style.Circle({
              radius: 2,
              fill: new ol.style.Fill({
                color: 'rgba(255, 0, 255, 1)'
              })
            })
          })
        });
        selectPointerMove.on('select', function (e) {
          _this2._selectedFeaturesHover = e.target.getFeatures();
        });
        this.map.ol.addInteraction(selectPointerMove);
        this._selectClickControl = new ol.interaction.Select({
          condition: ol.events.condition.singleClick,
          hitTolerance: 10,
          multi: false,
          layers: [this._layers.drawing],
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 0, 255, 0.3)'
            }),
            stroke: new ol.style.Stroke({
              color: 'rgba(0, 0, 255, 1)',
              width: 1
            }),
            image: new ol.style.Circle({
              radius: 2,
              fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 1)'
              })
            })
          })
        });
        this._selectClickControl.on('select', function (e) {
          _this2._selectedFeaturesClick = e.target.getFeatures();
          _this2._uiHandler();
        });
        this.map.ol.addInteraction(this._selectClickControl);
        this._selectClickControl.setActive(false);
      }
    }, {
      key: "_initLayers",
      value: function _initLayers() {
        this._layers = {
          lines: new ol.layer.Vector({
            source: new ol.source.Vector()
          }),
          intersections: new ol.layer.Vector({
            source: new ol.source.Vector()
          }),
          drawing: new ol.layer.Vector({
            source: new ol.source.Vector()
          }),
          midLines: new ol.layer.Vector({
            source: new ol.source.Vector()
          }),
          centroids: new ol.layer.Vector({
            source: new ol.source.Vector()
          }),
          orthoLines: new ol.layer.Vector({
            source: new ol.source.Vector()
          })
        };
        this.map.ol.addLayer(this._layers.centroids);
        this.map.ol.addLayer(this._layers.drawing);
        this.map.ol.addLayer(this._layers.intersections);
        this.map.ol.addLayer(this._layers.lines);
        this.map.ol.addLayer(this._layers.midLines);
        this.map.ol.addLayer(this._layers.orthoLines);
      }
    }, {
      key: "_setDefaultStyles",
      value: function _setDefaultStyles() {
        this._layers.drawing.setStyle(new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 174, 66, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#FFAE42',
            width: 1
          }),
          image: new ol.style.Circle({
            radius: 2,
            fill: new ol.style.Fill({
              color: '#FFAE42'
            })
          })
        }));
        this._layers.drawing.setZIndex(999);
        this._layers.lines.setStyle(new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 255, 0.2)',
            width: 0.5
          })
        }));
        this._layers.orthoLines.setStyle(new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 255, 0.2)',
            width: 0.5
          })
        }));
        this._layers.centroids.setStyle(new ol.style.Style({
          image: new ol.style.RegularShape({
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 255, 0)'
            }),
            stroke: new ol.style.Stroke({
              color: 'rgba(255, 0, 255, 1)',
              width: 0.5
            }),
            points: 3,
            radius: 6,
            angle: 0
          })
        }));
        this._layers.midLines.setStyle(new ol.style.Style({
          image: new ol.style.RegularShape({
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 255, 0)'
            }),
            stroke: new ol.style.Stroke({
              color: 'rgba(255, 0, 255, 1)',
              width: 0.5
            }),
            points: 4,
            radius: 6,
            angle: Math.PI / 4
          })
        }));
        this._layers.intersections.setStyle(new ol.style.Style({
          image: new ol.style.Circle({
            radius: 2,
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 255, 0.2)'
            })
          })
        }));
      }
    }, {
      key: "_createSnapInteraction",
      value: function _createSnapInteraction() {
        this._snaps = [];
        var resolution = this.map.ol.getView().getResolution();
        var pixelTolerance = this._units === 'px' ? parseInt(this._tolerance) : Math.round(parseInt(this._tolerance) / resolution);
        var layers = Object.keys(this._layers);
        for (var i = 0; i < layers.length; i++) {
          var snap = new ol.interaction.Snap({
            source: this._layers[layers[i]].getSource(),
            edge: this._toSegment,
            vertex: this._toVertex,
            pixelTolerance: pixelTolerance
          });
          this._snaps.push(snap);
          this.map.ol.addInteraction(snap);
        }
      }
    }, {
      key: "_refreshInteractions",
      value: function _refreshInteractions() {
        for (var i = 0; i < this._snaps.length; i++) {
          this.map.ol.removeInteraction(this._snaps[i]);
          this.map.ol.addInteraction(this._snaps[i]);
        }
      }
    }, {
      key: "_clearAuxFeatures",
      value: function _clearAuxFeatures() {
        this._layers.lines.getSource().clear();
        this._layers.intersections.getSource().clear();
        this._layers.centroids.getSource().clear();
        this._layers.midLines.getSource().clear();
        this._layers.orthoLines.getSource().clear();
      }
    }, {
      key: "_createAuxFeatures",
      value: function _createAuxFeatures() {
        this._clearAuxFeatures();
        if (this._toolsStatus.auxLines) this._createAuxLines();
        if (this._toolsStatus.intersections) this._createIntersectionPoints();
        if (this._toolsStatus.midPoints) this._createMidPoints();
        if (this._toolsStatus.centroids) this._createCentroids();
        if (this._toolsStatus.ortho) this._createOrthoLines();
        this._refreshInteractions();
      }
    }, {
      key: "_createAuxLines",
      value: function _createAuxLines() {
        var extent$$1 = this.map.ol.getView().calculateExtent();
        var features = this._layers.drawing.getSource().getFeatures();
        for (var i = 0; i < features.length; i++) {
          var feature = features[i];
          var coords = feature.getGeometry().getCoordinates();
          if (coords instanceof Array) {
            //coords is ok

            if (coords[0] instanceof Array) {
              //line or polygon

              if (coords[0][0] instanceof Array) {
                // polygon

                for (var k = 0; k < coords.length; k++) {
                  for (var l = 0; l < coords[k].length; l++) {
                    this._createOlLinesFeature(coords[k][l], extent$$1);
                  }
                }
              } else {
                // line

                for (var j = 0; j < coords.length; j++) {
                  this._createOlLinesFeature(coords[j], extent$$1);
                }
              }
            } else {
              // point

              if (!isNaN(coords[0])) {
                this._createOlLinesFeature(coords, extent$$1);
              }
            }
          }
        }
      }
    }, {
      key: "_createOlLinesFeature",
      value: function _createOlLinesFeature(pointArray, extent$$1) {
        this._createOlLineFeature([[pointArray[0], extent$$1[1]], [pointArray[0], extent$$1[3]]]);
        this._createOlLineFeature([[extent$$1[0], pointArray[1]], [extent$$1[2], pointArray[1]]]);
      }
    }, {
      key: "_createOlLineFeature",
      value: function _createOlLineFeature(lineArray, layer) {
        layer = layer || this._layers.lines;
        var feature = new ol.Feature();
        var line = new ol.geom.LineString(lineArray);
        feature.setGeometry(line);
        layer.getSource().addFeature(feature);
      }
    }, {
      key: "_createIntersectionPoints",
      value: function _createIntersectionPoints() {
        // aux lines and aux lines
        this._createIntersectionPointsFromLayers(this._layers.lines, this._layers.lines);

        // aux lines and drawing features
        this._createIntersectionPointsFromLayers(this._layers.lines, this._layers.drawing);
      }
    }, {
      key: "_createIntersectionPointsFromLayers",
      value: function _createIntersectionPointsFromLayers(layer1, layer2) {
        var format = new ol.format.GeoJSON();
        var features1 = layer1.getSource().getFeatures();
        var features2 = layer2.getSource().getFeatures();
        var collection1 = format.writeFeaturesObject(features1);
        var collection2 = format.writeFeaturesObject(features2);
        var intersects = turf.lineIntersect(collection2, collection1);
        var intersectionFeatures = format.readFeaturesFromObject(intersects);
        this._layers.intersections.getSource().addFeatures(intersectionFeatures);
      }
    }, {
      key: "_createMidPoints",
      value: function _createMidPoints() {
        var features = this._layers.drawing.getSource().getFeatures();
        var format = new ol.format.GeoJSON();
        for (var i = 0; i < features.length; i++) {
          var feature = features[i];
          var f = format.writeFeatureObject(feature);
          var segments = turf.lineSegment(f);
          for (var j = 0; j < segments.features.length; j++) {
            var centroid = turf.centroid(segments.features[j]);
            var centroidFeature = format.readFeatureFromObject(centroid);
            this._layers.midLines.getSource().addFeature(centroidFeature);
          }
        }
      }
    }, {
      key: "_createCentroids",
      value: function _createCentroids() {
        var features = this._layers.drawing.getSource().getFeatures();
        var format = new ol.format.GeoJSON();
        for (var i = 0; i < features.length; i++) {
          var feature = features[i];
          var f = format.writeFeatureObject(feature);
          var centroid = turf.centroid(f);
          var centroidFeature = format.readFeatureFromObject(centroid);
          this._layers.centroids.getSource().addFeature(centroidFeature);
        }
      }
    }, {
      key: "_createOrthoLines",
      value: function _createOrthoLines(feauture) {
        if (this._selectedFeaturesHover) {
          var extent$$1 = this.map.ol.getView().calculateExtent();
          var format = new ol.format.GeoJSON();
          var pointsCount = feauture.getGeometry().getCoordinates().length;
          var firstPoint = feauture.getGeometry().getCoordinates()[pointsCount - 2];
          var selectedFeatures = this._selectedFeaturesHover.getArray();
          for (var i = 0; i < selectedFeatures.length; i++) {
            if (selectedFeatures[i].getGeometry().getType() === "LineString") {
              var selectedFeature = format.writeFeatureObject(selectedFeatures[i]);
              var segments = turf.lineSegment(selectedFeature);
              for (var j = 0; j < segments.features.length; j++) {
                var segment = segments.features[j].geometry.coordinates;
                if (this._pointOnLine(segment, firstPoint)) {
                  var az = this._getAzimuth(segment[0], segment[1]);
                  var dist = this._plainDistance([extent$$1[0], extent$$1[1]], [extent$$1[2], extent$$1[3]]);
                  for (var k = 1; k < 9; k++) {
                    var p1 = this._pointAzDist(firstPoint, az + k * (Math.PI / 4), dist);
                    this._createOlLineFeature([firstPoint, p1], this._layers.orthoLines);
                  }
                }
              }
            }
          }
        }
      }
    }, {
      key: "_pointAzDist",
      value: function _pointAzDist(firstPoint, az, dist) {
        var x = firstPoint[0] + Math.sin(az) * dist;
        var y = firstPoint[1] + Math.cos(az) * dist;
        return [x, y];
      }
    }, {
      key: "_plainDistance",
      value: function _plainDistance(p1, p2) {
        return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
      }
    }, {
      key: "_pointOnLine",
      value: function _pointOnLine(segment, point) {
        var p1 = {
          x: segment[0][0],
          y: segment[0][1]
        };
        var p2 = {
          x: segment[1][0],
          y: segment[1][1]
        };
        var pa = {
          x: point[0],
          y: point[1]
        };
        return Math.abs((p2.y - p1.y) / (p2.x - p1.x) * (pa.x - p1.x) - (pa.y - p1.y)) < 10e-4;
      }
    }, {
      key: "_getAzimuth",
      value: function _getAzimuth(p1, p2) {
        var azimuth = Math.atan2(p2[0] - p1[0], p2[1] - p1[1]);
        azimuth = azimuth < 0 ? azimuth + 2 * Math.PI : azimuth;
        return azimuth;
      }
    }, {
      key: "_addRing",
      value: function _addRing(ringFeature) {
        if (this._selectedFeaturesClick && this._selectedFeaturesClick.getArray().length > 0) {
          if (this._selectedFeaturesClick.getArray()[0].getGeometry().getType() == 'Polygon') {
            var polygon = turf.polygon(this._selectedFeaturesClick.getArray()[0].getGeometry().getCoordinates());
            var ring = turf.polygon(ringFeature.getGeometry().getCoordinates());
            var ringInPolygon = turf.booleanContains(polygon, ring);
            if (ringInPolygon) {
              var intersection = turf.difference(polygon, ring);
              var format = new ol.format.GeoJSON();
              var intersectionFeatures = format.readFeaturesFromObject(intersection);
              this._selectedFeaturesClick.getArray()[0].setGeometry(intersectionFeatures[0].getGeometry());
            } else {
              alert('Ring não está contido no polígono!');
            }
          }
        } else {
          alert('Selecione uma feição!');
        }
      }
    }, {
      key: "_removeRing",
      value: function _removeRing(ringInsidePoint) {
        if (this._selectedFeaturesClick && this._selectedFeaturesClick.getArray().length > 0) {
          if (this._selectedFeaturesClick.getArray()[0].getGeometry().getType() == 'Polygon') {
            var ringCount = this._selectedFeaturesClick.getArray()[0].getGeometry().getLinearRingCount();
            var newPolygon = new ol.geom.Polygon([this._selectedFeaturesClick.getArray()[0].getGeometry().getLinearRing(0).getCoordinates()]);
            if (ringCount > 1) {
              for (var i = 1; i < ringCount; i++) {
                var lRing = this._selectedFeaturesClick.getArray()[0].getGeometry().getLinearRing(i);
                var polygon = turf.polygon([lRing.getCoordinates()]);
                var point = turf.point(ringInsidePoint.getGeometry().getCoordinates());
                var pointInRing = turf.booleanContains(polygon, point);
                if (!pointInRing) {
                  newPolygon.appendLinearRing(lRing);
                }
              }
            }
            this._selectedFeaturesClick.getArray()[0].setGeometry(newPolygon);
          }
        } else {
          alert('Selecione uma feição!');
        }
      }
    }, {
      key: "_buffer",
      value: function _buffer(radius) {
        if (this._selectedFeaturesClick && this._selectedFeaturesClick.getArray().length > 0) {
          var selectedFeatures = this._selectedFeaturesClick.getArray();
          for (var i = 0; i < selectedFeatures.length; i++) {
            var format = new ol.format.GeoJSON();
            selectedFeatures[i].getGeometry().transform(this.map.ol.getView().getProjection().getCode(), 'EPSG:4326');
            var feature = format.writeGeometryObject(selectedFeatures[i].getGeometry());
            var buffered = turf.buffer(feature, radius, {
              units: 'meters'
            });
            var intersectionFeatures = format.readFeatureFromObject(buffered);
            intersectionFeatures.getGeometry().transform('EPSG:4326', this.map.ol.getView().getProjection().getCode());
            this._layers.drawing.getSource().addFeature(intersectionFeatures);
          }
        }
      }
    }, {
      key: "_toggleDisplayBox",
      value: function _toggleDisplayBox(boxName) {
        var elm = document.getElementById("".concat(boxName, "_container_").concat(this.id));
        if (elm.style.display === 'none' || elm.style.display === '') {
          elm.style.display = 'block';
        } else {
          elm.style.display = 'none';
        }
      }
    }, {
      key: "_clearPrompt",
      value: function _clearPrompt() {
        this._promptFunction = null;
        document.getElementById("prompt_container_".concat(this.id)).innerHTML = '';
        document.getElementById("prompt_container_".concat(this.id)).style.display = 'none';
        document.getElementById("prompt_".concat(this.id)).value = '';
      }
    }, {
      key: "_pointPrompt",
      value: function _pointPrompt(coord) {
        if (!coord) {
          this._promptTip = 'Insira um par de coordenadas: x y';
        } else {
          this._fromWktPrompt('Point(' + coord + ')');
        }
      }
    }, {
      key: "_fromWktPrompt",
      value: function _fromWktPrompt(wkt) {
        if (!wkt) {
          this._promptTip = 'Insira um WKT: POINT(x y), LINESTRING(x y, x y), ...';
        } else {
          var format = new ol.format.WKT();
          var feature = format.readFeature(wkt, {
            dataProjection: 'EPSG:4326',
            featureProjection: this.map.ol.getView().getProjection().getCode()
          });
          this._layers.drawing.getSource().addFeature(feature);
          this._clearPrompt();
        }
      }
    }, {
      key: "_bufferPrompt",
      value: function _bufferPrompt(radius) {
        if (!this._selectedFeaturesClick || this._selectedFeaturesClick.getLength() === 0) {
          this._promptTip = 'ERRO: Selecione uma feição para proseguir.';
          return;
        }
        if (!radius) {
          this._promptTip = 'Insira o raio do buffer (m):';
        } else {
          this._buffer(radius);
          this._clearPrompt();
        }
      }
    }, {
      key: "_selectPrompt",
      value: function _selectPrompt() {
        this._selectClickControl.getFeatures().clear();
        this._selectClickControl.setActive(!this._selectClickControl.getActive());
        this._uiHandler();
        this._clearPrompt();
      }
    }, {
      key: "_promptHandler",
      value: function _promptHandler(value) {
        if (this._promptFunction) {
          this._promptFunction(value);
          return;
        }
        for (var i = 0; i < this.cmdList.length; i++) {
          for (var _i = 0; _i < this.cmdList.length; _i++) {
            if (this.cmdList[_i].cmd === value.toLowerCase()) {
              this._promptFunction = this.cmdList[_i].fnc;
              this._promptFunction();
              document.getElementById("prompt_".concat(this.id)).value = '';
              this._promptTipHandler();
            }
          }
        }
      }
    }, {
      key: "_promptTipHandler",
      value: function _promptTipHandler(value) {
        var matches = 0;
        var elm = document.getElementById("prompt_container_".concat(this.id));
        elm.innerHTML = '';
        if (value && !this._promptFunction) {
          for (var i = 0; i < this.cmdList.length; i++) {
            if (value != '' && this.cmdList[i].cmd.indexOf(value.toLowerCase()) != -1) {
              elm.innerHTML += "".concat(this.cmdList[i].cmd.toUpperCase(), "<br>");
              matches++;
            }
          }
          if (matches == 0) {
            elm.style.display = 'none';
          } else {
            elm.style.display = 'block';
          }
        } else {
          if (this._promptTip) {
            elm.innerHTML = this._promptTip;
          } else {
            elm.style.display = 'none';
          }
        }
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this._layers.drawing.getSource().on('addfeature', function () {
          return _this3._createAuxFeatures();
        });
        this.map.ol.getView().on('change', function () {
          return _this3._createAuxFeatures();
        });

        // Point
        document.getElementById("addPoint_".concat(this.id)).addEventListener('click', function () {
          _this3.map.toolbox.draw.getPoint().then(function (point) {
            _this3._layers.drawing.getSource().addFeature(point);
          });
        });

        // Line
        document.getElementById("addLine_".concat(this.id)).addEventListener('click', function () {
          var drawstart, drawend;
          var _this3$map$toolbox$ge = _this3.map.toolbox.getLineString();
          var _this3$map$toolbox$ge2 = _slicedToArray(_this3$map$toolbox$ge, 2);
          drawstart = _this3$map$toolbox$ge2[0];
          drawend = _this3$map$toolbox$ge2[1];
          drawend.then(function (line) {
            _this3._isDrawing = false;
            _this3._layers.drawing.getSource().addFeature(line);
          });
          drawstart.then(function (line) {
            line.getGeometry().on('change', function () {
              _this3._isDrawing = true;
              if (_this3._toolsStatus.auxLines) _this3._createOrthoLines(line);
            });
          });
        });

        // Polygon
        document.getElementById("addPolygon_".concat(this.id)).addEventListener('click', function () {
          _this3.map.toolbox.draw.getPolygon().then(function (polygon) {
            _this3._layers.drawing.getSource().addFeature(polygon);
          });
        });

        // Ring
        document.getElementById("addRing_".concat(this.id)).addEventListener('click', function () {
          _this3.map.toolbox.draw.getPolygon().then(function (polygon) {
            _this3._addRing(polygon);
          });
        });

        // Ring
        document.getElementById("removeRing_".concat(this.id)).addEventListener('click', function () {
          _this3.map.toolbox.draw.getPoint().then(function (point) {
            _this3._removeRing(point);
          });
        });

        // Buffer
        document.getElementById("addBuffer_".concat(this.id)).addEventListener('click', function () {
          var radius = prompt("Raio:", 500);
          _this3._buffer(radius);
        });
        document.getElementById("prompt_".concat(this.id)).addEventListener('keyup', function (e) {
          var key = e.which || e.keyCode;
          if (key == 13) {
            _this3._promptHandler(e.target.value);
          } else if (key === 'Escape' || key === 27) {
            _this3._clearPrompt();
          } else {
            _this3._promptTipHandler(e.target.value);
          }
        });
        document.getElementById("auxLines_".concat(this.id)).addEventListener('click', function () {
          _this3._toolsStatus.auxLines = !_this3._toolsStatus.auxLines;
          _this3._refreshStatus();
        });
        document.getElementById("intersections_".concat(this.id)).addEventListener('click', function () {
          _this3._toolsStatus.intersections = !_this3._toolsStatus.intersections;
          _this3._refreshStatus();
        });
        document.getElementById("centroids_".concat(this.id)).addEventListener('click', function () {
          _this3._toolsStatus.centroids = !_this3._toolsStatus.centroids;
          _this3._refreshStatus();
        });
        document.getElementById("midPoints_".concat(this.id)).addEventListener('click', function () {
          _this3._toolsStatus.midPoints = !_this3._toolsStatus.midPoints;
          _this3._refreshStatus();
        });
        document.getElementById("ortho_".concat(this.id)).addEventListener('click', function () {
          _this3._toolsStatus.ortho = !_this3._toolsStatus.ortho;
          _this3._refreshStatus();
        });
        document.getElementById("select_".concat(this.id)).addEventListener('click', function () {
          _this3._selectPrompt();
        });
        document.getElementById("snap_".concat(this.id)).addEventListener('click', function () {
          var snapContainer = document.getElementById("snap-container_".concat(_this3.id));
          if (snapContainer.style.display === 'none' || snapContainer.style.display === '') {
            snapContainer.style.display = 'block';
          } else {
            snapContainer.style.display = 'none';
          }
        });
      }
    }]);
  }(GeoWidget);

  var PointsByPlanarDistance = /*#__PURE__*/function (_GeoWidget) {
    function PointsByPlanarDistance(config) {
      var _this;
      _classCallCheck(this, PointsByPlanarDistance);
      config = config || {};
      config.tip = config.tip || 'PointsByLinearDistance';
      config.title = config.title || 'PointsByLinearDistance';
      config.class = config.class || 'point-by-linear';
      config.geometryType = config.geometryType || 'linestring';
      config.defaultDistance = config.defaultDistance || 1;
      config.defaultUnits = config.defaultUnits || 'm';
      _this = _callSuper(this, PointsByPlanarDistance, [config]);
      _this._source = config.source || new ol.source.Vector();
      _this._isListening = false;
      _this._lastPoint = null;
      _this._feature = new ol.Feature(null);
      _this._mouseFeature = new ol.Feature(null);
      _this._pointsList = [];
      _this.ui = _this._getUiTemplate();
      return _this;
    }
    _inherits(PointsByPlanarDistance, _GeoWidget);
    return _createClass(PointsByPlanarDistance, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
          _this2._initInternalLayer();
        });
      }
    }, {
      key: "_initInternalLayer",
      value: function _initInternalLayer() {
        this._vectorLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0ff',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0ff'
              })
            })
          })
        });
        this._vectorLayer.setZIndex(99999);
        this._vectorLayer.getSource().addFeature(this._mouseFeature);
        map.ol.addLayer(this._vectorLayer);
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        return "\n            <div class='m-0 p-3'>\n\n                <p class='map-app-measure-tip'>Digite a dist\xE2ncia desejada e clique em iniciar.<br>Clique no mapa para adicionar o primeiro ponto.<br>Mova o mouse para adicionar os pontos.<br>Clique novamente para concluir.</p>\n\n                <div class='row pt-1 pb-1 pl-3 pr-3'>\n\n                    <div class=\"input-group input-group-sm mb-3\">\n                        <input id=\"map-app-point-dist-input-".concat(this.id, "\" min=\"0.01\" type=\"number\" value=\"").concat(this._config.defaultDistance, "\" class=\"form-control\">\n                        <div class=\"input-group-prepend\">\n                            <span class=\"input-group-text\" id=\"inputGroup-sizing-sm\">metros</span>\n                        </div>\n                    </div>\n\n                </div>\n\n                <div class='row pt-1 pb-1 pl-3 pr-3'>\n\n                   <button id=\"map-app-point-dist-btn-").concat(this.id, "\" class=\"btn btn-dark btn-block btn-sm\">Iniciar</button>\n\n                </div>\n\n            </div>\n        ");
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._inputDistElement = document.getElementById("map-app-point-dist-input-".concat(this.id));
        this._btnElement = document.getElementById("map-app-point-dist-btn-".concat(this.id));
      }
    }, {
      key: "_managerInteractionActions",
      value: function _managerInteractionActions() {
        if (!this._isRunning) {
          this._isRunning = true;
          this._btnElement.innerHTML = 'Parar';
          document.getElementById(this.map.elementId).style.cursor = 'crosshair';
        } else {
          this._isRunning = false;
          this._btnElement.innerHTML = 'Iniciar';
          document.getElementById(this.map.elementId).style.cursor = 'auto';
          this._mouseFeature.setGeometry(this._createFeature([0, 0], 'point').getGeometry());
          this._pointsList = [];
        }
      }
    }, {
      key: "_clickHandler",
      value: function _clickHandler(evt) {
        if (this._isRunning) {
          this._isListening = !this._isListening;
          this._lastPoint = this._projectPoint(evt.coordinate);
          this._pointsList.push(this._lastPoint);
          this._geomHandler({
            coord: evt.coordinate,
            action: 'click'
          });
        }
      }
    }, {
      key: "_moveHandler",
      value: function _moveHandler(evt) {
        if (this._isRunning && this._isListening) {
          var point = this._projectPoint(evt.coordinate);
          var dist = this._distance(this._lastPoint, point);
          if (dist >= this._config.defaultDistance) {
            this._lastPoint = point;
            this._pointsList.push(this._lastPoint);
            this._geomHandler({
              coord: evt.coordinate,
              action: 'move'
            });
          } else {
            this._geomHandler({
              coord: evt.coordinate
            });
          }
        }
      }
    }, {
      key: "_createFeature",
      value: function _createFeature(coords, geomType) {
        var feature;
        switch (geomType.toLowerCase()) {
          case 'point':
            feature = new ol.Feature(new ol.geom.Point(coords));
            break;
          case 'linestring':
            feature = new ol.Feature(new ol.geom.LineString(coords));
            break;
          case 'polygon':
            feature = new ol.Feature(new ol.geom.Polygon(coords));
            break;
        }
        return feature;
      }
    }, {
      key: "_geomHandler",
      value: function _geomHandler(p) {
        var geomType = this._config.geometryType.toLowerCase();
        var action = p.action;
        var coord = p.coord;
        var feature;
        switch (geomType) {
          case 'point':
            if (action) {
              feature = this._createFeature(coord, geomType);
              this._source.addFeature(feature);
              this._mouseFeature.setGeometry(this._createFeature([0, 0], 'point').getGeometry());
            } else {
              this._mouseFeature.setGeometry(this._createFeature(coord, geomType).getGeometry());
            }
            break;
          case 'linestring':
            if (action === 'click') {
              if (this._pointsList.length > 1) {
                var pointsMouse = this._pointsList.slice();
                pointsMouse.push(coord);
                feature = this._createFeature(pointsMouse, geomType);
                this._mouseFeature.setGeometry(this._createFeature([0, 0], 'point').getGeometry());
                this._source.addFeature(feature);
                this._pointsList = [];
              } else {
                this._mouseFeature.setGeometry(this._createFeature(coord, 'point').getGeometry());
              }
            } else if (action === 'move') {
              if (this._pointsList.length > 1) {
                var _pointsMouse = this._pointsList.slice();
                _pointsMouse.push(coord);
                this._mouseFeature.setGeometry(this._createFeature(_pointsMouse, geomType).getGeometry());
              } else {
                this._mouseFeature.setGeometry(this._createFeature(coord, geomType).getGeometry());
              }
            } else {
              var _pointsMouse2 = this._pointsList.slice();
              _pointsMouse2.push(coord);
              this._mouseFeature.setGeometry(this._createFeature(_pointsMouse2, geomType).getGeometry());
            }
            break;
          case 'polygon':
            if (action === 'click') {
              if (this._pointsList.length > 1) {
                var _pointsMouse3 = this._pointsList.slice();
                _pointsMouse3.push(coord);
                feature = this._createFeature([_pointsMouse3], geomType);
                this._source.addFeature(feature);
                this._mouseFeature.setGeometry(this._createFeature([0, 0], 'point').getGeometry());
                this._pointsList = [];
              } else {
                this._mouseFeature.setGeometry(this._createFeature(coord, 'point').getGeometry());
              }
            } else if (action === 'move') {
              if (this._pointsList.length > 1) {
                var _pointsMouse4 = this._pointsList.slice();
                _pointsMouse4.push(coord);
                this._mouseFeature.setGeometry(this._createFeature([_pointsMouse4], geomType).getGeometry());
              } else {
                this._mouseFeature.setGeometry(this._createFeature(coord, geomType).getGeometry());
              }
            } else {
              var _pointsMouse5 = this._pointsList.slice();
              _pointsMouse5.push(coord);
              this._mouseFeature.setGeometry(this._createFeature([_pointsMouse5], geomType).getGeometry());
            }
            break;
        }
      }
    }, {
      key: "_distance",
      value: function _distance(p1, p2) {
        return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
      }
    }, {
      key: "_projectPoint",
      value: function _projectPoint(coordinate) {
        return ol.proj.transform(coordinate, this.map.srid, 'EPSG:3857');
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this._btnElement.addEventListener('click', function () {
          return _this3._managerInteractionActions();
        });
        this._inputDistElement.addEventListener('change', function () {
          _this3._config.defaultDistance = parseFloat(_this3._inputDistElement.value);
          console.log(_this3._config.defaultDistance);
        });
        this.map.ol.on('click', function (evt) {
          return _this3._clickHandler(evt);
        });
        this.map.ol.on('pointermove', function (evt) {
          return _this3._moveHandler(evt);
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this._managerInteractionActions();
        this.hide();
      }
    }]);
  }(GeoWidget);

  var CreateGeom = /*#__PURE__*/function (_GeoButton) {
    function CreateGeom(config) {
      var _this;
      _classCallCheck(this, CreateGeom);
      config = config || {};
      config.source = config.source || new ol.source.Vector();
      config.tip = config.tip || 'Criar geometria';
      config.class = config.class || 'map-app-create-geom';
      _this = _callSuper(this, CreateGeom, [config]);
      _this._source = config.source;
      _this._geomType = config.geomType || 'Point';
      _this._feature = config.feature || '';
      _this._layer = null;
      _this._draw = null;
      _this._snap = null;
      return _this;
    }
    _inherits(CreateGeom, _GeoButton);
    return _createClass(CreateGeom, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "click",
      value: function click() {
        this._addDrawInteraction();
        document.getElementById(this.map.elementId).style.cursor = 'crosshair';
        this._removeInteraction();
      }
    }, {
      key: "_addDrawInteraction",
      value: function _addDrawInteraction() {
        this._draw = new ol.interaction.Draw({
          source: this._source,
          type: this._geomType
        });
        this.map.ol.addInteraction(this._draw);
        this._snap = new ol.interaction.Snap({
          source: this._source
        });
        this.map.ol.addInteraction(this._snap);
      }
    }, {
      key: "_removeInteraction",
      value: function _removeInteraction() {
        var _this2 = this;
        this._draw.once('drawend', function (evt) {
          document.getElementById(_this2.map.elementId).style.cursor = 'auto';
          _this2.map.ol.removeInteraction(_this2._draw);
          _this2.map.ol.removeInteraction(_this2._snap);
          _this2._draw = null;
          _this2._snap = null;
        });
      }
    }]);
  }(GeoButton);

  var EditGeom = /*#__PURE__*/function (_GeoTool) {
    function EditGeom(config) {
      var _this;
      _classCallCheck(this, EditGeom);
      config.source = config.source || new ol.source.Vector();
      config.tip = config.tip || 'Editar geometria';
      config.class = config.class || 'map-app-edit-geom';
      _this = _callSuper(this, EditGeom, [config]);
      _this._source = config.source;
      _this._feature = config.feature || '';
      _this._modify = null;
      return _this;
    }
    _inherits(EditGeom, _GeoTool);
    return _createClass(EditGeom, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "activate",
      value: function activate() {
        _get(_getPrototypeOf(EditGeom.prototype), "activate", this).call(this);
        this._modify = new ol.interaction.Modify({
          source: this._source,
          deleteCondition: function deleteCondition(event) {
            var isClick = event.originalEvent.type === 'pointerdown';
            var isCtrl = event.originalEvent.ctrlKey;
            if (isClick && isCtrl) {
              return ol.events.condition.always(event);
            } else {
              return ol.events.condition.never(event);
            }
          }
        });
        this.map.ol.addInteraction(this._modify);
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.map.ol.removeInteraction(this._modify);
        this._modify = null;
        _get(_getPrototypeOf(EditGeom.prototype), "deactivate", this).call(this);
      }
    }]);
  }(GeoTool);

  var MoveGeom = /*#__PURE__*/function (_GeoTool) {
    function MoveGeom(config) {
      var _this;
      _classCallCheck(this, MoveGeom);
      config.source = config.source || new ol.source.Vector();
      config.tip = config.tip || 'Mover geometria';
      config.class = config.class || 'map-app-move-geom';
      _this = _callSuper(this, MoveGeom, [config]);
      _this._source = config.source;
      _this._feature = config.feature || '';
      _this._pointerInteraction = null;
      _this._coordinate = null;
      _this._cursor = 'pointer';
      _this._previousCursor = undefined;
      _this._active = false;
      return _this;
    }
    _inherits(MoveGeom, _GeoTool);
    return _createClass(MoveGeom, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "activate",
      value: function activate() {
        _get(_getPrototypeOf(MoveGeom.prototype), "activate", this).call(this);
        this._drag();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.map.ol.removeInteraction(this._pointerInteraction);
        this._pointerInteraction = null;
        _get(_getPrototypeOf(MoveGeom.prototype), "deactivate", this).call(this);
      }
    }, {
      key: "_drag",
      value: function _drag() {
        this._pointerInteraction = new ol.interaction.Pointer({
          handleDownEvent: this._handleDownEvent,
          handleDragEvent: this._handleDragEvent,
          handleMoveEvent: this._handleMoveEvent,
          handleUpEvent: this._handleUpEvent
        });
        this.map.ol.addInteraction(this._pointerInteraction);
      }
    }, {
      key: "_handleDownEvent",
      value: function _handleDownEvent(evt) {
        var map = evt.map;
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
          return feature;
        });
        if (feature) {
          this._coordinate = evt.coordinate;
          this._feature = feature;
        }
        return !!feature;
      }
    }, {
      key: "_handleDragEvent",
      value: function _handleDragEvent(evt) {
        var deltaX = evt.coordinate[0] - this._coordinate[0];
        var deltaY = evt.coordinate[1] - this._coordinate[1];
        var geometry = this._feature.getGeometry();
        geometry.translate(deltaX, deltaY);
        this._coordinate[0] = evt.coordinate[0];
        this._coordinate[1] = evt.coordinate[1];
      }
    }, {
      key: "_handleMoveEvent",
      value: function _handleMoveEvent(evt) {
        if (this._cursor) {
          var map = evt.map;
          var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
            return feature;
          });
          var element = evt.map.getTargetElement();
          if (feature) {
            if (element.style.cursor != this._cursor) {
              this._previousCursor = element.style.cursor;
              element.style.cursor = this._cursor;
            }
          } else if (this._previousCursor !== undefined) {
            element.style.cursor = this._previousCursor;
            this._previousCursor = undefined;
          }
        }
      }
    }, {
      key: "_handleUpEvent",
      value: function _handleUpEvent() {
        this._coordinate = null;
        this._feature = null;
        return false;
      }
    }]);
  }(GeoTool);

  var RotateGeom = /*#__PURE__*/function (_GeoWidget) {
    function RotateGeom(config) {
      var _this;
      _classCallCheck(this, RotateGeom);
      config = config || {};
      config.tip = config.tip || 'Rotacionar feição';
      config.title = config.title || 'Rotacionar feição';
      config.class = config.class || 'map-app-rotate-geom';
      _this = _callSuper(this, RotateGeom, [config]);
      _this._select = null;
      _this._features = [];
      _this._rotatedFeatures = [];
      _this._layer = null;
      _this._externalSource = config.source;
      _this.ui = "\n            <div class=\"p-3\">\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <div class=\"form-group\">\n                            <label>Selecione a fei\xE7\xE3o que ser\xE1 rotacionada</label><br>\n                            <button id=\"select-btn-".concat(_this.id, "\" type=\"button\" class=\"btn btn-primary\">Selecionar fei\xE7\xE3o</button>\n                            <small id=\"count-text-").concat(_this.id, "\" class=\"pl-2\"> Nenhuma fei\xE7\xE3o selecionada</small>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <div class=\"form-group\">\n                            <label>\xC2ngulo de Rota\xE7\xE3o</label>\n                            <input id=\"ang-input-").concat(_this.id, "\" type=\"number\" class=\"form-control\" placeholder=\"\xC2ngulo de Rota\xE7\xE3o\" value=\"0\" step=\"0.1\" required>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <div class=\"form-group\">\n                            <label>Ponto de Rota\xE7\xE3o</label>\n                            <div class=\"form-check\">\n                                <input id=\"centroid-check-").concat(_this.id, "\" class=\"form-check-input\" type=\"radio\" name=\"rotate-point-").concat(_this.id, "\" value=\"centroid\" checked>\n                                <label class=\"form-check-label\" for=\"centroid-check-").concat(_this.id, "\">\n                                    Centroide\n                                </label>\n                            </div>\n                            <div class=\"form-check\">\n                                <input id=\"first-check-").concat(_this.id, "\" class=\"form-check-input\" type=\"radio\" name=\"rotate-point-").concat(_this.id, "\"  value=\"first\">\n                                <label class=\"form-check-label\" for=\"first-check-").concat(_this.id, "\">\n                                    Primeiro ponto\n                                </label>\n                            </div>\n                            <div class=\"form-check\">\n                                <input id=\"last-check-").concat(_this.id, "\" class=\"form-check-input\" type=\"radio\" name=\"rotate-point-").concat(_this.id, "\" value=\"last\">\n                                <label class=\"form-check-label\" for=\"last-check-").concat(_this.id, "\">\n                                    \xDAltimo ponto\n                                </label>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <div class=\"form-group\">\n                            <label>Fei\xE7\xE3o Rotacionada</label>\n                            <div class=\"form-check\">\n                                <input class=\"form-check-input\" type=\"checkbox\" id=\"copy-check-").concat(_this.id, "\" >\n                                <label class=\"form-check-label\" for=\"copy-check-").concat(_this.id, "\">\n                                Criar como c\xF3pia\n                                </label>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <div class=\"form-group\">\n                            <br>\n                            <button id=\"clear-btn-").concat(_this.id, "\" type=\"button\" class=\"btn btn-secondary btn-block\">Limpar</button>\n                        </div>\n                    </div>\n                    <div class=\"col\">\n                        <div class=\"form-group\">\n                            <br>\n                            <button id=\"run-btn-").concat(_this.id, "\" type=\"button\" class=\"btn btn-primary btn-block\" disabled>Rotacionar</button>\n                        </div>\n                    </div>\n                </div>\n            </div>");
      return _this;
    }
    _inherits(RotateGeom, _GeoWidget);
    return _createClass(RotateGeom, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this._initLayer();
        this._initInteractions();
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
        });
        if (!this._externalSource) console.error('Set a source to RotateGeom.');
      }
    }, {
      key: "_initInteractions",
      value: function _initInteractions() {
        var _this3 = this;
        this._select = new ol.interaction.Select();
        this._select.on('select', function (e) {
          _this3._features = e.target.getFeatures().getArray();
          _this3._handleCountText();
          _this3._runBtn.disabled = false;
        });
      }
    }, {
      key: "_initLayer",
      value: function _initLayer() {
        this._layer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 0, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#f0f',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#f0f'
              })
            })
          })
        });
        this.map.ol.addLayer(this._layer);
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._selectBtn = document.getElementById("select-btn-".concat(this.id));
        this._countTxt = document.getElementById("count-text-".concat(this.id));
        this._angInput = document.getElementById("ang-input-".concat(this.id));
        this._clearBtn = document.getElementById("clear-btn-".concat(this.id));
        this._centroidCheck = document.getElementById("centroid-check-".concat(this.id));
        this._firstCheck = document.getElementById("first-check-".concat(this.id));
        this._lastCheck = document.getElementById("last-check-".concat(this.id));
        this._copyCheck = document.getElementById("copy-check-".concat(this.id));
        this._runBtn = document.getElementById("run-btn-".concat(this.id));
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this4 = this;
        this._selectBtn.addEventListener('click', function () {
          _this4._selectFeaures();
        });
        this._angInput.addEventListener('input', function () {
          _this4._rotateFeaures();
        });
        this._clearBtn.addEventListener('click', function () {
          _this4._clear();
        });
        this._runBtn.addEventListener('click', function () {
          _this4._persist();
        });
        this._firstCheck.addEventListener('click', function () {
          _this4._rotateFeaures();
        });
        this._lastCheck.addEventListener('click', function () {
          _this4._rotateFeaures();
        });
        this._centroidCheck.addEventListener('click', function () {
          _this4._rotateFeaures();
        });
      }
    }, {
      key: "_handleCountText",
      value: function _handleCountText() {
        var count = this._features.length;
        switch (count) {
          case 0:
            this._countTxt.innerHTML = 'Nenhuma feição selecionada.';
            break;
          case 1:
            this._countTxt.innerHTML = 'Feição selecionada.';
            break;
          default:
            this._countTxt.innerHTML = count + ' feições selecionadas.';
            break;
        }
      }
    }, {
      key: "_selectFeaures",
      value: function _selectFeaures() {
        this._selectBtn.disabled = true;
        this.map.ol.addInteraction(this._select);
      }
    }, {
      key: "_clear",
      value: function _clear() {
        this._features = [];
        this._handleCountText();
        this._angInput.value = 0;
        this._rotatedFeatures = [];
        this._runBtn.disabled = true;
        this._layer.getSource().clear();
        this._selectBtn.disabled = false;
        this.map.ol.removeInteraction(this._select);
        this._select.getFeatures().clear();
      }
    }, {
      key: "_rotateFeaures",
      value: function _rotateFeaures() {
        var gf = new ol.format.GeoJSON();
        this._layer.getSource().clear();
        this._rotatedFeatures = [];
        var ang = Number(this._angInput.value || 0);
        var isFirstRef = this._firstCheck.checked;
        var isLastRef = this._lastCheck.checked;
        for (var i = 0; i < this._features.length; i++) {
          this._features[i].getGeometry().transform(this.map.srid, 'EPSG:4326');
          var geom = gf.writeGeometryObject(this._features[i].getGeometry());
          var opt = {};
          if (isFirstRef) opt.pivot = this._features[i].getGeometry().getFirstCoordinate();
          if (isLastRef) opt.pivot = this._features[i].getGeometry().getLastCoordinate();
          var rotateGeom = turf.transformRotate(geom, ang, opt);
          var rotateFeature = gf.readFeatureFromObject(rotateGeom);
          rotateFeature.getGeometry().transform('EPSG:4326', this.map.srid);
          this._layer.getSource().addFeature(rotateFeature);
          this._rotatedFeatures.push(rotateFeature);
          this._features[i].getGeometry().transform('EPSG:4326', this.map.srid);
        }
      }
    }, {
      key: "_persist",
      value: function _persist() {
        var createCopy = this._copyCheck.checked;
        for (var i = 0; i < this._features.length; i++) {
          if (createCopy && this._externalSource) {
            this._externalSource.addFeature(this._rotatedFeatures[i]);
          } else {
            var rotatedFeat = this._rotatedFeatures[i];
            var originalFeat = this._features[i];
            originalFeat.setGeometry(rotatedFeat.getGeometry());
          }
        }
        this._clear();
      }
    }, {
      key: "activate",
      value: function activate() {
        _get(_getPrototypeOf(RotateGeom.prototype), "activate", this).call(this);
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this._clear();
        this.hide();
        _get(_getPrototypeOf(RotateGeom.prototype), "deactivate", this).call(this);
      }
    }]);
  }(GeoWidget);

  var RemoveGeom = /*#__PURE__*/function (_GeoTool) {
    function RemoveGeom(config) {
      var _this;
      _classCallCheck(this, RemoveGeom);
      config.source = config.source || new ol.source.Vector();
      config.tip = config.tip || 'Remover geometria';
      config.class = config.class || 'map-app-remove-geom';
      _this = _callSuper(this, RemoveGeom, [config]);
      _this._source = config.source;
      _this._select = null;
      _this._selectClick = null;
      return _this;
    }
    _inherits(RemoveGeom, _GeoTool);
    return _createClass(RemoveGeom, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "activate",
      value: function activate() {
        _get(_getPrototypeOf(RemoveGeom.prototype), "activate", this).call(this);
        this._addDrawInteraction();
        document.getElementById(this.map.elementId).style.cursor = 'pointer';
      }
    }, {
      key: "_addDrawInteraction",
      value: function _addDrawInteraction() {
        var _this2 = this;
        this._selectClick = new ol.interaction.Select({
          condition: ol.events.condition.click
        });
        this._selectClick.on('select', function (e) {
          _this2._select = e.selected[0];
          _this2._removeFeature();
        });
        this.map.ol.addInteraction(this._selectClick);
      }
    }, {
      key: "_removeFeature",
      value: function _removeFeature() {
        if (this._select) {
          this._source.removeFeature(this._select);
        }
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        document.getElementById(this.map.elementId).style.cursor = 'auto';
        this.map.ol.removeInteraction(this._selectClick);
        this._select = null;
        this._selectClick = null;
        _get(_getPrototypeOf(RemoveGeom.prototype), "deactivate", this).call(this);
      }
    }]);
  }(GeoTool);

  var DuplicateGeom = /*#__PURE__*/function (_GeoTool) {
    function DuplicateGeom(config) {
      var _this;
      _classCallCheck(this, DuplicateGeom);
      config.source = config.source || new ol.source.Vector();
      config.tip = config.tip || 'Duplicar geometria';
      config.class = config.class || 'map-app-duplicate-geom';
      _this = _callSuper(this, DuplicateGeom, [config]);
      _this._source = config.source;
      _this._select = null;
      _this._selectClick = null;
      return _this;
    }
    _inherits(DuplicateGeom, _GeoTool);
    return _createClass(DuplicateGeom, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "activate",
      value: function activate() {
        _get(_getPrototypeOf(DuplicateGeom.prototype), "activate", this).call(this);
        this._addDrawInteraction();
        document.getElementById(this.map.elementId).style.cursor = 'pointer';
      }
    }, {
      key: "_addDrawInteraction",
      value: function _addDrawInteraction() {
        var _this2 = this;
        this._selectClick = new ol.interaction.Select({
          condition: ol.events.condition.click
        });
        this._selectClick.on('select', function (e) {
          _this2._select = e.selected[0];
          _this2._removeFeature();
        });
        this.map.ol.addInteraction(this._selectClick);
      }
    }, {
      key: "_removeFeature",
      value: function _removeFeature() {
        if (this._select) {
          var copy = this._select.clone();
          this._source.addFeature(copy);
        }
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        document.getElementById(this.map.elementId).style.cursor = 'auto';
        this.map.ol.removeInteraction(this._selectClick);
        this._select = null;
        this._selectClick = null;
        _get(_getPrototypeOf(DuplicateGeom.prototype), "deactivate", this).call(this);
      }
    }]);
  }(GeoTool);

  var MultiPolygonToPolygon = /*#__PURE__*/function (_GeoTool) {
    function MultiPolygonToPolygon(config) {
      var _this;
      _classCallCheck(this, MultiPolygonToPolygon);
      config.source = config.source || new ol.source.Vector();
      config.tip = config.tip || 'Transformar multpolygon para polygon';
      config.class = config.class || 'map-app-multi-to-poly';
      _this = _callSuper(this, MultiPolygonToPolygon, [config]);
      _this._source = config.source;
      _this._select = null;
      _this._selectClick = null;
      return _this;
    }
    _inherits(MultiPolygonToPolygon, _GeoTool);
    return _createClass(MultiPolygonToPolygon, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "activate",
      value: function activate() {
        _get(_getPrototypeOf(MultiPolygonToPolygon.prototype), "activate", this).call(this);
        this._addSelectInteraction();
        document.getElementById(this.map.elementId).style.cursor = 'pointer';
      }
    }, {
      key: "_addSelectInteraction",
      value: function _addSelectInteraction() {
        var _this2 = this;
        this._selectClick = new ol.interaction.Select({
          condition: ol.events.condition.click
        });
        this._selectClick.on('select', function (e) {
          _this2._select = e.selected[0];
          _this2._transformFeature();
        });
        this.map.ol.addInteraction(this._selectClick);
      }
    }, {
      key: "_transformFeature",
      value: function _transformFeature() {
        var _this3 = this;
        if (this._select && this._select.getGeometry().getType() === 'MultiPolygon') {
          this._select.getGeometry().getPolygons().forEach(function (polygon) {
            var poly = new ol.geom.Polygon(polygon.getCoordinates().slice());
            var feat = new ol.Feature(poly);
            _this3._source.addFeature(feat);
          });
          this._source.removeFeature(this._select);
        }
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        document.getElementById(this.map.elementId).style.cursor = 'auto';
        this.map.ol.removeInteraction(this._selectClick);
        this._select = null;
        this._selectClick = null;
        _get(_getPrototypeOf(MultiPolygonToPolygon.prototype), "deactivate", this).call(this);
      }
    }]);
  }(GeoTool);

  var PolygonToMultiPolygon = /*#__PURE__*/function (_GeoWidget) {
    function PolygonToMultiPolygon(config) {
      var _this;
      _classCallCheck(this, PolygonToMultiPolygon);
      config.source = config.source || new ol.source.Vector();
      config.tip = config.tip || 'Transformar polygon para multpolygon';
      config.title = config.title || 'Transformar polygon para multpolygon';
      config.class = config.class || 'map-app-poly-to-multi';
      _this = _callSuper(this, PolygonToMultiPolygon, [config]);
      _this._source = config.source;
      _this._selectClick = null;
      _this._multiPolygon = null;
      _this._btnTransform = null;
      _this.ui = _this._getUiTemplate();
      return _this;
    }
    _inherits(PolygonToMultiPolygon, _GeoWidget);
    return _createClass(PolygonToMultiPolygon, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
        this._addSelectInteraction();
        document.getElementById(this.map.elementId).style.cursor = 'pointer';
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        return "\n        <div class='m-0 p-3 d-flex flex-column'>\n          <p>Pressione Shift e selecione as geometrias <br /> que voc\xEA deseja transformar.</p>\n          <br />\n          <button id=\"map-app-transform-ptm-".concat(this.id, "\" class=\"btn btn-primary\">Transformar</button>\n        </div>\n      ");
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._btnTransform = document.getElementById("map-app-transform-ptm-".concat(this.id));
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this._btnTransform.addEventListener('click', function () {
          return _this3._transformFeature();
        });
      }
    }, {
      key: "_addSelectInteraction",
      value: function _addSelectInteraction() {
        this._selectClick = new ol.interaction.Select({
          condition: ol.events.condition.click,
          multi: true
        });
        this.map.ol.addInteraction(this._selectClick);
      }
    }, {
      key: "_transformFeature",
      value: function _transformFeature() {
        var _this4 = this;
        var features = this._selectClick.getFeatures().array_;
        if (features.length >= 2) {
          var isDiferent = features.find(function (poly) {
            return poly.getGeometry().getType() != 'Polygon';
          });
          if (isDiferent) {
            this.map.notify("Geometria selecionada não é do tipo Polygon.");
            return;
          }
          var geometries = features.map(function (poly) {
            return poly.getGeometry().clone();
          });
          this._multiPolygon = new ol.geom.MultiPolygon(geometries);
          var feat = new ol.Feature(this._multiPolygon);
          this._source.addFeature(feat);
          features.forEach(function (oldFeauture) {
            _this4._source.removeFeature(oldFeauture);
          });
        } else {
          this.map.notify("Selecione pelo menos 2 geometrias.");
        }
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        document.getElementById(this.map.elementId).style.cursor = 'auto';
        this.map.ol.removeInteraction(this._selectClick);
        this._selectClick = null;
        this._multiPolygon = null;
        this.hide();
      }
    }]);
  }(GeoWidget);

  var PointsByDistSegment = /*#__PURE__*/function (_GeoWidget) {
    function PointsByDistSegment(config) {
      var _this;
      _classCallCheck(this, PointsByDistSegment);
      config = config || {};
      config.tip = config.tip || 'PointsByDistSegment';
      config.title = config.title || 'PointsByDistSegment';
      config.class = config.class || 'point-by-dist-segment';
      config.geometryType = 'linestring';
      config.defaultDistance = config.defaultDistance || 1;
      config.defaultUnits = config.defaultUnits || 'm';
      _this = _callSuper(this, PointsByDistSegment, [config]);
      _this._source = config.source || new ol.source.Vector();
      _this._isListening = false;
      _this._lastPoint = null;
      _this._feature = new ol.Feature(null);
      _this._mouseFeature = new ol.Feature(null);
      _this._pointsList = [];
      _this.ui = _this._getUiTemplate();
      return _this;
    }
    _inherits(PointsByDistSegment, _GeoWidget);
    return _createClass(PointsByDistSegment, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
          _this2._initInternalLayer();
        });
      }
    }, {
      key: "_initInternalLayer",
      value: function _initInternalLayer() {
        this._vectorLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0ff',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0ff'
              })
            })
          })
        });
        this._vectorLayer.setZIndex(99999);
        this._vectorLayer.getSource().addFeature(this._mouseFeature);
        map.ol.addLayer(this._vectorLayer);
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        return "\n            <div class='m-0 p-3'>\n\n                <p class='map-app-measure-tip'>Digite a dist\xE2ncia desejada e insira um segmento no mapa.</p>\n\n                <div class='row pt-1 pb-1 pl-3 pr-3'>\n\n                    <div class=\"input-group input-group-sm mb-3\">\n                        <input id=\"map-app-point-dist-input-".concat(this.id, "\" min=\"0.01\" type=\"number\" value=\"").concat(this._config.defaultDistance, "\" class=\"form-control\">\n                        <div class=\"input-group-prepend\">\n                            <span class=\"input-group-text\" id=\"inputGroup-sizing-sm\">metros</span>\n                        </div>\n                    </div>\n\n                </div>\n\n                <div class='row pt-1 pb-1 pl-3 pr-3'>\n\n                   <button id=\"map-app-point-dist-btn-").concat(this.id, "\" class=\"btn btn-dark btn-block btn-sm\">Inserir Segmento</button>\n\n                </div>\n\n            </div>\n        ");
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._inputDistElement = document.getElementById("map-app-point-dist-input-".concat(this.id));
        this._btnElement = document.getElementById("map-app-point-dist-btn-".concat(this.id));
      }
    }, {
      key: "_managerInteractionActions",
      value: function _managerInteractionActions() {
        if (!this._isRunning) {
          this._isRunning = true;
          this._btnElement.innerHTML = 'Parar';
          document.getElementById(this.map.elementId).style.cursor = 'crosshair';
        } else {
          this._isRunning = false;
          this._btnElement.innerHTML = 'Iniciar';
          document.getElementById(this.map.elementId).style.cursor = 'auto';
          this._mouseFeature.setGeometry(this._createFeature([0, 0], 'point').getGeometry());
          this._pointsList = [];
        }
      }
    }, {
      key: "_clickHandler",
      value: function _clickHandler(evt) {
        if (this._isRunning) {
          this._isListening = !this._isListening;
          this._lastPoint = this._projectPoint(evt.coordinate);
          this._pointsList.push(this._lastPoint);
          this._geomHandler({
            coord: evt.coordinate,
            action: 'click'
          });
        }
      }
    }, {
      key: "_moveHandler",
      value: function _moveHandler(evt) {
        if (this._isRunning) {
          this._geomHandler({
            coord: evt.coordinate
          });
        }
      }
    }, {
      key: "_createFeature",
      value: function _createFeature(coords, geomType) {
        var feature;
        switch (geomType.toLowerCase()) {
          case 'point':
            feature = new ol.Feature(new ol.geom.Point(coords));
            break;
          case 'linestring':
            feature = new ol.Feature(new ol.geom.LineString(coords));
            break;
          case 'polygon':
            feature = new ol.Feature(new ol.geom.Polygon(coords));
            break;
        }
        return feature;
      }
    }, {
      key: "_geomHandler",
      value: function _geomHandler(p) {
        var geomType = this._config.geometryType.toLowerCase();
        var action = p.action;
        var coord = p.coord;
        if (action === 'click') {
          if (this._pointsList.length > 1) {
            var pointsMouse = this._pointsList.slice();
            pointsMouse.push(coord);
            //feature = this._createFeature(pointsMouse, geomType);

            this._mouseFeature.setGeometry(this._createFeature([0, 0], 'point').getGeometry());
            // this._source.addFeature(feature);

            this._calculatePoints();
            this._pointsList = [];
          } else {
            var _pointsMouse = this._pointsList.slice();
            _pointsMouse.push(coord);
            this._mouseFeature.setGeometry(this._createFeature(_pointsMouse, geomType).getGeometry());
          }
        } else {
          var _pointsMouse2 = this._pointsList.slice();
          _pointsMouse2.push(coord);
          this._mouseFeature.setGeometry(this._createFeature(_pointsMouse2, geomType).getGeometry());
        }
      }
    }, {
      key: "_calculatePoints",
      value: function _calculatePoints() {
        var p1 = this._pointsList[0];
        var p2 = this._pointsList[1];
        var distance = this._distance(p1, p2);
        if (this._config.defaultDistance > distance) {
          this.map.notify("Distância entre os pontos do segmento é menor que a distância mínima entre os pontos.");
          return;
        }
        var numPtsSegmento = Math.floor(distance / this._config.defaultDistance);
        var azimuth = this._azimuthBetweenPoints(p1, p2);
        for (var i = 0; i <= numPtsSegmento; i++) {
          var coords = this._pointAzDist(p1, azimuth, this._config.defaultDistance * i);
          var feature = this._createFeature(coords, 'point');
          this._source.addFeature(feature);
        }
      }
    }, {
      key: "_azimuthBetweenPoints",
      value: function _azimuthBetweenPoints(p1, p2) {
        return Math.atan2(p2[0] - p1[0], p2[1] - p1[1]);
      }
    }, {
      key: "_pointAzDist",
      value: function _pointAzDist(p0, az, dist) {
        var x = p0[0] + dist * Math.sin(az);
        var y = p0[1] + dist * Math.cos(az);
        return [x, y];
      }
    }, {
      key: "_distance",
      value: function _distance(p1, p2) {
        return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
      }
    }, {
      key: "_projectPoint",
      value: function _projectPoint(coordinate) {
        return ol.proj.transform(coordinate, this.map.srid, 'EPSG:3857');
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this._btnElement.addEventListener('click', function () {
          return _this3._managerInteractionActions();
        });
        this._inputDistElement.addEventListener('change', function () {
          _this3._config.defaultDistance = parseFloat(_this3._inputDistElement.value);
          console.log(_this3._config.defaultDistance);
        });
        this.map.ol.on('click', function (evt) {
          return _this3._clickHandler(evt);
        });
        this.map.ol.on('pointermove', function (evt) {
          return _this3._moveHandler(evt);
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this._managerInteractionActions();
        this.hide();
      }
    }]);
  }(GeoWidget);

  var GeomFromWKT = /*#__PURE__*/function (_GeoWidget) {
    function GeomFromWKT(config) {
      var _this;
      _classCallCheck(this, GeomFromWKT);
      config = config || {};
      config.tip = config.tip || 'GeomFromWKT';
      config.title = config.title || 'GeomFromWKT';
      config.class = config.class || 'geom-from-wkt';
      config.geometryType = 'linestring';
      config.defaultDistance = config.defaultDistance || 1;
      config.defaultUnits = config.defaultUnits || 'm';
      _this = _callSuper(this, GeomFromWKT, [config]);
      _this._source = config.source || new ol.source.Vector();
      _this._isListening = false;
      _this._lastPoint = null;
      _this._feature = new ol.Feature(null);
      _this._mouseFeature = new ol.Feature(null);
      _this._pointsList = [];
      _this.ui = _this._getUiTemplate();
      return _this;
    }
    _inherits(GeomFromWKT, _GeoWidget);
    return _createClass(GeomFromWKT, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
          _this2._initInternalLayer();
        });
      }
    }, {
      key: "_initInternalLayer",
      value: function _initInternalLayer() {
        this._vectorLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0ff',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0ff'
              })
            })
          })
        });
        this._vectorLayer.setZIndex(99999);
        this._vectorLayer.getSource().addFeature(this._mouseFeature);
        map.ol.addLayer(this._vectorLayer);
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        return "\n        <div class='m-0 p-3'>\n\n            <div class=\"row\">\n        \n                <div class=\"col\">\n                    <label for=\"map-app-pbi-wkt-".concat(this.id, "\">WKT</label>\n                    <input type=\"text\" class=\"form-control\" id=\"map-app-pbi-wkt-").concat(this.id, "\">\n                </div>\n        \n                <div class=\"col-4\">\n                    <label for=\"map-app-pbi-src-").concat(this.id, "\">SRC</label>\n                    <select id=\"map-app-pbi-src-").concat(this.id, "\" class=\"form-control\">\n                        <option value=\"EPSG:3857\" selected>Pseudo Mercator - SIRGAS 2000</option>\n                        <option value=\"EPSG:4326\">Lon, Lat - SIRGAS 2000</option>\n                    </select>\n                </div>\n        \n                <div class=\"col-2\">\n                    <label style=\"color: #fff\"> _</label>\n                    <br>\n                    <button id=\"map-app-pbi-add-wkt-").concat(this.id, "\" class=\"btn btn-primary\">Add</button>\n                </div>\n            </div>\n        </div>\n        ");
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._inputWktElement = document.getElementById("map-app-pbi-wkt-".concat(this.id));
        this._btnAddWktElement = document.getElementById("map-app-pbi-add-wkt-".concat(this.id));
        this._selectSrcElement = document.getElementById("map-app-pbi-src-".concat(this.id));
      }
    }, {
      key: "_createFromWkt",
      value: function _createFromWkt(wkt) {
        try {
          var format = new ol.format.WKT();
          var feature = format.readFeature(wkt, {
            dataProjection: this._selectSrcElement.value || 'EPSG:4326',
            featureProjection: this.map.ol.getView().getProjection().getCode()
          });
          this._source.addFeature(feature);
        } catch (e) {
          this.map.notify("Não foi possível inserir a geometria desejada.<br> WKT mal formatado.");
        }
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this._btnAddWktElement.addEventListener('click', function () {
          var wkt = _this3._inputWktElement.value;
          _this3._createFromWkt(wkt);
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
      }
    }]);
  }(GeoWidget);

  var PointFromTopo = /*#__PURE__*/function (_GeoWidget) {
    function PointFromTopo(config) {
      var _this;
      _classCallCheck(this, PointFromTopo);
      config = config || {};
      config.tip = config.tip || 'PointFromTopo';
      config.title = config.title || 'PointFromTopo';
      config.class = config.class || 'point-from-topo';
      config.geometryType = 'linestring';
      config.defaultDistance = config.defaultDistance || 1;
      config.defaultUnits = config.defaultUnits || 'm';
      _this = _callSuper(this, PointFromTopo, [config]);
      _this._source = config.source || new ol.source.Vector();
      _this._feature = null;
      _this.ui = _this._getUiTemplate();
      return _this;
    }
    _inherits(PointFromTopo, _GeoWidget);
    return _createClass(PointFromTopo, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
        });
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        return "\n        <div class='m-0 p-3'>\n\n            <div class=\"row\">\n        \n                <div class=\"col\">\n                    <label for=\"map-app-pbi-wkt-".concat(this.id, "\">WKT</label>\n                    <input type=\"text\" class=\"form-control\" id=\"map-app-pbi-wkt-").concat(this.id, "\">\n                </div>\n        \n                <div class=\"col\">\n                    <label for=\"map-app-pbi-src-").concat(this.id, "\">SRC</label>\n                    <select id=\"map-app-pbi-src-").concat(this.id, "\" class=\"form-control\">\n                        <option value=\"EPSG:3857\" selected>Pseudo Mercator - SIRGAS 2000</option>\n                        <option value=\"EPSG:4326\">(Lon, Lat) - SIRGAS 2000</option>\n                    </select>\n                </div>\n        \n               \n            </div>\n\n            <div class=\"row pt-3\">\n        \n                <div class=\"col\">\n                    <label for=\"map-app-pbi-dist-").concat(this.id, "\">Dist\xE2ncia (m)</label>\n                    <input type=\"number\" class=\"form-control\" id=\"map-app-pbi-dist-").concat(this.id, "\">\n                </div>\n        \n                <div class=\"col\">\n                    <label for=\"map-app-pbi-az-").concat(this.id, "\">Azimute (gd)</label>\n                    <input type=\"number\" class=\"form-control\" id=\"map-app-pbi-az-").concat(this.id, "\">\n                </div>\n        \n                <div class=\"col-3\">\n                    <label style=\"color: #fff\"> _</label>\n                    <br>\n                    <button id=\"map-app-pbi-calc-").concat(this.id, "\" class=\"btn btn-primary btn-block\">Calcular</button>\n                </div>\n            </div>\n        </div>\n        ");
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._inputWktElement = document.getElementById("map-app-pbi-wkt-".concat(this.id));
        this._btnCalcElement = document.getElementById("map-app-pbi-calc-".concat(this.id));
        this._selectSrcElement = document.getElementById("map-app-pbi-src-".concat(this.id));
        this._inputAzElement = document.getElementById("map-app-pbi-az-".concat(this.id));
        this._inputDistElement = document.getElementById("map-app-pbi-dist-".concat(this.id));
      }
    }, {
      key: "_createFromWkt",
      value: function _createFromWkt(wkt) {
        try {
          var format = new ol.format.WKT();
          this._feature = format.readFeature(wkt, {
            dataProjection: this._selectSrcElement.value || 'EPSG:4326',
            featureProjection: this.map.ol.getView().getProjection().getCode()
          });
          if (this._feature.getGeometry().getType().toLocaleLowerCase() === 'point') {
            //this._source.addFeature(this._feature);
            this._calculatePoint();
          } else {
            throw "O WKT inserido não é do tipo ponto.";
          }
        } catch (e) {
          this.map.notify("Não foi possível inserir a geometria desejada.<br> WKT mal formatado ou não é um ponto.");
        }
      }
    }, {
      key: "_projectPoint",
      value: function _projectPoint(coordinate) {
        return ol.proj.transform(coordinate, this.map.srid, 'EPSG:3857');
      }
    }, {
      key: "_calculatePoint",
      value: function _calculatePoint() {
        var projCoords = this._projectPoint(this._feature.getGeometry().getCoordinates());
        var dist = parseFloat(this._inputDistElement.value);
        var ang = parseFloat(this._inputAzElement.value);
        if (projCoords && dist > 0 && ang >= 0) {
          var newCoords = this._pointAzDist(projCoords, ang, dist);
          var feature = new ol.Feature(new ol.geom.Point(newCoords));
          this._source.addFeature(feature);
        } else {
          this.map.notify('Preencha os campos');
        }
      }
    }, {
      key: "_pointAzDist",
      value: function _pointAzDist(firstPoint, az, dist) {
        az = az * Math.PI / 180;
        var x = firstPoint[0] + Math.sin(az) * dist;
        var y = firstPoint[1] + Math.cos(az) * dist;
        return [x, y];
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this._btnCalcElement.addEventListener('click', function () {
          var wkt = _this3._inputWktElement.value;
          _this3._createFromWkt(wkt);
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
      }
    }]);
  }(GeoWidget);

  var CreateBezierCurve = /*#__PURE__*/function (_GeoWidget) {
    function CreateBezierCurve(config) {
      var _this;
      _classCallCheck(this, CreateBezierCurve);
      config = config || {};
      config.tip = config.tip || 'CreateBelzierCurve';
      config.title = config.title || 'CreateBelzierCurve';
      config.class = config.class || 'create-belzier-curve';
      config.geometryType = 'linestring';
      config.defaultDistance = config.defaultDistance || 1;
      config.defaultUnits = config.defaultUnits || 'm';
      _this = _callSuper(this, CreateBezierCurve, [config]);
      _this._source = config.source || new ol.source.Vector();
      _this._isListening = false;
      _this._lastPoint = null;
      _this._bezierFeature = new ol.Feature(null);
      _this._mouseFeature = new ol.Feature(null);
      _this._pointsList = [];
      _this._sharpness = 0.85;
      _this._resolution = 1000;
      _this.ui = _this._getUiTemplate();
      return _this;
    }
    _inherits(CreateBezierCurve, _GeoWidget);
    return _createClass(CreateBezierCurve, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
          _this2._initInternalLayer();
        });
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        return "\n            <div class='m-0 p-3' style=\"max-width:400px\">\n\n                <p class='map-app-measure-tip'>Clique em iniciar e selecione um conjunto de pontos no mapa.</p>\n            \n                <div class='row pt-1 pb-1 pl-3 pr-3'>\n            \n                    <div class=\"col-12\">\n            \n                        <div class=\"input-group mb-2\">\n                            <div class=\"input-group-prepend\">\n                                <div class=\"input-group-text\">Suaviza\xE7\xE3o</div>\n                            </div>\n                            <input type=\"number\" class=\"form-control\" id=\"map-app-sharpness-".concat(this.id, "\" min=\"0\" step=\"0.1\" value=\"").concat(this._sharpness, "\">\n                        </div>\n                    </div>\n            \n                    <div class=\"col-12\">\n            \n                        <div class=\"input-group mb-2\">\n                            <div class=\"input-group-prepend\">\n                                <div class=\"input-group-text\">Resolu\xE7\xE3o</div>\n                            </div>\n                            <input type=\"number\" class=\"form-control\" id=\"map-app-resolution-").concat(this.id, "\" min=\"1\" value=\"").concat(this._resolution, "\">\n                        </div>\n                    </div>\n            \n                </div>\n            \n                <div class='row pt-1 pb-1 pl-3 pr-3'>\n            \n                    <button id=\"map-app-btn-").concat(this.id, "\" class=\"btn btn-dark btn-block btn-sm\">Selecionar Elementos</button>\n            \n                </div>\n            \n            </div>\n        ");
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._btnElement = document.getElementById("map-app-btn-".concat(this.id));
        this._sharpnessElement = document.getElementById("map-app-sharpness-".concat(this.id));
        this._resolutionElement = document.getElementById("map-app-resolution-".concat(this.id));
      }
    }, {
      key: "_addInteractions",
      value: function _addInteractions() {
        var _this3 = this;
        this._source.addFeature(this._bezierFeature);
        this._select = new ol.interaction.Select();
        this.map.ol.addInteraction(this._select);
        this._selectedFeatures = this._select.getFeatures();
        this._dragBox = new ol.interaction.DragBox({
          condition: ol.events.conditionplatformModifierKeyOnly
        });
        this.map.ol.addInteraction(this._dragBox);
        this._dragBox.on('boxend', function () {
          // features that intersect the box geometry are added to the
          // collection of selected features

          // if the view is not obliquely rotated the box geometry and
          // its extent are equalivalent so intersecting features can
          // be added directly to the collection
          var rotation = _this3.map.ol.getView().getRotation();
          var oblique = rotation % (Math.PI / 2) !== 0;
          var candidateFeatures = oblique ? [] : _this3._selectedFeatures;
          var extent$$1 = _this3._dragBox.getGeometry().getExtent();
          _this3._source.forEachFeatureIntersectingExtent(extent$$1, function (feature) {
            candidateFeatures.push(feature);
          });

          // when the view is obliquely rotated the box extent will
          // exceed its geometry so both the box and the candidate
          // feature geometries are rotated around a common anchor
          // to confirm that, with the box geometry aligned with its
          // extent, the geometries intersect
          if (oblique) {
            var anchor = [0, 0];
            var geometry = _this3._dragBox.getGeometry().clone();
            geometry.rotate(-rotation, anchor);
            var extent$1 = geometry.getExtent();
            candidateFeatures.forEach(function (feature) {
              var geometry = feature.getGeometry().clone();
              geometry.rotate(-rotation, anchor);
              if (geometry.intersectsExtent(extent$1)) {
                selectedFeatures.push(feature);
              }
            });
          }
        });
        this._dragBox.on('boxstart', function () {
          _this3._selectedFeatures.clear();
        });
        this.map.ol.on('pointerup', function () {
          setTimeout(function () {
            _this3._drawBezier();
          }, 200);
        });
      }
    }, {
      key: "_initInternalLayer",
      value: function _initInternalLayer() {
        this._vectorLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0ff',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0ff'
              })
            })
          })
        });
        this._vectorLayer.setZIndex(99999);
        this._vectorLayer.getSource().addFeature(this._mouseFeature);
        map.ol.addLayer(this._vectorLayer);
      }
    }, {
      key: "_drawBezier",
      value: function _drawBezier() {
        if (this._selectedFeatures.getLength() > 0) {
          var geoJsonFormat = new ol.format.GeoJSON();
          var features = this._selectedFeatures.getArray();
          var pointFeatures = [];
          features.forEach(function (feature) {
            var featureType = feature.getGeometry().getType().toLocaleLowerCase();
            if (featureType === 'point') {
              pointFeatures.push(feature);
            }
          });
          if (pointFeatures.length > 2) {
            var lineArray = pointFeatures.map(function (point) {
              return point.getGeometry().getCoordinates();
            });
            var bezier = turf.bezierSpline(turf.lineString(lineArray), {
              resolution: this._resolution,
              sharpness: this._sharpness
            });
            var bf = geoJsonFormat.readFeatureFromObject(bezier);
            this._bezierFeature.setGeometry(bf.getGeometry());
          }
        }
      }
    }, {
      key: "_actionsHandler",
      value: function _actionsHandler() {
        this._addInteractions();
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this4 = this;
        this._btnElement.addEventListener('click', function () {
          return _this4._actionsHandler();
        });
        this._sharpnessElement.addEventListener('change', function () {
          _this4._sharpness = parseFloat(_this4._sharpnessElement.value);
          _this4._drawBezier();
        });
        this._resolutionElement.addEventListener('change', function () {
          _this4._resolution = parseFloat(_this4._resolutionElement.value);
          _this4._drawBezier();
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
      }
    }]);
  }(GeoWidget);

  var UndoGeom = /*#__PURE__*/function (_GeoButton) {
    function UndoGeom(config) {
      var _this;
      _classCallCheck(this, UndoGeom);
      config = config || {};
      config.tip = config.tip || 'Voltar posição';
      config.class = config.class || 'map-app-undo-geom';
      _this = _callSuper(this, UndoGeom, [config]);
      _this._source = config.source;
      _this._stateHistory = config.stateHistory, _this._stateHistoryRedo = config.stateHistoryRedo;
      return _this;
    }
    _inherits(UndoGeom, _GeoButton);
    return _createClass(UndoGeom, [{
      key: "initialize",
      value: function initialize() {
        this._registerEvents();
      }
    }, {
      key: "click",
      value: function click() {
        this._undoGeomState();
      }
    }, {
      key: "_undoGeomState",
      value: function _undoGeomState() {
        if (this._stateHistory.length > 0) {
          var lastState = this._stateHistory[this._stateHistory.length - 1];
          if (lastState.action === 'addfeature') {
            this._source.removeFeature(lastState.feature);
          } else if (lastState.action === 'removefeature') {
            this._source.addFeature(lastState.feature);
          }
          this._stateHistoryRedo.push(this._stateHistory[this._stateHistory.length - 1]);
          if (this._stateHistoryRedo.length > 20) {
            this._stateHistoryRedo.shift();
          }
          this._stateHistory.pop();
          this._stateHistory.pop();
        }
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var self = this;
        window.addEventListener('keyup', function (e) {
          if (e.which == 90 && e.altKey) {
            self._undoGeomState();
          }
        });
      }
    }]);
  }(GeoButton);

  var RedoGeom = /*#__PURE__*/function (_GeoButton) {
    function RedoGeom(config) {
      var _this;
      _classCallCheck(this, RedoGeom);
      config = config || {};
      config.tip = config.tip || 'Avançar posição';
      config.class = config.class || 'map-app-redo-geom';
      _this = _callSuper(this, RedoGeom, [config]);
      _this._source = config.source;
      _this._stateHistory = config.stateHistory, _this._stateHistoryRedo = config.stateHistoryRedo;
      return _this;
    }
    _inherits(RedoGeom, _GeoButton);
    return _createClass(RedoGeom, [{
      key: "initialize",
      value: function initialize() {
        this._registerEvents();
      }
    }, {
      key: "click",
      value: function click() {
        this._redoGeomState();
      }
    }, {
      key: "_redoGeomState",
      value: function _redoGeomState() {
        if (this._stateHistoryRedo.length > 0) {
          var lastState = this._stateHistoryRedo[this._stateHistoryRedo.length - 1];
          if (lastState.action === 'addfeature') {
            this._source.removeFeature(lastState.feature);
          } else if (lastState.action === 'removefeature') {
            this._source.addFeature(lastState.feature);
          }
          this._stateHistoryRedo.pop();
        }
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var self = this;
        window.addEventListener('keyup', function (e) {
          if (e.which == 89 && e.altKey) {
            self._redoGeomState();
          }
        });
      }
    }]);
  }(GeoButton);

  var Eaves = /*#__PURE__*/function (_GeoWidget) {
    function Eaves(config) {
      var _this;
      _classCallCheck(this, Eaves);
      config = config || {};
      config.tip = config.tip || 'Eaves';
      config.title = config.title || 'Eaves';
      config.class = config.class || 'eaves';
      config.defaultDistance = config.defaultDistance || 0.5;
      _this = _callSuper(this, Eaves, [config]);
      _this._mainFeature = config.mainFeature || new ol.Feature();
      _this._eavesFeature = config.eavesFeature || new ol.Feature();
      _this._lastPoint = null;
      _this._feature = new ol.Feature(null);
      _this._mouseFeature = new ol.Feature(null);
      _this._pointsList = [];
      _this.ui = _this._getUiTemplate();
      return _this;
    }
    _inherits(Eaves, _GeoWidget);
    return _createClass(Eaves, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
          _this2._initInternalLayer();
        });
      }
    }, {
      key: "_initInternalLayer",
      value: function _initInternalLayer() {
        this._vectorLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0ff',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0ff'
              })
            })
          })
        });
        this._vectorLayer.setZIndex(99999);
        this._vectorLayer.getSource().addFeature(this._mouseFeature);
        map.ol.addLayer(this._vectorLayer);
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        return "\n            <div class='m-0 p-3'>\n\n                <p class='map-app-measure-tip'>Digite o tamanho do beiral. </p>\n\n                <div class='row pt-1 pb-1 pl-3 pr-3'>\n\n                    <div class=\"input-group input-group-sm mb-3\">\n                        <input id=\"map-app-input-".concat(this.id, "\" min=\"0.01\" step=\"0.1\" type=\"number\" value=\"").concat(this._config.defaultDistance, "\" class=\"form-control\">\n                        <div class=\"input-group-prepend\">\n                            <span class=\"input-group-text\" id=\"inputGroup-sizing-sm\">metros</span>\n                        </div>\n                    </div>\n\n                </div>\n\n                <div class='row pt-1 pb-1 pl-3 pr-3'>\n\n                   <button id=\"map-app-btn-").concat(this.id, "\" class=\"btn btn-dark btn-block btn-sm\">Iniciar</button>\n\n                </div>\n\n            </div>\n        ");
      }
    }, {
      key: "_generateEaves",
      value: function _generateEaves() {
        if (this._mainFeature.getGeometry()) {
          var f = new ol.format.GeoJSON();
          this._mainFeature.getGeometry().transform(this.map.srid, 'EPSG:4326');
          var mainCoords, mainPolygon, mainPolygonBuffered, eavesPolygon, mainLineString, mainPolyEaves;
          var bufferSize = parseFloat(this._inputElement.value);
          if (this._mainFeature.getGeometry().getType().toLowerCase() === 'multipolygon') {
            mainCoords = this._mainFeature.getGeometry().getCoordinates()[0];
          } else {
            mainCoords = this._mainFeature.getGeometry().getCoordinates();
          }
          mainPolygon = turf.polygon(mainCoords);
          mainLineString = turf.lineString(mainCoords[0]);
          mainPolygonBuffered = turf.buffer(mainLineString, bufferSize, {
            units: 'meters',
            steps: 256
          });
          eavesPolygon = turf.intersect(mainPolygonBuffered, mainPolygon);
          mainPolyEaves = turf.difference(mainPolygon, eavesPolygon);
          var mainFeature = f.readFeatureFromObject(mainPolyEaves);
          mainFeature.getGeometry().transform('EPSG:4326', this.map.srid);
          var eavesFeature = f.readFeatureFromObject(eavesPolygon);
          eavesFeature.getGeometry().transform('EPSG:4326', this.map.srid);
          this._mainFeature.setGeometry(mainFeature.getGeometry());
          this._eavesFeature.setGeometry(eavesFeature.getGeometry());
        }
      }
    }, {
      key: "_clearPolygon",
      value: function _clearPolygon(poly, cutLine) {
        return poly;
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._inputElement = document.getElementById("map-app-input-".concat(this.id));
        this._btnElement = document.getElementById("map-app-btn-".concat(this.id));
      }
    }, {
      key: "_managerInteractionActions",
      value: function _managerInteractionActions() {
        this._generateEaves();
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this._btnElement.addEventListener('click', function () {
          return _this3._managerInteractionActions();
        });
        this._inputElement.addEventListener('change', function () {
          _this3._config.defaultDistance = parseFloat(_this3._inputElement.value);
          console.log(_this3._config.defaultDistance);
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
      }
    }]);
  }(GeoWidget);

  var GuideLines = /*#__PURE__*/function (_GeoWidget) {
    function GuideLines(config) {
      var _this;
      _classCallCheck(this, GuideLines);
      config = config || {};
      config.tip = config.tip || 'GuideLines';
      config.title = config.title || 'GuideLines';
      config.class = config.class || 'guide-lines';
      config.geometryType = 'linestring';
      config.defaultDistance = config.defaultDistance || 1;
      config.defaultUnits = config.defaultUnits || 'm';
      _this = _callSuper(this, GuideLines, [config]);
      _this._source = config.source || new ol.source.Vector();
      _this._orthoPointFeature = null;
      _this._feature1 = new ol.Feature();
      _this._feature2 = new ol.Feature();
      _this._orthoPointFeature = new ol.Feature();
      _this._segment = new ol.Feature();
      _this._selectClick = null;
      _this.ui = _this._getUiTemplate();
      return _this;
    }
    _inherits(GuideLines, _GeoWidget);
    return _createClass(GuideLines, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
          _this2._initInternalLayer();
          _this2._initInteractions();
        });
      }
    }, {
      key: "_initInteractions",
      value: function _initInteractions() {
        var _this3 = this;
        this._selectClick = new ol.interaction.Select({
          condition: ol.events.condition.click,
          multi: false,
          hitTolerance: 5
        });
        this._selectClick.on('select', function (e) {
          return _this3._getSegment(e);
        });
        this._selectClick.setActive(false);
        this.map.ol.addInteraction(this._selectClick);
      }
    }, {
      key: "_initInternalLayer",
      value: function _initInternalLayer() {
        this._ortoLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0ff',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0ff'
              })
            })
          })
        });
        this._ortoPointLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0ff',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0ff'
              })
            })
          })
        });
        this._pointsLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0ff',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0ff'
              })
            })
          })
        });
        this._paralelLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0ff',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0ff'
              })
            })
          })
        });
        this._ortoLayer.setZIndex(9998);
        this._ortoPointLayer.setZIndex(9998);
        this._pointsLayer.setZIndex(9998);
        this._paralelLayer.setZIndex(9998);
        map.ol.addLayer(this._ortoLayer);
        map.ol.addLayer(this._ortoPointLayer);
        map.ol.addLayer(this._pointsLayer);
        map.ol.addLayer(this._paralelLayer);
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        return "\n            <div class='m-0 p-3' style=\"min-width: 460px; max-width: 500px;\">\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"map-app-orto-".concat(this.id, "\">\n                            <label class=\"form-check-label small\" for=\"map-app-orto-").concat(this.id, "\">\n                                Guias de 0, 45 e 90 graus\n                            </label>\n                         </div>\n                    </div>\n                </div>\n                <hr>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"map-app-orto-point-").concat(this.id, "\">\n                            <label class=\"form-check-label  small\" for=\"map-app-orto-point-").concat(this.id, "\">\n                                Guia de ponto ortogonal\n                            </label>\n                         </div>\n                    </div>\n                    <div class=\"col-4\">\n                        <a id=\"map-app-point-btn-").concat(this.id, "\" href=\"#\" class=\"btn btn-primary btn-sm active float-right\" role=\"button\" >Obter Ponto</a>\n                    </div>\n                </div>\n                <hr>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"map-app-points-").concat(this.id, "\">\n                            <label class=\"form-check-label  small\" for=\"map-app-points-").concat(this.id, "\">\n                                Guia por dois pontos quaisquer\n                            </label>\n                         </div>\n                    </div>\n                    <div class=\"col-3\">\n                        <a id=\"map-app-p1-btn-").concat(this.id, "\" href=\"#\" class=\"btn btn-primary btn-sm active float-right\" role=\"button\" >Obter P1</a>\n                    </div>\n                    <div class=\"col-3\">\n                        <a id=\"map-app-p2-btn-").concat(this.id, "\" href=\"#\" class=\"btn btn-primary btn-sm active float-right\" role=\"button\" >Obter P2</a>\n                    </div>\n                </div>\n                <hr>\n                <div class=\"row\">\n                    <div class=\"col-12\">\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"map-app-segment-").concat(this.id, "\">\n                            <label class=\"form-check-label small\" for=\"map-app-segment-").concat(this.id, "\">\n                                Guia paralela a um segmento por dist\xE2ncia\n                            </label>\n                         </div>\n                    </div>\n                   \n                    <div class=\"col-8\">\n                        <div class=\"input-group input-group-sm mb-3\">\n                        <input id=\"map-app-input-").concat(this.id, "\" min=\"0.001\" type=\"number\" value=\"").concat(this._config.defaultDistance, "\" class=\"form-control\">\n                        <div class=\"input-group-prepend\">\n                            <span class=\"input-group-text\" id=\"inputGroup-sizing-sm\">metros</span>\n                        </div>\n                        </div>\n                    </div>\n\n                    <div class=\"col-4\">\n                        <a id=\"map-app-segment-btn-").concat(this.id, "\" href=\"#\" class=\"btn btn-primary btn-sm active float-right\" role=\"button\" >Obter Segmento</a>\n                    </div>\n\n                </div>\n\n                <hr>\n\n                <div class=\"row\">\n                    <div class=\"col-12\">\n                        <a id=\"map-app-clear-btn-").concat(this.id, "\" href=\"#\" class=\"btn btn-primary btn-sm active btn-block\" role=\"button\" >Limpar linhas guias</a>\n                    </div>\n                    \n                </div>\n                \n               \n            </div>\n        ");
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._checkOrtoElement = document.getElementById("map-app-orto-".concat(this.id));
        this._checkOrtoPointElement = document.getElementById("map-app-orto-point-".concat(this.id));
        this._checkPointsElement = document.getElementById("map-app-points-".concat(this.id));
        this._checkSegmentElement = document.getElementById("map-app-segment-".concat(this.id));
        this._inputElement = document.getElementById("map-app-input-".concat(this.id));
        this._btnOrtoPointElement = document.getElementById("map-app-point-btn-".concat(this.id));
        this._btnP1Element = document.getElementById("map-app-p1-btn-".concat(this.id));
        this._btnP2Element = document.getElementById("map-app-p2-btn-".concat(this.id));
        this._btnSegmentElement = document.getElementById("map-app-segment-btn-".concat(this.id));
        this._btnClearElement = document.getElementById("map-app-clear-btn-".concat(this.id));
      }
    }, {
      key: "_ortoGuidesHandler",
      value: function _ortoGuidesHandler() {
        this._ortoLayer.getSource().clear();
        if (this._checkOrtoElement.checked) {
          this._generateOrthoGuides();
        }
      }
    }, {
      key: "_ortoPointHandler",
      value: function _ortoPointHandler() {
        this._ortoPointLayer.getSource().clear();
        if (this._checkOrtoPointElement.checked) {
          this._createOrthoPoint();
        }
      }
    }, {
      key: "_pointsHandler",
      value: function _pointsHandler() {
        this._pointsLayer.getSource().clear();
        if (this._checkPointsElement.checked) {
          this._generatePointsGuide();
        }
      }
    }, {
      key: "_segmentHandler",
      value: function _segmentHandler() {
        this._paralelLayer.getSource().clear();
        if (this._checkSegmentElement.checked) {
          this._generateParalelSegment();
        }
      }
    }, {
      key: "_generateParalelSegment",
      value: function _generateParalelSegment() {
        if (this._segment.getGeometry()) {
          var extent$$1 = this.map.ol.getView().calculateExtent();
          var dist = this._plainDistance([extent$$1[0], extent$$1[1]], [extent$$1[2], extent$$1[3]]);
          var l1 = this._segment.getGeometry().getCoordinates().slice();
          var az = this._getAzimuth(l1[0], l1[1]);
          var pa = this._pointAzDist(l1[0], az + Math.PI / 2, this._config.defaultDistance);
          var pb = this._pointAzDist(l1[0], az - Math.PI / 2, this._config.defaultDistance);
          var p1 = this._pointAzDist(pa, az, dist);
          this._createOlLineFeature([pa, p1], this._paralelLayer.getSource());
          var p2 = this._pointAzDist(pa, az + Math.PI, dist);
          this._createOlLineFeature([pa, p2], this._paralelLayer.getSource());
          var p3 = this._pointAzDist(pb, az, dist);
          this._createOlLineFeature([pb, p3], this._paralelLayer.getSource());
          var p4 = this._pointAzDist(pb, az + Math.PI, dist);
          this._createOlLineFeature([pb, p4], this._paralelLayer.getSource());
        }
      }
    }, {
      key: "_getSegment",
      value: function _getSegment(e) {
        var _this4 = this;
        var feature = e.selected[0];
        var format = new ol.format.GeoJSON();
        if (feature) {
          feature.getGeometry().transform(this.map.srid, 'EPSG:4326');
          var clickPoint = turf.point(ol.proj.transform(e.mapBrowserEvent.coordinate, this.map.srid, 'EPSG:4326'));
          var polygon = format.writeFeatureObject(e.selected[0]);
          var minDist = Number.MAX_VALUE;
          turf.segmentEach(polygon, function (segment) {
            var dist = turf.pointToLineDistance(clickPoint, segment, {
              units: 'kilometers'
            });
            if (dist < minDist) {
              minDist = dist;
              var sFeature = format.readFeatureFromObject(segment);
              sFeature.getGeometry().transform('EPSG:4326', _this4.map.srid);
              _this4._segment.setGeometry(sFeature.getGeometry());
            }
          });
          feature.getGeometry().transform('EPSG:4326', this.map.srid);
        }
        this._selectClick.getFeatures().clear();
        this._selectClick.setActive(false);
        document.getElementById(this.map.elementId).style.cursor = 'auto';
        this._segmentHandler();
      }
    }, {
      key: "_generatePointsGuide",
      value: function _generatePointsGuide() {
        if (this._feature1.getGeometry() && this._feature2.getGeometry()) {
          var extent$$1 = this.map.ol.getView().calculateExtent();
          var dist = this._plainDistance([extent$$1[0], extent$$1[1]], [extent$$1[2], extent$$1[3]]);
          var c1 = this._feature1.getGeometry().getCoordinates().slice();
          var c2 = this._feature2.getGeometry().getCoordinates().slice();
          var az = this._getAzimuth(c1, c2);
          var p1 = this._pointAzDist(c1, az, dist);
          this._createOlLineFeature([c1, p1], this._pointsLayer.getSource());
          var p2 = this._pointAzDist(c1, az + Math.PI, dist);
          this._createOlLineFeature([c1, p2], this._pointsLayer.getSource());
        }
      }
    }, {
      key: "_generateOrthoGuides",
      value: function _generateOrthoGuides() {
        var segments;
        var features = this._source.getFeatures();
        var extent$$1 = this.map.ol.getView().calculateExtent();
        for (var i = 0; i < features.length; i++) {
          var feature = features[i];
          if (feature.getGeometry()) {
            segments = turf.lineSegment(turf.lineString(feature.getGeometry().getCoordinates()[0]));
            for (var j = 0; j < segments.features.length; j++) {
              var segment = segments.features[j].geometry.coordinates;
              var az = this._getAzimuth(segment[0], segment[1]);
              var dist = this._plainDistance([extent$$1[0], extent$$1[1]], [extent$$1[2], extent$$1[3]]);
              for (var k = 1; k < 9; k++) {
                var p1 = this._pointAzDist(segment[0], az + k * (Math.PI / 4), dist);
                this._createOlLineFeature([segment[0], p1], this._ortoLayer.getSource());
              }
            }
          }
        }
      }
    }, {
      key: "_getPointOrtho",
      value: function _getPointOrtho() {
        var _this5 = this;
        this.map.toolbox.draw.getPoint().then(function (point) {
          _this5._orthoPointFeature = point;
          _this5._ortoPointHandler();
        });
      }
    }, {
      key: "_createOrthoPoint",
      value: function _createOrthoPoint() {
        var line, point;
        var features = this._source.getFeatures();
        var extent$$1 = this.map.ol.getView().calculateExtent();
        var dist = this._plainDistance([extent$$1[0], extent$$1[1]], [extent$$1[2], extent$$1[3]]);
        for (var i = 0; i < features.length; i++) {
          var feature = features[i];
          if (feature.getGeometry() && this._orthoPointFeature.getGeometry()) {
            var originalCoordFeature = feature.getGeometry().getCoordinates().slice();
            var originalCoordPoint = this._orthoPointFeature.getGeometry().getCoordinates().slice();
            feature.getGeometry().transform(this.map.srid, 'EPSG:4326');
            this._orthoPointFeature.getGeometry().transform(this.map.srid, 'EPSG:4326');
            line = turf.lineString(feature.getGeometry().getCoordinates()[0]);
            point = turf.point(this._orthoPointFeature.getGeometry().getCoordinates());
            var snapped = turf.nearestPointOnLine(line, point, {
              units: 'meters'
            });
            var index = snapped.properties.index;
            var c2 = originalCoordFeature[0][index + 1];
            var c1 = originalCoordFeature[0][index];
            console.log(snapped);
            snapped = snapped.geometry.coordinates;
            point = point.geometry.coordinates;
            var az = this._getAzimuth(c1, c2);
            var p1 = this._pointAzDist(originalCoordPoint, az + Math.PI / 2, dist);
            var p2 = this._pointAzDist(originalCoordPoint, az - Math.PI / 2, dist);
            this._createOlLineFeature([originalCoordPoint, p1], this._ortoPointLayer.getSource());
            this._createOlLineFeature([originalCoordPoint, p2], this._ortoPointLayer.getSource());
            feature.setGeometry(new ol.geom.Polygon(originalCoordFeature));
            this._orthoPointFeature.setGeometry(new ol.geom.Point(originalCoordPoint));
          }
        }
      }
    }, {
      key: "_createOlLineFeature",
      value: function _createOlLineFeature(lineArray, source) {
        var feature = new ol.Feature();
        var line = new ol.geom.LineString(lineArray);
        feature.setGeometry(line);
        source.addFeature(feature);
      }
    }, {
      key: "_pointAzDist",
      value: function _pointAzDist(firstPoint, az, dist) {
        var x = firstPoint[0] + Math.sin(az) * dist;
        var y = firstPoint[1] + Math.cos(az) * dist;
        return [x, y];
      }
    }, {
      key: "_plainDistance",
      value: function _plainDistance(p1, p2) {
        return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
      }
    }, {
      key: "_pointOnLine",
      value: function _pointOnLine(segment, point) {
        var p1 = {
          x: segment[0][0],
          y: segment[0][1]
        };
        var p2 = {
          x: segment[1][0],
          y: segment[1][1]
        };
        var pa = {
          x: point[0],
          y: point[1]
        };
        return Math.abs((p2.y - p1.y) / (p2.x - p1.x) * (pa.x - p1.x) - (pa.y - p1.y)) < 10e-4;
      }
    }, {
      key: "_getAzimuth",
      value: function _getAzimuth(p1, p2) {
        var azimuth = Math.atan2(p2[0] - p1[0], p2[1] - p1[1]);
        azimuth = azimuth < 0 ? azimuth + 2 * Math.PI : azimuth;
        return azimuth;
      }
    }, {
      key: "_clear",
      value: function _clear() {
        this._ortoLayer.getSource().clear();
        this._ortoPointLayer.getSource().clear();
        this._pointsLayer.getSource().clear();
        this._paralelLayer.getSource().clear();
        this._orthoPointFeature.setGeometry(null);
        this._feature1.setGeometry(null);
        this._feature2.setGeometry(null);
        this._orthoPointFeature.setGeometry(null);
        this._segment.setGeometry(null);
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this6 = this;
        this._checkOrtoElement.addEventListener('click', function () {
          return _this6._ortoGuidesHandler();
        });
        this._checkOrtoPointElement.addEventListener('click', function () {
          return _this6._ortoPointHandler();
        });
        this._checkPointsElement.addEventListener('click', function () {
          return _this6._pointsHandler();
        });
        this._checkSegmentElement.addEventListener('click', function () {
          return _this6._segmentHandler();
        });
        this._btnOrtoPointElement.addEventListener('click', function () {
          return _this6._getPointOrtho();
        });
        this._btnP1Element.addEventListener('click', function () {
          _this6.map.toolbox.draw.getPoint().then(function (point) {
            _this6._feature1.setGeometry(point.getGeometry());
            _this6._generatePointsGuide();
          });
        });
        this._btnP2Element.addEventListener('click', function () {
          _this6.map.toolbox.draw.getPoint().then(function (point) {
            _this6._feature2.setGeometry(point.getGeometry());
            _this6._generatePointsGuide();
          });
        });
        this._btnSegmentElement.addEventListener('click', function () {
          _this6._selectClick.setActive(true);
          document.getElementById(_this6.map.elementId).style.cursor = 'pointer';
        });
        this._inputElement.addEventListener('change', function () {
          _this6._config.defaultDistance = parseFloat(_this6._inputElement.value);
          _this6._segmentHandler();
        });
        this._btnClearElement.addEventListener('click', function () {
          _this6._clear();
        });
        this.map.ol.getView().on('change', function () {
          _this6._ortoGuidesHandler();
          _this6._ortoPointHandler();
          _this6._pointsHandler();
          _this6._segmentHandler();
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
      }
    }]);
  }(GeoWidget);

  var SetEdgeSize = /*#__PURE__*/function (_GeoWidget) {
    function SetEdgeSize(config) {
      var _this;
      _classCallCheck(this, SetEdgeSize);
      config.source = config.source || new ol.source.Vector();
      config.tip = config.tip || 'Ajustar tamanho da aresta';
      config.title = config.title || 'Ajustar tamanho da aresta';
      config.class = config.class || 'map-app-set-edge-size';
      _this = _callSuper(this, SetEdgeSize, [config]);
      _this._source = config.source;
      _this._selectClick = null;
      _this._selectedFeature = null;
      _this._btnTransform = null;
      _this._stateHistory = config.stateHistory, _this._segmentIndex = null;
      _this._minDist = Number.MAX_VALUE;
      _this.ui = _this._getUiTemplate();
      return _this;
    }
    _inherits(SetEdgeSize, _GeoWidget);
    return _createClass(SetEdgeSize, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
        this._addSelectInteraction();
        document.getElementById(this.map.elementId).style.cursor = 'pointer';
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        return "\n        <div class='m-0 p-3 d-flex flex-column'>\n          <p>Selecione a aresta para editar.</p>\n          <div>\n            <input id=\"map-app-input-size-".concat(this.id, "\" type=\"number\" min=\"0\" step=\".001\" />\n            <span>Km</span>\n          </div>\n          <br />\n          <button id=\"map-app-btn-edit-").concat(this.id, "\" class=\"btn btn-primary\">Editar</button>\n        </div>\n      ");
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._btnTransform = document.getElementById("map-app-btn-edit-".concat(this.id));
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this._btnTransform.addEventListener('click', function () {
          return _this3._transformFeature();
        });
      }
    }, {
      key: "_addSelectInteraction",
      value: function _addSelectInteraction() {
        var _this4 = this;
        this._selectClick = new ol.interaction.Select({
          condition: ol.events.condition.click,
          multi: false,
          hitTolerance: 5
        });
        this._selectClick.on('select', function (e) {
          return _this4._getSegment(e);
        });
        this.map.ol.addInteraction(this._selectClick);
      }
    }, {
      key: "_getSegment",
      value: function _getSegment(e) {
        var _this5 = this;
        var feature = e.selected[0];
        var polygon = null;
        if (!feature) return;
        if (feature.getGeometry().getType() === 'Polygon') {
          polygon = turf.polygon(feature.getGeometry().transform(this.map.srid, 'EPSG:4326').getCoordinates());
        } else if (feature.getGeometry().getType() === 'LineString') {
          polygon = turf.lineString(feature.getGeometry().transform(this.map.srid, 'EPSG:4326').getCoordinates());
        }
        if (!polygon) return;
        var clickPoint = turf.point(ol.proj.transform(e.mapBrowserEvent.coordinate, this.map.srid, 'EPSG:4326'));
        var length = 0;
        turf.segmentEach(polygon, function (segment, featureIndex, multiFeatureIndex, geometryIndex, index) {
          var dist = turf.pointToLineDistance(clickPoint, segment, {
            units: 'kilometers'
          });
          if (dist < _this5._minDist) {
            _this5._minDist = dist;
            _this5._segmentIndex = index;
            var c1 = ol.proj.transform(segment.geometry.coordinates[0], 'EPSG:4326', _this5.map.srid);
            var c2 = ol.proj.transform(segment.geometry.coordinates[1], 'EPSG:4326', _this5.map.srid);
            length = _this5._distance(c1, c2);
          }
        });
        feature.getGeometry().transform('EPSG:4326', this.map.srid);
        if (this._minDist < 0.004) {
          document.getElementById("map-app-input-size-".concat(this.id)).value = Math.round(length * 1000) / 1000;
        } else {
          document.getElementById("map-app-input-size-".concat(this.id)).value = 0;
        }
        this._minDist = Number.MAX_VALUE;
        this._selectedFeature = feature;
        this._selectClick.getFeatures().remove(feature);
      }
    }, {
      key: "_transformFeature",
      value: function _transformFeature() {
        if (!this._selectedFeature) return;
        var dist = document.getElementById("map-app-input-size-".concat(this.id)).value;
        var polygon = null;
        if (this._selectedFeature.getGeometry().getType() === 'Polygon') {
          polygon = turf.polygon(this._selectedFeature.getGeometry().getCoordinates());
        } else if (this._selectedFeature.getGeometry().getType() === 'LineString') {
          polygon = turf.lineString(this._selectedFeature.getGeometry().getCoordinates());
        }
        if (!polygon) return;
        var segments = turf.lineSegment(polygon);
        var _segments$features$th = _slicedToArray(segments.features[this._segmentIndex].geometry.coordinates, 2),
          p1 = _segments$features$th[0],
          p2 = _segments$features$th[1];
        var azimuth = this._azimuthBetweenPoints(p1, p2);
        var newPoint = this._pointAzDist(p1, azimuth, dist);
        var newCoords = [];
        if (polygon.geometry.type === 'LineString') {
          polygon.geometry.coordinates.forEach(function (coord) {
            coord[0] === p2[0] && coord[1] === p2[1] ? newCoords.push(newPoint) : newCoords.push(coord);
          });
          this._selectedFeature.getGeometry().setCoordinates(newCoords);
        } else if (polygon.geometry.type === 'Polygon') {
          polygon.geometry.coordinates[0].forEach(function (coord) {
            coord[0] === p2[0] && coord[1] === p2[1] ? newCoords.push(newPoint) : newCoords.push(coord);
          });
          this._selectedFeature.getGeometry().setCoordinates([newCoords]);
        }
      }
    }, {
      key: "_azimuthBetweenPoints",
      value: function _azimuthBetweenPoints(p1, p2) {
        return Math.atan2(p2[0] - p1[0], p2[1] - p1[1]);
      }
    }, {
      key: "_pointAzDist",
      value: function _pointAzDist(p0, az, dist) {
        var x = p0[0] + dist * Math.sin(az);
        var y = p0[1] + dist * Math.cos(az);
        return [x, y];
      }
    }, {
      key: "_distance",
      value: function _distance(p1, p2) {
        return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        document.getElementById(this.map.elementId).style.cursor = 'auto';
        this.map.ol.removeInteraction(this._selectClick);
        this._selectClick = null;
        document.getElementById("map-app-input-size-".concat(this.id)).value = 0;
        this.hide();
      }
    }]);
  }(GeoWidget);

  var CityBlockSplitter = /*#__PURE__*/function (_GeoWidget) {
    function CityBlockSplitter(config) {
      var _this;
      _classCallCheck(this, CityBlockSplitter);
      config = config || {};
      config.tip = config.tip || 'CityBlockSplitter';
      config.title = config.title || 'CityBlockSplitter';
      config.class = config.class || 'city-block-splitter';
      config.geometryType = 'linestring';
      config.defaultDistance = config.defaultDistance || 1;
      config.defaultUnits = config.defaultUnits || 'm';
      _this = _callSuper(this, CityBlockSplitter, [config]);
      _this._cityBlockFeature = config.cityBlockFeature;
      _this._lotFeature = config.lotFeature;
      _this._source = config.source;
      _this._modify = null;
      _this._isDrawing = false;
      _this.ui = _this._getUiTemplate();
      return _this;
    }
    _inherits(CityBlockSplitter, _GeoWidget);
    return _createClass(CityBlockSplitter, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._initInternalLayer();
          _this2._initInteractions();
          _this2._registerElements();
          _this2._registerEvents();
        });
      }
    }, {
      key: "_initInteractions",
      value: function _initInteractions() {
        this._draw = new ol.interaction.Draw({
          source: this._vectorLayer.getSource(),
          type: 'LineString'
        });
        this._modify = new ol.interaction.Modify({
          source: this._vectorLayer.getSource()
        });
        this._snap = new ol.interaction.Snap({
          source: this._source
        });
      }
    }, {
      key: "_initInternalLayer",
      value: function _initInternalLayer() {
        this._vectorLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 0, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0f0',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0f0'
              })
            })
          })
        });
        this._vectorLayer.setZIndex(99999);
        this.map.ol.addLayer(this._vectorLayer);
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        return "\n            <div class='m-0 p-3'>\n                <div class=\"row\">\n                    <div class=\"col\">\n                    <a id=\"map-app-limits-btn-".concat(this.id, "\" href=\"#\" class=\"btn btn-primary btn-sm active btn-block\" role=\"button\" >Criar limites dos lotes</a>\n                    </div>\n                </div>\n               \n\n                <div class=\"row pt-3\">\n                    <div class=\"col-12\">\n                        <a id=\"map-app-clear-btn-").concat(this.id, "\" href=\"#\" class=\"btn btn-primary btn-sm active btn-block\" role=\"button\" >Limpar linhas guias</a>\n                    </div>\n                </div>\n\n                <div class=\"row pt-3\">\n                    <div class=\"col-12\">\n                        <a id=\"map-app-go-horse-btn-").concat(this.id, "\" href=\"#\" class=\"btn btn-primary btn-sm btn-block disabled\" role=\"button\" >Gerar divis\xE3o dos lotes</a>\n                    </div>\n                </div>\n                               \n            </div>\n        ");
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._btnCreateLines = document.getElementById("map-app-limits-btn-".concat(this.id));
        this._btnClear = document.getElementById("map-app-clear-btn-".concat(this.id));
        this._btnGoHorse = document.getElementById("map-app-go-horse-btn-".concat(this.id));
      }
    }, {
      key: "_createLinesHandler",
      value: function _createLinesHandler() {
        if (this._isDrawing) {
          this._btnCreateLines.innerHTML = 'Criar limites dos lotes';
          this.map.ol.removeInteraction(this._draw);
          this.map.ol.removeInteraction(this._modify);
          this.map.ol.removeInteraction(this._snap);
          this._isDrawing = false;
        } else {
          this._btnCreateLines.innerHTML = 'Parar';
          this.map.ol.addInteraction(this._draw);
          this.map.ol.addInteraction(this._modify);
          this.map.ol.addInteraction(this._snap);
          this._isDrawing = true;
        }
      }
    }, {
      key: "_clearHandler",
      value: function _clearHandler() {
        this._vectorLayer.getSource().clear();
      }
    }, {
      key: "_processingHandler",
      value: function _processingHandler() {
        var format = new ol.format.GeoJSON();
        var features = this._vectorLayer.getSource().getFeatures();
        var buffereds = [];
        for (var i = 0; i < features.length; i++) {
          var feature = features[i];
          feature.getGeometry().transform(this.map.srid, 'EPSG:4326');
          var gFeature = format.writeFeatureObject(feature);
          var gBuffered = turf.buffer(gFeature, 0.05, {
            units: 'meters'
          });
          feature.getGeometry().transform('EPSG:4326', this.map.srid);
          buffereds.push(gBuffered);
        }
        var tFeatures = turf.featureCollection(buffereds);
        var dissolved = turf.dissolve(tFeatures);
        this._cityBlockFeature.getGeometry().transform(this.map.srid, 'EPSG:4326');
        var cbFeature = format.writeFeatureObject(this._cityBlockFeature);
        var difference = turf.difference(cbFeature, dissolved.features[0]);
        this._cityBlockFeature.getGeometry().transform('EPSG:4326', this.map.srid);
        this._vectorLayer.getSource().clear();
        var nFeature = format.readFeatureFromObject(difference);
        nFeature.getGeometry().transform('EPSG:4326', this.map.srid);
        this._vectorLayer.getSource().addFeature(nFeature);
      }
    }, {
      key: "_uiHandler",
      value: function _uiHandler() {
        if (this._vectorLayer.getSource().getFeatures().length > 0) {
          this._btnGoHorse.classList.remove('disabled');
          this._btnGoHorse.classList.add('active');
        } else {
          this._btnGoHorse.classList.remove('active');
          this._btnGoHorse.classList.add('disabled');
        }
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this._btnCreateLines.addEventListener('click', function () {
          return _this3._createLinesHandler();
        });
        this._btnClear.addEventListener('click', function () {
          return _this3._clearHandler();
        });
        this._btnGoHorse.addEventListener('click', function () {
          return _this3._processingHandler();
        });
        this._vectorLayer.getSource().on('change', function () {
          return _this3._uiHandler();
        });
        this._draw.on('drawend', function () {
          return _this3._uiHandler();
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
      }
    }]);
  }(GeoWidget);

  var ArcsByThreePoints = /*#__PURE__*/function (_GeoWidget) {
    function ArcsByThreePoints(config) {
      var _this;
      _classCallCheck(this, ArcsByThreePoints);
      config = config || {};
      config.tip = config.tip || 'Geração de arcos por três pontos';
      config.title = config.title || 'Geração de arcos por três pontos';
      config.class = config.class || 'map-app-arc-by-three';
      config.geometryType = 'linestring';
      config.defaultDistance = config.defaultDistance || 1;
      config.defaultUnits = config.defaultUnits || 'm';
      _this = _callSuper(this, ArcsByThreePoints, [config]);
      _this._source = config.source || new ol.source.Vector();
      _this._isListening = false;
      _this._lastPoint = null;
      _this._bezierFeature = new ol.Feature(null);
      _this._mouseFeature = new ol.Feature(null);
      _this._pointsList = [];
      _this._select = null;
      _this._dragBox = null;
      _this._mapEvent = null;
      _this.ui = _this._getUiTemplate();
      return _this;
    }
    _inherits(ArcsByThreePoints, _GeoWidget);
    return _createClass(ArcsByThreePoints, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
          _this2._initInternalLayer();
          _this2._createInteractions();
        });
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        return "\n          <div class='m-0 p-3' style=\"max-width:400px\">\n              <p class='map-app-measure-tip'>Clique em iniciar e selecione um conjunto de pontos no mapa.</p>\n              <div class='row pt-1 pb-1 pl-3 pr-3'>\n                  <button id=\"map-app-btn-".concat(this.id, "\" class=\"btn btn-dark btn-block btn-sm\">Selecionar Elementos</button>\n              </div>\n          </div>\n        ");
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._btnElement = document.getElementById("map-app-btn-".concat(this.id));
      }
    }, {
      key: "_createInteractions",
      value: function _createInteractions() {
        var _this3 = this;
        this._select = new ol.interaction.Select();
        this._dragBox = new ol.interaction.DragBox({
          condition: ol.events.conditionplatformModifierKeyOnly
        });
        this._dragBox.on('boxend', function () {
          var rotation = _this3.map.ol.getView().getRotation();
          var oblique = rotation % (Math.PI / 2) !== 0;
          var candidateFeatures = oblique ? [] : _this3._selectedFeatures;
          var extent$$1 = _this3._dragBox.getGeometry().getExtent();
          _this3._source.forEachFeatureIntersectingExtent(extent$$1, function (feature) {
            candidateFeatures.push(feature);
          });
          if (oblique) {
            var anchor = [0, 0];
            var geometry = _this3._dragBox.getGeometry().clone();
            geometry.rotate(-rotation, anchor);
            var extent$1 = geometry.getExtent();
            candidateFeatures.forEach(function (feature) {
              var geometry = feature.getGeometry().clone();
              geometry.rotate(-rotation, anchor);
              if (geometry.intersectsExtent(extent$1)) {
                selectedFeatures.push(feature);
              }
            });
          }
        });
        this._dragBox.on('boxstart', function () {
          _this3._selectedFeatures.clear();
        });
        this._selectedFeatures = this._select.getFeatures();
      }
    }, {
      key: "_OnPointerUp",
      value: function _OnPointerUp() {
        var _this4 = this;
        setTimeout(function () {
          _this4._drawBezier();
        }, 200);
      }
    }, {
      key: "_addInteractions",
      value: function _addInteractions() {
        var _this5 = this;
        var index = this._source.getFeatures().indexOf(this._bezierFeature);
        if (index === -1) {
          this._source.addFeature(this._bezierFeature);
        }
        this._source.getFeatures();
        this.map.ol.addInteraction(this._select);
        this.map.ol.addInteraction(this._dragBox);
        this._mapEvent = this.map.ol.on('pointerup', function () {
          return _this5._OnPointerUp();
        });
      }
    }, {
      key: "_initInternalLayer",
      value: function _initInternalLayer() {
        this._vectorLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0ff',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0ff'
              })
            })
          })
        });
        this._vectorLayer.setZIndex(99999);
        this._vectorLayer.getSource().addFeature(this._mouseFeature);
        map.ol.addLayer(this._vectorLayer);
      }
    }, {
      key: "_drawBezier",
      value: function _drawBezier() {
        if (this._selectedFeatures.getLength() === 3) {
          var geoJsonFormat = new ol.format.GeoJSON();
          var features = this._selectedFeatures.getArray();
          var pointFeatures = [];
          features.forEach(function (feature) {
            var featureType = feature.getGeometry().getType().toLocaleLowerCase();
            if (featureType === 'point') {
              pointFeatures.push(feature);
            }
          });
          if (pointFeatures.length > 2) {
            var lineArray = pointFeatures.map(function (point) {
              return point.getGeometry().getCoordinates();
            });
            var bezier = turf.bezierSpline(turf.lineString(lineArray), {
              resolution: this._resolution,
              sharpness: this._sharpness
            });
            var bf = geoJsonFormat.readFeatureFromObject(bezier);
            this._bezierFeature.setGeometry(bf.getGeometry());
          }
        } else {
          this.map.notify("Selecione 3 pontos para gerar um arco.");
        }
      }
    }, {
      key: "_actionsHandler",
      value: function _actionsHandler() {
        this._addInteractions();
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this6 = this;
        this._btnElement.addEventListener('click', function () {
          return _this6._actionsHandler();
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
        this.map.ol.removeInteraction(this._select);
        this.map.ol.removeInteraction(this._dragBox);
        this.map.ol.removeEventListener('pointerup', this._mapEvent);
      }
    }]);
  }(GeoWidget);

  var ParallelDrag = /*#__PURE__*/function (_GeoWidget) {
    function ParallelDrag(config) {
      var _this;
      _classCallCheck(this, ParallelDrag);
      config.source = config.source || new ol.source.Vector();
      config.tip = config.tip || 'Arrastar aresta paralelamente';
      config.title = config.title || 'Arrastar aresta paralelamente';
      config.class = config.class || 'map-app-set-edge-size';
      config.defaultDistance = config.defaultDistance || 1;
      _this = _callSuper(this, ParallelDrag, [config]);
      _this._source = config.source;
      _this._selectClick = null;
      _this._selectedFeature = null;
      _this._btnTransform = null;
      _this._btnAjust = null;
      _this._segmentIndex = null;
      _this._guideFeature = null;
      _this._minDist = Number.MAX_VALUE;
      _this.ui = _this._getUiTemplate();
      return _this;
    }
    _inherits(ParallelDrag, _GeoWidget);
    return _createClass(ParallelDrag, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
          _this2._initInternalLayer();
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
        this._addSelectInteraction();
        document.getElementById(this.map.elementId).style.cursor = 'pointer';
      }
    }, {
      key: "_initInternalLayer",
      value: function _initInternalLayer() {
        this._paralelLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0ff',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0ff'
              })
            })
          })
        });
        this._paralelLayer.setZIndex(9998);
        map.ol.addLayer(this._paralelLayer);
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        return "\n        <div class='m-0 p-3 d-flex flex-column'>\n          <p class='map-app-measure-tip'>Selecione a aresta para arrastar.</p>\n          <p class='map-app-parallel-tip' id=\"map-app-p-info-".concat(this.id, "\">Aresta Selecionada</p>\n          <button id=\"map-app-btn-edit-").concat(this.id, "\" class=\"btn btn-dark btn-block btn-sm\">Criar Guia</button>\n          <button id=\"map-app-btn-ajust-").concat(this.id, "\" class=\"btn btn-dark btn-block btn-sm\">Ajustar</button>\n        </div>\n      ");
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._btnTransform = document.getElementById("map-app-btn-edit-".concat(this.id));
        this._btnAjust = document.getElementById("map-app-btn-ajust-".concat(this.id));
        document.getElementById("map-app-p-info-".concat(this.id)).style.display = 'none';
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this._btnTransform.addEventListener('click', function () {
          return _this3._transformFeature();
        });
        this._btnAjust.addEventListener('click', function () {
          return _this3._ajustFeature();
        });
      }
    }, {
      key: "_addSelectInteraction",
      value: function _addSelectInteraction() {
        var _this4 = this;
        this._selectClick = new ol.interaction.Select({
          condition: ol.events.condition.click,
          multi: false,
          hitTolerance: 5
        });
        this._selectClick.on('select', function (e) {
          return _this4._getSegment(e);
        });
        this.map.ol.addInteraction(this._selectClick);
      }
    }, {
      key: "_getSegment",
      value: function _getSegment(e) {
        var _this5 = this;
        var feature = e.selected[0];
        var polygon = null;
        if (!feature) return;
        if (feature.getGeometry().getType() === 'Polygon') {
          polygon = turf.polygon(feature.getGeometry().transform(this.map.srid, 'EPSG:4326').getCoordinates());
        }
        if (!polygon) return;
        var clickPoint = turf.point(ol.proj.transform(e.mapBrowserEvent.coordinate, this.map.srid, 'EPSG:4326'));
        turf.segmentEach(polygon, function (segment, featureIndex, multiFeatureIndex, geometryIndex, index) {
          var dist = turf.pointToLineDistance(clickPoint, segment, {
            units: 'kilometers'
          });
          if (dist < _this5._minDist) {
            _this5._minDist = dist;
            _this5._segmentIndex = index;
          }
        });
        if (this._minDist < 0.004) {
          document.getElementById("map-app-p-info-".concat(this.id)).style.display = 'block';
        } else {
          document.getElementById("map-app-p-info-".concat(this.id)).style.display = 'none';
        }
        feature.getGeometry().transform('EPSG:4326', this.map.srid);
        this._minDist = Number.MAX_VALUE;
        this._selectedFeature = feature;
        this._selectClick.getFeatures().remove(feature);
      }
    }, {
      key: "_transformFeature",
      value: function _transformFeature() {
        if (!this._selectedFeature) return;
        var polygon = turf.polygon(this._selectedFeature.getGeometry().getCoordinates());
        var segments = turf.lineSegment(polygon);
        var _segments$features$th = _slicedToArray(segments.features[this._segmentIndex].geometry.coordinates, 2),
          p1 = _segments$features$th[0],
          p2 = _segments$features$th[1];
        var extent$$1 = this.map.ol.getView().calculateExtent();
        var dist = this._plainDistance([extent$$1[0], extent$$1[1]], [extent$$1[2], extent$$1[3]]);
        var az = this._getAzimuth(p1, p2);
        var p1_ = this._pointAzDist(p1, az, dist);
        var p2_ = this._pointAzDist(p1, az + Math.PI, dist);
        this._guideFeature = this._createOlLineFeature([p1_, p2_], this._paralelLayer.getSource());
      }
    }, {
      key: "_ajustFeature",
      value: function _ajustFeature() {
        if (!this._selectedFeature) return;
        var polygon = turf.polygon(this._selectedFeature.getGeometry().getCoordinates());
        var segments = turf.lineSegment(polygon);
        var next = this._segmentIndex + 1 > segments.features.length - 1 ? 0 : this._segmentIndex + 1;
        var prev = this._segmentIndex - 1 < 0 ? segments.features.length - 1 : this._segmentIndex - 1;
        var _segments$features$pr = _slicedToArray(segments.features[prev].geometry.coordinates, 2),
          l1 = _segments$features$pr[0],
          l2 = _segments$features$pr[1];
        var _segments$features$ne = _slicedToArray(segments.features[next].geometry.coordinates, 2),
          l1_ = _segments$features$ne[0],
          l2_ = _segments$features$ne[1];
        var _segments$features$th2 = _slicedToArray(segments.features[this._segmentIndex].geometry.coordinates, 2),
          ponto1 = _segments$features$th2[0],
          ponto2 = _segments$features$th2[1];
        var extent$$1 = this.map.ol.getView().calculateExtent();
        var dist = this._plainDistance([extent$$1[0], extent$$1[1]], [extent$$1[2], extent$$1[3]]);
        var az = this._getAzimuth(l1, l2);
        var p1_ = this._pointAzDist(l1, az, dist);
        var p2_ = this._pointAzDist(l1, az + Math.PI, dist);
        az = this._getAzimuth(l1_, l2_);
        var p1 = this._pointAzDist(l1_, az, dist);
        var p2 = this._pointAzDist(l1_, az + Math.PI, dist);
        var lineGuide = turf.lineString([this._guideFeature.getGeometry().getCoordinates()[0], this._guideFeature.getGeometry().getCoordinates()[1]]);
        var line1 = turf.lineString([p1_, p2_]);
        var line2 = turf.lineString([p1, p2]);
        var intersect1 = turf.lineIntersect(lineGuide, line1);
        var intersect2 = turf.lineIntersect(lineGuide, line2);
        var newCoords = [];
        polygon.geometry.coordinates[0].forEach(function (coord) {
          if (coord[0] === ponto2[0] && coord[1] === ponto2[1]) {
            newCoords.push(intersect2.features[0].geometry.coordinates);
          } else if (coord[0] === ponto1[0] && coord[1] === ponto1[1]) {
            newCoords.push(intersect1.features[0].geometry.coordinates);
          } else {
            newCoords.push(coord);
          }
        });
        this._selectedFeature.getGeometry().setCoordinates([newCoords]);
      }
    }, {
      key: "_plainDistance",
      value: function _plainDistance(p1, p2) {
        return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
      }
    }, {
      key: "_getAzimuth",
      value: function _getAzimuth(p1, p2) {
        var azimuth = Math.atan2(p2[0] - p1[0], p2[1] - p1[1]);
        azimuth = azimuth < 0 ? azimuth + 2 * Math.PI : azimuth;
        return azimuth;
      }
    }, {
      key: "_pointAzDist",
      value: function _pointAzDist(firstPoint, az, dist) {
        var x = firstPoint[0] + Math.sin(az) * dist;
        var y = firstPoint[1] + Math.cos(az) * dist;
        return [x, y];
      }
    }, {
      key: "_createOlLineFeature",
      value: function _createOlLineFeature(lineArray, source) {
        var feature = new ol.Feature();
        var line = new ol.geom.LineString(lineArray);
        feature.setGeometry(line);
        source.addFeature(feature);
        return feature;
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        document.getElementById(this.map.elementId).style.cursor = 'auto';
        this.map.ol.removeInteraction(this._selectClick);
        this._paralelLayer.getSource().clear();
        this._selectClick = null;
        this.hide();
      }
    }]);
  }(GeoWidget);

  var ThematicOgc = /*#__PURE__*/function (_GeoWidget) {
    function ThematicOgc(config) {
      var _this;
      _classCallCheck(this, ThematicOgc);
      config = config || {};
      config.tip = config.tip || 'Mapa Temático';
      config.title = config.title || 'Gerar Mapa Temático';
      config.class = config.class || 'map-app-layer-switcher-control';
      config.docked = config.docked || true;
      config.minWidth = config.minWidth || '300';
      config.minHeight = config.minHeight || '400';
      config.maxWidth = config.maxWidth || '400';
      config.maxHeight = config.maxHeight || '600';
      _this = _callSuper(this, ThematicOgc, [config]);
      _this._tables = null;
      _this._classes = null;
      return _this;
    }
    _inherits(ThematicOgc, _GeoWidget);
    return _createClass(ThematicOgc, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.ui = this.builUi();
        this.on('ready', function () {
          _this2._registerEvents();
        });
      }
    }, {
      key: "_initLayer",
      value: function _initLayer() {
        var d = this._getThematicDefinition();
        var format = new ol.format.GeoJSON();
        var vectorSource = new ol.source.Vector({
          format: format,
          url: function url(extent$$1) {
            return window.location.origin + '/geowise/mapa/?estrategia=parcial&tabela=' + d.table + '&coluna=' + d.field + '&bbox=' + extent$$1.join(',') + '&bboxSRID=3857&resultSRID=3857&maxFeatures=' + d.featureLimit;
          },
          strategy: function strategy(extent$$1, resolution) {
            if (this.resolution && this.resolution != resolution) {
              this.clear();
            }
            this.resolution = resolution;
            return [extent$$1];
          }
        });
      }
    }, {
      key: "builUi",
      value: function builUi() {
        return "\n          <div class=\"card\">\n            <div class=\"card-header\" style=\"cursor: pointer;\">\n              Escolha o tema \n            </div>\n            <div class=\"card-body\">\n\n              <div class=\"form-group\">\n                <label>Camada</label>\n                <select class=\"form-control\" id=\"to-layer\">\n                  <option value=\"-1\">Selecione...</option>\n                </select>\n              </div>\n\n              <div class=\"form-group\">\n                <label>Atributo</label>\n                <select class=\"form-control\" id=\"to-attribute\">\n                  <option value=\"-1\">Selecione...</option>\n                </select>\n              </div>\n\n              <div class=\"form-group\">\n                <label>Natureza do atributo</label>\n                <div class=\"form-check\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"to-nature\" id=\"to-qualitative\" value=\"qualitative\">\n                  <label class=\"form-check-label\" for=\"to-qualitative\">\n                    Qualitativo (abc)\n                  </label>\n                </div>\n                <div class=\"form-check\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"to-nature\" id=\"to-quantitative\" value=\"quantitative\">\n                  <label class=\"form-check-label\" for=\"to-quantitative\">\n                    Quantitativo (123)\n                  </label>\n                </div>\n              </div>\n\n            </div>\n          </div>\n\n          <div id=\"to-class-card\" class=\"card d-none\">\n            <div class=\"card-header\" style=\"cursor: pointer;\">\n              Classifica\xE7\xE3o dos dados\n            </div>\n            <div class=\"card-body\">\n\n              <div class=\"form-group\">\n                <label>M\xE9todo de classifica\xE7\xE3o</label>\n                <select class=\"form-control\" id=\"to-method\">\n                  <option value=\"quantis\">Quantis</option>'\n                  <option value=\"int_iguais\">Intervalos Iguais</option>'\n                  <option value=\"quebras_naturais\">Quebras Naturais</option>'\n                  <option value=\"desvio_padrao\">Desvio Padr\xE3o</option>'\n                  <option value=\"int_definidos\">Intervalos Definidos</option>'\n                </select>\n              </div>\n\n              <div class=\"form-group\">\n                <label>N\xFAmero de classes</label>\n                <select class=\"form-control\" id=\"to-class-number\">\n                  <option value=\"3\">3</option>\n                  <option value=\"4\">4</option>\n                  <option value=\"5\">5</option>\n                  <option value=\"6\">6</option>\n                  <option value=\"7\">7</option>\n                  <option value=\"8\">8</option>\n                  <option value=\"9\">9</option>\n                </select>\n              </div>\n\n              <div id=\"to-class-def-card\" class=\"form-group d-none\">\n                <label>Defini\xE7\xE3o das classes</label>\n                <div id=\"to-class-def-list\">\n                  \n                </div>\n              </div>\n              \n            </div>\n          </div>\n\n          <div class=\"card\">\n            <div class=\"card-header\" style=\"cursor: pointer;\">\n              Simbologia\n            </div>\n            <div class=\"card-body d-none\">\n\n              <div class=\"form-group\">\n                <label>Paleta de cores</label>\n                <div id=\"to-color-pallet\" class=\"w-100\">\n                  <div style=\"width: 25%; height: 20px; background: #333; float:left;\"></div>\n                  <div style=\"width: 25%; height: 20px; background: #777; float:left;\"></div>\n                  <div style=\"width: 25%; height: 20px; background: #aaa; float:left;\"></div>\n                  <div style=\"width: 25%; height: 20px; background: #ccc; float:left;\"></div>\n                  <br>\n                  <small class=\"text-danger pt-3\">Selecione a natureza do atributo!</small>\n                </div>\n                \n              </div>\n              \n            </div>\n          </div>\n\n          <div class=\"card\">\n            <div class=\"card-header\" style=\"cursor: pointer;\">\n              Op\xE7\xF5es\n            </div>\n            <div class=\"card-body d-none\">\n\n              <div class=\"form-group\">\n                <label>Estrat\xE9gia</label>\n                <div class=\"form-check\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"to-strategy\" id=\"to-partial\" value=\"partial\" checked>\n                  <label class=\"form-check-label\" for=\"exampleRadios1\">\n                    Usar fei\xE7\xF5es da vis\xE3o atual\n                  </label>\n                </div>\n                <div class=\"form-check\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"to-strategy\" id=\"to-full\" value=\"full\">\n                  <label class=\"form-check-label\" for=\"to-full\">\n                    Usar todas as fei\xE7\xF5es\n                  </label>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label>Limitar fei\xE7\xF5es a</label>\n                <input value=\"2000\" type=\"number\" class=\"form-control\" id=\"to-max-features\" placeholder=\"2000\">\n              </div>\n              \n            </div>\n          </div>\n\n          <div class=\"row pr-3 pl-3\">\n            <div class=\"col-5 p-3\">\n              <button id=\"to-clear-btn\" type=\"button\" class=\"btn btn-light btn-block\">Limpar</button>\n            </div>\n            <div class=\"col-7 p-3\">\n              <button id=\"to-run-btn\" type=\"button\" class=\"btn btn-primary btn-block\" disabled>Gerar</button>\n            </div>\n          </div>\n\n         \n      \n            \n        \n        ";
      }
    }, {
      key: "_getData",
      value: function _getData() {
        var _this3 = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status != 200) {
              alert("Erro interno. Contacte o administrador do sistema.");
              return;
            }
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
              _this3._tables = response.data;
              _this3._listTables();
            } else {
              alert("Erro ao processar a requisição. Contacte o administrador do sistema.");
            }
          }
        };
        xhr.open('GET', 'response.json', true);
        xhr.send();
      }
    }, {
      key: "_getThematicDefinition",
      value: function _getThematicDefinition() {
        var i = document.getElementById('to-layer').value;
        var j = document.getElementById('to-attribute').value;
        var table = "".concat(this._tables[i].schema, ".").concat(this._tables[i].table);
        var field = this._tables[i].fields[j].column;
        var isQualitative = document.getElementById('to-qualitative').checked;
        var nature = isQualitative ? 'qualitativo' : 'quantitativo';
        var method = document.getElementById('to-method').value;
        var numClass = document.getElementById('to-class-number').value;
        return {
          table: table,
          field: field,
          nature: nature,
          method: method,
          numClass: numClass
        };
      }
    }, {
      key: "_getClassification",
      value: function _getClassification() {
        var _this4 = this;
        var d = this._getThematicDefinition();
        var query = "tabela=".concat(d.table, "&coluna=").concat(d.field, "&num_classes=").concat(d.numClass, "&metodo=").concat(d.method, "&natureza=").concat(d.nature);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status != 200) {
              alert("Erro interno. Contacte o administrador do sistema.");
              return;
            }
            var response = JSON.parse(xhr.responseText);
            if (response) {
              _this4._classes = response;
              _this4._draw();
            } else {
              alert("Erro ao processar a requisição. Contacte o administrador do sistema.");
            }
          }
        };
        //xhr.open('GET', '/geowise/mapa/gerar_classificacao?' + query, true);
        xhr.open('GET', 'quantitativo.json?' + query, true);
        xhr.send();
      }
    }, {
      key: "_draw",
      value: function _draw() {}
    }, {
      key: "_listTables",
      value: function _listTables() {
        var tablesElm = document.getElementById('to-layer');
        tablesElm.innerHTML = '<option value="-1">Selecione...</option>';
        for (var i = 0; i < this._tables.length; i++) {
          var option = document.createElement('option');
          option.value = i;
          option.innerHTML = this._tables[i].displayName;
          tablesElm.appendChild(option);
        }
      }
    }, {
      key: "_listAttributes",
      value: function _listAttributes() {
        var attributeElm = document.getElementById('to-attribute');
        attributeElm.innerHTML = '<option value="-1">Selecione...</option>';
        var i = document.getElementById('to-layer').value;
        for (var j = 0; j < this._tables[i].fields.length; j++) {
          var option = document.createElement('option');
          option.value = j;
          option.innerHTML = this._tables[i].fields[j].name;
          attributeElm.appendChild(option);
        }
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this5 = this;
        var headers = this.ui.querySelectorAll('.card-header');
        for (var i = 0; i < headers.length; i++) {
          var header = headers[i];
          header.addEventListener('click', function (evt) {
            var elm = evt.srcElement.parentElement.getElementsByClassName('card-body')[0];
            var classes = elm.classList;
            if (classes.contains('d-none')) {
              classes.remove('d-none');
            } else {
              classes.add('d-none');
            }
          });
        }
        document.getElementById('to-layer').addEventListener('change', function (evt) {
          var layerIdx = evt.target.value;
          if (layerIdx >= 0) {
            _this5._listAttributes();
          } else {
            var attributeElm = document.getElementById('to-attribute');
            attributeElm.innerHTML = '<option value="-1">Selecione...</option>';
            document.getElementById('to-qualitative').checked = false;
            document.getElementById('to-quantitative').checked = false;
          }
          handleProcBtn();
        });
        document.getElementById('to-attribute').addEventListener('change', function (evt) {
          var layerIdx = document.getElementById('to-layer').value;
          var attrIdx = evt.target.value;
          if (layerIdx >= 0 && attrIdx >= 0) {
            var attribute_type = _this5._tables[layerIdx].fields[attrIdx].attribute_type;
            switch (attribute_type) {
              case 'String':
              case 'Opcoes':
              case 'ForeignKey':
                document.getElementById('to-qualitative').checked = true;
                break;
              case 'Integer':
              case 'Float':
                document.getElementById('to-quantitative').checked = true;
                break;
              default:
                document.getElementById('to-qualitative').checked = false;
                document.getElementById('to-quantitative').checked = false;
                break;
            }
          } else {
            document.getElementById('to-qualitative').checked = false;
            document.getElementById('to-quantitative').checked = false;
          }
          handleClassificationUi();
          handleProcBtn();
        });
        document.getElementById('to-quantitative').addEventListener('input', function () {
          handleClassificationUi();
          handleProcBtn();
        });
        document.getElementById('to-qualitative').addEventListener('input', function () {
          handleClassificationUi();
          handleProcBtn();
        });
        document.getElementById('to-method').addEventListener('change', function () {
          handleClasDef();
          if (document.getElementById('to-method').value != 'int_definidos') {
            document.getElementById('to-class-def-card').classList.add('d-none');
          } else {
            document.getElementById('to-class-def-card').classList.remove('d-none');
          }
          handleProcBtn();
        });
        document.getElementById('to-class-number').addEventListener('change', function () {
          handleClasDef();
          writeSymbology();
          handleProcBtn();
        });
        document.getElementById('to-run-btn').addEventListener('click', function () {
          _this5._getClassification();
        });

        // UI Handle Functions

        function handleClassificationUi() {
          if (document.getElementById('to-quantitative').checked) {
            document.getElementById('to-class-card').classList.remove('d-none');
          } else {
            document.getElementById('to-class-card').classList.add('d-none');
          }
          writeSymbology();
        }
        function handleClasDef() {
          if (document.getElementById('to-method').value == 'int_definidos') {
            document.getElementById('to-class-def-list').innerHTML = '';
            var numClasses = document.getElementById('to-class-number').value;
            for (var _i = 0; _i < numClasses; _i++) {
              document.getElementById('to-class-def-list').innerHTML += "\n          <div class=\"row\">\n            <div class=\"col\">\n              <input value=\"\" type=\"number\" class=\"form-control  form-control-sm\" id=\"to-class-1\" placeholder=\"0\">\n            </div>\n            <div class=\"col-1\">\n              -\n            </div>\n            <div class=\"col\">\n              <input value=\"\" type=\"number\" class=\"form-control  form-control-sm\" id=\"to-class-1\" placeholder=\"0\">\n            </div>\n          </div>\n          ";
            }
          }
        }
        function handleProcBtn() {
          var a = document.getElementById('to-qualitative').checked;
          var b = document.getElementById('to-quantitative').checked;
          var i = document.getElementById('to-layer').value > -1;
          var j = document.getElementById('to-attribute').value > -1;
          if ((a || b) && i && j) {
            document.getElementById('to-run-btn').disabled = false;
          } else {
            document.getElementById('to-run-btn').disabled = true;
          }
        }
        function writeSymbology() {
          var order = {
            qualitative: ["Set2", "Accent", "Set1", "Set3", "Dark2", "Paired", "Pastel2", "Pastel1"],
            quantitative: ["OrRd", "PuBu", "BuPu", "Oranges", "BuGn", "YlOrBr", "YlGn", "Reds", "RdPu", "Greens", "YlGnBu", "Purples", "GnBu", "Greys", "YlOrRd", "PuRd", "Blues"],
            diverging: ["Spectral", "RdYlGn", "RdBu", "PiYG", "PRGn", "RdYlBu", "BrBG", "RdGy", "PuOr", "PuBuGn"]
          };
          var isQualitative = document.getElementById('to-qualitative').checked;
          var orderName = isQualitative ? 'qualitative' : 'quantitative';
          var classNumber = isQualitative ? 8 : document.getElementById('to-class-number').value;
          var checked = "checked";
          var palletElm = document.getElementById('to-color-pallet');
          palletElm.innerHTML = '';
          for (var _i2 = 0; _i2 < order[orderName].length; _i2++) {
            var colors = colorbrewer[order[orderName][_i2]][classNumber];
            if (colors) {
              var data = "\n            <div class=\"color-choose\">\n              <div class=\"color-select\">\n                <input type=\"radio\" name=\"to-color\" value=\"".concat(order[orderName][_i2], "\" ").concat(checked, ">\n              </div>\n            <div class=\"color-ramp\">");
              for (var j = 0; j < colors.length; j++) {
                data += "<div style=\"width: ".concat(100 / classNumber, "%; height: 20px; background: ").concat(colors[j], "; float:left;\"></div>");
              }
              data += '</div></div>';
              palletElm.innerHTML += data;
              checked = "";
            }
          }
        }
      }
    }, {
      key: "activate",
      value: function activate() {
        this._getData();
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
      }
    }]);
  }(GeoWidget);

  var CreateLineString = /*#__PURE__*/function (_GeoWidget) {
    function CreateLineString(config) {
      var _this;
      _classCallCheck(this, CreateLineString);
      config = config || {};
      config.tip = config.tip || 'Criar Linha';
      config.title = config.title || 'Criar Simples';
      config.class = config.class || 'map-app-draw-line';
      _this = _callSuper(this, CreateLineString, [config]);
      _this._externalSource = config.source;
      _this._firstPointFeature = new ol.Feature();
      _this._lastPointFeature = new ol.Feature();
      _this._auxFeature = new ol.Feature();
      _this._lineFeature = new ol.Feature();
      _this.ui = _this._getUiTemplate();
      return _this;
    }
    _inherits(CreateLineString, _GeoWidget);
    return _createClass(CreateLineString, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
          _this2._initInternalLayer();
        });
      }
    }, {
      key: "_initInternalLayer",
      value: function _initInternalLayer() {
        this._layer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0ff',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0ff'
              })
            })
          })
        });
        this._layer.getSource().addFeature(this._firstPointFeature);
        this._layer.getSource().addFeature(this._lastPointFeature);
        this._layer.getSource().addFeature(this._lineFeature);
        this._layer.setZIndex(99999);
        map.ol.addLayer(this._layer);
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        return "\n\n            <div class=\"d-none\" id=\"w-panel-".concat(this.id, "\" style=\"position: absolute; width: 100%; height: 90%; background: rgba(255,255,255,.95); z-index:9999;\">\n                <div style=\"margin: 0; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);\">\n                    <h6>Clique sobre o mapa ou <a id=\"w-cancel-").concat(this.id, "\" class=\"\" href=\"#\">cancelar</a></h6>\n                </div>\n            </div>\n\n            <div class='m-0 p-3'>\n                <h6>In\xEDcio</h6>\n                <ul class=\"nav nav-tabs\">\n                    <li class=\"nav-item\">\n                        <a id=\"ini-nav-abs-").concat(this.id, "\" class=\"nav-link active\" href=\"#\">Absoluta</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a id=\"ini-nav-map-").concat(this.id, "\" class=\"nav-link\" href=\"#\">A partir do mapa</a>\n                    </li>\n                </ul>\n                \n                <div class='row p-0 m-0'>\n                    \n                    <div id=\"ini-cnt-abs-").concat(this.id, "\" class='col pt-3 pb-3 border border-top-0'>\n                        <h6 class=\"card-subtitle mb-2 text-muted\">Coordenadas</h6>\n                        <div class=\"row\">\n                            <div class=\"col\">\n                                <input id=\"ini-cnt-abs-x-").concat(this.id, "\" type=\"number\" class=\"form-control form-control-sm\" placeholder=\"X inicial\">\n                            </div>\n                            <div class=\"col\">\n                                <input id=\"ini-cnt-abs-y-").concat(this.id, "\" type=\"number\" class=\"form-control form-control-sm\" placeholder=\"Y inicial\">\n                            </div>\n                            <div class=\"col\">\n                                <select id=\"ini-cnt-abs-srid-").concat(this.id, "\" class=\"form-control form-control-sm\">\n                                    <option value=\"\" selected>Selecione SRS</option>\n                                    <option value=\"EPSG:4326\">WGS-84</option>\n                                </select>\n                            </div>\n                            <div class=\"col-2\">\n                                <button id=\"ini-cnt-abs-btn-").concat(this.id, "\" type=\"submit\" class=\"btn btn-primary form-control-sm\" disabled>Adicionar</button>\n                            </div>\n                        </div>      \n                    </div>\n\n                    <div id=\"ini-cnt-map-").concat(this.id, "\" class='col pt-3 pb-3 border border-top-0 d-none'>\n                        \n                        <h6 class=\"card-subtitle mb-2 text-muted\">A partir do mapa</h6>\n                        <div class=\"row\">\n                            <div class=\"col\">\n                                <button id=\"ini-cnt-map-btn-").concat(this.id, "\" type=\"submit\" class=\"btn btn-primary form-control-sm\">Obter coordenadas</button>\n                            </div>\n                            <div class=\"col\">\n                                <p id=\"ini-cnt-map-coords-").concat(this.id, "\" class=\"float-right\"></p>\n                            </div>\n                        </div>      \n                    </div>\n                </div>\n\n                <h6 class=\"pt-3\">Final</h6>\n                <ul class=\"nav nav-tabs\">\n                    <li class=\"nav-item\">\n                        <a id=\"fim-nav-abs-").concat(this.id, "\" class=\"nav-link active\" href=\"#\">Absoluta</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a id=\"fim-nav-map-").concat(this.id, "\" class=\"nav-link\" href=\"#\">A partir do mapa</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a id=\"fim-nav-rel-").concat(this.id, "\" class=\"nav-link\" href=\"#\">Relativo</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a id=\"fim-nav-dir-").concat(this.id, "\" class=\"nav-link\" href=\"#\">Azimute e Dist\xE2ncia</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a id=\"fim-nav-dis-").concat(this.id, "\" class=\"nav-link\" href=\"#\">Dire\xE7\xE3o (mapa) e Dist\xE2ncia</a>\n                    </li>\n                </ul>\n                <div class='row p-0 m-0'>\n                    <div id=\"fim-cnt-abs-").concat(this.id, "\" class='col pt-3 pb-3 border border-top-0'>\n                        <h6 class=\"card-subtitle mb-2 text-muted\">Coordenadas</h6>\n                        <div class=\"row\">\n                            <div class=\"col\">\n                                <input id=\"fim-cnt-abs-x-").concat(this.id, "\" type=\"number\" class=\"form-control form-control-sm\" placeholder=\"X final\">\n                            </div>\n                            <div class=\"col\">\n                                <input id=\"fim-cnt-abs-y-").concat(this.id, "\" type=\"number\" class=\"form-control form-control-sm\" placeholder=\"Y final\">\n                            </div>\n                            <div class=\"col\">\n                                <select  id=\"fim-cnt-abs-srid-").concat(this.id, "\" class=\"form-control form-control-sm\">\n                                <option value=\"\" selected>Selecione SRS</option>\n                                <option value=\"EPSG:4326\">WGS-84</option>\n                                </select>\n                            </div>\n                            <div class=\"col-2\">\n                                <button id=\"fim-cnt-abs-btn-").concat(this.id, "\" type=\"submit\" class=\"btn btn-primary form-control-sm\" disabled>Adicionar</button>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"fim-cnt-map-").concat(this.id, "\" class='col pt-3 pb-3 border border-top-0 d-none'>\n                        <h6 class=\"card-subtitle mb-2 text-muted\">A partir do mapa</h6>\n                        <div class=\"row\">\n                            <div class=\"col\">\n                                <button id=\"fim-cnt-map-btn-").concat(this.id, "\" type=\"submit\" class=\"btn btn-primary form-control-sm\">Obter coordenadas</button>\n                            </div>\n                            <div class=\"col\">\n                                <p id=\"fim-cnt-map-coords-").concat(this.id, "\" class=\"float-right\"></p>\n                            </div>\n                        </div>\n                    \n                    </div>\n                    <div id=\"fim-cnt-rel-").concat(this.id, "\" class='col pt-3 pb-3 border border-top-0 d-none'>\n                        <h6 class=\"card-subtitle mb-2 text-muted\">Varia\xE7\xF5es (m)</h6>\n                        <div class=\"row\">\n                            <div class=\"col\">\n                                <input id=\"fim-cnt-rel-x-").concat(this.id, "\" type=\"number\" class=\"form-control form-control-sm\" placeholder=\"\u0394X\">\n                            </div>\n                            <div class=\"col\">\n                                <input id=\"fim-cnt-rel-y-").concat(this.id, "\" type=\"number\" class=\"form-control form-control-sm\" placeholder=\"\u0394Y\">\n                            </div>\n                            <div class=\"col-2\">\n                                <button id=\"fim-cnt-rel-btn-").concat(this.id, "\" type=\"submit\" class=\"btn btn-primary form-control-sm\" disabled>Adicionar</button>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"fim-cnt-dir-").concat(this.id, "\" class='col pt-3 pb-3 border border-top-0 d-none'>\n                        <h6 class=\"card-subtitle mb-2 text-muted\">Azimute e Dist\xE2ncia</h6>\n                        <div class=\"row\">\n                            <div class=\"col\">\n                                <input id=\"fim-cnt-dir-dir-").concat(this.id, "\" type=\"number\" class=\"form-control form-control-sm\" placeholder=\"Azimute\">\n                            </div>\n                            <div class=\"col\">\n                                <input id=\"fim-cnt-dir-dis-").concat(this.id, "\" type=\"number\" class=\"form-control form-control-sm\" placeholder=\"Dist\xE2ncia\">\n                            </div>\n                            <div class=\"col-2\">\n                                <button id=\"fim-cnt-dir-btn-").concat(this.id, "\" type=\"submit\" class=\"btn btn-primary form-control-sm\" disabled>Adicionar</button>\n                            </div>\n                              \n                        </div>\n                    </div>\n                    <div id=\"fim-cnt-dis-").concat(this.id, "\" class='col pt-3 pb-3 border border-top-0  d-none '>\n                        <h6 class=\"card-subtitle mb-2 text-muted\">Dist\xE2ncia, dire\xE7\xE3o relativa e dire\xE7\xE3o base</h6>\n                        <div class=\"row\">\n                            <div class=\"col\">\n                                <input id=\"fim-cnt-dis-dis-").concat(this.id, "\" type=\"number\" class=\"form-control form-control-sm\" placeholder=\"Dist\xE2ncia\">\n                            </div>\n                            <div class=\"col\">\n                                <input id=\"fim-cnt-dis-dir-").concat(this.id, "\" type=\"number\" class=\"form-control form-control-sm\" placeholder=\"Dire\xE7\xE3o relativa\">\n                            </div>\n                            <div class=\"col-4\">\n                                <button id=\"fim-cnt-dis-btn-").concat(this.id, "\" type=\"submit\" class=\"btn btn-primary form-control-sm btn-block\" disabled>Obter dire\xE7\xE3o base</button>\n                            </div>\n                             \n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"row pt-3\">\n                    <div class=\"col\">\n                        <button id=\"btn-clear-").concat(this.id, "\" type=\"button\" class=\"btn btn-light m-3\">Limpar</button>\n                    </div>\n                    <div class=\"col\">\n                        <button id=\"btn-proc-").concat(this.id, "\" type=\"button\" class=\"btn btn-primary float-right m-3\" disabled>Inserir Linha</button>\n                    </div>\n                </div>\n            </div>   \n        ");
      }
    }, {
      key: "_createPointGeom",
      value: function _createPointGeom(x, y, srid) {
        var coords = [parseFloat(x), parseFloat(y)];
        if (srid) coords = proj4(srid, this.map.srid, coords);
        return new ol.geom.Point(coords);
      }
    }, {
      key: "_createLine",
      value: function _createLine() {
        var p1 = this._firstPointFeature.getGeometry().getCoordinates().slice();
        var p2 = this._lastPointFeature.getGeometry().getCoordinates().slice();
        this._firstPointFeature.setGeometry(null);
        this._lastPointFeature.setGeometry(null);
        var geom = new ol.geom.LineString([p1, p2]);
        this._lineFeature.setGeometry(geom);
        var feature = new ol.Feature();
        feature.setGeometry(geom);
        this._externalSource.addFeature(feature);
        this._layer.getSource().clear();
      }
    }, {
      key: "_clearLine",
      value: function _clearLine() {
        this._lineFeature.setGeometry(null);
        this._lastPointFeature.setGeometry(null);
        this._firstPointFeature.setGeometry(null);
        this._iniCntAbsXElm.value = '';
        this._iniCntAbsYElm.value = '';
        this._iniCntAbsSridElm.value = '';
        this._iniCntMapCoordsElm.innerHTML = '';
        this._fimCntAbsXElm.value = '';
        this._fimCntAbsYElm.value = '';
        this._fimCntAbsSridElm.value = '';
        this._fimCntMapCoordsElm.innerHTML = '';
        this._fimCntRelXElm.value = '';
        this._fimCntRelYElm.value = '';
        this._fimCntDirDirElm.value = '';
        this._fimCntDirBtnElm.value = '';
        this._fimCntDirDisElm.value = '';
        this._fimCntDisDisElm.value = '';
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._iniNavAbsElm = document.getElementById("ini-nav-abs-".concat(this.id));
        this._iniNavMapElm = document.getElementById("ini-nav-map-".concat(this.id));
        this._iniCntAbsElm = document.getElementById("ini-cnt-abs-".concat(this.id));
        this._iniCntAbsXElm = document.getElementById("ini-cnt-abs-x-".concat(this.id));
        this._iniCntAbsYElm = document.getElementById("ini-cnt-abs-y-".concat(this.id));
        this._iniCntAbsBtn = document.getElementById("ini-cnt-abs-btn-".concat(this.id));
        this._iniCntAbsSridElm = document.getElementById("ini-cnt-abs-srid-".concat(this.id));
        this._iniCntMapElm = document.getElementById("ini-cnt-map-".concat(this.id));
        this._iniCntMapBtnElm = document.getElementById("ini-cnt-map-btn-".concat(this.id));
        this._iniCntMapCoordsElm = document.getElementById("ini-cnt-map-coords-".concat(this.id));
        this._fimNavAbsElm = document.getElementById("fim-nav-abs-".concat(this.id));
        this._fimNavMapElm = document.getElementById("fim-nav-map-".concat(this.id));
        this._fimNavRelElm = document.getElementById("fim-nav-rel-".concat(this.id));
        this._fimNavDirElm = document.getElementById("fim-nav-dir-".concat(this.id));
        this._fimNavDisElm = document.getElementById("fim-nav-dis-".concat(this.id));
        this._fimCntAbsElm = document.getElementById("fim-cnt-abs-".concat(this.id));
        this._fimCntAbsXElm = document.getElementById("fim-cnt-abs-x-".concat(this.id));
        this._fimCntAbsYElm = document.getElementById("fim-cnt-abs-y-".concat(this.id));
        this._fimCntAbsSridElm = document.getElementById("fim-cnt-abs-srid-".concat(this.id));
        this._fimCntAbsBtnElm = document.getElementById("fim-cnt-abs-btn-".concat(this.id));
        this._fimCntMapCoordsElm = document.getElementById("fim-cnt-map-coords-".concat(this.id));
        this._fimCntMapElm = document.getElementById("fim-cnt-map-".concat(this.id));
        this._fimCntMapBtnElm = document.getElementById("fim-cnt-map-btn-".concat(this.id));
        this._fimCntRelElm = document.getElementById("fim-cnt-rel-".concat(this.id));
        this._fimCntRelXElm = document.getElementById("fim-cnt-rel-x-".concat(this.id));
        this._fimCntRelYElm = document.getElementById("fim-cnt-rel-y-".concat(this.id));
        this._fimCntRelBtnElm = document.getElementById("fim-cnt-rel-btn-".concat(this.id));
        this._fimCntDirElm = document.getElementById("fim-cnt-dir-".concat(this.id));
        this._fimCntDirDirElm = document.getElementById("fim-cnt-dir-dir-".concat(this.id));
        this._fimCntDirBtnElm = document.getElementById("fim-cnt-dir-btn-".concat(this.id));
        this._fimCntDirDisElm = document.getElementById("fim-cnt-dir-dis-".concat(this.id));
        this._fimCntDisElm = document.getElementById("fim-cnt-dis-".concat(this.id));
        this._fimCntDisDisElm = document.getElementById("fim-cnt-dis-dis-".concat(this.id));
        this._fimCntDisDirElm = document.getElementById("fim-cnt-dis-dir-".concat(this.id));
        this._fimCntDisBtnElm = document.getElementById("fim-cnt-dis-btn-".concat(this.id));
        this._btnProcElm = document.getElementById("btn-proc-".concat(this.id));
        this._btnClearElm = document.getElementById("btn-clear-".concat(this.id));
        this._cancelPointElm = document.getElementById("w-cancel-".concat(this.id));
        this._waitPanelElm = document.getElementById("w-panel-".concat(this.id));
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        // Navs
        this._iniNavAbsElm.addEventListener('click', function () {
          _this3._iniNavAbsElm.classList.add('active');
          _this3._iniNavMapElm.classList.remove('active');
          _this3._iniCntAbsElm.classList.remove('d-none');
          _this3._iniCntMapElm.classList.add('d-none');
        });
        this._iniNavMapElm.addEventListener('click', function () {
          _this3._iniNavAbsElm.classList.remove('active');
          _this3._iniNavMapElm.classList.add('active');
          _this3._iniCntAbsElm.classList.add('d-none');
          _this3._iniCntMapElm.classList.remove('d-none');
        });
        this._fimNavAbsElm.addEventListener('click', function () {
          _this3._fimNavAbsElm.classList.add('active');
          _this3._fimNavMapElm.classList.remove('active');
          _this3._fimNavRelElm.classList.remove('active');
          _this3._fimNavDirElm.classList.remove('active');
          _this3._fimNavDisElm.classList.remove('active');
          _this3._fimCntAbsElm.classList.remove('d-none');
          _this3._fimCntMapElm.classList.add('d-none');
          _this3._fimCntRelElm.classList.add('d-none');
          _this3._fimCntDirElm.classList.add('d-none');
          _this3._fimCntDisElm.classList.add('d-none');
        });
        this._fimNavMapElm.addEventListener('click', function () {
          _this3._fimNavAbsElm.classList.remove('active');
          _this3._fimNavMapElm.classList.add('active');
          _this3._fimNavRelElm.classList.remove('active');
          _this3._fimNavDirElm.classList.remove('active');
          _this3._fimNavDisElm.classList.remove('active');
          _this3._fimCntAbsElm.classList.add('d-none');
          _this3._fimCntMapElm.classList.remove('d-none');
          _this3._fimCntRelElm.classList.add('d-none');
          _this3._fimCntDirElm.classList.add('d-none');
          _this3._fimCntDisElm.classList.add('d-none');
        });
        this._fimNavRelElm.addEventListener('click', function () {
          _this3._fimNavAbsElm.classList.remove('active');
          _this3._fimNavMapElm.classList.remove('active');
          _this3._fimNavRelElm.classList.add('active');
          _this3._fimNavDirElm.classList.remove('active');
          _this3._fimNavDisElm.classList.remove('active');
          _this3._fimCntAbsElm.classList.add('d-none');
          _this3._fimCntMapElm.classList.add('d-none');
          _this3._fimCntRelElm.classList.remove('d-none');
          _this3._fimCntDirElm.classList.add('d-none');
          _this3._fimCntDisElm.classList.add('d-none');
        });
        this._fimNavDirElm.addEventListener('click', function () {
          _this3._fimNavAbsElm.classList.remove('active');
          _this3._fimNavMapElm.classList.remove('active');
          _this3._fimNavRelElm.classList.remove('active');
          _this3._fimNavDirElm.classList.add('active');
          _this3._fimNavDisElm.classList.remove('active');
          _this3._fimCntAbsElm.classList.add('d-none');
          _this3._fimCntMapElm.classList.add('d-none');
          _this3._fimCntRelElm.classList.add('d-none');
          _this3._fimCntDirElm.classList.remove('d-none');
          _this3._fimCntDisElm.classList.add('d-none');
        });
        this._fimNavDisElm.addEventListener('click', function () {
          _this3._fimNavAbsElm.classList.remove('active');
          _this3._fimNavMapElm.classList.remove('active');
          _this3._fimNavRelElm.classList.remove('active');
          _this3._fimNavDirElm.classList.remove('active');
          _this3._fimNavDisElm.classList.add('active');
          _this3._fimCntAbsElm.classList.add('d-none');
          _this3._fimCntMapElm.classList.add('d-none');
          _this3._fimCntRelElm.classList.add('d-none');
          _this3._fimCntDirElm.classList.add('d-none');
          _this3._fimCntDisElm.classList.remove('d-none');
        });

        // Inputs
        this._iniCntAbsXElm.addEventListener('input', function () {
          _this3._iniCntAbsBtn.disabled = !isFullFillValues([_this3._iniCntAbsXElm, _this3._iniCntAbsYElm, _this3._iniCntAbsSridElm]);
        });
        this._iniCntAbsYElm.addEventListener('input', function () {
          _this3._iniCntAbsBtn.disabled = !isFullFillValues([_this3._iniCntAbsXElm, _this3._iniCntAbsYElm, _this3._iniCntAbsSridElm]);
        });
        this._iniCntAbsSridElm.addEventListener('change', function () {
          _this3._iniCntAbsBtn.disabled = !isFullFillValues([_this3._iniCntAbsXElm, _this3._iniCntAbsYElm, _this3._iniCntAbsSridElm]);
        });
        this._fimCntAbsXElm.addEventListener('input', function () {
          _this3._fimCntAbsBtnElm.disabled = !isFullFillValues([_this3._fimCntAbsXElm, _this3._fimCntAbsYElm, _this3._fimCntAbsSridElm]);
        });
        this._fimCntAbsYElm.addEventListener('input', function () {
          _this3._fimCntAbsBtnElm.disabled = !isFullFillValues([_this3._fimCntAbsXElm, _this3._fimCntAbsYElm, _this3._fimCntAbsSridElm]);
        });
        this._fimCntAbsSridElm.addEventListener('change', function () {
          _this3._fimCntAbsBtnElm.disabled = !isFullFillValues([_this3._fimCntAbsXElm, _this3._fimCntAbsYElm, _this3._fimCntAbsSridElm]);
        });
        this._fimCntRelXElm.addEventListener('input', function () {
          _this3._fimCntRelBtnElm.disabled = !isFullFillValues([_this3._fimCntRelXElm, _this3._fimCntRelYElm]);
          _this3._fimCntRelBtnElm.disabled = _this3._firstPointFeature.getGeometry() ? false : true;
        });
        this._fimCntRelYElm.addEventListener('input', function () {
          _this3._fimCntRelBtnElm.disabled = !isFullFillValues([_this3._fimCntRelXElm, _this3._fimCntRelYElm]);
          _this3._fimCntRelBtnElm.disabled = _this3._firstPointFeature.getGeometry() ? false : true;
        });
        this._fimCntDirDirElm.addEventListener('input', function () {
          _this3._fimCntDirBtnElm.disabled = !isFullFillValues([_this3._fimCntDirDirElm, _this3._fimCntDirDisElm]);
          _this3._fimCntDirBtnElm.disabled = _this3._firstPointFeature.getGeometry() ? false : true;
        });
        this._fimCntDirDisElm.addEventListener('input', function () {
          _this3._fimCntDirBtnElm.disabled = !isFullFillValues([_this3._fimCntDirDirElm, _this3._fimCntDirDisElm]);
          _this3._fimCntDirBtnElm.disabled = _this3._firstPointFeature.getGeometry() ? false : true;
        });
        this._fimCntDisDisElm.addEventListener('input', function () {
          _this3._fimCntDisBtnElm.disabled = !isFullFillValues([_this3._fimCntDisDisElm]);
          _this3._fimCntDirBtnElm.disabled = _this3._firstPointFeature.getGeometry() ? false : true;
        });
        this._fimCntDisDirElm.addEventListener('input', function () {
          if (_this3._firstPointFeature.getGeometry() && _this3._lastPointFeature.getGeometry()) {
            var dis = parseFloat(_this3._fimCntDisDisElm.value);
            var relDir = _this3._fimCntDisDirElm.value;
            relDir = relDir != '' ? parseFloat(relDir) / 180 * Math.PI : 0;
            var p1 = _this3._firstPointFeature.getGeometry().getCoordinates().slice();
            var p2 = _this3._auxFeature.getGeometry().getCoordinates().slice();
            var dir = Math.atan2(p2[0] - p1[0], p2[1] - p1[1]);
            dir = dir + relDir;
            dir = dir < 0 ? dir + Math.PI * 2 : dir;
            p2[0] = p1[0] + dis * Math.sin(dir);
            p2[1] = p1[1] + dis * Math.cos(dir);
            var geom = _this3._createPointGeom(p2[0], p2[1], 'EPSG:3857');
            _this3._lastPointFeature.setGeometry(geom);
            _this3._waitPanelElm.classList.add('d-none');
            handleProcBtn();
          }
        });

        // Btns
        this._iniCntAbsBtn.addEventListener('click', function () {
          var geom = _this3._createPointGeom(_this3._iniCntAbsXElm.value, _this3._iniCntAbsYElm.value, _this3._iniCntAbsSridElm.value);
          _this3._firstPointFeature.setGeometry(geom);
          _this3.map.fitTo(geom, 'openlayers');
          handleProcBtn();
        });
        this._cancelPointElm.addEventListener('click', function () {
          _this3.map.toolbox.draw.stopDrawing();
          _this3._waitPanelElm.classList.add('d-none');
          handleProcBtn();
        });
        this._iniCntMapBtnElm.addEventListener('click', function () {
          _this3._waitPanelElm.classList.remove('d-none');
          _this3.map.toolbox.draw.getPoint().then(function (p) {
            _this3._firstPointFeature.setGeometry(p.getGeometry());
            _this3._waitPanelElm.classList.add('d-none');
            _this3._iniCntMapCoordsElm.innerHTML = p.getGeometry().getCoordinates().toString().replace(',', ' ').replace('.', ',').replace('.', ',');
            handleProcBtn();
          });
        });
        this._fimCntAbsBtnElm.addEventListener('click', function () {
          var geom = _this3._createPointGeom(_this3._fimCntAbsXElm.value, _this3._fimCntAbsYElm.value, _this3._fimCntAbsSridElm.value);
          _this3._lastPointFeature.setGeometry(geom);
          _this3.map.fitTo(geom, 'openlayers');
          handleProcBtn();
        });
        this._fimCntMapBtnElm.addEventListener('click', function () {
          _this3._waitPanelElm.classList.remove('d-none');
          _this3.map.toolbox.draw.getPoint().then(function (p) {
            _this3._lastPointFeature.setGeometry(p.getGeometry());
            _this3._waitPanelElm.classList.add('d-none');
            _this3._fimCntMapCoordsElm.innerHTML = p.getGeometry().getCoordinates().toString().replace(',', ' ').replace('.', ',').replace('.', ',');
            handleProcBtn();
          });
        });
        this._fimCntRelBtnElm.addEventListener('click', function () {
          var dx = parseFloat(_this3._fimCntRelXElm.value);
          var dy = parseFloat(_this3._fimCntRelYElm.value);
          var coords = _this3._firstPointFeature.getGeometry().getCoordinates().slice();
          coords = proj4(_this3.map.srid, 'EPSG:3857', coords);
          coords[0] += dx;
          coords[1] += dy;
          var geom = _this3._createPointGeom(coords[0], coords[1], 'EPSG:3857');
          _this3._lastPointFeature.setGeometry(geom);
          handleProcBtn();
        });
        this._fimCntDirBtnElm.addEventListener('click', function () {
          var dir = parseFloat(_this3._fimCntDirDirElm.value);
          var dis = parseFloat(_this3._fimCntDirDisElm.value);
          var coords = _this3._firstPointFeature.getGeometry().getCoordinates().slice();
          coords = proj4(_this3.map.srid, 'EPSG:3857', coords);
          coords[0] += dis * Math.sin(dir / 180 * Math.PI);
          coords[1] += dis * Math.cos(dir / 180 * Math.PI);
          var geom = _this3._createPointGeom(coords[0], coords[1], 'EPSG:3857');
          _this3._lastPointFeature.setGeometry(geom);
          handleProcBtn();
        });
        this._fimCntDisBtnElm.addEventListener('click', function () {
          var dis = parseFloat(_this3._fimCntDisDisElm.value);
          var relDir = _this3._fimCntDisDirElm.value;
          relDir = relDir != '' ? parseFloat(relDir) / 180 * Math.PI : 0;
          _this3.map.toolbox.draw.getPoint().then(function (p) {
            var p1 = _this3._firstPointFeature.getGeometry().getCoordinates();
            var p2 = p.getGeometry().getCoordinates();
            var dir = Math.atan2(p2[0] - p1[0], p2[1] - p1[1]);
            dir = dir < 0 ? dir + Math.PI * 2 : dir;
            dir += relDir;
            p2[0] = p1[0] + dis * Math.sin(dir);
            p2[1] = p1[1] + dis * Math.cos(dir);
            var geom = _this3._createPointGeom(p2[0], p2[1], 'EPSG:3857');
            _this3._lastPointFeature.setGeometry(geom);
            _this3._auxFeature.setGeometry(geom);
            _this3._waitPanelElm.classList.add('d-none');
            handleProcBtn();
          });
        });
        this._btnProcElm.addEventListener('click', function () {
          _this3._createLine();
        });
        this._btnClearElm.addEventListener('click', function () {
          _this3._clearLine();
        });

        // fncs
        var isFullFillValues = function isFullFillValues(elms) {
          var missing = false;
          for (var i = 0; i < elms.length; i++) {
            if (elms[i].value == '') {
              missing = true;
            }
          }
          return !missing;
        };
        var handleProcBtn = function handleProcBtn() {
          var hasFirstPoint = Boolean(_this3._firstPointFeature.getGeometry());
          var hasLastPoint = Boolean(_this3._lastPointFeature.getGeometry());
          _this3._btnProcElm.disabled = !(hasFirstPoint && hasLastPoint);
        };
      }
    }, {
      key: "activate",
      value: function activate() {
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.hide();
      }
    }]);
  }(GeoWidget);

  var ParallelCopy = /*#__PURE__*/function (_GeoWidget) {
    function ParallelCopy(config) {
      var _this;
      _classCallCheck(this, ParallelCopy);
      config = config || {};
      config.tip = config.tip || 'Cópia';
      config.title = config.title || 'Cópia';
      config.class = config.class || 'map-app-rotate-geom';
      _this = _callSuper(this, ParallelCopy, [config]);
      _this._select = null;
      _this._selectedFeatures = [];
      _this._selectedSides = [];
      _this._copiedFeatures = [];
      _this._layer = null;
      _this._externalSource = config.source;
      _this.ui = "\n            <div class=\"p-3\">\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <div class=\"form-group\">\n                            <label>Selecione a fei\xE7\xE3o a ser copiada</label><br>\n                            <button id=\"select-btn-".concat(_this.id, "\" type=\"button\" class=\"btn btn-primary\">Selecionar fei\xE7\xE3o</button>\n                            <small id=\"count-feature-text-").concat(_this.id, "\" class=\"pl-2\"> Nenhuma fei\xE7\xE3o selecionada.</small>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <div class=\"form-group\">\n                            <label>Modo da c\xF3pia</label>\n                            <div class=\"form-check\">\n                                <input id=\"parallel-check-").concat(_this.id, "\" class=\"form-check-input\" type=\"radio\" name=\"copy-mode\" value=\"centroid\">\n                                <label class=\"form-check-label\" for=\"parallel-check-").concat(_this.id, "\">\n                                    Paralelo a um lado\n                                </label>\n                            </div>\n                            <div class=\"form-check\">\n                                <input id=\"direction-check-").concat(_this.id, "\" class=\"form-check-input\" type=\"radio\" name=\"copy-mode\"  value=\"first\">\n                                <label class=\"form-check-label\" for=\"direction-check-").concat(_this.id, "\">\n                                    Em uma dire\xE7\xE3o\n                                </label>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"group-feature-side-").concat(_this.id, "\" class=\"col d-none\">\n                        <div class=\"form-group\">\n                            <label>Selecione o lado de refer\xEAncia</label><br>\n                            <button id=\"select-side-btn-").concat(_this.id, "\" type=\"button\" class=\"btn btn-primary\">Selecionar lado</button>\n                            <br>\n                            <small id=\"count-side-text-").concat(_this.id, "\" class=\"pl-2\"> Nenhum lado selecionado.</small>\n                        </div>\n                    </div>\n                    <div id=\"group-dir-").concat(_this.id, "\" class=\"col d-none\">\n                        <div class=\"form-group\">\n                            <label>Dire\xE7\xE3o da c\xF3pia (Azimute)</label>\n                            <input id=\"az-input-").concat(_this.id, "\" type=\"number\" class=\"form-control\" placeholder=\"Dire\xE7\xE3o (Azimute)\" value=\"0\" step=\"0.1\" required>\n                        </div>\n                    </div>\n                </div>\n                <div id=\"group-side-").concat(_this.id, "\" class=\"row d-none\">\n                    <div class=\"col\">\n                        <div class=\"form-group\">\n                            <label>Lado para copiar</label>\n                            <div class=\"form-check\">\n                                <input id=\"right-check-").concat(_this.id, "\" class=\"form-check-input\" type=\"radio\" name=\"rotate-point\" value=\"centroid\" checked>\n                                <label class=\"form-check-label\" for=\"centroid-check-").concat(_this.id, "\">\n                                    Direito\n                                </label>\n                            </div>\n                            <div class=\"form-check\">\n                                <input id=\"left-check-").concat(_this.id, "\" class=\"form-check-input\" type=\"radio\" name=\"rotate-point\"  value=\"first\">\n                                <label class=\"form-check-label\" for=\"left-check-").concat(_this.id, "\">\n                                    Esquerdo\n                                </label>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <div class=\"form-group\">\n                            <label>Dist\xE2ncia entre c\xF3pias (m)</label>\n                            <input id=\"dist-input-").concat(_this.id, "\" type=\"number\" class=\"form-control\" placeholder=\"Dist\xE2ncia\" value=\"0\" step=\"0.1\">\n                        </div>\n                    </div>\n                    <div class=\"col\">\n                        <div class=\"form-group\">\n                            <label>N\xFAmero de c\xF3pias</label>\n                            <input id=\"num-input-").concat(_this.id, "\" type=\"number\" class=\"form-control\" placeholder=\"N\xFAmero de c\xF3pias\" value=\"1\" step=\"1\" min=\"1\">\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <div class=\"form-group\">\n                            <br>\n                            <button id=\"clear-btn-").concat(_this.id, "\" type=\"button\" class=\"btn btn-light btn-block\">Limpar</button>\n                        </div>\n                    </div>\n                    <div class=\"col\">\n                        <div class=\"form-group\">\n                            <br>\n                            <button id=\"run-btn-").concat(_this.id, "\" type=\"button\" class=\"btn btn-primary btn-block\" disabled>Copiar</button>\n                        </div>\n                    </div>\n                </div>\n            </div>");
      return _this;
    }
    _inherits(ParallelCopy, _GeoWidget);
    return _createClass(ParallelCopy, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this._initLayer();
        this._initInteractions();
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
        });
        if (!this._externalSource) console.error('Set a source to ParallelCopy.');
      }
    }, {
      key: "_initInteractions",
      value: function _initInteractions() {
        var _this3 = this;
        this._featureSelect = new ol.interaction.Select();
        this._sideSelect = new ol.interaction.Select({
          layers: [this._sideLayer]
        });
        this._featureSelect.on('select', function (e) {
          _this3._selectedFeatures = e.target.getFeatures().getArray();
          _this3._sideFeatures = _this3._generateSideFeatures(_this3._selectedFeatures);
          _this3._sideLayer.getSource().addFeatures(_this3._sideFeatures);
          _this3.map.ol.removeInteraction(_this3._featureSelect);
          _this3._handleCountText();
          _this3._runBtn.disabled = true;
          _this3._selectSideBtn.disabled = false;
        });
        this._sideSelect.on('select', function (e) {
          _this3._selectedSides = e.target.getFeatures().getArray();
          _this3._handleCountText();
          _this3._runBtn.disabled = _this3._selectedSides == 0;
        });
      }
    }, {
      key: "_initLayer",
      value: function _initLayer() {
        this._layer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 0, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#f0f',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#f0f'
              })
            })
          })
        });
        this._sideLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#0ff',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#0ff'
              })
            })
          })
        });
        this._layer.setZIndex(9998);
        this._sideLayer.setZIndex(99999);
        this.map.ol.addLayer(this._layer);
        this.map.ol.addLayer(this._sideLayer);
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._selectBtn = document.getElementById("select-btn-".concat(this.id));
        this._countFeatureText = document.getElementById("count-feature-text-".concat(this.id));
        this._parallelCheck = document.getElementById("parallel-check-".concat(this.id));
        this._directionCheck = document.getElementById("direction-check-".concat(this.id));
        this._groupSide = document.getElementById("group-side-".concat(this.id));
        this._groupFeatureSide = document.getElementById("group-feature-side-".concat(this.id));
        this._selectSideBtn = document.getElementById("select-side-btn-".concat(this.id));
        this._countSideText = document.getElementById("count-side-text-".concat(this.id));
        this._groupDir = document.getElementById("group-dir-".concat(this.id));
        this._azInput = document.getElementById("az-input-".concat(this.id));
        this._rightCheck = document.getElementById("right-check-".concat(this.id));
        this._leftCheck = document.getElementById("left-check-".concat(this.id));
        this._distInput = document.getElementById("dist-input-".concat(this.id));
        this._numInput = document.getElementById("num-input-".concat(this.id));
        this._clearBtn = document.getElementById("clear-btn-".concat(this.id));
        this._runBtn = document.getElementById("run-btn-".concat(this.id));
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this4 = this;
        this._selectBtn.addEventListener('click', function () {
          _this4._selectFeaures();
        });
        this._parallelCheck.addEventListener('click', function () {
          _this4._groupSide.classList.remove('d-none');
          _this4._groupFeatureSide.classList.remove('d-none');
          _this4._groupDir.classList.add('d-none');
          _this4._handleCountText();
          _this4._runBtn.disabled = _this4._selectedSides == 0;
        });
        this._directionCheck.addEventListener('click', function () {
          _this4._groupSide.classList.add('d-none');
          _this4._groupFeatureSide.classList.add('d-none');
          _this4._groupDir.classList.remove('d-none');
          _this4._runBtn.disabled = false;
        });
        this._selectSideBtn.addEventListener('click', function () {
          _this4._selectSide();
        });
        this._azInput.addEventListener('input', function () {
          _this4._copyFeatures();
        });
        this._rightCheck.addEventListener('click', function () {
          _this4._copyFeatures();
        });
        this._leftCheck.addEventListener('click', function () {
          _this4._copyFeatures();
        });
        this._distInput.addEventListener('input', function () {
          _this4._copyFeatures();
        });
        this._numInput.addEventListener('input', function () {
          _this4._copyFeatures();
        });
        this._clearBtn.addEventListener('click', function () {
          _this4._clear();
        });
        this._runBtn.addEventListener('click', function () {
          _this4._persist();
        });
      }
    }, {
      key: "_generateSideFeatures",
      value: function _generateSideFeatures(features) {
        var gf = new ol.format.GeoJSON();
        var sides = [];
        for (var i = 0; i < features.length; i++) {
          var geom = gf.writeGeometryObject(this._selectedFeatures[i].getGeometry());
          turf.segmentEach(geom, function (currentSegment) {
            var segmentFeature = gf.readFeatureFromObject(currentSegment);
            sides.push(segmentFeature);
          });
        }
        return sides;
      }
    }, {
      key: "_handleCountText",
      value: function _handleCountText() {
        var count = this._selectedFeatures.length;
        var sideCount = this._sideFeatures.length;
        var selSideCount = this._selectedSides.length;
        switch (count) {
          case 0:
            this._countFeatureText.innerHTML = sideCount == 0 ? 'Nenhuma feição selecionada.' : '';
            break;
          case 1:
            this._countFeatureText.innerHTML = 'Feição selecionada.';
            break;
          default:
            this._countFeatureText.innerHTML = count + ' feições selecionadas.';
            break;
        }
        switch (selSideCount) {
          case 0:
            this._countSideText.innerHTML = 'Nenhum lado selecionado.';
            break;
          case 1:
            this._countSideText.innerHTML = 'Lado selecionado.';
            break;
          default:
            this._countSideText.innerHTML = count + ' lados selecionados.';
            break;
        }
      }
    }, {
      key: "_selectFeaures",
      value: function _selectFeaures() {
        this._selectBtn.disabled = true;
        this.map.ol.addInteraction(this._featureSelect);
      }
    }, {
      key: "_selectSide",
      value: function _selectSide() {
        this._selectBtn.disabled = true;
        this._selectSideBtn.disabled = true;
        this.map.ol.addInteraction(this._sideSelect);
      }
    }, {
      key: "_clear",
      value: function _clear() {
        this._featureSelect.getFeatures().clear();
        this._sideSelect.getFeatures().clear();
        this._selectedFeatures = [];
        this._sideFeatures = [];
        this._sideLayer.getSource().clear();
        this._layer.getSource().clear();
        this.map.ol.removeInteraction(this._sideSelect);
        this._selectBtn.disabled = false;
        this._selectSideBtn.disabled = true;
        this._parallelCheck.checked = false;
        this._directionCheck.checked = false;
        this._groupSide.classList.add('d-none');
        this._groupFeatureSide.classList.add('d-none');
        this._groupDir.classList.add('d-none');
        this._azInput.value = 0;
        this._rightCheck.checked = true;
        this._leftCheck.checked = false;
        this._distInput.value = 0;
        this._numInput.value = 1;
        this._runBtn.disabled = true;
        this._handleCountText();
      }
    }, {
      key: "_copyFeatures",
      value: function _copyFeatures() {
        var gf = new ol.format.GeoJSON();
        var dist = Number(this._distInput.value);
        var reverse = this._leftCheck.checked ? -1 : 1;
        var az = Number(this._azInput.value);
        var copyCount = Number(this._numInput.value);
        var opt = {
          units: 'meters'
        };
        this._layer.getSource().clear();
        for (var i = 0; i < this._selectedFeatures.length; i++) {
          if (this._selectedSides.length > 0) {
            var side = gf.writeGeometryObject(this._selectedSides[i].getGeometry());
            az = this._getAzimuth(side);
            this._azInput.value = az;
            az += 90;
          }
          this._selectedFeatures[i].getGeometry().transform(this.map.srid, 'EPSG:4326');
          for (var j = 0; j < copyCount; j++) {
            var geom = gf.writeGeometryObject(this._selectedFeatures[i].getGeometry());
            var copyGeom = turf.transformTranslate(geom, dist * (j + 1) * reverse, az, opt);
            var copyFeature = gf.readFeatureFromObject(copyGeom);
            copyFeature.getGeometry().transform('EPSG:4326', this.map.srid);
            this._layer.getSource().addFeature(copyFeature);
            this._copiedFeatures.push(copyFeature);
          }
          this._selectedFeatures[i].getGeometry().transform('EPSG:4326', this.map.srid);
        }
      }
    }, {
      key: "_getAzimuth",
      value: function _getAzimuth(geom) {
        var coords = [];
        turf.coordEach(geom, function (currentCoord) {
          coords.push(currentCoord);
        });
        var bearing = turf.bearing(coords[0], coords[coords.length - 1]);
        return turf.bearingToAzimuth(bearing);
      }
    }, {
      key: "_persist",
      value: function _persist() {
        if (this._externalSource) {
          var features = this._layer.getSource().getFeatures();
          this._externalSource.addFeatures(features);
        }
        this._clear();
      }
    }, {
      key: "activate",
      value: function activate() {
        _get(_getPrototypeOf(ParallelCopy.prototype), "activate", this).call(this);
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this._clear();
        this.hide();
        _get(_getPrototypeOf(ParallelCopy.prototype), "deactivate", this).call(this);
      }
    }]);
  }(GeoWidget);

  var SimpleMeasure = /*#__PURE__*/function (_GeoTool) {
    function SimpleMeasure(config) {
      var _this;
      _classCallCheck(this, SimpleMeasure);
      config = config || {};
      config.tip = config.tip || 'Medir';
      config.class = config.class || 'map-app-measure-line-control';
      config.measureType = config.measureType || 'length';
      _this = _callSuper(this, SimpleMeasure, [config]);
      _this._measureType = config.measureType;
      _this._layer = config.layer;
      _this._overlays = [];
      return _this;
    }
    _inherits(SimpleMeasure, _GeoTool);
    return _createClass(SimpleMeasure, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "_interactionMeasures",
      value: function _interactionMeasures(primitive) {
        var _this2 = this;
        var drawInteraction = this.map.toolbox.draw.getInteraction();
        var ld = this.map.geodesc.lineDescriptor;
        var pd = this.map.geodesc.polygonDescriptor;
        var ad = this.map.geodesc.azimuthDescriptor;
        var overlaysCollection = [];
        drawInteraction.on('drawstart', function (e) {
          var sketch = e.feature;
          var feat = new ol.Feature();
          sketch.getGeometry().on('change', function (evt) {
            feat.setGeometry(evt.target.clone());
            var features = [feat];
            var labelClickCb = function labelClickCb() {
              drawInteraction.finishDrawing();
            };
            var tolerance = 10;
            if (primitive == 'line') {
              overlaysCollection = ld({
                features: features,
                overlaysCollection: overlaysCollection,
                labelClickCb: labelClickCb,
                tolerance: tolerance
              });
            } else if (primitive == 'polygon') {
              overlaysCollection = pd({
                features: features,
                overlaysCollection: overlaysCollection,
                labelClickCb: labelClickCb
              });
            } else if (primitive == 'azimuth') {
              overlaysCollection = ad({
                features: features,
                overlaysCollection: overlaysCollection,
                labelClickCb: labelClickCb
              });
            }
          });
        });
        drawInteraction.on('drawend', function (e) {
          var keys = Object.keys(overlaysCollection);
          keys.forEach(function (key) {
            _this2.map.ol.removeOverlay(overlaysCollection[key]);
          });
        });
      }
    }, {
      key: "_clearMeasures",
      value: function _clearMeasures() {
        var _this3 = this;
        return new Promise(function (resolve, reject) {
          var features = _this3._layer.getSource().getFeatures();
          var _loop = function _loop() {
            var f = features[i];
            var overlays = f.get('overlays');
            if (overlays) {
              var keys = Object.keys(overlays);
              keys.forEach(function (key) {
                _this3.map.ol.removeOverlay(overlays[key]);
              });
            }
            _this3._layer.getSource().removeFeature(f);
          };
          for (var i = 0; i < features.length; i++) {
            _loop();
          }
          _this3._overlays = [];
          new Notify({
            message: 'Todas as medidas foram removidas.',
            type: 'success',
            timeout: 5
          }).show();
          resolve();
        });
      }
    }, {
      key: "_undo",
      value: function _undo() {
        var _this4 = this;
        return new Promise(function (resolve, reject) {
          var count = _this4._layer.getSource().getFeatures().length;
          if (count > 0) {
            var feature = _this4._layer.getSource().getFeatures()[count - 1];
            var overlays = feature.get('overlays');
            var keys = Object.keys(overlays);
            keys.forEach(function (key) {
              _this4.map.ol.removeOverlay(overlays[key]);
            });
            _this4._layer.getSource().removeFeature(feature);
          } else {
            new Notify({
              message: 'Todas as medidas foram removidas.',
              type: 'success',
              timeout: 5
            }).show();
          }
          resolve();
        });
      }
    }, {
      key: "_initMeasure",
      value: function _initMeasure() {
        var _this5 = this;
        switch (this._measureType) {
          case 'length':
            this.map.toolbox.draw.getPolyline().then(function (line) {
              var features = [line];
              var overlayers = _this5.map.geodesc.lineDescriptor({
                features: features
              });
              _this5._overlays = _this5._overlays.concat(overlayers);
              _this5._layer.getSource().addFeature(line);
              _this5.deactivate();
            });
            this._interactionMeasures('line');
            break;
          case 'coordinate':
            this.map.toolbox.draw.getPoint().then(function (point) {
              var features = [point];
              var overlayers = _this5.map.geodesc.pointDescriptor({
                features: features
              });
              _this5._overlays = _this5._overlays.concat(overlayers);
              _this5._layer.getSource().addFeature(point);
              _this5.deactivate();
            });
            break;
          case 'area':
            this.map.toolbox.draw.getPolygon().then(function (polygon) {
              var features = [polygon];
              var overlayers = _this5.map.geodesc.polygonDescriptor({
                features: features
              });
              _this5._overlays = _this5._overlays.concat(overlayers);
              _this5._layer.getSource().addFeature(polygon);
              _this5.deactivate();
            });
            this._interactionMeasures('polygon');
            break;
          case 'azimuth':
            this.map.toolbox.draw.getPolyline({
              maxPoints: 2
            }).then(function (pline) {
              var features = [pline];
              var overlayers = _this5.map.geodesc.azimuthDescriptor({
                features: features
              });
              _this5._overlays = _this5._overlays.concat(overlayers);
              _this5._layer.getSource().addFeature(pline);
              _this5.deactivate();
            });
            this._interactionMeasures('azimuth');
            break;
          case 'clear':
            this._clearMeasures().then(function () {
              return _this5.deactivate();
            });
            break;
          case 'undo':
            this._undo().then(function () {
              return _this5.deactivate();
            });
            break;
        }
      }
    }, {
      key: "activate",
      value: function activate() {
        _get(_getPrototypeOf(SimpleMeasure.prototype), "activate", this).call(this);
        this._initMeasure();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.map.toolbox.draw.stopDrawing();
        _get(_getPrototypeOf(SimpleMeasure.prototype), "deactivate", this).call(this);
      }
    }]);
  }(GeoTool);

  var SimpleDraft = /*#__PURE__*/function (_GeoTool) {
    function SimpleDraft(config) {
      var _this;
      _classCallCheck(this, SimpleDraft);
      config = config || {};
      config.tip = config.tip || 'Rascunho';
      config.title = config.title || 'Rascunho';
      config.class = config.class || 'map-app-draft';
      _this = _callSuper(this, SimpleDraft, [config]);
      _this._layer = config.layer;
      _this._draftType = config.draftType || 'line';
      _this._overlays = [];
      _this._arrow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF+SURBVFiFzde5TgMxEMbxvwMlgp4bREHD2QECInqehVDwSrQUFDSgEAQdHQ3XI3AFhY7sR8EusiKiOLu2NyNtZe/op5kpxjBoITQpNFu24y+E9oS+hY4HApaC3lPUh9CJ0EKZoKrQq5DSr1yY0G4HqFyY0E4XUDkwoe0eoLgwoS1HUByY0GafoLAwoQ2hlxwgG9b0BasAScEcQ8AosA/cFoVVABUE2bCxojCfIC+wEKBCMB8z5BUWskK5YDFBTrAYLXOB3QlVM1DsCmXRBprAKbBkMJcAwyWA2kALqANHBvNsH8YEtYEv4AY4MJin/y7FADlBbFCooRa/rbkGagbz6PJTiAplkKwiTpAQIBtSM5iHPEl8gLxAbFDeGbIhhwZzXwRiZdV8nytskm6IZ0KLXhAdoDnHFTaD1IVWvUMs0EyPCiVCn0KNoBALNN0FlKSviobQWnCIBZrqAGWQK6H1aBALNCH0ZrXmQmg5OsQCjaeYc6GV0iAWaCTKsDrGDyB3XaFxeFTeAAAAAElFTkSuQmCC';
      return _this;
    }
    _inherits(SimpleDraft, _GeoTool);
    return _createClass(SimpleDraft, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "_makeDraggable",
      value: function _makeDraggable(element) {
        var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;

        // otherwise, move the DIV from anywhere inside the DIV: 
        element.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          element.style.top = element.offsetTop - pos2 + 'px';
          element.style.left = element.offsetLeft - pos1 + 'px';
          element.style.opacity = 0.5;
        }
        function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
          element.style.opacity = 1;
        }
      }
    }, {
      key: "_toBase64",
      value: function _toBase64(file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            return resolve(reader.result);
          };
          reader.onerror = function (error) {
            return reject(error);
          };
        });
      }
    }, {
      key: "_setOverlays",
      value: function _setOverlays(point) {
        var _this2 = this;
        var coords = point.getGeometry();
        var pointLabel = document.createElement('div');
        var inputText = document.createElement('input');
        pointLabel.className = 'map-app-desc-point';
        pointLabel.innerHTML = 'TEXTO';
        inputText.addEventListener('input', function () {
          inputText.size = inputText.value.length + 1;
        });
        this._makeDraggable(pointLabel);
        var label = new ol.Overlay({
          element: pointLabel,
          offset: [4, 4],
          positioning: 'top-left'
        });
        label.setPosition(coords.getCoordinates());
        this.map.ol.addOverlay(label);
        pointLabel.addEventListener('dblclick', function () {
          if (pointLabel.innerHTML.indexOf('<input') == -1) {
            var textTemp = pointLabel.innerHTML;
            inputText.value = textTemp;
            inputText.size = inputText.value.length + 1;
            pointLabel.innerHTML = '';
            pointLabel.appendChild(inputText);
            inputText.focus();
            _this2.map.ol.once('click', function () {
              if (pointLabel.firstElementChild) {
                pointLabel.innerHTML = pointLabel.firstElementChild.value;
              }
            });
          }
        });
        pointLabel.addEventListener('keydown', function (e) {
          if (e.which == 13) {
            pointLabel.innerHTML = pointLabel.firstElementChild.value;
          }
        });
        point.set('overlays', [label]);
        point.set('order', this._layer.getSource().getFeatures().length);
        point.setGeometry(null);
        this._layer.getSource().addFeature(point);
      }
    }, {
      key: "_clearDrafts",
      value: function _clearDrafts() {
        var _this3 = this;
        return new Promise(function (resolve, reject) {
          var features = _this3._layer.getSource().getFeatures();
          var _loop = function _loop() {
            var f = features[i];
            var overlays = f.get('overlays');
            if (overlays) {
              var keys = Object.keys(overlays);
              keys.forEach(function (key) {
                _this3.map.ol.removeOverlay(overlays[key]);
              });
            }
            _this3._layer.getSource().removeFeature(f);
          };
          for (var i = 0; i < features.length; i++) {
            _loop();
          }
          _this3._overlays = [];
          new Notify({
            message: 'Todas as medidas foram removidas.',
            type: 'success',
            timeout: 5
          }).show();
          resolve();
        });
      }
    }, {
      key: "_interactionMeasures",
      value: function _interactionMeasures(primitive) {
        var _this4 = this;
        var drawInteraction = this.map.toolbox.draw.getInteraction();
        var ld = this.map.geodesc.lineDescriptor;
        var pd = this.map.geodesc.polygonDescriptor;
        var ad = this.map.geodesc.azimuthDescriptor;
        var overlaysCollection = [];
        drawInteraction.on('drawstart', function (e) {
          var sketch = e.feature;
          var feat = new ol.Feature();
          sketch.getGeometry().on('change', function (evt) {
            feat.setGeometry(evt.target.clone());
            var features = [feat];
            var labelClickCb = function labelClickCb() {
              drawInteraction.finishDrawing();
            };
            var tolerance = 10;
            if (primitive == 'line') {
              overlaysCollection = ld({
                features: features,
                overlaysCollection: overlaysCollection,
                labelClickCb: labelClickCb,
                tolerance: tolerance
              });
            } else if (primitive == 'polygon') {
              overlaysCollection = pd({
                features: features,
                overlaysCollection: overlaysCollection,
                labelClickCb: labelClickCb
              });
            } else if (primitive == 'azimuth') {
              overlaysCollection = ad({
                features: features,
                overlaysCollection: overlaysCollection,
                labelClickCb: labelClickCb
              });
            }
          });
        });
        drawInteraction.on('drawend', function (e) {
          var keys = Object.keys(overlaysCollection);
          keys.forEach(function (key) {
            _this4.map.ol.removeOverlay(overlaysCollection[key]);
          });
        });
      }
    }, {
      key: "_initDraft",
      value: function _initDraft() {
        var _this5 = this;
        switch (this._draftType) {
          case 'line':
            this.map.toolbox.draw.getPolyline().then(function (line) {
              line.set('order', _this5._layer.getSource().getFeatures().length);
              _this5._layer.getSource().addFeature(line);
              _this5.deactivate();
            });
            this._interactionMeasures('line');
            break;
          case 'point':
            this.map.toolbox.draw.getPoint().then(function (point) {
              point.set('order', _this5._layer.getSource().getFeatures().length);
              _this5._layer.getSource().addFeature(point);
              _this5.deactivate();
            });
            break;
          case 'polygon':
            this.map.toolbox.draw.getPolygon().then(function (polygon) {
              polygon.set('order', _this5._layer.getSource().getFeatures().length);
              _this5._layer.getSource().addFeature(polygon);
              _this5.deactivate();
            });
            this._interactionMeasures('polygon');
            break;
          case 'text':
            this.map.toolbox.draw.getPoint().then(function (point) {
              _this5._setOverlays(point);
              _this5.deactivate();
            });
            break;
          case 'arrow':
            var arrow = this._arrow;
            this.map.toolbox.draw.getArrow().then(function (pline) {
              var myStyles = [];
              var plineTemp = pline.clone();
              pline.getGeometry().forEachSegment(function (start, end) {
                var dx = end[0] - start[0];
                var dy = end[1] - start[1];
                var rotation = Math.atan2(dy, dx);
                // arrows
                myStyles.push(new ol.style.Style({
                  geometry: new ol.geom.Point(end),
                  image: new ol.style.Icon({
                    src: arrow,
                    anchor: [0.75, 0.5],
                    rotateWithView: true,
                    rotation: -rotation
                  }),
                  stroke: new ol.style.Stroke({
                    color: '#685ff1',
                    width: 150
                  })
                }));
              });
              pline.setStyle(myStyles);
              pline.set('order', _this5._layer.getSource().getFeatures().length);
              plineTemp.set('order', _this5._layer.getSource().getFeatures().length);
              _this5._layer.getSource().addFeature(pline);
              _this5._layer.getSource().addFeature(plineTemp);
              _this5.deactivate();
            });
            break;
          case 'image':
            var input = document.createElement('input');
            input.type = 'file';
            input.setAttribute('accept', '.jpg, .png, .jpeg, .gif |image/*');
            var imageFile = null;
            input.onchange = function (e) {
              imageFile = e.target.files[0];
              if (imageFile) {
                _this5._toBase64(imageFile).then(function (image) {
                  _this5._tipMsg = 'Clique no mapa para adicionar um texto';
                  _this5.map.toolbox.draw.getPoint().then(function (point) {
                    var myStyle = new ol.style.Style({
                      geometry: point.getGeometry(),
                      image: new ol.style.Icon({
                        src: image,
                        anchor: [0.5, 0.5]
                      })
                    });
                    point.setStyle(myStyle);
                    point.set('order', _this5._layer.getSource().getFeatures().length);
                    // this._tipMsg = this._initialMsg;
                    // this._textContainer.innerHTML = this._tipMsg;
                    _this5._layer.getSource().addFeature(point);
                    _this5.deactivate();
                  });
                });
              }
            };
            input.click();
            break;
          case 'clear':
            this._clearDrafts().then(function () {
              return _this5.deactivate();
            });
            break;
          case 'undo':
            this._undo().then(function () {
              return _this5.deactivate();
            });
            break;
        }
      }
    }, {
      key: "_undo",
      value: function _undo() {
        var _this6 = this;
        return new Promise(function (resolve, reject) {
          var count = _this6._layer.getSource().getFeatures().length;
          if (count > 0) {
            var maxOrder = 0;
            var features = _this6._layer.getSource().getFeatures();
            for (var i = 0; i < features.length; i++) {
              var feature = features[i];
              if (feature.get('order') > maxOrder) {
                maxOrder = feature.get('order');
              }
            }
            var _loop2 = function _loop2() {
              var feature = features[_i];
              if (feature.get('order') == maxOrder) {
                var overlays = feature.get('overlays');
                console.log(feature.get('order'));
                if (overlays) {
                  var keys = Object.keys(overlays);
                  keys.forEach(function (key) {
                    _this6.map.ol.removeOverlay(overlays[key]);
                  });
                }
                _this6._layer.getSource().removeFeature(feature);
              }
            };
            for (var _i = 0; _i < features.length; _i++) {
              _loop2();
            }
          } else {
            new Notify({
              message: 'Todas as medidas foram removidas.',
              type: 'success',
              timeout: 5
            }).show();
          }
          resolve();
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        _get(_getPrototypeOf(SimpleDraft.prototype), "activate", this).call(this);
        this._initDraft();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.map.toolbox.draw.stopDrawing();
        _get(_getPrototypeOf(SimpleDraft.prototype), "deactivate", this).call(this);
      }
    }]);
  }(GeoTool);

  var LayerSwipe = /*#__PURE__*/function (_GeoTool) {
    function LayerSwipe(config) {
      var _this;
      _classCallCheck(this, LayerSwipe);
      config = config || {};
      config.tip = config.tip || 'Layer Swipe';
      config.class = config.class || 'map-app-zoom-rect-control';
      _this = _callSuper(this, LayerSwipe, [config]);
      _this._layersSelectElm = null;
      _this._layer = null;
      _this._rangeElm = null;
      _this._evtHandlerPos = null;
      _this._evtHandlerPre = null;
      return _this;
    }
    _inherits(LayerSwipe, _GeoTool);
    return _createClass(LayerSwipe, [{
      key: "initialize",
      value: function initialize() {
        this._createElms();
        this._registerUiEvents();
      }
    }, {
      key: "_createElms",
      value: function _createElms() {
        this._layersSelectElm = document.createElement('select');
        this._layersSelectElm.style.position = 'absolute';
        this._layersSelectElm.style.top = '10px';
        this._layersSelectElm.style.right = '52px';
        this._layersSelectElm.style.width = '200px';
        this._layersSelectElm.style.zIndex = '9999';
        this.map.mapElement.append(this._layersSelectElm);
        this._rangeElm = document.createElement('input');
        this._rangeElm.className = 'map-app-slider-full';
        this._rangeElm.style.position = 'absolute';
        this._rangeElm.style.top = '50%';
        this._rangeElm.style.left = '0';
        this._rangeElm.style.width = '100%';
        this._rangeElm.type = 'range';
        this._rangeElm.value = '50';
        this._rangeElm.style.zIndex = '9999';
        this.map.mapElement.append(this._rangeElm);
        this._decoratorElm = document.createElement('div');
        this._decoratorElm.style.position = 'absolute';
        this._decoratorElm.style.top = '0';
        this._decoratorElm.style.left = '50%';
        this._decoratorElm.style.width = '5px';
        this._decoratorElm.style.height = '100%';
        this._decoratorElm.style.background = '#000';
        this._decoratorElm.style.zIndex = '9998';
        this._postionElm = document.createElement('div');
        this._postionElm.style.position = 'absolute';
        this._postionElm.style.top = '50%';
        this._postionElm.style.left = '-10px';
        this._postionElm.style.width = '20px';
        this._postionElm.style.height = '20px';
        this._postionElm.style.background = '#000';
        this._decoratorElm.append(this._postionElm);
        this.map.mapElement.append(this._decoratorElm);
        this._layersSelectElm.style.display = 'none';
        this._rangeElm.style.display = 'none';
        this._decoratorElm.style.display = 'none';
      }
    }, {
      key: "_listLayers",
      value: function _listLayers() {
        this._layersSelectElm.innerHTML = '';
        for (var i = 0; i < this.map.content.length; i++) {
          if (this.map.content[i].olLayer && this.map.content[i].display) {
            this._layersSelectElm.innerHTML += "<option group=\"".concat(i, "\">").concat(this.map.content[i].name, "</option>");
          } else {
            for (var j = 0; j < this.map.content[i].layers.length; j++) {
              if (this.map.content[i].layers[j].olLayer && this.map.content[i].layers[j].display) {
                this._layersSelectElm.innerHTML += "<option group=\"".concat(i, "\" layer=\"").concat(j, "\">").concat(this.map.content[i].layers[j].name, "</option>");
              }
            }
          }
        }
      }
    }, {
      key: "_getLayer",
      value: function _getLayer() {
        var i = this._layersSelectElm.selectedOptions[0].getAttribute('group');
        var j = this._layersSelectElm.selectedOptions[0].getAttribute('layer');
        if (j) {
          this._layer = this.map.content[i].layers[j].olLayer;
        } else {
          this._layer = this.map.content[i].olLayer;
        }
      }
    }, {
      key: "_registerUiEvents",
      value: function _registerUiEvents() {
        var _this2 = this;
        this._rangeElm.addEventListener('input', function () {
          _this2._decoratorElm.style.left = _this2._rangeElm.value + '%';
          _this2.map.ol.render();
        });
        this._layersSelectElm.addEventListener('change', function () {
          _this2._unregisterLayerEvents();
          _this2._getLayer();
          _this2._registerLayerEvents();
          _this2.map.ol.render();
        });
      }
    }, {
      key: "_registerLayerEvents",
      value: function _registerLayerEvents() {
        var map = this.map.ol;
        var swipe = this._rangeElm;
        this._evtHandlerPre = this._layer.on('prerender', function (evt) {
          var ctx = evt.context;
          var mapSize = map.getSize();
          var width = mapSize[0] * (swipe.value / 100);
          var tl = ol.render.getRenderPixel(evt, [width, 0]);
          var tr = ol.render.getRenderPixel(evt, [mapSize[0], 0]);
          var bl = ol.render.getRenderPixel(evt, [width, mapSize[1]]);
          var br = ol.render.getRenderPixel(evt, mapSize);
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(tl[0], tl[1]);
          ctx.lineTo(bl[0], bl[1]);
          ctx.lineTo(br[0], br[1]);
          ctx.lineTo(tr[0], tr[1]);
          ctx.closePath();
          ctx.clip();
        });
        this._evtHandlerPos = this._layer.on('postrender', function (evt) {
          var ctx = evt.context;
          ctx.restore();
        });
      }
    }, {
      key: "_unregisterLayerEvents",
      value: function _unregisterLayerEvents() {
        this._layer.un('prerender', this._evtHandlerPre.listener);
        this._layer.on('postrender', this._evtHandlerPos.listener);
        this._evtHandlerPre = null;
        this._evtHandlerPos = null;
      }
    }, {
      key: "activate",
      value: function activate() {
        this.map.closeAllTools();
        _get(_getPrototypeOf(LayerSwipe.prototype), "activate", this).call(this);
        this.map.hideDisabledControls();
        this._listLayers();
        this._getLayer();
        this._registerLayerEvents();
        this.map.ol.render();
        this._layersSelectElm.style.display = 'block';
        this._rangeElm.style.display = 'block';
        this._decoratorElm.style.display = 'block';
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this._unregisterLayerEvents();
        this.map.showDisabledControls();
        _get(_getPrototypeOf(LayerSwipe.prototype), "deactivate", this).call(this);
        this._layersSelectElm.style.display = 'none';
        this._rangeElm.style.display = 'none';
        this._decoratorElm.style.display = 'none';
        this.map.ol.render();
      }
    }]);
  }(GeoTool);

  var SLDEditor = /*#__PURE__*/function (_GeoWidget) {
    function SLDEditor(config) {
      var _this;
      _classCallCheck(this, SLDEditor);
      config = config || {};
      config.tip = config.tip || 'StyleEditor';
      config.title = config.title || 'Lista de camadas';
      config.class = config.class || 'map-app-menu-control';
      config.docked = config.docked || true;
      config.hasUI = false;
      config.untitled = true;
      _this = _callSuper(this, SLDEditor, [config]);
      _this._hasUI = false;
      _this.dict = [];
      _this.on('ready', function () {});
      return _this;
    }
    _inherits(SLDEditor, _GeoWidget);
    return _createClass(SLDEditor, [{
      key: "initialize",
      value: function initialize() {
        this._createUiElms();
        this._showInterface();
      }
    }, {
      key: "_createUiElms",
      value: function _createUiElms() {
        var _this2 = this;
        this.map.hideAllControls();
        this.map.openDock('left', 15);
        this.map.mapElement.style.right = '0';
        this.panel = this.map.getDock('left');
        this.panel.style.background = 'linear-gradient(to bottom, #464A5B 50%, #24303C)';
        this.panel.style.width = '20%';
        this.panel.style.fontSize = '12px';
        this.layersList = document.createElement('div');
        this.layersList.style.padding = '0';
        this.layersList.style.overflow = 'auto';
        this.layersList.style.width = '100%';
        this.layersList.style.height = '100%';
        this.layersList.style.float = 'left';
        this.layersList.innerHTML = "\n            <h5 class=\"text-center p-3 text-light\">\n                Camadas\n            </h5>\n        ";
        this.layersRule = document.createElement('div');
        this.layersRule.style.width = '30%';
        this.layersRule.style.height = '100%';
        this.layersRule.style.float = 'left';
        this.layersRule.style.padding = '5px';
        this.layersRule.style.display = 'none';
        this.layersRule.innerHTML = "\n            <h5 class=\"text-center p-3 text-light\">\n                Regras\n            </h5>\n            <div id=\"rules-list-".concat(this.id, "\" style=\"cursor: pointer;\"></div>\n            <button id=\"btn-add-style-").concat(this.id, "\" type=\"button\" class=\"btn btn-dark btn-sm float-right mt-3\">Adicionar</button>\n        ");
        this.layerStyleElm = document.createElement('div');
        this.layerStyleElm.style.width = '40%';
        this.layerStyleElm.style.height = '100%';
        this.layerStyleElm.style.float = 'left';
        this.layerStyleElm.style.padding = '5px';
        this.layerStyleElm.style.display = 'none';
        this.layerStyleElm.style.overflow = 'auto';
        this.layerStyleElm.innerHTML = "\n            <h5 class=\"text-center p-3 text-light\">\n                Estilos\n            </h5>\n            <div id=\"style-list-".concat(this.id, "\" style=\"cursor: pointer;\"></div>\n            <button id=\"btn-save-style-").concat(this.id, "\" type=\"button\" class=\"btn btn-dark btn-sm float-right mt-3\">Salvar</button>\n        ");
        this.panel.append(this.layersList);
        this.panel.append(this.layersRule);
        this.panel.append(this.layerStyleElm);
        this.layersList.innerHTML += this._getContentListElm();
        this._addLayerListEvents();
        this.ruleContainer = document.getElementById("rules-list-".concat(this.id));
        this.styleContainer = document.getElementById("style-list-".concat(this.id));
        this.btnAddRule = document.getElementById("btn-add-style-".concat(this.id));
        this.btnSaveStyle = document.getElementById("btn-save-style-".concat(this.id));
        this.btnSaveStyle.addEventListener('click', function () {
          _this2._save();
        });
      }
    }, {
      key: "_showInterface",
      value: function _showInterface(col) {
        switch (col) {
          case 'layers-rules':
            this.panel.style.width = '40%';
            this.layersList.style.width = '50%';
            this.layersRule.style.width = '50%';
            this.layersRule.style.display = 'block';
            this.layerStyleElm.style.display = 'none';
            break;
          case 'layers-rules-style':
            this.panel.style.width = '60%';
            this.layersList.style.width = '33.3333%';
            this.layersRule.style.width = '33.3333%';
            this.layerStyleElm.style.width = '33.3333%';
            this.layersRule.style.display = 'block';
            this.layerStyleElm.style.display = 'block';
            break;
          case 'layers-style':
            this.panel.style.width = '40%';
            this.layersList.style.width = '50%';
            this.layerStyleElm.style.width = '50%';
            this.layersRule.style.display = 'none';
            this.layerStyleElm.style.display = 'block';
            break;
          default:
            this.panel.style.width = '20%';
            this.layersList.style.width = '100%';
            this.layersRule.style.display = 'none';
            this.layerStyleElm.style.display = 'none';
            break;
        }
      }
    }, {
      key: "_getContentListElm",
      value: function _getContentListElm() {
        var list = '';
        for (var i = 0; i < this.map.content.length; i++) {
          var content = this.map.content[i];
          list += "\n            <ul class=\"list-group m-2\">\n                <li class=\"list-group-item list-group-item-light disabled pl-1\">\n                ".concat(content.name, "\n                </li>\n                ").concat(this._getLayersListElm(content.layers, i), "\n\n            </ul>\n            ");
        }
        return list;
      }
    }, {
      key: "_getLayersListElm",
      value: function _getLayersListElm(layers, i) {
        var list = '';
        for (var k = 0; k < layers.length; k++) {
          var layer = layers[k];
          list += "\n            <li data-i=\"".concat(i, "\" data-j=\"").concat(k, "\" class=\"layer-item list-group-item pl-3\" style=\"cursor: pointer;\">\n                <span class=\"pl-3\" style=\"display: grid\">").concat(layer.name, "</span>\n            </li>");
        }
        return list;
      }
    }, {
      key: "_addLayerListEvents",
      value: function _addLayerListEvents() {
        var _this3 = this;
        var items = document.getElementsByClassName('layer-item');
        var _loop = function _loop() {
          var layerItem = items[i];
          layerItem.addEventListener('click', function () {
            var i = layerItem.getAttribute('data-i');
            var j = layerItem.getAttribute('data-j');
            _this3._showLayerStyle(i, j);
          });
        };
        for (var i = 0; i < items.length; i++) {
          _loop();
        }
      }
    }, {
      key: "_showLayerStyle",
      value: function _showLayerStyle(i, j) {
        var _this4 = this;
        this.ruleContainer.innerHTML = '';
        var list = document.createElement('ul');
        list.className = 'list-group';
        this.ruleContainer.append(list);
        var content = this.map.content[i];
        this.i = i;
        this.j = j;
        if (content.type.toLowerCase() == 'wms' || content.type.toLowerCase() == 'wfs' || content.type.toLowerCase() == 'ogc') {
          this._getLayerStyle(i, j).then(function (r) {
            _this4._showInterface('layers-rules');
            var rules = _this4.style.getElementsByTagName('se:Rule');
            var _loop2 = function _loop2(k) {
              var rule = rules[k];
              var item = document.createElement('li');
              item.className = 'list-group-item';
              try {
                item.innerHTML = rule.getElementsByTagName('se:Name')[0].innerHTML;
              } catch (e) {
                item.innerHTML = 'Estilo sem nome';
              }
              item.addEventListener('click', function () {
                _this4._rule = rules[k];
                _this4._showStyle(rule);
              });
              list.append(item);
            };
            for (var k = 0; k < rules.length; k++) {
              _loop2(k);
            }
          });
        } else {
          this._showInterface('layers-style');
          this.styleContainer.innerHTML = '';
          this.styleContainer.append(this._getLayerOpacityElms());
        }
      }
    }, {
      key: "_showStyle",
      value: function _showStyle(rule) {
        this._showInterface('layers-rules-style');
        this.styleContainer.innerHTML = '';
        this.styleContainer.append(this._getNameElm(rule));
        this.styleContainer.append(this._getScaleElm(rule, 'se:MinScaleDenominator', 'Denominador Mínimo de Escala'));
        this.styleContainer.append(this._getScaleElm(rule, 'se:MaxScaleDenominator', 'Denominador Máximo de Escala'));
        this.styleContainer.append(this._getSizeElm(rule));
        this.styleContainer.append(this._getPointSymbolizerElms(rule));
        this.styleContainer.append(this._getLineSymbolizerElms(rule));
        this.styleContainer.append(this._getPolygonSymbolizerElms(rule));
        this.styleContainer.append(this._getLayerOpacityElms(rule));
      }
    }, {
      key: "_getLayerOpacityElms",
      value: function _getLayerOpacityElms() {
        var _this5 = this;
        var layer = this.map.content[this.i].layers[this.j];
        layer.style = layer.style || {};
        layer.style.opacity = layer.style.opacity || 1;
        var container = document.createElement('div');
        container.className = 'form-group p-3 bg-white rounded';
        var label = document.createElement('label');
        label.innerHTML = 'Transparência da Camada';
        var input = document.createElement('input');
        input.className = 'form-control form-control-sm';
        input.type = 'number';
        input.min = 0;
        input.max = 100;
        input.step = 10;
        input.value = parseInt((1 - layer.style.opacity) * 100);
        input.addEventListener('change', function () {
          layer.modifiedStyle = true;
          layer.style.opacity = 1 - Number(input.value) / 100;
          console.log(_this5.map.content[_this5.i].layers[_this5.j].style.opacity);
        });
        container.append(label);
        container.append(input);
        return container;
      }
    }, {
      key: "_getPointSymbolizerElms",
      value: function _getPointSymbolizerElms(rule) {
        var sList = rule.getElementsByTagName('se:PointSymbolizer');
        var container = document.createElement('div');
        if (sList.length > 0) {
          container.className = 'form-group p-3 bg-white rounded';
          var symbolizer = sList[0];
          container.append(this._getMarkElm(symbolizer, 'point'));
          return container;
        }
        return document.createElement('div');
      }
    }, {
      key: "_getLineSymbolizerElms",
      value: function _getLineSymbolizerElms(rule) {
        var sList = rule.getElementsByTagName('se:LineSymbolizer');
        var container = document.createElement('div');
        if (sList.length > 0) {
          container.className = 'form-group p-3 bg-white rounded';
          var symbolizer = sList[0];
          container.append(this._getStrokeElem(symbolizer));
          return container;
        }
        return document.createElement('div');
      }
    }, {
      key: "_getPolygonSymbolizerElms",
      value: function _getPolygonSymbolizerElms(rule) {
        var sList = rule.getElementsByTagName('se:PolygonSymbolizer');
        var container = document.createElement('div');
        if (sList.length > 0) {
          container.className = 'form-group p-3 bg-white rounded';
          var symbolizer = sList[0];
          container.append(this._getMarkElm(symbolizer, 'polygon'));
          if (container.innerHTML == '<div></div>') {
            container.append(this._getFillElm(symbolizer));
            container.append(this._getStrokeElem(symbolizer));
          }
          return container;
        }
        return document.createElement('div');
      }
    }, {
      key: "_getNameElm",
      value: function _getNameElm(rule) {
        var container = document.createElement('div');
        var nameList = rule.getElementsByTagName('se:Name');
        if (nameList.length > 0) {
          container.className = 'form-group p-3 bg-white rounded';
          var name = nameList[0];
          var label = document.createElement('label');
          label.innerHTML = 'Nome';
          var input = document.createElement('input');
          input.className = 'form-control form-control-sm';
          input.value = name.innerHTML;
          container.append(label);
          container.append(input);
          this.dict.push({
            element: input,
            style: name
          });
        }
        return container;
      }
    }, {
      key: "_getSizeElm",
      value: function _getSizeElm(rule) {
        var container = document.createElement('div');
        var nameList = rule.getElementsByTagName('se:Size');
        if (nameList.length > 0) {
          container.className = 'form-group p-3 bg-white rounded';
          var name = nameList[0];
          var label = document.createElement('label');
          label.innerHTML = 'Tamanho';
          var input = document.createElement('input');
          input.className = 'form-control form-control-sm';
          input.type = 'number';
          input.step = 0.1;
          input.min = 0.1;
          input.value = name.innerHTML;
          container.append(label);
          container.append(input);
          this.dict.push({
            element: input,
            style: name
          });
        }
        return container;
      }
    }, {
      key: "_getScaleElm",
      value: function _getScaleElm(rule, tag, title) {
        var container = document.createElement('div');
        var scaleList = rule.getElementsByTagName(tag);
        if (scaleList.length > 0) {
          container.className = 'form-group p-3 bg-white rounded';
          var scale = scaleList[0];
          var label = document.createElement('label');
          label.innerHTML = title;
          var input = document.createElement('input');
          input.className = 'form-control form-control-sm';
          input.type = 'number';
          input.step = 0.1;
          input.min = 0.1;
          input.value = scale.innerHTML;
          container.append(label);
          container.append(input);
          this.dict.push({
            element: input,
            style: scale
          });
        }
        return container;
      }
    }, {
      key: "_getWellKnownNameMarkElm",
      value: function _getWellKnownNameMarkElm(doc) {
        var list = doc.getElementsByTagName('se:WellKnownName');
        var container = document.createElement('div');
        container.className = 'form-group';
        if (list.length > 0) {
          var well = list[0];
          container.innerHTML = "\n                <label>Tipo do Marcador</label>\n                <select class=\"form-control form-control-sm\">\n                    <option value=\"circle\">C\xEDrculo</option>\n                    <option value=\"square\">Quadrado</option>\n                    <option value=\"triangle\">Tri\xE2ngulo</option>\n                    <option value=\"star\">Estrela</option>\n                    <option value=\"cross\">Cruz</option>\n                    <option value=\"x\">X</option>\n                </select>\n            ";
          container.getElementsByTagName('select')[0].value = well.innerHTML;
          this.dict.push({
            element: container.getElementsByTagName('select')[0],
            style: well
          });
        }
        return container;
      }
    }, {
      key: "_getWellKnownNameMarkFillElm",
      value: function _getWellKnownNameMarkFillElm(doc) {
        var list = doc.getElementsByTagName('se:WellKnownName');
        var container = document.createElement('div');
        container.className = 'form-group';
        if (list.length > 0) {
          var well = list[0];
          container.innerHTML = "\n                <label>Tipo do Marcador</label>\n                <select class=\"form-control form-control-sm\">\n                    <option value=\"shape://vertline\">Linha Vertical </option>\n                    <option value=\"shape://horline\">Linha Horizontal</option>\n                    <option value=\"shape://slash\">Linha Diagonal 1</option>\n                    <option value=\"shape://backslash\">Linha Diagonal 2</option>\n                    <option value=\"shape://dot\">C\xEDrculo Pequeno</option>\n                    <option value=\"shape://plus\">+</option>\n                    <option value=\"shape://times\">X</option>\n                    <option value=\"shape://oarrow\">Seta Aberta</option>\n                    <option value=\"shape://carrow\">Seta Fechada</option>\n                </select>\n            ";
          container.getElementsByTagName('select')[0].value = well.innerHTML;
          this.dict.push({
            element: container.getElementsByTagName('select')[0],
            style: well
          });
        }
        return container;
      }
    }, {
      key: "_getFillElm",
      value: function _getFillElm(doc) {
        var container = document.createElement('div');
        var fillRule = doc.querySelectorAll('[name="fill"]');
        if (fillRule.length > 0) {
          var fill = fillRule[0];
          var group = document.createElement('div');
          group.className = 'form-group';
          var label = document.createElement('label');
          label.innerHTML = 'Cor Preenchimento';
          var input = document.createElement('input');
          input.type = 'color';
          input.className = 'form-control form-control-sm';
          input.value = fill.innerHTML;
          group.append(label);
          group.append(input);
          container.append(group);
          this.dict.push({
            element: input,
            style: fill
          });
        }
        var fillORule = doc.querySelectorAll('[name="fill-opacity"]');
        if (fillORule.length > 0) {
          var opacity = fillORule[0];
          var _group = document.createElement('div');
          _group.className = 'form-group';
          var _label = document.createElement('label');
          _label.innerHTML = 'Opacidade Preenchimento';
          var _input = document.createElement('input');
          _input.type = 'number';
          _input.max = 1;
          _input.min = 0;
          _input.step = 0.1;
          _input.className = 'form-control form-control-sm';
          _input.value = opacity.innerHTML;
          _group.append(_label);
          _group.append(_input);
          container.append(_group);
          this.dict.push({
            element: _input,
            style: opacity
          });
        }
        return container;
      }
    }, {
      key: "_getStrokeElem",
      value: function _getStrokeElem(doc) {
        var container = document.createElement('div');
        var strokeRule = doc.querySelectorAll('[name="stroke"]');
        if (strokeRule.length > 0) {
          var stroke = strokeRule[0];
          var group = document.createElement('div');
          group.className = 'form-group';
          var label = document.createElement('label');
          label.innerHTML = 'Cor Borda';
          var input = document.createElement('input');
          input.type = 'color';
          input.className = 'form-control form-control-sm';
          input.value = strokeRule[0].innerHTML;
          group.append(label);
          group.append(input);
          container.append(group);
          this.dict.push({
            element: input,
            style: stroke
          });
        }
        var strokeWRule = doc.querySelectorAll('[name="stroke-width"]');
        if (strokeWRule.length > 0) {
          var strokeW = strokeWRule[0];
          var _group2 = document.createElement('div');
          _group2.className = 'form-group';
          var _label2 = document.createElement('label');
          _label2.innerHTML = 'Espessura da Borda';
          var _input2 = document.createElement('input');
          _input2.type = 'number';
          _input2.step = 0.1;
          _input2.className = 'form-control form-control-sm';
          _input2.value = strokeWRule[0].innerHTML;
          _group2.append(_label2);
          _group2.append(_input2);
          container.append(_group2);
          this.dict.push({
            element: _input2,
            style: strokeW
          });
        }
        var dashRule = doc.querySelectorAll('[name="stroke-dasharray"]');
        if (dashRule.length > 0) {
          var dash = dashRule[0];
          var _group3 = document.createElement('div');
          _group3.className = 'form-group';
          var _label3 = document.createElement('label');
          _label3.innerHTML = 'Estilo da Linha';
          var _input3 = document.createElement('input');
          _input3.type = 'text';
          _input3.className = 'form-control form-control-sm';
          _input3.value = dashRule[0].innerHTML;
          _group3.append(_label3);
          _group3.append(_input3);
          container.append(_group3);
          this.dict.push({
            element: _input3,
            style: dash
          });
        }
        return container;
      }
    }, {
      key: "_getMarkElm",
      value: function _getMarkElm(symbolizer, p) {
        var container = document.createElement('div');
        var list = symbolizer.getElementsByTagName('se:Mark');
        if (list.length > 0) {
          var markSymb = list[0];
          if (p == 'point') container.append(this._getWellKnownNameMarkElm(markSymb));
          if (p == 'polygon') container.append(this._getWellKnownNameMarkFillElm(markSymb));
          container.append(this._getFillElm(markSymb));
          container.append(this._getStrokeElem(markSymb));
        }
        return container;
      }
    }, {
      key: "_saveStyleGeowise",
      value: function _saveStyleGeowise() {
        var content = styleMap.getModifiedStyles();
        if (content.length > 0) {
          document.getElementById('loader').style.display = 'block';
          var data = {
            content: content,
            target: mapSelect.value
          };
          $.ajax({
            url: '/geowise/sub_camadas/update_estilos',
            type: 'put',
            data: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function success(data) {
              document.getElementById('loader').style.display = 'none';
              if (data.success) {
                new MessageBox({
                  title: 'Alteração de estilo',
                  message: 'Alteração de estilo realizada com sucesso!',
                  type: 'success',
                  timeout: 5
                }).show();
              } else {
                new MessageBox({
                  title: 'Alteração de estilo',
                  message: 'Não foi possível salvar o estilo.',
                  type: 'danger',
                  timeout: 5
                }).show();
              }
            },
            error: function error() {
              new MessageBox({
                title: 'Alteração de estilo',
                message: 'Não foi possível completar a requisição.',
                type: 'danger',
                timeout: 5
              }).show();
            }
          });
        }
      }
    }, {
      key: "_save",
      value: function _save() {
        var _this6 = this;
        for (var j = 0; j < this.dict.length; j++) {
          this.dict[j].style.innerHTML = this.dict[j].element.value;
        }
        if (this.layer) {
          var config = _objectSpread2({}, this.layer);
          config.method = 'PUT';
          config.body = this.style;
          config.contentType = 'application/vnd.ogc.se+xml';
          this._ajax(config).then(function (res) {
            console.log('deu');
            _this6._refreshLayer();
          }, function (reject) {
            return console.log(reject);
          });
        }
      }
    }, {
      key: "_refreshLayer",
      value: function _refreshLayer() {
        if (this.map.content[this.i].olLayer) {
          this.map.content[this.i].olLayer.getSource().changed();
        } else {
          this.map.content[this.i].layers[this.j].olLayer.getSource().changed();
        }
      }
    }, {
      key: "_getLayerStyle",
      value: function _getLayerStyle(i, j) {
        var _this7 = this;
        return new Promise(function (resolve, reject) {
          var _this7$map$content$i = _this7.map.content[i],
            workspace = _this7$map$content$i.workspace,
            source = _this7$map$content$i.source,
            auth = _this7$map$content$i.auth;
          var layer = _this7.map.content[i].layers[j].layer;
          var config = {
            url: "".concat(source, "/rest/layers/").concat(workspace, ":").concat(layer),
            accept: 'application/json',
            method: 'GET',
            auth: auth
          };
          _this7._ajax(config).then(function (r) {
            try {
              var res = JSON.parse(r);
              var w = res.layer.defaultStyle.workspace;
              var style = res.layer.defaultStyle.name.split(':')[1];
              var _config = {
                url: "".concat(source, "/rest/workspaces/").concat(w, "/styles/").concat(style),
                accept: 'application/vnd.ogc.se+xml',
                method: 'GET',
                auth: auth
              };
              _this7._ajax(_config).then(function (xml) {
                _this7.style = _this7._parseXml(xml);
                _this7.layer = _config;
                resolve();
              }, reject);
            } catch (e) {
              reject(e);
            }
          }, reject);
        });
      }
    }, {
      key: "_ajax",
      value: function _ajax(config) {
        return new Promise(function (resolve, reject) {
          var method = config.method,
            url = config.url,
            auth = config.auth,
            accept = config.accept,
            body = config.body,
            contentType = config.contentType;
          var xhr = new XMLHttpRequest();
          xhr.open(method, url);
          xhr.withCredentials = true;
          if (auth) xhr.setRequestHeader('Authorization', auth);
          if (accept) xhr.setRequestHeader('Accept', accept);
          if (contentType) xhr.setRequestHeader('Content-type', contentType);
          xhr.onload = function () {
            resolve(xhr.responseText);
          };
          xhr.onerror = function () {
            reject();
          };
          xhr.send(body);
        });
      }
    }, {
      key: "_parseXml",
      value: function _parseXml(xml) {
        var dom = null;
        if (window.DOMParser) {
          try {
            dom = new DOMParser().parseFromString(xml, "text/xml");
          } catch (e) {
            dom = null;
          }
        } else if (window.ActiveXObject) {
          try {
            dom = new ActiveXObject('Microsoft.XMLDOM');
            dom.async = false;
            if (!dom.loadXML(xml))
              // parse error ..

              window.alert(dom.parseError.reason + dom.parseError.srcText);
          } catch (e) {
            dom = null;
          }
        } else alert("cannot parse xml string!");
        return dom;
      }
    }]);
  }(GeoWidget);

  var MirrorGeom = /*#__PURE__*/function (_GeoTool) {
    function MirrorGeom(config) {
      _classCallCheck(this, MirrorGeom);
      config = config || {};
      config.tip = config.tip || 'Espelhar geometria';
      config.class = config.class || 'map-app-edit-geom';
      config.direction = config.direction || 'x';
      return _callSuper(this, MirrorGeom, [config]);
    }
    _inherits(MirrorGeom, _GeoTool);
    return _createClass(MirrorGeom, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "activate",
      value: function activate() {
        var _this = this;
        _get(_getPrototypeOf(MirrorGeom.prototype), "activate", this).call(this);
        this.select = new ol.interaction.Select();
        this.map.mapElement.style.cursor = 'pointer';
        this.select.on('select', function (f) {
          var format = new ol.format.GeoJSON();
          var feature = format.writeFeatureObject(f.selected[0]);
          var centroid = turf.centroid(feature);
          var dx = centroid.geometry.coordinates[0];
          var dy = centroid.geometry.coordinates[1];
          turf.coordEach(feature, function (currentCoord) {
            var x = -(currentCoord[0] - dx) + dx;
            var y = -(currentCoord[1] - dy) + dy;
            currentCoord[0] = _this.config.direction == 'x' ? x : currentCoord[0];
            currentCoord[1] = _this.config.direction == 'y' ? y : currentCoord[1];
          });
          var tFeature = format.readFeatureFromObject(feature);
          f.selected[0].setGeometry(tFeature.getGeometry());
          _this.select.getFeatures().clear();
        });
        this.map.ol.addInteraction(this.select);
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.map.mapElement.style.cursor = 'auto';
        this.map.ol.removeInteraction(this.select);
        this.select = null;
        _get(_getPrototypeOf(MirrorGeom.prototype), "deactivate", this).call(this);
      }
    }]);
  }(GeoTool);

  var CutGeom = /*#__PURE__*/function (_GeoTool) {
    //POC Gov Celso Ramos

    function CutGeom(config) {
      _classCallCheck(this, CutGeom);
      config = config || {};
      config.tip = config.tip || 'Cortar geometria';
      config.class = config.class || 'map-app-edit-geom';
      config.direction = config.direction || 'x';
      return _callSuper(this, CutGeom, [config]);
    }
    _inherits(CutGeom, _GeoTool);
    return _createClass(CutGeom, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "activate",
      value: function activate() {
        var _this = this;
        _get(_getPrototypeOf(CutGeom.prototype), "activate", this).call(this);
        this.map.toolbox.draw.getPolyline().then(function (line) {
          var format = new ol.format.GeoJSON();
          var jLine = format.writeFeatureObject(line, {
            dataProjection: 'EPSG:4326',
            featureProjection: _this.map.ol.getView().getProjection().getCode()
          });
          var buffered = turf.buffer(jLine, 0.001, {
            units: 'meters'
          });
          var layers = _this.map.ol.getLayers().getArray();
          layers.forEach(function (layer) {
            if (layer.getSource() instanceof ol.source.Vector) {
              var oFeatures = layer.getSource().getFeatures();
              oFeatures.forEach(function (oFeature) {
                var jFeature = format.writeFeatureObject(oFeature, {
                  dataProjection: 'EPSG:4326',
                  featureProjection: _this.map.ol.getView().getProjection().getCode()
                });
                turf.geomEach(jFeature, function (currentGeometry) {
                  var diff = turf.difference(currentGeometry, buffered);
                  if (diff) {
                    var tFeature = format.readFeatureFromObject(diff, {
                      dataProjection: 'EPSG:4326',
                      featureProjection: _this.map.ol.getView().getProjection().getCode()
                    });
                    oFeature.setGeometry(tFeature.getGeometry());
                  }
                });
              });
            }
          });
        });
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.map.mapElement.style.cursor = 'auto';
        this.map.ol.removeInteraction(this.select);
        this.select = null;
        _get(_getPrototypeOf(CutGeom.prototype), "deactivate", this).call(this);
      }
    }]);
  }(GeoTool);

  var GoToCoordinate = /*#__PURE__*/function (_GeoWidget) {
    function GoToCoordinate(config) {
      var _this;
      _classCallCheck(this, GoToCoordinate);
      config = config || {};
      config.tip = config.tip || 'Ir para coordenada';
      config.title = config.title || 'Ir para coordenadas';
      config.class = config.class || 'go-to-control';
      config.maxWidth = '550px';
      _this = _callSuper(this, GoToCoordinate, [config]);
      _this._source = config.source || new ol.source.Vector();
      _this._isListening = false;
      _this._lastPoint = null;
      _this._feature = new ol.Feature(null);
      _this._mouseFeature = new ol.Feature(null);
      _this._pointsList = [];
      _this.ui = document.createElement('div');
      return _this;
    }
    _inherits(GoToCoordinate, _GeoWidget);
    return _createClass(GoToCoordinate, [{
      key: "initialize",
      value: function initialize() {
        var _this2 = this;
        this.ui.innerHTML = this._getUiTemplate();
        this.on('ready', function () {
          _this2._registerElements();
          _this2._registerEvents();
          _this2._initInternalLayer();
          _this2._selectSrcElement.value = _this2.map.ol.getView().getProjection().getCode();
        });
      }
    }, {
      key: "_initInternalLayer",
      value: function _initInternalLayer() {
        this._layer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 0, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#f0f',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#f0f'
              })
            })
          })
        });
        this._layer.setZIndex(999);
        this.map.ol.addLayer(this._layer);
      }
    }, {
      key: "_getUiTemplate",
      value: function _getUiTemplate() {
        var srs = [];
        for (var i = 0; i < this.map.config.srs.length; i++) {
          var element = this.map.config.srs[i];
          if (element.format == 'DD' || element.type == 'projected') {
            srs.push(element);
          }
        }
        return "\n        <div class='m-0 p-3'>\n\n            <div class=\"row\">\n\n             <div class=\"col-12\">\n                    <p>Adicione um par de coordenadas planas \"E, N\" (metros) ou geogr\xE1fica \"Latitude Longitude\" (deg) separando as coordenadas com um espa\xE7o.</p>\n                </div>\n        \n                <div class=\"col-12\">\n                    <label for=\"map-app-pbi-wkt-".concat(this.id, "\">Par de coordenadas</label>\n                    <input type=\"text\" class=\"form-control\" id=\"map-app-pbi-wkt-").concat(this.id, "\" placeholder=\"Adicione as coordenadas\">\n                </div>\n        \n                <div class=\"col-6\">\n                    <label for=\"map-app-pbi-src-").concat(this.id, "\">SRC</label>\n                    <select id=\"map-app-pbi-src-").concat(this.id, "\" class=\"form-control\">\n        ").concat(srs.map(function (wkid) {
          return "<option value=\"".concat(wkid.code, "\">").concat(wkid.name, "</option>");
        }), "\n                    </select>\n                </div>\n        \n                <div class=\"col-6\">\n                    <label style=\"color: #fff\"> _</label>\n                    <br>\n                    <button id=\"map-app-pbi-add-wkt-").concat(this.id, "\" class=\"btn btn-primary btn-block btn-small\">Adicionar</button>\n                </div>\n            </div>\n        </div>\n        ");
      }
    }, {
      key: "_registerElements",
      value: function _registerElements() {
        this._inputWktElement = document.getElementById("map-app-pbi-wkt-".concat(this.id));
        this._btnAddWktElement = document.getElementById("map-app-pbi-add-wkt-".concat(this.id));
        this._selectSrcElement = document.getElementById("map-app-pbi-src-".concat(this.id));
      }
    }, {
      key: "_format",
      value: function _format(wkt) {
        var repetidos = _toConsumableArray(wkt.match(/(.)(?=.*\1)/gi)).map(function (x) {
          return x.toLowerCase();
        });
        if (repetidos.indexOf('.') > -1 && repetidos.indexOf(',') == -1 && wkt.indexOf(',') > -1) {
          wkt = wkt.replace(',', ' ');
        } else if (repetidos.indexOf(',') > -1 && wkt.indexOf('.') == -1) {
          wkt = wkt.replace(',', '.').replace(',', '.');
        }
        for (var i = 0; i < this.map.config.srs.length; i++) {
          var srs = this.map.config.srs[i];
          var coordSRS = this._selectSrcElement.value;
          if (coordSRS == srs.code) {
            if (srs.format == 'DD') {
              wkt = wkt.split(' ').reverse().join(' ');
            }
          }
        }
        return wkt;
      }
    }, {
      key: "_createFromWkt",
      value: function _createFromWkt(wkt) {
        if (wkt == "") {
          new Notify({
            message: 'Não foi possível reconhecer a geometria desejada.<br> Formato inadequado.',
            type: 'success',
            timeout: 5
          }).show();
        }
        try {
          wkt = this._format(wkt);
          var format = new ol.format.WKT();
          var feature = format.readFeature('POINT(' + wkt + ')', {
            dataProjection: this._selectSrcElement.value || 'EPSG:4326',
            featureProjection: this.map.ol.getView().getProjection().getCode()
          });
          this._layer.getSource().addFeature(feature);
          this.map.fitTo(feature.getGeometry(), 'openlayers');
        } catch (e) {
          new Notify({
            message: 'Não foi possível reconhecer a geometria desejada.<br> Formato inadequado.',
            type: 'success',
            timeout: 5
          }).show();
        }
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        var _this3 = this;
        this._btnAddWktElement.addEventListener('click', function () {
          var wkt = _this3._inputWktElement.value;
          _this3._createFromWkt(wkt);
        });
      }
    }, {
      key: "activate",
      value: function activate() {
        this.map.closeAllTools();
        this.show();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this._layer.getSource().clear();
        this.hide();
      }
    }]);
  }(GeoWidget);

  exports.GeoControl = GeoControl;
  exports.GeoSubPanel = GeoSubPanel;
  exports.GeoButton = GeoButton;
  exports.GeoTool = GeoTool;
  exports.PanelPosition = PanelPosition;
  exports.Panel = Panel;
  exports.GeoWidget = GeoWidget;
  exports.GeoMap = GeoMap;
  exports.UnitsCoversion = UnitsCoversion;
  exports.ZoomIn = ZoomIn;
  exports.ZoomOut = ZoomOut;
  exports.ZoomExtent = ZoomExtent;
  exports.ZoomByRect = ZoomByRect;
  exports.GoToHome = GoToHome;
  exports.Measure = Measure;
  exports.LayerSwitcher = LayerSwitcher;
  exports.SaveStatus = SaveStatus;
  exports.Draw = Draw;
  exports.Draft = Draft;
  exports.GeoDesc = GeoDesc;
  exports.Snap = Snap;
  exports.OgcExporter = OgcExporter;
  exports.PrintMap = PrintMap;
  exports.ScaleLine = ScaleLine;
  exports.ScaleSelector = ScaleSelector;
  exports.MousePosition = MousePosition;
  exports.StreetView = StreetView;
  exports.FullScreen = FullScreen;
  exports.ListMenu = ListMenu;
  exports.LandView = LandView;
  exports.Geobuilder3D = Geobuilder3D;
  exports.Undo = Undo;
  exports.Redo = Redo;
  exports.Heatmap = Heatmap;
  exports.Transparency = Transparency;
  exports.StyleEditor = StyleEditor;
  exports.GetPosition = GetPosition;
  exports.Cad = Cad;
  exports.PointsByPlanarDistance = PointsByPlanarDistance;
  exports.CreateGeom = CreateGeom;
  exports.EditGeom = EditGeom;
  exports.MoveGeom = MoveGeom;
  exports.RotateGeom = RotateGeom;
  exports.RemoveGeom = RemoveGeom;
  exports.DuplicateGeom = DuplicateGeom;
  exports.MultiPolygonToPolygon = MultiPolygonToPolygon;
  exports.PolygonToMultiPolygon = PolygonToMultiPolygon;
  exports.PointsByDistSegment = PointsByDistSegment;
  exports.GeomFromWKT = GeomFromWKT;
  exports.PointFromTopo = PointFromTopo;
  exports.CreateBezierCurve = CreateBezierCurve;
  exports.UndoGeom = UndoGeom;
  exports.RedoGeom = RedoGeom;
  exports.Eaves = Eaves;
  exports.GuideLines = GuideLines;
  exports.SetEdgeSize = SetEdgeSize;
  exports.CityBlockSplitter = CityBlockSplitter;
  exports.ArcsByThreePoints = ArcsByThreePoints;
  exports.ParallelDrag = ParallelDrag;
  exports.ThematicOgc = ThematicOgc;
  exports.CreateLineString = CreateLineString;
  exports.ParallelCopy = ParallelCopy;
  exports.SimpleMeasure = SimpleMeasure;
  exports.SimpleDraft = SimpleDraft;
  exports.LayerSwipe = LayerSwipe;
  exports.SLDEditor = SLDEditor;
  exports.MirrorGeom = MirrorGeom;
  exports.CutGeom = CutGeom;
  exports.GoToCoordinate = GoToCoordinate;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=geomap-all.js.map
