import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { InputIconModule } from 'primeng/inputicon';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MediaUploadComponent } from './media-upload/media-upload.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { defaultPrompts, dummyChatResponses } from './chat-with-ai.const';
import jsPDF from 'jspdf';
import { Footer } from './footer';
import { DialogModule } from 'primeng/dialog';
import { ChatService } from './chat.service';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { Conditional } from '@angular/compiler';

@Component({
    selector: 'sibyl-chat-with-ai',
    templateUrl: './chat-with-ai.component.html',
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
        InputTextareaModule,
        DialogModule,
        MessagesModule,
        FileUploadModule],
    styleUrls: ['./chat-with-ai.component.scss'],
    standalone: true,
    providers: [DialogService, DynamicDialogConfig]
})

export class ChatWithAiComponent implements OnInit {

    @Input() chatHistory: any[] = [];
    @Input() chatContent: any[] = [];
    @Input() selectedImage!: any;
    @Input() clearFlag!: boolean;
    @Input() isButtonVisible: boolean = false;
    public showPopup: any;
    public chatResponse: any;
    public isLoading = false
    @ViewChild('chatContainer') private chatContainer!: ElementRef;

    public messages!: Message[];

    ngOnInit() {
        console.log('caled');
        this.messages = [
            // { severity: 'info', detail: 'Info Message' },
            // { severity: 'success', detail: 'Success Message' },
            // { severity: 'warn', detail: 'Warning Message' },
            { severity: 'error', detail: 'You have exceeded the token limit' },
            // { severity: 'secondary', detail: 'Secondary Message' },
            // { severity: 'contrast', detail: 'Contrast Message' }
        ];
        console.log('clearFlag', this.clearFlag);
        this.loadChatHistory();
        this.selectedChatMessages = [];
        this.isInputVisbile = false;
    }

    private isFormattedList(response: string): boolean {
        const listRegex = /^\d+\.\s+/m;
        return listRegex.test(response);
    }

    private parseHashtagList(response: string): { hashtags: string[], textBeforeList: string } {
        const lines = response.split('\n');
        let textBeforeList = '';
        const hashtags: string[] = [];

        lines.forEach(line => {
            if (/^\d+\.\s+/.test(line)) {

                hashtags.push(line.replace(/^\d+\.\s+/, '').trim());
            } else {
                textBeforeList += line.trim() + ' ';
            }
        });

        return { hashtags, textBeforeList: textBeforeList.trim() };
    }

    public selectedChatMessages: any[] = [];
    public selectedChat: any;

    public imageRef: DynamicDialogRef | undefined;
    public ongoingChatSession: any;

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

    public userMessage: string = '';
    public isInputVisbile: boolean = false;
    public dummyChatResponses: any[] = dummyChatResponses;
    public defaultPrompts: Array<{ prompt: string }> = defaultPrompts;
    public pdfOptions: any;
    public parsedHashtags: any;
    public isListFormat: boolean = false;

    constructor(private _dialogServices: DialogService, private _chatService: ChatService) { }
    //     {
    //     userId: string,
    //         MessageId: string,// unique for every conversation and will update on new chat.
    //             TimeStamp: DateTime,
    //                 MessageHeader: string // first message to identify the chat specification
    //     chatHistroy: [{ query: string, reply: string }]
    // }

    // public selectChat(history: any): void {
    //     this.selectedChatMessages = this.chatContent.filter(
    //         content => content.chatId === history.chatId
    //     );
    //     this.isInputVisbile = true;
    //     this.selectedChat = history;
    //     console.log('this.selectedChatMessages', this.selectedChatMessages);
    // }

    // public selectChat(history: any): void {
    //     const storedHistory = JSON.parse(localStorage.getItem('chatHistory') as any) || [];
    //     const selectedChatSession = storedHistory.find(
    //         (session: any) => session.messageId === history.chatId
    //     );

    //     this.selectedChatMessages = [];
    //     console.log('selectedChatSession', selectedChatSession);

    //     if (selectedChatSession) {
    //         selectedChatSession.chatHistory.forEach((chat: any) => {
    //             this.selectedChatMessages.push({
    //                 sender: 'rhs',
    //                 message: chat.query
    //             });
    //             this.selectedChatMessages.push({
    //                 sender: 'lhs',
    //                 message: chat.reply
    //             });
    //         });

