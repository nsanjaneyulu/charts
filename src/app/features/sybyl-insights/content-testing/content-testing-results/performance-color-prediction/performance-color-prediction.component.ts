import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    selector: 'sibyl-performance-prediction',
    templateUrl: './performance-color-prediction.component.html',
    imports: [
        CardModule,
        DividerModule,
        CommonModule,
        ButtonModule,
        MeterGroupModule,
        TagModule,
    ],
    styleUrls: ['./performance-color-prediction.component.scss'],
    standalone: true,
})

export class PerformancePredictionComponent implements OnInit {

    public dominantValue: any;
    public secondaryValue: any;
    @Input() predictionData: any;
    // @Input() performance: any;
    // @Input() dominantValue: any;
    // @Input() secondaryValue: any;

    public performance: any;

    constructor() {
        this.dominantValue = [
            { label: '', color: '#4C5F32', value: 40 },
            { label: '', color: '#45370F', value: 20 },
            { label: '', color: '#CDE5FD', value: 40 },
        ];
        this.secondaryValue = [
            { label: '', color: '#74AE25', value: 40 },
            { label: '', color: '#863A24', value: 20 },
            { label: '', color: '#AA9328', value: 20 },
            { label: '', color: '#4AC996', value: 20 }
        ];
    }

    public transform(value: number): string {
        if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + 'M';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'k';
        } else {
            return value.toString();
        }
    }
    
    ngOnInit() {
        // setTimeout(() => {
        if (this.predictionData) {
            this.performance = [
                { label: 'Likes', value: this.transform(this.predictionData.likes) || '' },
                { label: 'Engagement Rate', value: this.predictionData.engagementRate || '' },
                { label: 'Reach', value: this.transform(this.predictionData.reach) || '' }
            ];
            this.dominantValue = this.predictionData.colorCodes.dominant.map((item: any) => ({
                label: '',
                color: item.color,
                value: item.value
            }));
            this.secondaryValue = this.predictionData.colorCodes.secondary.map((item: any) => ({
                label: '',
                color: item.color,
                value: item.value
            }));
        }
        // }, 3000);
    }
}