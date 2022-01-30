import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { LayoutHeaderSidebarContentsComponent } from './layout-header-sidebar-contents/layout-header-sidebar-contents.component';
import { LayoutHeaderContentsComponent } from './layout-header-contents/layout-header-contents.component';
import { LayoutContentsComponent } from './layout-contents/layout-contents.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CancelComponent } from './form/buttons/cancel/cancel.component';
import { AutofocusDirective } from '../directive/autofocus.directive';
import { SubmitComponent } from './form/buttons/submit/submit.component';
import { ClearComponent } from './form/buttons/clear/clear.component';
import { AlertDialogComponent } from './dialog/alert-dialog/alert-dialog.component';
import { NoticeDialogComponent } from './dialog/notice-dialog/notice-dialog.component';
import { CreateComponent } from './form/buttons/create/create.component';
import { DeleteComponent } from './form/buttons/delete/delete.component';
import { UpdateComponent } from './form/buttons/update/update.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutContentsComponent,
    LayoutHeaderContentsComponent,
    LayoutHeaderSidebarContentsComponent,
    CancelComponent,
    SubmitComponent,
    ClearComponent,
    AlertDialogComponent,
    NoticeDialogComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent,
    AutofocusDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LayoutContentsComponent,
    LayoutHeaderContentsComponent,
    LayoutHeaderSidebarContentsComponent,
    CancelComponent,
    SubmitComponent,
    ClearComponent,
    AlertDialogComponent,
    NoticeDialogComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent,
    AutofocusDirective,
  ],
  entryComponents: [
    AlertDialogComponent,
    NoticeDialogComponent,
  ]
})
export class LayoutModule { }
