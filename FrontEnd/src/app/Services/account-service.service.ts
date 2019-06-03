//Angluar Imports
import { Injectable } from '@angular/core';
import { map, flatMap } from 'rxjs/operators';

// Services
import { AccountHttpService } from '../Services/account-http-service.service';

// Models
import { Account } from '../Models/account.model';
import { DisplayAccount } from '../Models/display-account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public accounts: Account[];
  public currentAccount: DisplayAccount = new DisplayAccount();
  public currentBalance: number = 0;
  constructor(public accountHttpService: AccountHttpService) {
  }
/**
   *  Function to retrieve the account values from the accounthttpservice and
   *  store them
   */
  GetAllAccounts() {
    return this.accountHttpService.AccountList()
        .pipe(
          map(accounts => {
            if (accounts) {
              this.accounts = accounts;
          }
          return accounts;
        })
      );
  }
}
