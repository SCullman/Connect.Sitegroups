import React from "react";
import Sites from "./Sites";

export default class SiteGroupEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PortalGroupName: this.props.group.PortalGroupName || "",
      AuthenticationDomain: this.props.group.AuthenticationDomain ,
      Portals: this.props.group.Portals,
      AvailableSites: this.props.sites
    };
  }
  
  sortPortals(a, b) {
    return a.PortalName < b.PortalName ? -1 : 1;
  } 

  addSite(id) {
    const newSite = this.state.AvailableSites.find((site) => site.PortalId === id);
    this.setState({
      AvailableSites: this.state.AvailableSites.filter((site) => site.PortalId !== id).sort(this.sortPortals),
      Portals: [...this.state.Portals, newSite].sort(this.sortPortals),
    });
  }

  removeSite(id) {
    const oldSite = this.state.Portals.find((site) => site.PortalId === id);
    this.setState({
      AvailableSites: [...this.state.AvailableSites, oldSite].sort(this.sortPortals),
      Portals: this.state.Portals.filter((site) => site.PortalId !== id).sort(this.sortPortals),
    });
  }

  result() {
    return {
      PortalGroup :{
        PortalGroupId: this.props.group.PortalGroupId, 
        AuthenticationDomain: this.state.AuthenticationDomain,
        PortalGroupName: this.state.PortalGroupName,
        MasterPortal: this.props.group.MasterPortal,
        Portals: this.state.Portals,
      },
      AvailableSites: this.state.AvailableSites,
    };
  }

  render() {
    return (
      <div >
        <div >
          <label htmlFor="MasterPortal">Master Portal</label>
          <input
            id="MasterPortal"
            type="text"
            value={this.props.group.MasterPortal.PortalName}
            disabled
            readOnly/>
        </div>
        <div>
          <label htmlFor="PortalGroupName">Group Name</label>
          <input
            id="PortalGroupName"
            type="text"
            value={this.state.PortalGroupName}
            onChange={(e) => this.setState({PortalGroupName: e.target.value})}/>
          *
        </div>
        <div>
          <label htmlFor="AuthenticationDomain">Authentication Domain</label>
          <input
            id="AuthenticationDomain"
            type="text"
            value={this.state.AuthenticationDomain}
            onChange={(e) => this.setState({AuthenticationDomain: e.target.value})}/>
          *
        </div>
        <Sites
          availableSites={this.state.AvailableSites}
          currentSites={this.state.Portals}
          onAddSite={(id) => { this.addSite(Number(id)); }}
          onRemoveSite={(id) => { this.removeSite(Number(id)); }}/>
        <div >
          <button onClick={() => this.props.onSave(this.result(), this.state.AvailableSites)}>Save</button>
          <button onClick={() => this.props.onCancelEdit()}>Cancel</button>
        </div>
      </div>
    );
  }
}

SiteGroupEditor.propTypes= { 
  group: React.PropTypes.object, 
  sites: React.PropTypes.array,
  onSave: React.PropTypes.func,
  onCancelEdit: React.PropTypes.func,
}; 