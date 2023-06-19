import {Component, Input} from '@angular/core';
import {Image} from "../../../../../shared/models/Image";

@Component({
  selector: 'app-spring-collection',
  templateUrl: './spring-collection.component.html',
  styleUrls: ['./spring-collection.component.scss']
})
export class SpringCollectionComponent {

  //region Properties

  @Input() collectionList: Image[];

  //endregion

}
