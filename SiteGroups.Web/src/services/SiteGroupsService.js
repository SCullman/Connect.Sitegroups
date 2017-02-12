import util from "utils";

class SiteGroupsService {
  getServiceFramework() {
    let sf = util.sf;

    sf.moduleRoot = "PersonaBar";
    sf.controller = "SiteGroups";

    return sf;
  }
  getSiteGroups( ) {
    const sf = this.getServiceFramework();
    return sf.get("GetSiteGroups" , {});
  }
  getAvailablePortals( ) {
    const sf = this.getServiceFramework();
    return sf.get("GetAvailablePortals" , {});
  }
  saveSiteGroup(siteGroup) {
    const sf = this.getServiceFramework();
    return sf.post("SaveSiteGroup", siteGroup);
  }
  deleteSiteGroup(siteGroupId) {
    const sf = this.getServiceFramework();
    return sf.post("DeleteSiteGroup?groupId=" + siteGroupId, {});
  }
}
const siteGroupsService = new SiteGroupsService();
export default siteGroupsService;