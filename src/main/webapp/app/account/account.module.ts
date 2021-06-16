import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {AlertModule} from '../alert/alert.module';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        FlexModule,
        MatCardModule,
        AlertModule,
        MatDialogModule
    ],
    declarations: [
        LayoutComponent,
        LogInComponent,
        RegisterComponent,
    ],
    exports: [
        RegisterComponent
    ],
    entryComponents: [LogInComponent]
})
export class AccountModule { }
