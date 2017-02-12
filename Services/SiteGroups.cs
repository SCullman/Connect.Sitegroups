using DotNetNuke.Framework;
using DnnConnect.PersonaBar.SiteGroups.Components;

namespace DnnConnect.PersonaBar.SiteGroups.Services
{
    public class SiteGroups : ServiceLocator<IManagePortalGroups, SiteGroups>
    {
        protected override System.Func<IManagePortalGroups> GetFactory()
        {
            return () => new PortalGroupAdapter();
        }
    }
}