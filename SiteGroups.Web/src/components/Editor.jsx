import React from "react";
import Resx from "../localization";
import Grid from "dnn-grid-system";
import GridCell from "dnn-grid-cell";
import Button from "dnn-button";
import AssignedSelector from "./AssignedSelector";
//import Label from "dnn-label";
import SingleLineInputWithError from "dnn-single-line-input-with-error";
import MultiLineInputWithError from "dnn-multi-line-input-with-error";
import "./Editor.less";

export default class SiteGroupEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="sitegroup-details-editor">
      <GridCell>
        <Grid numberOfColums={2}>
          <div className="editor-container">
            <div className="editor-row divider">
              <SingleLineInputWithError
                value={this.props.group.MasterPortal.PortalName}
                enabled={false}
                label={Resx.get("MasterSite.Label")}
                tooltipMessage={Resx.get("MasterSite.Help")}
                inputStyle={{ marginBottom: 15 }}
                tabIndex={1} />
            </div>
            <div className="editor-row divider">
              <SingleLineInputWithError
                value={this.props.portalGroupName}
                enabled={true}
                onChange={(e) => this.props.onGroupNameChanged(e.target.value)}
                maxLength={50}
                error={this.props.errors.groupName}
                label={Resx.get("GroupName.Label")}
                tooltipMessage={Resx.get("GroupName.Help")}
                errorMessage={Resx.get("GroupName.Required")}
                autoComplete="off"
                inputStyle={{ marginBottom: 15 }}
                tabIndex={2} />
            </div>
          </div>
          <div className="editor-container  right-column">
            <div className="editor-row divider">
              <SingleLineInputWithError
                value={this.props.authenticationDomain}
                enabled={true}
                onChange={(e) => this.props.onAuthenticationDomainChanged(e.target.value)}
                maxLength={50}
                label={Resx.get("AuthenticationDomain.Label")}
                tooltipMessage={Resx.get("AuthenticationDomain.Help")}
                autoComplete="off"
                inputStyle={{ marginBottom: 15 }}
                tabIndex={3} />
            </div>
            <div className="editor-row divider">
              <MultiLineInputWithError
                value={this.props.description}
                enabled={true}
                onChange={(e) => this.props.onDescriptionChanged(e.target.value)}
                maxLength={50}
                label={Resx.get("Description.Label")}
                tooltipMessage={Resx.get("Description.Help")}
                autoComplete="off"
                inputStyle={{ marginBottom: 15 }}
                tabIndex={4} />
            </div>
          </div>
        </Grid>
        <div className="selector-container">
          <AssignedSelector
            assignedPortals={this.props.portals}
            unassignedPortals={this.props.unassignedSites}
            onClickOnPortal={(i, t) => this.props.onClickOnPortal(i, t)}
            moveItemsLeft={() => this.props.onMoveItemsLeft()}
            moveItemsRight={() => this.props.onMoveItemsRight()}
            moveAll={(direction) => this.props.onMoveAll(direction)}
          />
        </div>
      </GridCell>
      <div className="buttons-box">
        {!this.props.isNew && <Button type="secondary" onClick={() => this.props.onDeleteGroup(this.props.group)}>{Resx.get("Delete.Button")}</Button>}
        <Button type="secondary" onClick={() => this.props.onCancel()}>{Resx.get("Cancel.Button")}</Button>
        <Button type="primary" onClick={() => this.props.onSave()}>{Resx.get("Save.Button")}</Button>
      </div>
    </div>;
  }
}

SiteGroupEditor.propTypes = {
  portalGroupName: React.PropTypes.string,
  errors: React.PropTypes.object,
  authenticationDomain: React.PropTypes.string,
  description: React.PropTypes.string,
  portals: React.PropTypes.array,
  group: React.PropTypes.object,
  unassignedSites: React.PropTypes.array,
  onCancel: React.PropTypes.func,
  onDeleteGroup: React.PropTypes.func,
  onSave: React.PropTypes.func,
  onGroupNameChanged: React.PropTypes.func,
  onDescriptionChanged: React.PropTypes.func,
  onAuthenticationDomainChanged: React.PropTypes.func,
  onClickOnPortal: React.PropTypes.func,
  onMoveItemsLeft: React.PropTypes.func,
  onMoveItemsRight: React.PropTypes.func,
  onMoveAll: React.PropTypes.func,
  isNew: React.PropTypes.bool,
}; 