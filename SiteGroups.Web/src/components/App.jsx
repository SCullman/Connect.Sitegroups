import React from "react";
import SiteGroupEditor from "./Editor";
import SiteGroups from "./Groups";
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
      .then(sites => this.setState({ unassignedSites:sites}));
  }

  editNewGroup(id) {
    const site = this.state.unassignedSites.find((s) => s.PortalId === id);
    this.setState({
      currentGroup: {
        PortalGroupId: -1,
        MasterPortal: site,
        PortalGroupName: site.PortalName,
        AuthenticationDomain: "",
        Portals: [],
      },
    });
  }

  saveGroup(r) {
    const group = r.PortalGroup;
    const unassignedSites = r.unassignedSites;
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
          unassignedSites,
          currentGroup: null,
          groups
        });
      });
  }
  
  deleteGroup(group) {
    utils.confirm(Resx.get("DeleteGroup.Confirm"),Resx.get("Delete"),Resx.get("Cancel"), ()=> {
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
      this.state.currentGroup ?
        (<SiteGroupEditor
          group={this.state.currentGroup}
          sites={this.state.unassignedSites.filter((site) => site.PortalId !== this.state.currentGroup.MasterPortal.PortalId)}
          onCancelEdit={() => this.setState({ currentGroup: null })}
          onSave={(r) => this.saveGroup(r)} />
        ) : (
          <SiteGroups
            groups={this.state.groups}
            sites={this.state.unassignedSites}
            onEditGroup={(group) => this.setState({ currentGroup: group })}
            onNewGroup={(siteId) => this.editNewGroup(Number(siteId))}
            onDeleteGroup={(group) => this.deleteGroup(group)} />
        ));
  }
}

