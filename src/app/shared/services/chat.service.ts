import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { clientes, mensajesCliente1, mensajesCliente2 } from '../utils/urls';
import { User } from '../models/User';
import { ChatMessage } from '../models/ChatMessage';


@Injectable({
    providedIn: 'root',
})
export class ChatService {
    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(clientes);
    }

    getMsgUsers(userId: number): Observable<ChatMessage[]> {
        return this.http.get<ChatMessage[]>(`${userId === 1 ? mensajesCliente1 : mensajesCliente2}`);
    }
}
