import { CommonModule, DatePipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipsModule } from 'primeng/chips';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService, } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PostVersionUploadComponent } from '../../../shared/components/post-upload-version/post-upload-version.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ContentTestingService } from './content-testing.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CipherService } from '../../../shared/service/cipher.service';

@Component({
	selector: 'app-cotent-testing',
	templateUrl: './cotent-testing.component.html',
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
		BadgeModule, CalendarModule,
		IconFieldModule,
		NgxMaterialTimepickerModule,
		ProgressSpinnerModule,
		RouterModule,
		FileUploadModule, PostVersionUploadComponent, DialogModule],
	styleUrls: ['./cotent-testing.component.scss'],
	standalone: true,
	providers: [MessageService, ContentTestingService, DatePipe],
	encapsulation: ViewEncapsulation.Emulated
})

export class CotentTestingComponent {

	public firstPostForm!: FormGroup;
	public secondPostForm!: FormGroup;
	public isScreen: boolean = false;
	public socialTypes: any;
	public selectedSocialType: any;
	public checked: boolean = false;
	public showPopup: boolean = false
	public previousUrl: string = '';
	public currentUrl: string = '';
	public isLoading: boolean = false;

	constructor(private _fb: FormBuilder, private _route: Router, private _contentTestingService: ContentTestingService, private _cipherService: CipherService, private datePipe: DatePipe) {

		this.firstPostForm = this._fb.group({
			mediaType: new FormControl('', Validators.required),
			timeZone: new FormControl('', Validators.required),
			datePicker: new FormControl('', Validators.required),
			timePicker: new FormControl(null, Validators.required),
			fileUpload: new FormControl('', Validators.required),
			caption: new FormControl('', [Validators.maxLength(2200)]),
			hashTag: new FormControl(''),
		});

		this.secondPostForm = this._fb.group({
			mediaType: new FormControl('', Validators.required),
			timeZone: new FormControl('', Validators.required),
			datePicker: new FormControl('', Validators.required),
			timePicker: new FormControl('', Validators.required),
			fileUpload: new FormControl('', Validators.required),
			caption: new FormControl('', [Validators.maxLength(2200)]),
			hashTag: new FormControl(''),
		});
	}

	public Hide($event: any): void {
		this.showPopup = false;
		this.checked = false
	}

	ngOnInit(): void {
		this.socialTypes = [
			{ name: 'Instagram', code: '', src: './../../../../assets/icons/instagram.png' },
			// { name: 'Tik Tok', code: '', src: './../../../../assets/icons/tiktok.png' },
			//  { name: 'Meta', code: '', src: './../../../../assets/icons/Facebook.png' },
		]
		this.selectedSocialType = this.socialTypes[0];
		this.onRouteNavigate();
		this.onBrowserPageLoad();
	}

	public extractDateFromCalendar(selectedDate: Date): string | null {
		return this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
	}

