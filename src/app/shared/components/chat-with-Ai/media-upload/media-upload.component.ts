import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { InputIconModule } from 'primeng/inputicon';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'sibyl-media-upload',
    templateUrl: './media-upload.component.html',
    imports: [CardModule,
        DividerModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputIconModule,
        BadgeModule,
        InputTextModule,
        ProgressSpinnerModule,
        FileUploadModule],
    styleUrls: ['./media-upload.component.scss'],
    standalone: true,
    providers: [DialogService]
})

export class MediaUploadComponent {

    @Input() selectedImage!: any;

    public images = [
        { src: './assets/images/Dummy1.png', selected: false },
        { src: './assets/images/Dummy2.png', selected: false },
        { src: './assets/images/Dummy3.png', selected: false },
        { src: './assets/images/Dummy1.png', selected: false },
        { src: './assets/images/Dummy2.png', selected: false },
        { src: './assets/images/Dummy3.png', selected: false },
        { src: './assets/images/Dummy1.png', selected: false },
        { src: './assets/images/Dummy2.png', selected: false },
        { src: './assets/images/Dummy3.png', selected: false },
        { src: './assets/images/Dummy1.png', selected: false },
        { src: './assets/images/Dummy2.png', selected: false },
        { src: './assets/images/Dummy3.png', selected: false },
        { src: './assets/images/Dummy1.png', selected: false },
        { src: './assets/images/Dummy2.png', selected: false },
        { src: './assets/images/Dummy3.png', selected: false },
        { src: './assets/images/Dummy1.png', selected: false },
        { src: './assets/images/Dummy2.png', selected: false },
        { src: './assets/images/Dummy3.png', selected: false }
    ];

    constructor() { }

    public selectImage(selectedImage: any): void {
        this.images.forEach(image => image.selected = false);
        selectedImage.selected = true;
        console.log('selectedImage', selectedImage);
    }

    public uploadSelectedImage(): void {
        const selectedImage = this.images.find(image => image.selected);
        console.log('selectedImage', selectedImage)
        this.selectedImage = selectedImage;
        // if (selectedImage) {
        //   this.ref.close(selectedImage.src); // Pass selected image URL back to parent
        // }
    }
}