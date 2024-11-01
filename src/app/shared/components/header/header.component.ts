import { Component, HostListener } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [
        CommonModule
    ]
})
export class HeaderComponent {
    showOptions = false;
    isMobile = false;

    constructor(private themeService: ThemeService) {
        this.checkMobile();
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleMenu() {
        this.showOptions = !this.showOptions;

    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.checkMobile();
    }

    private checkMobile() {
        this.isMobile = window.innerWidth < 768;
    }
}
