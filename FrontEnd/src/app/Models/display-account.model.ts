/** Account Data Model */
export class DisplayAccount {
  public account_number: String = '';
  public account_type: String = 'cheque';
  public balance: number = 0.00;
  public buttonDisabled: Boolean = false;
  public maxWithDrawAmount:number = 0.00;
}
