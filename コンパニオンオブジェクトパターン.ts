type Unit = 'EUR' | 'GBP' | 'JPY' | 'USD';
type Currency = { unit: Unit; value: number };
let Currency = {
  from(value: number, unit: Unit): Currency {
    return {
      unit: unit,
      value,
    };
  },
};

let amountDue: Currency = {
  // Currencyを型として使用する
  unit: 'JPY',
  value: 789069,
};
let otherAmountDue = Currency.from(330, 'EUR'); // Currencyを値として使用する

// 名前的に型付けする場合に有効だが多くの場合ではやりすぎ
type CompanyID = string & { readonly brand: unique symbol };
type OrderID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
type ID = CompanyID | OrderID | UserID;

function CompanyID(id: string) {
  return id as CompanyID;
}

function OrderID(id: string) {
  return id as OrderID;
}

function UserID(id: string) {
  return id as UserID;
}

function queryForUser(id: UserID) {
  // ...
  return id;
}

let companyId = CompanyID('8a6076cf');
let orderId = OrderID('9994acc1');
let userId = UserID('d21b1dbf');

queryForUser(userId);
queryForUser(orderId);
