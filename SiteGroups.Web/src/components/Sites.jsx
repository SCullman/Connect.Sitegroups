import React from 'react';
import ReactDOM from 'react-dom';

export default class Sites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSite: null,
      availableSite: null
    }
  }
  addSite(){
    this.props.onAddSite(this.state.availableSite);
    this.setState({availableSite:null});
  }
  render() {
    return (
      <div>
        <div>
          <label>Sites</label>
          <select
            multiple="multiple" style={{minWidth:200+'px'}}
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
          <select style={{minWidth:200+'px'}}
          onChange={(e) => this.setState({availableSite: e.target.value})}>
            <option value="">Choose a site</option>
            {this.props.availableSites.map((site) => 
              <option
                value={site.PortalId}
                key={site.PortalId.toString()}>{site.PortalName}</option>)
}
          </select>
          <button
            disabled={!this.state.availableSite}
            onClick={() => this.addSite()}>Add</button>
        </div>
      </div>
    );
  }
}
