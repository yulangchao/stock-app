import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';
import { Stocks } from '../../providers/stocks';
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  currentRSI :any;
  private stock: Array<any> = [];
  private initRSI = 34.65 //for 5.22
  private init2RSI = 26.76 //for 5.23
  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public stocks: Stocks) {
    this.item = navParams.get('item') || items.defaultItem;
    stocks.getStockById(this.item.name).subscribe((res) => {

            this.stock = res[0].hq;
    });
  }

  getRSI(){
    let x = this.initRSI/(100-this.initRSI);
    let y = this.init2RSI/(100-this.init2RSI);
    console.log(this.stock.reverse()[1]);
    let add_x = parseFloat(this.stock.reverse()[1][3]);
    let al;
    let ag;
    let i = 0 ;
    if (add_x > 0){
      al = add_x/5/(x-y);
      ag = al*x;
    }else {
      al = add_x*y/5/(x-y);
      ag = al*x;
    }
    console.log(al + ":" + ag);
    console.log(100-100/(1+ag/al));
    for(let s of this.stock.reverse()) {
         if (i == 0){
         s[10] = 100-100/(1+ag/al);
         } else {
           if (parseFloat(s[3]) > 0){
             ag = (ag * 5 + parseFloat(s[3]))/6;
             al = al * 5 / 6;
           } else {
             ag = ag * 5 / 6;
             al = (al * 5 - parseFloat(s[3]))/6;
           }
           s[10] = 100-100/(1+ag/al);
         }
      i++;
    }
    console.log(this.stock);
  }

}
