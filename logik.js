let currDate = moment();

let dateBox;
let txtWeight;
let picture;
let file;
let btnSave;

$(document).ready(function() {
    dateBox = $('#date');
    txtWeight = $('#weight');
    picture = $('#picture');
    file = $('#file');
    btnSave = $('#btnSave');

    // Zu Beginn, soll das aktuelle Datum geladen werden.
    dateBox.attr('value', currDate.format("YYYY-MM-DD"));
    dateBox.attr('max', currDate.format("YYYY-MM-DD"));

    dateBox.change(handleDateChange);

    txtWeight.change(saveValues);
    file.change(saveValues)

    btnSave.click(saveValues);

    // Initially load date of today
    handleDateChange();    
});

function handleDateChange() {
    const value = moment(dateBox.val());
    const entryText = localStorage.getItem(value.format('YYYY-MM-DD'));
    
    loadDefaultValues();
    if (entryText) {
        const entry = JSON.parse(entryText);
        
        loadImageTo(entry.image);
        document.getElementById("weight").value = entry.weight;
    }
}

function handleFileChange(event) {
    const input = event.target;

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const entryData = JSON.stringify({ image: e.target.result, weight: txtWeight.val() });
            localStorage.setItem(currDate.format("YYYY-MM-DD"), entryData);

            loadImageTo(e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function loadImageTo(image) {
    $('#picture').attr('src', image);
}

function loadDefaultValues() {
    document.getElementById("weight").value = "";
    $('#picture').attr('src', "./Images/default-placeholder.png");
}

function saveValues(event) {
    const input = event.target;
console.log(event.target);
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const entryData = JSON.stringify({ image: e.target.result, weight: txtWeight.val() });
            localStorage.setItem(moment(dateBox.val()).format('YYYY-MM-DD'), entryData);

            loadImageTo(e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function checkValues() {

}

function createGraph() {

}

function createCollage() {

}