import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { MenuItem, MessageService, } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ResultPostVersionComponent } from './result-post-version.component/result-post-version.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ContentTestingResultsService } from './result-post-version.component/content-testing-results.service';
import { CipherService } from '../../../../shared/service/cipher.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'sibyl-cotent-testing-results',
    templateUrl: './content-testing-results.component.html',
    imports: [CardModule,
        DividerModule,
        DropdownModule,
        CommonModule,
        InputTextareaModule,
        InputSwitchModule,
        ButtonModule,
        InputIconModule,
        CalendarModule,
        RouterModule,
        IconFieldModule,
        FormsModule,
        ReactiveFormsModule,
        TagModule,
        ResultPostVersionComponent,
        DialogModule,
        BreadcrumbModule,
        ProgressSpinnerModule
    ],
    styleUrls: ['./content-testing-results.component.scss'],
    standalone: true,
    providers: [MessageService],
    encapsulation: ViewEncapsulation.None
})

export class CotentTestingResultsComponent implements OnInit {

    public socialTypes: any;
    public selectedSocialType: any;
    public checked: boolean = false;
    public chips: string[] = [];
    public isValidHashtag = true;
    public visible: boolean = false;
    public showValidationMessage: boolean = false;
    public postForm!: FormGroup;
    public revertButton: string = ''
    public items: MenuItem[] | undefined;
    public displayFlag: boolean = true;
    public home: MenuItem | undefined;
    public showSchedulePostButton: boolean = true;
    public isLoading: boolean = false;
    public resultData: any;
    public postVersionOne: any;
    public postVerisonTwo: any;
    public firstPredictionData: any;
    public secondPredictionData: any;
    public isScheduleVisible: boolean = true;
    public firstBestPerforming: boolean = false;
    public secondBestPerforming: boolean = false;

    public timeZones: any[] = [
        { name: 'America/New_York', code: '' },
        { name: 'Europe/London', code: '' },
        { name: 'Asia/Tokyo', code: '' },
        { name: 'Australia/Sydney', code: '' },
        { name: 'Africa/Johannesburg', code: '' },
        { name: 'Asia/Calcutta', code: '' },
    ];

    constructor(private _fb: FormBuilder, private router: Router, private _route: ActivatedRoute, private _contentTestingResultsService: ContentTestingResultsService, private _cipherService: CipherService) {

        this.socialTypes = [
            { name: 'Instagram', code: '', src: './../../../../assets/icons/instagram.png' },
            // { name: 'Tik Tok', code: '', src: './../../../../assets/icons/tiktok.png' },
            // { name: 'Meta', code: '', src: './../../../../assets/icons/Facebook.png' },
        ]
        this.selectedSocialType = this.socialTypes[0];

        this.postForm = this._fb.group({
            // mediaType: new FormControl('', Validators.required),
            timeZone: new FormControl('', Validators.required),
            datePicker: new FormControl('', Validators.required),
            timePicker: new FormControl('', Validators.required),
            timePickers: new FormControl('', Validators.required),
            // fileUpload: new FormControl('', Validators.required),
            // caption: new FormControl(''),
            hashTag: new FormControl(''),
        })
    }

    ngOnInit(): void {
        this.items = [
            { label: 'Select Posts', routerLink: '/contentTesting' },
            { label: 'Result', },
        ];
        this.fetchResultData();
    }

