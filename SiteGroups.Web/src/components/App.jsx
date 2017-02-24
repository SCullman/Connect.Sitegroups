import React from "react";
import NewSiteGroup from "./NewGroup";
import SiteGroupsTable from "./Table";
import GridCell from "dnn-grid-cell";
import PersonaBarPageHeader from "dnn-persona-bar-page-header";
import service from "../services/SiteGroupsService";
import utils from "../utils";
import Resx from "../localization";

export default class SiteGroupApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      currentGroup: null,
      unassignedSites: [],
    };
  }

  componentDidMount() {
    this.loadState();
  }

  loadState() {
    service
      .getSiteGroups()
      .then(groups => this.setState({ groups: groups }));
    service
      .getUnassignedSites()
      .then(sites => this.setState({ unassignedSites: sites }));
  }

  editNewGroup(id) {
    const site = this.state.unassignedSites.find((s) => s.PortalId === id);
    this.setState({
      currentGroup: {
        PortalGroupId: -1,
        MasterPortal: site,
        PortalGroupName: site.PortalName + " " + Resx.get("Group"),
        AuthenticationDomain: "",
        Portals: [],
      },
    });
  }

  save(r) {
    const group = r.PortalGroup;
    const unassignedSites = r.UnassignedSites;
    const isNewGroup = group.PortalGroupId === -1;

    service
      .save(group)
      .then(id => {
        if (isNewGroup) group.PortalGroupId = id;
        const groups = (isNewGroup
          ? this.state.groups
          : this.state.groups.filter((g) => g.PortalGroupId !== group.PortalGroupId))
          .concat([group])
          .sort((a, b) => a.PortalGroupName < b.PortalGroupName ? -1 : 1);

        this.setState({
          unassignedSites:unassignedSites,
          currentGroup: null,
          groups
        });
      });
  }

  deleteGroup(group) {
    utils.confirm(
      Resx.get("DeleteGroup.Confirm"), Resx.get("Delete"), Resx.get("Cancel"),
      () => {
        service
          .delete(group.PortalGroupId)
          .then(() => {
            this.setState({
              unassignedSites: this.state.unassignedSites
                .concat(group.Portals)
                .concat([group.MasterPortal])
                .sort((a, b) => a.PortalName < b.PortalName ? -1 : 1),
              groups: this.state.groups.filter((g) => g.PortalGroupId !== group.PortalGroupId),
            });
          });
      });
  }

  render() {
    return (
      <GridCell>
        <PersonaBarPageHeader title={Resx.get("nav_SiteGroups")}>
          <NewSiteGroup
            unassignedSites={this.state.unassignedSites}
            onNewGroup={(siteId) => this.editNewGroup(Number(siteId))}
          />
        </PersonaBarPageHeader>
        <SiteGroupsTable
          groups={this.state.groups}
          unassignedSites={this.state.unassignedSites}
          currentGroup={this.state.currentGroup}
          onEditGroup={(group) => this.setState({currentGroup:group})}
          onCancelEditing={()=>this.setState({currentGroup:null})}
          onDeleteGroup={(group) => this.deleteGroup(group)} 
          onSave={(result) => this.save(result)}/>
      </GridCell>
    );
  }
}

