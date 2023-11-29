import { inject } from "@angular/core";
import { AuthenticateService } from "./authenticate.service";

export function provideGuardForPermission() {
    return () => inject(AuthenticateService).isAuthenticated();
  }