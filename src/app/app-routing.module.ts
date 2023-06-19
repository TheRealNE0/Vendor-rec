import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
