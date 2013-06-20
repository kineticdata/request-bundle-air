/**
 * INTERNAL USE ONLY
 * Validate an array of fields for required & pattern.  Will display message above template button layer
 * and color the labels to red if not valid.
 * @method validateFields
 * @private
 * @param {Array} fieldsArray This should be an array of input/select/text/textarea elements,
 * not layer elements.
 * @return {Boolean} true if all fields are valid, else false
 */
KD.utils.Action.validateFields = function (fieldsArray) {
    var valid = true;
    var nextElement = null;
    var firstErrorElement = null;
    var requiredFieldList='';
    var formatFieldList='';
    var requiredWarning=KD.utils.ClientManager.requiredWarningStr;
    var formatWarning=KD.utils.ClientManager.validFormatWarningStr;
    var maxCharsOnSubmit=KD.utils.ClientManager.maxCharsOnSubmit;
    var characterCount=0;
    var disabledFields=new Array();
    var checkedFields=new Array();
    var checkboxFields={};
    var fieldPrefix = "<li>";
    var fieldSuffix = "</li>";

    // Process all required checkbox questions first, and store the parentId
    // to indicate if any of the children have been checked
    //
    for (var f=0; f < fieldsArray.length; f++) {
        var cb = fieldsArray[f].type && fieldsArray[f].type.toLowerCase()=="checkbox";
        if (cb) {
            var cbChecked = fieldsArray[f].checked;
            var reqAttr = fieldsArray[f].getAttribute("required");
            if (reqAttr && reqAttr.toLowerCase()=="true") {
                var cbParentId = KD.utils.Util.getCheckboxParentId(fieldsArray[f]);
                if (cbParentId) {
                    var cbParentExists = typeof checkboxFields[cbParentId] !== "undefined"
                    // update if this is first child, or if parent isn't already checked
                    if (!cbParentExists || (cbParentExists && checkboxFields[cbParentId] == false)) {
                        checkboxFields[cbParentId] = fieldsArray[f].checked;
                    }
                }
            }
        }
    }

    for (var i = 0; i < fieldsArray.length; i++) {
        nextElement = fieldsArray[i];
        if(nextElement.disabled == true && nextElement.type && nextElement.type.toUpperCase() != "SUBMIT" && nextElement.type.toUpperCase()!= "BUTTON"){
            disabledFields.push(nextElement);
        }

        // if the question is transient, skip validation for it
        if (KD.utils.Action._isTransient(nextElement)) {
            continue;
        }

        var foundValue=false;

        if(nextElement.type=="radio" || nextElement.type=="checkbox"){
            if (nextElement.checked){
                characterCount += nextElement.value.length;
                foundValue=true;
            }
        } else if(nextElement.type!="button" && nextElement.value.length >0){
            characterCount += nextElement.value.length;
            foundValue=true;
        }

        if (foundValue) {
            characterCount += nextElement.name.length+1;
        }

        if (nextElement.getAttribute("required") == 'true' && checkedFields[nextElement.name]!="true") {
            checkedFields[nextElement.name]="true";

            if (nextElement.tagName.toLowerCase() == 'select') {
                if (nextElement.options.length == 0 || nextElement.selectedIndex == null || nextElement.value==""){

                    requiredFieldList += fieldPrefix + KD.utils.Action.getErrorValue(nextElement) + fieldSuffix;
                    if (firstErrorElement==null){
                        firstErrorElement=nextElement;
                    }
                    KD.utils.Action.highlightField(nextElement);
                    valid=false;
                } else {
                    KD.utils.Action.resetRequiredField(nextElement);
                }
            }
            else if (nextElement.type.toLowerCase()=='radio'){
                var radioGroup=document.getElementsByName(nextElement.name);
                var isChecked = false;
                for (var j=0;j<radioGroup.length;j++){
                    if(radioGroup[j].checked==true){
                        isChecked=true;
                    }
                }
                if (isChecked==false){
                    if (firstErrorElement==null){
                        firstErrorElement=radioGroup[0];
                    }
                    KD.utils.Action.highlightField(radioGroup[0]);
                    requiredFieldList += fieldPrefix + KD.utils.Action.getErrorValue(radioGroup[0]) + fieldSuffix;
                    valid=false;
                } else {
                    KD.utils.Action.resetRequiredField(radioGroup[0]);
                }

            }
            else if (nextElement.type.toLowerCase()=="checkbox"){
                cbParentId = KD.utils.Util.getCheckboxParentId(nextElement);
                if (cbParentId && typeof checkedFields[cbParentId]=="undefined") {
                    if (checkboxFields[cbParentId] != true) {
                        if (firstErrorElement==null){
                            firstErrorElement=nextElement;
                        }
                        KD.utils.Action.highlightField(nextElement);
                        requiredFieldList += fieldPrefix + KD.utils.Action.getErrorValue(nextElement) + fieldSuffix;
                        valid=false;
                    }
                    checkedFields[cbParentId]="true";
                }
                if (cbParentId && checkboxFields[cbParentId] == true) {
                    KD.utils.Action.resetRequiredField(nextElement);
                }
            }
            else if ((!nextElement.value || nextElement.value.length < 1) && nextElement.type.toLowerCase() != "checkbox") {
                if (firstErrorElement==null){
                    firstErrorElement=nextElement;
                }
                var isDate=false;
                var myParent=nextElement.parentNode;
                for (var iIdx=0; iIdx<myParent.children.length; iIdx++) {
                    if (myParent.children[iIdx].id != undefined && myParent.children[iIdx].id.indexOf("year_")!=-1){
                        KD.utils.Action.highlightField(myParent.children[iIdx]);
                        isDate=true;
                        break;
                    }
                }
                if (!isDate) {
                    KD.utils.Action.highlightField( nextElement);
                }
                requiredFieldList += fieldPrefix + KD.utils.Action.getErrorValue(nextElement) + fieldSuffix;
                valid=false;
                continue;
            } else {
                KD.utils.Action.resetRequiredField(nextElement);
            }
        }
        if (nextElement.value.length > 0 && nextElement.getAttribute("validationFormat")) {
            var expStr = nextElement.getAttribute("validationFormat");
            var exp = new RegExp(expStr);
            if (exp.test(nextElement.value)==false) {
                KD.utils.Action.highlightField(nextElement);
                var validationText = nextElement.getAttribute("validationText");
                if (validationText) {
                    formatFieldList += fieldPrefix + validationText + fieldSuffix;
                }
                valid=false;
            } else {
                KD.utils.Action.resetRequiredField(nextElement);
            }
        } else if ((nextElement.value.length == 0 && nextElement.getAttribute("required") != 'true') && nextElement.getAttribute("validationFormat")) {
            KD.utils.Action.resetRequiredField(nextElement);
        }

        // ensure date type questions contain a valid date
        if(nextElement.name && nextElement.name.indexOf('SRVQSTN_') != -1){
            var isDateField = KD.utils.Util.isDate(nextElement);
            if(isDateField){
                var validDate = KD.utils.Action.validateDateField(nextElement);
                if(!validDate){
                    if (firstErrorElement==null){
                        firstErrorElement=nextElement;
                    }
                    KD.utils.Action.highlightField( nextElement);

                    // get the date field label
                    var label = "";
                    var labelObj=KD.utils.Util.getQuestionLabel(
                        KD.utils.Util.getLabelFromAnswerEl(nextElement));
                    if (labelObj && labelObj.getAttribute('label')) {
                        label = labelObj.getAttribute('label');
                    }

                    // add the date field to the format field list string
                    formatFieldList += fieldPrefix + label + " is not a valid date" + fieldSuffix;
                    valid=false;
                } else {
                    KD.utils.Action.resetRequiredField(nextElement);
                }
            }
        }

    }
    if (!valid) {
        var errorStr = "";
        if (requiredFieldList) {
            errorStr += "<div class='warningTitle'><h3>" + requiredWarning +
                "</h3><ul>" + requiredFieldList + "</ul></div>";
        }
        if (formatFieldList) {
            errorStr += "<div class='warningTitle'><h3>" + formatWarning +
                "</h3><ul>" + formatFieldList + "</ul></div>";
        }

        // display the fields that failed validation
        if($('div.warningContainer').exists()) {
            $('div.warningTitle').replaceWith(errorStr);
        } else {
            $('div.templateButtonLayer').before('<div class="warningContainer">' + errorStr + '</div>');
        }
        return false;
    }

    if (characterCount > maxCharsOnSubmit) {
        if($('div.warningContainer').exists()) {
            $('div.warningTitle').replaceWith(KD.utils.ClientManager.tooManyCharactersForSubmitStr);
        } else {
            $('div.templateButtonLayer').before('<div class="warningContainer">' + KD.utils.ClientManager.tooManyCharactersForSubmitStr + '</div>');
        }
        return false;
    }
    /* Enable disabled radio buttons/checkboxes so they submit */
    for (j=0; j < disabledFields.length; j++){
        // make sure the element is a question
        if (disabledFields[j].id.indexOf("SRVQSTN_") != -1) {
            disabledFields[j].disabled=false;
        }
    }
    return true;
};