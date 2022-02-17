import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

export class AnotherValidaor {
  static toOld(control: AbstractControl): ValidationErrors | null {
    if (control.value > 70 ) {
      return { toOld: true };
      } 
    else{
          return null;
      }
    }
    static noNums(control: AbstractControl): ValidationErrors | null {
     const reg = new RegExp('[0-9]')
      if ((reg.test(control.value))) {
        return { noNums: true };
        } 
      else{
            return null;
        }
      }
    static tel(control: AbstractControl): ValidationErrors | null {
      const reg = new RegExp('/^(\\s*)?(\\+)?([- _():=+]?\\d[- _():=+]?){10,14}(\\s*)?$/');
       if (!(reg.test(control.value))) {
         return { noNums: true };
         } 
       else{
             return null;
         }
       }  
    
      
    static asyncValidator(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      return new Promise(resolver => {
        const reg = new RegExp('[0-9]')
        setTimeout(() => {
          if ((reg.test(control.value))) {
            resolver({ asyncValidator: true });
          } 
          else {
            resolver(null);
          }
        }, 1000);
      });
    }
}