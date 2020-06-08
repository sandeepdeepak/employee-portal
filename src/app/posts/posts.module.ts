import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";
import { AngularMaterialModule } from "../angular-material.module";
import { ViewMoreDetailsDialogComponent } from "./view-more-details-dialog/view-more-details-dialog.component";

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    ViewMoreDetailsDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
  ],
  entryComponents: [ViewMoreDetailsDialogComponent],
})
export class PostsModule {}
