import { Component, HostListener, WritableSignal, signal } from '@angular/core';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { User } from '../../shared/models/User';

@Component({
    selector: 'app-chat',
    standalone: true,
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    imports: [
        ContactDetailsComponent,
        ChatWindowComponent,
        ChatListComponent,
        HeaderComponent,
        CommonModule,
    ]
})
export class ChatComponent {
    isMobile: boolean = false;
    
    selectedUserSignal: WritableSignal<User | null> = signal(null);
    selectedTab: 'users' | 'chat' | 'details' = 'users';

    ngOnInit() {
        this.checkIfMobile();
    }

    @HostListener('window:resize', [])
    onResize() {
        this.checkIfMobile();
    }

    checkIfMobile() {
        this.isMobile = window.matchMedia('(max-width: 768px)').matches;
    }

    selectUser(user: any) {
        this.selectedUserSignal.set(user);
        // this.selectedTab = 'chat';
    }
}
