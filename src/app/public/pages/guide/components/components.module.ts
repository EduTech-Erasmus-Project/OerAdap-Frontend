import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction/introduction.component';
import { UploadComponent } from './upload/upload.component';
import { AudioComponent } from './audio/audio.component';
import { ImageComponent } from './image/image.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { VideoComponent } from './video/video.component';
import { TourComponent } from './tour/tour.component';
import { RouterModule } from '@angular/router';
import { DownloadComponent } from './download/download.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IntroductionComponent,
    UploadComponent,
    AudioComponent,
    ImageComponent,
    ParagraphComponent,
    VideoComponent,
    TourComponent,
    DownloadComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class ComponentsModule { }