    //         this.isInputVisbile = true;
    //         this.selectedChat = history;
    //     }
    //     console.log('this.selectedChatMessages', this.selectedChatMessages);
    // }

    public selectChat(history: any): void {
        const storedHistory = JSON.parse(localStorage.getItem('chatHistory') as any) || [];
        const selectedSession = storedHistory.find((session: any) => session.messageId === history.chatId);

        if (selectedSession) {
            this.selectedChatMessages = [];

            selectedSession.chatHistory.forEach((chat: any) => {
                const parsedSegments = this.parseResponse(chat.reply);

                console.log('chat', chat.query);
                this.selectedChatMessages.push({
                    sender: 'rhs',
                    message: chat.query,
                    isListFormat: false,
                    parsedHashtags: []
                });

                this.selectedChatMessages.push({
                    sender: 'lhs',
                    messageSegments: parsedSegments,
                    isListFormat: parsedSegments.some(seg => seg.type === 'list'),
                    parsedHashtags: []
                });
            });

            this.selectedChat = history;
            this.isInputVisbile = true;
        }
    }

    public scrollToBottom(): void {
        try {
            setTimeout(() => {
                this.chatContainer.nativeElement.scrollTop = this.chatContainer?.nativeElement?.scrollHeight;
            }, 0);
        } catch (err) {
            console.error('Scroll error', err);
        }
    }

    public exportChat(): void {
        const cardElement: any = document.querySelector('.single-user-chat-content')!;
        console.log('cardElement', cardElement);

        // doc.html(pdfTable.innerHTML, 15, 15, {
        //     width: 190,
        //     'elementHandlers': specialElementHandlers
        // });

        // html2canvas(cardElement!, { useCORS: true, scale: 2, scrollY: 2, foreignObjectRendering: false }).then((canvas: any) => {
        //     const imgData = canvas.toDataURL('image/png');
        //     const pdf = new jsPDF('p', 'mm', 'a4');
        //     const pageHeight = pdf.internal.pageSize.height;
        //     const contentHeight = cardElement.scrollHeight;
        //     const imgWidth = pdf.internal.pageSize.width - 40;
        //     const imgHeight = (contentHeight * imgWidth) / cardElement.offsetWidth;
        //     let heightLeft = imgHeight;
        //     let position = 0;

        //     while (heightLeft >= 0) {
        //         pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
        //         heightLeft -= pageHeight;
        //         position -= pageHeight;
        //         if (heightLeft >= 0) {
        //             pdf.addPage();
        //         }
        //     }
        //     pdf.save('export-chat.pdf');
        // });

        // (async () => {
        //     const baseUrl =
        //         location.protocol + '//' + location.host + '/assets/';

        //     const instance: any = await PSPDFKit.load({
        //         baseUrl,
        //         document: '/assets/document.pdf',
        //         container: '#export-chat',
        //         headless: true,
        //     });
        //     console.log('instance', instance);
        // })();

        // const pages = document.querySelector('.single-user-chat-content') as HTMLElement;
        // const doc = new jsPDF({
        //     unit: 'px',
        //     format: [595, 842]
        // });

        // doc.html(pages, {
        //     callback: (doc: jsPDF) => {
        //         doc.deletePage(doc.getNumberOfPages());
        //         doc.save('export-chat.pdf');
        //     }
        // });

        const chatContainer = document.getElementById('chat-content') as HTMLElement;
        const doc = new jsPDF({
            unit: 'px',
            format: 'a4',
            orientation: 'portrait'
        });

        console.log('doc', doc.getFontList());
        console.log('doc font', doc.getFont());

        // doc.setFont('courier');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);

        doc.html(chatContainer, {
            callback: function (pdf) {
                pdf.save('chat-content.pdf');
            },
            margin: [10, 40, 10, 10],
            autoPaging: 'slice',
            x: 10,
            y: 12,
            width: 415,
            windowWidth: 950,
        });
    }

    public uploadImage(): void {
        this.showPopup = true
        // let model = {
        //     images: '',
        //     totalrecords: ''
        // };
        // this.imageRef = this._dialogServices.open(MediaUploadComponent, {
        //     header: 'Upload Media',
        //     width: '50vw',
        //     height: '70vh',
        //     modal: true,
        //     closable: true,
        //     dismissableMask: false,
        //     breakpoints: {
        //         '1023': '100%',
        //     },
        //     data: model,
        //     templates: {
        //         footer: Footer
        //     }
        // });

        console.log('this.imageRef', this.imageRef);
    }

