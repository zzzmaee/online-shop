import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProducts } from '../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products!: IProducts[];
  public productSubscription!: Subscription;
  public canEdit: boolean = false;
  public canView: boolean = false;

  constructor(private productsService: ProductsService, private dialog: MatDialog) {
  }

  updateData(product: IPrgoducts) {
    this.productsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
        if (product.id === data.id) {
          return data;
        } else {
          return product;
        }
      });
    });
  };

  ngOnInit() {
    this.canEdit = true;

    this.productSubscription = this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.id) {
        this.updateData(data);
      } else {
        this.postData(data);
      }
    });
  }

  postData(data: IProducts) {
    this.productsService.postProduct(data).subscribe((data) => {
      this.products.push(data);
    });
  }

  deleteItem(id: number) {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.products.find((item) => {
        if (id === item.id) {
          this.products.splice(id, 1);
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
}
