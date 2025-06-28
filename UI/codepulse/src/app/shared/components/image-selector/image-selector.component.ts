import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';

@Component({
  selector: 'app-image-selector',
  imports: [FormsModule, CommonModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit {

  private file? :File;
  fileName : string ='';
  title : string ='';
  images$? : Observable<BlogImage[]>
constructor(private blogImageService : ImageService){

}
  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event : Event): void{
      const element = event.currentTarget as HTMLInputElement;
      this.file = element.files?.[0];

  }
  uploadImage(): void{
    if(this.file && this.fileName !=="" && this.title !==""){
      this.blogImageService.uploadImage(this.file, this.fileName, this.title).subscribe({
        next : (response)=>{
            this.getImages();
        }
      })
    }
  }
  selectImage(img : BlogImage){
      this.blogImageService.selectImage(img);
  }

  private getImages(){
      this.images$= this.blogImageService.getAllImages();
  }
}