    public fetchResultData(): void {
        const encryptedId: any = this._route.snapshot.paramMap.get('id');
        const encryptedTenantId: any = this._route.snapshot.paramMap.get('tenantId');
        this.isLoading = true;
        const decryptedId = this._cipherService.decryptData(encryptedId);
        const decryptedTenantId = this._cipherService.decryptData(encryptedTenantId);

        this._contentTestingResultsService.getResult(decryptedId, decryptedTenantId).subscribe((res: any) => {
            if (res) {
                this.resultData = res;
                if (!this.resultData.postVersion[0].postCaption || !this.resultData.postVersion[1].postCaption) {
                    const payload = {
                        query: 'Suggest me a caption for HUDA Beauty products.'
                    }

                    const hatagPayload = {
                        query: 'Can you suggest some hashtags for HUDA Beauty products?'
                    }

                    this._contentTestingResultsService.suggestCaption(payload).subscribe((captionRes: any) => {
                        if (captionRes) {
                            // console.log('res post caption', this.resultData.postVersion[0]);
                            this.resultData.postVersion[0].postCaption = this.resultData.postVersion[0].postCaption ? this.resultData.postVersion[0].postCaption : captionRes.reply;
                            this.resultData.postVersion[1].postCaption = this.resultData.postVersion[1].postCaption ? this.resultData.postVersion[1].postCaption : captionRes.reply;

                            // this.resultData.postVersion[0].hashtag = hastags.slice(0, 10);
                            this.initializePostVersions();
                        }
                    });
                } else {
                    this.initializePostVersions();
                }
                if (!this.resultData.postVersion[0].hashtag.length || !this.resultData.postVersion[1].hashtag.length) {
                    const hatagPayload = {
                        query: 'Can you suggest some hashtags for HUDA Beauty products?'
                    }

                    this._contentTestingResultsService.suggestCaption(hatagPayload).subscribe((hashTagRes: any) => {
                        if (hashTagRes) {
                            console.log('hashTagRes', hashTagRes);
                            // console.log('res post caption', hashTagRes);
                            const hashTags = hashTagRes.reply.match(/#[\w]+/g);
                            // console.log('res post caption', hashTags);
                            console.log('hashTagRes', hashTags);

                            this.resultData.postVersion[0].hashtag = this.resultData.postVersion[0].hashtag.length ? this.resultData.postVersion[0].hashtag : hashTags;
                            this.resultData.postVersion[1].hashtag = this.resultData.postVersion[1].hashtag.length ? this.resultData.postVersion[1].hashtag : hashTags;

                            // this.resultData.postVersion[0].hashtag = hastags.slice(0, 10);
                            this.initializePostVersions();
                        }
                    });
                } else {
                    this.initializePostVersions();
                }
            }
        }
        )
    }

    // public initializePostVersions() {
    //     this.postVersionOne = this.resultData.postVersion[0];
    //     const base64StringOne = this.postVersionOne.media[0].base64String;
    //     const fileNameOne = this.postVersionOne.media[0].name;
    //     const fileTypeOne = this.postVersionOne.media[0].fileType;
    //     const fileOne = this._contentTestingResultsService.createFileFromBase64(base64StringOne, fileNameOne, fileTypeOne);

    //     const payloadOne = {
    //         base64String: base64StringOne,
    //         fileName: fileNameOne
    //     };

    //     this._contentTestingResultsService.getData(payloadOne).subscribe((resOne: any) => {
    //         this.firstPredictionData = resOne;
    //     });

    //     this.postVerisonTwo = this.resultData.postVersion[1];
    //     const base64StringTwo = this.postVerisonTwo.media[0].base64String;
    //     const fileNameTwo = this.postVerisonTwo.media[0].name;
    //     const fileTypeTwo = this.postVerisonTwo.media[0].fileType;
    //     const fileTwo = this._contentTestingResultsService.createFileFromBase64(base64StringTwo, fileNameTwo, fileTypeTwo);

    //     const payloadTwo = {
    //         base64String: base64StringTwo,
    //         fileName: fileNameTwo
    //     };

    //     this._contentTestingResultsService.getData(payloadTwo).subscribe((resTwo: any) => {
    //         this.secondPredictionData = resTwo;
    //         this.isLoading = false;
    //     });

    //     setTimeout(() => {
    //         console.log('this.firstPredictionData', this.firstPredictionData, 'this.secondPredictionData', this.secondPredictionData);
    //         if (this.firstPredictionData.engagementRate > this.secondPredictionData.engagementRate) {
    //             this.firstBestPerforming = true;
    //         }
    //         else {
    //             this.secondBestPerforming = true;
    //         }
    //     }, 0);
    // }

    public initializePostVersions() {
        this.postVersionOne = this.resultData.postVersion[0];
        this.postVerisonTwo = this.resultData.postVersion[1];
    
        const base64StringOne = this.postVersionOne.media[0].base64String;
        const fileNameOne = this.postVersionOne.media[0].name;
        const fileTypeOne = this.postVersionOne.media[0].fileType;
        const fileOne = this._contentTestingResultsService.createFileFromBase64(base64StringOne, fileNameOne, fileTypeOne);
    
        const payloadOne = {
            base64String: base64StringOne,
            fileName: fileNameOne
        };
    
        const base64StringTwo = this.postVerisonTwo.media[0].base64String;
        const fileNameTwo = this.postVerisonTwo.media[0].name;
        const fileTypeTwo = this.postVerisonTwo.media[0].fileType;
        const fileTwo = this._contentTestingResultsService.createFileFromBase64(base64StringTwo, fileNameTwo, fileTypeTwo);
    
        const payloadTwo = {
            base64String: base64StringTwo,
            fileName: fileNameTwo
        };
    
        // Use forkJoin to wait for both requests to complete
        forkJoin([
            this._contentTestingResultsService.getData(payloadOne),
            this._contentTestingResultsService.getData(payloadTwo)
        ]).subscribe(([resOne, resTwo]: any) => {
            this.firstPredictionData = resOne;
            this.secondPredictionData = resTwo;
            this.isLoading = false;
    
            // Compare engagementRate after both responses are received
            if (this.firstPredictionData?.engagementRate > this.secondPredictionData?.engagementRate) {
                this.firstBestPerforming = true;
            } else {
                this.secondBestPerforming = true;
            }
        });
    }

    public onnavigateback() {
        this.router.navigateByUrl('/contentTesting');
    }

    public downloadPdf(): void {
        // this.showSchedulePostButton = false;

        const cardElement = document.getElementById('card-content')!;
        this.isLoading = true;
        const clonedContent = cardElement.cloneNode(true) as HTMLElement;
        const button: any = document.querySelector('#schedule-button');
        // if (button) {
        //     button.remove();
        //     console.log('button', button);
        //     button.style.display = 'none';
        // }

        // html2canvas(cardElement!, {
        //     ignoreElements: (element) => {
        //         return element.id === 'schedule-button';
        //     },  
        //     useCORS: true, 
        //     scale: 4, 
        //     scrollY: 2, 
        //     foreignObjectRendering: false
        // }).then((canvas: any) => {
        //     const imgData = canvas.toDataURL('image/png');

        //     // Here, specify the custom page size in mm, e.g., 300mm x 400mm
        //     const pdfWidth = 300; // width in mm
        //     const pdfHeight = 510; // height in mm
        //     const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);

        //     const pageHeight = pdfHeight;
        //     const contentHeight = cardElement.scrollHeight;

        //     // Adjust the image width and height to fit the custom page size
        //     const imgWidth = pdfWidth - 40; // leaving margin of 20mm on both sides
        //     const imgHeight = (contentHeight * imgWidth) / cardElement.offsetWidth;

        //     let heightLeft = imgHeight;
        //     let position = 0;

        //     while (heightLeft >= 0) {
        //         pdf.addImage(imgData, 'PNG', 20, position + 10, imgWidth, imgHeight);
        //         heightLeft -= pageHeight;
        //         position -= pageHeight;
        //         if (heightLeft >= 0) {
        //             pdf.addPage();
        //         }
        //     }

        //     pdf.save('result.pdf');
        //     this.isLoading = false;
        // });

        //         const cardElement = document.getElementById('card-content')!;
        // this.isLoading = true;

        html2canvas(cardElement, {
            ignoreElements: (element) => {
                return element.id === 'schedule-button';
            },
            useCORS: true,
            scale: 4,
            foreignObjectRendering: false
        }).then((canvas: any) => {
            const imgData = canvas.toDataURL('image/png');
            const contentHeight = canvas.height;
            const contentWidth = canvas.width;
            const pdfWidth = 300;
            let pdfHeight = (contentHeight * pdfWidth) / contentWidth;
            const minHeight = 400;

            if (pdfHeight < minHeight) {
                pdfHeight = minHeight;
            }
            const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight - 50]);
            const imgWidth = pdfWidth - 40;
            const imgHeight = (contentHeight * imgWidth) / contentWidth;
            pdf.addImage(imgData, 'PNG', 20, 10, imgWidth, imgHeight);

            pdf.save('ContentTestingResult.pdf');
            this.isLoading = false;
        });
    }

    public saveCaseStudy(): void { }

    public flagSignalselection($event: any) {
        this.displayFlag = false;
        if ($event) {
            this.visible = true;
            this.isScheduleVisible = false;

        } else {
            this.visible = false;
            this.isScheduleVisible = true;
        }
    }
}