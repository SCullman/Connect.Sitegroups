import React from 'react';
import ReactDOM from 'react-dom';

import SiteGroups from './SiteGroups';
import SiteGroupEditor from './SiteGroupEditor';
import service from './services/SiteGroupsService';

export default class SiteGroupApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: React.PropTypes.array,
      currentGroup: null, // oder besser = React.PropTypes.object ????,
      availableSites: React.PropTypes.array,
    };
  }

  componentDidMount () {
    this.loadState();
  }

  loadState (){
    Promise.all(
      service.getSiteGroups(),
      service.getAvailablePortals(), 
    ).then(data => {
      this.setState({
        groups: data[0],
        availableSites: date[1], 
      });
    })
  }

  editNewGroup(id){
    const site = this.props.sites.find((s) => s.PortalId == id);
    this.setState({
      currentGroup:{
          PortalGroupId:-1,
          MasterPortal: site,
          PortalGroupName: site.PortalName,
          AuthenticationDomain:'',
          Portals:[]}
      }
    ); 
  }

  saveGroup(r){
      const group = r.PortalGroup;
      const availableSites= r.AvailableSites;
      const isNewGroup = group.PortalGroupId == -1;

      const id= service.saveSiteGroup(group,

      const groups = (isNewGroup 
                        ? this.state.groups
                        : this.state.groups.filter((g) => g.PortalGroupId != group.PortalGroupId))
                .concat([group])
                .sort((a,b) => a.PortalGroupName < b.PortalGroupName ? -1 : 1);
      
      this.setState({ 
              availableSites,
              currentGroup:null,
              groups
            });
  }

  deleteGroup(group){
    this.setState({ 
        availableSites : this.state.availableSites
                            .concat(group.Portals)
                            .concat([group.MasterPortal])
                            .sort((a,b) => a.PortalName < b.PortalName ? -1 : 1),
        groups: this.state.groups.filter((g) => g.PortalGroupId != group.PortalGroupId ) });    
  }

  render(){
    return(
      this.state.currentGroup ?
      (  <SiteGroupEditor 
            group={this.state.currentGroup} 
            sites={this.state.availableSites.filter((site) => site.PortalId!=this.state.currentGroup.MasterPortal.PortalId)}
            onCancelEdit={() => this.setState({currentGroup:null})}
            onSave={(r) => this.saveGroup(r)}/>
      ):(
         <SiteGroups 
            groups={this.state.groups} 
            sites={this.state.availableSites}
            onEditGroup={(group) => this.setState({currentGroup:group})}
            onNewGroup={(siteId) => this.editNewGroup(siteId)}
            onDeleteGroup={(group) => this.deleteGroup(group)}/>
    ));
  }
}