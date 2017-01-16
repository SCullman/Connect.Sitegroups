using DotNetNuke.Framework;
using DnnConnect.PersonaBar.SiteGroups.Components;

namespace DnnConnect.PersonaBar.SiteGroups.Services
{
    public class PortalGroups : ServiceLocator<IManagePortalGroups, PortalGroups>
    {
        protected override System.Func<IManagePortalGroups> GetFactory()
        {
            return () => new PortalGroupAdapter();
        }
    }
}