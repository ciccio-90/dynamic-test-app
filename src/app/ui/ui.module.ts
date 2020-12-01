import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';

import { TextComponent } from './text/text.component';

@NgModule({
  imports: [],
  exports: [TextComponent, HeaderComponent],
  declarations: [TextComponent, HeaderComponent],
  providers: [],
})
export class UIModule { }
