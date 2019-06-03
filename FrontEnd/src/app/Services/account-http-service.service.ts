
//Angular imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Models
import { Account } from '../Models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {

  //Setup the api url to receive data from the node.js server

  private accountRoute: String = 'api/accounts';
  public baseUrl = environment.baseApiUrl;
    constructor(private httpClient: HttpClient) {
   }

   /**
    * Function to retrieve the account values from the api endpoints.
    * The function is used by accountservice to retrieve the account values and
    *  store them
    */
   AccountList() {
    //const endPoint = environment.baseApiUrl + this.accountRoute;
    const endPoint = environment.baseApiUrl;
    console.log(endPoint);
    return this.httpClient.get<Account[]>(endPoint, { observe: 'response' })
      .pipe(
        map(response => {
            return response.body;
          })
      );
  }
}
