import { TestBed } from '@angular/core/testing';

import { ListsManagerService } from './lists-manager.service';

describe('ListsManagerService', () => {
  let service: ListsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
