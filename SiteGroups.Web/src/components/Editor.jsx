import React from "react";
import Resx from "../localization";
import Grid from "dnn-grid-system";
import GridCell from "dnn-grid-cell";
import Button from "dnn-button";
import AssignedSelector from "./AssignedSelector";
//import Label from "dnn-label";
import SingleLineInputWithError from "dnn-single-line-input-with-error";
import "./Editor.less";

export default class SiteGroupEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PortalGroupName: props.group.PortalGroupName || "",
      AuthenticationDomain: props.group.AuthenticationDomain,
      Portals: JSON.parse(JSON.stringify(props.group.Portals)),
      UnassignedSites: JSON.parse(JSON.stringify(props.unassignedSites)),
      errors: {
        groupName: false,
        authenticationDomain: false,
      },
    };
    this.submitted = false;
  }

  onClickOnPortal(index, type) {
    if (type === "assignedPortals") {
      let p = JSON.parse(JSON.stringify(this.state.Portals));
      p[index].selected = !p[index].selected;
      this.setState({ Portals: p });
    } else {
      let p = JSON.parse(JSON.stringify(this.state.UnassignedSites));
      p[index].selected = !p[index].selected;
      this.setState({ UnassignedSites: p });
    }
  }

  moveItemsLeft() {
    let assignedPortals = JSON.parse(JSON.stringify(this.state.Portals));
    let unassignedPortals = JSON.parse(JSON.stringify(this.state.UnassignedSites));
    let itemsToStay = [], itemsToMove = [];
    let selectedCount = 0;
    assignedPortals.forEach((portal) => {
      let {selected} = portal;
      delete portal.selected;
      if (selected) {
        selectedCount++;
        itemsToMove.push(portal);
      } else {
        itemsToStay.push(portal);
      }
    });
    if (selectedCount > 0) {
      this.setState({
        UnassignedSites: unassignedPortals.concat(itemsToMove),
        Portals: itemsToStay
      });
    }
  }
  moveItemsRight() {
    let assignedPortals = JSON.parse(JSON.stringify(this.state.Portals));
    let unassignedPortals = JSON.parse(JSON.stringify(this.state.UnassignedSites));
    let itemsToStay = [], itemsToMove = [];
    let selectedCount = 0;
    unassignedPortals.forEach((portal) => {
      let {selected} = portal;
      delete portal.selected;
      if (selected) {
        selectedCount++;
        itemsToMove.push(portal);
      } else {
        itemsToStay.push(portal);
      }
    });
    if (selectedCount > 0) {
      this.setState({
        UnassignedSites: itemsToStay,
        Portals: assignedPortals.concat(itemsToMove)
      });
    }
  }
  moveAll(direction) {
    let assignedPortals = JSON.parse(JSON.stringify(this.state.Portals));
    let unassignedPortals = JSON.parse(JSON.stringify(this.state.UnassignedSites));
    switch (direction) {
      case "right":
        this.setState({
          UnassignedSites: [],
          Portals: assignedPortals.concat(unassignedPortals)
        });

        break;
      default:
        this.setState({
          UnassignedSites: unassignedPortals.concat(assignedPortals),
          Portals: []
        });
        break;
    }
  }
  sortPortals(a, b) {
    return a.PortalName < b.PortalName ? -1 : 1;
  }

  isNew() {
    return this.props.group.PortalGroupId === -1;
  }

  save() {
    this.submitted = true;
    if (this.isValid())
      this.props.onSave(this.result());
  }

  isValid() {
    let valid = true;
    if (this.submitted) {
      let {PortalGroupName} = this.state;
      let {AuthenticationDomain} = this.state;
      let {errors} = this.state;
      errors.groupName = false;
      errors.authenticationDomain = false;
      if (PortalGroupName === "") {
        errors.groupName = true;
        valid = false;
      }
      if (AuthenticationDomain === "") {
        errors.authenticationDomain = true;
        valid = false;
      }
      this.setState({ errors });
    }
    return valid;
  }

  result() {
    return {
      PortalGroup: {
        PortalGroupId: this.props.group.PortalGroupId,
        AuthenticationDomain: this.state.AuthenticationDomain,
        PortalGroupName: this.state.PortalGroupName,
        MasterPortal: this.props.group.MasterPortal,
        Portals: this.state.Portals,
      },
      UnassignedSites: this.state.UnassignedSites,
    };
  }

  render() {
    return <div className="sitegroup-details-editor">
      <GridCell>
        <Grid numberOfColums={2}>
          <div className="editor-container">
            <div className="editor-row divider">
              <SingleLineInputWithError
                value={this.state.PortalGroupName}
                enabled={true}
                onChange={(e) => {
                  this.setState({ PortalGroupName: e.target.value });
                  this.isValid();}}
                maxLength={50}
                error={this.state.errors.groupName}
                label={Resx.get("GroupName.Label")}
                tooltipMessage={Resx.get("GroupName.Help")}
                errorMessage={Resx.get("GroupName.Required")}
                autoComplete="off"
                inputStyle={{ marginBottom: 15 }}
                tabIndex={1} />
            </div>
          </div>
          <div className="editor-container  right-column">
            <div className="editor-row divider">
              <SingleLineInputWithError
                value={this.props.group.MasterPortal.PortalName}
                enabled={false}
                label={Resx.get("MasterSite.Label")}
                tooltipMessage={Resx.get("MasterSite.Help")}
                inputStyle={{ marginBottom: 15 }}
                tabIndex={2} />
            </div>
            <div className="editor-row divider">
              <SingleLineInputWithError
                value={this.state.AuthenticationDomain}
                enabled={true}
                onChange={(e) => {
                  this.setState({ AuthenticationDomain: e.target.value });
                  this.isValid();}}
                maxLength={50}
                error={this.state.errors.authenticationDomain}
                label={Resx.get("AuthenticationDomain.Label")}
                tooltipMessage={Resx.get("AuthenticationDomain.Help")}
                errorMessage={Resx.get("AuthenticationDomain.Required")}
                autoComplete="off"
                inputStyle={{ marginBottom: 15 }}
                tabIndex={3} />
            </div>
          </div>
        </Grid>
        <div className="selector-container">
          <AssignedSelector
            assignedPortals={this.state.Portals}
            unassignedPortals={this.state.UnassignedSites}
            onClickOnPortal={(i, t) => this.onClickOnPortal(i, t)}
            moveItemsLeft={() => this.moveItemsLeft()}
            moveItemsRight={() => this.moveItemsRight()}
            moveAll={(direction) => this.moveAll(direction)}
          />
        </div>
      </GridCell>


      <div className="buttons-box">
        {!this.isNew() && <Button type="secondary" onClick={() => this.props.onDeleteGroup(this.props.group)}>{Resx.get("Delete.Button")}</Button>}
        <Button type="secondary" onClick={() => this.props.onCancelEditing()}>{Resx.get("Cancel.Button")}</Button>
        <Button type="primary" onClick={() => this.save()}>{Resx.get("Save.Button")}</Button>
      </div>
    </div>;
  }
}

SiteGroupEditor.propTypes = {
  group: React.PropTypes.object,
  unassignedSites: React.PropTypes.array,
  onSave: React.PropTypes.func,
  onCancelEditing: React.PropTypes.func,
  onDeleteGroup: React.PropTypes.func,
}; 