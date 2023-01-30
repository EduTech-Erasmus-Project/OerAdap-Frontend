import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Pipe({
  name: "blobsanitizer",
})
export class BlobsanitizerPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  transform(value: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
}
