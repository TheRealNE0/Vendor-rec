import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PaymentCard } from "../../../models/payment-card";

@Component({
  selector: "app-payments-main",
  templateUrl: "./payments-main.component.html",
  styleUrls: ["./payments-main.component.scss"],
  host: { "style": "width:100%" }
})
export class PaymentsMainComponent implements OnInit {
  //region Properties
  public readonly formKeys = {
    id: "id",
    cardNumber: "cardNumber",
    name: "name",
    month: "month",
    year: "year",
    type: "type"
  };
  public paymentForm: FormGroup;
  public paymentList: PaymentCard[] = [
    {
      id: this._getUid(),
      type: "Visa",
      name: "John Doe",
      date: { month: "03", year: "2027" },
      cardNumber: "5160 5294 4256 8377"
    },
    {
      id: this._getUid(),
      type: "PayPal",
      name: "Jane Doe",
      date: { month: "03", year: "2027" },
      cardNumber: "5132 9517 2490 6635"
    }
  ];

  //endregion

  constructor(private _formBuilder: FormBuilder) {
  }

  //region Lifecycle methods
  ngOnInit(): void {
    this.paymentForm = this._paymentFormInit();
  }

  //endregion

  //region Handler methods
  public onClickSubmitHandler(): void {
    const paymentCard: PaymentCard = this._convertFormValueToCard();
    if (this._cardExists(paymentCard.id)) {
      const sourceCard = this._getCardByID(paymentCard.id);
      this._replacePaymentCardValue(sourceCard, paymentCard);
    } else this.paymentList.push(paymentCard);

    this.paymentForm.reset();
    // console.log(finalObject);
  }

  public onClickEditCardHandler(cardId: number): void {
    const card = this._getCardByID(cardId);
    this._fillTheForm(card);
  }

  public onClickDeleteCardHandler(cardId: number): void {
    const cardIndex = this.paymentList.findIndex(card => card.id === cardId);
    this.paymentList.splice(cardIndex, 1);
  }

  //endregion

  //region Main logic methods
  private _getUid(): number {
    return Math.floor(Math.random() * 100000000);
  }

  private _paymentFormInit(): FormGroup {
    return this._formBuilder.group({
      [this.formKeys.id]: [""],
      [this.formKeys.cardNumber]: ["", [Validators.required]],
      [this.formKeys.name]: ["", [Validators.required]],
      [this.formKeys.type]: ["", [Validators.required]],
      [this.formKeys.year]: ["", [Validators.required]],
      [this.formKeys.month]: ["", [Validators.required]]
    });
  }

  private _fillTheForm(card: PaymentCard): void {

    this.paymentForm.patchValue({
      [this.formKeys.id]: card.id,
      [this.formKeys.cardNumber]: card.cardNumber,
      [this.formKeys.name]: card.name,
      [this.formKeys.type]: card.type,
      [this.formKeys.year]: card.date.year,
      [this.formKeys.month]: parseInt(card.date.month, 10)
    });

  }

  private _cardExists(cardId: number): boolean {
    return !!this._getCardByID(cardId);
  }

  private _getCardByID(cardId: number): PaymentCard {
    return this.paymentList.find(card => card.id === cardId);
  }

  private _replacePaymentCardValue(sourceCard: PaymentCard, targetCard: PaymentCard): void {
    sourceCard.type = targetCard.type;
    sourceCard.name = targetCard.name;
    sourceCard.cardNumber = targetCard.cardNumber;
    sourceCard.date.month = targetCard.date.month;
    sourceCard.date.year = targetCard.date.year;
  }

  //endregion

  //region Helper methods
  private _convertFormValueToCard(): PaymentCard {
    const formValue = this.paymentForm.value;
    return {
      id: (formValue[this.formKeys.id] === "") ? this._getUid() : formValue[this.formKeys.id],
      type: formValue[this.formKeys.type],
      cardNumber: formValue[this.formKeys.cardNumber],
      date: {
        month: String(String(formValue[this.formKeys.month]).padStart(2, "0")),
        year: String(formValue[this.formKeys.year])
      },
      name: formValue[this.formKeys.name]
    };
  }

  //endregion

}
