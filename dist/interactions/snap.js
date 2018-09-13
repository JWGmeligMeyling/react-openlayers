"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var snap_1 = require("ol/interaction/snap");
var util_1 = require("../util");
var map_1 = require("../map");
var Snap = /** @class */ (function (_super) {
    __extends(Snap, _super);
    function Snap(props) {
        var _this = _super.call(this, props) || this;
        _this.options = {
            features: undefined,
            edge: undefined,
            vertex: undefined,
            pixelTolerance: undefined,
            source: undefined,
        };
        _this.events = {
            change: undefined,
            "change:active": undefined,
            propertychange: undefined,
        };
        return _this;
    }
    Snap.prototype.render = function () {
        return null;
    };
    Snap.prototype.componentDidMount = function () {
        var options = util_1.Util.getOptions(Object["assign"](this.options, this.props));
        this.interaction = new snap_1.default(options);
        this.props.mapComp.interactions.push(this.interaction);
        var olEvents = util_1.Util.getEvents(this.events, this.props);
        for (var eventName in olEvents) {
            this.interaction.on(eventName, olEvents[eventName]);
        }
    };
    Snap.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps !== this.props) {
            this.props.mapComp.map.removeInteraction(this.interaction);
            var options = util_1.Util.getOptions(Object["assign"](this.options, nextProps));
            this.interaction = new snap_1.default(options);
            this.props.mapComp.map.addInteraction(this.interaction);
            var olEvents = util_1.Util.getEvents(this.events, this.props);
            for (var eventName in olEvents) {
                this.interaction.on(eventName, olEvents[eventName]);
            }
        }
    };
    Snap.prototype.componentWillUnmount = function () {
        this.props.mapComp.map.removeInteraction(this.interaction);
    };
    return Snap;
}(React.Component));
exports.default = (function (props) { return React.createElement(map_1.MapContext.Consumer, null, function (mapComp) { return React.createElement(Snap, __assign({}, props, { mapComp: mapComp })); }); });
//# sourceMappingURL=snap.js.map