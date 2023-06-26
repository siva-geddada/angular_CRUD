import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    FormsModule,
    TableModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    BrowserModule,
    InputTextModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
