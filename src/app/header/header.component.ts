import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  role;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.role = this.authService.getRole();
    console.log(this.role);
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.role = this.authService.getRole();
      });
  }

  onLogout() {
    this.authService.logout();
  }

  onUploadResume(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.authService.uploadResume(file);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
