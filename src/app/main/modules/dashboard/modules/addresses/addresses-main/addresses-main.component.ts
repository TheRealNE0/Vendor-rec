import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddressCard } from "../../../models/address-card";

@Component({
  selector: "app-addresses-main",
  templateUrl: "./addresses-main.component.html",
  styleUrls: ["./addresses-main.component.scss"],
  host: { "style": "width:100%" }
})
export class AddressesMainComponent implements OnInit {
  //region Properties
  addressesForm: FormGroup;
  public readonly formKeys = {
    id: "id",
    address: "address",
    city: "city",
    receiverName: "receiverName"
  };
  addressList: AddressCard[] = [
    {
      id: this._getUid(),
      destination: { address: "1620 East Ayre Str Suite M3115662 Wilmington", city: "DE 19804 United States" },
      receiverName: "John Doe"
    },
    {
      id: this._getUid(),
      destination: { address: "1620 East Ayre Str Suite M3115662 Wilmington", city: "DE 19804 United States" },
      receiverName: "Jane Doe"
    }];

  //endregion

  constructor(private _formBuilder: FormBuilder) {
  }

  //region Lifecycle methods
  ngOnInit(): void {
    this.addressesForm = this._addressesFormInit();
  }

  // endregion

  //region Handler methods

  public onClickSubmitHandler(): void {
    const addressCard: AddressCard = this._convertFormValueToCard();
    if (this._cardExists(addressCard.id)) {
      const sourceCard = this._getCardByID(addressCard.id);
      this._replaceAddressCardValue(sourceCard, addressCard);
    } else this.addressList.push(addressCard);

    this.addressesForm.reset();
    // console.log(finalObject);
  }

  public onClickEditCardHandler(cardId: number): void {
    const card = this._getCardByID(cardId);
    this._fillTheForm(card);
  }

  public onClickDeleteCardHandler(cardId: number): void {
    const cardIndex = this.addressList.findIndex(card => card.id === cardId);
    this.addressList.splice(cardIndex, 1);
  }

  //endregion

  //region Main Logic methods
  private _addressesFormInit(): FormGroup {
    return this._formBuilder.group({

      [this.formKeys.id]: [""],
      [this.formKeys.address]: ["", [Validators.required]],
      [this.formKeys.city]: ["", [Validators.required]],
      [this.formKeys.receiverName]: ["", [Validators.required]]

    });
  }

  private _getCardByID(cardId: number): AddressCard {
    return this.addressList.find(card => card.id === cardId);
  }


  private _getUid(): number {
    return Math.floor(Math.random() * 100000000);
  }

  private _fillTheForm(card: AddressCard): void {

    this.addressesForm.patchValue({
      [this.formKeys.id]: card.id,
      [this.formKeys.address]: card.destination.address,
      [this.formKeys.city]: card.destination.city,
      [this.formKeys.receiverName]: card.receiverName

    });

  }

  private _cardExists(cardId: number): boolean {
    return !!this._getCardByID(cardId);
  }

  private _replaceAddressCardValue(sourceCard: AddressCard, targetCard: AddressCard): void {
    sourceCard.receiverName = targetCard.receiverName;
    sourceCard.destination.address = targetCard.destination.address;
    sourceCard.destination.city = targetCard.destination.city;
  }

  //endregion

  //region Helper methods
  private _convertFormValueToCard(): AddressCard {
    const formValue = this.addressesForm.value;
    return {
      id: (formValue[this.formKeys.id] === "") ? this._getUid() : formValue[this.formKeys.id],
      receiverName: formValue[this.formKeys.receiverName],
      destination: { address: formValue[this.formKeys.address], city: formValue[this.formKeys.city] }
    };
  }

  //endregion
}
