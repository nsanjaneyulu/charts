import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { HttpInterceptorFn } from '@angular/common/http';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpInterceptorFn = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
