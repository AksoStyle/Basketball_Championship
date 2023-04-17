import { TestBed } from '@angular/core/testing';

import { UserChampionshipsService } from './user-championships.service';

describe('UserChampionshipsService', () => {
  let service: UserChampionshipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserChampionshipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