    public Hide(event: any): void {
        console.log(event)
    }

    public newChat(): void {
        this.selectedChatMessages = [];
        this.isInputVisbile = false;
        this.loadChatHistory();
    }

    public onKeyPress(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.sendMessage(event);
        }
    }

    // public sendMessage(event: any, prompt?: string): void {
    //     const message = prompt || this.userMessage.trim();

    //     if (message || this.selectedImage?.src) {
    //         this.isLoading = true;

    //         this._chatService.sendMessage(message).subscribe((res: any) => {
    //             const chatResponse = res?.reply;

    //             this.selectedChatMessages.push({
    //                 sender: 'rhs',
    //                 message: message,
    //                 image: this.selectedImage?.src || ''
    //             });

    //             if (chatResponse) {
    //                 this.selectedChatMessages.push({
    //                     sender: 'lhs',
    //                     message: chatResponse
    //                 });
    //                 this.scrollToBottom();
    //                 // }, 200);
    //             }
    //             this.userMessage = '';
    //             this.selectedImage = '';
    //             console.log('se=nd', this.selectedChatMessages);

    //             this.resetMessageInput();
    //         }, (error: any) => {
    //             this.isLoading = false;
    //             console.error('Error sending message:', error);
    //         });
    //     }
    // }

    public onEnter() {
        console.log('called');
    }

    // private loadChatHistory(): void {
    //     const storedHistory = JSON.parse(localStorage.getItem('chatHistory') as any) || [];

    //     this.chatHistory = storedHistory.map((history: any) => ({
    //         category: history.timeStamp.split('T')[0],
    //         chats: [{
    //             chatId: history.messageId,
    //             sender: history.userId,
    //             preview: history.messageHeader
    //         }]
    //     }));
    // }

    private loadChatHistory(): void {
        const storedHistory = JSON.parse(localStorage.getItem('chatHistory') as any) || [];
        const today = new Date().toISOString().split('T')[0];

        const todayChats: any[] = [];
        const previousChats: any[] = [];

        storedHistory.forEach((history: any) => {
            const chatDate = history.timeStamp.split('T')[0];

            if (chatDate === today) {
                todayChats.push({
                    chatId: history.messageId,
                    sender: history.userId,
                    preview: history.messageHeader,
                    timeStamp: history.timeStamp
                });
            } else {
                previousChats.push({
                    chatId: history.messageId,
                    sender: history.userId,
                    preview: history.messageHeader,
                    timeStamp: history.timeStamp
                });
            }
        });

        this.chatHistory = [];

        if (todayChats.length > 0) {
            this.chatHistory.push({
                category: 'Today',
                chats: todayChats
            });
        }

        if (previousChats.length > 0) {
            this.chatHistory.push({
                category: 'Previous',
                chats: previousChats
            });
        }
    }

    private saveChatHistory(query: string, reply: string): void {
        if (!this.ongoingChatSession) {
            const currentTimestamp = new Date().toISOString();
            this.ongoingChatSession = {
                userId: 'user123',
                messageId: 'message-' + Date.now(),
                timeStamp: currentTimestamp,
                messageHeader: query.substring(0, 20),
                chatHistory: []
            };
        }

        this.ongoingChatSession.chatHistory.push({ query, reply });
        const existingHistory = JSON.parse(localStorage.getItem('chatHistory') as any) || [];
        const sessionIndex = existingHistory.findIndex(
            (history: any) => history.messageId === this.ongoingChatSession.messageId
        );

        if (sessionIndex > -1) {
            existingHistory[sessionIndex] = this.ongoingChatSession;
        } else {
            existingHistory.push(this.ongoingChatSession);
        }
        localStorage.setItem('chatHistory', JSON.stringify(existingHistory));
    }

    // public sendMessage(event: any, prompt?: string): void {
    //     const message = prompt || this.userMessage.trim();

    //     if (message || this.selectedImage?.src) {
    //         // Post user's message first (rhs)
    //         this.selectedChatMessages.push({
    //             sender: 'rhs',
    //             message: message,
    //             image: this.selectedImage?.src || ''
    //         });

    //         // Reset user input
    //         this.userMessage = '';
    //         this.selectedImage = '';

    //         // Show typing indicator after user's message is posted
    //         this.selectedChatMessages.push({
    //             sender: 'lhs',
    //             message: '',
    //             typing: true
    //         });

    //         this.isLoading = true;

    //         // Simulate API response
    //         this._chatService.sendMessage(message).subscribe((res: any) => {
    //             this.selectedChatMessages = this.selectedChatMessages.filter(msg => !msg.typing);
    //             const chatResponse = res?.reply;
    //             if (chatResponse) {
    //                 this.selectedChatMessages.push({
    //                     sender: 'lhs',
    //                     message: chatResponse
    //                 });

    //                 this.scrollToBottom();
    //             }
    //             console.log('chat', this.selectedChatMessages);

    //             this.isLoading = false;
    //         }, (error: any) => {
    //             // Handle error and remove typing indicator
    //             this.selectedChatMessages = this.selectedChatMessages.filter(msg => !msg.typing);
    //             this.isLoading = false;
    //             console.error('Error sending message:', error);
    //         });
    //     }
    // }
    plainText: any;

    private parseResponse(response: string): { type: string, content: string[] | string }[] {
        const lines = response.split('\n');
        const segments: { type: string, content: string[] | string }[] = [];
        let currentTextBlock = '';
        let currentList: string[] = [];

        lines.forEach(line => {
            if (/^\d+\.\s+/.test(line)) {
                currentList.push(line.replace(/^\d+\.\s+/, '').trim());
                if (currentTextBlock) {
                    segments.push({ type: 'text', content: currentTextBlock.trim() });
                    currentTextBlock = '';
                }
            } else {
                if (currentList.length) {
                    segments.push({ type: 'list', content: currentList });
                    currentList = [];
                }
                currentTextBlock += line + ' ';
            }
        });

        if (currentTextBlock.trim()) {
            segments.push({ type: 'text', content: currentTextBlock.trim() });
        }
        if (currentList.length) {
            segments.push({ type: 'list', content: currentList });
        }

        return segments;
    }

    public sendMessage(event: any, prompt?: string): void {
        const message = prompt || this.userMessage.trim();

        if (message || this.selectedImage?.src) {
            this.selectedChatMessages.push({
                sender: 'rhs',
                message: message,
                image: this.selectedImage?.src || '',
                isListFormat: false,
                parsedHashtags: []
            });

            this.userMessage = '';
            this.selectedImage = '';

            this.selectedChatMessages.push({
                sender: 'lhs',
                message: '',
                typing: true,
                isListFormat: false,
                parsedHashtags: []
            });

            this.isLoading = true;
            this._chatService.sendMessage(message).subscribe((res: any) => {
                this.selectedChatMessages = this.selectedChatMessages.filter(msg => !msg.typing);
                const chatResponse = res?.reply;

                let parsedSegments: any = [];

                if (chatResponse) {
                    parsedSegments = this.parseResponse(chatResponse);
                }

                if (chatResponse) {
                    this.selectedChatMessages.push({
                        sender: 'lhs',
                        messageSegments: parsedSegments
                    });
                    this.saveChatHistory(message, chatResponse);
                    this.scrollToBottom();
                }
                this.isLoading = false;
            }, (error: any) => {
                this.selectedChatMessages = this.selectedChatMessages.filter(msg => !msg.typing);
                this.isLoading = false;
                console.error('Error sending message:', error);
            });
        }
    }

    private resetMessageInput(): void {
        this.userMessage = '';
        this.selectedImage = null;
        this.isLoading = false;
    }

    public runAnalysis(): void { }

    public selectImage(selectedImage: any): void {
        this.images.forEach(image => image.selected = false);
        selectedImage.selected = true;
        // console.log('selectedImage', selectedImage);
    }

    public uploadSelectedImage(): void {
        const selectedImage = this.images.find(image => image.selected);
        console.log('selectedImage', selectedImage)
        this.selectedImage = selectedImage;
        // this.selectedChatMessages.push({
        //     sender: 'rhs',
        //     image: this.selectedImage.src,
        //     message: ''  
        //   });
        this.showPopup = false;
    }

    public removeImage() {
        this.selectedImage = null;
    }
}