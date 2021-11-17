import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { ReactiveFormsModule } from "@angular/forms";
import { WebviewComponent } from "./webview/webview.component";
import { OaInfoComponent } from "./oa-info/oa-info.component";
import { AudioComponent } from "./audio/audio.component";
import { ImageComponent } from "./image/image.component";
import { VideoComponent } from "./video/video.component";
import { ParagraphComponent } from "./paragraph/paragraph.component";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { NgxDropzoneModule } from "ngx-dropzone";
import { NgAudioRecorderModule } from "ng-audio-recorder";
import { IframeComponent } from './iframe/iframe.component';
@NgModule({
  declarations: [
    FileUploadComponent,
    WebviewComponent,
    OaInfoComponent,
    AudioComponent,
    ImageComponent,
    VideoComponent,
    ParagraphComponent,
    IframeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgxDropzoneModule,
    NgAudioRecorderModule,
  ],
  exports: [
    FileUploadComponent,
    WebviewComponent,
    OaInfoComponent,
    AudioComponent,
    ImageComponent,
    VideoComponent,
    ParagraphComponent,
  ],
})
export class ComponentsModule {}
