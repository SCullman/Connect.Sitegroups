import React from "react";
import Resx from "../../../localization";
import Button from "dnn-button";
import "./style.less";

export default class NewSiteGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteId: null
    };
  }
  render() {
    return (
      <div style={{ float: "right" }}>
        <select
          name="sites"
          style={{
            padding: "12px",
            marginRight: "12px"
          }}
          onChange={(e) => this.setState({ siteId: e.target.value === "NoSiteSelected" ? null : e.target.value })}>
          <option value="NoSiteSelected">{Resx.get("ChooseASite.Label")}</option>
          {
            (this.props.sites || []).map((site) =>
              <option key={site.PortalId.toString()} value={site.PortalId}>{site.PortalName}</option>)
          }
        </select>
        <Button
          type="primary"
          size="large"
          disabled={!this.state.siteId}
          onClick={() => this.props.onNewGroup(this.state.siteId)}>{Resx.get("NewSiteGroup.Button")}</Button>
      </div>
    );
  }
}

NewSiteGroup.propTypes = {
  sites: React.PropTypes.array,
  onNewGroup: React.PropTypes.func,
};