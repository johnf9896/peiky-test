import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Store, StoreDialogData } from '../models/store.model';
import { MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { CreateEditStoreDialogComponent } from './create-edit-store.dialog';
import { DeleteStoreDialogComponent } from './delete-store.dialog';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Store>;
  displayedColumns = ['id', 'name', 'address', 'options'];
  stores: Store[];

  constructor(
    private storeService: StoreService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.stores = [];
  }

  ngOnInit() {
    this.loadStores();
  }

  loadStores() {
    this.storeService.getStores()
    .then(stores => {
      this.stores = stores;
      this.dataSource = new MatTableDataSource(this.stores);
      this.dataSource.sort = this.sort;
    })
    .catch((error: string) => {
      this.snackBar.open(`Error: ${error}`, '', {
        duration: 2000
      });
    });
  }

  addStore() {
    const dialogRef = this.dialog.open(CreateEditStoreDialogComponent, {
      width: '300px',
      data: {editMode: false} as StoreDialogData
    });

    dialogRef.afterClosed().subscribe((data: StoreDialogData) => {
      if (data) {
        this.storeService.createStore(data.store)
        .then(() => {
          this.loadStores();
        })
        .catch((error: string) => {
          this.snackBar.open(`Error: ${error}`, '', {
            duration: 2000
          });
        });
      }
    });
  }

  editStore(store: Store) {
    const dialogRef = this.dialog.open(CreateEditStoreDialogComponent, {
      width: '300px',
      data: {editMode: true, store: store} as StoreDialogData
    });

    dialogRef.afterClosed().subscribe((data: StoreDialogData) => {
      if (data) {
        this.storeService.updateStore(data.store)
        .then(() => {
          this.loadStores();
        })
        .catch((error: string) => {
          this.snackBar.open(`Error: ${error}`, '', {
            duration: 2000
          });
        });
      }
    });
  }

  deleteStore(store: Store) {
    const dialogRef = this.dialog.open(DeleteStoreDialogComponent, {
      width: '300px',
      data: store
    });

    dialogRef.afterClosed().subscribe((storeToDelete: Store) => {
      if (storeToDelete) {
        this.storeService.deleteStore(storeToDelete)
        .then(() => {
          this.loadStores();
        })
        .catch((error: string) => {
          this.snackBar.open(`Error: ${error}`, '', {
            duration: 2000
          });
        });
      }
    });
  }

}
