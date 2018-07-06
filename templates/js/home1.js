$(function() {
    var $coinTableItems = $('#coinTableItems');
    var $marketCapItem = '' +
        '<tr>\n' +
        '    <td class="v-a-m"><span>1</span></td>\n' +
        '    <td class="v-a-m"><span class="text-white">{{name}}</span></td>\n' +
        '    <td class="v-a-m"><span>{{max_supply}}</span></td>\n' +
        '    <td class="v-a-m"><span>{{total_supply\n}}</span></td>\n' +
        '    <td class="v-a-m"><span>{{quotes.USD.market_cap}}</span></td>\n' +
        '    <td class="v-a-m text-right">\n' +
        '        <a href="#">View <i class="fa fa-angle-right"></i></a>\n' +
        '    </td>\n' +
        '</tr>' +
        '';
    var $coins = [];
    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    function createCoin(obj){
        $.ajax({
            type: 'GET',
            url: 'https://api.coinmarketcap.com/v2/ticker/'+obj.id+'/',
            success: function (resp) {
                $coins.push(resp['data']);
                console.log("DATA ", resp.data);
                $coinTableItems.append(Mustache.render($marketCapItem, resp.data))
            }, error(){
                console.log("Failed to load Tags")
            }
        });
    }

    function displayCoins(){
        console.log('coins', $coins);
        console.log($coins.slice(5, 7));
        $.each($coins, function (i, coin) {
            // console.table($coinTableItems);
            alert("hello");
            // $coinTableItems.append(Mustache.render($marketCapItem, coin));
            $coinTableItems.append('<h1>Home</h1>');
        });
    }

    $.ajax({
        type: 'GET',
        url: 'https://api.coinmarketcap.com/v2/listings/',
        success: function (resp) {
            var data = resp.data.slice(0, 10);
            $.each(data, function (i, obj) {
                createCoin(obj);
            });
        }, error(){
            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else if (exception === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }
        }
    }).done(function () {
        displayCoins()
    });
});