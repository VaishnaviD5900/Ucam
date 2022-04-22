import { TestBed } from '@angular/core/testing';

import { WebServerService } from '../services/web-server.service';

describe('WebServerService', () => {
  let service: WebServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
