let currDate = moment();

let dateBox;
let txtWeight;
let file;
let dateBoxVon
let dateBoxBis

let newFileSrc = "";
let newWeight = "";

const defaultImage = "./Images/default-placeholder.png";

$(document).ready(function() {
    let btnSave = $('#btnSave');
    let btnCreateGraph = $('#btnCreateGraph');
    let btnCreateCollage = $('#btnCreateCollage');
    let btnShowDataExportGraph = $("#btnShowDataExportGraph");
    let btnShowDataExportCollage = $("#btnShowDataExportCollage");
    let btnSwitchToErfassen = $("#btnSwitchToErfassen");
    
    dateBox = $('#date');
    txtWeight = $('#weight');
    file = $('#file');
    dateBoxVon = $('#dateVon');
    dateBoxBis = $('#dateBis');

    // Zu Beginn, soll das aktuelle Datum geladen werden.
    dateBox.attr('value', currDate.format("YYYY-MM-DD"));
    dateBox.attr('max', currDate.format("YYYY-MM-DD"));

    dateBoxVon.attr('value', currDate.format("YYYY-MM-DD"));
    dateBoxVon.attr('max', currDate.format("YYYY-MM-DD"));
    dateBoxBis.attr('value', currDate.format("YYYY-MM-DD"));
    dateBoxBis.attr('max', currDate.format("YYYY-MM-DD"));

    dateBox.change(handleDateChange);

    txtWeight.change(handleWeightChange);
    file.change(handleFileChange);

    btnSave.click(saveValues);

    // Felder für Graph erstellen anzeigen und Erfassen-Felder nicht anzeigen
    btnCreateGraph.click(function() { 
        $("#pnlFields").css("display", "none"); 
        $("#pnlExport").css("display", "block");
        $("#btnShowDataExportGraph").css("display", "block"); 
    });

    // Felder für Collage erstellen anzeigen und Erfassen-Felder nicht anzeigen
    btnCreateCollage.click(function() { 
        $("#pnlFields").css("display", "none"); 
        $("#pnlExport").css("display", "block");
        $("#btnShowDataExportCollage").css("display", "block"); 
    });

    // Felder für Erfassen anzeigen und Export-Felder nicht anzeigen
    btnSwitchToErfassen.click(function() {
        $("#pnlFields").css("display", "block"); 
        $("#pnlExport").css("display", "none");
        $("#btnShowDataExportGraph").css("display", "none"); 
        $("#btnShowDataExportCollage").css("display", "none"); 
    });

    btnShowDataExportGraph.click(createGraph);
    btnShowDataExportCollage.click(createCollage);

    // Zu Beginn, Daten von Heute laden und anzeigen.
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
            loadImageTo(e.target.result);
            newFileSrc = e.target.result
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function handleWeightChange() {
    newWeight = txtWeight.val()
}

function loadImageTo(image) {
    $('#picture').attr('src', image);
}

function loadDefaultValues() {
    document.getElementById("weight").value = "";
    $('#picture').attr('src', defaultImage);
}

function saveValues() {
    try {
        // Falls newFileSrc leer, soll default-Placeholder gespeichert werden. Da sonst kein Bild gespeichert wird.
        if (newFileSrc == "") {
            newFileSrc = defaultImage;
        }
        const entryData = JSON.stringify({ image: newFileSrc, weight: newWeight });
        localStorage.setItem(moment(dateBox.val()).format('YYYY-MM-DD'), entryData);

        alert("Speichern war erfolgreich");
    } catch {
        alert("Beim Speichern ist ein Fehler passier, versuchen Sie es nochmal");
    }
    
}

function createGraph() {
    let dataArrayForExport = loadWeightArray();
    console.log(dataArrayForExport);

    let chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", 
        animationEnabled: true,
        title:{
            text: "Gewicht-Graph"   
        },
        axisX: {
            interval: 1,
            intervalType: "day",
            valueFormatString: "DD.MM"
        },
        axisY:{
            title: "Gewicht",
            includeZero: true,
            valueFormatString: "#0"
        },
        data: [{        
            type: "line",
            markerSize: 12,
            xValueFormatString: "MMM, YYYY",
            yValueFormatString: "###.#",
            dataPoints: dataArrayForExport
        }]
    });
    chart.render();
}

function createCollage() {

}

function loadWeightArray() {
    let array = [];
    let value = moment(dateBoxVon.val());
    while (value <= moment(dateBoxBis.val())) {
        const entryText = localStorage.getItem(value.format('YYYY-MM-DD'));
        if (entryText) {
            const entry = JSON.parse(entryText);
            
            array.push({x: value.toDate(), y: parseInt(entry.weight)});
        }

        value.add(1, 'day');
    }
    return array
}