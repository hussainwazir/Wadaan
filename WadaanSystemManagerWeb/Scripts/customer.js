GlobalAjax({ commandName: 'listcustomer', values: '{}', CallBack: loadCustomer });

var loadCustomer = function (d) {
    Grid(JSON.parse(d.Value));
};