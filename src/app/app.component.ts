import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './models/model';
import { AnotherValidaor } from './models/validators';

export class Users implements User {
  constructor( 
    public name: string,
    public surname: string,
    public email: string,
    public birthday: Date,
    public age: number,
    public sex: string,
    public subscription : boolean,
    public phones:number[],
    public address?: Address,
  )
  {}
}

export class Address implements Address {
  constructor( 
    public country: string,
    public city: string,
    public street: string,
    public homeNumber: number,
  )
  {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'Lesson5';

  arrayOfUsers:any = [];
  form = new FormGroup({
    name: new FormControl('', [Validators.required], AnotherValidaor.asyncValidator),
    surname: new FormControl('', [Validators.required, AnotherValidaor.noNums]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required, Validators.min(16), AnotherValidaor.toOld]),
    sex: new FormControl('', Validators.required),
    subscription: new FormControl('', Validators.required),
    phones: new FormArray([new FormControl('+380', [Validators.required, AnotherValidaor.tel])]),
    address: new FormGroup({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      homeNumber: new FormControl('', [Validators.required, Validators.min(1)]),
    })
  });

  submit() {
    this.arrayOfUsers.push(new Users(this.form.value.name,
                                     this.form.value.surname, 
                                     this.form.value.email,
                                     this.form.value.birthday, 
                                     this.form.value.age, 
                                     this.form.value.sex, 
                                     this.form.value.subscription,
                                     this.form.value.phones,
                                    this.form.value.address = new Address(
                                       this.form.value.address.country,
                                       this.form.value.address.city,
                                       this.form.value.address.street,
                                       this.form.value.address.homeNumber
                                     )));
    console.log(this.form);
    // this.form.reset();
  }
  get address():FormGroup{
    return this.form.controls['address'] as FormGroup;
  }
  getFormsArrayControls():FormArray{
    return this.form.controls['phones'] as FormArray;
  }
  addPhone(){
    (<FormArray>this.form.controls['phones']).push(new FormControl('+380', [Validators.required, AnotherValidaor.tel])); 
  }
  deletePhone(i:number){
    (<FormArray>this.form.controls['phones']).removeAt(i); 
  }
  ngOnInit(): void {
    this.form.get('name')?.valueChanges.subscribe( (newName) => {
      this.form.patchValue({
        email: `${newName}@gmail.com`
      });
    });
    
    
    
    

  //   this.form.get('birthday')?.valueChanges.subscribe(newAge => {
  //     let now = new Date();
  //     let today = new Date(now).getFullYear()
  //     let birthday = new Date(__);
  //     newAge = today - birthday;
  //     this.form.patchValue({
  //       age: birthday
  //     })
  //   })
  // }
  }


}
