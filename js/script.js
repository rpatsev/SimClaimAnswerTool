$(document).ready(function(){

var selectHtml = '<option>-- Please select SimClaim assignment --</option>'; 
for(var key in data){
    selectHtml += "<option>"+ key +"</option>";
}

$("#testSelect").html(selectHtml);

$("#testSelect").on('change', formSimClaimConsoleCommands);
$("#copy").on('click', copyToClipboard);
    

function copyToClipboard(){
    var copyText = $("#wrapper");

    copyText.select();
    document.execCommand('copy');
    alert('Copied to clipboard');
}

function formSimClaimConsoleCommands(){ 
var test = $(this).closest("#testSelect").val();
var json = data[test];
var result = "";

var formArray = [];

    for(var i = 0; i < 2; i++){

        formArray.push(Object.entries(json)[i][1]);

        for(var key in formArray[0]){
            var arkey = formArray[0][key];
            var action = "";
            var htmlObject = '';
            if(!!arkey && arkey !== "false"){
                htmlObject = (key === "box-32" || key === "box-33" ) ? " textarea" : " input";
                arkey = ((key === "box-32" || key === "box-33" )) ? arkey.replace("\n", " ").split("|")[0] : arkey.split("\n")[0];
                action += "$('#form"+ (i+1) +"').find('#"+ key + htmlObject + "')";
                if(arkey === "true"){
                    action += ".attr('checked','checked');";
                } else {
                    action += ".val('"+ arkey +"');";
                }
                console.log(action);
                result += action + "\n";
            }
        }
    }

        $('#wrapper').html(result);

    }

    formSimClaimConsoleCommands();
});