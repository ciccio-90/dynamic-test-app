import { Compiler, Component, ComponentRef, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { UIModule } from './ui/ui.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dynamic-test-app';
  componentRef: ComponentRef<any> | undefined;

  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef | undefined;

  constructor(private _compiler: Compiler) {
  }

  ngAfterViewInit() {
    const template = '<text [text]="message"></text><header></header>';
    const dynamicComponentClass = Component({ template: template })(DynamicComponent);
    const dynamicModuleClass = NgModule({ imports: [UIModule], declarations: [dynamicComponentClass] })(DynamicModule);
    const factories = this._compiler.compileModuleAndAllComponentsSync(dynamicModuleClass);
    const dynamicComponentFactory = factories.componentFactories[0];

    if (this.vc) {
      this.componentRef = (<ViewContainerRef>this.vc).createComponent(dynamicComponentFactory);
      this.componentRef.instance.message = 'Text & Header components generated on the fly!';
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}

class DynamicComponent {
  message: string;

  constructor() {
    this.message = ''
  }
}

class DynamicModule {
  constructor() {}
}
