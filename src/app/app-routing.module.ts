import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAdminGuard } from './guards/is-admin.guard';
import { isConnectedGuard } from './guards/is-connected.guard';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  {path:"home", component: HomeComponent}, 
  {path:"dashboard", component: DashboardComponent, canActivate: [isConnectedGuard]}, 
  {path:"admin", component: AdminComponent, canActivate: [isConnectedGuard, isAdminGuard]}, 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
