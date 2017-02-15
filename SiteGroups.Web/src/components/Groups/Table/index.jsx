import React from "react";
import Resx from "../../../localization";
import SiteGroupRow from "./Row";
import GridCell from "dnn-grid-cell";
import Button from "dnn-button";
import "./style.less";

const tableFields = [
    { name: "GroupName", width: 45 },
    { name: "MasterSite", width: 45 },
    { name: "", width: 10 }
];

export default class SiteGroupsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    renderHeader() {
        let tableHeaders = tableFields.map((field) => {
            return <GridCell columnSize={field.width} style={{ fontWeight: "bolder" }}>
                {
                    field.name !== "" ?
                        <span>{Resx.get(field.name + ".Header")}</span>
                        : <span>&nbsp; </span>
                }
            </GridCell>;
        });
        return <div id="sitegroups-header-row" className="sitegroups-header-row">{tableHeaders}</div>;
    }

    renderList() {
        return (this.props.groups || []).map((group) =>
            <SiteGroupRow
                key={group.PortalGroupId.toString()}
                group={group}
                onEditGroup={(g) => this.props.onEditGroup(g)}
                onDeleteGroup={(g) => this.props.onDeleteGroup(g)} />);
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
    onEditGroup: React.PropTypes.func,
    onDeleteGroup: React.PropTypes.func,
};