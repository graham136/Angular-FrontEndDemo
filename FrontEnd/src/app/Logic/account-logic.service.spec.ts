import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AccountLogicService } from './account-logic.service';

describe('AccountLogicService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: AccountLogicService = TestBed.get(AccountLogicService);
    expect(service).toBeTruthy();
  });

  it('Cheque balance of R500 should withdraw', () => {
    const service: AccountLogicService = TestBed.get(AccountLogicService);
    expect(service.DoNotAllowWithdrawal('cheque', 500)).toBeFalsy();
  });

  it('Cheque balance of R-750 should not withdraw', () => {
    const service: AccountLogicService = TestBed.get(AccountLogicService);
    expect(service.DoNotAllowWithdrawal('cheque', -750)).toBeTruthy();
  });

  it('Cheque balance of R-490 should withdraw', () => {
    const service: AccountLogicService = TestBed.get(AccountLogicService);
    expect(service.DoNotAllowWithdrawal('cheque', -490)).toBeFalsy();
  });

  it('Savings balance of R500 should withdraw', () => {
    const service: AccountLogicService = TestBed.get(AccountLogicService);
    expect(service.DoNotAllowWithdrawal('savings', 500)).toBeFalsy();
  });

  it('Savings balance of R 0 should not withdraw', () => {
    const service: AccountLogicService = TestBed.get(AccountLogicService);
    expect(service.DoNotAllowWithdrawal('savings', 0)).toBeTruthy();
  });

  it('Max withdrawal of savings balance of R 20 should be R20', () => {
    const service: AccountLogicService = TestBed.get(AccountLogicService);
    expect(service.MaxWithdrawal('savings', 20)).toEqual(20);
  });

  it('Max withdrawal of cheque balance of -ZAR 490 should be ZAR 10', () => {
    const service: AccountLogicService = TestBed.get(AccountLogicService);
    expect(service.MaxWithdrawal('cheque', -490)).toEqual(10);
  });

});
