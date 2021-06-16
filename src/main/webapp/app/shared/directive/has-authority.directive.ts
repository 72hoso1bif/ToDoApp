import {Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../services/AuthService";


/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *appHasAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *appHasAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
  selector: '[appHasAuthority]'
})
export class HasAuthorityDirective implements OnDestroy {

  private authorities: string[] = [];
  private authenticationSubscription?: Subscription;

  constructor(private authService: AuthService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}

  @Input()
  set appHasAuthority(value: string | string[]) {
    this.authorities = typeof value === 'string' ? [value] : value;
    this.updateView();
    // Get notified each time authentication state changes.
    this.authenticationSubscription = this.authService.getUser.subscribe(() => this.updateView());
  }

  ngOnDestroy(): void {
    if (this.authenticationSubscription) {
      this.authenticationSubscription.unsubscribe();
    }
  }

  private updateView(): void {
    const hasAnyAuthority = this.authService.hasAnyAuthority(this.authorities);
    this.viewContainerRef.clear();
    if (hasAnyAuthority) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

}
