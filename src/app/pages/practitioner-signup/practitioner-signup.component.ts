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
import { RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { UserInfo } from 'firebase/auth';
import { Router } from '@angular/router';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

export interface Account {
  // username: string;
  password: string;
  email: string;
  medicalSpeciality: string;
  affiliatedHealthcare: string;
  firstname: string;
  lastname: string;
  suffix: string;
  birthdate: string;
  location: string;
  phone: number;
  tags: object;
  terms: boolean;
}

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
    MatError,
    RouterLink
  ],
  templateUrl: './practitioner-signup.component.html',
  styleUrl: './practitioner-signup.component.css',
  
})

export class PractitionerSignupComponent{

  constructor(
    private _formBuilder: FormBuilder,
    private userService:UserService,
    private authService:AuthService,
    private router:Router
  ) {
}

firstFormGroup = this._formBuilder.group({
  firstCtrl: ['', Validators.required],
});
secondFormGroup = this._formBuilder.group({
  secondCtrl: ['', Validators.required],
});
thirdFormGroup = this._formBuilder.group({
  thirdCtrl: ['', Validators.required],
});
fourthFormGroup = this._formBuilder.group({
  fourthCtrl: ['', Validators.required],
});
fifthFormGroup = this._formBuilder.group({
  fifthCtrl: ['', Validators.required],
  location: new FormControl<string>(''),
});
sixthFormGroup = this._formBuilder.group({
  sixthCtrl: ['', Validators.required],
  // tags: new FormControl<object>([])
});
isLinear = false;

async ngOnInit() {
  this.secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  this.thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  }, { validator: this.passwordMatchValidator });
  this.fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });
  this.fifthFormGroup = this._formBuilder.group({
    fifthCtrl: ['', Validators.required],
    location: new FormControl<string>('', Validators.required),
  });
  this.sixthFormGroup = this._formBuilder.group({
    sixthCtrl: ['', Validators.required],
    // tags: new FormControl<object>([], Validators.required)
  });

  // this.locationOptions = this.fifthFormGroup.get('location')!.valueChanges.pipe(
  //   startWith(''),
  //   map(value => this._filterGroup(value || '')),
  // );
  // if(await this.authService.getProvider()){
  //   this.isAuthenticated = true
  // }

  this.provider = await this.authService.getProvider();
  if (this.provider) {
    this.isAuthenticated = true;
    const user = await this.authService.getUserData() as UserInfo | null;
  
    if (user && user.email) { 
      this.account.email = user.email;
    }
  }
  
  console.log(this.provider, this.isAuthenticated);
  
}

/////////////////////////////////////////////////////////////////////////////////////


// Now, define account as an object of type Account

medicalSpeciality: string = ''
affiliatedHealthcare: string = ''
// username: string = ''
email: string = ''
password: string = ''
confirmpassword: string = ''
firstname: string = ''
lastname: string = ''
suffix: string = ''
birthdate: string = ''
location: string = ''
phone: number = 0
terms: boolean = false
provider:string | undefined=""
isAuthenticated: boolean = false



// page 2//////////////////////////////////////////////////////////////////////////////////////////////////////
selectedMedicalSpecialityOption: string = ''
selectedAffiliatedHealthcareOption: string = ''

MedicalSpecialityOptions = [
  { value: "one", label: 'label one' },
  { value: "two", label: 'label two' }
];

AffiliatedHealthcareOptions = [
  { value: "one", label: 'ads' },
  { value: "two", label: 'asdas' }
];

isPage2Disabled = true

MedicalSpecialityOptionChange(){
  this.medicalSpeciality = this.selectedMedicalSpecialityOption
  this.account.medicalSpeciality = this.selectedMedicalSpecialityOption //value passed to account
  this.page2Validator()
  console.log(this.account)
}
AffiliatedHealthcareOptionChange(){
  this.affiliatedHealthcare = this.selectedAffiliatedHealthcareOption
  this.account.affiliatedHealthcare = this.selectedAffiliatedHealthcareOption
  this.page2Validator()
  console.log(this.account)
}

page2Validator(){
  this.isPage2Disabled = !(this.medicalSpeciality && this.affiliatedHealthcare)

} 


// page 3/////////////////////////////////////////////////////////////////////////////////////////////////////
isPage3Disabled = true
isEmailAvailable = false
// onUsernameChange(event: any) {
//   this.username = (event.target.value)
//   this.account.username = this.username
//   this.page3Validator()
//   console.log(this.account)
// }
async onEmailChange(event: any) {
  this.email = (event.target.value)
  this.account.email = this.email
  this.isEmailAvailable = await this.userService.isEmailAvailable(this.email)
  this.page3Validator()
  console.log(this.account)
}

