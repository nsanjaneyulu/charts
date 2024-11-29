import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipsModule } from 'primeng/chips';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { PerformancePredictionComponent } from "../performance-color-prediction/performance-color-prediction.component";
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { listTimeZones, findTimeZone, getZonedTime } from 'timezone-support';
import { caption, HashTagValues } from "./result-post-version.const";
import { getAllTimezones } from 'countries-and-timezones';
// import { ContentTestingResultsService } from "./content-testing-results.service";
// import { CipherService } from "../../../../../shared/service/cipher.service";
import SwiperCore from 'swiper';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentTestingResultsService } from "./content-testing-results.service";
import { CipherService } from "../../../../../shared/service/cipher.service";


@Component({
    selector: 'sibyl-result-post-version',
    templateUrl: './result-post-version.component.html',
    imports: [CardModule,
        DividerModule,
        DropdownModule,
        ChipsModule,
        CommonModule,
        InputTextareaModule,
        InputSwitchModule,
        ButtonModule,
        InputIconModule,
        CalendarModule,
        RouterModule,
        IconFieldModule,
        NgxMaterialTimepickerModule,
        FormsModule,
        ReactiveFormsModule,
        TagModule,
        PerformancePredictionComponent,
        InputTextModule,
        // SwiperModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    styleUrls: ['./result-post-version.component.scss'],
    standalone: true,
    encapsulation: ViewEncapsulation.Emulated
})

export class ResultPostVersionComponent implements OnInit {

    public isLoadingCaption: boolean = false;
    @Input() showSchedulePost: boolean = true;
    @Input() imgSrc: string = '';
    @Input() scheduleDate: string = '';
    @Input() scheduleTime: string = '';
    @Input() timeZone: string = '';
    @Input() postName: string = '';
    @Input() bestfPerforming: boolean = false;
    @Input() buttonVisibility: boolean = true;
    @Input() hashTagValues = HashTagValues;
    @Input() caption: any = caption;
    @Output() flagSignal = new EventEmitter<boolean>();
    @Input() postVersion: any;
    @Input() predictionData: any;
    @Input() isScheduleVisible!: boolean;
    // public SuggestaCaption = false;
    public previousCaption: string | null = null;


    public SuggestaCaption: boolean = false;
    public disableFlag: boolean = true;
    public checked: boolean = false;
    public chips: string[] = [];
    public values!: string[];
    public isValidHashtag = true;
    public showValidationMessage: boolean = false;
    public visible: boolean = true;
    // public defaultDate: Date = new Date();
    public postForm!: FormGroup;
    public timeZones: any[] = [];
    public timeZonesWithOffset: any[] = [];
    public selectedTimeZone!: any;
    public hashTagVisibility: boolean = false;
    public id!: string;
    public tenantId!: string;
    public resultData: any;
    public encryptedId: any;
    public minDate: any = new Date();
    public currentTime: any = new Date();

    constructor(private _fb: FormBuilder, private _route: ActivatedRoute, private _cipherService: CipherService, private _sanitizer: DomSanitizer, private _contentTestingResultsService: ContentTestingResultsService) {
        this.initForm();
    }

    public isImage(mimeType: string): boolean {
        return mimeType.startsWith('image/');
    }

    public isVideo(mimeType: string): boolean {
        return mimeType.startsWith('video/');
    }

    ngOnInit(): void {
        // this.values = this.hashTagValues;
        const timeZones = listTimeZones();
        const Time = new Date();
        const hours = Time.getHours();
        const minutes = Time.getMinutes();

        this.currentTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

        const timezones = getAllTimezones();
        const now = new Date();
        // console.log('isScheduleVisible', this.isScheduleVisible);

        this.initForm();
        setTimeout(() => {
            this.postForm.patchValue({
                timeZone: {
                    code: this.postVersion.timeZone.split(' ')[0],
                    name: this.postVersion.timeZone
                },
                datePicker: new Date(this.postVersion.scheduleDate),
                timePickers: this.postVersion.scheduleTime,
                hashTag: this.postVersion.hashtag
            });
            this.minDate = new Date();
        }, 1000);

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

        const encryptedId: any = this._route.snapshot.paramMap.get('id');
        this.encryptedId = this._cipherService.decryptData(encryptedId);
        this.selectedTimeZone = this.postVersion.timeZone;
        this.minDate = this.getCurrentDateInTimeZone(this.selectedTimeZone.split(' ')[0]);
        this.currentTime = this.getCurrentTimeInTimeZone(this.selectedTimeZone.split(' ')[0]);
        this.onDateSelection(new Date(this.postVersion.scheduleDate), this.selectedTimeZone.split(' ')[0])
    }

    public getCurrentDateInTimeZone(timeZone: string): Date {
        const currentDate = new Date();
        const timeZoneData = findTimeZone(timeZone);
        const zonedTime = getZonedTime(currentDate, timeZoneData);
        return new Date(zonedTime.year, zonedTime.month - 1, zonedTime.day);
    }

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

    public initForm(): void {
        this.postForm = this._fb.group({
            timeZone: new FormControl({ value: this.postVersion ? this.postVersion.timeZone : '', disabled: !this.buttonVisibility }, Validators.required),
            datePicker: new FormControl({ value: this.postVersion ? this.postVersion.scheduleDate : '', disabled: !this.buttonVisibility }, Validators.required),
            timePicker: new FormControl({ value: this.postVersion ? this.postVersion.scheduleTime : '', disabled: !this.buttonVisibility }, Validators.required),
            timePickers: new FormControl({ value: this.postVersion ? this.postVersion.scheduleTime : '', disabled: !this.buttonVisibility }, Validators.required),
            hashTag: new FormControl({ value: this.postVersion ? this.postVersion.hashtag : '', disabled: true }),
        })
    }

    public ScheduledPosts() {
        this.disableFlag = false;
        this.constructPayload();
    }

    public constructPayload() {
        const convertMedia = (files: File[]): any[] => {
            return files.map((file: any) => ({
                name: file.name,
                base64String: file.base64String,
                fileType: file.fileType,
                mediaUrl: ''
            }));
        };

        const createPostVersion = (form: any, version: number): any => {
            console.log('form', form, this.postVersion);
            this.minDate = form.datePicker.toISOString().split('T')[0];

            return {
                version: version,
                postType: '',
                timeZone: form.timeZone.name,
                scheduleDate: form.datePicker.toISOString().split('T')[0],
                scheduleTime: form.timePickers,
                media: convertMedia(this.postVersion.media),
                postCaption: this.postVersion.postCaption,
                hashtag: this.postVersion.hashtag
            };
        };

        const payload = {
            organic: true,
            id: this.encryptedId,
            tenantId: 'HUDABEAUTY',
            contentId: '',
            socialMediaPlatform: 'instagram',
            postVersion: [
                createPostVersion(this.postForm.value, 0),
            ]
        };
        console.log('payload', payload);
        this._contentTestingResultsService.schedulePost(this.encryptedId, payload).subscribe((res) => {
            console.log(res)
            if (res) {
                this.flagSignal.emit(true);
                this.showSchedulePost = false;
            }
        })
        // this.suggestCaption();
    }

    // public suggestCaption() {
    //     console.log('this.postVersion.postCaption', this.postVersion.postCaption);
    //     const captionPayload = {
    //         query: 'Can you suggest some hashtags for HUDA Beauty products?'
    //     }
    //     this._contentTestingResultsService.suggestCaption(captionPayload).subscribe((captionRes: any) => {
    //         if (captionRes) {
    //             console.log('captionResponse', captionRes);
    //             this.previousCaption = this.postVersion.postCaption;
    //             this.postVersion.postCaption = captionRes.reply;
    //         }
    //     })
    // }

    public suggestCaption(): void {
        const captionPayload = {
            query: 'Can you suggest some hashtags for HUDA Beauty products?'
        };

        const newCaptionPayload = {
            query: 'Can you suggest some hashtags for HUDA Beauty products?',
            base64String: ``,
            fileName: ``
        };

        this._contentTestingResultsService.suggestCaption(captionPayload).subscribe(
            (captionRes: any) => {
                if (captionRes) {
                    this.previousCaption = this.postVersion.postCaption;
                    this.postVersion.postCaption = captionRes.reply;
                }
                this.isLoadingCaption = false;
            },
            (error: any) => {
                console.error('Error fetching caption:', error);
                this.isLoadingCaption = false;
            }
        );
    }

    // public previousSuggestions(): void {
    //     this.SuggestaCaption = false;
    //     this.postVersion.postCaption = this.postVersion?.postCaption; 
    // }

    public previousSuggestions(): void {
        if (this.previousCaption) {
            this.postVersion.postCaption = this.previousCaption;
            this.SuggestaCaption = false;
        }
    }

    public nextSuggestions(): void {
        this.isLoadingCaption = true;
        this.suggestCaption();
        this.SuggestaCaption = true;
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
    }
}
