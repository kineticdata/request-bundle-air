// Load table on Page load
$(document).ready(function() {
    var loader = '#loader';
    var activeTable = null;

    var urlParameters = getUrlParameters();
    if(!urlParameters.status) {
        urlParameters.status = "Requests Open";
    }
    if(BUNDLE['config'][urlParameters.status+' Count'] > 0) {
        // Initialize datatables
        intializeDataTable(tableParams, urlParameters.status);
        $(tableParams[urlParameters.status].container).show();
    } else {
        $(loader).hide();
        $('#main').after('<h3 style="margin: 10px 0 0 0; text-align: center;">There Are No '+ urlParameters.status+'</h3>');
    }

    $('#status').text(urlParameters.status+' '+$('#status').text());

    $('.dataTables_paginate').on('click', function(event) {
        $("table.responsive").each(function(i, element) {
            unsplitTable($(element));
        });
        $("table.responsive").each(function(i, element) {
            splitTable($(element));
        });
    });
});

/**
 * Define the common table options that all of the tables on this page will
 * share.  Here we define the form the tables represent, the fields present,
 * the default sort field and order, the default page size and number.
 */
var tableParams = {
    form: "KS_SRV_CustomerSurvey_base",
    fields: {
        'Request Id'   : '1',
        'Submitted'    : '700001285',
        'Service Item' : '700001000',
        'Status'       : '700002400',
        'First Name'   : '300299800',
        'Last Name'    : '700001806',
        'Instance Id' : '179'
    },
    sortField: "Request Id",
    sortOrder: 0,
    pageSize: 0,
    pageNumber: 0,
    // Define table specific properties
    "Requests Open": {
        container: '#tableContainerRequestsOpen',
        qualification: 'Requests Open',
        rowCallback: defaultRowCallback,
        completeCallback: requestsOpenClosedCompleteCallback
    },
    "Requests Closed": {
        container: '#tableContainerRequestsClosed',
        qualification: 'Requests Closed',
        rowCallback: defaultRowCallback,
        completeCallback: requestsOpenClosedCompleteCallback
    },
    "Requests Parked": {
        container: '#tableContainerRequestsParked',
        qualification: 'Requests Parked',
        rowCallback: defaultRowCallback,
        completeCallback: defaultCompleteCallback
    },
    "Approvals Pending": {
        container: '#tableContainerApprovalsPending',
        qualification: 'Approvals Pending',
        rowCallback: defaultRowCallback,
        completeCallback: defaultCompleteCallback
    },
    "Approvals Completed": {
        container: '#tableContainerApprovalsCompleted',
        qualification: 'Approvals Completed'
    }
}

function intializeDataTable(tableParams, groupName) {
    // Get table specific properties
    var table = tableParams[groupName];
    // Instantiate object
    var arsTable = new ArsTable();
    // Fluent interface to set properties and build url
    arsTable.setForm(tableParams.form)                 
            .setFields(tableParams.fields)
            .setFieldIds()
            .setSortField(tableParams.sortField)
            .setSortOrder(tableParams.sortOrder)
            .setPageSize(tableParams.pageSize)
            .setPageNumber(tableParams.pageNumber)
            .setQualification(table.qualification)
            .setUrl(BUNDLE.bundlePath + 'common/interface/callbacks/arsTable.json.jsp');
        
    // Hide elements
    jQuery('#catalogContainer').hide(); 
    jQuery('#submissionsTable').hide();
    jQuery('.tableContainer').hide();
    // Datatable
    jQuery(table.container).dataTable({
        'bPaginate': true,
        'bSort': false,
        'bLengthChange': false,
        'bInfo': false,
        'bDestroy': true,
        'bFilter': false,
        'iDisplayStart': 0,
        'iDisplayLength': 5,
        'bJQueryUI': true,
        'sAjaxDataProp': 'records',
        'bProcessing': false,
        //'bServerSide': true,
        'sAjaxSource': arsTable.getUrl(),
        'sPaginationType': 'full_numbers',
        /**
         * ColumnDefs has many options for manipulation of column specific data
         * mRender can be used to render column data from json object
         */
        'aoColumnDefs': [
            {
                'aTargets': [0],
                'sName': 'Request ID',
                'mRender': function (data, type, full) {
                    return data;                        
                }                 
            },
            {
                'aTargets': [1],
                'sName': 'Service Item',
                'mRender': function (data, type, full) {
                    return full[2];                       
                }                 
            },
            {
                'aTargets': [2],
                'sName': 'Status',
                'mRender': function (data, type, full) {
                    return full[3];                    
                }                 
            }
        ],
        'fnRowCallback': function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            table.rowCallback(table, nRow, aData, iDisplayIndex, iDisplayIndexFull);
        },
        'fnInitComplete': function(oSettings, json) {
            table.completeCallback(table, oSettings, json);
            // Show elements
            jQuery('#submissionsTable').fadeIn();
            jQuery(table.container).show();
        }
    });
}

/**
 * Default row callback, which will add csrv as a data attribute to each row
 */
function defaultRowCallback(table, nRow, aData, iDisplayIndex, iDisplayIndexFull) {
    jQuery(nRow).data('csrv', aData[6]);
}

/**
 * Default complete callback, which will bind a jquery live on click event.
 * It uses the data attribute csrv as part of the url param in the link
 */
function defaultCompleteCallback(table, oSettings, json) {
    // Remove all delegated click handlers from all rows
    jQuery('#testDataTable tbody').off('click', 'tr');
    // Click Event
    jQuery('#testDataTable tbody').on('click', 'tr', function() {
        window.open('/kinetic/DisplayPage?csrv=' + jQuery(this).data('csrv'));
    });
}

/**
 * Custom complete callback, which will bind a jquery live on click event.
 * It uses the data attribute csrv as part of the url param in the link
 */
function requestsOpenClosedCompleteCallback(table, oSettings, json) {
    // Remove all delegated click handlers from all rows
    jQuery('#tableContainerRequestsOpen tbody').off('click', 'tr');
    // Click Event
    jQuery('#tableContainerRequestsOpen tbody').on('click', 'tr', function() {
        window.open(BUNDLE.config['submissionDetailsUrl']+'&submissionId=' + jQuery(this).data('csrv'));
    });

    updateTables();
    $(window).on('resize', updateTables);
    $(loader).hide();
}