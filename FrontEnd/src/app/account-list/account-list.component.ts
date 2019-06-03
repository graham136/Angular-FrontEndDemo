/*
Account List Component
  Components
  Top Bar         - The top bar is a css generated menu bar, with a gradient
                    background.

  Bootstrap Table - The table is a bootstrap 4.0 repsonsive table

  Style Classes

  Top Bar         - The styles are declared on the ID TopBar. This is in contrast
                    to style classes in the splash component and inline style in the
                    bootstrap table.

  Bootstrap Table - The styles are inline so you know I can also do inline styling in contrast to
                    the Splash component which is done with style classes. The style classes
                    are declared the styles.css so they can be swapped in.

  Animations
  EnterLeave      - The animation is imported from Animations/EnterLeaveAnimations.
                    This in contrast to the splash screen where it was declared in
                    the component itself.

  Functions
  openWithDrawDialog(index: number)       - Loads the Withdraw dialog
  ComputeBalance()                        - Computes the total balance left to
                                            withdraw from the accounts.
  This is component to loaded by clicking the continue button on splash screen.
*/

//Angular Imports
import { Component } from '@angular/core';

// Services
import { AccountService } from '../Services/account-service.service';

//Logic Services
import { AccountLogicService} from '../Logic/account-logic.service';

// Models
import { Account } from '../Models/account.model';
import { DisplayAccount } from '../Models/display-account.model';

//Material Components
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatDialogConfig } from '@angular/material';

//Custom Modules
import { WithdrawComponent } from '../withdraw/withdraw.component';


// Animation Imports
import { EnterLeaveAnimations } from '../Animations/enter-leave.animations';


@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
  animations: [EnterLeaveAnimations],

})
export class AccountListComponent {

  public accounts: Account[] = [];
  public displayAccounts: DisplayAccount[] = [];
  public tempDisplayAccount: DisplayAccount;
  public balance: number;
  public dialogRef: MatDialogRef<WithdrawComponent>;

  /**
   * Constructor
   * @param accountService      - The service used to store the account values
   * @param accountLogicService - The service used to compute the business logic
   *                              of the saving and cheque accounts
   * @param dialog              - A dialog of type Matdialog that loads and keeps
   *                              the state of Withdraw dialog.
   */
  constructor(public accountService: AccountService,
              public accountLogicService: AccountLogicService,
              public dialog: MatDialog) {

// Get all the accounts from account service, which receives it from accountHttpService
   this.accountService.GetAllAccounts().subscribe(
     (result: Account[]) => {
          this.accounts = result;
          this.balance = 0;
          this.accounts.forEach((account, index) => {
            this.tempDisplayAccount = new DisplayAccount();
            this.tempDisplayAccount.account_number  = account.account_number;
            this.tempDisplayAccount.account_type = account.account_type;
            this.tempDisplayAccount.balance  = account.balance;
            this.tempDisplayAccount.buttonDisabled = accountLogicService.DoNotAllowWithdrawal(
                this.tempDisplayAccount.account_type,
                 this.tempDisplayAccount.balance);
            this.tempDisplayAccount.maxWithDrawAmount = accountLogicService.MaxWithdrawal(
              this.tempDisplayAccount.account_type,
                 this.tempDisplayAccount.balance);
            this.displayAccounts.push(this.tempDisplayAccount);
            this.ComputeBalance();
          });
        });
  }

  /**
   * Function to open the Material Dialog Withdraw Dialog
   * @param index - the current index of the displayAccount array which was
   *                found by clicking the withdraw button
   */
  openWithDrawDialog(index: number) {
    this.accountService.currentAccount = this.displayAccounts[index];
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    this.dialogRef = this.dialog.open(WithdrawComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      this.balance = this.ComputeBalance();
      console.log(this.balance);
    });
  }

  /**
   * Function to compute the remaining balances of displayed accounts
   */
  public ComputeBalance() {
    this.accountService.currentBalance = 0;
    this.displayAccounts.forEach(account => {
      this.accountService.currentBalance += 1 * account.balance;
    });
    return this.accountService.currentBalance;
  }
}
