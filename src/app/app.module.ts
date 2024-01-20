import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViviendasComponentComponent } from './viviendas-component/viviendas-component.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

const appRoutes:Routes=[

  {path:'login',component:LoginComponent,  pathMatch: 'full'},
  {path:'viviendas',component:ViviendasComponentComponent, pathMatch: 'full'},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a /login si la ruta está vacía
  { path: '**', redirectTo: '/login' } // Redirigir a /login para rutas no coincidentes

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViviendasComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
