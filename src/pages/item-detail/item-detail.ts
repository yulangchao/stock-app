import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';
import { Stocks } from '../../providers/stocks';
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  multi = [
        // {
        //   "name": "6",
        //   "series": [
        //   ]
        // },

        // {
        //   "name": "12",
        //   "series": [
        //   ]
        // },

        {
          "name": "24",
          "series": [
          ]
        }
  ];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'RSI';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;


  item: any;
  currentRSI :any;
  private stock: Array<any> = [];
  private initRSI1 = 34.65 //for 5.22
  private initRSI2 = 26.76 //for 5.23

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public stocks: Stocks) {

    this.item = navParams.get('item') || items.defaultItem;
    stocks.getStockById(this.item.name).subscribe((res) => {
            this.stock = res[0].hq;
            this.getRSI();
            this.getChart();
    });
  }

  getChart(){
      // for(let s of this.stock.splice(0,3)) {
      //  this.multi[0].series.push({"name": s[0] , "value": s[10]});
      // }

this.multi[0].series.push({"name": 1 , "value": 2});

      console.log(this.multi);


      // this.multi = [
      //   // {
      //   //   "name": "6",
      //   //   "series": [
      //   //     {
      //   //       "name": "2010",
      //   //       "value": 7300000
      //   //     },
      //   //     {
      //   //       "name": "2011",
      //   //       "value": 8940000
      //   //     },
      //   //     {
      //   //       "name": "2012",
      //   //       "value": 8940000
      //   //     }
      //   //   ]
      //   // },

      //   // {
      //   //   "name": "12",
      //   //   "series": [
      //   //     {
      //   //       "name": "2010",
      //   //       "value": 7870000
      //   //     },
      //   //     {
      //   //       "name": "2011",
      //   //       "value": 8270000
      //   //     }
      //   //   ]
      //   // },

      //   {
      //     "name": "24",
      //     "series": [
      //       {
      //         "name": "2010",
      //         "value": 5000002
      //       },
      //       {
      //         "name": "2011",
      //         "value": 5800000
      //       }
      //     ]
      //   }
      // ];
  }

  onSelect(event) {
    console.log(event);
  }


  getRSI(){
    let x = this.initRSI1/(100-this.initRSI1);
    let y = this.initRSI2/(100-this.initRSI2);
    console.log(x + ":" + y);
    let add_x = parseFloat(this.stock.reverse()[1][3]);
    console.log(add_x);
    let al;
    let ag;
    let i = 0 ;
    if (add_x > 0){
      al = add_x/5/(y-x);
      ag = al*x;
    }else {
      al = add_x*y/5/(y-x);
      ag = al*x;
    }
    console.log(al + ":" + ag);
    console.log(100-100/(1+ag/al));
    console.log(100-100/(1+(ag*5)/(al*5-add_x)));
    for(let s of this.stock) {
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
