import { CommonModule } from '@angular/common';
import { Component, Signal, effect, Input } from '@angular/core';
import { User } from '../../../shared/models/User';

@Component({
    selector: 'app-contact-details',
    standalone: true,
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss'],
    imports: [
        CommonModule
    ]
})
export class ContactDetailsComponent {
    @Input() userSignal!: Signal<User | null>;

    user: User | null = null;
    multimediaCount = 0;

    setStatus(status: string) {
        console.log(`Estado de conversación marcado como: ${status}`);
    }

    constructor() {
        effect(() => {
            this.user = this.userSignal ? this.userSignal() : null;
        });
    }
}
