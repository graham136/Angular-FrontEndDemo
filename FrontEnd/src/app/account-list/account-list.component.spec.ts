import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountListComponent } from './account-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';


describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
                MatDialogModule,
                BrowserAnimationsModule],
      declarations: [ AccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a h3 tag', async(() => {
    const fixture = TestBed.createComponent(AccountListComponent);
    const debugElement = fixture.debugElement.query(By.css('h3'));
    expect(debugElement).toBeTruthy();
  }));

  it('should render a h2 tag', async(() => {
    const fixture = TestBed.createComponent(AccountListComponent);
    const debugElement = fixture.debugElement.query(By.css('h2'));
    expect(debugElement).toBeTruthy();
  }));

  it('should render a table tag', async(() => {
    const fixture = TestBed.createComponent(AccountListComponent);
    const debugElement = fixture.debugElement.query(By.css('table'));
    expect(debugElement).toBeTruthy();
  }));

  it('should render "AccountNumber" in a th tag', async(() => {
    const fixture = TestBed.createComponent(AccountListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('th').textContent).toContain('AccountNumber');
  }));
});
