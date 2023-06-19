import { TestBed } from '@angular/core/testing';

import { AuthPermissionGuard } from './auth-permission.guard';

describe('AuthPermissionGuard', () => {
  let guard: AuthPermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
