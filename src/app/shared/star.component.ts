import {Component, OnChanges, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']

})

export class StarComponent implements OnChanges {
    starWidth: number;
    @Input() rating: number;
    @Input() mainText: string;
    @Output() notify: EventEmitter<string> =
                        new EventEmitter<string>();

    onClick() {
        this.notify.emit(this.rating + ' stars');
    }

    ngOnChanges(): void {
        this.starWidth = this.rating * 86/5;
        console.log("Got here = " + this.rating + " - " + this.mainText)
    }
}