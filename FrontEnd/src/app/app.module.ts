//Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular Material Modules
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule } from '@angular//material';

//Angular Custom Services
import { AccountService } from '../app/services/account-service.service';

//Angular Custom Components
import { AppComponent } from './app.component';
import { AccountListComponent } from './account-list/account-list.component';
import { SplashComponent } from './splash/splash.component';
import { AccountLogicService } from './Logic/account-logic.service';
import { WithdrawComponent } from './withdraw/withdraw.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountListComponent,
    SplashComponent,
    WithdrawComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'splash', pathMatch: 'full' },
      { path: 'splash', component: SplashComponent },
      { path: 'account-list', component: AccountListComponent },
      ])
  ],
  providers: [AccountService, AccountLogicService],
  bootstrap: [AppComponent],
  entryComponents: [WithdrawComponent]
})
export class AppModule { }
