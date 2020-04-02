import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'Alex';
  formGroup: FormGroup;
  images: any;
  imagePreview: any;

  constructor(private http: HttpClient,
              private form: FormBuilder) {
  }

  public ngOnInit(): void {
   this.formGroup = new FormGroup({
     images : new FormControl(null, {validators: [Validators.required]})
   });
  }

  public selectImage(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.images = file;
    }
  }

    public onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.images);

    this.http.post<any>('http://localhost:3000/file', formData)
      .subscribe(
        (res) => console.log('result ' + res),
        (err) => console.log(err)
      );
    alert('Upload with successfully!');
  }
}
