import { Component, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent {
  public currentUser: User;
  public listUsers: User[];
  isAdmin: boolean;
  deleteUserForm: FormGroup;
  message: string;
  messageClass: string;


  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private modalService: NgbModal
  ) {

  }



  openModal(targetModal, user) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.deleteUserForm.patchValue({
      id: user.id,
    });
  }

  onSubmitDeleteUser() {
    this.modalService.dismissAll();
    console.log(this.deleteUserForm.getRawValue());
    this.AuthService.deleteUser(this.deleteUserForm.getRawValue().id).subscribe(data => {
      this.listUsers = this.AuthService.getListUsers();
      this.message = "The user has been deleted successfully";
      this.messageClass = "success";
    }, error => {
        this.message = "There was an error while deleting the user";
        this.messageClass = "danger";
    })
  }

  ngOnInit() {
    this.AuthService.getUserData()
      .subscribe(x => {
        this.currentUser = x.value;
        this.isAdmin = this.currentUser.role == "admin" ? true : false;
        if (this.isAdmin) 
          this.listUsers = this.AuthService.getListUsers();
      });

    this.deleteUserForm = this.fb.group({
      id: [''],
    });
  }
}

