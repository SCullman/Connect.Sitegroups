import React from "react";
import Resx from "../localization";
import GridCell from "dnn-grid-cell";
import Collapse from "dnn-collapsible";
import SiteGroupEditor from "./Editor";
import "./Row.less";
import IconButton from "./common/IconButton";

export default class SiteGroupRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return <div className={"row " + this.props.isOpened} >
      <div className="rowHeader">
        <GridCell columnSize={45} >
          {this.props.group.PortalGroupName}
        </GridCell>
        <GridCell columnSize={45} >
          {this.props.group.MasterPortal.PortalName}
        </GridCell>
        <GridCell columnSize={10} >
          <IconButton type="Edit"
            className={"edit-icon " + !this.props.isOpened}
            onClick={() => this.props.isOpened ? this.props.onCancelEditing() : this.props.onEditGroup(this.props.group)}
            title={Resx.get("Edit.Button")} />
        </GridCell>
      </div>
      <Collapse isOpened={this.props.isOpened}>
        <SiteGroupEditor
          group={this.props.group}
          unassignedSites={this.props.unassignedSites.filter((site) => site.PortalId !== this.props.group.MasterPortal.PortalId)}
          onCancelEditing={() => this.props.onCancelEditing()}
          onDeleteGroup={(group) => this.props.onDeleteGroup((group))}
          onSave={(group) => this.props.onSaveGroup(group)} />
      </Collapse>
    </div>;
  }
}

SiteGroupRow.propTypes = {
  unassignedSites: React.PropTypes.array,
  group: React.PropTypes.object,
  onDeleteGroup: React.PropTypes.func,
  onSaveGroup: React.PropTypes.func,
  onEditGroup: React.PropTypes.func,
  onCancelEditing: React.PropTypes.func,
  isOpened: React.PropTypes.bool,

};
