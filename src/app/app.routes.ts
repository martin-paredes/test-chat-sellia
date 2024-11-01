import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './features/chat/chat.component';

export const  routes: Routes = [
    { path: 'hey-center', component: ChatComponent },
    { path: '**', redirectTo: 'hey-center' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
