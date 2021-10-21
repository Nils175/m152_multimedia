let currDate = moment();

let dateBox;
let txtWeight;
let picture;
let file;

$(document).ready(function() {
    let btnSave = $('#btnSave');

    dateBox = $('#date');
    txtWeight = $('#weight');
    picture = $('#picture');
    file = $('#file');

    // Zu Beginn, soll das aktuelle Datum geladen werden.
    dateBox.attr('value', currDate.format("YYYY-MM-DD"));
    dateBox.attr('max', currDate.format("YYYY-MM-DD"));


    // btnSave.click(function() {
    //     save();
    // });

    dateBox.change(handleDateChange);
    file.change(handleFileChange)

    // Initially load date of today
    handleDateChange();    
});

function handleDateChange() {
    console.log(dateBox);
    const value = moment(dateBox.val());
    const entryText = localStorage.getItem(value.format('YYYY-MM-DD'));
    
    if (entryText) {
        const entry = JSON.parse(entryText);
        
        loadImageTo(entry.image);
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

function save() {
    checkValues();
    database.save();
}

function checkValues() {

}

function createGraph() {

}

function createCollage() {

}