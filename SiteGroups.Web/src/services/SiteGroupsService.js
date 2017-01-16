import util from "utils";

class SiteGroupsService {
    getServiceFramework() {
        let sf = util.sf;

        sf.moduleRoot = "PersonaBar";
        sf.controller = "SiteGroups";

        return sf;
    }
    getSiteGroups( callback, errorCallback) {
        const sf = this.getServiceFramework();
        sf.get("GetSiteGroups" , {}, callback, errorCallback);
    }
    getAvailablePortals( callback, errorCallback) {
        const sf = this.getServiceFramework();
        sf.get("GetAvailablePortals" , {}, callback, errorCallback);
    }
    saveSiteGroup(siteGroup, callback, errorCallback) {
        const sf = this.getServiceFramework();
        sf.post("SaveSiteGroup", saveSiteGroup, callback, errorCallback);
    }
    deleteSiteGroup(siteGroupId, callback, errorCallback) {
        const sf = this.getServiceFramework();
        sf.post("DeleteSiteGroup?groupId=" + siteGroupId, {}, callback, errorCallback);
    }
}
const siteGroupsService = new SiteGroupsService();
export default siteGroupsService;