import { Component } from '@angular/core';  
import {FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatChip, MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-practitioner-signup',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    AsyncPipe,
    MatChipsModule,
    MatChip,
    MatCheckboxModule,
    MatError
  ],
  templateUrl: './practitioner-signup.component.html',
  styleUrl: './practitioner-signup.component.css'
})
export class PractitionerSignupComponent {
  constructor(private _formBuilder: FormBuilder) {}

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    medicalSpeciality: new FormControl<string>(''),
    affiliatedHealthcare: new FormControl<string>(''),
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
    username: new FormControl<string>(''),
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
    confirmpassword: new FormControl<string>(''),
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    fifthCtrl: ['', Validators.required],
    firstname: new FormControl<string>(''),
    lastname: new FormControl<string>(''),
    suffix: new FormControl<string>(''),
    birthdate: new FormControl<string>(''),
    location: new FormControl<string>(''),
    phone: new  FormControl<number>(0),
  });
  sixthFormGroup = this._formBuilder.group({
    sixthCtrl: ['', Validators.required],
    tags: new FormControl<object>([])
  });
  isLinear = false;

  ngOnInit() {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      medicalSpeciality: new FormControl<string>(''),
      affiliatedHealthcare: new FormControl<string>(''),
    });

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      username: new FormControl<string>(''),
      email: new FormControl<string>(''),
      password: new FormControl<string>('', Validators.required),
      confirmpassword: new FormControl<string>('', Validators.required),
    }, { validator: this.passwordMatchValidator });

    this.thirdFormGroup.get('confirmpassword')?.valueChanges.subscribe(() => {
      this.thirdFormGroup.updateValueAndValidity(); // Update validity of the form group
    });

    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
    });

    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required],
      firstname: new FormControl<string>('', Validators.required),
      lastname: new FormControl<string>('', Validators.required),
      suffix: new FormControl<string>('', Validators.required),
      birthdate: new FormControl<string>('', Validators.required),
      location: new FormControl<string>('', Validators.required),
      phone: new  FormControl<number>(0, Validators.required)
    });

    this.sixthFormGroup = this._formBuilder.group({
      sixthCtrl: ['', Validators.required],
      tags: new FormControl<object>([], Validators.required)
    });


    this.locationOptions = this.fifthFormGroup.get('location')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );
  }

  // page 2//////////////////////////////////////////////////////////////////////////////////////////////////////

  MedicalSpecialityoptions = [
    { value: "one", label: 'First option' },
    { value: "two", label: 'Second option' }
  ];
  
  Affiliatedoptions = [
    { value: "one", label: 'ads' },
    { value: "two", label: 'asdas' }
  ];


  // page 3/////////////////////////////////////////////////////////////////////////////////////////////////////
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  passwordInput: string ="";
  confirmPasswordInput: string ="";
  isPasswordMatch =false;

  passwordChange(event: any){
    console.log(event.target.value)
    this.passwordInput=event.target.value
  }
  confirmPasswordChange(event: any){
    console.log(event.target.value)
    this.confirmPasswordInput=event.target.value
    if(this.passwordInput === this.confirmPasswordInput){
      this.isPasswordMatch=true 
  }else{
      this.isPasswordMatch=false 
  }
}

get confirmPasswordControl() {
  return this.thirdFormGroup.get('confirmPassword');
}

passwordMatchValidator(group: FormGroup): { mismatch: boolean } | null {
  const passwordControl = group.get('password');
  const confirmPasswordControl = group.get('confirmPassword');
  
  if (!passwordControl || !confirmPasswordControl) {
    return null; // Return null if controls are null
  }

  const password = passwordControl.value;
  const confirmPassword = confirmPasswordControl.value;
  
  return password === confirmPassword ? null : { mismatch: true };
}

  // page 4 //////////////////////////////////////////////////////////////////////////////////////////////  
verificationNumber: number = 0;
verificationChange(){
   const verificationControl = this.fourthFormGroup.get('verification');
  if (verificationControl && verificationControl.value === this.verificationNumber) {
    // Verification successful
  } else {
    // Verification failed
  }
}


