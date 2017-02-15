import React from "react";
import Resx from "localization";
import Button from "dnn-button";


export default class Sites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSite: null,
      availableSite: null,
    };
  }

  addSite() {
    this.props.onAddSite(this.state.availableSite);
    this.setState({availableSite:null});
  }

  render() {
    return (
      <div>
        <div>
          <label>{Resx.get("Sites.Label")}</label>
          <select
            multiple="multiple" style={{minWidth:200 + "px"}}
            onChange={(e) => this.setState({currentSite: e.target.value})}>
            {this.props.currentSites.map((site) => 
              <option
                value={site.PortalId}
                key={site.PortalId.toString()}>{site.PortalName}</option>)
}
          </select>
          <button
            disabled={!this.state.currentSite}
            onClick={() => this.props.onRemoveSite(this.state.currentSite)}>Remove</button>
        </div>
        <div>
          <select style={{minWidth:200 + "px"}}
          onChange={(e) => this.setState({availableSite: e.target.value})}>
            <option value="">{Resx.get("ChooseASite.Label")}</option>
            {this.props.availableSites.map((site) => 
              <option
                value={site.PortalId}
                key={site.PortalId.toString()}>{site.PortalName}</option>)
}
          </select>
          <Button 
            disabled={!this.state.availableSite}
            onClick={() => this.addSite()}>{Resx.get("Add.Button")}</Button>
        </div>
      </div>
    );
  }
}

Sites.propTypes= { 
  availableSites: React.PropTypes.array,
  currentSites: React.PropTypes.array,
  onRemoveSite: React.PropTypes.func,
  onAddSite: React.PropTypes.func,
};