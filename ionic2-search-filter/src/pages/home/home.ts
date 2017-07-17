import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    searchTerm: string = '';
    searchControl: FormControl;
    items: any;
    searching: any = false; // to determine if to show spinner in html

  constructor(public navCtrl: NavController, public dataService: DataProvider) {
      this.searchControl = new FormControl();
  }

    ionViewDidLoad() {
        this.setFilteredItems();
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => { // search every 700 ms
            this.searching = false;
            this.setFilteredItems();
        });
    }

    onSearchInput(){
        this.searching = true;
    }
 
    setFilteredItems() {
        this.items = this.dataService.filterItems(this.searchTerm);
    }

}
