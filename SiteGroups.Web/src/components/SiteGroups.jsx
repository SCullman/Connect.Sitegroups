import React from "react";

const SiteGroupRow = (props) => ( 
    <tr >
      <td>
        <button onClick={() => props.onEditGroup(props.group)}>Edit</button>
        <button onClick={() => props.onDeleteGroup(props.group)}>Delete</button>
      </td>
      <td>{props.group.PortalGroupName}</td>
      <td>{props.group.MasterPortal.PortalName}</td>
    </tr>);

SiteGroupRow.propTypes= { 
  group: React.PropTypes.object,
};

const SiteGroupsTable = (props) => (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Site Group</th>
            <th>Master Site</th>
          </tr>
        </thead>
      <tbody>
      {
        (props.groups||[]).map((group)=> 
          <SiteGroupRow 
            key={group.PortalGroupId.toString()} 
            group={group} 
            onEditGroup={(g)=> props.onEditGroup(g)}
            onDeleteGroup={(g)=> props.onDeleteGroup(g)}/>)
      }
      </tbody>
    </table>
);

SiteGroupsTable.propTypes= { 
  groups: React.PropTypes.array,
  onEditGroup: React.PropTypes.func,
  onDeleteGroup: React.PropTypes.func,
};

class NewSiteGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteId:null
    };
  }
  render() {
    return (
      <div>
        <select name="sites" onChange={(e) => this.setState({siteId: e.target.value})}>
        <option>Choose a site</option>
        {
          (this.props.sites||[]).map((site)=>
          <option key={site.PortalId.toString()} value={site.PortalId}>{site.PortalName}</option>)
        }
        </select>
        <button
          disabled={!this.state.siteId}
          onClick={()=>this.props.onNewGroup(this.state.siteId)}>New Site Group</button>
      </div>
    );
  }
}

NewSiteGroup.propTypes= { 
  sites: React.PropTypes.array,
  onNewGroup: React.PropTypes.func,
};

export default class SiteGroups extends React.Component {
  render() {
    return (
      <div>
        <SiteGroupsTable 
          groups={this.props.groups}
          onEditGroup={(g)=> this.props.onEditGroup(g)}
          onDeleteGroup={(g)=> this.props.onDeleteGroup(g)}/>
        <NewSiteGroup 
          sites={this.props.sites}
          onNewGroup={(siteId) => this.props.onNewGroup(siteId)}
          />
      </div>
    ); 
  }
}

SiteGroups.propTypes= { 
  groups: React.PropTypes.array,
  sites: React.PropTypes.array,
  onEditGroup: React.PropTypes.func,
  onDeleteGroup: React.PropTypes.func,
  onNewGroup: React.PropTypes.func,
};

