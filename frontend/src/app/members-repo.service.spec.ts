import { MembersRepo } from './members-repo.service';
import { TestBed } from '@angular/core/testing';

describe('MembersRepo', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MembersRepo = TestBed.get(MembersRepo);
    expect(service).toBeTruthy();
  });
});
