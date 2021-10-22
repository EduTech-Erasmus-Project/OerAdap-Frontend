import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParagraphContentComponent } from './paragraph-content/paragraph-content.component';
import { ImageContentComponent } from './image-content/image-content.component';
import { AudioContentComponent } from './audio-content/audio-content.component';
import { VideoContentComponent } from './video-content/video-content.component';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    ParagraphContentComponent,
    ImageContentComponent,
    AudioContentComponent,
    VideoContentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule
  ],
  exports:[
    ParagraphContentComponent,
    ImageContentComponent,
    AudioContentComponent,
    VideoContentComponent
  ]
})
export class ContainersModule { }
