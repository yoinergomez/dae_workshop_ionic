import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MercadoLibreApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MercadoLibreApiProvider {


  constructor(public http: Http) { }

  searchItem(item: string) {
    return new Promise((resolve, reject) => {
      let URL: string = "https://api.mercadolibre.com/sites/MCO/search?q="+item
      this.http.get(URL).map(res => res.json()).subscribe(
        (response) => {
          //resolve(response.results)
          resolve(this.resizePictures(response))
        },
        (error) => {
          reject("Error searchItem: " + error)
        })
    })
  }

  private resizePictures(response: any) {
    var result = response.results

    for (let item of result) {
      item.thumbnail = item.thumbnail.replace('-I', '-O')
    }

    return result
  }

  autosuggestItems(query: string) {
    let URL = 'https://api.mercadolibre.com/sites/MCO/autosuggest?limit=6&q='+query
    return new Promise((resolve, reject) => {
      this.http.get(URL).map(res => res.json()).subscribe(
        (data) => {
          resolve(data.suggested_queries)
        },
        (error) => {
          reject("Error: " + error)
        })
    })
  }
}
