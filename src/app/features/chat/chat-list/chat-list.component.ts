import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { ChatService } from '../../../shared/services/chat.service'
import { User } from '../../../shared/models/User';

interface Historial {
    date: string;
    action: string;
}

@Component({
    selector: 'app-chat-list',
    standalone: true,
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss'],
    imports: [
        CommonModule,
        SharedModule,
    ]
})
export class ChatListComponent implements OnInit {
    @Output() userSelected = new EventEmitter<any>();

    searchTerm: string = '';
    activeTab: string = 'chats';
    selectedChat: User | null = null;

    chats: User[] = [];

    historials: Historial[] = [
        { date: '2024-10-30', action: 'Mensaje enviado' },
        { date: '2024-10-29', action: 'Mensaje leído' }
    ];

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.chatService.getUsers().subscribe((data) => {
            this.chats = data;
            this.chats.forEach((item: User, index: number) => {
                item.phone = index % 2 ? '+521330033003' : '+525517239045';
                item.message = index % 2 ? 'Buen día' : 'Hola';
                item.time = index % 2 ? 'hace 8 minutos' : 'hace 10 minutos';
                item.status = index % 2 === 0;
            });
            if (this.chats.length > 0) {
                this.selectUser(this.chats[0])
            }
        });
    }

    selectTab(tab: string) {
        this.activeTab = tab;
    }

    selectUser(user: User) {
        this.selectedChat = user;
        this.userSelected.emit(user);
    }

    get filteredChats() {
        if (!this.searchTerm) return this.chats;
        return this.chats.filter(chat =>
            (chat.name && chat.name.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
            (chat.phone && chat.phone.includes(this.searchTerm)) ||
            (chat.message && chat.message.toLowerCase().includes(this.searchTerm.toLowerCase()))
        );
    }
}
