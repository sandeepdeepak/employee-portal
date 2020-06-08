import { AdminSiteModule } from './admin-site.module';

describe('AdminSiteModule', () => {
  let adminSiteModule: AdminSiteModule;

  beforeEach(() => {
    adminSiteModule = new AdminSiteModule();
  });

  it('should create an instance', () => {
    expect(adminSiteModule).toBeTruthy();
  });
});
