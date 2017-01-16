import React from 'react';
import { render } from "react-dom";

import SiteGroupApp from './components/App';

const  PortalGroups = [
  {
    PortalGroupId: 1, AuthenticationDomain: 'portal1',
    MasterPortal: {
       PortalName:'Portal1', 
       PortalId:1
    }, 
    PortalGroupName: 'Gruppe 1',
    Portals: [{
      PortalName:'Portal2', 
      PortalId:2
    },{
      PortalName:'Portal3', 
      PortalId:3
    }]
  }, {
    PortalGroupId: 2, AuthenticationDomain: 'portal4',
    MasterPortal: {
       PortalName:'Portal4', 
       PortalId:4
    }, 
    PortalGroupName: 'Gruppe 2',
    Portals: [{
      PortalName:'Portal5', 
      PortalId:5
    },{
      PortalName:'Portal6', 
      PortalId:6
    }]
  }
];
const AvailablePortals = [{
      PortalName:'Portal7', 
      PortalId:7
    },{
      PortalName:'Portal8', 
      PortalId:8
    },{
      PortalName:'Portal9', 
      PortalId:9
    }];
 
const appContainer = document.getElementById("siteGroups-container");

render(
  <SiteGroupApp  />,
  appContainer
);
