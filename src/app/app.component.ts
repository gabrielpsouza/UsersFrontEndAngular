import { Component } from '@angular/core';
import { ServiceService } from "./services/service.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UsersFrontEnd';
  
  constructor(private service : ServiceService) { }
  data: any;
  UserForm: FormGroup;
  submitted = false;
  EventValue: any = "Save";
  
  ngOnInit(): void {
    this.getData();

    this.UserForm = new FormGroup({
      userId: new FormControl(null),
      userName: new FormControl("", [Validators.required]),
      userLastName: new FormControl("", Validators.required),
      userAge: new FormControl("", Validators.required),
    })
  }

  getData() {
    this.service.get().subscribe((data: any[]) => { 
      console.log(data);
      this.data = data;
    })
  }

  deleteData(id) {
    this.service.delete(id).subscribe((data: any[]) => {
      this.data = data;
      this.getData();
    })
  }

  Save() {
    this.submitted = true;

    if (this.UserForm.invalid) {
      return;
    }
    console.log(this.UserForm.value);

    this.service.post(this.UserForm.value).subscribe((data: any) => {
      this.data = data;
      this.resetForm();
    })
  }

  Update() {
    this.submitted = true;

    if (this.UserForm.invalid) {
      return;
    }    
    this.service.put(this.UserForm.value.userId, this.UserForm.value).subscribe((data: any[]) => {
      this.data = data;
      this.resetForm();
    })
  }

  editData(data) {
    this.UserForm.controls["userId"].setValue(data.userId);
    this.UserForm.controls["userName"].setValue(data.userName);
    this.UserForm.controls["userLastName"].setValue(data.userLastName);
    this.UserForm.controls["userAge"].setValue(data.userAge);
    this.EventValue = "Update";
  }

  resetForm() {
    this.getData();
    this.UserForm.reset();
    this.EventValue = "Save";
    this.submitted = false;
  }
}