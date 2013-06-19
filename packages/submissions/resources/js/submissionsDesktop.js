/*
 * On document ready we will load the tables present on the page and bind events
 * that handle the navigation tabs as well as the table controls.
 */
$(document).ready(function() {
    var loader = '#loader';
    var submissions = '#submissionsTable';
    var activeTable = null;
    var tableContainer = '.tableContainer';
    /*
     * Define the common table options that all of the tables on this page will
     * share.  Here we define the form the tables represent, the fields present,
     * the default sort field and order, the default page size and number, as
     * well as the entire table callback and the header callback.
     */
    var tableOptions = {
        form: "KS_SRV_CustomerSurvey_base",
        fields: {
            'Request Id'   : '1',
            'Submitted'    : '700001285',
            'Service Item' : '700001000',
            'Status'       : '700002400'
        },
        hiddenFields: {
            'Instance Id' : '179'
        },
        sortField: "Request Id",
        sortOrder: "descending",
        pageSize: 15,
        pageNumber: 1,
        // This callback function simply refreshes the table controls by calling
        // the refreshTableControls function defined below.
        tableCallback: function(table, element) {
            refreshTableControls();
            $(loader).hide();
            $('#submissionsTable').show();
            
        },
        // This callback function binds a click event to each of the header
        // cells that when clicked it either sorts the table by that field or
        // toggles the sort order depending on if it was already sorting by that
        // field.
        headerCallback: function(table, element, label) {
            $(element).click(function() {
                if ( label != table.sortField ) {
                    table.sortBy(label);
                } else {
                    table.toggleSort();
                }
            });
        },
        tableCompleteCallback: function(table, element) {}
    }

    /* Table Options for Parked Requests */
    var tableOptionsParked = {
        form: "KS_SRV_CustomerSurvey_base",
        fields: {
            'Request Id'   : '1',
            'Modified'    : '6',
            'Service Item' : '700001000',
            'Status'       : '700002400'
        },
        hiddenFields: {
            'Instance Id' : '179'
        },
        sortField: "Request Id",
        sortOrder: "descending",
        pageSize: 15,
        pageNumber: 1,
        // This callback function simply refreshes the table controls by calling
        // the refreshTableControls function defined below.
        tableCallback: function(table, element) {
            refreshTableControls();
            $(loader).hide();
            $('#submissionsTable').show();
            
        },
        // This callback function binds a click event to each of the header
        // cells that when clicked it either sorts the table by that field or
        // toggles the sort order depending on if it was already sorting by that
        // field.
        headerCallback: function(table, element, label) {
            $(element).click(function() {
                if ( label != table.sortField ) {
                    table.sortBy(label);
                } else {
                    table.toggleSort();
                }
            });
        },
        tableCompleteCallback: function(table, element) {}
    }

    /* Table Options for Pending Requests */
    var tableOptionsPending = {
        form: "KS_SRV_CustomerSurvey_base",
        fields: {
            'Request Id'   : '1',
            'Sent'    : '700001282',
            'Service Item' : '700001000',
            'Status'       : '700002400'
        },
        hiddenFields: {
            'Instance Id' : '179'
        },
        sortField: "Request Id",
        sortOrder: "descending",
        pageSize: 15,
        pageNumber: 1,
        // This callback function simply refreshes the table controls by calling
        // the refreshTableControls function defined below.
        tableCallback: function(table, element) {
            refreshTableControls();
            $(loader).hide();
            $('#submissionsTable').show();
            
        },
        // This callback function binds a click event to each of the header
        // cells that when clicked it either sorts the table by that field or
        // toggles the sort order depending on if it was already sorting by that
        // field.
        headerCallback: function(table, element, label) {
            $(element).click(function() {
                if ( label != table.sortField ) {
                    table.sortBy(label);
                } else {
                    table.toggleSort();
                }
            });
        },
        tableCompleteCallback: function(table, element) {}
    }

    /*
     * Define the cell callback function for the open and closed requests table.
     * If the cell is displaying a request id instead of the normal text we will
     * create a link for submission details.
     */
    function requestsOpenClosedRowCallback(table, rowElement, rowData, rowIndex) {
        var url = BUNDLE.config['submissionDetailsUrl']+'&submissionId=' + rowData[table.getIndex('Instance Id')];
        $(rowElement).data('csrv', url);
        // Remove all delegated click handlers from all rows
        $(table.container).off('click', 'tr.kd-row');
        $(table.container).on('click', 'tr.kd-row', function() {
            window.open($(this).data('csrv'));
        });
    }
    
    /*
     * Define the cell callback for the parked requests table.  This function
     * inserts a link that takes the user to the parked request.
     */
    function requestsParkedRowCallback(table, rowElement, rowData, rowIndex) {
        var url = BUNDLE.applicationPath + 'DisplayPage?csrv=' + rowData[table.getIndex('Instance Id')] + '&return=yes';
        $(rowElement).data('csrv', url);
        // Remove all delegated click handlers from all rows
        $(table.container).off('click', 'tr.kd-row');
        $(table.container).on('click', 'tr.kd-row', function() {
            window.open($(this).data('csrv'));
        });
    }
    
    /*
     * Define the cell callback for the pending approvals table.  This function
     * inserts a link that takes the user to the approval.
     */
    function approvalsPendingRowCallback(table, rowElement, rowData, rowIndex) {
        var url = BUNDLE.applicationPath + 'DisplayPage?csrv=' + rowData[table.getIndex('Instance Id')];
        $(rowElement).data('csrv', url);
        // Remove all delegated click handlers from all rows
        $(table.container).off('click', 'tr.kd-row');
        $(table.container).on('click', 'tr.kd-row', function() {
            window.open($(this).data('csrv'));
        });
    }

    /*
     * Define the cell callback for the completed approvals table.
     */
    function approvalsCompletedRowCallback(table, rowElement, rowData, rowIndex) {
        // Remove all delegated click handlers from all rows
        $(table.container).off('click', 'tr.kd-row');
    }
    
    /*
     * Instantiate all of the tables and store them in an object that maps a
     * name to each table.
     */    
    var tables = {
        "Requests Open": new Table($.extend(tableOptions, {
            container: '#tableContainerRequestsOpen',
            qualification: 'Requests Open',
            rowCallback: requestsOpenClosedRowCallback,
            initialize: false
        })),
        "Requests Closed": new Table($.extend(tableOptions, {
            container: '#tableContainerRequestsClosed',
            qualification: 'Requests Closed',
            rowCallback: requestsOpenClosedRowCallback,
            initialize: false
        })),
        "Requests Parked": new Table($.extend(tableOptionsParked, {
            container: '#tableContainerRequestsParked',
            qualification: 'Requests Parked',
            rowCallback: requestsParkedRowCallback,
            initialize: false
        })),
        "Approvals Pending": new Table($.extend(tableOptionsPending, {
            container: '#tableContainerApprovalsPending',
            qualification: 'Approvals Pending',
            rowCallback: approvalsPendingRowCallback,
            initialize: false
        })),
        "Approvals Completed": new Table($.extend(tableOptions, {
            container: '#tableContainerApprovalsCompleted',
            qualification: 'Approvals Completed',
            initialize: false,
            rowCallback: approvalsCompletedRowCallback
        }))
    }
   
    /*
     * Create a function that refreshes details displayed in the table controls.
     */
    function refreshTableControls() {
        if (activeTable) {
            $('.controls .pageNumber .currentPage').val(activeTable.pageNumber);
            $('.controls .pageNumber .lastPage').html(activeTable.lastPageNumber);
            $('.controls .pageNumber .recordCount').html(activeTable.count);
            $('.controls .pageSize select option[selected="selected"]').removeAttr('selected');
            $('.controls .pageSize select option[value="'+ activeTable.pageSize + '"]').attr("selected", "selected");
        }
    }
    
    /*
     * Bind functions to the table controls dom elements.
     */
    $('.controls .control.firstPage').click(function() {
        activeTable.firstPage();
    });
    $('.controls .control.previousPage').click(function() {
        activeTable.previousPage();
    });
    $('.controls .control.nextPage').click(function() {
        activeTable.nextPage();
    });
    $('.controls .control.lastPage').click(function() {
        activeTable.lastPage();
    });
    $('.controls .pageSize select').change(function() {
        activeTable.setPageSize(parseInt($(this).val()));
    });
    $('.controls .pageNumber input').change(function() {
        if( isNaN(parseInt($(this).val())) ) {
            $(this).val('');
        } else {
            activeTable.gotoPage($(this).val());
        }
    });
    $('.controls .control.refresh').click(function() {
        $(submissions).hide();
        $(loader).show();
        activeTable.refresh();
    });

    // Unobtrusive on click event for submission navigation while on the submissions page
    $('ul#submissionNavigation').on('click', 'li a', function(event) {
        event.preventDefault();
        $('ul#submissionNavigation li').removeClass('boxActive');
        $(this).parent().addClass('boxActive');
        activeTable = tables[$(this).data('group-name')];
        $(submissions).hide();
        $(tableContainer).hide();
        $(loader).show();
        activeTable.refresh();
        $(activeTable.container).show();
        $('#catalogBreadCrumbs li.arrow').nextAll().remove();
        $('#catalogBreadCrumbs').append('<li class="breadCrumb">'+$(this).data('group-name')+'</li>');
    });

    // Load table on Page load
    var urlParameters = getUrlParameters();
    if(!urlParameters.status) {
        urlParameters.status = "Requests Open";
    }
    if(BUNDLE['config'][urlParameters.status+' Count'] > 0) {
        activeTable = tables[urlParameters.status];
        $(tableContainer).hide();
        activeTable.refresh();
        $(activeTable.container).show();
        $('#catalogBreadCrumbs').append('<li class="breadCrumb">'+urlParameters.status+'</li>');
    } else {
        $(loader).hide();
    }
});