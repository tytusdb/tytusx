import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Modulos propios
import { AstComponent } from './Components/ast/ast.component';
import { EditorComponent } from './Components/editor/editor.component';
import { ToolbarComponent } from './Components/toolbar/toolbar.component';
import { FooterComponent } from './Components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    AstComponent,
    ToolbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CodemirrorModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
