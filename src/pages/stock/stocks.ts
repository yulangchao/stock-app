import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Stocks } from '../../providers/stocks';

import { TranslateService } from '@ngx-translate/core';

/**
 * The Stocks page is a simple form that syncs with a Stocks provider
 * to enable the user to customize stocks for the app.
 *
 */
@Component({
  selector: 'page-stocks',
  templateUrl: 'stocks.html'
})
export class StocksPage {
  // Our local stocks object
  options: any;

  stocksReady = false;

  form: FormGroup;

  profileStocks = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';0
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;
  private stock: Array<any> = [];

  subStocks: any = StocksPage;
  private id: string;
  constructor(public navCtrl: NavController,
    public stocks: Stocks,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService) {
    this.id = "300228";
    this.submit();
  }

  submit(){
          this.stocks.getStockById(this.id).subscribe((res) => {

            this.stock = res[0].hq;
          console.log(this.stock);
          });
  }


  ngOnChanges() {
    console.log('Ng All Changes');
  }
}
