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

  constructor(public navCtrl: NavController, public mcAPI: MercadoLibreApiProvider) {
    this.searchItem('led');
  }

  searchItem(itemName: string) {
    this.mcAPI.searchItem(itemName).then((response) => {
      this.items = response
    })
  }

  autosuggestItems() {
    console.log(this.query);

    let val = this.query;
    if (val && val.trim() !== '') {
      this.mcAPI.autosuggestItems(this.query).then((response) => {
        console.log(response);
        this.suggestItems = response
      })
    }
  }
}
