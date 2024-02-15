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
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
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
    numericInput: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    verification: new FormControl<number>(0),
  });
  fifthFormGroup = this._formBuilder.group({
    fifthCtrl: ['', Validators.required],
  });
  sixthFormGroup = this._formBuilder.group({
    sixthCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {
    
  }

  // page 2

  MedicalSpecialityoptions = [
    { value: "one", label: 'First option' },
    { value: "two", label: 'Second option' }
  ];
  
  Affiliatedoptions = [
    { value: "one", label: 'ads' },
    { value: "two", label: 'asdas' }
  ];


  // page 3
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

  

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // location picker
  stateForm = this._formBuilder.group({
    stateGroup: '',
  });

  stateGroups: StateGroup[] = [
    {
      letter: 'A',
      names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas'],
    },
    {
      letter: 'C',
      names: ['California', 'Colorado', 'Connecticut'],
    },
    {
      letter: 'D',
      names: ['Delaware'],
    },
    {
      letter: 'F',
      names: ['Florida'],
    },
    {
      letter: 'G',
      names: ['Georgia'],
    },
    {
      letter: 'H',
      names: ['Hawaii'],
    },
    {
      letter: 'I',
      names: ['Idaho', 'Illinois', 'Indiana', 'Iowa'],
    },
    {
      letter: 'K',
      names: ['Kansas', 'Kentucky'],
    },
    {
      letter: 'L',
      names: ['Louisiana'],
    },
    {
      letter: 'M',
      names: [
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
      ],
    },
    {
      letter: 'N',
      names: [
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
      ],
    },
    {
      letter: 'O',
      names: ['Ohio', 'Oklahoma', 'Oregon'],
    },
    {
      letter: 'P',
      names: ['Pennsylvania'],
    },
    {
      letter: 'R',
      names: ['Rhode Island'],
    },
    {
      letter: 'S',
      names: ['South Carolina', 'South Dakota'],
    },
    {
      letter: 'T',
      names: ['Tennessee', 'Texas'],
    },
    {
      letter: 'U',
      names: ['Utah'],
    },
    {
      letter: 'V',
      names: ['Vermont', 'Virginia'],
    },
    {
      letter: 'W',
      names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    },
  ];

  stateGroupOptions!: Observable<StateGroup[]>;

  ngOnInit() {
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      username: new FormControl<string>(''),
      email: new FormControl<string>(''),
      password: new FormControl<string>('', Validators.required),
      confirmPassword: new FormControl<string>('', Validators.required),
    }, { validator: this.passwordMatchValidator });

    this.thirdFormGroup.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.thirdFormGroup.updateValueAndValidity(); // Update validity of the form group
    });

    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
      numericInput: ['', [Validators.required, Validators.pattern('[0-9]')]],
      verification: new FormControl<number>(0, Validators.required),
    });
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
  

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

//tags ////////////////////////////////////////////////////////

}

