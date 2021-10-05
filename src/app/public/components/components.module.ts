import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [FileUploadComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [FileUploadComponent],
})
export class ComponentsModule {}
