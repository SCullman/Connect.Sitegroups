using System.Collections.Generic;

namespace DnnConnect.PersonaBar.SiteGroups.DTOs
{
    public class PortalGroupInfo
    {
        public int PortalGroupId { get; set; }
        public string PortalGroupName { get; set; }
        public string AuthenticationDomain { get; set; }
        public PortalInfo MasterPortal { get; set; }
        public IEnumerable<PortalInfo> Portals { get; set; }
        public string Description { get; set; }
    }
}