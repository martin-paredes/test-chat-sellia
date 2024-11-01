import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchTerm: string): any[] {
        if (!items) return [];
        if (!searchTerm) return items;

        searchTerm = searchTerm.toLowerCase();
        return items.filter(item =>
            (item.name && item.name.toLowerCase().includes(searchTerm)) ||
            (item.number && item.number.includes(searchTerm)) ||
            (item.message && item.message.toLowerCase().includes(searchTerm))
        );
    }
}
