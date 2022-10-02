import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SpyDirective, SpyTargetDirective, SpyTargetContainerDirective } from '@thejlifex/ngx-scroll-spy';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleWithListGroupComponent } from './example-with-list-group/example-with-list-group.component';
import { ExampleWithNavbarAndSidebarComponent } from './example-with-navbar-and-sidebar/example-with-navbar-and-sidebar.component';
import { ExampleWithNavbarComponent } from './example-with-navbar/example-with-navbar.component';
import { ExampleWithNestedListGroupComponent } from './example-with-nested-list-group/example-with-nested-list-group.component';
import { LoremIpsumPipe } from './lorem-ipsum.pipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpyDirective,
    SpyTargetDirective,
    SpyTargetContainerDirective,
    LoremIpsumPipe,
    ExampleWithNavbarComponent,
    ExampleWithNavbarAndSidebarComponent,
    ExampleWithListGroupComponent,
    ExampleWithNestedListGroupComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
