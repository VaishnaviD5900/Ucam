import { Pipe, PipeTransform } from '@angular/core';
//import { vehicle } from '../Features/numberPlate/numberplate/numberplate.component';
@Pipe({
name: 'filter'
})
export class FilterPipe implements PipeTransform {
transform(items: any[], searchText: string):any[] {
if(!items) return [];
if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
return it.date.toLowerCase().includes(searchText) || it.location.toLowerCase().includes(searchText) || it.vehicle_number.toLowerCase().includes(searchText);
});
}
}
