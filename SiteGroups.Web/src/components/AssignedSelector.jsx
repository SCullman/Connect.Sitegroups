import React from "react";
import GridCell from "dnn-grid-cell";
import { Scrollbars } from "react-custom-scrollbars";
import { ArrowLeftIcon, ArrowRightIcon, DoubleArrowRightIcon, DoubleArrowLeftIcon } from "dnn-svg-icons";
import Resx from "localization";
import styles from "./AssignedSelector.less";
class AssignedSelector extends React.Component {
  constructor(props) {
    super(props);
  }
  getPortalList(list, type) {
    return list.map((portal, index) => {
      return <li className={portal.selected ? "selected" : ""}
        onClick={()=>this.props.onClickOnPortal(index, type)}>
        {portal.PortalName}
      </li>;
    });
  }
  /* eslint-disable react/no-danger */
  render() {
    const assignedPortals = this.getPortalList(this.props.assignedPortals, "assignedPortals");
    const unassignedPortals = this.getPortalList(this.props.unassignedPortals, "unassignedPortals");
    return (
      <GridCell className={styles.assignedSelector}>
        <GridCell columnSize={45} className="selector-box">
          <h6>{Resx.get("EditModule_Unassigned.Label")}</h6>
          <Scrollbars style={{ width: "100%", height: "100%", border: "1px solid #c8c8c8" }}>
            <ul>
              {unassignedPortals}
            </ul>
          </Scrollbars>
        </GridCell>
        <GridCell columnSize={10} className="selector-controls">
          <div href="" className="move-item single-right" onClick={()=>this.props.moveItemsRight()} dangerouslySetInnerHTML={{ __html: ArrowRightIcon }}></div>
          <div href="" className="move-item single-left" onClick={()=>this.props.moveItemsLeft()} dangerouslySetInnerHTML={{ __html: ArrowLeftIcon }}></div>
          <div href="" className="move-item double-right" onClick={()=>this.props.moveAll("right")} dangerouslySetInnerHTML={{ __html: DoubleArrowRightIcon }}></div>
          <div href="" className="move-item double-left" onClick={()=>this.props.moveAll("left")} dangerouslySetInnerHTML={{ __html: DoubleArrowLeftIcon }}></div>
        </GridCell>
        <GridCell columnSize={45} className="selector-box">
          <h6>{Resx.get("EditModule_Assigned.Label")}</h6>
          <Scrollbars style={{ width: "100%", height: "100%", border: "1px solid #c8c8c8" }}>
            <ul>
              {assignedPortals}
            </ul>
          </Scrollbars>
        </GridCell>
      </GridCell>
    );
  }
}

AssignedSelector.propTypes = {
  assignedPortals: React.PropTypes.array,
  unassignedPortals: React.PropTypes.array,
  onClickOnPortal: React.PropTypes.func,
  moveItemsRight: React.PropTypes.func,
  moveItemsLeft: React.PropTypes.func,
  moveAll: React.PropTypes.func,
};

export default AssignedSelector;