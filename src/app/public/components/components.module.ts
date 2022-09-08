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
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OaMetadataComponent } from './oa-metadata/oa-metadata.component';

import {CardModule} from 'primeng/card';
import { EditTranscriptComponent } from './edit-transcript/edit-transcript.component';


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
    OaMetadataComponent,
    EditTranscriptComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgxDropzoneModule,
    NgAudioRecorderModule,
    FormsModule,
    CKEditorModule,
    CardModule,
  ],
  exports: [
    FileUploadComponent,
    WebviewComponent,
    OaInfoComponent,
    AudioComponent,
    ImageComponent,
    VideoComponent,
    ParagraphComponent,
    OaMetadataComponent,
    CardModule
  ],
})
export class ComponentsModule {}
