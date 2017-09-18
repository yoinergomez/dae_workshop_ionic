import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MercadoLibreApiProvider } from "../../providers/mercado-libre-api/mercado-libre-api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any

  constructor(public navCtrl: NavController, public mcAPI: MercadoLibreApiProvider) {
    this.searchItem('led');
  }

  searchItem(itemName: string) {
    this.mcAPI.searchItem(itemName).then((response) => {
      this.items = response
    })
  }
}
