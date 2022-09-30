import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SpyDirective, SpyTargetContainerDirective, SpyTargetDirective } from 'ngx-scroll-spy';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpyDirective,
    SpyTargetDirective,
    SpyTargetContainerDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
