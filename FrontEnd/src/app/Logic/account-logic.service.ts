import { Injectable } from '@angular/core';
import { AccountService } from '../Services/account-service.service';


@Injectable({
  providedIn: 'root'
})
export class AccountLogicService {


  public result: number = 0;
  constructor(public accountService: AccountService) { }

  public DoNotAllowWithdrawal(account_type: String, account_Balance: Number) {
    if (account_type === 'savings' && account_Balance <= 0) {
      return true;
    } else if (account_type === 'savings' && account_Balance > 0) {
      return false;
    }

    if (account_type === 'cheque' && account_Balance <= -500) {
      return true;
    } else if (account_type === 'cheque' && account_Balance > -500) {
      return false;
    }

  }

  public MaxWithdrawal(account_type: String, account_Balance: number) {
    if (account_type === 'savings' && account_Balance < 0) {
      this.result = 0;
      return this.result;
    } else if (account_type === 'savings' && account_Balance >= 0) {
      return account_Balance;
    }

    if (account_type === 'cheque' && account_Balance < -500) {
      this.result = 0;
      return this.result;
    } else if (account_type === 'cheque' && account_Balance >= -500) {
      this.result = 500 + 1 * account_Balance;
      return this.result;
    }
  }
}