// verificationControl && verificationControl.value === this.verification_number

  //page 5 //////////////////////////////////////////////////////////////////////////////////////////////
  // location picker
 
  Locations: StateGroup[] = [
    {
      letter: 'A',
      names: ['Abra','Agusandel Norte','Agusan del Sur','Aklan','Albay','Antique','Apayao','Aurora'],
    },
    {
      letter: 'B',
      names: ['Basilan','Bataan','Batanes','Batangas','Benguet','Biliran','Bohol','Bukidnon','Bulacan'],
    },
    {
      letter: 'C',
      names: ['Cagayan','Camarines Norte','Camarines Sur','Camiguin','Capiz','Catanduanes','Cavite','Cebu','Cotabato',],
    },
    {
      letter: 'D',
      names: ['Davao de Oro','Davao del Norte', 'Davao del Sur','Davao Occidental','Davao Oriental','Dinagat Islands',],
    },
    {
      letter: 'E',
      names: ['Eastern Samar'],
    },
    {
      letter: 'G',
      names: ['Guimaras'],
    },
    {
      letter: 'I',
      names: ['Ifugao','Ilocos Norte','Ilocos Sur','Iloilo','Isabela',],
    },
    {
      letter: 'K',
      names: ['Kalinga',],
    },
    {
      letter: 'L',
      names: ['La Union','Laguna','Lanao del Norte','Lanao del Sur','Leyte',],
    },
    {
      letter: 'M',
      names: ['Maguindanao del Norte','Maguindanao del Sur','Marinduque','Masbate','Misamis Occidental','Misamis Oriental','Mountain Province',],
    },
    {
      letter: 'N',
      names: ['Negros Occidental','Negros Oriental','Northern Samar','Nueva Ecija','Nueva Vizcaya',],
    },
    {
      letter: 'O',
      names: ['Occidental Mindoro', 'Oriental Mindoro',],
    },
    {
      letter: 'P',
      names: ['Palawan','Pampanga','Pangasinan',],
    },
    {
      letter: 'Q',
      names: ['Quezon','Quirino'],
    },
    {
      letter: 'R',
      names: ['Rizal', 'Romblon',],
    },
    {
      letter: 'S',
      names: ['Samar','Sarangani','Siquijor','Sorsogon','South Cotabato','Southern Leyte','Sultan Kudarat','Sulu','Surigao del Norte','Surigao del Sur',],
    },
    {
      letter: 'T',
      names: ['Tarlac', 'Tawi-Tawi'],
    },
    {
      letter: 'Z',
      names: ['Zambales','Zamboanga del Norte','Zamboanga del Sur','Zamboanga Sibugay',],
    },
  ];

  locationOptions!: Observable<StateGroup[]>;

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.Locations
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.Locations;
  }

//tags //////////////////////////////////////////////////////////////////////////////////////////////////////////////
tags: any[] = [
  {
    id: 1,
    name: 'Cardiovascular Medicine',
    isSelected:false
  },
  {
    id: 2,
    name: 'Dentistry',
    isSelected:false
  },
  {
    id: 3,
    name: 'Cancer',
    isSelected:false
  },
  {
    id:4,
    name: 'Psychology',
    isSelected:false
  },
  {
    id:5,
    name: 'Nutrition',
    isSelected:false
  },
  {
    id:6,
    name: 'Sleeping Disorder',
    isSelected:false
  },
  {
    id:7,
    name: 'Acne Treatment',
    isSelected:false
  },
  {
    id: 8,
    name: 'Opthalmology',
    isSelected:false
  },
  {
    id:9,
    name: 'Alzheimer Disease',
    isSelected:false
  },
  {
    id:10,
    name: 'Oral Medicine',
    isSelected:false
  },
  {
    id:11,
    name: 'ADHD',
    isSelected:false
  },
  {
    id: 12,
    name: 'AIDS/HIV',
    isSelected:false
  }
]

selectedTags(id: number){
  this.tags[id-1].isSelected = !this.tags[id-1].isSelected
  console.log(this.tags[id-1])
}

//page 6 - account data //////////////////////////////////////////////////////////////////////////////////////////////////////
account: object = [
  {
    username: this.thirdFormGroup.controls.username,
    password: this.thirdFormGroup.controls.password,
    email: this.thirdFormGroup.controls.email,
    medicalSpeciality: this.secondFormGroup.controls.medicalSpeciality,
    affiliatedhealthcare: this.secondFormGroup.controls.affiliatedHealthcare,
    firstname: this.fifthFormGroup.controls.firstname,
    lastname: this.fifthFormGroup.controls.lastname,
    suffix: this.fifthFormGroup.controls.suffix,
    birthdate: this.fifthFormGroup.controls.birthdate,
    location: this.fifthFormGroup.controls.location,
    phone: this.fifthFormGroup.controls.phone,
  }
]
isChanged: boolean = false
verify(){
  console.log(this.account)
  // console.log(this.secondFormGroup.controls.medicalSpeciality)
  // if(this.secondFormGroup.controls.medicalSpeciality && this.secondFormGroup.controls.affiliatedHealthcare){
  //   this.isChanged = true
  // } else {
  //   this.isChanged = false
  // }
}


}

