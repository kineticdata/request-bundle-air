// Load table on Page load
$(document).ready(function() {
    var loader = '#loader';
    // Instantiate object
    var arsUrl = new ArsUrl();

    var urlParameters = getUrlParameters();
    if(!urlParameters.status) {
        urlParameters.status = "Requests Open";
    }
    if(BUNDLE['config'][urlParameters.status+' Count'] > 0) {
        // Initialize datatables
        intializeDataTable(tableParams, urlParameters.status, arsUrl);
        $(tableParams[urlParameters.status].container).show();
    } else {
        $(loader).hide();
        $('#main').after('<h3 style="margin: 10px 0 0 0; text-align: center;">There Are No '+ urlParameters.status+'</h3>');
    }

    $('#status').text(urlParameters.status+' '+$('#status').text());
});

/**
 * Define form defintions
 */
formDefinitionDefault = {
form: 'KS_SRV_CustomerSurvey_base', 
fields: {
        'Request Id'   : '1',
        'Submitted'    : '700001285',
        'Service Item' : '700001000',
        'Status'       : '700002400',
        'Instance Id'  : '179'
    }
};

/**
 * Define column defintions
 */
columnDefinitionsDefault = [
    {
        'aTargets': [0],
        'sTitle': 'Request ID',
        'iDataSort': formDefinitionDefault.fields['Request Id'],
        'mRender': function (data, type, full) {
            return full[0];                        
        }                 
    },
    {
        'aTargets': [1],
        'sTitle': 'Service Item',
        'iDataSort': formDefinitionDefault.fields['Service Item'],
        'mRender': function (data, type, full) {
            return full[2];                   
        }                 
    },
    {
        'aTargets': [2],
        'sTitle': 'Status',
        'iDataSort': formDefinitionDefault.fields['Status'],
        'mRender': function (data, type, full) {
            return full[3];                    
        }                 
    }
];

/**
 * Default row callback, which will add csrv as a data attribute to each row
 */
function defaultRowCallback(table, nRow, aData, iDisplayIndex, iDisplayIndexFull) {
    $(nRow).data('csrv', aData[4]);
}

/**
 * Default complete callback, which will bind a unobtrusive jQuery live on click event.
 * It uses the data attribute csrv as part of the url param in the link
 */
function defaultCompleteCallback(table, oSettings, json) {
    // Remove all delegated click handlers from all rows
    $('#testDataTable tbody').off('click', 'tr');
    // Click Event
    $('#testDataTable tbody').on('click', 'tr', function() {
        window.open('/kinetic/DisplayPage?csrv=' + $(this).data('csrv'));
    });
}

/**
 * Custom complete callback, which will bind a unobtrusive jQuery live on click event.
 * It uses the data attribute csrv as part of the url param in the link
 */
function requestsOpenClosedCompleteCallback(table, oSettings, json) {
    // Remove all delegated click handlers from all rows
    $('#tableContainerRequestsOpen tbody').off('click', 'tr');
    // Click Event
    $('#tableContainerRequestsOpen tbody').on('click', 'tr', function() {
        window.open(BUNDLE.config['submissionDetailsUrl']+'&submissionId=' + $(this).data('csrv'));
    });
    $(loader).hide();
    $(table.container).wrap('<div class="scrollable" />');
}

/**
 * Define the common table options and callbacks
 */
tableParams = { 
    // Define table specific properties
    'Requests Open': {
        container: '#tableContainerRequestsOpen',
        qualification: 'Requests Open',
        formDefinition: formDefinitionDefault,
        columnDefinitions: columnDefinitionsDefault,
        rowCallback: defaultRowCallback,
        completeCallback: requestsOpenClosedCompleteCallback
    },
    'Requests Closed': {
        container: '#tableContainerRequestsClosed',
        qualification: 'Requests Closed',
        formDefinition: formDefinitionDefault,
        columnDefinitions: columnDefinitionsDefault,
        rowCallback: defaultRowCallback,
        completeCallback: requestsOpenClosedCompleteCallback
    },
    'Requests Parked': {
        container: '#tableContainerRequestsParked',
        qualification: 'Requests Parked',
        formDefinition: formDefinitionDefault,
        columnDefinitions: columnDefinitionsDefault,
        rowCallback: defaultRowCallback,
        completeCallback: defaultCompleteCallback
    },
    'Approvals Pending': {
        container: '#tableContainerApprovalsPending',
        qualification: 'Approvals Pending',
        formDefinition: formDefinitionDefault,
        columnDefinitions: columnDefinitionsDefault,
        rowCallback: defaultRowCallback,
        completeCallback: defaultCompleteCallback
    },
    'Approvals Completed': {
        container: '#tableContainerApprovalsCompleted',
        qualification: 'Approvals Completed',
        formDefinition: formDefinitionDefault,
        columnDefinitions: columnDefinitionsDefault,
    }
};

/**
 * Data tables
 */
function intializeDataTable(tableParams, groupName, arsUrl) {
    // Get table specific properties
    var table = tableParams[groupName];
    // Fluent interface to set properties and build url
    arsUrl.setForm(table.formDefinition.form)                 
            .setFields(table.formDefinition.fields)
            .setFieldIds()
            .setQualification(table.qualification)
            .setUrl(BUNDLE.packagePath + 'interface/callbacks/dataTablesSubmissions.json.jsp');
        
    // Datatable
    $(table.container).dataTable({
        'bPaginate': true,
        'bSort': true,
        'bLengthChange': false,
        'bInfo': false,
        'bDestroy': true,
        'bFilter': false,
        'iDisplayStart': 0,
        'iDisplayLength': 5,
        'bJQueryUI': true,
        'sAjaxDataProp': 'aaData',
        'bProcessing': true,
        'bServerSide': true,
        'sAjaxSource': arsUrl.getUrl(),
        'sPaginationType': 'full_numbers',
        'aaSorting': [[1, 'desc']],
        /**
         * ColumnDefs has many options for manipulation of column specific data
         * mRender can be used to render column data from json object
         */
        'aoColumnDefs': table.columnDefinitions,
        'fnServerData': function (sSource, aoData, fnCallback, oSettings) { 
            oSettings.jqXHR = BUNDLE.ajax({
              'dataType': 'json',
              'type': 'post',
              'url': sSource,
              'data': aoData,
              'success': fnCallback
            });
        },
        'fnRowCallback': function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            table.rowCallback(table, nRow, aData, iDisplayIndex, iDisplayIndexFull);
        },
        'fnInitComplete': function(oSettings, json) {
            table.completeCallback(table, oSettings, json);
            $(loader).hide();
            $('#submissionsTable').fadeIn();
            $(table.container).show();
        }
    });
}