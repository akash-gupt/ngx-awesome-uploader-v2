import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { UploaderCaptions } from "projects/file-picker/src/public_api";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";
import { FilePickerComponent } from "../../../projects/file-picker/src/lib/file-picker.component";
import { FilePreviewModel } from "../../../projects/file-picker/src/lib/file-preview.model";
import { ValidationError } from "../../../projects/file-picker/src/lib/validation-error.model";
import { DemoFilePickerAdapter } from "./demo-file-picker.adapter";

@Component({
  selector: "demo-file-picker",
  templateUrl: "./demo-file-picker.component.html",
  styleUrls: ["./demo-file-picker.component.scss"]
})
export class DemoFilePickerComponent implements OnInit {
  @ViewChild("uploader", { static: true }) uploader: FilePickerComponent;
  adapter = new DemoFilePickerAdapter(this.http);
  myFiles: FilePreviewModel[] = [];
  captions: UploaderCaptions = {
    dropzone: {
      title: "Fayllari bura ata bilersiz",
      or: "və yaxud",
      browse: "Fayl seçin"
    },
    cropper: {
      crop: "Kəs",
      cancel: "Imtina"
    },
    previewCard: {
      remove: "Sil",
      uploadError: "Fayl yüklənmədi"
    }
  };
  constructor(private http: HttpClient) {}

  ngOnInit() {}
  onValidationError(e: ValidationError) {
    console.log(e);
  }
  onUploadSuccess(e: FilePreviewModel) {
    // console.log(e);
    // console.log(this.myFiles)
  }
  onRemoveSuccess(e: FilePreviewModel) {
    console.log(e);
  }
  onFileAdded(file: FilePreviewModel) {
    this.myFiles.push(file);
  }
  removeFile() {
    this.uploader.removeFileFromList(this.myFiles[0]);
  }
  myCustomValidator(file: File): Observable<boolean> {
    console.log(file.name.length);
    if (!file.name.includes("uploader")) {
      return of(true).pipe(delay(2000));
    }
    if (file.size > 50) {
      return this.http
        .get("https://vugar.free.beeceptor.com")
        .pipe(map(res => res === "OK"));
    }
    return of(false).pipe(delay(2000));
  }
}
