

    function upload() {



        if (!browserSupportFileUpload()) {
            alert('The File APIs are not fully supported in this browser!');
        } else {

            var data = null;
            var file = this.files[0];
            var reader = new FileReader();
            
            reader.readAsText(file);

            reader.onload = function(event) {
            
            
                var csvData = event.target.result;
                points = d3.csv.parse(csvData)
                d3.select("#output").html(JSON.stringify(points))

                

            };
            reader.onerror = function() {
                alert('Unable to read ' + file.fileName);
            };
        }

    }


    d3.select("#fileupload").on("change", upload)
    d3.select("#copy_button").on("click", function(d){
        copyTextarea = document.querySelector("#output");
        copyTextarea.select();
        document.execCommand('copy') 
    })




function browserSupportFileUpload() {
    var isCompatible = false;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        isCompatible = true;
    }
    return isCompatible;
}


function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
