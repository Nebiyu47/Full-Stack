import { FormControl, ValidationErrors } from '@angular/forms';
export class ShoValidators {
    static notOnlyWhiteSpace(control:FormControl): ValidationErrors {
        if((control.value!=null)&&(control.value.tirm().length==0)){
            return {'notOnlyWhieSpace':true}
        }else{
            return { 
                vaild:false
            }
        }
    }
}
