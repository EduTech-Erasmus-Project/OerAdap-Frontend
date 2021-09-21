import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicRoutingModule } from './public/public-routing.module';

const routes: Routes = [
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PublicRoutingModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
