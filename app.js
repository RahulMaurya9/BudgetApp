// TODO : BUDGET CONTROLLER MODULE
var budgetcontroller = (function () {
    var expenses = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var data = {
        additems: {
            exp: [],
            inc: []
        },
        total: {
            ex: 0,
            inc: 0
        }
    };
    return {
        addItem: function (type, des, val) {
            var newitems, ID;
            if (data.additems[type].length > 0) {
                ID = data.additems[type][data.additems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            if (type === 'exp') {
                newitems = new expenses(ID, des, val);
            } else if (type === 'inc') {
                newitems = new income(ID, des, val)
            }
            data.additems[type].push(newitems);
            return newitems;
        },
        testing: function () {
            console.log(data);
        }
    }

})();
// TODO : UI CONTROLLER MODULE
var UIcontroller = (function () {
    var DomString = {
        inputType: '.add__type',
        inputDes: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getinput: function () {
            return {
                id: document.querySelector(DomString.inputType).value,
                description: document.querySelector(DomString.inputDes).value,
                valuee: document.querySelector(DomString.inputValue).value
            };
        },
        getDomString: function () {
            return DomString;
        }
    };
})();
//  TODO : TOTAL CONTROLLER MODULE
var controller = (function (budgetctrl, uictrl) {
    var callEventListner = function () {
        var Dom = uictrl.getDomString();
        document.querySelector(Dom.inputBtn).addEventListener('click', ctrladdItem);
        document.querySelector('keypres', function (event) {
            if (event.keycode === 13 || event.which === 13)
                ctrladdItem();
        });
    }

    function ctrladdItem() {
        // 1. get the field input data 
        // 2.add the to the budget controller 
        var result = uictrl.getinput();
        var newItem = budgetctrl.addItem(result.type, result.description, result.value)

        // 3. add the item to the UI

        // 3.calculate the budget

        // 5. Display the  budget on the ui
    }
    return {
        init: function () {
            console.log('the application is started');
            callEventListner();
        }
    }

})(budgetcontroller, UIcontroller);
controller.init();