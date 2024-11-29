import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipsModule } from 'primeng/chips';
import * as moment from 'moment-timezone';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { PrimeNGConfig } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { NgxMaterialTimepickerComponent, NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
// import { listTimeZones } from 'timezone-support';
import { listTimeZones, findTimeZone, getZonedTime } from 'timezone-support';
import { getAllTimezones } from 'countries-and-timezones';
import { Buffer } from 'buffer';
import { ToastModule } from 'primeng/toast';
import { CommonService } from '../../service/common.service';
// import { getTimezoneOffset, parseTimeZone, convertTimeToTimeZone } from 'timezone-support';
// import { zonedTimeToUtc } from 'date-fns-tz';

@Component({
    selector: 'sibyl-post-upload',
    templateUrl: './post-upload-version.component.html',
    imports: [CardModule,
        DividerModule,
        DropdownModule,
        ChipsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextareaModule,
        InputSwitchModule,
        ButtonModule,
        InputIconModule,
        BadgeModule,
        CalendarModule,
        ProgressBarModule,
        IconFieldModule,
        NgxMaterialTimepickerModule,
        ProgressSpinnerModule,
        FileUploadModule,
        ToastModule,
        InputTextModule],

    styleUrls: ['./post-upload-version.component.scss'],
    standalone: true,
    encapsulation: ViewEncapsulation.Emulated
    // providers: [MessageService]
})

export class PostVersionUploadComponent implements OnInit {

    @Input() postForm!: FormGroup;
    public fileAccept: string = 'image/*, video/*';

    @ViewChild('fileUpload') fileUpload!: FileUpload | any;
    @Input() postVersionItems!: any;
    @Input() disabled: boolean = false;

    // @Input() formGroup!: FormGroup;
    public isUploading: boolean = false;

    public date2: Date | undefined;
    public selectedType: any = 'Image';
    public mediaType: any;
    public isMultiple: boolean = false;

    public isSelectedType: boolean = true;
    public socialTypes: any;
    public selectedSocialType: any;

    public inputValue: string = '';
    public chips: string[] = [];
    public values!: string[];
    public checked: boolean = false;
    public uploadedFile: any = null;

    public files = [];
    public totalSize: number = 0;
    public totalSizePercent: number = 0;

    public showValidationMessage: boolean = false;
    public isCarousel = false;
    public uploadProgress: number = 0;
    public dragover: boolean = false;
    public isValidHashtag = true;
    public mediaFiles!: any[];

    public fileError: boolean = false;
    public fileErrorMessage: string = '';

    public timeZones: any[] = [];
    public timeZonesWithOffset: any[] = [];
    public minDate: any = new Date();
    public currentTime: any = new Date();
    public selectedTimeZone: string = '';

    ngOnInit() {
        const timeZones = listTimeZones();
        const Time = new Date();
        const hours = Time.getHours();
        const minutes = Time.getMinutes();

        this.currentTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        console.log('this.currentTime', this.currentTime);
        // const now = new Date();
        // this.timeZonesWithOffset = timeZones.map((zone) => {
        //     const timeZoneInfo = findTimeZone(zone);
        //     const zonedTime: any = getZonedTime(now, timeZoneInfo);
        //     const offset = zonedTime?.zone.offset / 60;

        //     const hours = Math.floor(offset);
        //     const minutes = Math.abs((offset % 1) * 60);
        //     const sign = hours >= 0 ? '+' : '-';
        //     const formattedOffset = `UTC${sign}${String(Math.abs(hours)).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        //     return {
        //         name: `${zone} (${formattedOffset})`,
        //         code: zone
        //     };
        // });

        // const now = new Date();
        // this.timeZonesWithOffset = timeZones.map((zone) => {
        //     const timeZoneInfo = findTimeZone(zone);
        //     const zonedTime: any = getZonedTime(now, timeZoneInfo);
        //     const offset = zonedTime?.zone.offset / 60;

        //     const hours = Math.floor(offset);
        //     const minutes = Math.abs((offset % 1) * 60);
        //     const sign = hours >= 0 ? '+' : '-';
        //     const formattedOffset = `GMT${sign}${String(Math.abs(hours)).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        //     return {
        //         name: `${zone} (${formattedOffset})`,
        //         code: zone
        //     };
        // });

        const timezones = getAllTimezones();
        const now = new Date();

        this.timeZonesWithOffset = Object.values(timezones).map((timezone: any) => {
            const offsetMinutes = timezone.utcOffset;
            const hours = Math.floor(offsetMinutes / 60);
            const minutes = Math.abs(offsetMinutes % 60);
            const sign = hours >= 0 ? '+' : '-';
            const formattedOffset = `GMT${sign}${String(Math.abs(hours)).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

            return {
                name: `${timezone.name} (${formattedOffset})`,
                code: timezone.name
            };
        });
    }

    constructor(private config: PrimeNGConfig, private cdr: ChangeDetectorRef, private _commonService: CommonService) {
        // this.postForm = this._fb.group({
        //     mediaType: new FormControl('', Validators.required),
        //     timeZone: new FormControl('', Validators.required),
        //     datePicker: new FormControl('', Validators.required),
        //     timePicker: new FormControl('', Validators.required),
        //     fileUpload: new FormControl('', Validators.required),
        //     caption: new FormControl(''),
        //     hashTag: new FormControl(''),
        // })

        this.mediaType = [
            { name: 'Image', code: 'Img' },
            { name: 'Carousel', code: 'Crs' },
            { name: 'Reel', code: 'Reel' },
            { name: 'Video', code: 'Vid' },
        ];

        this.socialTypes = [
            { name: 'Instagram', code: '' },
            { name: 'Tik Tok', code: '' },
            { name: 'Meta', code: '' },
        ]
    }

    public validateHashtags(event: any): void {
        let newValue = (event as any).value;
        if (!newValue.startsWith('#')) {
            this.isValidHashtag = false;
            this.showValidationMessage = true;
            this.values.pop();
        } else {
            this.isValidHashtag = true;
            this.showValidationMessage = false;
        }
    }

    public onRemove(): void {
        this.showValidationMessage = false;
        this.isValidHashtag = true;
        this.cdr.detectChanges();
    }

    public addChip(value: string) {
        if (value && !this.chips.includes(value)) {
            this.chips.push(value);
        }
    }

    public removeChip(chip: string) {
        console.log('chip', chip);
    }

    // public onSelectedFiles(event: any) {
    //     this.files = event.currentFiles;
    //     this.files.forEach((file: any) => {
    //         this.totalSize += parseInt(this.formatSize(file.size));
    //     });
    //     this.totalSizePercent = this.totalSize / 10;
    //     console.log('this.files', this.files);
    // }

    public formatSize(bytes: any) {
        const k = 1024;
        const dm = 3;
        const sizes: any = this.config.translation.fileSizeTypes;
        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

        return `${formattedSize} ${sizes[i]}`;
    }

    private clearUploadedFiles() {
        this.mediaFiles = [];
        this.fileUpload.clear();
        this.uploadedFile = null;
        console.log('clear upload')
        this.postForm.get('fileUpload')?.reset();
    }

    public onMediaTypeChange(event: any) {
        if (this.mediaFiles?.length > 0) {
            console.log('claeaddasdasdasdas')
            this.clearUploadedFiles();
        }
        console.log('cas', this.mediaFiles);
        this.fileError = false;
        this.fileErrorMessage = '';
        const selectedType = event.value.name;
        this.isSelectedType = false;
        if (selectedType === 'Image') {
            this.fileAccept = 'image/*';
            this.isMultiple = false;
        } else if (selectedType === 'Video' || selectedType === 'Reel') {
            this.fileAccept = 'video/*';
            this.isMultiple = false;
        } else if (selectedType === 'Carousel') {
            this.fileAccept = 'image/*,video/*';
            this.isMultiple = true;
        }
        this.isCarousel = event.value.name == 'Carousel';
    }

    public getFileIcon(file: any): string {
        const fileType = file.type.split('/')[0];
        if (fileType === 'image') {
            return 'pi-image';
        } else if (fileType === 'video') {
            return 'pi-video';
        } else {
            return 'pi-file';
        }
    }

    // Helper method to format file size in a human-readable way
    public formatFileSize(size: number): string {
        // console.log('size', size);
        if (size < 1024) {
            return size + ' bytes';
        } else if (size >= 1024 && size < 1048576) {
            return (size / 1024).toFixed(1) + ' KB';
        } else {
            return (size / 1048576).toFixed(1) + ' MB';
        }
    }

    // public formatFileSize(size: number): string {
    //     const maxFileSizeMB = 40; // Maximum file size in MB
    //     const maxFileSizeBytes = maxFileSizeMB * 1048576; // Convert 300MB to bytes
    //     console.log('size', size);
    //     if (size > maxFileSizeBytes) {
    //         console.log('size exceed', size);

    //         return `File exceeds the maximum size of ${maxFileSizeMB} MB`;
    //     }

    //     if (size < 1024) {
    //         return size + ' bytes';
    //     } else if (size >= 1024 && size < 1048576) {
    //         return (size / 1024).toFixed(1) + ' KB';
    //     } else {
    //         return (size / 1048576).toFixed(1) + ' MB';
    //     }
    // }
    // public formatFileSize(size: number): string {
    //     const maxFileSizeMB = 4; // Maximum file size in MB
    //     const maxFileSizeBytes = maxFileSizeMB * 1048576; // Convert 300MB to bytes

    //     if (size > maxFileSizeBytes) {
    //         const errorMessage = `File exceeds the maximum size of ${maxFileSizeMB} MB`;

    //         // Notify the user with a toast message
    //         this._commonService.notify("", errorMessage, "error");

    //         // Clear the file input (if needed)
    //         this.fileUpload.clear();

    //         // Trigger change detection to update the view
    //         // this.cdr.detectChanges();

    //         return errorMessage;
    //     }

    //     if (size < 1024) {
    //         return size + ' bytes';
    //     } else if (size >= 1024 && size < 1048576) {
    //         return (size / 1024).toFixed(1) + ' KB';
    //     } else {
    //         return (size / 1048576).toFixed(1) + ' MB';
    //     }
    // }


    // Method to remove a selected file from the list
    public removeFile(index: number): void {

        this.mediaFiles.splice(index, 1);
        if (this.mediaFiles.length == 0) {
            this.postForm.controls['fileUpload'].reset();
        }
    }

    // public onFileSelect(event: any) {
    //     // callback();
    //     // this.uploadedFile = event.files[0];
    //     // if (this.uploadedFile) {
    //     //     this.uploadedFile = this.uploadedFile;
    //     //     this.convertToBase64(this.uploadedFile);
    //     // }
    //     // this.uploadFile(this.uploadedFile);

    //     console.log('onFile Select', event.currentFiles);

    //     this.mediaFiles = event.currentFiles;

    //     this.mediaFiles.forEach((x: any) => {
    //         const file: File = x as File;
    //         file.arrayBuffer().then((buf) => {
    //             const base64Data = Buffer.from(buf).toString('base64');
    //             x.data = base64Data;
    //             x.status = 'Upload Pending'
    //         })
    //     })
    //     this.postForm.get('fileUpload')?.setValue(this.mediaFiles);
    //     console.log('file select event', this.mediaFiles);

    //     this.uploadProgress = 0;

    //     // if (this.fileError) {
    //     //     return;
    //     // }
    //     // const file = event.files[0];
    //     // if (event.files && event.files.length > 0) {
    //     //     const file = event.files[0];
    //     //     this.convertToBase64(file);
    //     //     this.uploadFile(file);
    //     // }

    //     const files = event.files[0];
    //     this.uploadedFile = files;

    //     // reset error status
    //     this.fileError = false;
    //     this.fileErrorMessage = '';

    //     // file type validation
    //     if (this.isCarousel && this.mediaFiles.length > 20) {
    //         console.log('length')
    //         this.fileError = true;
    //         this.fileErrorMessage = 'Maximum 20 files are allowed for Carousel.';
    //         this.cdr.detectChanges();
    //         this._commonService.notify("", this.fileErrorMessage, "error")
    //         this.fileUpload.clear();
    //         // setTimeout(() => {
    //         // }, 1000);
    //         // return;
    //     }

    //     // Check if any file type is invalid
    //     // const invalidFile = files.some((file: any) => !this.isValidFileType(file));
    //     // if (invalidFile) {
    //     //     this.fileError = true;
    //     //     this.fileErrorMessage = 'Invalid file type selected.';
    //     //     this.fileUpload.clear();
    //     //     return;
    //     // }
    // }

    public getCurrentDateInTimeZone(timeZone: string): Date {
        const currentDate = new Date();
        const timeZoneData = findTimeZone(timeZone);
        const zonedTime = getZonedTime(currentDate, timeZoneData);
        return new Date(zonedTime.year, zonedTime.month - 1, zonedTime.day);
    }

    // public onTimeZoneSelection(event: any) {
    //     this.getCurrentDateInTimeZone(event.value.code);
    //     this.minDate = this.getCurrentDateInTimeZone(event.value.code);
    //     this.currentTime = this.getCurrentTimeInTimeZone(event.value.code);
    //     console.log('currentTime', this.currentTime);
    // };

    // public getCurrentTimeInTimeZone(timeZone: string): string {
    //     console.log('getCurrentTimeInTimeZone(this.selectedTimeZone)', timeZone);
    //     const currentDate = new Date();
    //     const timeZoneData = findTimeZone(timeZone);
    //     const zonedTime = getZonedTime(currentDate, timeZoneData);
    //     console.log('zonedTime', zonedTime);

    //     const hours = zonedTime.hours;
    //     const minutes = zonedTime.minutes < 10 ? '0' + zonedTime.minutes : zonedTime.minutes;
    //     return `${hours}:${minutes}`;
    // }

    public getCurrentTimeInTimeZone(timeZone: string): string {
        const currentDate = new Date();
        const timeZoneData = findTimeZone(timeZone);
        const zonedTime = getZonedTime(currentDate, timeZoneData);

        const hours = zonedTime.hours;
        const minutes = zonedTime.minutes < 10 ? '0' + zonedTime.minutes : zonedTime.minutes;

        return `${hours}:${minutes}`;
    }

    public onTimeZoneSelection(event: any): void {
        const selectedTimeZone = event.value.code;
        this.selectedTimeZone = event.value.code;
        this.minDate = this.getCurrentDateInTimeZone(selectedTimeZone);
        this.currentTime = this.getCurrentTimeInTimeZone(selectedTimeZone);
    }

    public onDateSelection(selectedDate: Date, selectedTimeZone: string): void {
        const currentDateInTimeZone = this.getCurrentDateInTimeZone(selectedTimeZone);
        if (this.isSameDate(currentDateInTimeZone, selectedDate)) {
            this.currentTime = this.getCurrentTimeInTimeZone(selectedTimeZone);
        } else {
            this.currentTime = null;
        }
    }

    private isSameDate(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }

    public async onFileSelect(event: any) {

        this.mediaFiles = event.currentFiles;
        this.fileError = false;
        this.fileErrorMessage = '';

        const maxFileSizeMB = 300;
        const maxFileSizeBytes = maxFileSizeMB * 1048576;

        for (let file of this.mediaFiles) {
            if (!this.isValidFileType(file)) {
                this.fileError = true;
                this.fileErrorMessage = 'Only MP4 videos and PNG, JPG, GIF images are allowed.';
                this.cdr.detectChanges();
                this._commonService.notify("", this.fileErrorMessage, "error");
                this.fileUpload.clear();
                return;
            }

            const isValidDimensions = await this.validateMediaDimensions(file);
            if (!isValidDimensions) {
                // console.log('caled')
                this.fileErrorMessage = 'Maximum allowed media dimensions are 800x400px.';
                this.cdr.detectChanges();
                this._commonService.notify("", this.fileErrorMessage, "error");
                this.fileUpload.clear();
                return;
            }

            if (file.size > maxFileSizeBytes) {
                this.fileError = true;
                this.fileErrorMessage = `File exceeds the maximum size of ${maxFileSizeMB} MB`;
                this._commonService.notify("", this.fileErrorMessage, "error");
                this.fileUpload.clear();
                this.cdr.detectChanges();
                return;
            }

            file.arrayBuffer().then((buf: any) => {
                const base64Data = Buffer.from(buf).toString('base64');
                file.data = base64Data;
                file.status = 'Upload Pending';
            });
        }

        this.postForm.get('fileUpload')?.setValue(this.mediaFiles);

        this.uploadProgress = 0;

        if (this.isCarousel && this.mediaFiles.length > 20) {
            this.fileError = true;
            this.fileErrorMessage = 'Maximum 20 files are allowed for Carousel.';
            this.cdr.detectChanges();
            this._commonService.notify("", this.fileErrorMessage, "error");
            this.fileUpload.clear();
            return;
        }

        const files = event.files[0];
        this.uploadedFile = files;
    }

    public validateMediaDimensions(file: any): Promise<boolean> {
        return new Promise((resolve) => {
            const fileType = file.type.toLowerCase();

            if (fileType.startsWith('image/')) {
                const img = new Image();
                const objectUrl = URL.createObjectURL(file);

                img.onload = () => {
                    const isValid = img.width <= 800 && img.height <= 400;
                    URL.revokeObjectURL(objectUrl);
                    resolve(isValid);
                };

                img.src = objectUrl;
                console.log('img.src', img.src);
            }

            else if (fileType.startsWith('video/')) {
                const video = document.createElement('video');
                const objectUrl = URL.createObjectURL(file);

                video.onloadedmetadata = () => {
                    const isValid = video.videoWidth <= 800 && video.videoHeight <= 400;
                    URL.revokeObjectURL(objectUrl);
                    resolve(isValid);
                };

                video.src = objectUrl;
            } else {
                resolve(false);
            }
        });
    }

    public isValidFileType(file: any): boolean {
        // const isImage = file.type.startsWith('image/');
        // const isVideo = file.type.startsWith('video/*');
        // // console.log('fileAccept', isVideo)
        // if (this.fileAccept.includes('image/*') && isImage) {
        //     return true;
        // }

        // if (this.fileAccept.includes('video/*') && isVideo) {
        //     // console.log('hellos');
        //     return true;
        // }
        // return false;
        const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
        const allowedVideoTypes = ['video/mp4', 'video/quicktime'];

        const isImage = allowedImageTypes.includes(file.type);
        const isVideo = allowedVideoTypes.includes(file.type);
        console.log(file.type);

        // Check for image types (png, jpeg, jpg, gif)
        if (this.fileAccept.includes('image/*') && isImage) {
            return true;
        }

        // Check for video type (mp4)
        if (this.fileAccept.includes('video/*') && isVideo) {
            return true;
        }

        return false;
    }

    resetTime(timepicker: NgxMaterialTimepickerComponent): void {
        // Clear the form control value
        //this.postForm.get('timePicker')?.reset();

        // Reset the timepicker dialog itself
        timepicker.close();  // Close the timepicker dialog
        // setTimeout(() => timepicker.open(), 0);  // Clear the internal time value of the dialog
    }

    public convertToBase64(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result as string;
            this.postForm.get('fileUpload')?.setValue(base64String);
            // console.log('base64String', base64String);
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }

    public onUpload(event: any) {
        // console.log('onUpload', event);
        this.uploadProgress = 0;

        if (this.fileError) {
            return;
        }
        // const file = event.files[0];
        if (event.files && event.files.length > 0) {
            const file = event.files[0];
            this.uploadFile(file);
        }
        // this.uploadFile(file);
    }

    public uploadFile(file: any): void {
        console.log('claled')
        const formData = new FormData();
        formData.append('file', file);

        this.isUploading = true;
        this.uploadProgress = 0;

        const fakeUpload = setInterval(() => {
            this.uploadProgress += 50;
            this.isUploading = true;
            if (this.uploadProgress >= 100) {
                this.uploadProgress = 100;
                clearInterval(fakeUpload);
            }
            this.isUploading = false;
            // console.log("File uploaded successfully!");
        }, 300);
    }

    public deleteFile(): void {
        this.uploadedFile = null;
        this.uploadProgress = 0;
    }

    public onClear(): void {
        // this.uploadedFile = null;
        this.uploadProgress = 0;
        this.uploadedFile = [];
        this.fileError = false;
        this.fileErrorMessage = '';
        this.mediaFiles = [];
        // removeFileCallback(event, index);
    }

    public onDragOver(): void {
        this.dragover = true;
    }

    public onDragLeave(): void {
        this.dragover = false;
    }

    public onDrop(): void {
        this.dragover = false;
    }

    public runAnalysis(): void {
        console.log('called', this.postForm.value);
    }
}