	public runAnalysis(): void {
		// console.log('called first', this.firstPostForm.value);
		// console.log('called second', this.secondPostForm.value);
		this.isLoading = true;
		// const payload = {
		// 	organic: true,
		// 	id: '',
		// 	tenantId: '',
		// 	contentId: '',
		// 	socialMediaPlatform: 'intagram',
		// 	postVersion: [
		// 		{
		// 			version: 0,
		// 			postType: "image",
		// 			timeZone: this.firstPostForm.value.timeZone.name,
		// 			scheduleDate: this.firstPostForm.value.datePicker,
		// 			scheduleTime: this.firstPostForm.value.timePicker,
		// 			media: [
		// 				{
		// 					name: "string",
		// 					base64String: "string",
		// 					fileType: "string",
		// 					mediaUrl: "string"
		// 				}
		// 			],
		// 			postCaption: this.firstPostForm.value.caption,
		// 			hashtag: [
		// 				"string"
		// 			]
		// 		}
		// 	]
		// }

		const obj = {
			"organic": true,
			"id": "",
			"tenantId": "",
			"contentId": "",
			"socialMediaPlatform": "instagram",
			"postVersion": [
				{
					"version": 0,
					"postType": "image",
					"timeZone": "Africa/Abidjan (GMT+00:00)",
					"scheduleDate": "2024-10-10",
					"scheduleTime": "1:06 AM",
					"media": [
						{
							"name": "icon.png",
							"base64String": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIdSURBVHgBrVRLaBNRFD0zHZNpTcykaUQtKSN0IeIn0Yr4WUTcFaQxGy0urKIQdWG7EFwIzUoUF2anCyEI7gSZBsWFi6YrQSq2WLBFMINJLYXYTP1Eq2aed6amDDZTJmkOXN5n7jvz7r3nPqDJ4Jw6Jl6+kY1RFKGlIhHNzk+AQ3ybn8tNP83A81vXiqHYuY68omA96Lv3gNFgWjpwcNTOj0cDGF58G70u7Yg2jfDjnzJuadPpAxcTacptFI3AGrLVjotbcsVQfKDqZ1uUf3+WybL3D0XU6v4Rdwd63O3ak+8FKV8pYzPvkjlm+tUmvDI+eVavsFRubFQiw/mphYkf2+Ox0xafpG+XcmPTzocvluYHugXPXkqcVpPw8qvJq4uF2dTza0P4/H7G3PO07w/Dh1UIFpSscfv/9wVLiDJjLDly6QK+zn1CwtuNoxTeYXfQVsS1sELI8QjPPMtIBln/xi7clPaoXIt+zK8qqvG9D731ETId4dnX4+a8t7UTnK6f9OeXyeqBVYdqdTL1S4Po4kvVtVVrPt4FRzekplfaAoG7NJVuf3mHR2V1kIhGaC1zPDds9PHy7beiAozBCfofZwbdXu+KaLft62G7T50xR2NNGmQLoXiuJMdkOAUdTvq4Das6gqrOPnSeKNFLE1vrvN17KN/xh9PFylK0S2gj+QQRamnNcgIboqpPoAFCExSa9JNyKgIaEdWlx6bhLz3XxJwu+k0HAAAAAElFTkSuQmCC",
							"fileType": "image",
							"mediaUrl": ""
						}
					],
					"postCaption": "caption",
					"hashtag": [
						"#xyz", "#abc"
					]
				}, {
					"version": 1,
					"postType": "image",
					"timeZone": "Africa/Abidjan (GMT+00:00)",
					"scheduleDate": "2024-10-11",
					"scheduleTime": "1:07 AM",
					"media": [
						{
							"name": "icon.png",
							"base64String": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIdSURBVHgBrVRLaBNRFD0zHZNpTcykaUQtKSN0IeIn0Yr4WUTcFaQxGy0urKIQdWG7EFwIzUoUF2anCyEI7gSZBsWFi6YrQSq2WLBFMINJLYXYTP1Eq2aed6amDDZTJmkOXN5n7jvz7r3nPqDJ4Jw6Jl6+kY1RFKGlIhHNzk+AQ3ybn8tNP83A81vXiqHYuY68omA96Lv3gNFgWjpwcNTOj0cDGF58G70u7Yg2jfDjnzJuadPpAxcTacptFI3AGrLVjotbcsVQfKDqZ1uUf3+WybL3D0XU6v4Rdwd63O3ak+8FKV8pYzPvkjlm+tUmvDI+eVavsFRubFQiw/mphYkf2+Ox0xafpG+XcmPTzocvluYHugXPXkqcVpPw8qvJq4uF2dTza0P4/H7G3PO07w/Dh1UIFpSscfv/9wVLiDJjLDly6QK+zn1CwtuNoxTeYXfQVsS1sELI8QjPPMtIBln/xi7clPaoXIt+zK8qqvG9D731ETId4dnX4+a8t7UTnK6f9OeXyeqBVYdqdTL1S4Po4kvVtVVrPt4FRzekplfaAoG7NJVuf3mHR2V1kIhGaC1zPDds9PHy7beiAozBCfofZwbdXu+KaLft62G7T50xR2NNGmQLoXiuJMdkOAUdTvq4Das6gqrOPnSeKNFLE1vrvN17KN/xh9PFylK0S2gj+QQRamnNcgIboqpPoAFCExSa9JNyKgIaEdWlx6bhLz3XxJwu+k0HAAAAAElFTkSuQmCC",
							"fileType": "image",
							"mediaUrl": ""
						}
					],
					"postCaption": "caption",
					"hashtag": [
						"#xyz", "#abc"
					]
				}

			]
		}


		const convertMedia = (files: File[]): any[] => {
			// console.log('files', (files[0] as any).data);
			return files.map((file: any) => ({
				name: file.name,
				base64String: file.data,
				fileType: file.type,
				mediaUrl: ''
			}));
		};

		const createPostVersion = (form: any, version: number): any => {
			// console.log('form for date picker', form.datePicker);
			// console.log('extracted', new Date(form.datePicker));
			const selectedDate = new Date(form.datePicker);
			const formattedDate = this.extractDateFromCalendar(selectedDate);
			console.log('formattedDate', formattedDate, typeof formattedDate, 'string', String(formattedDate));
			// console.log('form.datePicker.toISOString().split', form.datePicker.toISOString().split('T')[0]);
			return {
				version: version,
				postType: form.mediaType.name,
				timeZone: form.timeZone.name,
				scheduleDate:  formattedDate,
				scheduleTime: form.timePicker,
				media: convertMedia(form.fileUpload),
				postCaption: form.caption ? form.caption : "",
				hashtag: form.hashTag ? form.hashTag : []
			};
		};

		const payload = {
			organic: true,
			id: '',
			tenantId: 'HUDABEAUTY',
			contentId: '',
			socialMediaPlatform: 'instagram',
			postVersion: [
				createPostVersion(this.firstPostForm.value, 0),
				createPostVersion(this.secondPostForm.value, 1)
			]
		};

		console.log('payloaf', payload);
		// console.log('payloaf', obj);

		this._contentTestingService.runAnalysis(payload).subscribe({
			next: (res: any) => {
				if (res) {
					// Encrypt the response ID and tenant ID
					const encryptedId = this._cipherService.encryptData(res.id);
					const encryptedTenantId = this._cipherService.encryptData(res.tenantId);

					// Stop loading and navigate to the result page
					this.isLoading = false;
					this._route.navigate(['/contentTesting/result', { id: encryptedId, tenantId: encryptedTenantId }]);

					this.firstPostForm.reset();
					this.secondPostForm.reset();
					this.isScreen = true;
				}
			},
			error: (err: any) => {
				console.error('Error during analysis:', err);
				this.isLoading = false;
			}
		});
	}

	public onSwitchChange($event: any) {
		if ($event.checked) {
			this.showPopup = true;
		}
	}

	public createAccount(): void {
		console.log('Connect Business Account');
	}

	public onRouteNavigate(): void {
		this._route.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd) {
				this.previousUrl = this.currentUrl;
				this.currentUrl = event.url;
				let hasChildRoute = /^\/contentTesting\/(.+)$/;
				if (
					this.previousUrl.match(hasChildRoute) &&
					this.previousUrl !== this.currentUrl && !this.currentUrl.includes('/contentTesting/')
				) {
					this.isScreen = false;
				} else if (
					this.currentUrl == '/contentTesting' &&
					this.previousUrl == ''
				) {
					this.isScreen = false;
				}
				else if (
					this.currentUrl.includes('/contentTesting/result/') &&
					this.previousUrl !== this.currentUrl
				) {
					this.isScreen = true;
				}
			}
		})
	}

	public onBrowserPageLoad(): void {
		const currentPath = window.location.pathname;
		if (!currentPath.endsWith('/contentTesting')) {
			this.isScreen = true;
		}
	}
}