passwordInput: string ="";
confirmPasswordInput: string ="";
isPasswordMatch =false;

onPasswordChange(event: any) {
  this.password = (event.target.value)
  this.passwordInput=event.target.value
  this.account.password = this.password
  this.page3Validator()
  console.log(this.account)
}

onConfirmPasswordChange(event: any) {
  this.confirmpassword = (event.target.value)
  this.confirmPasswordInput=event.target.value
  if(this.passwordInput === this.confirmPasswordInput){
    this.isPasswordMatch=true 
  }else{
      this.isPasswordMatch=false 
  }
  this.page3Validator()
  console.log(this.account)
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

page3Validator(){
  this.isPage3Disabled = !(
    this.email && 
    this.password.length >= 6 && 
    this.email.includes('@') && 
    this.email.includes('.') && 
    this.isPasswordMatch==true &&
    this.isEmailAvailable
  )
} 

//page 5 //////////////////////////////////////////////////////////////////////////////////////////////
isPage4Disabled = true

onFirstnameChange(event: any) {
  this.firstname = (event.target.value)
  this.account.firstname = this.firstname
  this.page4Validator()
  console.log(this.account)
}
onLastnameChange(event: any) {
  this.lastname = (event.target.value)
  this.account.lastname = this.lastname
  this.page4Validator()
  console.log(this.account)
}
onSuffixChange(event: any) {
  this.suffix = (event.target.value)
  this.account.suffix = this.suffix
  this.page4Validator()
  console.log(this.account)
}
onBirthdateChange() {
  this.account.birthdate = this.birthdate
  this.page4Validator()
  console.log(this.account)
}
onLocationChange() {
  this.account.location = this.location
  this.page4Validator()
  console.log(this.account)
}

numberInput: string = '';

  // isValidNumber(): boolean {
  //   return /^\d{11}$/.test(this.numberInput);
  // }

onPhoneChange(event: any){
  this.phone = (event.target.value)
  this.account.phone = this.phone
  this.page4Validator()
  console.log(this.account)
}

page4Validator(){
  this.isPage4Disabled = !(this.firstname && this.lastname && this.birthdate && this.location && this.phone)
} 

locations = [
  { id: 1, name: 'Abra' },
  { id: 2, name: 'Agusan del Norte' },
  { id: 3, name: 'Agusan del Sur' },
  { id: 4, name: 'Aklan' },
  { id: 5, name: 'Albay' },
  { id: 6, name: 'Antique' },
  { id: 7, name: 'Apayao' },
  { id: 8, name: 'Aurora' },
  { id: 9, name: 'Basilan' },
  { id: 10, name: 'Bataan' },
  { id: 11, name: 'Batanes' },
  { id: 12, name: 'Batangas' },
  { id: 13, name: 'Benguet' },
  { id: 14, name: 'Biliran' },
  { id: 15, name: 'Bohol' },
  { id: 16, name: 'Bukidnon' },
  { id: 17, name: 'Bulacan' },
  { id: 18, name: 'Cagayan' },
  { id: 19, name: 'Camarines Norte' },
  { id: 20, name: 'Camarines Sur' },
  { id: 21, name: 'Camiguin' },
  { id: 22, name: 'Capiz' },
  { id: 23, name: 'Catanduanes' },
  { id: 24, name: 'Cavite' },
  { id: 25, name: 'Cebu' },
  { id: 26, name: 'Compostela Valley' },
  { id: 27, name: 'Cotabato' },
  { id: 28, name: 'Davao del Norte' },
  { id: 29, name: 'Davao del Sur' },
  { id: 30, name: 'Davao Occidental' },
  { id: 31, name: 'Davao Oriental' },
  { id: 32, name: 'Dinagat Islands' },
  { id: 33, name: 'Eastern Samar' },
  { id: 34, name: 'Guimaras' },
  { id: 35, name: 'Ifugao' },
  { id: 36, name: 'Ilocos Norte' },
  { id: 37, name: 'Ilocos Sur' },
  { id: 38, name: 'Iloilo' },
  { id: 39, name: 'Isabela' },
  { id: 40, name: 'Kalinga' },
  { id: 41, name: 'La Union' },
  { id: 42, name: 'Laguna' },
  { id: 43, name: 'Lanao del Norte' },
  { id: 44, name: 'Lanao del Sur' },
  { id: 45, name: 'Leyte' },
  { id: 46, name: 'Maguindanao' },
  { id: 47, name: 'Marinduque' },
  { id: 48, name: 'Masbate' },
  { id: 49, name: 'Metro Manila' },
  { id: 50, name: 'Misamis Occidental' },
  { id: 51, name: 'Misamis Oriental' },
  { id: 52, name: 'Mountain Province' },
  { id: 53, name: 'Negros Occidental' },
  { id: 54, name: 'Negros Oriental' },
  { id: 55, name: 'Northern Samar' },
  { id: 56, name: 'Nueva Ecija' },
  { id: 57, name: 'Nueva Vizcaya' },
  { id: 58, name: 'Occidental Mindoro' },
  { id: 59, name: 'Oriental Mindoro' },
  { id: 60, name: 'Palawan' },
  { id: 61, name: 'Pampanga' },
  { id: 62, name: 'Pangasinan' },
  { id: 63, name: 'Quezon' },
  { id: 64, name: 'Quirino' },
  { id: 65, name: 'Rizal' },
  { id: 66, name: 'Romblon' },
  { id: 67, name: 'Samar' },
  { id: 68, name: 'Sarangani' },
  { id: 69, name: 'Siquijor' },
  { id: 70, name: 'Sorsogon' },
  { id: 71, name: 'South Cotabato' },
  { id: 72, name: 'Southern Leyte' },
  { id: 73, name: 'Sultan Kudarat' },
  { id: 74, name: 'Sulu' },
  { id: 75, name: 'Surigao del Norte' },
  { id: 76, name: 'Surigao del Sur' },
  { id: 77, name: 'Tarlac' },
  { id: 78, name: 'Tawi-Tawi' },
  { id: 79, name: 'Zambales' },
  { id: 80, name: 'Zamboanga del Norte' },
  { id: 81, name: 'Zamboanga del Sur' },
  { id: 82, name: 'Zamboanga Sibugay' }
];

//tags //////////////////////////////////////////////////////////////////////////////////////////////////////////////
tagsSelected: string[] = [];

selectedTags(id: number){
  this.tagOptions[id-1].isSelected = !this.tagOptions[id-1].isSelected
  // console.log(this.tags[id-1])
  if (this.tagOptions[id - 1].isSelected) {
    this.tagsSelected.push(this.tagOptions[id - 1].name);
  } else {
    const index = this.tagsSelected.indexOf(this.tagOptions[id - 1].name);
    if (index !== -1) {
      this.tagsSelected.splice(index, 1);
    }
  }
  this.page6Validator()
  console.log(this.account)
}
isPage6Disabled = true
page6Validator(){
  console.log(this.tagsSelected.length)
//   if(this.tagsSelected.length > 0){
//     this.isPage6Disabled = false
//   }
this.isPage6Disabled = !(this.tagsSelected.length > 0 )
}

tagOptions: any[] = [
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



//page 7 terms //////////////////////////////////////////////////////////////////////////////////////////////////////

isTermsChecked(){
  this.terms=!this.terms;
  this.account.terms=this.terms;
  this.page7Validator()
  console.log(this.account)
  this.page7Validator()
}

isPage7Disabled = true

page7Validator(){
  this.isPage7Disabled = !(this.firstname && this.lastname && this.birthdate && this.location && this.phone)
} 

// ACCOUNT DATA //////////////////////////////
account: Account = {
  // username: this.username,
  password: this.password,
  email: this.email,
  medicalSpeciality: this.medicalSpeciality,
  affiliatedHealthcare: this.affiliatedHealthcare,
  firstname: this.firstname,
  lastname: this.lastname,
  suffix: this.suffix,
  birthdate: this.birthdate,
  location: this.location,
  phone: this.phone,
  tags: this.tagsSelected,
  terms: this.terms,
};

async signUp(){
  try{
    if(!this.isAuthenticated){
      await this.authService.signUpWithEmail(this.email,this.password)
      await this.userService.addNewPractitioner(this.account)
      this.provider = await this.authService.getProvider()
      this.isAuthenticated = this.provider ? true : false
      await this.authService.verifyEmail()

      // setInterval(async ()=>{
      //   console.log(await this.authService.getUserData())
      // },1000)
    }else{
      await this.userService.addNewPractitioner(this.account)
      this.router.navigate(["/feed"])
    }
  }catch(err){
    console.log(err)
  }
}
}

