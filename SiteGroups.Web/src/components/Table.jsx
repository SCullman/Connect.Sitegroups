import React from "react";
import Resx from "../localization";
import SiteGroupRow from "./Row";
import GridCell from "dnn-grid-cell";
import "./Table.less";

const tableFields = [
  {
    name: "GroupName",
    width: 45
  }, {
    name: "MasterSite",
    width: 45
  }, {
    name: "",
    width: 10
  }
];

export default class SiteGroupsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderIndex: -1,
    };
  }

  renderHeader() {
    let tableHeaders = tableFields.map((field) => {
      return <GridCell
        columnSize={field.width}
        style={{ fontWeight: "bolder" }}>
        {field.name !== ""
          ? <span>{Resx.get(field.name + ".Header")}</span>
          : <span>&nbsp;</span>
        }
      </GridCell>;
    });
    return <div id="sitegroups-header-row" className="sitegroups-header-row">{tableHeaders}</div>;
  }

  renderList() {
    const existingGroupRows = (this.props.groups || []).map((group) => {
      return <SiteGroupRow
        group={group}
        isOpened={(this.props.currentGroup && this.props.currentGroup.PortalGroupId === group.PortalGroupId || false)}
        unassignedSites={(this.props.unassignedSites || []).filter((site) => site.PortalId !== group.MasterPortal.PortalId)}
        onEditGroup={(g) => this.props.onEditGroup(g)}
        onSaveGroup={(g) => this.props.onSaveGroup(g)}
        onCancelEditing={() => this.props.onCancelEditing()}
        onDeleteGroup={(g) => this.props.onDeleteGroup(g)}>
      </SiteGroupRow>;
    });
    const rows = [this.props.currentGroup && this.props.currentGroup.PortalGroupId === -1 &&
      <SiteGroupRow
        isOpened={true}
        group={this.props.currentGroup}
        unassignedSites={(this.props.unassignedSites || []).filter((site) => site.PortalId !== this.props.currentGroup.MasterPortal.PortalId)}
        onEditGroup={(g) => this.props.onEditGroup(g)}
        onSaveGroup={(g) => this.props.onSaveGroup(g)}
        onCancelEditing={() => this.props.onCancelEditing()}
        onDeleteGroup={(g) => this.props.onDeleteGroup(g)}>
      </SiteGroupRow>].concat(existingGroupRows);
    if (rows.length > 0) {
      return rows;
    } else {
      return <div className="no-sitegroups-row">{Resx.get("NoData")}</div>;
    }

  }

  render() {
    return (
      <div className="sitegroups-list-container">
        <div className="container">
          {this.renderHeader()}
          {this.renderList()}
        </div>
      </div>
    );
  }
}

SiteGroupsTable.propTypes = {
  groups: React.PropTypes.array,
  unassignedSites: React.PropTypes.array,
  currentGroup: React.PropTypes.object,
  onEditGroup: React.PropTypes.func,
  onDeleteGroup: React.PropTypes.func,
  onCancelEditing: React.PropTypes.func,
  onSaveGroup: React.PropTypes.func,
};

/*
  <SiteGroupEditor
          group={this.group}
          sites={this.state.unassignedSites.filter((site) => site.PortalId !== this.props.currentGroup.MasterPortal.PortalId)}
          onCancelEdit={() => this.setState({ currentGroup: null })}
          onSave={(r) => this.saveGroup(r)} />
 */