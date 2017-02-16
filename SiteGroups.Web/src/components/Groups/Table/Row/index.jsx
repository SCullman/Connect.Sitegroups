import React from "react";
import Resx from "../../../../localization";
import GridCell from "dnn-grid-cell";
import "./style.less";
import IconButton from "../../../common/IconButton";

const SiteGroupRow = (props) => (

    <div className="row">
        <div className="rowHeader">
            <GridCell columnSize={45} >
                {props.group.PortalGroupName}
            </GridCell>
            <GridCell columnSize={45} >
                {props.group.MasterPortal.PortalName}
            </GridCell>
            <GridCell columnSize={10} >
                <IconButton type="Trash"
                    className="edit-icon"
                    onClick={() => props.onDeleteGroup(props.group)}
                    title={Resx.get("Delete.Button")} />
                <IconButton type="Edit"
                    className="edit-icon"
                    onClick={() => props.onEditGroup(props.group)}
                    title={Resx.get("Edit.Button")} />
            </GridCell>
        </div>
    </div>
);

SiteGroupRow.propTypes = {
  group: React.PropTypes.object,
};

export default SiteGroupRow;