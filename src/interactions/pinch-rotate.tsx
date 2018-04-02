import * as React from 'react';
import olMap from 'ol/map';
import olInteractionPinchRotate from 'ol/interaction/pinchrotate';
import {Util} from "../util";
import {Map} from '../map';

export class PinchRotate extends React.Component<any, any> {

  interaction: olInteractionPinchRotate;

  options: any = {
    duration: undefined,
    threshold: undefined
  };

  events: any = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  constructor(props) { super(props); }

  render() { return null; }

  componentDidMount () {
    let options = Util.getOptions(Object['assign'](this.options, this.props));
    this.interaction = new olInteractionPinchRotate(options);
    this.context.mapComp.interactions.push(this.interaction)
    
    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.interaction.on(eventName, olEvents[eventName]);
    }
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps !== this.props){
      this.context.mapComp.map.removeInteraction(this.interaction);
      let options = Util.getOptions(Object['assign'](this.options, nextProps));
      this.interaction = new olInteractionPinchRotate(options);
      this.context.mapComp.map.addInteraction(this.interaction);

      let olEvents = Util.getEvents(this.events, this.props);
      for(let eventName in olEvents) {
        this.interaction.on(eventName, olEvents[eventName]);
      }
    }
  }
  
  componentWillUnmount () {
    this.context.mapComp.map.removeInteraction(this.interaction);
  }

}

PinchRotate['contextTypes'] = {
  mapComp: React.PropTypes.instanceOf(Map),
  map: React.PropTypes.instanceOf(olMap)
};