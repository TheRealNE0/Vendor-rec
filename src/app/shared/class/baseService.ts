import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {BaseEntity} from "../models/BaseEntity";

export class BaseService <T extends BaseEntity> {
  protected baseUrl = "http://localhost:3000/";

  //todo is it right to use protected on url in constructor
  constructor(protected http: HttpClient, url: string) {
    this._setUrl(url)
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl)
  }

  public getById(id: number): Observable<T> {
    return this.getAll().pipe(map(data => data.find(d =>d.id === id)))
  }

  private _setUrl(url: string) {
    this.baseUrl += url
  }
}
