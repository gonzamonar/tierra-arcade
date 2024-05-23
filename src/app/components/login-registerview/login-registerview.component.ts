import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { SessionService } from '../../services/session.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IceclimberComponent } from '../iceclimber/iceclimber.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AvatarSelectorComponent } from '../avatar-selector/avatar-selector.component';
import { AvatarCardComponent } from '../avatar-card/avatar-card.component';

@Component({
  selector: 'app-login-registerview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IceclimberComponent,
    AvatarSelectorComponent,
    AvatarCardComponent
  ],
  templateUrl: './login-registerview.component.html',
  styleUrl: './login-registerview.component.css'
})


export class LoginRegisterviewComponent implements OnInit {
  ASSETS_DIR: string = '../assets/images/register-form';
  PROFILE_DIR: string = '../assets/images/profile';

  typelist: string[] = ['', 'acero', 'agua', 'bicho', 'dragón', 'eléctrico', 'fantasma', 'fuego', 'hada',
  'hielo', 'lucha', 'normal', 'planta', 'psíquico', 'roca', 'siniestro', 'tierra', 'veneno', 'volador'];
  hogwards: string[] = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];

  imgtype1: string = this.PROFILE_DIR + "/tipos/none.png";
  imgtype2: string = this.PROFILE_DIR + "/tipos/none.png";

  errorEmailUsed: boolean = false;
  errorEmailInvalid: boolean = false;
  errorPwdInvalid: boolean = false;
  genericError: boolean = false;
  customError: string = '';
  avatarSrc: string = 'mr_game_and_watch';
  avatarView: boolean = false;

  constructor(
    public auth: Auth, 
    private firestore: Firestore, 
    public session: SessionService,
    private router: Router
  ) {  }

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      gender: new FormControl(null, [Validators.required]),
      type1: new FormControl('', [Validators.required]),
      type2: new FormControl('', [Validators.required]),
      house: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      pwd: new FormControl(null, [Validators.required, Validators.minLength(6)]),

      likesGender: new FormControl(false),
      likesPokemon: new FormControl(false),
      likesHarryPotter: new FormControl(false),
      climberColor: new FormControl("#5fbc2c"),
    })

    this.onCheckBoxChange("likesGender", "gender");
    this.onCheckBoxChange("likesPokemon", "type1");
    this.onCheckBoxChange("likesPokemon", "type2");
    this.onCheckBoxChange("likesHarryPotter", "house");
  }

  private onCheckBoxChange(checkbox: string, control: string): void {
    this.registerForm.get(checkbox)!.valueChanges.subscribe(value => {
      const formControl = this.registerForm.get(control);

      if(formControl){
        const validators = [Validators.required];
     
        if (value === true) {
          formControl.clearValidators();
          formControl.setValue(null);
        } else {
          formControl.setValidators(validators);
        }
        formControl.updateValueAndValidity();
      }
    });
  }

  openAvatarSelector(){
    this.avatarView = this.avatarView ? false : true ;
  }

  switchView(viewStatus: boolean) {
    this.avatarView = viewStatus;
  }

  updateAvatar(avatarSrc: string) {
    if (avatarSrc != ''){
      this.avatarSrc = avatarSrc;
    }
  }

  changeType1(){
    let selectedType1 = this.registerForm.controls['type1'].value;
    let option = (selectedType1 == '') ? 'none' : selectedType1;
    this.imgtype1 = this.PROFILE_DIR + "/tipos/" + option + ".png";
  }

  changeType2(){
    let selectedType2 = this.registerForm.controls['type2'].value;
    let option = (selectedType2 == '') ? 'none' : selectedType2;
    this.imgtype2 = this.PROFILE_DIR + "/tipos/" + option + ".png";
  }
  
  OnFormSubmitted(){
    this.errorEmailUsed = false;
    this.errorEmailInvalid = false;
    this.errorPwdInvalid = false;
    this.genericError = false;
    this.customError = '';

    let username: string = this.registerForm.get("username")?.value;
    let gender: string = this.registerForm.get("gender")?.value;
    let type1: string = this.registerForm.get("type1")?.value;
    let type2: string = this.registerForm.get("type2")?.value;
    let house: string = this.registerForm.get("house")?.value;
    let email: string = this.registerForm.get("email")?.value;
    let pwd: string = this.registerForm.get("pwd")?.value;
    let likesGender: boolean = this.registerForm.get("likesGender")?.value;
    let likesPokemon: boolean = this.registerForm.get("likesPokemon")?.value;
    let likesHarryPotter: boolean = this.registerForm.get("likesHarryPotter")?.value;

    gender = likesGender ? '' : gender ;
    type1 = likesPokemon ? '' : type1 ;
    type2 = likesPokemon ? '' : type2 ;
    house = likesHarryPotter ? '' : house ;

    this.Register(email, pwd, username, this.avatarSrc, gender, type1, type2, house);
  }

  
  Register(email: string, pwd: string, username: string, avatar: string,
          gender: string, type1: string, type2: string, house: string) {
    createUserWithEmailAndPassword(this.auth, email, pwd)
    .then((response) => {
      if(response.user.email !== null) {
        email = response.user.email;

        let loginsCollection = collection(this.firestore, 'logins');
        addDoc(loginsCollection, {fecha: new Date(), 'user': email});

        let userDataCollection = collection(this.firestore, 'userdata');
        addDoc(userDataCollection, {
          'email': email,
          'username': username,
          'avatar': avatar,
          'gender': gender,
          'pkmntype1': type1,
          'pkmntype2': type2,
          'hphouse': house,
        }).then(() => {
          this.session.updateSession(email);
          this.router.navigate(['/home']);
        });
      }
    }).catch((e) => {
      if (e.code == "auth/email-already-in-use" ||
        e.code == "auth/email-already-exists") {
          this.errorEmailUsed = true;
      } else if (e.code.includes("email")) {
        this.errorEmailInvalid = true;
      } else if (e.code.includes("password")){
        this.errorPwdInvalid = true;
      } else {
        this.genericError = true;
        this.customError = e.code;
      }
    });
  }
}

