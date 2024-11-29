import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'footer',
    standalone: true,
    imports: [ButtonModule],
    template: `
        <div class="flex w-full justify-content-end mt-3">
            <p-button type="button" label="Upload" icon="pi pi-upload" class="chat-run-analysis" (onClick)="uploadMedia()" />
        </div> `
})
export class Footer {

    constructor(public ref: DynamicDialogRef) { }

    public uploadMedia(): void {
        // Pass back the selected image from MediaUploadComponent
        // if (this.ref && this.ref.config.data && this.ref.config.data.selectedImage) {
        //     this.ref.close(this.ref.config.data.selectedImage.src);
        // } else {
        //     console.log("No image selected");
        // }
    }
}