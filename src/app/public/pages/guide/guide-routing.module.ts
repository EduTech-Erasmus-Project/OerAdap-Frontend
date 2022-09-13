import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AudioComponent } from "./components/audio/audio.component";
import { DownloadComponent } from "./components/download/download.component";
import { ImageComponent } from "./components/image/image.component";
import { IntroductionComponent } from "./components/introduction/introduction.component";
import { ParagraphComponent } from "./components/paragraph/paragraph.component";
import { TourComponent } from "./components/tour/tour.component";
import { UploadComponent } from "./components/upload/upload.component";
import { VideoComponent } from "./components/video/video.component";

import { GuideComponent } from "./guide.component";

const routes: Routes = [
  {
    path: "",
    component: GuideComponent,
    data: {
      breadcrumb: null,
    },
    children: [
      { path: "", redirectTo: "introduction", pathMatch: "full" },
      {
        path: "introduction",
        component: IntroductionComponent,
        data: {
          breadcrumb: "Introducción",
        },
      },
      {
        path: "upload",
        component: UploadComponent,
        data: {
          breadcrumb: "Cargar Archivo",
        },
      },
      {
        path: "tour",
        component: TourComponent,
        data: {
          breadcrumb: "Área de trabajo",
        },
      },
      {
        path: "audio",
        component: AudioComponent,
        data: {
          breadcrumb: "Adaptación de audios",
        },
      },
      {
        path: "image",
        component: ImageComponent,
        data: {
          breadcrumb: "Adaptación de imágenes",
        },
      },
      {
        path: "paragraph",
        component: ParagraphComponent,
        data: {
          breadcrumb: "Adaptación de Párrafos",
        },
      },
      {
        path: "video",
        component: VideoComponent,
        data: {
          breadcrumb: "Adaptación de Videos",
        },
      },
      {
        path: "download",
        component: DownloadComponent,
        data: {
          breadcrumb: "Descargar",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuideRoutingModule {}
