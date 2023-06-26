import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { map, Subscription } from 'rxjs';
import { Users } from './model/user-model';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  usersData: Users[] = [];
  modelTitle: string = 'Add NewUser';
  btnLabel: string = 'SaveUser';
  display: boolean = false;
  userForm!: FormGroup;
  subscriptions!: Subscription;
  hidePasswordField: boolean = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) { }
  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      password: [''],
      email: [''],
      phone: [''],
    });
    this.getAllUsers();
    this.subscriptions = this.userService.refresh$.subscribe(() => {
      this.getAllUsers();
    });
    if (this.userForm.touched) {
      this.userForm
    }
  }
  showMes(severity: string, summary: string, detail: any) {
    this.messageService.clear();
    this.messageService.add({ severity: `${severity}`, summary: `${summary}`, detail: `${detail}` });
  }
  getAllUsers() {
    this.userService
      .getAllUsers()
      .pipe(
        map((users: any) => users.map((user: any) => {        
          return { firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, id: user._id }
        }))
      )
      .subscribe((data: any) => {
        this.usersData = [...data]
        
      });
  }
    editUser(id: any) {
      this.hidePasswordField = false;
      this.userService.editUser(id).pipe().subscribe((data: any) => {
        this.modelTitle = 'Updating User'
        this.btnLabel = 'UpdateUser';
        this.display = true;
        this.uForm['firstName'].setValue(data.firstName);
        this.uForm['lastName'].setValue(data.lastName);
        this.uForm['email'].setValue(data.email);
        this.uForm['phone'].setValue(data.phone);
        console.log(this.userForm);
        
      });
    }
  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe((data: any) => {
      this.showMes('warn', 'ServiceMessage', data.message)
      this.getAllUsers();
    }, (err) => {
      this.showMes('error', 'ServiceMessage', err.message);
    }
    );
  }
  showDialog() {
    this.modelTitle = 'ADD NewUser'
    this.btnLabel = 'SaveUser';
    this.display = true;
  }
  get uForm(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
  cancel() {
    this.showMes('info', 'ServiceMessage', 'User update cancelled');
    this.display = false;
    this.resetForm();
    this.hidePasswordField = true;
  }
  resetForm() {
    this.uForm['firstName'].setValue('');
    this.uForm['lastName'].setValue('');
    this.uForm['email'].setValue('');
    this.uForm['phone'].setValue('');
    this.uForm['password'].setValue('');
  }
  saveUser() {
    if (
      !(
        this.uForm['firstName'].value&&
        this.uForm['lastName'].value&&
        this.uForm['password'].value&&
        this.uForm['email'].value&&
        this.uForm['phone'].value
      )
    ) {
      return;
    } else {
      
      this.userService.addNewUser(this.userForm.value).subscribe((data: any) => {
        this.showMes('success', 'ServiceMessage', data.message);
        this.resetForm();
        this.display = false;
        // this.getAllUsers();
      }, (err) => {
        this.showMes('error', 'ServiceMessage', err.message);
      }
      )
    }
  }
}
