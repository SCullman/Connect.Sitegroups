using System.Collections.Generic;
using DnnConnect.PersonaBar.SiteGroups.DTOs;

namespace DnnConnect.PersonaBar.SiteGroups.Components
{
    public interface IManagePortalGroups
    {
        IEnumerable<PortalInfo> AvailablePortals();
        void Delete(int portalGroupId);
        IEnumerable<PortalGroupInfo> SiteGroups();
        int Save(PortalGroupInfo portalGroup);
    }
}