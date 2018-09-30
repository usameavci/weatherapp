import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SpinnerComponent ],
    exports: [ SpinnerComponent ]
})

export class SpinnerModule {}
