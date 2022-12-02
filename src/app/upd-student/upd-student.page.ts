import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-upd-student',
  templateUrl: './upd-student.page.html',
  styleUrls: ['./upd-student.page.scss'],
})
export class UpdStudentPage implements OnInit {

  public student:Student;
  public validationMessages:Object;
  public myForm:FormGroup;

  constructor(private studentService:StudentService, private fb:FormBuilder, private toastController: ToastController, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      //this.student = this.studentService.getStudentByControlNumber(params.cn);
      this.studentService.getStudentById(params.id).subscribe(item =>{
        this.student = item as Student;
        this.student.id = params.id;
        this.myForm.controls['name'].setValue(this.student.name);
        this.myForm.controls['curp'].setValue(this.student.curp);
        this.myForm.controls['age'].setValue(this.student.age);
        this.myForm.controls['nip'].setValue(this.student.nip);
        this.myForm.controls['email'].setValue(this.student.email);
        this.myForm.controls['career'].setValue(this.student.career);
        this.myForm.controls['photo'].setValue(this.student.photo);
      });
    });

    this.myForm = this.fb.group({
      controlnumber:["", Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern('^[0-9]+$')])],
      name:["", Validators.compose([Validators.required])],
      curp:["", Validators.compose([Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern('^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$')])],
      age:["", Validators.compose([Validators.required, Validators.min(17), Validators.max(99)])],
      nip:["", Validators.compose([Validators.required, Validators.min(10), Validators.max(9999)])],
      email:["", Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')])],
      career:["", Validators.compose([Validators.required])],
      photo:["", Validators.compose([Validators.required, Validators.pattern(/https?:\/\/[\w\-\.]+\.\w{2,5}\/?\S*/)])]

    });

    this.validationMessages = {
      controlnumber: [
        {type: 'required', message: "Número de control obligatorio"},
        {type: 'minlength', message: "El número de control debe ser de 8 dígitos"},
        {type: 'maxlength', message: "El número de control debe ser de 8 dígitos"},
        {type: 'pattern', message: "El número de control está mal formado"}
      ],
      name: [
        {type: 'required', message: "Nombre requerido"}
      ],
      curp: [
        {type: 'required', message: "CURP obligatorio"},
        {type: 'minlength', message: "El CURP debe ser de 17 dígitos"},
        {type: 'maxlength', message: "El CURP debe ser de 17 dígitos"},
        {type: 'pattern', message: "El CURP está mal formado"}
      ],
      age: [
        {type: 'required', message: "Edad obligatorio"},
        {type: 'min', message: "Debes ser mayor a 16 años"},
        {type: 'max', message: "No puedes ingresar una edad +99"}
      ],
      nip: [
        {type: 'required', message: "NIP obligatorio"},
        {type: 'min', message: "NIP debe ser mayor a 9"},
        {type: 'max', message: "NIP debe ser menor a 10000"}
      ],
      email: [
        {type: 'required', message: "Email obligatorio"},
        {type: 'pattern', message: "Ingresa un correo valido"}
      ],
      photo: [
        {type: 'required', message: "Photo (URL) obligatorio"},
        {type: 'pattern', message: "Ingresa una URL valida"}
      ],
      career: [
        {type: 'required', message: "Carrera requerido"}
      ]
    }
    this.myForm.controls['controlnumber'].disable();
  }

  public async updateStudent(student:Student){
    // console.log(student.name);
    // console.log(student.id);
    if(this.studentService.updateStudent(student, this.student.id) != null){
      this.presentToast('bottom','Estudiante modificado');
    }else{
      this.presentToast('bottom','ERROR');
    }
    this.router.navigate([".."]);
  }

  public updStudent(data):void{
    this.student = data;
    this.student.controlnumber = this.myForm.get('controlnumber').value;
    // this.studentService.students[indice] = {
    //   controlnumber: this.student.controlnumber,
    //   age: this.student.age,
    //   career: this.student.career,
    //   curp: this.student.curp,
    //   email: this.student.email,
    //   name: this.student.name,
    //   nip: this.student.nip,
    //   photo: this.student.photo
    // };
    this.presentToast('bottom','Estudiante modificado');
    this.router.navigate(['/home']);
  }

  // public searchStudent(cn:string):void{
  //   this.studentService.getStudentByCn(cn).subscribe(item =>{
  //     this.student = item as Student;
  //   });
  //   if((this.student = this.studentService.getStudentByCn(cn)) != null){
  //     this.myForm.controls['name'].setValue(this.student.name);
  //     this.myForm.controls['curp'].setValue(this.student.curp);
  //     this.myForm.controls['age'].setValue(this.student.age);
  //     this.myForm.controls['nip'].setValue(this.student.nip);
  //     this.myForm.controls['email'].setValue(this.student.email);
  //     this.myForm.controls['career'].setValue(this.student.career);
  //     this.myForm.controls['photo'].setValue(this.student.photo);
  //     this.myForm.controls['name'].enable();
  //     this.myForm.controls['curp'].enable();
  //     this.myForm.controls['age'].enable();
  //     this.myForm.controls['nip'].enable();
  //     this.myForm.controls['email'].enable();
  //     this.myForm.controls['photo'].enable();
  //     this.myForm.controls['career'].enable();
  //     this.presentToast('bottom','Estudiante encontrado');
  //     this.myForm.controls['controlnumber'].disable();
  //   }else{
  //     this.presentToast('bottom','Estudiante no encontrado');
  //   }
  // }

  async presentToast(position: 'top' | 'middle' | 'bottom', msj:string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1500,
      position: position
    });

    await toast.present();
  }

}

