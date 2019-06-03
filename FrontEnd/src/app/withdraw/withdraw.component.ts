/*
 Components
  Mat-Dialog      - Angular Material Dialog
  input           - input of type number to input number value
  button          - Sass interpretation of bootstrap warning and success buttons.

  Style Classes
  scssBtn         - Sass button
  green           - Interpretation of success bootstrap button
  orange          - Interpretation of warning bootstrap button

  Functions
  onOk            - Function to withdraw money and exit to account list component.
  onCancel        - Function to cancel and exit dialog to account list component.


  This component is loaded by clicking an enable withdraw button in account list.

*/

//Angular import
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Angular Material
import { MatDialogRef } from '@angular/material';

//Services
import { AccountService } from '../Services/account-service.service';
import { AccountLogicService } from '../Logic/account-logic.service';


@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

  public withdrawAmount: number = 0;

  myForm = new FormGroup({})

  /**
   *
   * @param dialogRef - Matdialog reference to keep state of current dialog
   * @param accountService - Services that contains the current account.
   * @param accountLogicService - Service that interprets the business logic of cheque and savings accounts.
   * @param formBuilder - Form validation services that checks for a valid withdraw amount.
   */
  constructor(
    public dialogRef: MatDialogRef<WithdrawComponent>,
    public accountService: AccountService,
    public accountLogicService: AccountLogicService,
    public formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      // Adding the "myNum" input to our FormGroup along with its min-max Validators.
      'Amount': ['', [Validators.min(0.01), Validators.max(this.accountService.currentAccount.maxWithDrawAmount)]]
    });
  }

  ngOnInit() {

  }

  /** function to click ok in dialog  */
  onOk() {

    this.withdrawAmount = this.myForm.controls.Amount.value;
    this.accountService.currentAccount.balance -= this.withdrawAmount;
    this.accountService.currentAccount.balance = Math.round(this.accountService.currentAccount.balance * 100) / 100;

    this.accountService.currentAccount.maxWithDrawAmount = this.accountLogicService.MaxWithdrawal(
      this.accountService.currentAccount.account_type,
      this.accountService.currentAccount.balance);
    this.accountService.currentAccount.buttonDisabled = this.accountLogicService.DoNotAllowWithdrawal(
      this.accountService.currentAccount.account_type,
      this.accountService.currentAccount.balance);
    alert('Success');
    this.dialogRef.close(true);

  }

  /** function to cancel dialog */
  onCancel() {
    this.dialogRef.close(false);
  }

}
