var billAmount = document.querySelector("#bill-amount");
var cashGiven = document.querySelector("#cash-given");
var submitBtn = document.querySelector("#submit");
var output = document.querySelector("#output");
var outputTable = document.querySelector("#output-table");
var change = {};

var denominationValues = [2000, 500, 100, 20, 10, 5, 1];
var denominationTypes = [
  "Two Thousand",
  "Five Hundred",
  "Hundred",
  "Twenty",
  "Ten",
  "Five",
  "One"
];

function validate(event) {
  if (event.target.value.length > 0) {
    cashGiven.type = "number";
  } else {
    cashGiven.type = "hidden";
  }
}

function displayChange() {
  output.innerText = "";
  outputTable.innerHTML = ``;

  var returnValue = cashGiven.value - billAmount.value;
  var changeAmount = returnValue;
  var amount;
  var outputString = "";
  var outputString1 = `
    <table>
    <tr>
      <td>DENOMINATION</td>
      <td>NO. OF NOTES</td>
    </tr>`;

  if (cashGiven.value < billAmount.value) {
    output.innerText = "Insufficient cash";
  } else if (cashGiven.value === billAmount.value) {
    output.innerText = "Thanks for paying the exact bill amount!";
  } else if (cashGiven.value > billAmount.value) {
    for (let i = 0; i < denominationValues.length; i++) {
      amount = Math.floor(returnValue / denominationValues[i]);
      if (amount > 0) {
        change[denominationTypes[i]] = amount;
        returnValue = returnValue % denominationValues[i];
      }
    }

    output.innerText =
      "💸 CASH TO RETURN = " + changeAmount + "\n" + outputString;

    Object.keys(change).forEach((e) => {
      outputString1 =
        outputString1 +
        `<tr>
        <td>${e}</td>
        <td>${change[e]}</td>
       </tr>`;
    });

    outputString1 = outputString1 + `</table>`;
    outputTable.innerHTML = outputString1;
  }
}

billAmount.addEventListener("input", validate);

submitBtn.addEventListener("click", displayChange);
