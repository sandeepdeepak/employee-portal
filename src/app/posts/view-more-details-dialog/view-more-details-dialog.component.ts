import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-view-more-details-dialog",
  templateUrl: "./view-more-details-dialog.component.html",
  styleUrls: ["./view-more-details-dialog.component.css"],
})
export class ViewMoreDetailsDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewMoreDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
  }
}
