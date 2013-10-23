/**
 * jQuery OSC table widget
 */
(function($) {
    $.widget('custom.submissionsTable', {
        // Default opitons
        options: {
            entryOptionSelected: 5,
            entryOptions: [5, 10, 50, 100],
            page: 1,
            total: 0,
            range: 5,
            resultsPerPage: 0,
            entries: true,
            serverSidePagination: true
        },
        _create: function() {
            // Set current object context to use inside jquery objects
            var widget = this;
            // This is the first request, make a server call
            widget.firstRequest = true;
            // Hide
            widget.element.hide();
            // Build HTML
            widget.select = $('<select>').addClass('limit');
            $.each(widget.options.entryOptions, function(index, value) {
                if(value === widget.options.entryOptionSelected) {
                    widget.select.append($('<option>').val(value).text(value).attr('selected','selected'));
                } else if(index === 0) {
                    widget.select.append($('<option>').val(value).text(value).attr('selected','selected'));
                } else {
                    widget.select.append($('<option>').val(value).text(value));
                }
            });
            widget.refresh = $('<a>').addClass('refresh').attr('href', 'javascript:void(0)').text('Refresh');
            widget.table = $('<table>').addClass('kd-table');
            widget.information = $('<div>').addClass('information');
            widget.pagination = $('<nav>').addClass('pagination');
            widget.header = $('<div>').addClass('header');
            widget.submissionsTable = $('<div>').addClass('submissions')
                .append(widget.header.append(widget.refresh));
            if(widget.options.entries) {
                widget.entriesSelection = $('<div>').addClass('entries-selection')
                    .prepend($('<span>').append('Show'))
                    .append(widget.select)
                    .append($('<span>').append('entries'));
                widget.header.prepend(widget.entriesSelection);
                    
            }
            widget.submissionsTable.append(widget.table)
                .append(
                    $('<div>').addClass('footer')
                        .append(widget.information)
                        .append(widget.pagination)
                );
            // Add html to selector
            widget.element.html(widget.submissionsTable);
            widget._createEvents();
            widget._makeRequest(1, widget.select.val());
        },
        _createEvents: function() {
            // Set current object context to use inside jquery objects
            var widget = this;
            // Click event for pagination
            widget.pagination.on('click touchstart', 'ul.links li a', function(event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                // Get Page
                page = $(this).data('page');
                // Set current page number for other events to use
                widget.element.data('page', page);
                // Execute the request and return results
                widget._makeRequest(page, widget.select.val());
            });

            // Click event for refresh
            widget.refresh.on('click touchstart', function(event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                // Make a server call again
                widget.firstRequest = true;
                // Execute the request and return results
                widget._makeRequest(1, widget.select.val());
            });

            // Click event for refresh
            widget.select.on('change', function(event) {
                // Prevent default action.
                event.preventDefault();
                // Execute the request and return results
                widget._makeRequest(1, widget.select.val());
            });

            // Click event for sorting
            widget.table.on('click touchstart', 'thead tr th', function(event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                var sortOrder;
                (($(this).data('sort-order') === 'DESC') ? sortOrder = 'ASC' : sortOrder = 'DESC');
                widget.options.sortOrder = sortOrder;
                widget.options.sortOrderField = $(this).data('field');
                // Make a server call again
                widget.firstRequest = true;
                // Execute the request and return results
                widget._makeRequest(1, widget.select.val());
            });
        },
        _makeRequest: function(page, resultsPerPage) {
            // Set current object context to use inside jquery objects
            var widget = this;
            // Pagination
            widget.options.resultsPerPage = resultsPerPage;
            if(widget.options.pagination) {
                widget.options.page = page;
            }
            if (widget.options.dataSource != undefined) { 
                if(widget.options.serverSidePagination) {
                    index = widget._getIndex();
                } else {
                    resultsPerPage = 0;
                    index = 0;
                }
                if(widget.firstRequest) {
                    widget.options.dataSource.call(
                        widget, 
                        resultsPerPage, 
                        index, 
                        widget.options.sortOrder, 
                        widget.options.sortOrderField
                    );
                } else {
                    widget.buildResultSet(widget.records, widget.recordCount);
                }
                // Disable subsequent server requests from performing if pagination isn't suppose to run server side
                if(!widget.options.serverSidePagination) { widget.firstRequest = false; }
            }
        },
        buildResultSet: function(records, recordCount) {
            // Set current object context to use inside jquery objects
            var widget = this;
            widget.records = records;
            widget.recordCount = recordCount;
            // Empty
            widget.table.empty();
            widget.information.empty();
            // Build theader
            var thead = $('<thead>');
            var tr = $('<tr>');
            $.each(widget.options.displayFields, function(fieldname, label) {
                var th = $('<th>');
                th.append(label)
                    .data('field', fieldname)
                    .data('sort-order', widget.options.sortOrder);
                // Sorting
                if(fieldname === widget.options.sortOrderField) {
                    th.addClass('kd-header-sorting-selected')
                        .append(
                        $('<span>').addClass('kd-header-sorting-' + widget.options.sortOrder)
                    );
                } else {
                    th.append(
                        $('<span>').addClass('kd-header-sorting')
                    );
                }
                tr.append(th);
            });
            thead.append(tr);
            // Build tbody
            var tbody = $('<tbody>');
            // Build client or server side pagination
            if(widget.options.serverSidePagination) {
                $.each(widget.records, function(index, value) {
                    // Create row
                    var tr = $('<tr>');
                    $.each(widget.options.displayFields, function(fieldname, label) {
                        // Create Column
                        var td = $('<td>');
                        // Append value
                        td.append(((value[fieldname] !== null) ? value[fieldname] : ""));
                        // Column callback
                        if (widget.options.columnCallback != undefined) { widget.options.columnCallback.call(widget, td, value[fieldname], fieldname, label); }
                        tr.append(td);
                    });
                    // Striping
                    ((index % 2 == 0) ? tr.addClass('kd-odd') : tr.addClass('kd-even'));
                    // Row callback
                    if (widget.options.rowCallback != undefined) { widget.options.rowCallback.call(widget, tr, value, index); }
                    // Append to tbody
                    tbody.append(tr);
                });
            } else {
                $.each(widget.records, function(index, value) {
                    if(index >= widget._getIndex() && index <= (widget._getIndex() + (widget.options.resultsPerPage  - 1))) {
                        // Create row
                        var tr = $('<tr>');
                        $.each(widget.options.displayFields, function(fieldname, label) {
                            // Create Column
                            var td = $('<td>');
                            // Append value
                            td.append(((value[fieldname] !== null) ? value[fieldname] : ""));
                            // Column callback
                            if (widget.options.columnCallback != undefined) { widget.options.columnCallback.call(widget, td, value[fieldname], fieldname, label); }
                            tr.append(td);
                        });
                        // Striping
                        ((index % 2 == 0) ? tr.addClass('kd-odd') : tr.addClass('kd-even'));
                        // Row callback
                        if (widget.options.rowCallback != undefined) { widget.options.rowCallback.call(widget, tr, value, index); }
                        // Append to tbody
                        tbody.append(tr);
                    }
                });
            } 
            // Build pagination links
            widget.options.total = widget.recordCount;
            if(widget.options.pagination) {
                widget.pagination.html(widget._buildHtmlPaginatationList());
            }
            // Append information
            if(widget.options.info) {
                widget.information.append('Showing&nbsp;')
                    .append(widget._getIndex() + 1)
                    .append('&nbsp;to&nbsp;')
                    .append(widget._getIndex() + tbody.find('tr').length)
                    .append('&nbsp;of&nbsp;')
                    .append(widget.options.total)
                    .append('&nbsp;entries');
            }
            // Append table data
            widget.table.append(thead)
                .append(tbody);
            // Show
            this.element.show();
            // Run complete callback
            widget._complete();
        },
        _complete: function() {
            if (this.options.completeCallback != undefined) { this.options.completeCallback.call(this); }
        },
        _getIndex: function() {
            return (this.options.page - 1) * this.options.resultsPerPage;
        },
        _getTotalPages: function() {
            return Math.ceil(this.options.total / this.options.resultsPerPage);
        },
        _buildPaginatationData: function() {  
            var midRange = this.options.range;
            startRange = this.options.page - Math.floor(midRange / 2);
            endRange = this.options.page + Math.floor(midRange / 2);
            if(startRange <= 0) {
                endRange += Math.abs(startRange) + 1;
                startRange = 1;
            }
            if(endRange > this._getTotalPages()) {
                startRange -= endRange - this._getTotalPages();
                endRange = this._getTotalPages();
            }
            var startPage;
            var endPage;
            // Initialize object
            var pages = new Object();
            var pageNumbers = new Array();
            if(this.options.total > 1) {
                startPage = 1;
                endPage = this._getTotalPages();
                // Setup prev
                if(this.options.page != 1) {
                    pages['prev'] = new Object({
                        'page':(this.options.page - 1),
                        'label':'Prev'
                    });
                }
                // Setup link showing first page number if user is not on page 1 and on page 6 or greater
                if(this.options.page != 1 && this.options.page >= midRange + 1) {
                    pages['fistPage'] = new Object({
                        'page':startPage,
                        'label':startPage + '...'
                    });
                }
                // Create page numbers
                for(var i = 1; i < endPage + 1; i++) {
                    if ((i >= startRange) && (i <= endRange)) {
                        pageNumbers[i] = new Object({
                            'page':i,
                            'label':i
                        });
                    }
                }
                if(pageNumbers.length > 2) {
                    pages['pageNumbers'] = pageNumbers;
                }
                
                // Setup link showing last page number if user is not on end page and 5 pages or less from end page
                if(this.options.page != endPage && this.options.page <= (endPage - midRange)) {
                    pages['lastPage'] = new Object({
                        'page':endPage,
                        'label':'... ' + endPage
                    });
                }
                // Setup next
                if(this.options.page != endPage) {
                    pages['next'] = new Object({
                        'page':this.options.page + 1,
                        'label':'Next'
                    });
                }
            } else {
                pages = new Array();
            }
            return new Object({'pages':pages});
        },
        _buildHtmlPaginatationList: function() {
            var paginationData = this._buildPaginatationData();
            var paginationList = $('<ul>').addClass('unstyled links');
            for(var key in paginationData.pages) {
                if(key === 'pageNumbers') {
                    for(var i = 1; i < paginationData.pages[key].length; i++) {
                        // Omit Undefined
                        if(typeof paginationData.pages[key][i] !== 'undefined') {
                            var li = $('<li>')
                                .append(
                                    $('<a>').attr('href', 'javascript(void)')
                                    .data('page', paginationData.pages[key][i].page)
                                    .text(paginationData.pages[key][i].label)
                                )
                            // Create Active class based selected page
                            if(paginationData.pages[key][i].page === this.options.page) { li.addClass('active'); }
                            paginationList.append(li);
                        }
                    }
                } else {
                    paginationList.append(
                        $('<li>')
                        .append(
                            $('<a>').attr('href', 'javascript(void)')
                            .data('page', paginationData.pages[key].page)
                            .text(paginationData.pages[key].label)
                        )
                    );
                }
            }
            return paginationList;
        },
        _destroy: function() {
            this.submissionsTable.remove();
        }
    });
})(jQuery);