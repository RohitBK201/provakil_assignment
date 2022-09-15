function calculate_subscription(expiry_date, months_to_buy, monthly_cost) {
  let expiry = datesplit(expiry_date);

  let pvt = chk(expiry[0]);

  let mnth = 1;

  if (expiry[1] == 2) {
    if (expiry[2] % 4 == 0) {
      mnth = 3;
    } else {
      mnth = 2;
    }
  }

  if (expiry[1] % 2 == 0) {
    mnth = 0;
  }

  //manking new expiry date

  let new_expiry_date;

  if (pvt == 0) {
    new_expiry_date = 1;
  } else {
    new_expiry_date = 15;
  }

  let new_expiry_mnth;

  let mth = expiry[1] + months_to_buy;

  if (mth > 12) {
    expiry[2] = expiry[2] + Math.floor(mth / 12);
  }
  mth = mth % 12;

  new_expiry_mnth = mth;

  let nw = `${new_expiry_date}/${new_expiry_mnth}/${expiry[2]}`;

  console.log(`new_date - ${nw}`);

  //pricing

  var price_1st_month = getprice(expiry[0], pvt, mnth, monthly_cost);

  if (months_to_buy === 1) {
    console.log(`Price - ${price_1st_month}`);
    return;
  }

  let rest_mnth = months_to_buy - 1;

  let price_rest_mnth = rest_mnth * monthly_cost;

  let total = price_1st_month + price_rest_mnth;

  console.log(`Price - ${total}`);
}

//function to split date into day month year and return an array
function datesplit(date) {
  let arr = [];

  let bag = "";

  for (let i = 0; i < date.length; i++) {
    if (date[i] == "/") {
      arr.push(+bag);
      bag = "";
    } else {
      bag += date[i];
    }
  }

  arr.push(+bag);

  return arr;
}

//to check if day is closer to 1 or 15
function chk(num) {
  if (num <= 11) {
    return 0;
  }

  if (num > 11) {
    return 1;
  }
}

//getting price for the first month according to the number of days in a month
function getprice(num, pvt, mnth, monthly_cost) {
  let one_day = monthly_cost / 30;

  let days;

  if (mnth == 0) {
    days = 30 - num;
  }
  if (mnth == 2) {
    days = 28 - num;
  }
  if (mnth == 3) {
    days = 29 - num;
  }
  if (mnth == 1) {
    days = 31 - num;
  }

  if (pvt == 1) {
    days += 15;
  }

  let price = days * one_day;

  return price;
}

calculate_subscription("19/06/2022", 1, 1000);
