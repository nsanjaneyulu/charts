import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Subject} from 'rxjs';
import { CipherService } from './cipher.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private sidebarValue: boolean = true;
  private sidebarAngularSignal = signal<boolean>(this.sidebarValue);
  isExpandableSubject$ = new BehaviorSubject<boolean>(true);
  isExpandable$ = this.isExpandableSubject$.asObservable();
  private buttonClickSubject = new Subject<void>();
  buttonClick$ = this.buttonClickSubject.asObservable();

  constructor(
    private cipherService: CipherService,
    private messageService: MessageService,
    private confirmService: ConfirmationService
  ) { }

  emitButtonClickEvent() {
    this.buttonClickSubject.next();
  }
  // public showLoader = () => this.$loading.next(true);
  // public hideLoader = () => this.$loading.next(false);
  // public setTitle = (title: string) => this.$pageTitle.next(title);
  // public toggleSidebar() {
  //   this.sidebarValue = !this.sidebarValue;
  //   this.$sidebarshow.next(this.sidebarValue);
  // }

  // public toggleSideBarEvent() { 
  //   return this.$sidebarshow.asObservable(); 
  // }

get getsidebarvalue()
{
  console.log(this.sidebarAngularSignal(),"gettingvalue")
  return this.sidebarAngularSignal();
}

updatesidebarSignal(value:boolean)
{

  this.sidebarAngularSignal.set(value);
 
}

  public notify(
    title: string,
    message: string,
    severity: 'error' | 'success' | 'warn' | 'info'
  ) {
    this.messageService.add({ severity, summary: title, detail: message, life: 10000 });
  }

  public notifyAll(errors: { severity: string; summary: string; detail: string; }[]) {
    this.messageService.addAll(errors);
  }

  public askConsent(
    _title: string,
    message: string,
    acceptCallback?: Function,
    denyCallback?: Function
  ) {
    return this.confirmService.confirm({
      message,
      header: _title,
      dismissableMask: true,
      icon: 'pi pi-exclamation-triangle',
      accept: acceptCallback,
      reject: denyCallback,
    });
  }

  /**
   * Method to store data into browser's localStorage
   * @param key The identifier of the value to be stored. Keys are prefixed with 'SB_'
   * @param data
   */
  public setLocalData = (key: string, data: any) =>
    localStorage.setItem(
      key.startsWith('SB_') ? key : `SB_${key}`,
      this.cipherService.encrypt(data)
    );

  /**
   * Method to fetch data from browser's localStorage
   * @param key The identifier of the value to be fetched.
   */
  public getLocalData<T>(key: string): T {
    return this.cipherService.decrypt(
      localStorage.getItem(key.startsWith('SB_') ? key : `SB_${key}`) ?? ''
    ) as T;
  }

  /**
   * Method to remove data from browser's localStorage
   * @param key The identifier of the value to be fetched.
   */
  public removeLocalData(key: string) {
    localStorage.removeItem(`SB_${key}`);
  }

  /**
   * Checks if a key-value pair exists in browsers localStorage
   * @param key The identifier in the key-value pair
   * @returns
   */
  public hasLocalData = (key: string): boolean => {
    let idx = 0;
    let flag: boolean = false;
    while (!flag && idx < localStorage.length) {
      flag = `SB_${key}`.includes(localStorage.key(idx) ?? ''); //Please Check later
      idx = idx + 1;
    }
    return flag;
  };

  /**
   * Clears the browser's localStorage
   * @returns
   */
  public clearLocalData = () => localStorage.clear();
}
