import React from "react";
import Resx from "localization";
import NewSiteGroup from "./NewGroup";
import SiteGroupsTable from "./Table";
import GridCell from "dnn-grid-cell";
import PersonaBarPageHeader from "dnn-persona-bar-page-header";
import PersonaBarPageBody from "dnn-persona-bar-page-body";

export default class SiteGroups extends React.Component {
  render() {
    return (
      <GridCell>
        <PersonaBarPageHeader title={Resx.get("nav_SiteGroups")}>
          <NewSiteGroup
            sites={this.props.sites}
            onNewGroup={(siteId) => this.props.onNewGroup(siteId)} />
        </PersonaBarPageHeader>

        <SiteGroupsTable
          groups={this.props.groups}
          onEditGroup={(g) => this.props.onEditGroup(g)}
          onDeleteGroup={(g) => this.props.onDeleteGroup(g)} />

      </GridCell>
    );
  }
}

SiteGroups.propTypes = {
  groups: React.PropTypes.array,
  sites: React.PropTypes.array,
  onEditGroup: React.PropTypes.func,
  onDeleteGroup: React.PropTypes.func,
  onNewGroup: React.PropTypes.func,
};

