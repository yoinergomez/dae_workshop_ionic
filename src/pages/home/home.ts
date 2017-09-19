import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MercadoLibreApiProvider } from "../../providers/mercado-libre-api/mercado-libre-api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {

  query: string;
  items: any
  suggestItems: any
  showList : boolean

  constructor(public navCtrl: NavController, public mcAPI: MercadoLibreApiProvider) {
    this.searchItem('led');
    this.showList = true
  }

  searchItem(itemName: string) {
    this.showList = false
    this.query = itemName
    this.mcAPI.searchItem(itemName).then((response) => {
      this.items = response
    })
  }

  autosuggestItems() {
    let val = this.query
    this.showList = true
    if (val && val.trim() !== '') {
      this.mcAPI.autosuggestItems(this.query).then((response) => {
        this.suggestItems = response
      })
    } else {     
      this.showList = false
    }
  }
}
