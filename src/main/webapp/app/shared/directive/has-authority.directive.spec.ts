import { HasAuthorityDirective } from './has-authority.directive';
import {AuthService} from "../../services/AuthService";

describe('HasAuthorityDirective', () => {
  it('should create an instance', () => {
    const directive = new HasAuthorityDirective(new AuthService(null, null), null, null);
    expect(directive).toBeTruthy();
  });
});
